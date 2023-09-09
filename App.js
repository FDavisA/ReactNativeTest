import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default function App() {
  const [meters, setMeters] = useState([{lastReading: 0, currentReading: 0, lastReadingDate: ''}]);

  const handleInputChange = (text, index, field) => {
    const tempMeters = [...meters];
    tempMeters[index][field] = text;
    setMeters(tempMeters);
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
        </View>
      ))}

      <Button title="Add More Meters" onPress={() => setMeters([...meters, {lastReading: 0, currentReading: 0, lastReadingDate: ''}])}/>

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