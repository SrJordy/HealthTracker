import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import BottomTabNavigator from './Navigation';
import DashboardHealthcare from './DashboardHealthcare';
import DashboardScreen from './DashboardScreen';
import TemperatureDashboard from './TemperatureDashboard';
import MedicationReminderScreen from './MedicationScreen';
import CalendarScreen from './CalendarScreen';
const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="RitmoCardiaco" component={DashboardHealthcare} />
      <Stack.Screen name="Temperatura" component={TemperatureDashboard} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Calendario" component={CalendarScreen} />
      <Stack.Screen name="Medicina" component={MedicationReminderScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
