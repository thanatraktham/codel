import React, { useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import {
  Animated,
  AsyncStorage,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import axios from "axios";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import color from "../../constants/color";
import device from "../../constants/device";

import loginBackground from "../../assets/pages/loginBackground.png";
import primaryLogo from "../../assets/images/primaryLogo.png";
import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";

import { useUserInfo } from "../../context/ClientInfoProvider";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function VetLoginScreen({ navigation }) {
  const isFocused = useIsFocused();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [hidePass, setHidePass] = useState(true);

  const [errorText, setErrorText] = useState("");
  const [hasError, setHasError] = useState(false);
  const [loginUnsuccessful, setLoginUnsuccessful] = useState(false);
  const [emailIsBlank, setEmailIsBlank] = useState(false);
  const { setUserState } = useUserInfo();

  const checkLogin = () => {
    setHasError(false);
    AsyncStorage.clear();
    if (email === "") {
      setErrorText("กรุณาใส่อีเมล");
      setHasError(true);
      return;
    } else if (pass === "") {
      setErrorText("กรุณาใส่รหัสผ่าน");
      setHasError(true);
      return;
    }
    loginHandler();
  };

  const loginHandler = async () => {
    // console.log("hello")
    // console.log(email)
    // console.log(pass)
    await axios
      .post("https://codel-prod2-2ha7uwuvpq-as.a.run.app/vet/login", {
        // email: email,
        // password: pass,
        email: email ? email : "ironman@gmail.com",
        password: pass ? pass : "123456",
      })
      .then(async function (response) {
        // console.log(response);
        await AsyncStorage.setItem("token", response.data.token);
        const token = await AsyncStorage.getItem("token");
        console.log("Then User");
        setHasError(false);
        setErrorText("");
        await axios
          .get("https://codel-prod2-2ha7uwuvpq-as.a.run.app/vet/user", {
            headers: {
              Authorization: "bearer " + token,
            },
          })
          .then(async function (response) {
            setUserState(response.data);
            console.log(response.data);
            // await AsyncStorage.setItem("email", response.data.email);
            navigation.navigate("VetMainScreen");
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("Catch User");
        if (error.response.status === 400) {
          setErrorText("ไม่พบอีเมล");
        } else if (error.response.status === 401) {
          setErrorText("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        } else if (error.response.status === 422) {
          setErrorText("กรุณาใส่อีเมลให้ถูกต้อง");
        }
        setHasError(true);
      });
  };

  // useEffect(() => {
  //
  // }, [isFocused]);

  return (
    <React.Fragment>
      {device.iPhoneNotch && <Animated.View style={styles.iPhoneNotch} />}
      <Animated.View style={styles.containerHeader}>
        {/* <Text>
                    HeaderText
                </Text> */}
      </Animated.View>

      <ImageBackground
        source={loginBackground}
        style={{ flex: 1 }}
        resizeMode="stretch"
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
          >
            {/* <Image
                            source={primaryLogo}
                            resizeMode='stretch'
                        /> */}
            <Text style={{ fontFamily: "Kanit-Medium", fontSize: 80 }}>
              VET
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            flex: 6,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View
            style={{ flex: 3, width: WIDTH, justifyContent: "space-around" }}
          >
            <TextInput
              style={styles.inputBox}
              placeholder={"อีเมล"}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"rgba(0, 0, 0, 0.7)"}
              maxLength={50}
              // underlineColorAndroid='transparent'
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType={"off"}
              keyboardType={"email-address"}
            />

            <View style={{ flexDirection: "row", marginLeft: "7%" }}>
              <TextInput
                style={styles.inputBox}
                placeholder={"รหัสผ่าน"}
                onChangeText={(text) => setPass(text)}
                placeholderTextColor={"rgba(0, 0, 0, 0.7)"}
                maxLength={50}
                // underlineColorAndroid='transparent'
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType={"off"}
                secureTextEntry={hidePass}
              />
              <TouchableOpacity
                style={{
                  position: "relative",
                  right: 40,
                  top: 0,
                  justifyContent: "center",
                }}
                onPressIn={() => setHidePass(false)}
                onPressOut={() => setHidePass(true)}
              >
                <Icon
                  name={"eye-outline"}
                  size={20}
                  color={"rgba(0, 0, 0, 0.7)"}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: "10%",
              }}
            >
              {/* {
                                (hasError) && (
                                )
                            } */}
              <Text style={{ fontFamily: "Kanit-Light", color: "red" }}>
                {errorText}
              </Text>
              <Text style={{ fontFamily: "Kanit-Light" }}>ลืมรหัสผ่าน?</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.inputBox,
                {
                  backgroundColor: color.sopetDarkBrown,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 10,
                },
              ]}
              onPress={() => {
                console.log("Email: " + email + "\nPass: " + pass);
                // navigation.navigate("VetMainScreen")
                checkLogin();
              }}
              // onPress={()=>{navigation.navigate("VetMainScreen")}}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Kanit-Light",
                  color: "white",
                }}
              >
                เข้าสู่ระบบ
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Kanit-Light",
                  fontSize: 18,
                }}
              >
                ยังไม่เป็นสมาชิก?{"\t"}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Kanit-Light",
                  fontSize: 18,
                  textDecorationLine: "underline",
                  color: color.sopetDarkBrown,
                }}
                onPress={() => {
                  navigation.navigate("RegisterScreen");
                }}
              >
                สมัครเลย
              </Text>
            </View>
          </View>

          <View
            style={{ flex: 1, justifyContent: "space-evenly", width: WIDTH }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontFamily: "Kanit-Light" }}>
                หรือเข้าสู่ระบบด้วย
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "",
              }}
            >
              <Image
                source={google}
                resizeMode={"contain"}
                style={{ width: "20%", height: "80%" }}
              />
              <Image
                source={facebook}
                resizeMode={"contain"}
                style={{ width: "20%", height: "80%" }}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontFamily: "Kanit-Light",
            }}
          >
            กลับไป
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontFamily: "Kanit-Light",
              }}
            >
              เข้าสู่ระบบ{"\t"}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontFamily: "Kanit-Medium",
              }}
              onPress={() => {
                navigation.navigate("LoginScreen");
              }}
            >
              สมาชิก
            </Text>
          </View>
        </View>

        <StatusBar
          style="auto"
          translucent={false}
          backgroundColor={color.sopetLightBrown}
        />
      </ImageBackground>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  iPhoneNotch: {
    height: 44,
    position: "absolute",
    top: 0,
    width: "100%",
    // backgroundColor: 'red',
    zIndex: 20,
  },
  containerHeader: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: "5%",
    paddingTop: device.iPhoneNotch ? 60 : 36,
    // position: 'absolute',
    // top: 0,
    backgroundColor: color.sopetLightBrown,
    zIndex: 10,
  },
  inputBox: {
    width: WIDTH * 0.86,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "Kanit-Light",
    paddingHorizontal: 20,
    borderRadius: 40,
    backgroundColor: "white",
  },
});
