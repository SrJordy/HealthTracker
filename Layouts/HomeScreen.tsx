import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';

const HomeScreen = () => {
  const { user, setUser } = useAuth();
  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  const handleLogout = () => {
    setUser(null);
    navigation.replace('Login'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./src/IconoRedondo.png')} style={styles.profilePic} />
        <Text style={styles.welcomeText}>¡Bienvenido, {user ? user.firstname : 'Usuario'}!</Text>
      </View>

      <View style={styles.userInfoSection}>
        <Text style={styles.userInfoText}>Rol: {user ? user.roles : 'N/A'}</Text>
        <Text style={styles.userInfoText}>Email: {user ? user.email : 'N/A'}</Text>
        <Text style={styles.userInfoText}>Género: {user ? user.gender : 'N/A'}</Text>
        <Text style={styles.userInfoText}>Fecha de nacimiento: {user ? user.birthdate : 'N/A'}</Text>
        <Text style={styles.userInfoText}>Teléfono: {user ? user.phone : 'N/A'}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F0F8FF',
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  welcomeText: {
    marginTop: 10,
    fontSize: 20,
    color: '#333333',
    fontWeight: 'bold',
  },
  userInfoSection: {
    marginTop: 30,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  userInfoText: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 10,
    lineHeight: 24,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#ff4500',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 2,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
