import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity } from 'react-native';
import { useUser } from './UserContext';
import axios from 'axios'; // Import Axios for making HTTP requests
import { ipAddress } from './IpAddress';
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused hook

const api = axios.create({
  baseURL: `http://${ipAddress}:3000`,
  timeout: 10000, // Optional: Timeout for requests (in milliseconds)
});

const LoginScreen = ({ navigation }) => {
  const { loggedInUsername, setLoggedInUsername } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isFocused = useIsFocused(); // Get isFocused state from useIsFocused hook

  useEffect(() => {
    if (isFocused) {
      // Reset global username to null when the screen is focused
      setLoggedInUsername(null);
      // Clear username and password fields when navigating back to login screen
      setUsername('');
      setPassword('');
    }
  }, [isFocused, setLoggedInUsername]); // Trigger effect when isFocused or setLoggedInUsername changes

  const handleLogin = async () => {
    try {
      // Send POST request to login route with username and password
      const response = await api.post('/login', { username, password });

      // Check if login was successful
      if (response.status === 200) {
        // Navigate to Search screen if login successful
        setLoggedInUsername(username);
        navigation.navigate('Search');
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
    navigation.navigate('Registration');
  };

  const handleAboutUs = () => {
    // Navigate to About Us screen
    navigation.navigate('About Us');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.image} resizeMode="contain" />
        <TextInput
          style={[styles.input, { marginBottom: 15 }]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={[styles.input, { marginBottom: 40 }]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAboutUs}>
          <Text style={styles.buttonText}>About Us</Text>
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
  image: {
    width: 500,
    height: 130,
    marginBottom: 50,
  },
});

export default LoginScreen;
