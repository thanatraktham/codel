import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Dimensions, Image, Text, View } from "react-native";

import color from "../constants/color";

import { useUserInfo } from "../context/ClientInfoProvider";

import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

import primaryLogo from "../assets/images/primaryLogo.png";
import { TouchableOpacity } from "react-native-gesture-handler";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const MainScreenNavBar = (props) => {
  const { userState } = useUserInfo();
  const [email, setEmail] = useState(userState.email);
  const [balance, setBalance] = useState(userState.cash_balance);
  const [profile_picture_url, setProfile_picture_url] = useState(
    userState.profile_picture_url
      ? userState.profile_picture_url
      : userState.vet_id
      ? "https://www.collinsdictionary.com/images/full/vet_548214847_1000.jpg"
      : "https://storage.googleapis.com/sopet1/458ea5f4-027e-4449-91a7-c1e0bdd53723"
  );

  const isFocused = useIsFocused();
  useEffect(() => {
    async function getEmail() {
      setEmail(userState.email);
      setBalance(userState.cash_balance);
      setProfile_picture_url(
        userState.profile_picture_url
          ? userState.profile_picture_url
          : userState.vet_id
          ? "https://www.collinsdictionary.com/images/full/vet_548214847_1000.jpg"
          : "https://storage.googleapis.com/sopet1/458ea5f4-027e-4449-91a7-c1e0bdd53723"
      );
      // console.log("balance : " + userState.cash_balance);
    }
    getEmail();
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        width: WIDTH,
        justifyContent: "center",
        backgroundColor: color.sopetMediumBrown,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: "5%",
        }}
      >
        <Image
          source={primaryLogo}
          resizeMode="contain"
          style={{ height: 50, width: 50 }}
        />
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <View style={{ justifyContent: "center", marginHorizontal: 7 }}>
            {!userState.vet_id && (
              <Text
                style={{
                  textAlign: "right",
                  textAlignVertical: "center",
                  fontFamily: "Kanit-Medium",
                  fontSize: 14,
                }}
              >
                {email}
                {"\n"}ยอดเงิน: {balance ? balance : 0} บาท
              </Text>
            )}
            {userState.vet_id && (
              <View>
                <Text
                  style={{
                    textAlign: "right",
                    textAlignVertical: "center",
                    fontFamily: "Kanit-Medium",
                    fontSize: 14,
                  }}
                >
                  {email}
                </Text>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <View style={{ justifyContent: "center" }}>
                    <View
                      style={{
                        width: 15,
                        aspectRatio: 1,
                        borderRadius: 15,
                        backgroundColor: userState.status ? "#31A24C" : "grey",
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      textAlign: "right",
                      textAlignVertical: "center",
                      fontFamily: "Kanit-Medium",
                      fontSize: 14,
                    }}
                  >
                    {userState.status ? "  Online" : "  Offline"}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={props.onPress}>
            <Image
              source={{ uri: profile_picture_url }}
              style={{ height: 50, width: 50, borderRadius: 50 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MainScreenNavBar;
