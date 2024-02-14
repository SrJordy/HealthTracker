import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Props } from './Components/NavigationStyle';
import { useAuth } from './AuthContext';

const Login: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const logoImage = require('./src/IconoRedondo.png'); // Asegúrate de que la ruta a la imagen sea correcta
  const { setUserID } = useAuth();
  const close_eye = require('./src/icons/closed_eye_icon_259685.png');
  const open_eye=require('./src/icons/eye_icon_259684.png');

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Por favor llene todos los campos');
    } else if (email === 'paciente' && password === '1234') {
      setUserID(1);
      navigation.navigate('Main');
      Alert.alert('Éxito', 'Iniciaste sesión correctamente');
      setEmail('');
      setPassword('');
    } else if (email === 'cuidador' && password === '1234') {
      setUserID(2);
      navigation.navigate('Main');
      Alert.alert('Éxito', 'Iniciaste sesión correctamente');
      setEmail('');
      setPassword('');
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
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
    backgroundColor: '#f4f7f5',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    color: '#3e3d42',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 56,
    backgroundColor: '#ffffff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    borderRadius: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    elevation: 2, // Solo funciona en Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 18,
    color: '#3e3d42',
  },
  icon: {
    marginRight: 8,
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#4e9f3d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 8,
    elevation: 3, // Solo funciona en Android
    shadowColor: '#000', // Sombra para iOS
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
