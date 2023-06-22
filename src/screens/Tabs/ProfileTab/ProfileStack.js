import { createAppContainer } from 'react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditScreen from './EditScreen';
import Profile from '../../../components/TopTabbar/Profile';

// const stackNavigatorOptions = {
//     headerShown:false
//   }

// const ProfileTabNavigator = createStackNavigator({
//     Profile: {
//         screen: Profile,
//     },
//     EditScreen: {
//         screen: EditScreen,
//     },
// },
// {
//     initialRouteName: 'Profile',
//     defaultNavigationOptions: stackNavigatorOptions
// }
// );

// export default createAppContainer(ProfileTabNavigator)
const Stack = createNativeStackNavigator();
function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditScreen" component={EditScreen} />
        </Stack.Navigator>
    );
  }
  
  
  export default ProfileStack;