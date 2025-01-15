import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/Config';
import { ref, onValue } from 'firebase/database';
import TarjetaHistorial from '../components/TarjetaHistorial';

// Tipo para las operaciones
type Operacion = {
  operacionId: string;
  monto: number;
  tipo: string;
  comentario?: string;
  saldoAnterior: number;
  saldoNuevo: number;
  fecha: string;
};

export default function HistorialScreens() {
  const [operaciones, setOperaciones] = useState<Operacion[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Obtener el usuario logueado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        Alert.alert('Error', 'No estás autenticado.');
      }
    });
    return unsubscribe;
  }, []);

  // Escuchar cambios en las operaciones en Firebase
  useEffect(() => {
    if (userId) {
      const operacionesRef = ref(db, `usuariosBanco/${userId}/operaciones`);
      const unsubscribe = onValue(operacionesRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Datos actualizados en Firebase:', data); // Verifica si llegan los datos nuevos
        const operacionesList = data ? (Object.values(data) as Operacion[]) : [];
        setOperaciones(operacionesList);
      });

      return () => unsubscribe(); // Limpia la suscripción
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Operaciones</Text>
      <FlatList
        data={operaciones}
        keyExtractor={(item) => item.operacionId}
        renderItem={({ item }) => <TarjetaHistorial datos={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay operaciones registradas.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF4E6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6600',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});
