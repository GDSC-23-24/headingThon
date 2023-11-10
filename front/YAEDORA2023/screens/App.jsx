import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './Splash';
import Start from './Start';
import Main from './Main';
import Notice from './Notice';
import My from './My';
import Map from './Map';
import StoreDetails from './StoreDetails';
import KoreaFood from './Food/KoreaFood';
import NomalFood from './Food/NomalFood';
import SuperFood from './Food/SuperFood';
import WesternFood from './Food/WesternFood ';
import BreadFood from './Food/BreadFood';
import ChinaFood from './Food/ChinaFood';
import FastFood from './Food/FastFood';
import JapanFood from './Food/JapanFood';
import Community from './Community';
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
        <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
        <Stack.Screen name="StoreDetails" component={StoreDetails} options={{ headerShown: false }} />
        <Stack.Screen name="KoreaFood" component={KoreaFood} options={{ headerShown: false }} />
        <Stack.Screen name="NomalFood" component={NomalFood} options={{ headerShown: false }} />
        <Stack.Screen name="SuperFood" component={SuperFood} options={{ headerShown: false }} />
        <Stack.Screen name="WesternFood" component={WesternFood} options={{ headerShown: false }} />
        <Stack.Screen name="BreadFood" component={BreadFood} options={{ headerShown: false }} />
        <Stack.Screen name="ChinaFood" component={ChinaFood} options={{ headerShown: false }} />
        <Stack.Screen name="FastFood" component={FastFood} options={{ headerShown: false }} />
        <Stack.Screen name="JapanFood" component={JapanFood} options={{ headerShown: false }} />
        <Stack.Screen name="Community" component={Community} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
