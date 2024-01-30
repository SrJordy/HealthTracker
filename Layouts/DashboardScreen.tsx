import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

// Datos de ejemplo para los pacientes
const pacientesEjemplo = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    cedula: '12345678',
    edad: 30,
    fotoUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    nombre: 'Ana Gómez',
    cedula: '23456789',
    edad: 25,
    fotoUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    nombre: 'Carlos López',
    cedula: '34567890',
    edad: 40,
    fotoUrl: 'https://via.placeholder.com/150',
  },
];

const CuidadorDashboard = () => {
  const handleCardPress = (pacienteId) => {
    console.log('Paciente seleccionado:', pacienteId);
    // Implementa la navegación o cualquier otra lógica
  };

  // Verifica si hay pacientes para mostrar
  if (!pacientesEjemplo || pacientesEjemplo.length === 0) {
    return <View style={styles.container}><Text>No hay pacientes para mostrar.</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      {pacientesEjemplo.map(paciente => (
        <TouchableOpacity
          key={paciente.id}
          style={styles.card}
          onPress={() => handleCardPress(paciente.id)}
        >
          <Image source={{ uri: paciente.fotoUrl }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{paciente.nombre}</Text>
            <Text style={styles.cardText}>Cédula: {paciente.cedula}</Text>
            <Text style={styles.cardText}>Edad: {paciente.edad}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff', // curious-blue-50
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff', // white background
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    padding: 20,
    marginVertical: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff5b37', // pomegranate-400
  },
  cardText: {
    fontSize: 18,
    color: '#00c3bd', // java-500
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#80c9f9', // curious-blue-300
    borderWidth: 2,
  },
});

export default CuidadorDashboard;
