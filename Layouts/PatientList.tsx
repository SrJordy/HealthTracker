import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

interface Paciente {
  id: string;
  nombre: string;
  cedula: string;
  edad: number;
  fotoUrl: string;
}

interface Props {
  pacientes: Paciente[];
}

const CuidadorDashboard: React.FC<Props> = ({ pacientes }) => {
  const handleCardPress = (pacienteId: string) => {
    console.log('Paciente seleccionado:', pacienteId);
    // Maneja la navegación o la lógica aquí
  };

  return (
    <ScrollView style={styles.container}>
      {pacientes.map(paciente => (
        <TouchableOpacity
          key={paciente.id}
          style={styles.card}
          onPress={() => handleCardPress(paciente.id)}
        >
          <View style={styles.cardContent}>
            <Image source={{ uri: paciente.fotoUrl }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{paciente.nombre}</Text>
              <Text style={styles.cardText}>Cédula: {paciente.cedula}</Text>
              <Text style={styles.cardText}>Edad: {paciente.edad}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff2ed', // pomegranate-50
  },
  card: {
    backgroundColor: '#80c9f9', // curious-blue-300
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4122', // pomegranate-500
  },
  cardText: {
    fontSize: 16,
    color: '#00c3bd', // java-500
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default CuidadorDashboard;
