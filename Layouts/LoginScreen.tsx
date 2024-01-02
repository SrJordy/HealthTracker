
import React, { useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 TextInput,
 TouchableOpacity,
 KeyboardAvoidingView, Alert
} from 'react-native';
import { Props} from './Components/NavigationTypes'; // Ajusta la ruta si es necesario

const Login: React.FC<Props> = ({ navigation }) => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [user, setUser] = useState({ isLoggedIn: false });

 const handleLogin = () => {
   if (email === 'Admin' && password === 'admin') {
      navigation.navigate('Home');
      setUser({ isLoggedIn: true });
    
   } else {
    
     Alert.alert('Error', 'Usuario o contraseña incorrectos');
   }
 };

 return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
 );
};

const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     width: '100%',
     backgroundColor: '#A0B4FF', // Primer Color (Más Suave)
   },
   title: {
     fontSize: 24,
     marginBottom: 20,
     color: '#505088', // Cuarto Color (Más Suave)
   },
   input: {
     borderWidth: 1,
     borderColor: '#505088', // Cuarto Color (Más Suave)
     backgroundColor: 'white', // Fondo blanco para los campos de texto
     width: '80%',
     marginBottom: 20,
     padding: 10,
     borderRadius: 5,
     color:'black' // Bordes redondeados para los campos de texto
   },
   button: {
     backgroundColor: '#2BDCFF', // Segundo Color (Más Suave)
     padding: 10,
     width: '80%',
     borderRadius: 5, // Bordes redondeados para el botón
   },
   buttonText: {
     color: 'white',
     fontSize: 18,
     textAlign: 'center',
   },
 });
 

export default Login;