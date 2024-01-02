import React, { useEffect } from 'react';
import { View, Text, Button, Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';
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
    <View>
      <Text style={{color:'black'}}>¡Bienvenido a la pantalla de inicio!</Text>
      <Text style={{ color: 'black' }}>Tu userID: {userID}</Text>
      
    </View>
  );
};

export default HomeScreen;
