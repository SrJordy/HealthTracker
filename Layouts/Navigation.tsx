import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen'; // Tu pantalla de inicio
import DashboardScreen from './DashboardScreen'; // Tu pantalla de dashboard

import { Image } from 'react-native';
import CalendarScreen from './CalendarScreen';
const Tab = createBottomTabNavigator();
const Profile = require('./src/icons/user_person_profile_account_icon_259562.png');
const dashboardicon=require('./src/icons/analytic_dashboard_home_manage_user_interface_icon_123286.png');
const Calendario=require('./src/icons/calendar.png')
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        
        tabBarIcon: ({ color }) => {
          let icon;

          if (route.name === 'Perfil') {
            icon=<Image source={Profile} style={{ width: 35, height: 35, tintColor: color }} />;
          } else if (route.name === 'Datos') {
            icon = <Image source={dashboardicon} style={{ width: 30, height: 30, tintColor: color }} />;
          } else if (route.name=='Calendario'){
            icon = <Image source={Calendario} style={{ width: 30, height: 30, tintColor: color }} />;
          }
          return icon;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Perfil"
        component={HomeScreen}
        options={{
          headerShown:false,
        }}
      />
      <Tab.Screen
        name="Datos"
        component={DashboardScreen}
        options={{
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Calendario"
        component={CalendarScreen}
        options={{
          headerShown:false
        }}
      />
      {/* Agrega más Tab.Screen aquí para otras pantallas */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
