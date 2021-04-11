import React, {useState} from 'react';
import { Button, View, Text} from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen'
import LocatorScreen from './src/screens/LocatorScreen'
import FireScreen from './src/screens/FireScreen'

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>네에에에 :)</Text>
      <Button
        title="돌아가기"
        onPress={() => navigation.navigate('Status')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    // <NavigationContainer>
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="Status">
        <Stack.Screen name="Status" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Locator" component={LocatorScreen} />
        <Stack.Screen name="Fire" component={FireScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
