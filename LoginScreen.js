import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios'; // Import Axios for making HTTP requests

const api = axios.create({
  baseURL: 'http://192.168.1.183:3000', // Replace with your IP address
  timeout: 10000, // Optional: Timeout for requests (in milliseconds)
});

const LoginScreen = ({ navigation }) => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Send POST request to login route with username and password
      const response = await api.post('/login', { username, password });
  
      // Check if login was successful
      if (response.status === 200) {
        // Navigate to Home screen if login successful
        navigation.navigate('Home');
      } else {
        // Display error message if login failed
        alert('Invalid username or password');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        alert('Invalid username or password');
      } else if (error.request) {
        // The request was made but no response was received
        alert('No response from server');
      } else {
        // Something happened in setting up the request that triggered an error
        alert('An error occurred while logging in');
      }
    }
  };

  const handleRegister = () => {
    // Navigate to Register screen
    navigation.navigate('Register');
  };
  const handleAboutUs = () => {
    // Navigate to About Us screen
    navigation.navigate('About');
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="username"
        value={username}
        onChangeText={setusername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
      <Button title="About Us" onPress={handleAboutUs} />
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
});

export default LoginScreen;
