import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "../../utilities/Constants";
import FontLoader from "../../utilities/Font";
import Moment from "moment";
import { Foundation } from "@expo/vector-icons";
import { IconButtonDesign } from "../CustomButton";
import { ButtonSheetModal } from "../CustomModal";
import jwt_decode from "jwt-decode";
import Axios from "axios";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function Profile({ navigation }) {
  const [username, setUsername] = useState([]);
  const [info, setInfo] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkNullUndefined = (data) => {
    if (data === undefined || data === null || data === "") return false;
    return true;
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUsername(value);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  //run when navigate to this screen
  useEffect(() => {
    let clean = false;
    console.log("get details");
    AsyncStorage.getItem("authToken").then(async (token) => {
      var vl = jwt_decode(token);
      console.log("Token decode", vl._id);
      Axios.get(`https://runapp1108.herokuapp.com/api/users/getInfo/${vl._id}`)
        .then((res) => {
          if (!clean) {
            console.log(res.data);
            setInfo(res.data);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          if (!clean) console.log(error.message);
        });
      _retrieveData();
    });
    return () => {
      clean = true;
    };
  }, []);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            padding: 8,
            paddingHorizontal: 12,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color={Constants.COLOR.green} />
        </View>
      ) : (
        <ScrollView>
          <SafeAreaView style={{ marginTop: windowHeight / 80 }}>
            <ButtonSheetModal
              info={info}
              setInfo={setInfo}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
            {/* Photo + Name, Email */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                marginBottom: windowHeight / 50,
                padding: 4,
                paddingVertical: 8,
                backgroundColor: Constants.COLOR.white,
                elevation: 6,
              }}
            >
              <View
                style={{
                  height: windowWidth / 3,
                  width: windowWidth / 3,
                }}
              >
                {!checkNullUndefined(info.image) ? (
                  <Image
                    source={require("../../images/back.png")}
                    style={{
                      height: windowWidth / 3,
                      width: windowWidth / 3,
                      borderRadius: 100,
                      marginHorizontal: 4,
                    }}
                  />
                ) : (
                  <Image
                    source={{ uri: info.image }}
                    style={{
                      height: windowWidth / 3,
                      width: windowWidth / 3,
                      borderRadius: 100,
                      marginHorizontal: 4,
                    }}
                  ></Image>
                )}
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    position: "absolute",
                    bottom: -2,
                    right: -10,
                    backgroundColor: Constants.COLOR.green,
                    padding: 4,
                    paddingHorizontal: 6,
                    borderRadius: 16,
                    alignItems: "center",
                  }}
                >
                  <Foundation
                    name="camera"
                    size={26}
                    color={Constants.COLOR.white}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    padding: 4,
                    alignItems: "center",
                    width: (2 * windowWidth) / 3,
                  }}
                >
                  <FontLoader>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        fontFamily: "SemiBold",
                        fontSize: windowHeight / 30,
                        color: Constants.COLOR.green,
                      }}
                    >
                      {checkNullUndefined(info.fullname)
                        ? info.fullname
                        : username}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        fontFamily: "SemiRegular",
                        fontSize: windowHeight / 38,
                        color: Constants.COLOR.second_green,
                      }}
                    >
                      {info.mail}
                    </Text>
                  </FontLoader>
                  <View
                    style={{
                      borderWidth: 0.4,
                      borderColor: Constants.COLOR.green,
                      width: (2 * windowWidth) / 3,
                      marginVertical: 4,
                    }}
                  ></View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <IconButtonDesign
                    onPress={() => {
                      // navigation.pop();
                      navigation.navigate("EditScreen", {
                        fullname: info.fullname,
                        mail: info.mail,
                        description: info.description,
                        job: info.job,
                        phone: info.phone,
                        gender: info.gender,
                        address: info.address,
                        birthday: info.birthday,
                        height: info.height,
                        weight: info.weight,
                        image: info.image,
                        note: info.note,
                      });
                    }}
                    height={windowHeight / 20}
                    iconName="edit"
                    text="Edit"
                    iconSize={28}
                    fontSize={windowHeight / 28}
                    color={Constants.COLOR.green}
                    backgroundColor={Constants.COLOR.white}
                  />
                  <View style={{ width: 8 }}></View>
                </View>
              </View>
            </View>
          </SafeAreaView>
          {/* infomation */}
          <View>
            {/* description */}
            <View
              style={{
                padding: 4,
                paddingVertical: 8,
                backgroundColor: Constants.COLOR.white,
                elevation: 6,
              }}
            >
              <Text style={styles.title}>Description:</Text>
              <View
                style={{
                  padding: 4,
                }}
              >
                <Text style={styles.text}>
                  {!info.description ? "I am ..." : info.description}
                </Text>
              </View>
            </View>
            {/* else */}
            <View
              style={{
                marginVertical: windowHeight / 50,
                paddingVertical: 8,
                backgroundColor: Constants.COLOR.white,
                elevation: 6,
              }}
            >
              <View style={styles.container}>
                <Text style={styles.label}>Your birthday:</Text>
                <View style={{ width: "85%" }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.text}
                  >
                    {!info.birthday
                      ? ""
                      : Moment(info.birthday).format("DD/MM/YYYY")}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    padding: 8,
                    flexDirection: "row",
                  }}
                >
                  <Text style={styles.label}>Height:</Text>
                  <Text style={styles.text}>{info.height} cm</Text>
                </View>
                <View style={[styles.container, { paddingEnd: 28 }]}>
                  <Text style={styles.label}>Weight:</Text>
                  <Text style={styles.text}>
                    {!info.weight ? "" : info.weight} kg
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    padding: 8,
                    flexDirection: "row",
                  }}
                >
                  <Text style={styles.label}>Gender:</Text>
                  <Text style={styles.text}>{info.gender}</Text>
                </View>
                <View style={[styles.container, { paddingEnd: 28 }]}>
                  <Text style={styles.label}>Mobile:</Text>
                  <Text style={styles.text}>
                    {!info.phone ? "" : info.phone}
                  </Text>
                </View>
              </View>
              <View style={styles.container}>
                <Text style={styles.label}>Job:</Text>
                <Text style={styles.text}>{!info.job ? "" : info.job}</Text>
              </View>
              <View style={styles.container}>
                <Text style={styles.label}>Live in:</Text>
                <View style={{ width: "85%" }}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.text}
                  >
                    {info.address}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
  },
  title: {
    fontSize: windowHeight / 32,
    paddingLeft: 4,
    color: Constants.COLOR.dark_green,
    fontFamily: "SemiRegular",
  },
  label: {
    fontSize: windowHeight / 38,
    paddingLeft: 8,
    color: Constants.COLOR.dark_green,
    fontFamily: "SemiRegular",
  },
  text: {
    fontSize: windowHeight / 38,
    paddingLeft: 8,
    color: Constants.COLOR.second_green,
    fontFamily: "SemiRegular",
  },
});

export default Profile;
