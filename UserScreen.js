import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { ipAddress } from './IpAddress';

const api = axios.create({
  baseURL: `http://${ipAddress}:3000`,
  timeout: 10000, // Timeout for requests (in milliseconds)
});

const UserScreen = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await api.get('/user', { params: { username: 'logged_in_username' } });

      if (response.status === 200) {
        setUserInfo(response.data.user);
      } else {
        Alert.alert('Error', 'Failed to fetch user information');
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
      Alert.alert('Error', 'An error occurred while fetching user information');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Information</Text>
      {userInfo ? (
        <View style={styles.userInfoContainer}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.info}>{userInfo.Username}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{userInfo.Email}</Text>
          {/* Display additional user information */}
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.info}>{userInfo.date_of_birth}</Text>
          <Text style={styles.label}>Current Country of Citizenship:</Text>
          <Text style={styles.info}>{userInfo.current_country_of_citizenship}</Text>
          <Text style={styles.label}>Country of Residency:</Text>
          <Text style={styles.info}>{userInfo.country_of_residency}</Text>
          <Text style={styles.label}>Criminal Record:</Text>
          <Text style={styles.info}>{userInfo.criminal_record ? 'Yes' : 'No'}</Text>
          {/* Add more user information fields as needed */}
        </View>
      ) : (
        <Text>Loading user information...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfoContainer: {
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default UserScreen;
