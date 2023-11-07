import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './Start';
import Main from './Main'
import Splash from './Splash';
import Notice from './Notice';
import My from './My';

;

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Notice" component={Notice} options={{ headerShown: false }} />
        <Stack.Screen name="My" component={My} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
