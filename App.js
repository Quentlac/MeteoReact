import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainWeather from "./Components/MainWeather";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DayWeather from "./Components/DayWeather";

const StackNav = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <StackNav.Navigator>
              <StackNav.Screen name="MainWeather" options={{title: "Aujourd'hui"}} component={MainWeather}></StackNav.Screen>
              <StackNav.Screen name="DayWeather" options={{title: "Un autre jour"}} component={DayWeather}></StackNav.Screen>
          </StackNav.Navigator>
      </NavigationContainer>
  );
}

