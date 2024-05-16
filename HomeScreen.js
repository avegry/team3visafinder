import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios'; // Import Axios for making HTTP requests
import { ipAddress } from './IpAddress';


const api = axios.create({
  baseURL: `http://${ipAddress}:3000`,
  timeout: 10000, // Timeout for requests (in milliseconds)
});

const HomeScreen = ({ navigation }) => {
  const [rankings, setRankings] = useState({
    processingTime: '',
    stepsToCompleteApplication: '',
    documentChecklist: '',
    governmentFees: '',
    tradeAgreement: '',
    pathToCitizenship: '',
    governmentSponsoredPerks: '',
    grantSourcingApps: '',
  });

  const handleChange = (title, value) => {
    if (value === null) {
      // If value is null, remove the corresponding key from the state
      setRankings(prevState => {
        const newState = { ...prevState };
        delete newState[title];
        return newState;
      });
    } else if (/^\d{0,2}$/.test(value) && (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 10))) {
      // If value is within the range of 1 to 10 or an empty string
      setRankings(prevState => ({
        ...prevState,
        [title]: value,
      }));
    }
  };
  

  const handleSubmit = async () => {
    try {
      const response = await api.post('/rankings', rankings);

      if (response.status !== 200) {
        throw new Error('Failed to submit rankings');
      }

      const { topCountries } = response.data; // Extract topCountries from response data

      navigation.navigate('Results', { topCountries }); // Pass topCountries as a navigation parameter
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  const handleUser = () => {
    // Navigate to User screen
    navigation.navigate('My Info');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} onTouchStart={dismissKeyboard}>
      <Text style={styles.title}>Visa Finder Questionnaire</Text>
      <Text style={styles.subtitle}>Please rank each statement based on importance: </Text> 
      <Text style={styles.subtitle}>1 being irrelevant and 10 being extremely important.</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Fast Processing Time</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.processingTime}
          onChangeText={value => handleChange('processingTime', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Few Steps to Complete Application</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.stepsToCompleteApplication}
          onChangeText={value => handleChange('stepsToCompleteApplication', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Easy Document Checklist</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.documentChecklist}
          onChangeText={value => handleChange('documentChecklist', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Low Government Fees</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.governmentFees}
          onChangeText={value => handleChange('governmentFees', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Many Trade Agreements</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.tradeAgreement}
          onChangeText={value => handleChange('tradeAgreement', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Quick Path to Citizenship</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.pathToCitizenship}
          onChangeText={value => handleChange('pathToCitizenship', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Good Government Sponsored Perks</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.governmentSponsoredPerks}
          onChangeText={value => handleChange('governmentSponsoredPerks', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Good Grant Sourcing Apps</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.grantSourcingApps}
          onChangeText={value => handleChange('grantSourcingApps', value)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUser}>
          <Text style={styles.buttonText}>My Info</Text>
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40, // Add vertical padding
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    color: '#1b2c56',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  inputTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#1b2c56',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#1b2c56',
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1b2c56',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default HomeScreen;
