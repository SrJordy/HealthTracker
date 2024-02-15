import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

const CalendarScreen = () => {
  const [showEventCreator, setShowEventCreator] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({});
  const [currentEvent, setCurrentEvent] = useState({ date: '', title: '', subject: '', time: new Date() });
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setShowEventCreator(false);
    setCurrentEvent({ ...currentEvent, date: day.dateString });
  };

  const openEventCreator = () => {
    setCurrentEvent({ date: selectedDate, title: '', subject: '', time: new Date() });
    setShowEventCreator(true);
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setCurrentEvent({ ...currentEvent, time: selectedTime });
    }
  };

  const handleSaveEvent = () => {
    if (!currentEvent.title || !currentEvent.subject) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const eventKey = `${selectedDate} ${currentEvent.time.getHours()}:${currentEvent.time.getMinutes()}`;
    setEvents({ ...events, [eventKey]: { ...currentEvent, date: selectedDate } });
    setShowEventCreator(false);
    setCurrentEvent({ date: '', title: '', subject: '', time: new Date() });
  };

  const handleCancelEvent = () => {
    setCurrentEvent({ date: '', title: '', subject: '', time: new Date() });
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
          <Text style={styles.modalTitle}>Fecha</Text>
          <Text style={styles.dateText}>{currentEvent.date}</Text>
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
          <TouchableOpacity style={[styles.input, styles.timeInput]} onPress={() => setShowTimePicker(true)}>
            <Text style={styles.Timeitem}>
              {currentEvent.time ? `${currentEvent.time.getHours()}:${currentEvent.time.getMinutes()}` : ''}
            </Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={currentEvent.time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeTime}
            />
          )}
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
            <Text style={styles.eventTime}>{`Hora: ${event.time.getHours()}:${event.time.getMinutes()}`}</Text>
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
    backgroundColor: '#eefffc',
  },
  customModalView: {
    backgroundColor: '#fff2ed',
    borderRadius: 20,
    padding: 20,
    width: '95%',
    alignItems: 'center',
    shadowColor: '#450508',
    elevation: 5,
    margin: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff5b37',
    alignSelf: 'flex-start',
    marginLeft: 12,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00a4a3',
    alignSelf: 'center',
    marginVertical: 10,
  },
  Timeitem: {
    fontSize: 20,
    color: '#00a4a3',
  },
  input: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    margin: 12,
    borderWidth: 1,
    borderColor: '#00a4a3',
    color: '#086567',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  timeInput: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00c3bd',
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
    backgroundColor: '#ff4122',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  eventsList: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    padding: 20,
    margin: 20,
  },
  eventItem: {
    marginBottom: 10,
  },
  eventDate: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ff5b37',
  },
  eventTitle: {
    fontSize: 14,
    color: '#086567',
  },
  eventDetail: {
    fontSize: 12,
    color: '#086567',
  },
  eventTime: {
    fontSize: 12,
    color: '#086567',
  },
  floatingButton: {
    backgroundColor: '#00c3bd',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 30,
    bottom: 30,
    elevation: 8,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  backButtonText: {
    fontSize: 20,
    color: '#086567',
  },
});

export default CalendarScreen;
