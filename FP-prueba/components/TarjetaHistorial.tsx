import {
    Alert,
    Button,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { useState } from 'react';
  
  // Tipo para los datos de las operaciones
  type TarjetaHistorialProps = {
    datos: {
      operacionId: string;
      monto: number;
      tipo: string;
      comentario?: string;
      saldoAnterior: number;
      saldoNuevo: number;
      fecha: string;
  
    };
  };
  
  export default function TarjetaHistorial(props: TarjetaHistorialProps) {
    const [visible, setVisible] = useState(false);
  
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.txtNombre}>
          {'Comprobanter'}: {props.datos.operacionId}
        </Text>
        <Text style={styles.txtNombre}>
          {props.datos.tipo}: ${props.datos.monto}
        </Text>
        <Text style={styles.txtFecha}>{props.datos.fecha}</Text>
  
        <Modal visible={visible} animationType="slide" transparent={true}>
          <View style={styles.modal}>
            <Text style={styles.txtDetalle}>
              Monto: ${props.datos.monto}
            </Text>
            <Text style={styles.txtDetalle}>
              Tipo: {props.datos.tipo}
            </Text>
            <Text style={styles.txtDetalle}>
              Comentario: {props.datos.comentario || 'Sin comentario'}
            </Text>
            <Text style={styles.txtDetalle}>
              Saldo Anterior: ${props.datos.saldoAnterior}
            </Text>
            <Text style={styles.txtDetalle}>
              Saldo Nuevo: ${props.datos.saldoNuevo}
            </Text>
            <Button title="Cerrar" onPress={() => setVisible(false)} />
          </View>
        </Modal>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#FF6600',
    },
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 20,
    },
    txtNombre: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    txtFecha: {
      fontSize: 14,
      color: '#666',
    },
    txtDetalle: {
      fontSize: 16,
      color: '#FFFFFF',
      marginBottom: 10,
      backgroundColor: '#FF6600',
      padding: 10,
      borderRadius: 8,
      width: '100%',
      textAlign: 'center',
    },
  });
  