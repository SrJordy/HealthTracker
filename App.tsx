import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppStack from './Layouts/StackNav';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
    
 );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
