import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from './AuthContext';

interface Medication {
  id: number;
  name: string;
  dose: string;
  frequencyHours: number;
  startTime: Date;
}

const MedicationReminderScreen = () => {
  const { userID } = useAuth();
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: 'Ibuprofeno',
      dose: '200mg',
      frequencyHours: 8,
      startTime: new Date(new Date().setHours(8, 0, 0, 0)),
    },
    {
      id: 2,
      name: 'Paracetamol',
      dose: '500mg',
      frequencyHours: 6,
      startTime: new Date(new Date().setHours(9, 0, 0, 0)),
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', dose: '', frequencyHours: 0, startTime: new Date() });

  const handleFrequencyChange = (text: string) => {
    const frequency = parseInt(text, 10);
    if (!isNaN(frequency) && frequency > 0) {
      setNewMed({ ...newMed, frequencyHours: frequency });
    } else if (text === '') {
      setNewMed({ ...newMed, frequencyHours: 0 });
    }
  };

  const addNewMedication = () => {
    const newMedication: Medication = {
      id: Date.now(), // Usando timestamp para generar un ID único
      name: newMed.name,
      dose: newMed.dose,
      frequencyHours: newMed.frequencyHours,
      startTime: newMed.startTime,
    };
    setMedications([...medications, newMedication]);
    setShowAddForm(false);
    setNewMed({ name: '', dose: '', frequencyHours: 0, startTime: new Date() });
  };

  const calculateSchedule = (medication: Medication) => {
    let schedule = [];
    let nextTime = medication.startTime;
    for (let i = 0; i < 24 / medication.frequencyHours; i++) {
      schedule.push(nextTime.toLocaleTimeString());
      nextTime = new Date(nextTime.getTime() + medication.frequencyHours * 3600000);
    }
    return schedule;
  };

  const deleteMedication = (id: number) => {
    setMedications(medications.filter(medication => medication.id !== id));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {medications.length > 0 ? (
          medications.map((med) => (
            <View key={med.id} style={styles.medicationCard}>
              <Text style={styles.medicationName}>{med.name} - {med.dose}</Text>
              <Text style={styles.scheduleTitle}>Horario:</Text>
              {calculateSchedule(med).map((time, index) => (
                <Text key={index} style={styles.scheduleTime}>{time}</Text>
              ))}
              {userID === 2 && (
                <Button title="Eliminar" color="#ff4122" onPress={() => deleteMedication(med.id)} />
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noMedicationsText}>No hay medicamentos registrados.</Text>
        )}
      </ScrollView>
      {userID === 2 && (
        <>
          <TouchableOpacity style={styles.fab} onPress={() => setShowAddForm(!showAddForm)}>
            <Text style={styles.fabIcon}>+</Text>
          </TouchableOpacity>
          {showAddForm && (
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Nombre del medicamento:</Text>
              <TextInput
                placeholder="Nombre del medicamento"
                onChangeText={(text) => setNewMed({ ...newMed, name: text })}
                value={newMed.name}
                style={styles.input}
              />
              <Text style={styles.formLabel}>Dosis:</Text>
              <TextInput
                placeholder="Dosis"
                onChangeText={(text) => setNewMed({ ...newMed, dose: text })}
                value={newMed.dose}
                style={styles.input}
              />
              <Text style={styles.formLabel}>Frecuencia (horas):</Text>
              <TextInput
                placeholder="Frecuencia (horas)"
                keyboardType="numeric"
                onChangeText={handleFrequencyChange}
                value={newMed.frequencyHours > 0 ? newMed.frequencyHours.toString() : ''}
                style={styles.input}
              />
              <Button title="Agregar" onPress={addNewMedication} />
            </View>
          )}
        </>
      )}
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff2ed',
  },
  medicationCard: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#065d9e',
  },
  scheduleTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#028383',
  },
  scheduleTime: {
    fontSize: 14,
    color: '#086567',
  },
  formContainer: {
    padding: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    color: '#000',
  },
  formLabel: {
    color: '#000',
    marginBottom: 5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#1290de',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
  },
});

export default MedicationReminderScreen;
