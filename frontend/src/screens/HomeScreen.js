import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  Animated,
  AsyncStorage,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
} from "react-native";
import axios from "axios";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import color from "../constants/color";
import device from "../constants/device";

import mainScreenBackground from "../assets/pages/mainScreenBackground.png";

import testImg from "../assets/images/testImg.png";
import dog from "../assets/images/dog.svg";
import cat from "../assets/images/cat.svg";
import bird from "../assets/images/bird.svg";
import rabbit from "../assets/images/rabbit.png";
import mouse from "../assets/images/mouse.svg";
import hospital1 from "../assets/images/hospital1.jpg";
import hospital2 from "../assets/images/hospital2.jpg";
import hospital3 from "../assets/images/hospital3.jpg";
import shop1 from "../assets/images/shop1.jpg";
import shop2 from "../assets/images/shop2.jpg";
import primaryLogo from "../assets/images/primaryLogo.png";

import SearchIcon from "react-native-vector-icons/Fontisto";

import TestScreen from "./TestScreen";
import { useUserInfo } from "../context/ClientInfoProvider";
import MainScreenNavBar from "../components/MainScreenNavBar";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

var keyIndex = 0;

const createKeyIndex = () => {
  var _keyIndex = keyIndex;
  keyIndex++;
  return _keyIndex;
};

const searchVetHandler = async (text) => {
  await axios
    .get(`https://codel-prod2-2ha7uwuvpq-as.a.run.app/client/search/${text}`)
    .then(function (response) {
      console.log(repsonse.data);
      setContactList(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};

const circle = (navigation, data) => {
  return data.map((e) => {
    return (
      <View key={e.id}>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => {
            navigation.navigate("SelectVetScreen");
          }}
        >
          <Image
            source={e.animalImg}
            style={{
              alignSelf: "center",
              width: "63%",
              height: "63%",
              // borderTopLeftRadius: 20,
              // borderTopRightRadius: 20,
            }}
          />
        </TouchableOpacity>

        <View style={{ height: "25%", justifyContent: "center" }}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Kanit-Light",
            }}
          >
            {e.shopName || e.HospitalName}
          </Text>
        </View>
      </View>

      // <View
      //   style={{

      //   }}
      // >
      //   <View
      //   style={styles.circle}
      //   >
      //   </View>
      // </View>
    );
  });
};

