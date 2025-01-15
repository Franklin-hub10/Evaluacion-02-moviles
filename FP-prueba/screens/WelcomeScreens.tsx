import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'



export default function WelcomeScreens({ navigation }: any) {

  return (

    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <View style={styles.containerImagen}>
      <Image
        source={require('../assets/image/oinon.png')} // Cambia por la ruta de tu imagen
        style={styles.image}
      />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>

        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registro')}>

        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
  
}

const styles = StyleSheet.create({


  containerImagen:{


  },
  
    button: {
        backgroundColor: '#FF6600', // Naranja oscuro
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
      },
      buttonText: {
        color: '#FFFFFF', // Blanco
        fontSize: 16,
        fontStyle: 'italic', // Letra cursiva
        fontWeight: 'bold',
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF4E6', // Naranja claro
      },
      welcomeText: {
        fontSize: 24,
        color: '#FF6600',
        marginBottom: 20,
        fontWeight: 'bold',
        fontStyle: 'italic', // Letra cursiva
      },


      image: {
        width: 150,
        height: 150,
        marginBottom: 20,
      },



})