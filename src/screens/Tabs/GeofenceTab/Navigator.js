import { createAppContainer } from 'react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GeofenceTab from './GeofenceTab';
import SaveActivityScreen from './SaveActivityScreen';

// const GeofenceTabNavigator = createStackNavigator({
//     GeofenceTab: {
//         screen: GeofenceTab,
//     },
//     SaveActivityScreen: {
//         screen: SaveActivityScreen,
//     },
// });

const Stack = createNativeStackNavigator();

function GeofenceTabNavigator() {
  return (
      <Stack.Navigator initialRouteName="GeofenceTab" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GeofenceTab" component={GeofenceTab} />
        <Stack.Screen name="SaveActivityScreen" component={SaveActivityScreen} />
      </Stack.Navigator>
  );
}


export default GeofenceTabNavigator;