import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [meters, setMeters] = useState([{lastReading: 0, currentReading: 0, lastReadingDate: ''}]);
  const removeMeter = (index) => {
    const newMeters = meters.filter((_, i) => i !== index);
    setMeters(newMeters);
    storeData(newMeters);
  };
  

  useEffect(() => {
    getData().then(data => {
      if (data) setMeters(data);
    });
  }, []);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@meter_readings', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@meter_readings')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }

  const handleInputChange = (text, index, field) => {
    const newMeters = [...meters];
    newMeters[index][field] = text;
    setMeters(newMeters);
    storeData(newMeters);
  };

  const calculateDifference = (lastReading, currentReading) => {
    return currentReading - lastReading;
  }

  return (
    <View style={styles.container}>

      {meters.map((meter, index) => (
        <View key={index} style={styles.meterContainer}>
          <Text style={styles.meterText}>Meter {index + 1}</Text>
          <TextInput style={styles.input} placeholder="Last Reading"
            onChangeText={text => handleInputChange(text, index, 'lastReading')}
            value={meter.lastReading}
          />
          <TextInput style={styles.input} placeholder="Current Reading"
            onChangeText={text => handleInputChange(text, index, 'currentReading')}
            value={meter.currentReading}
          />
          <TextInput style={styles.input} placeholder="Last Reading Date"
            onChangeText={text => handleInputChange(text, index, 'lastReadingDate')}
            value={meter.lastReadingDate}
          />
          <Text style={styles.differenceText}>
            Difference: {calculateDifference(meter.lastReading, meter.currentReading)}
          </Text>
          <Button title="Remove Meter" onPress={() => removeMeter(index)}/>
        </View>
      ))}
      <Button 
        title="Add More Meters" 
        onPress={() => {
          const newMeters = [...meters, {lastReading: 0, currentReading: 0, lastReadingDate: ''}];
          setMeters(newMeters);
          storeData(newMeters);
        }}
        disabled={meters.length >= 3}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8f8f8"
  },
  meterContainer: {
    marginTop: 20,
    borderColor: "#cccccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  meterText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333333'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  differenceText:{
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4500'
  },
});