import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [showEventCreator, setShowEventCreator] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({});
  const [currentEvent, setCurrentEvent] = useState({ date: '', title: '', subject: '', hour: '', minutes: '' });

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setShowEventCreator(false);
  };

  const openEventCreator = () => {
    setCurrentEvent({ date: selectedDate, title: '', subject: '', hour: '', minutes: '' });
    setShowEventCreator(true);
  };

  const handleSaveEvent = () => {
    if (!currentEvent.title || !currentEvent.subject || !currentEvent.hour || !currentEvent.minutes) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (currentEvent.hour < 0 || currentEvent.hour >= 24 || currentEvent.minutes < 0 || currentEvent.minutes >= 60) {
      Alert.alert("Error", "Por favor ingresa una hora válida.");
      return;
    }

    const eventKey = `${selectedDate} ${currentEvent.hour}:${currentEvent.minutes}`;
    setEvents({ ...events, [eventKey]: { ...currentEvent, date: selectedDate } });
    setShowEventCreator(false);
    setCurrentEvent({ date: '', title: '', subject: '', hour: '', minutes: '' });
  };

  const handleCancelEvent = () => {
    setCurrentEvent({ date: '', title: '', subject: '', hour: '', minutes: '' });
    setShowEventCreator(false);
  };

  const handleDeleteEvent = (eventKey) => {
    const newEvents = { ...events };
    delete newEvents[eventKey];
    setEvents(newEvents);
  };

  return (
    <View style={styles.container}>
      <Calendar onDayPress={onDayPress} />

      {showEventCreator && (
        <View style={styles.customModalView}>
          <Text style={styles.modalTitle}>Título del Evento</Text>
          <TextInput
            style={styles.input}
            placeholder="Título del Evento"
            value={currentEvent.title}
            onChangeText={(text) => setCurrentEvent({ ...currentEvent, title: text })}
          />
          <Text style={styles.modalTitle}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Asunto"
            multiline
            numberOfLines={4}
            value={currentEvent.subject}
            onChangeText={(text) => setCurrentEvent({ ...currentEvent, subject: text })}
          />
          <Text style={styles.modalTitle}>Hora</Text>
          <View style={styles.timeContainer}>
            <TextInput
              style={[styles.input, styles.timeInput]}
              placeholder="HH"
              keyboardType="numeric"
              maxLength={2}
              value={currentEvent.hour}
              onChangeText={(text) => setCurrentEvent({ ...currentEvent, hour: text.replace(/[^0-9]/g, '') })}
            />
            <Text style={styles.colon}>:</Text>
            <TextInput
              style={[styles.input, styles.timeInput]}
              placeholder="MM"
              keyboardType="numeric"
              maxLength={2}
              value={currentEvent.minutes}
              onChangeText={(text) => setCurrentEvent({ ...currentEvent, minutes: text.replace(/[^0-9]/g, '') })}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSaveEvent}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancelEvent}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.eventsList}>
        {Object.entries(events).filter(([key, _]) => key.startsWith(selectedDate)).map(([eventKey, event]) => (
          <View key={eventKey} style={styles.eventItem}>
            <Text style={styles.eventDate}>{event.date}</Text>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDetail}>{event.subject}</Text>
            <Text style={styles.eventTime}>{`Hora: ${event.hour}:${event.minutes}`}</Text>
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDeleteEvent(eventKey)}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {!showEventCreator && selectedDate && (
        <TouchableOpacity style={styles.floatingButton} onPress={openEventCreator}>
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  customModalView: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  modalTitle: {
    alignSelf: 'flex-start',
    marginLeft: 12,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
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
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    width: 50,
  },
  colon: {
    color: 'black',
    fontSize: 24,
    marginHorizontal: 6,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'grey',
  },
  deleteButton: {
    backgroundColor: 'red',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  eventsList: {
    backgroundColor: '#f0f0f0',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  eventItem: {
    marginBottom: 10,
    color:'black'
  },
  eventDate: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  eventTitle: {
    fontSize: 14,
    color: 'black',
  },
  eventTime: {
    fontSize: 12,
    color: 'black',
  },
  eventDetail: {
    fontSize: 12,
    color: 'black',
  },
  floatingButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default CalendarScreen;
