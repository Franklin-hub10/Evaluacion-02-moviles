import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db, auth } from '../config/Config';
import { onAuthStateChanged } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker';

const OperacionesScreens = () => {
  const [Monto, setMonto] = useState(0);
  const [tipoOperacion, setTipoOperacion] = useState('Deposito');
  const [comentario, setComentario] = useState('');
  const [saldo, setsaldo] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);


  // Obtener el usuario logueado
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        Alert.alert('Error', 'No estás autenticado.');
      }
    });
    return unsubscribe;
  }, []);

  function transaccion() {
    if (Monto <= 0) {
      Alert.alert(
        'Error',
        'El monto no puede ser negativo o igual a cero. Por favor, ingresa un valor válido.'
      );
      return;
    }

    if (Monto > 500) {
      Alert.alert(
        'Monto Alto',
        'La operación tiene un monto mayor a $500. ¿Deseas continuar?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Continuar', onPress: () => guardarOperacion() },
        ]
      );
    } else {
      guardarOperacion();
    }
  }

  function guardarOperacion() {
    if (!userId) {
      Alert.alert('Error', 'No se pudo identificar al usuario.');
      return;
    }

    const operacionId = new Date().getTime().toString(); // Genera un ID único automáticamente

    // Estructura del registro de operación
    const registro = {
      operacionId: operacionId,
      monto: Monto,
      tipo: tipoOperacion,
      comentario: comentario,
      saldoAnterior: saldo,
      saldoNuevo: saldo + (tipoOperacion === 'Deposito' ? Monto : -Monto),
      fecha: new Date().toLocaleString(),
    };

    // Validar que la operación no deje un saldo negativo
    if (registro.saldoNuevo < 0) {
      Alert.alert(
        'Error',
        'La operación no se puede completar porque deja un saldo negativo.'
      );
      return;
    }

    // Guardar en Firebase bajo el usuario logueado
    const operacionesRef = ref(db, `usuariosBanco/${userId}`);
    push(operacionesRef, registro)
      .then(() => {
        setsaldo(registro.saldoNuevo); // Actualiza el saldo
        Alert.alert('Éxito', 'La operación se realizó con éxito.');
      })
      .catch((error) => {
        Alert.alert('Error', 'No se pudo guardar la operación: ' + error.message);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Operaciones</Text>
      <TextInput
        style={styles.input}
        placeholder="Monto"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        onChangeText={(texto) => setMonto(parseFloat(texto))}
      />
      <Picker
        selectedValue={tipoOperacion}
        style={styles.input}
        onValueChange={(itemValue) => setTipoOperacion(itemValue)}
      >
        <Picker.Item label="Depósito" value="Deposito" />
        <Picker.Item label="Retiro" value="Retiro" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Comentario"
        placeholderTextColor="#aaa"
        onChangeText={(texto) => setComentario(texto)}
      />
      <TouchableOpacity style={styles.button} onPress={transaccion}>
        <Text style={styles.buttonText}>Registrar Operación</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Saldo Actual</Text>
      <Text style={styles.centeredText}>${saldo.toFixed(2)}</Text>
    </View>
  );
};

export default OperacionesScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF4E6', // Fondo naranja claro
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#FF6600', // Naranja oscuro
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF', // Blanco
    borderColor: '#FF6600', // Naranja oscuro
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF6600', // Naranja oscuro
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF', // Blanco
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#FF6600', // Naranja oscuro
    fontWeight: 'bold',
    marginBottom: 10,
  },
  centeredText: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
});
