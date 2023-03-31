import React, { Component } from "react";
import * as Font from "expo-font";
import { AsyncStorage, Image, StyleSheet, Text, View } from "react-native";

import primaryLogo from "./src/assets/images/primaryLogo.png";
import {
  UserInfoProvider,
  useUserInfo,
} from "./src/context/ClientInfoProvider";
import StackNavigation from "./src/navigation/StackNavigation";
import color from "./src/constants/color";

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      assetsLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      // 'Roboto-Bold': require('./src/assets/fonts/Roboto/Roboto-Bold.ttf'),
      // 'Roboto-Light': require('./src/assets/fonts/Roboto/Roboto-Light.ttf'),
      // 'Roboto-Medium': require('./src/assets/fonts/Roboto/Roboto-Medium.ttf'),
      // 'Roboto-Regular': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),
      "Kanit-Bold": require("./src/assets/fonts/Kanit/Kanit-Bold.ttf"),
      "Kanit-Light": require("./src/assets/fonts/Kanit/Kanit-Light.ttf"),
      "Kanit-Medium": require("./src/assets/fonts/Kanit/Kanit-Medium.ttf"),
    });

    const token = await AsyncStorage.getItem("token");
    console.log("Current Token : " + token);
    if (token) {
      this.setState({ loggedIn: true });
      LoginFromToken();
    }

    async function LoginFromToken() {
      console.log("Login From Token");
      await axios
        .get("https://codel-prod2-2ha7uwuvpq-as.a.run.app/client/user", {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    this.setState({ assetsLoaded: true });
  }

  render() {
    const { assetsLoaded, loggedIn } = this.state;
    if (!assetsLoaded) {
      return (
        <View
          style={[
            styles.container,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Image source={primaryLogo} />
        </View>
      );
    }

    // if (!loggedIn) {
    //   console.log("Not Logged In");
    //   return (
    //     <UserInfoProvider>
    //       <SafeAreaView style={styles.container}>
    //         <StackNavigation
    //           initialRouteName={"LoginScreen"}
    //           // initialRouteName={"VetLoginScreen"}
    //           // initialRouteName={"TestScreen"}
    //         />
    //       </SafeAreaView>
    //     </UserInfoProvider>
    //   );
    // }

    return (
      <UserInfoProvider>
        <SafeAreaView style={styles.container}>
          <StackNavigation
            // initialRouteName={"MainScreen"}
            // initialRouteName={"TestScreen"}
            // initialRouteName={"VetMainScreen"}
            initialRouteName={"LoginScreen"}
          />
        </SafeAreaView>
      </UserInfoProvider>
    );
    // if (assetsLoaded && loggedIn) {
    // }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.sopetLightBrown,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
