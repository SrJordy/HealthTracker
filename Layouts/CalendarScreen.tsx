import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const CalendarScreen = () => {
  const { user, pacie } = useAuth();
  console.log('datos del paciente:', pacie.User.ID)
  const navigation = useNavigation();
  const [showEventCreator, setShowEventCreator] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({});
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({ date: '', title: '', subject: '', time: new Date() });
  const [showTimePicker, setShowTimePicker] = useState(false);

  
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await axios.get('https://carinosaapi.onrender.com/agenda/getAll');
        const data = response.data;
        const eventsForPacie = data.filter(event => event.paciente_id === pacie.ID);
        setFilteredEvents(eventsForPacie);
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
        Alert.alert("Error", "No se pudieron cargar los eventos.");
      }
    };
  
    const loadPacienteCuidadorRelation = async () => {
      try {
        const response = await axios.get('https://carinosaapi.onrender.com/pacientecuidador/getAll');
        const data = response.data;
        const userRelation = data.find(relation => relation.Paciente.User.ID === user.ID);
        if (userRelation) {
          console.log("Relación Paciente-Cuidador encontrada:", userRelation);
        } else {
          console.log("No se encontró una relación Paciente-Cuidador para el usuario.");
        }
      } catch (error) {
        console.error('Error al obtener la relación Paciente-Cuidador:', error);
      }
    };
  
    loadEvents();
  
    if (user.roles.includes('paciente')) {
      loadPacienteCuidadorRelation();
    }
  }, [pacie.ID, user.ID, user.roles]); 

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

    const fechaISO = new Date(currentEvent.date + 'T' + currentEvent.time.toISOString().split('T')[1]).toISOString();

    const eventToSave = {
      PacienteID: pacie.ID,
      nombre: currentEvent.title,
      descripcion: currentEvent.subject,
      Fecha: fechaISO,
      Hora: fechaISO
    };

    axios.post('https://carinosaapi.onrender.com/agenda/insert', eventToSave)
      .then(response => {
        console.log('Evento guardado con éxito:', response.data);
        setCurrentEvent({ date: '', title: '', subject: '', time: new Date() });
        setShowEventCreator(false);
        Alert.alert("Éxito", "Agenda exitosa");
      })
      .catch(error => {
        console.error('Error al guardar el evento:', error);
        Alert.alert("Error", "No se pudo guardar el evento. Intente nuevamente.");
      });
  };

  const handleCancelEvent = () => {
    setShowEventCreator(false);
  };

  const handleDeleteEvent = (id) => {
    /*if (user.roles.includes('cuidador')) {
      axios.delete(`https://carinosaapi.onrender.com/agenda/delete/${id}`)
        .then(response => {
          Alert.alert("Éxito", "Evento eliminado exitosamente.");
        })
        .catch(error => {
          console.error('Error al eliminar el evento:', error);
          Alert.alert("Error", "No se pudo eliminar el evento. Intente nuevamente.");
        });
    }*/
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

      {user && user.roles.includes('cuidador') && selectedDate && (
        <TouchableOpacity style={styles.addButton} onPress={openEventCreator}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      )}

      {showEventCreator && (
        <View style={styles.overlay}>
          <View style={styles.eventCreatorContainer}>
            <Text style={styles.fieldLabel}>Fecha: {currentEvent.date}</Text>
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
        {filteredEvents.map((event) => {
          const fechaFormateada = event.fecha.split('T')[0];

          return (
            <View key={event.id} style={styles.eventItem}>
              <Text style={styles.eventDate}>Fecha: {fechaFormateada}</Text>
              <Text style={styles.eventTitle}>Nombre: {event.nombre}</Text>
              <Text style={styles.eventSubject}>Descripción: {event.descripcion}</Text>
              <Text style={styles.eventTime}>Hora: {new Date(event.hora).toLocaleTimeString()}</Text>
              {user && user.roles.includes('cuidador') && (
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteEvent(event.id)}>
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Fondo más claro para el contenedor principal
  },
  backButton: {
    margin:5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007bff', // Botón para volver con el color principal de la app
  },
  backButtonText: {
    fontSize: 18,
    color: '#ffffff', // Texto blanco para contraste
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)', // Hacer el fondo del overlay más oscuro para mejor enfoque
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  eventCreatorContainer: {
    padding: 20,
    backgroundColor: '#ffffff', // Fondo blanco para el formulario
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000', // Sombra para darle profundidad
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333', // Texto oscuro para mejor lectura
  },
  input: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#007bff', // Color principal para la línea del input
    padding: 10,
    backgroundColor: '#ffffff', // Fondo blanco para los inputs
    borderRadius: 5,
    color: '#333333', // Texto oscuro para los inputs
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  timeInput: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#eee', // Fondo más claro para el input de tiempo
    borderRadius: 5,
  },
  timeText: {
    color: '#333333', // Texto oscuro para mejor lectura
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#28a745', // Botón verde para acciones positivas
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#dc3545', // Botón rojo para cancelar o acciones negativas
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#17a2b8', // Color distinto para el botón de agregar
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
  },
  eventsListContainer: {
    marginTop: 20,
  },
  eventItem: {
    backgroundColor: '#ffffff', // Fondo blanco para los items del evento
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    shadowColor: '#000', // Sombra para darle profundidad
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventDate: {
    fontSize: 16,
    color: '#333333',
  },
  eventTitle: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff', // Usar el color principal para el título del evento
  },
  eventSubject: {
    fontSize: 16,
    color: '#666666', // Color más suave para la descripción
  },
  eventTime: {
    fontSize: 14,
    color: '#555555',
    marginTop: 5,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#dc3545', // Mantener el rojo para eliminar
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
