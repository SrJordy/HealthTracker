import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const temperatura = require('./src/temperature.json');
const ritmoCardiacoAnimation = require('./src/healthanimation.json');

const DashboardScreen = ({ navigation }) => {

  const handleRitmoCardiacoPress = () => {
    navigation.navigate('RitmoCardiaco');
  };

  const handleTemperaturaPress = () => {
    navigation.navigate('Temperatura');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={handleRitmoCardiacoPress}>
        <Text style={styles.cardTitle}>Ritmo Cardíaco</Text>
        <LottieView source={ritmoCardiacoAnimation} style={styles.lottieAnimation} autoPlay loop />
        <Text style={styles.cardContent}>75 bpm</Text>
      </TouchableOpacity>

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
    backgroundColor: '#eefffc',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff2ed',
    borderRadius: 10,
    shadowColor: '#450508', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    marginVertical: 10,
    width: '90%',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ff5b37', 
  },
  cardContent: {
    fontSize: 18,
    color: '#00a4a3', 
  },
  lottieAnimation: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default DashboardScreen;