const createHorizontalBox = (data) => {
  return data.map((e) => {
    return (
      <TouchableOpacity key={e.id} style={styles.itemContainer}>
        <Image
          source={e.shopImg || e.hospitalImg}
          style={{
            width: "100%",
            height: "80%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
        <View style={{ height: "20%", justifyContent: "center" }}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Kanit-Light",
            }}
          >
            {e.shopName || e.HospitalName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });
};

export default function HomeScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [shopList, setShopList] = useState([
    { id: createKeyIndex(), shopImg: shop2, shopName: "Sensi-Fit" },
    { id: createKeyIndex(), shopImg: shop1, shopName: "Tesco Dog Food" },
    { id: createKeyIndex(), shopImg: shop2, shopName: "Sensi-Fit" },
    { id: createKeyIndex(), shopImg: shop1, shopName: "Tesco Dog Food" },
    { id: createKeyIndex(), shopImg: shop2, shopName: "Sensi-Fit" },
  ]);

  const [hospitalList, setHospitalList] = useState([
    {
      id: createKeyIndex(),
      hospitalImg: hospital1,
      HospitalName: "Vet 4 Animal Hospital",
    },
    {
      id: createKeyIndex(),
      hospitalImg: hospital2,
      HospitalName: "The Wisdom Hospital",
    },
    {
      id: createKeyIndex(),
      hospitalImg: hospital3,
      HospitalName: "Thonglor Pet Hospital",
    },
    {
      id: createKeyIndex(),
      hospitalImg: hospital1,
      HospitalName: "Vet 4 Animal Hospital",
    },
    {
      id: createKeyIndex(),
      hospitalImg: hospital2,
      HospitalName: "The Wisdom Hospital",
    },
  ]);

  const [animalList, setAnimalList] = useState([
    { id: createKeyIndex(), animalImg: dog, HospitalName: "หมา" },
    { id: createKeyIndex(), animalImg: cat, HospitalName: "แมว" },
    { id: createKeyIndex(), animalImg: rabbit, HospitalName: "กระต่าย" },
    { id: createKeyIndex(), animalImg: bird, HospitalName: "นก" },
    { id: createKeyIndex(), animalImg: mouse, HospitalName: "หนู" },
  ]);

  const { userState } = useUserInfo();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getEmail() {
      // const email = await AsyncStorage.getItem("email");
      console.log(userState.email);
      setEmail(userState.email);
      // setEmail(email);
    }
    getEmail();
  }, [isFocused]);

  return (
    <React.Fragment>
      {device.iPhoneNotch && <Animated.View style={styles.iPhoneNotch} />}

      <ImageBackground
        source={mainScreenBackground}
        style={{ flex: 1 }}
        resizeMode="stretch"
      >
        <MainScreenNavBar />

        <View style={{ flex: 4 }}>
          <View
            style={{
              flex: 3,
              justifyContent: "center",
              marginHorizontal: "5%",
              paddingTop: "0%",
              paddingBottom: "0%",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                textAlignVertical: "center",
                fontFamily: "Kanit-Medium",
                fontSize: 22,
                
              }}
            >
               ค้นหาสัตวแพทย์
            </Text>
            <Text
              style={{
                alignSelf: "center",
                textAlignVertical: "center",
                fontFamily: "Kanit-Light",
                fontSize: 16,
              }}
            >
              เพิ่มสัตว์เลี้ยงของคุณได้เลย !
            </Text>
          </View>

          <View
            style={{
              // flexDirection: "row",
              flex: 4,
              // marginBottom:"10%"
              // backgroundColor: 'red'
            }}
          >
            <Pressable
              style={{
                flex: 1,
                justifyContent: "center",
                marginHorizontal: "5%",
                marginTop: "1%",
                marginBottom: "3%",
                // paddingHorizontal: "2%",
                borderRadius: 100,
                backgroundColor: color.sopetDarkBrown,
              }}
              onPress={() => {
                navigation.navigate("SelectVetScreen");
              }}
            >
              
              <Text
              style={{
                alignSelf: "center",
                textAlignVertical: "center",
                fontFamily: "Kanit-Medium",
                fontSize: 16,
                color:"white"
              }}
              >
                ค้นหาสัตวแพทย์
              </Text>
              
            </Pressable>
            <Pressable
              style={{
                flex: 1,
                justifyContent: "center",
                marginHorizontal: "5%",
                marginBottom: "5%",
                // paddingHorizontal: "2%",
                borderRadius: 100,
                backgroundColor: color.sopetLightBrown,
                borderColor: color.sopetDarkBrown,
                borderWidth: 1.5
              }}
              onPress={() => {
                navigation.navigate("NewPetScreen");
              }}
            >
              <Text
              style={{
                alignSelf: "center",
                textAlignVertical: "center",
                fontFamily: "Kanit-Medium",
                fontSize: 16,
                color: color.sopetDarkBrown,
              }}
              >
                เพิ่มสัตว์เลี้ยง
              </Text>
            </Pressable>
          </View>
          {/* -----------------search--------------- */}
          {/* <View
            style={{
              flexDirection: "row",
              flex: 1,
              // marginBottom:"10%"
              // backgroundColor: 'red'
            }}
          >
            <View
              style={{
                flex: 11,
                justifyContent: "center",
                marginLeft: "5%",
                marginVertical: "1%",
                // paddingHorizontal: "2%",
                borderRadius: 100,
                backgroundColor: "white",
              }}
            ></View>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                marginLeft: "3%",
                marginRight: "5%",
                marginVertical: "1%",
                // paddingHorizontal: "0%",
                borderRadius: 100,
                backgroundColor: color.sopetDarkBrown,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  // backgroundColor: 'orange'
                }}
              >
                <Pressable
                  style={{
                    flexShrink: 1,
                    justifyContent: "center",
                    // backgroundColor: "white"
                  }}
                  onPress={() => {
                    navigation.navigate("SelectVetScreen");
                  }}
                >
                  <SearchIcon name="search" size={20} color={"white"} />
                </Pressable>
              </View>
            </View> */}
          {/* </View> */}
        </View>

        <View style={{ flex: 7 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                marginHorizontal: "5%",
                marginBottom: "1%",
              }}
            >
              <Text
                style={{
                  textAlignVertical: "center",
                  fontFamily: "Kanit-Light",
                  fontSize: 18,
                }}
              >
                โรงพยาบาลใกล้คุณ
              </Text>
            </View>
            <View style={{ flex: 5 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={{ flexDirection: "row" }}>
                  {createHorizontalBox(hospitalList)}
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                marginHorizontal: "5%",
                marginBottom: "1%",
              }}
            >
              <Text
                style={{
                  textAlignVertical: "center",
                  fontFamily: "Kanit-Light",
                  fontSize: 18,
                }}
              >
                ร้านค้า
              </Text>
            </View>
            <View style={{ flex: 5 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={{ flexDirection: "row" }}>
                  {createHorizontalBox(shopList)}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
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
  itemContainer: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "white",
  },
  circle: {
    width: 60,
    aspectRatio: 1,
    justifyContent: "center",
    marginHorizontal: 7,
    borderRadius: 1000,
    backgroundColor: "white",
  },
});
