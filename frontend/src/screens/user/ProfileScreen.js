import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  AsyncStorage,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

import color from "../../constants/color";
import device from "../../constants/device";

import loginBackground from "../../assets/pages/loginBackground.png";

import testImg from "../../assets/images/testImg.png";
import { useUserInfo } from "../../context/ClientInfoProvider";
import MainScreenNavBar from "../../components/MainScreenNavBar";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ListItem = (props) => {
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={props.onPress}>
      <View
        style={{ height: 3, marginHorizontal: "5%", backgroundColor: color.sopetLightBrown }}
      />
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={{
              textAlignVertical: "center",
              fontFamily: "Kanit-Medium",
              fontSize: 16,
              marginLeft: "15%",
            }}
          >
            {props.text}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: "10%",
          }}
        >
          <MatComIcon
            name={"chevron-right"}
            size={30}
            style={{ alignSelf: "center" }}
            color={color.sopetDarkBrown}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function ProfileScreen({ navigation }) {
  const { userState } = useUserInfo();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("_firstName");
  const [lastName, setLastName] = useState("_lastName");
  const [profile_picture_url, setProfile_picture_url] = useState(
    userState.profile_picture_url
      ? userState.profile_picture_url
      : "https://storage.googleapis.com/sopet1/458ea5f4-027e-4449-91a7-c1e0bdd53723"
  );
  const [balance, setBalance] = useState(userState.cash_balance);

  const [confirmLogout, setConfirmLogout] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    setFirstName(userState.firstname);
    setLastName(userState.lastname);
    setBalance(userState.cash_balance);
    setProfile_picture_url(
      userState.profile_picture_url
        ? userState.profile_picture_url
        : "https://storage.googleapis.com/sopet1/458ea5f4-027e-4449-91a7-c1e0bdd53723"
    );
  }, [isFocused]);

  return (
    <ImageBackground
      source={loginBackground}
      style={{ flex: 1 }}
      resizeMode="stretch"
    >
      {/* <MainScreenNavBar /> */}

      <View style={{ flex: 11, backgroundColor: "white" }}>
        <TouchableOpacity
          style={{ flex: 3, flexDirection: "row", marginHorizontal: "10%",marginVertical:"3%" }}
          onPress={() => {
            navigation.navigate("EditProfileScreen");
          }}
        >
          <View style={{ flex: 3, justifyContent: "center" }}>
            <Image
              source={{ uri: profile_picture_url }}
              style={{
                flex: 1,
                aspectRatio: 1,
                margin: "5%",
                borderRadius: 1000,
              }}
            />
          </View>
          <View style={{ flex: 9, justifyContent: "center" }}>
            <Text
              style={{
                textAlign: "center",
                textAlignVertical: "center",
                fontFamily: "Kanit-Medium",
                fontSize: 20,
              }}
            >
              {firstName}
              {"\n"}
              {lastName}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <MatComIcon
              name={"chevron-right"}
              size={30}
              style={{ alignSelf: "center" }}
              color={color.sopetDarkBrown}
            />
          </View>
        </TouchableOpacity>
        <View style={{ flex: 3 }}>
          <View
            style={{
              flex: 1,
              width: "91%",
              alignSelf: "center",
              padding: 7,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: color.sopetLightBrown,
              backgroundColor: color.sopetLightBrown,
            }}
          >
            <Text style={{ flex: 3, fontFamily: "Kanit-Medium",fontSize:16 , marginLeft: "2%" }}>
              จำนวนเงินคงเหลือ
            </Text>
            <Text
              style={{
                flex: 5,
                textAlign: "right",
                textAlignVertical: "bottom",
                fontFamily: "Kanit-Light",
                fontSize: 28,
              }}
            >
              {balance} บาท
            </Text>
          </View>
        </View>
        <View style={{ flex: 3, flexDirection: "row", paddingBottom:"3%",paddingRight:"5%" }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              navigation.navigate("TopUpScreen");
            }}
          >
            <View
              style={{
                flex: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MatComIcon color={color.sopetDarkBrown} name={"currency-usd-circle-outline"} size={50} />
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Kanit-Medium",
                  fontSize: 16,
                }}
              >
                เติมเงิน
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              navigation.navigate("PetScreen");
            }}
          >
            <View
              style={{
                flex: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MatIcon color={color.sopetDarkBrown} name={"pets"} size={50} />
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Kanit-Medium",
                  fontSize: 16,
                }}
              >
                สัตว์เลี้ยง
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              navigation.navigate("TopUpHistoryScreen");
            }}
          >
            <View
              style={{
                flex: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MatComIcon color={color.sopetDarkBrown} name={"history"} size={50} />
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Kanit-Medium",
                  fontSize: 16,
                }}
              >
                ประวัติการเติมเงิน
              </Text>
            </View>
          </TouchableOpacity>
        </View> 

        <View style={{ flex: 7 }}>
          <ListItem text="ตั้งค่าภาษา"  />
          <ListItem
            text="ติดต่อเรา"
            onPress={() => {
              navigation.navigate("ContactUsScreen");
            }}
          />
          <ListItem
            text="เกี่ยวกับเรา"
            onPress={() => {
              navigation.navigate("AboutUsScreen");
            }}
          />
          {/* <ListItem
            text="เปลี่ยนรหัสผ่าน"
            onPress={() => {
              navigation.navigate("ChangePasswordScreen");
            }}
          /> */}
          <ListItem 
            text="ออกจากระบบ"
            onPress={() => {
              setConfirmLogout(true);
            }}
          />
        </View>
        <View style={{ flex: 4 }}> 
        </View>
      </View>
      <Modal transparent={true} visible={confirmLogout} animationType={"fade"}>
        <View
          style={{
            flex: 1,
            width: "100%",
            alignSelf: "center",
            justifyContent: "center",
            backgroundColor: "#000000aa",
          }}
        >
          <View
            style={{
              width: "80%",
              height: "15%",
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: 15,
              padding: 15,
              backgroundColor: "white",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Kanit-Medium",
                  fontSize: 16,
                }}
              >
                คุณต้องการจะออกจากระบบหรือไม่
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setConfirmLogout(false),
                      AsyncStorage.clear(),
                      navigation.navigate("LoginScreen");
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      paddingHorizontal: 20,
                      fontFamily: "Kanit-Medium",
                      fontSize: 16,
                      color: color.sopetDarkBrown,
                    }}
                  >
                    ใช่
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setConfirmLogout(false);
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      paddingHorizontal: 20,
                      fontFamily: "Kanit-Medium",
                      fontSize: 16,
                      color: color.sopetDarkBrown,
                    }}
                  >
                    ไม่
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  iPhoneNotch: {
    height: 44,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 20,
  },
  containerHeader: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: "5%",
    paddingTop: device.iPhoneNotch ? 60 : 36,
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
