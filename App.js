import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import ResultsScreen from './src/ResultsScreen';
import RegisterScreen from './src/RegisterScreen';
import AboutScreen from './src/AboutScreen';
import UserScreen from './src/UserScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="About Us" component={AboutScreen} />
        <Stack.Screen name="User" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
