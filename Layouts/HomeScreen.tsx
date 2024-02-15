import React, { useEffect } from 'react';
import { View, Text, Alert, BackHandler, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';

const HomeScreen = () => {
  const { userID, setUserID } = useAuth();
  const navigation = useNavigation();

  const userInfoText = userID === 1 ? 'Información del Paciente' : userID === 2 ? 'Información del Cuidador' : 'Información del Usuario';

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Cerrar Sesión', '¿Estás seguro de que deseas cerrar sesión?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          onPress: () => {
            setUserID(null);
            navigation.navigate('Login');
          },
        },
      ], { cancelable: false });
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation, setUserID]);

  const handleLogout = () => {
    setUserID(null);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./src/IconoRedondo.png')} style={styles.profilePic} />
        <Text style={styles.welcomeText}>¡Bienvenido a su espacio de salud!</Text>
      </View>

      <View style={styles.userInfoSection}>
        <Text style={styles.userInfoText}>{userInfoText}:</Text>
        <Text style={styles.userInfoText}>UserID: {userID}</Text>
      </View>

      <TouchableOpacity style={styles.roundButton} onPress={handleLogout}>
        <Image source={require('./src/icons/logout.png')} style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#eefffc',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
  },
  welcomeText: {
    fontSize: 22,
    color: '#065d9e',
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
    borderColor: '#ff9370',
    borderWidth: 1,
  },
  userInfoText: {
    fontSize: 18,
    color: '#028383',
    marginBottom: 10,
  },
  roundButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#ff5b37',
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonIcon: {
    width: 25,
    height: 30,
    tintColor: 'white',
  },
});

export default HomeScreen;
