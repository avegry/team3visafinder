import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, ScrollView } from 'react-native';
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
    setRankings(prevState => ({
      ...prevState,
      [title]: value,
    }));
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
    navigation.navigate('User');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} onTouchStart={dismissKeyboard}>
      <Text style={styles.title}>Visa Finder Questionnaire</Text>
      <Text style={styles.subtitle}>Please rank each statement based on importance, 1 being not important and 10 being very important.</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Processing Time</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.processingTime}
          onChangeText={value => handleChange('processingTime', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Steps to Complete Application</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.stepsToCompleteApplication}
          onChangeText={value => handleChange('stepsToCompleteApplication', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Document Checklist</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.documentChecklist}
          onChangeText={value => handleChange('documentChecklist', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Government Fees</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.governmentFees}
          onChangeText={value => handleChange('governmentFees', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Trade Agreement</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.tradeAgreement}
          onChangeText={value => handleChange('tradeAgreement', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Path to Citizenship</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.pathToCitizenship}
          onChangeText={value => handleChange('pathToCitizenship', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Government Sponsored Perks</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.governmentSponsoredPerks}
          onChangeText={value => handleChange('governmentSponsoredPerks', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Grant Sourcing Apps</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ranking (1-10)"
          keyboardType="numeric"
          value={rankings.grantSourcingApps}
          onChangeText={value => handleChange('grantSourcingApps', value)}
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
      <Button title="User Info" onPress={handleUser} />
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
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    alignItems: 'center', // Center items horizontally
  },
  inputTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center', // Center text horizontally
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
