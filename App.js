import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './src/UserContext';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import ResultsScreen from './src/ResultsScreen';
import RegistrationScreen from './src/RegisterScreen';
import AboutScreen from './src/AboutScreen';
import UserScreen from './src/UserScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1b2c56', // Set theme blue color here
            },
            headerTintColor: '#ffffff', // Set text color to white
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Search" component={HomeScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="About Us" component={AboutScreen} />
          <Stack.Screen name="My Info" component={UserScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
