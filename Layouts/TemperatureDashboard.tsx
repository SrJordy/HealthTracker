import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const TemperatureDashboard = ({ temperaturaProp }) => {
    const lottieSource = require('./src/temperature.json');
    const navigation = useNavigation();
    const temperatura = temperaturaProp || 37.0; // Usar prop o valor predeterminado

    const estadoColor = {
        normal: '#2ecc71',
        fiebre: '#e74c3c',
        hipotermia: '#3498db',
    };

    let estado = 'normal';
    if (temperatura < 36.0) {
        estado = 'hipotermia';
    } else if (temperatura > 37.5) {
        estado = 'fiebre';
    } else if (temperatura >= 36.0 && temperatura <= 37.5) {
        estado = 'normal';
    }

    const handleBackButtonPress = () => {
        navigation.goBack();
    };

    // Generar etiquetas para cada minuto de la última hora
    const dataLabels = Array.from({ length: 60 }, (_, i) => `Min ${i + 1}`);

    // Ajustar el ancho del gráfico en función del número de etiquetas
    const chartWidth = Math.max(700, dataLabels.length * 60);

    const [dataValues, setDataValues] = useState(Array.from({ length: 60 }, () => Math.random() * 2 + 35));

    useEffect(() => {
        const interval = setInterval(() => {
            // Actualiza dataValues cada minuto
            setDataValues(prevData => {
                const newValue = Math.random() * 2 + 35;
                const newData = [...prevData.slice(1), newValue];
                return newData;
            });
        }, 60000); // 60 segundos

        return () => clearInterval(interval);
    }, []);

    const data = {
        labels: dataLabels,
        datasets: [
            {
                data: dataValues.map(value => value.toFixed(1)), // Redondear a un decimal
                color: (opacity = 1) => estadoColor[estado],
                strokeWidth: 2,
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        propsForLabels: {
            fontSize: 10, // Ajustar según necesidad
        },
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackButtonPress}>
                <Image
                    source={require('./src/icons/return.png')}
                    style={styles.backButtonImage}
                />
                <Text style={styles.backButtonText}>Retroceder</Text>
            </TouchableOpacity>

            <View style={styles.lottieContainer}>
                <LottieView source={lottieSource} autoPlay loop style={styles.lottieLogo} />
            </View>

            <Text style={styles.temperature}>Temperatura Corporal: {temperatura.toFixed(1)}°C</Text>

            <Text style={[styles.status, { color: estadoColor[estado] }]}>Estado: {estado}</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <LineChart
                    data={data}
                    width={chartWidth}
                    height={300}
                    chartConfig={chartConfig}
                    yAxisSuffix="°C"
                    bezier
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 20,
        color: 'black',
    },
    lottieContainer: {
        marginTop: 60, // Aumenta el margen para evitar la superposición con el botón
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottieLogo: {
        width: 150,
        height: 150,
    },
    temperature: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 20,
        color: 'black',
    },
    status: {
        fontSize: 24,
        marginBottom: 20,
    },
    backButtonImage: {
        width: 30,
        height: 30,
    },
});

export default TemperatureDashboard;
