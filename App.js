import React, {useState} from 'react';
import { Button, View, Text} from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen'
import LocatorScreen from './src/screens/LocatorScreen'
import FireScreen from './src/screens/FireScreen'

import ManualConnection from './src/screens/SerialTester'

const Stack = createStackNavigator();

function App() {
  return (
    // <NavigationContainer>
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="Status">
        <Stack.Screen name="Status" component={HomeScreen} />
        <Stack.Screen name="Locator" component={LocatorScreen} />
        <Stack.Screen name="Fire" component={FireScreen} />
        <Stack.Screen name="SerialTester" component={ManualConnection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
