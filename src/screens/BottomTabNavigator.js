import React from 'react';
import {Dimensions} from 'react-native';
import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
// import  ProfileStack from './Tabs/ProfileTab/ProfileStack';
import  Profile from '../components/TopTabbar/Profile';
import Constants from '../utilities/Constants';
// import NutritionTabNavigator from './Tabs/NutritionTab/Navigator';
// import GeofenceTabNavigator from './Tabs/GeofenceTab/Navigator';
import GeofenceTab from './Tabs/GeofenceTab/GeofenceTab';
// import PlansTabNavigator from './Tabs/PlansTab/Navigator';

const windowHeight = Dimensions.get('window').height;

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  
  return (
    
    <Tab.Navigator initialRouteName="Profile"  screenOptions={{
        tabBarShowLabel:false,
        headerShown:false,
        tabBarActiveTintColor: Constants.COLOR.green,
        tabBarInactiveTintColor: Constants.COLOR.second_green,
        tabBarStyle:{
          height: 50,
          backgroundColor: Constants.COLOR.black,
          elevation: 8
        }
    }}>
      {/* <Tab.Screen name="PlansTabNavigator" component={PlansTabNavigator} options={{
          tabBarLabel: 'Plan',
          tabBarIcon: ({ tintColor }) => {
              return <MaterialCommunityIcons name="home-outline" 
              size={30} style={{color: tintColor}} />
          },
        }}/> */}

      <Tab.Screen name="GeofenceTab" component={GeofenceTab}  options={{
          tabBarLabel: 'Record',
          tabBarIcon: ({ tintColor }) => {
            return <MaterialCommunityIcons name="record-circle-outline" 
            size={28} style={{color: tintColor}}></MaterialCommunityIcons>
          },
        }} />

      {/* <Tab.Screen name="NutritionTabNavigator" component={NutritionTabNavigator}  options={{
          tabBarLabel: 'Nutrition',
          tabBarIcon: ({ tintColor }) => {
            return <MaterialCommunityIcons name="nutrition" 
            size={28} style={{color: tintColor}} />
        },
        }} /> */}
        <Tab.Screen name="Profile" component={Profile} options={{
          tabBarLabel: 'You',
          tabBarIcon: ({ tintColor }) => {
            return <AntDesign name='user' 
            size={28} style={{color: tintColor}}></AntDesign>
        },
        }}/>
    </Tab.Navigator>
    
  );
}
export default BottomTabNavigator;
