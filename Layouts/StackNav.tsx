import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import BottomTabNavigator from './Navigation';
import DashboardHealthcare from './DashboardHealthcare';
const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="RitmoCardiaco" component={DashboardHealthcare} />
    </Stack.Navigator>
  );
};

export default AppStack;
