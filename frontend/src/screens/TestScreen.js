import React, { useEffect, useState } from "react";
import {
  Animated,
  AsyncStorage,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import color from "../constants/color";
import device from "../constants/device";
import { FlatGrid } from "react-native-super-grid";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function TestScreen({ navigation }) {
  const [screenList, setScreenList] = useState([
    "LoginScreen",
    // "RegisterScreen",
    "VetLoginScreen",
    // "VetRegisterScreen",
    // "ChatScreen",
    // "ServiceHistoryScreen",
    // "MatchingLandingScreen",
    // "MatchingReviewScreen",
    // "MatchingReportScreen",
    // "AboutUsScreen",
    // "ChangePasswordScreen",
    // "ContactUsScreen",
    // "EditProfileScreen",
    // "HomeScreen",
    // "MainScreen",
    // "NewPetScreen",
    // "ProfileScreen",
    // "SelectVetScreen",
    // "TopUpScreen",
    // "TopUpHistoryScreen",
    // "VetMainScreen",
    // "VetHomeScreen",
    // "VetProfileScreen",
    // "EditVetProfileScreen",
    // "EditPetScreen",
    // "PetScreen",
    // "CaseSummaryScreen",
    "AdminRegisterScreen",
  ]);

  useEffect(() => {
    AsyncStorage.clear();
  }, []);

  return (
    <React.Fragment>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <FlatGrid
            itemDimension={WIDTH * 0.3}
            data={screenList}
            style={{ flex: 1, marginTop: 10 }}
            spacing={10}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.testButton}
                onPress={() => {
                  navigation.navigate(item);
                }}
              >
                <Text style={{ fontFamily: "Kanit-Light" }}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <StatusBar
          style="auto"
          translucent={false}
          backgroundColor={color.sopetLightBrown}
        />
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  iPhoneNotch: {
    //   backgroundColor: colors.black70,
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
  testButton: {
    flex: 1,
    // width: '100%',
    height: HEIGHT * 0.1,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: color.sopetMediumBrown,
  },
});
