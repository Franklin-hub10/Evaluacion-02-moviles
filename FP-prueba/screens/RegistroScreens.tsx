import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/Config';
import { ref, set } from 'firebase/database';
import { TextInput } from 'react-native-gesture-handler';

export default function RegistroScreens({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [usuario, setUsuario] = useState('')
  const [celular, setCelular] = useState("");

  function registro() {
    if (!correo || !contrasenia || !usuario || !celular) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;

        // Guardar datos adicionales en Realtime Database
        const userId = user.uid; // Obtén el UID del usuario
        set(ref(db, `usuariosBanco/${userId}`), {
          usuario: usuario,
          celular: celular,
          correo: correo,
        contrasenia:contrasenia

        })
          .then(() => {
            Alert.alert("Registro exitoso", "Datos guardados correctamente.");
            navigation.navigate("Login");
          })
          .catch((error) => {
            Alert.alert("Error", "No se pudieron guardar los datos: " + error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        let mensaje = "Ocurrió un error al registrarte.";

        switch (errorCode) {
          case "auth/email-already-in-use":
            mensaje = "El correo ya está en uso. Por favor usa otro.";
            break;
          case "auth/invalid-email":
            mensaje = "El correo ingresado no es válido.";
            break;
          case "auth/weak-password":
            mensaje = "La contraseña debe tener al menos 6 caracteres.";
            break;
          default:
            mensaje = `Error: ${error.message}`;
            break;
        }

        Alert.alert("Error", mensaje);
        limpiar()
      });
  }

  function limpiar() {

    setCelular('')
    setCorreo("");
    setContrasenia("");
    setUsuario("");

  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

<Image
        source={require('../assets/image/boy.png')} // Cambia por la ruta de tu imagen
        style={styles.image}
      />



      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#aaa"
        onChangeText={(texto) => setUsuario(texto)}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Edad"
        placeholderTextColor="#aaa"
        onChangeText={(texto) => setCelular(texto)}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        placeholderTextColor="#aaa"
        onChangeText={(texto) => setCorreo(texto)}
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


      <TouchableOpacity style={styles.button} onPress={registro}>
        <Text style={styles.buttonText}>Registrarse</Text>
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