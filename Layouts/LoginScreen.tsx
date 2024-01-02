import React, { useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 TextInput,
 TouchableOpacity, Alert
} from 'react-native';
import { Props } from './Components/NavigationStyle';


const Login: React.FC<Props> = ({ navigation }) => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [user, setUser] = useState({ isLoggedIn: false });
 const [secureTextEntry, setSecureTextEntry] = useState(true);

 
 const handleLogin = () => {
  if (email === '' || password === '') {
    Alert.alert('Error', 'Por favor llene todos los campos');
  } else if (email === 'Admin' && password === 'admin') {
     setUser({ isLoggedIn: true });
     navigation.navigate('Main');
     Alert.alert('Éxito', 'Iniciaste sesión correctamente');
   
  } else {
    Alert.alert('Error', 'Usuario o contraseña incorrectos');
  }
 };

 const toggleSecureTextEntry = () => {
  setSecureTextEntry(!secureTextEntry);
};

 return (
    <View style={styles.container}>
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
        secureTextEntry={secureTextEntry}
      />
      <TouchableOpacity style={styles.buttonPass} onPress={toggleSecureTextEntry}>
        <Text style={styles.buttonText}>Mostrar/Ocultar contraseña</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
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
  buttonPass: {
    backgroundColor: '#2BDCFF', // Segundo Color (Más Suave)
    padding: 10,
    width: '50%',
    marginBottom:10,
    borderRadius: 5, // Bordes redondeados para el botón
  },
   buttonText: {
     color: 'white',
     fontSize: 18,
     textAlign: 'center',
   },
 });
 

export default Login;