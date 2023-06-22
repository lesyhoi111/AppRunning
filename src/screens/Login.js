import React, { useState, useEffect } from 'react';
import {Text, View, Image, TouchableOpacity, ActivityIndicator,
    KeyboardAvoidingView, Dimensions,   Alert, AsyncStorage
} from 'react-native';
import FontLoader from '../utilities/Font';
import TextInputDesign from '../components/TextInputDesign';
import Constants from '../utilities/Constants';
// import Axios from "axios";
import AppLoading from './AppLoading';
import { SafeAreaView } from 'react-navigation';
import { paddingBottom } from 'styled-system';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Login({navigation}) {
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const handleLogin = () => {
        console.log(username,password);    
        Axios.post("https://runapp1108.herokuapp.com/api/users/login",{username,password})
            .then((res)=>{
                _storeData('authToken',res.data);
                _storeData('username', username);
                _storeData('isUsed', '1');
                console.log(res.data, username, 1);
                navigation.navigate('BottomTabNavigator');
            })
            .catch((err)=>{
                Alert.alert(
                    "Oops!",
                    "Tài khoản hoặc mật khẩu sai rồi!!!",
                );
            })
    }

    //run when navigate to this screen
    const unsubscribe = navigation.addListener('didFocus', () => {
        setTimeout(() => {
            console.log("login loading")
            setIsLoading(false);
          }, 1000);
        console.log("get details")
    });

    const _storeData = async (key, data) => {
        try {
          await AsyncStorage.setItem(
            key, data
          );
        } catch (error) {
          console.log(error)
        }
      };

    return(
        
        <SafeAreaView style={{backgroundColor:Constants.COLOR.black,height:windowHeight}}>
            
            <View style={{
                height:windowHeight/3,
                justifyContent:'center',
                paddingLeft:20
            }}>
                <Text style={{
                    fontFamily: 'SemiBold', 
                    fontSize: 40,
                    color: Constants.COLOR.white,
                    }}
                >Hello,</Text>
                <Text style={{
                    fontFamily: 'SemiBold', 
                    fontSize: 40,
                    color: Constants.COLOR.white,
                    }}
                >Welcome back</Text>
            </View>
        
            <View style={{
                height: (windowHeight*2+100)/3,
                width: windowWidth,
                backgroundColor:Constants.COLOR.black
            }}>
                
                    <TextInputDesign
                        placeholder='Username'
                        iconName='user-alt'
                        isSecured={false}
                        onChangeText={(text) => setUsername(text)}
                    />
                    <View style={{marginTop:30}}>
                        <TextInputDesign
                            placeholder='Password'
                            iconName='key'
                            isSecured={true}
                            onChangeText={(text)=>setPassword(text)}
                        />
                    </View>
                
                <TouchableOpacity onPress={()=>{navigation.navigate('BottomTabNavigator')}} 
                    style={{
                    backgroundColor: Constants.COLOR.green,
                    elevation: 8,
                    alignItems: 'center',
                    borderRadius: 25,
                    marginHorizontal: 80,
                    justifyContent: 'center',
                    height:48,
                    marginTop: 50
                    }}>
                    <FontLoader>
                        <Text style={{
                            color: Constants.COLOR.white,
                            fontSize: 19,
                            fontFamily: 'SemiRegular',
                            fontWeight:'bold',
                            alignSelf: 'center',}}
                        >SIGN IN</Text>
                    </FontLoader>  
                </TouchableOpacity>
                <View style={{flex:1}}></View>
                <View style={{
                    flexDirection: 'row', 
                    justifyContent: 'center', 
                    alignItems: 'center' ,
                    paddingBottom:20
                }}>
                    <FontLoader>
                        <Text style={{
                            fontSize: 21,
                            fontFamily: 'SemiRegular',
                            color: Constants.COLOR.white,
                        }}>Don't have account? </Text>
                    </FontLoader> 
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{
                            fontSize: 22,
                            fontFamily: 'SemiRegular',
                            color: Constants.COLOR.white,
                        }}>Sign up now! </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login