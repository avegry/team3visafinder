import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useUser } from './UserContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ipAddress } from './IpAddress';

const api = axios.create({
  baseURL: `http://${ipAddress}:3000`,
  timeout: 10000, // Timeout for requests (in milliseconds)
});

const UserScreen = () => {
  const { loggedInUsername } = useUser();
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation(); // Use the useNavigation hook

  useEffect(() => {
    if (loggedInUsername) {
      fetchUserInfo();
    }
  }, [loggedInUsername]);

  const fetchUserInfo = async () => {
    try {
      const response = await api.post('/user', null, { params: { username: loggedInUsername } });

      if (response.status === 200) {
        setUserInfo(response.data.user);
        console.log('User Information:', response.data.user); // Log user information
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
      {userInfo ? (
        <>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.userInfoContainer}>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.info}>{userInfo[0].username}</Text>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.info}>{userInfo[0].email}</Text>
              {/* Display additional user information */}
              <Text style={styles.label}>Date of Birth:</Text>
              <Text style={styles.info}>{userInfo[0].date_of_birth}</Text>
              <Text style={styles.label}>Current Country of Citizenship:</Text>
              <Text style={styles.info}>{userInfo[0].current_country_of_citizenship}</Text>
              <Text style={styles.label}>Country of Residency:</Text>
              <Text style={styles.info}>{userInfo[0].country_of_residency}</Text>
              <Text style={styles.label}>Criminal Record:</Text>
              <Text style={styles.info}>{userInfo[0].criminal_record ? 'Yes' : 'No'}</Text>
              <Text style={styles.label}>Valid Passport:</Text>
              <Text style={styles.info}>{userInfo[0].valid_passport ? 'Yes' : 'No'}</Text>
              <Text style={styles.label}>Initial Investment Amount:</Text>
              <Text style={styles.info}>{userInfo[0].initial_investment_amount}</Text>
              <Text style={styles.label}>Proof of Funds Available:</Text>
              <Text style={styles.info}>{userInfo[0].proof_of_funds_available ? 'Yes' : 'No'}</Text>
              <Text style={styles.label}>Health Insurance Established:</Text>
              <Text style={styles.info}>{userInfo[0].health_insurance_established ? 'Yes' : 'No'}</Text>
              <Text style={styles.label}>Language Proficiency:</Text>
              <Text style={styles.info}>{userInfo[0].language_proficiency}</Text>
            </View>
          </ScrollView>
        </>
      ) : (
        <Text>Loading user information...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -25,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoContainer: {
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#1b2c56',
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1b2c56',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: -10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default UserScreen;
