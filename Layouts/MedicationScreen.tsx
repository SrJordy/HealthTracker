import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';

const MedicationReminderScreen = () => {
  const { user, pacie } = useAuth();
  const navigation = useNavigation();

  console.log("paciente: ",pacie)

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMed, setNewMed] = useState({
    name: '',
    dose: '',
    frequencyHours: '',
  });

  const handleAddNewMedication = () => {
    console.log('Agregar medicación:', newMed);
    setShowAddForm(false); 
  };

  const handleCancel = () => {
    setShowAddForm(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {user.roles === 'cuidador' && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      )}

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Lista de Medicamentos</Text>
        <Text style={styles.noMedicationsText}>No hay medicamentos registrados.</Text>
      </ScrollView>

      {user.roles === 'cuidador' && (
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddForm(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddForm}
        onRequestClose={handleCancel}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Agregar Nuevo Medicamento</Text>
            
            <Text style={styles.fieldTitle}>Nombre del medicamento:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNewMed({ ...newMed, name: text })}
              value={newMed.name}
              placeholder="Ej: Ibuprofeno"
            />
            
            <Text style={styles.fieldTitle}>Dosis:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNewMed({ ...newMed, dose: text })}
              value={newMed.dose}
              placeholder="Ej: 200mg"
            />

            <Text style={styles.fieldTitle}>Frecuencia (horas):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(text) => setNewMed({ ...newMed, frequencyHours: text })}
              value={newMed.frequencyHours}
              placeholder="Ej: 8"
            />

            <View style={styles.buttonGroup}>
              <Button title="Cancelar" onPress={handleCancel} color="#6c757d" />
              <Button title="Agregar" onPress={handleAddNewMedication} color="#007bff" />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212529',
    alignSelf: 'center',
    marginBottom: 20,
  },
  backButton: {
    margin: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 18,
    color: '#007bff',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
  },
  noMedicationsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6c757d',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  fieldTitle: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#495057',
    backgroundColor: '#fff',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
});

export default MedicationReminderScreen;
