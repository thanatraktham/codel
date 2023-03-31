import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";

import axios from "axios";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import color from "../../constants/color";
import device from "../../constants/device";

import registerBackground from "../../assets/pages/registerBackground.png";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function VetRegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [passMinLength, setPassMinLength] = useState(8);

  const [errorText, setErrorText] = useState("");
  const [hasError, setHasError] = useState(false);

  const checkRegister = () => {
    setHasError(false);
    if (firstName === "" || lastName === "") {
      setErrorText("กรุณาใส่ชื่อ นามสกุล");
      setHasError(true);
      return;
    }
    if (email === "") {
      setErrorText("กรุณาใส่อีเมล");
      setHasError(true);
      return;
    }
    if (pass === "" && confirmPass === "") {
      setErrorText("กรุณาใส่รหัสผ่าน");
      setHasError(true);
      return;
    }
    if (pass.length < passMinLength) {
      setErrorText("รหัสผ่านมีความยาวอย่างน้อย " + passMinLength + " ตัวอักษร");
      setHasError(true);
      return;
    }
    if (pass !== confirmPass) {
      setErrorText("รหัสผ่านไม่ตรงกัน");
      setHasError(true);
      return;
    }
    registerHandler();
  };

  const registerHandler = async () => {
    axios
      .post("https://codel-prod2-2ha7uwuvpq-as.a.run.app/vet/register", {
        email: email,
        password: pass,
        firstname: firstName,
        lastname: lastName,
      })
      .then(function (response) {
        // console.log("Then Vet");
        console.log(response.data);
        navigation.navigate("VetLoginScreen");
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status == 422) {
          setErrorText("กรุณาใส่อีเมลให้ถูกต้อง");
        } else if (error.response.status == 409) {
          setErrorText("อีเมลนี้มีผู้ใช้งานแล้ว");
        }
        setHasError(true);
        // console.log("Hello");
      });
  };

  return (
    <React.Fragment>
      {device.iPhoneNotch && <Animated.View style={styles.iPhoneNotch} />}
      <Animated.View style={styles.containerHeader}>
        {/* <Text>
                    HeaderText
                </Text> */}
      </Animated.View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={registerBackground}
          style={{ flex: 1 }}
          resizeMode="stretch"
        >
          <View style={{ flex: 2, alignItems: "center" }}>
            <Text style={{ fontFamily: "Kanit-Medium", fontSize: 80 }}>
              VET
            </Text>
            <Text style={{ fontFamily: "Kanit-Medium", fontSize: 20 }}>
              Register
            </Text>
          </View>
          <View style={{ flex: 8, justifyContent: "space-evenly" }}>
            <TextInput
              style={styles.inputBox}
              placeholder={"ชื่อจริง"}
              onChangeText={(text) => setFirstName(text)}
              placeholderTextColor={"rgba(0, 0, 0, 0.7)"}
              maxLength={45}
              // underlineColorAndroid='transparent'
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType={"off"}
              // keyboardType={'email-address'}
            />
            <TextInput
              style={styles.inputBox}
              placeholder={"นามสกุล"}
              onChangeText={(text) => setLastName(text)}
              placeholderTextColor={"rgba(0, 0, 0, 0.7)"}
              maxLength={50}
              // underlineColorAndroid='transparent'
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType={"off"}
              // keyboardType={'email-address'}
            />
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

            <View style={{ flexDirection: "row", marginLeft: "7%" }}>
              <TextInput
                style={styles.inputBox}
                placeholder={"ยืนยันรหัสผ่าน"}
                onChangeText={(text) => setConfirmPass(text)}
                placeholderTextColor={"rgba(0, 0, 0, 0.7)"}
                maxLength={50}
                // underlineColorAndroid='transparent'
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType={"off"}
                secureTextEntry={hidePass}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.inputBox,
                {
                  backgroundColor: color.sopetDarkBrown,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                  elevation: 10,
                },
              ]}
              onPress={() => {
                checkRegister();
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Kanit-Light",
                  color: "white",
                }}
              >
                สร้างบัญชี
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, paddingHorizontal: "10%" }}>
            {hasError && (
              <Text style={{ fontFamily: "Kanit-Light", color: "red" }}>
                {errorText}
              </Text>
            )}
            <Text
              style={{
                textAlign: "center",
                textDecorationLine: "underline",
                fontSize: 16,
                fontFamily: "Kanit-Medium",
                // color: 'red',
              }}
              onPress={() => {
                navigation.pop();
              }}
            >
              ย้อนกลับ
            </Text>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});
