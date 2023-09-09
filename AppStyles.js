import { StyleSheet } from 'react-native';

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
  button:{
    backgroundColor: "#4CAF50",
    borderColor: "#48BB78",
    borderWidth: 1,
    borderRadius: 5,
    color: "white",
    fontSize: 14,
    padding: 10,
    textAlign: "center",
    marginTop: 20
  }
});

export default styles;