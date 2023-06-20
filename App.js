// import { createAppContainer, createSwitchNavigator } from "react-navigation";
// // import { createStackNavigator } from "react-navigation-stack";
// import { createStackNavigator } from '@react-navigation/stack';
// import {
//   Welcome,
//   Login,
//   Register,
//   BottomTabNavigator,
//   AppLoading,
// } from "./src/screens";
// import ChangePassScreen from "./src/screens/ChangePassScreen";

// const stackNavigatorOptions = {
//   headerShown: false,
// };

// const AppStack = createStackNavigator(
//   {
//     BottomTabNavigator: {
//       screen: BottomTabNavigator,
//     },
//     ChangePassScreen: {
//       screen: ChangePassScreen,
//     },
//   },
//   {
//     defaultNavigationOptions: stackNavigatorOptions,
//   }
// );

// const AuthStack = createStackNavigator(
//   {
//     Welcome: {
//       screen: Welcome,
//     },
//     Login: {
//       screen: Login,
//     },
//     Register: {
//       screen: Register,
//     },
//   },
//   {
//     defaultNavigationOptions: stackNavigatorOptions,
//   }
// );

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       Loading: AppLoading,
//       App: AppStack,
//       Auth: AuthStack,
//     },
//     {
//       initialRouteName: "Loading",
//     }
//   )
// );
// import React, { createContext, useState, useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';


// import { collection, query, where, getDocs, orderBy, limit,onSnapshot } from "firebase/firestore";
// import { db } from './firebase/index'
// import store from "./screens/components/Redux/Store";
// import { Provider } from "react-redux";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Lottie from 'lottie-react-native';

// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import 'react-native-gesture-handler';
// // import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import { createStackNavigator } from '@react-navigation/stack';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import {
//   Welcome,
//   Login,
//   Register,
//   BottomTabNavigator,
//   AppLoading,
// } from "./src/screens";
// import ChangePassScreen from "./src/screens/ChangePassScreen";

// const Stack = createStackNavigator();

// function App() {
    
//     return (
//                 <NavigationContainer>
//                     <Stack.Navigator initialRouteName={AppLoading} screenOptions={{ headerShown: false }}>
//                         <Stack.Screen name="AppLoading" component={AppLoading} />
//                         <Stack.Screen name="Welcome" component={Welcome} />
//                         <Stack.Screen name="Login" component={Login} />
//                         <Stack.Screen name="Register" component={Register} />
//                         <Stack.Screen name="ChangePassScreen" component={ChangePassScreen} />
//                         <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />            
//                     </Stack.Navigator>
//                 </NavigationContainer>
//     )
// };
// export default App;

import * as React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/screens/Welcome'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import BottomTabNavigator from './src/screens/BottomTabNavigator'
import AppLoading from './src/screens/AppLoading'
import ChangePassScreen from './src/screens/ChangePassScreen'

function HomeScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={()=>{}}>
      <Text>Home Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;