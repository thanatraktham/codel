import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  Modal,
  Platform,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Clipboard from "@react-native-community/clipboard";

import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MatIcon from "react-native-vector-icons/MaterialIcons";

import color from "../../constants/color";
import device from "../../constants/device";

import loginBackground from "../../assets/pages/loginBackground.png";

import main_home from "../../assets/images/main_home.png";
import main_vet from "../../assets/images/main_vet.png";
import main_noti from "../../assets/images/main_noti.png";
import main_profile from "../../assets/images/main_profile.png";
import HomeScreen from "./../HomeScreen";
import VetProfileScreen from "./VetProfileScreen";
import SelectVetScreen from "./../SelectVetScreen";
import VetHomeScreen from "./VetHomeScreen";
import VetServiceHistory from "./VetServiceHistory";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Tab = createMaterialBottomTabNavigator();

export default function VetMainScreen({ navigation }) {
  const [activeBar, setActiveBar] = useState("home");

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [hidePass, setHidePass] = useState(true);

  return (
    <React.Fragment>
      {device.iPhoneNotch && <Animated.View style={styles.iPhoneNotch} />}
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={loginBackground}
          style={{ flexGrow: 2 }}
          resizeMode="stretch"
        >
          <Tab.Navigator
            initialRouteName="VetHomeScreen"
            labeled={false}
            tabBarOptions={{
              showIcon: true,
              showLabel: false,
              indicatorStyle: {
                opacity: 0,
              },
            }}
            barStyle={{ height: "7%", backgroundColor: "white" }}
          >
            <Tab.Screen
              key={Date.now()}
              name="VetHomeScreen"
              component={VetHomeScreen}
              options={{
                tabBarIcon: () => (
                  <MatComIcon
                    name={"home-variant"}
                    size={30}
                    color={activeBar == "home" ? color.black70 : color.black20}
                    style={{ alignSelf: "center" }}
                  />
                ),
              }}
              listeners={{
                tabPress: () => {
                  setActiveBar("home");
                },
              }}
            />

            <Tab.Screen
              key={Date.now()}
              name="VetServiceHistory"
              component={VetServiceHistory}
              options={{
                tabBarIcon: () => (
                  <MatComIcon
                    name={"stethoscope"}
                    size={24}
                    color={
                      activeBar == "serviceHistory"
                        ? color.black70
                        : color.black20
                    }
                    style={{ alignSelf: "center" }}
                  />
                ),
              }}
              listeners={{
                tabPress: () => {
                  setActiveBar("serviceHistory");
                },
              }}
            />

            <Tab.Screen
              key={Date.now()}
              name="VetProfileScreen"
              component={VetProfileScreen}
              options={{
                tabBarIcon: () => (
                  <MatIcon
                    name={"person"}
                    size={30}
                    color={
                      activeBar == "profile" ? color.black70 : color.black20
                    }
                    style={{ alignSelf: "center" }}
                  />
                ),
              }}
              listeners={{
                tabPress: () => {
                  setActiveBar("profile");
                },
              }}
            />
          </Tab.Navigator>
        </ImageBackground>
      </SafeAreaView>
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
