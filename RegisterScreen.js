import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://192.168.1.183:3000', // Replace with your IP address
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
      const response = await api.post('http://192.168.1.183:3000', {
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
      console.error('Registration Error:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
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
        <Text>Criminal Record:</Text>
        <Switch
          value={criminalRecord}
          onValueChange={setCriminalRecord}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>Valid Passport:</Text>
        <Switch
          value={validPassport}
          onValueChange={setValidPassport}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Initial Investment Amount"
        value={initialInvestmentAmount}
        onChangeText={setInitialInvestmentAmount}
      />
      <View style={styles.switchContainer}>
        <Text>Proof of Funds Available:</Text>
        <Switch
          value={proofOfFundsAvailable}
          onValueChange={setProofOfFundsAvailable}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>Health Insurance Established:</Text>
        <Switch
          value={healthInsuranceEstablished}
          onValueChange={setHealthInsuranceEstablished}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Language Proficiency"
        value={languageProficiency}
        onChangeText={setLanguageProficiency}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
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
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
});

export default RegistrationScreen;
