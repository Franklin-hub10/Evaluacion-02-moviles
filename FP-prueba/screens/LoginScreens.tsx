import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';
import { TextInput } from 'react-native-gesture-handler';

export default function LoginScreen({ navigation }: any) {
  const [correo, setcorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');




  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigation.navigate('Sesion');
        })
        .catch((error) => {
            const errorCode = error.code;
            let titulo;
            let mensaje;

            switch (errorCode) {
                case 'auth/wrong-password':
                    titulo = 'Error en la contraseña';
                    mensaje = 'Contraseña incorrecta. Por favor, verifica los datos ingresados.';
                    break;
                case 'auth/user-not-found':
                    titulo = 'Usuario no encontrado';
                    mensaje = 'Por favor verifica el email ingresado.';
                    break;
                default:
                    titulo = 'Error';
                    mensaje = 'Verifica tus credenciales.';
            }

            Alert.alert(titulo, mensaje);
        });
}


  return (
    <View style={styles.container}>
    <Text style={styles.title}>Iniciar Sesión</Text>

    <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        placeholderTextColor="#aaa"
        onChangeText={(texto) => setcorreo(texto)}
        keyboardType="email-address"
        autoCapitalize="none"
    />

    <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry={true}
        autoCapitalize="none"
    />

    <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Ingresar</Text>
    </TouchableOpacity>  
            </View>
    
  )
}

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
  registerText: {
    color: '#FF6600', // Naranja oscuro
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreviewText: {
    color: '#333',
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  selectImageButton: {
    backgroundColor: '#FF6600', // Naranja oscuro
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: '#FF6600',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#FF6600',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#333', // Gris oscuro
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },

})