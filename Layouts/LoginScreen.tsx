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
    backgroundColor: '#eefffc', // --java-50
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    color: '#065d9e', // $curious-blue-700
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 56,
    backgroundColor: '#ffffff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ff5b37', // $pomegranate-400 para el borde
    borderRadius: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    elevation: 2, // Sombra para Android
    shadowColor: '#ff5b37', // Sombra para iOS, usando pomegranate-400
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 18,
    color: '#086567', // --java-800 para el texto
  },
  icon: {
    marginRight: 8,
    color: '#3caef4', // $curious-blue-400 para íconos
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#ff4122', // $pomegranate-500 para el botón
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 8,
    elevation: 3,
    shadowColor: '#ff4122', // Sombra para iOS, usando pomegranate-500
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff', // Texto blanco para contraste
    fontWeight: 'bold',
  },
});

    
    export default Login;
