import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState({});
  const [currentEvent, setCurrentEvent] = useState({ date: '', title: '', subject: '', hour: '', minutes: '' });

  const onDayPress = (day) => {
    Alert.alert("Registrar Evento", `¿Deseas registrar un evento el ${day.dateString}?`, [
      { text: "No", style: "cancel" },
      { text: "Sí", onPress: () => { setCurrentEvent({ ...currentEvent, date: day.dateString }); setModalVisible(true); }}
    ]);
  };

  const handleSaveEvent = () => {
    if (currentEvent.hour >= 0 && currentEvent.hour < 24 && currentEvent.minutes >= 0 && currentEvent.minutes < 60) {
      setEvents({ ...events, [currentEvent.date]: currentEvent });
      setCurrentEvent({ date: '', title: '', subject: '', hour: '', minutes: '' });
      setModalVisible(false);
    } else {
      Alert.alert("Error", "Por favor ingresa una hora válida.");
    }
  };

  const handleDeleteEvent = () => {
    const newEvents = { ...events };
    delete newEvents[currentEvent.date];
    setEvents(newEvents);
    setModalVisible(false);
    setCurrentEvent({ date: '', title: '', subject: '', hour: '', minutes: '' });
  };

  return (
    <View style={styles.container}>
      <Calendar onDayPress={onDayPress} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Título</Text>
            <TextInput
              style={styles.input}
              placeholder="Título del Evento"
              value={currentEvent.title}
              onChangeText={(text) => setCurrentEvent({ ...currentEvent, title: text })}
            />
            <Text style={styles.title}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Asunto"
              multiline
              numberOfLines={4}
              value={currentEvent.subject}
              onChangeText={(text) => setCurrentEvent({ ...currentEvent, subject: text })}
            />
            <Text style={styles.title}>Hora</Text>
            <View style={styles.timeContainer}>
              <TextInput
                style={[styles.input, styles.timeInput]}
                placeholder="HH"
                keyboardType="numeric"
                maxLength={2}
                value={currentEvent.hour}
                onChangeText={(text) => setCurrentEvent({ ...currentEvent, hour: text })}
              />
              <Text style={styles.colon}>:</Text>
              <TextInput
                style={[styles.input, styles.timeInput]}
                placeholder="MM"
                keyboardType="numeric"
                maxLength={2}
                value={currentEvent.minutes}
                onChangeText={(text) => setCurrentEvent({ ...currentEvent, minutes: text })}
              />
            </View>
            <Button title="Guardar Evento" onPress={handleSaveEvent} />
            <Button title="Eliminar Evento" onPress={handleDeleteEvent} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // Anchura del modal
  },
  multilineInput: {
    height: 100, // Ajuste de altura para el input multiline
    textAlignVertical: 'top', // Alineación del texto para Android
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderRadius: 10,
    color: 'black',
  },
  title: {
    alignSelf: 'flex-start',
    marginLeft: 12,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    width: 50,
  },
  colon: {
    color:'black',
    fontSize: 24,
    marginHorizontal: 6,
  },
});

export default CalendarScreen;
