import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';

const pacientesEjemplo = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    cedula: '12345678',
    edad: 30,
  },
  {
    id: '2',
    nombre: 'Ana Gómez',
    cedula: '23456789',
    edad: 25,
  },
  {
    id: '3',
    nombre: 'Carlos López',
    cedula: '34567890',
    edad: 40,
  },
  // Puedes añadir más pacientes aquí
];

const numColumns = 2;
const size = Dimensions.get('window').width / numColumns - 20;

const CuidadorDashboard = () => {
  const handleCardPress = (pacienteId) => {
    console.log('Paciente seleccionado:', pacienteId);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { width: size, height: size }]}
      onPress={() => handleCardPress(item.id)}
    >
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text style={styles.cardText}>Cédula: {item.cedula}</Text>
        <Text style={styles.cardText}>Edad: {item.edad} años</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={pacientesEjemplo}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff2ed',
    borderRadius: 10,
    shadowColor: '#450508',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff5b37',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#00a4a3',
    textAlign: 'center',
  },
});

export default CuidadorDashboard;
