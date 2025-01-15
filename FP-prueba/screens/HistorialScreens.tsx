import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/Config';
import { ref, onValue } from 'firebase/database';

// Definir el tipo para las operaciones
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

  // Cargar las operaciones desde Firebase
  useEffect(() => {
    if (userId) {
      const operacionesRef = ref(db, `usuariosBanco/${userId}`);
      onValue(operacionesRef, (snapshot) => {
        const data = snapshot.val();
        const operacionesList = data ? (Object.values(data) as Operacion[]) : [];
        setOperaciones(operacionesList);
      });
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Operaciones</Text>
      {operaciones.length > 0 ? (
        <FlatList
          data={operaciones}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: Operacion }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => Alert.alert('Comentario', item.comentario || 'Sin comentario')}
            >
              <Text style={styles.itemText}>Tipo: {item.tipo}</Text>
              <Text style={styles.itemText}>Monto: ${item.monto}</Text>
              <Text style={styles.itemText}>Fecha: {item.fecha}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No hay operaciones registradas.</Text>
      )}
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
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FF6600',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});
