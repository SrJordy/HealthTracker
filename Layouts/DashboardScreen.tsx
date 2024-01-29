import React from 'react';
import LottieView from 'lottie-react-native';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
const temperatura = require('./src/temperature.json');
const ritmoCardiacoAnimation = require('./src/healthanimation.json'); // Cambia esto por la ruta de tu archivo Lottie

const DashboardScreen = () => {
  // Funciones para manejar el clic en las tarjetas
  const handleRitmoCardiacoPress = () => {
    console.log('Ritmo Cardiaco pressed');
    // Aquí puedes agregar más lógica
  };

  const handleTemperaturaPress = () => {
    console.log('Temperatura pressed');
    // Aquí puedes agregar más lógica
  };

  return (
    <View style={styles.container}>
      {/* Tarjeta Ritmo Cardiaco */}
      <TouchableOpacity style={styles.card} onPress={handleRitmoCardiacoPress}>
        <Text style={styles.cardTitle}>Ritmo Cardíaco</Text>
        <LottieView source={ritmoCardiacoAnimation} style={styles.lottieAnimation} autoPlay loop />
        <Text style={styles.cardContent}>75 bpm</Text>
      </TouchableOpacity>

      {/* Tarjeta Temperatura */}
      <TouchableOpacity style={styles.card} onPress={handleTemperaturaPress}>
        <Text style={styles.cardTitle}>Temperatura</Text>
        <LottieView source={temperatura} style={styles.lottieAnimation} autoPlay loop />
        <Text style={styles.cardContent}>36.6°C</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    padding: 20,
    marginVertical: 10,
    width: '90%',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  cardImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 18,
    color:'black'
  },
  lottieAnimation: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default DashboardScreen;
