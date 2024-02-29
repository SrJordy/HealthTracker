import React, { useState, useEffect } from 'react';
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
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';

const MedicationReminderScreen = () => {
  const { user, pacie } = useAuth();
  const navigation = useNavigation();
  const [medicationData, setMedicationData] = useState([]);

  useEffect(() => {
    let pacienteId = user.roles === 'paciente' ? user.Paciente.ID : pacie.ID;
    fetch(`https://carinosaapi.onrender.com/horariomedicamentos/getAll?paciente_id=${pacienteId}`)
      .then((response) => response.json())
      .then((data) => {
        const groupedMedications = data.reduce((acc, medication) => {
          const { medicamento_id } = medication;
          if (!acc[medicamento_id]) {
            acc[medicamento_id] = [];
          }
          acc[medicamento_id].push(medication);
          return acc;
        }, {});

        const medicationsWithMaxDoses = Object.values(groupedMedications).map((medications) => {
          medications.sort((a, b) => b.dosis_restantes - a.dosis_restantes);
          const medicationWithMaxDose = medications[0];

          const calculatedTimes = [];
          for (let i = 0; i < medicationWithMaxDose.dosis_restantes; i++) {
            const time = new Date(new Date(medicationWithMaxDose.hora_inicial).getTime() + i * medicationWithMaxDose.frecuencia * 3600000);
            calculatedTimes.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          }

          return {
            ...medicationWithMaxDose,
            horasConsumo: calculatedTimes,
          };
        });

        setMedicationData(medicationsWithMaxDoses);
      })
      .catch((error) => console.error('Error al obtener medicamentos:', error));
  }, [user, pacie]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMed, setNewMed] = useState({
    name: '',
    dose: '',
    frequencyHours: '',
    descripcion: '',
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
        <Text style={styles.staticTitle}>Lista de Medicamentos</Text>
        {medicationData.map((medication, index) => (
          <View key={index} style={styles.medicationItem}>
            <Text style={styles.infoText}>{`Medicamento: ${medication.nombre}`}</Text>
            <Text style={styles.infoText}>{`Descripción: ${medication.descripcion}`}</Text>
            <Text style={styles.infoText}>{`Frecuencia: Cada ${medication.frecuencia} horas`}</Text>
            <Text style={styles.infoText}>Horas de consumo:</Text>
            {medication.horasConsumo.map((hora, idx) => (
              <Text key={idx} style={styles.infoText}>{`- ${hora}`}</Text>
            ))}
          </View>
        ))}
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

            <TextInput
              style={styles.input}
              onChangeText={(text) => setNewMed({ ...newMed, name: text })}
              value={newMed.name}
              placeholder="Nombre del medicamento"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNewMed({ ...newMed, dose: text })}
              value={newMed.dose}
              placeholder="Dosis"
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(text) => setNewMed({ ...newMed, frequencyHours: text })}
              value={newMed.frequencyHours}
              placeholder="Frecuencia (horas)"
            />
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              onChangeText={(text) => setNewMed({ ...newMed, descripcion: text })}
              value={newMed.descripcion}
              placeholder="Descripción"
              multiline
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
    backgroundColor: '#f0f8ff', // Curious Blue 50
  },
  staticTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f01706', // Pomegranate 600
    alignSelf: 'center',
    marginBottom: 20,
  },
  contentContainer: {
    padding: 20,
  },
  medicationItem: {
    borderWidth: 1,
    borderColor: '#9e0e11', // Pomegranate 800
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff2ed', // Pomegranate 50, for contrast
  },
  infoText: {
    color: '#086567', // Java 800
    marginBottom: 5,
  },
  backButton: {
    margin: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 18,
    color: '#065d9e', // Curious Blue 700
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#ff5b37', // Pomegranate 400
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white', // Maintained for readability
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
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff4122', // Pomegranate 500
  },
  fieldTitle: {
    alignSelf: 'flex-start',
    margin: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0675c3', // Curious Blue 600
  },
  input: {
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ced4da', // Neutral color to maintain focus
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#eefffc', // Java 50, for a subtle contrast
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});


export default MedicationReminderScreen;
