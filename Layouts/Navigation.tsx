import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Importa las pantallas que usarás en tu barra de navegación
import HomeScreen from './HomeScreen';
import DashboardScreen from './DashboardScreen';
// Puedes agregar más pantallas según sea necesario

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'DashboardScreen') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          }
          // Puedes agregar más iconos para otras pantallas si es necesario

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="DashboardScreen" component={DashboardScreen} />
      {/* Agrega más Tab.Screen aquí para otras pantallas */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
