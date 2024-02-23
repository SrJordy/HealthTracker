import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Props } from './Components/NavigationStyle';
import { useAuth } from './AuthContext';
import axios from 'axios';

const Login: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const logoImage = require('./src/IconoRedondo.png');
  const { setUser } = useAuth();
  const close_eye = require('./src/icons/closed_eye_icon_259685.png');
  const open_eye=require('./src/icons/eye_icon_259684.png');

  const API_URL = 'https://carinosaapi.onrender.com/api';

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Por favor llene todos los campos');
    } else {
      try {
        console.log('Enviando datos de inicio de sesión:', { email, password });
        const response = await axios.post(`${API_URL}/login`, { email, password });
        console.log('Respuesta del servidor:', response.data);
        if (response.data.user) {
          setUser(response.data.user);
          navigation.navigate('Main');
          Alert.alert('Éxito', 'Iniciaste sesión correctamente');
          setEmail('');
          setPassword('');
        } else {
          Alert.alert('Error', 'Usuario o contraseña incorrectos');
        }
      } catch (error) {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
    }
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={24} color="#6e6869" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor={"gray"}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#6e6869" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={"gray"}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.icon} onPress={toggleSecureTextEntry}>
          <Image source={secureTextEntry ? close_eye : open_eye} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eefffc',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    color: '#065d9e',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 56,
    backgroundColor: '#ffffff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ff5b37', 
    borderRadius: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    elevation: 2, 
    shadowColor: '#ff5b37', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 18,
    color: '#086567', 
  },
  icon: {
    marginRight: 8,
    color: '#3caef4', 
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#ff4122',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 8,
    elevation: 3,
    shadowColor: '#ff4122',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff', 
    fontWeight: 'bold',
  },
});

    
export default Login;
