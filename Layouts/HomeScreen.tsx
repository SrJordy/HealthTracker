import React, { useEffect } from 'react';
import { View, Text, Button, Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
const HomeScreen = () => {
  const { userID, setUserID } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      // Mostrar la ventana de confirmación al presionar el botón de retroceso físico
      Alert.alert(
        'Cerrar Sesión',
        '¿Estás seguro de que deseas cerrar sesión?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Cerrar Sesión',
            onPress: () => {
              setUserID(null); 
              // Si el usuario confirma, navega de regreso a la pantalla de inicio de sesión
              navigation.navigate('Login');
            },
          },
        ],
        { cancelable: false }
      );
      return true; // Evitar que el botón de retroceso realice su acción predeterminada
    };

    // Agregar un listener al evento de retroceso físico
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      // Limpia el listener cuando el componente se desmonta
      backHandler.remove();
    };
  }, [navigation]);
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <Image source={require('./src/IconoRedondo.png')} style={styles.profilePic} />
        <Text style={styles.welcomeText}>¡Bienvenido a su espacio de salud!</Text>
      </View>

      <View style={styles.userInfoSection}>
        <Text style={styles.userInfoText}>Información del Paciente:</Text>
        <Text style={styles.userInfoText}>UserID: {userID}</Text>
        {/* Aquí puedes añadir más información del paciente */}
      </View>

      {/* Aquí puedes añadir más secciones de información */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50, // Hace la imagen redonda
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 22,
    color: '#3e3d42',
    fontWeight: 'bold',
  },
  userInfoSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfoText: {
    fontSize: 18,
    color: '#3e3d42',
    marginBottom: 10,
  },
});

export default HomeScreen;
