import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const CalendarScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [showEventCreator, setShowEventCreator] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({});
  const [currentEvent, setCurrentEvent] = useState({ date: '', title: '', subject: '', time: new Date() });
  const [showTimePicker, setShowTimePicker] = useState(false);

  const openEventCreator = () => {
    setShowEventCreator(true);
    if (selectedDate === '') {
      setSelectedDate(new Date().toISOString().split('T')[0]);
    }
    setCurrentEvent({ date: selectedDate, title: '', subject: '', time: new Date() });
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setCurrentEvent({ date: day.dateString, title: '', subject: '', time: new Date() });
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setCurrentEvent({ ...currentEvent, time: selectedTime });
    }
  };

  const handleSaveEvent = () => {
    if (!currentEvent.title || !currentEvent.subject) {
      Alert.alert("Error", "Por favor complete los campos requeridos.");
      return;
    }

    const eventKey = `${currentEvent.date}T${currentEvent.time.getHours()}:${currentEvent.time.getMinutes()}`;
    setEvents({ ...events, [eventKey]: currentEvent });
    setShowEventCreator(false);
  };

  const handleCancelEvent = () => {
    setShowEventCreator(false);
  };

  const handleDeleteEvent = (eventKey) => {
    const updatedEvents = { ...events };
    delete updatedEvents[eventKey];
    setEvents(updatedEvents);
  };

  return (
    <SafeAreaView style={styles.container}>
      {user && user.roles.includes('cuidador') && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      )}

      <Calendar onDayPress={onDayPress} markedDates={Object.keys(events).reduce((acc, cur) => {
        acc[cur.split("T")[0]] = { marked: true, dotColor: 'red' };
        return acc;
      }, {})} />

      {!showEventCreator && (
        <TouchableOpacity style={styles.addButton} onPress={openEventCreator}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      )}

      {showEventCreator && (
        <View style={styles.overlay}>
          <View style={styles.eventCreatorContainer}>
            <Text style={styles.fieldLabel}>Fecha: {currentEvent.date}</Text>
            <Text style={styles.fieldLabel}>Asunto:</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe el título aquí"
              value={currentEvent.title}
              onChangeText={(text) => setCurrentEvent({ ...currentEvent, title: text })}
            />
            <Text style={styles.fieldLabel}>Descripción:</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Escribe la descripción aquí"
              multiline
              value={currentEvent.subject}
              onChangeText={(text) => setCurrentEvent({ ...currentEvent, subject: text })}
            />
            <TouchableOpacity style={styles.timeInput} onPress={() => setShowTimePicker(true)}>
              <Text style={styles.timeText}>Hora: {currentEvent.time.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={currentEvent.time}
                mode="time"
                display="default"
                onChange={onChangeTime}
              />
            )}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSaveEvent}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancelEvent}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <ScrollView style={styles.eventsListContainer}>
        {Object.entries(events).map(([key, event]) => (
          <View key={key} style={styles.eventItem}>
            <Text style={styles.eventDate}>Fecha: {event.date}</Text>
            <Text style={styles.eventTitle}>Asunto: {event.title}</Text>
            <Text style={styles.eventSubject}>Descripción: {event.subject}</Text>
            <Text style={styles.eventTime}>Hora: {new Date(event.time).toLocaleTimeString()}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteEvent(key)}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  backButton: {
    marginLeft: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  backButtonText: {
    fontSize: 18,
    color: '#000',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1,
  },
  eventCreatorContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  input: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: 'black',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  timeInput: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  timeText: {
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Asegura que el botón esté por encima de otros elementos
  },
  
  addButtonText: {
    fontSize: 24,
    color: 'white',
  },
  eventsListContainer: {
    marginTop: 20,
  },
  eventItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  eventDate: {
    fontSize: 16,
    color: '#333',
  },
  eventTitle: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  eventSubject: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  eventTime: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});



export default CalendarScreen;
