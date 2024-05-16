import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { ipAddress } from './IpAddress';

const api = axios.create({
  baseURL: `http://${ipAddress}:3000`,
  timeout: 10000, // Optional: Timeout for requests (in milliseconds)
});

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [currentCountryOfCitizenship, setCurrentCountryOfCitizenship] = useState('');
  const [countryOfResidency, setCountryOfResidency] = useState('');
  const [criminalRecord, setCriminalRecord] = useState(false);
  const [validPassport, setValidPassport] = useState(false);
  const [initialInvestmentAmount, setInitialInvestmentAmount] = useState('');
  const [proofOfFundsAvailable, setProofOfFundsAvailable] = useState(false);
  const [healthInsuranceEstablished, setHealthInsuranceEstablished] = useState(false);
  const [languageProficiency, setLanguageProficiency] = useState('');

  const handleRegister = async () => {
    try {
      const response = await api.post('/register', {
        username,
        password,
        email,
        date_of_birth: dateOfBirth,
        current_country_of_citizenship: currentCountryOfCitizenship,
        country_of_residency: countryOfResidency,
        criminal_record: criminalRecord,
        valid_passport: validPassport,
        initial_investment_amount: initialInvestmentAmount,
        proof_of_funds_available: proofOfFundsAvailable,
        health_insurance_established: healthInsuranceEstablished,
        language_proficiency: languageProficiency,
      });

      if (response.status === 201) {
        // Registration successful, navigate to login screen
        navigation.navigate('Login');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 409) {
          alert('Username already exists. Please choose a different username.');
        } else {
          console.error('Registration Error:', error);
          alert('An error occurred during registration. Please try again.');
        }
      } else {
        console.error('Registration Error:', error);
        alert('An error occurred during registration. Please try again.');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Register Now!</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />
        <TextInput
          style={styles.input}
          placeholder="Current Country of Citizenship"
          value={currentCountryOfCitizenship}
          onChangeText={setCurrentCountryOfCitizenship}
        />
        <TextInput
          style={styles.input}
          placeholder="Country of Residency"
          value={countryOfResidency}
          onChangeText={setCountryOfResidency}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.textStyle}>Criminal Record:</Text>
          <Switch
            value={criminalRecord}
            onValueChange={setCriminalRecord}
            trackColor={{ false: "#767577", true: "#1b2c56" }}
            thumbColor={criminalRecord ? "#f4f3f4" : "#f4f3f4"}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.textStyle}>Valid Passport:</Text>
          <Switch
            value={validPassport}
            onValueChange={setValidPassport}
            trackColor={{ false: "#767577", true: "#1b2c56" }}
            thumbColor={validPassport ? "#f4f3f4" : "#f4f3f4"}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Initial Investment Amount"
          value={initialInvestmentAmount}
          onChangeText={setInitialInvestmentAmount}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.textStyle}>Proof of Funds Available:</Text>
          <Switch
            value={proofOfFundsAvailable}
            onValueChange={setProofOfFundsAvailable}
            trackColor={{ false: "#767577", true: "#1b2c56" }}
            thumbColor={proofOfFundsAvailable ? "#f4f3f4" : "#f4f3f4"}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.textStyle}>Health Insurance Established:</Text>
          <Switch
            value={healthInsuranceEstablished}
            onValueChange={setHealthInsuranceEstablished}
            trackColor={{ false: "#767577", true: "#1b2c56" }}
            thumbColor={healthInsuranceEstablished ? "#f4f3f4" : "#f4f3f4"}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Language Proficiency"
          value={languageProficiency}
          onChangeText={setLanguageProficiency}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: -100,
    color: '#1b2c56',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#1b2c56',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  textStyle: {
    color: '#1b2c56',
  },
  button: {
    backgroundColor: '#1b2c56',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default RegistrationScreen;
