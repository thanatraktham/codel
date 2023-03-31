import React, { useState, useEffect } from "react";

import {
  AsyncStorage,
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/Fontisto";
import IonIcon from "react-native-vector-icons/Ionicons";

import color from "../constants/color";
import axios from "axios";

import primaryLogo from "../assets/images/primaryLogo.png";
import testImg from "../assets/images/testImg.png";
import { useUserInfo } from "../context/ClientInfoProvider";
import VetBox from "../components/VetBox";
import SopetButton from "../components/SopetButton";
import MainScreenNavBar from "../components/MainScreenNavBar";
import { useIsFocused } from "@react-navigation/native";
import LoadingModal from "../components/LoadingModal";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

var keyIndex = 0;

const createKeyIndex = () => {
  var _keyIndex = keyIndex;
  keyIndex++;
  return _keyIndex;
};

export default function SelectVetScreen({ navigation }) {
  const [responseDataLoaded, setResponseDataLoaded] = useState(false);

  let secondTextInput = null;
  const isFocused = useIsFocused();

  const [searchValue, setSearchValue] = useState("");
  const [isPopup, setIsPopup] = useState(false);
  const { userState } = useUserInfo();
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    // console.log("Reloaded-------------------------------------------------------------");
    async function LoginFromToken() {
      const token = await AsyncStorage.getItem("token");
      // console.log("Login Token : " + token);
      await axios
        .get("https://codel-prod2-2ha7uwuvpq-as.a.run.app/client/search", {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then(function (response) {
          // console.log(
          //   "------------------------============================-------------"
          // );
          setContactList(response.data);
          console.log(response.data);

          setResponseDataLoaded(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    LoginFromToken();
  }, [isFocused]);

  const TagBox = (props) => {
    return (
      <View key={props} style={{ flexGrow: 1, marginHorizontal: "2%" }}>
        <View style={{ flexShrink: 1 }}>
          <Text style={{ fontFamily: "Kanit-Light" }}>{props.title}</Text>
        </View>
        <View
          style={{
            flexGrow: 1,
            flexWrap: "wrap",
            flexDirection: "row",
            borderRadius: 5,
          }}
        >
          {props.tagList.map((e) => {
            return (
              <TouchableOpacity
                key={e.id}
                style={{
                  paddingHorizontal: "3%",
                  marginRight: "2%",
                  marginVertical: "2%",
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: e.tagSelect ? color.sopetDarkBrown : null,
                  backgroundColor: e.tagSelect ? color.sopetDarkBrown : "white",
                }}
                onPress={() => {
                  {
                    props.title === "ประเภทสัตว์" &&
                      setPets([
                        {
                          id: createKeyIndex(),
                          tagName: pets[0].tagName,
                          tagSelect:
                            e.tagName === pets[0].tagName
                              ? !e.tagSelect
                              : pets[0].tagSelect,
                        },
                        {
                          id: createKeyIndex(),
                          tagName: pets[1].tagName,
                          tagSelect:
                            e.tagName === pets[1].tagName
                              ? !e.tagSelect
                              : pets[1].tagSelect,
                        },
                        {
                          id: createKeyIndex(),
                          tagName: pets[2].tagName,
                          tagSelect:
                            e.tagName === pets[2].tagName
                              ? !e.tagSelect
                              : pets[2].tagSelect,
                        },
                        {
                          id: createKeyIndex(),
                          tagName: pets[3].tagName,
                          tagSelect:
                            e.tagName === pets[3].tagName
                              ? !e.tagSelect
                              : pets[3].tagSelect,
                        },
                        {
                          id: createKeyIndex(),
                          tagName: pets[4].tagName,
                          tagSelect:
                            e.tagName === pets[4].tagName
                              ? !e.tagSelect
                              : pets[4].tagSelect,
                        },
                        {
                          id: createKeyIndex(),
                          tagName: pets[5].tagName,
                          tagSelect:
                            e.tagName === pets[5].tagName
                              ? !e.tagSelect
                              : pets[5].tagSelect,
                        },
                        {
                          id: createKeyIndex(),
                          tagName: pets[6].tagName,
                          tagSelect:
                            e.tagName === pets[6].tagName
                              ? !e.tagSelect
                              : pets[6].tagSelect,
                        },
                        {
                          id: createKeyIndex(),
                          tagName: pets[7].tagName,
                          tagSelect:
                            e.tagName === pets[7].tagName
                              ? !e.tagSelect
                              : pets[7].tagSelect,
                        },
                      ]);
                  }
                  {
                    props.title === "ลักษณะอาการ" &&
                      setSymtomps([
                        {
                          id: createKeyIndex(),
                          tagName: symptoms[0].tagName,
                          tagSelect:
                            e.tagName === symptoms[0].tagName
                              ? !e.tagSelect
                              : symptoms[0].tagSelect,
                        },
                        {
                          id: createKeyIndex(),
                          tagName: symptoms[1].tagName,
                          tagSelect:
                            e.tagName === symptoms[1].tagName
                              ? !e.tagSelect
                              : symptoms[1].tagSelect,
                        },
                        {
                          id: createKeyIndex(),
                          tagName: symptoms[2].tagName,
                          tagSelect:
                            e.tagName === symptoms[2].tagName
                              ? !e.tagSelect
                              : symptoms[2].tagSelect,
                        },
                        {
                          id: createKeyIndex(),
                          tagName: symptoms[3].tagName,
                          tagSelect:
                            e.tagName === symptoms[3].tagName
                              ? !e.tagSelect
                              : symptoms[3].tagSelect,
                        },
                        {
                          id: createKeyIndex(),
                          tagName: symptoms[4].tagName,
                          tagSelect:
                            e.tagName === symptoms[4].tagName
                              ? !e.tagSelect
                              : symptoms[4].tagSelect,
                        },
                      ]);
                  }
                }}
              >
                <Text
                  style={{
                    fontFamily: "Kanit-Light",
                    color: e.tagSelect ? "white" : color.sopetDarkBrown,
                  }}
                >
                  {e.tagName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const [pets, setPets] = useState([
    { id: createKeyIndex(), tagName: "ค้างคาว", tagSelect: false },
    { id: createKeyIndex(), tagName: "แมว", tagSelect: true },
    { id: createKeyIndex(), tagName: "เพนกวิน", tagSelect: true },
    { id: createKeyIndex(), tagName: "จระเข้", tagSelect: true },
    { id: createKeyIndex(), tagName: "ต้นไม้กินคน", tagSelect: false },
    { id: createKeyIndex(), tagName: "ไก่", tagSelect: true },
    { id: createKeyIndex(), tagName: "สุนัข", tagSelect: false },
    { id: createKeyIndex(), tagName: "นก", tagSelect: true },
  ]);

  const [symptoms, setSymtomps] = useState([
    { id: createKeyIndex(), tagName: "ผิวหนัง", tagSelect: false },
    { id: createKeyIndex(), tagName: "ฉุกเฉิน", tagSelect: true },
    { id: createKeyIndex(), tagName: "อุบัติเหตุ", tagSelect: true },
    { id: createKeyIndex(), tagName: "อายุรกรรมทั่วไป", tagSelect: true },
    { id: createKeyIndex(), tagName: "ช่องปากและฟัน", tagSelect: false },
  ]);

  const searchVetHandler = async (text) => {
    var lowerCaseText = text.toLowerCase();
    await axios
      .get(
        `https://codel-prod2-2ha7uwuvpq-as.a.run.app/client/search/${lowerCaseText}`
      )
      .then(function (response) {
        console.log(response.data);
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

  useEffect(() => {}, []);

  return (
    // ขอบบนติ่ง iphone
    <SafeAreaView style={{ flex: 1, backgroundColor: color.sopetLightBrown }}>
      {/* -------------------Name and pic profile----------------- */}
      <MainScreenNavBar />

      <View
        style={{
          flex: 11,
          // backgroundColor: 'brown'
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Kanit-Medium",
              fontSize: 20,
              marginHorizontal: "5%",
              marginVertical: "2%",
              alignContent: "center",
            }}
          >
            ค้นหาสัตวแพทย์
          </Text>
        </View>

        <View style={{ flex: 12 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{
                flex: 7,
                // backgroundColor: 'red'
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  marginLeft: "5%",
                  marginRight: "4%",
                  marginVertical: "1%",
                  marginBottom: "1%",
                  paddingHorizontal: "3%",
                  borderRadius: 20,
                  backgroundColor: "white",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // backgroundColor: 'orange'
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      ref={(input) => (secondTextInput = input)}
                      style={{
                        fontFamily: "Kanit-Light",
                        // backgroundColor: 'lime'
                      }}
                      onChangeText={(text) => {
                        searchVetHandler(text), setSearchValue(text);
                      }}
                      maxLength={50}
                      value={searchValue}
                      multiline={true}
                      blurOnSubmit={true}
                      focus={true}
                    />
                  </View>
                  <Pressable
                    style={{
                      flexShrink: 1,
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      console.log("Open text input");
                      secondTextInput.focus();
                    }}
                  >
                    <Icon name="search" size={20} />
                  </Pressable>
                </View>
              </View>
            </View>
            {/* filter------------------------------------------------------- */}
            <View
              style={{
                flex: 2,
              }}
            >
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginRight: "20%",
                  // marginBottom: "2%",
                  // marginLeft: "0%",
                  marginVertical: "5%",
                  // backgroundColor: 'orange'
                }}
              >
                <TouchableOpacity
                  style={{
                    flexShrink: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: "10%",
                    borderRadius: 20,
                    backgroundColor: color.sopetMediumBrown,
                    // backgroundColor: 'yellow'
                  }}
                  onPress={() => {
                    setIsPopup(!isPopup);
                  }}
                >
                  <View
                    style={{
                      flexShrink: 1,
                      justifyContent: "center",
                      // backgroundColor: 'lime'
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Kanit-Medium",
                        // color: 'white'
                      }}
                    >
                      Filter
                    </Text>
                  </View>
                  <View
                    style={{
                      flexShrink: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      // backgroundColor: 'green'
                    }}
                  >
                    <IonIcon
                      name="filter-sharp"
                      size={20}
                      // color={'white'}
                      style={
                        isPopup ? { transform: [{ rotate: "180deg" }] } : null
                      }
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* ---------------------------------------------------------- */}

          {/* -------------------------- others ---------------------- */}

          <View style={{ flex: 12 }}>
            <ScrollView
              contentContainerStyle={{ alignItems: "center", marginTop: "3%" }}
            >
              {contactList !== [] &&
                contactList.map((e) => {
                  return (
                    <VetBox
                      key={createKeyIndex()}
                      email={e.email}
                      firstname={e.firstname}
                      lastname={e.lastname}
                      license_id={e.license_id}
                      experiences={e.experiences}
                      educations={e.educations}
                      specialist_symptoms={e.specialist_symptoms}
                      specialist_animals={e.specialist_animals}
                      img={
                        "https://www.collinsdictionary.com/images/full/vet_548214847_1000.jpg"
                      }
                      point={e.point}
                      status={true}
                      onPress={() => {
                        navigation.navigate("MatchingLandingScreen", {
                          vetInfo: e,
                        });
                      }}
                    />
                  );
                })}
            </ScrollView>
          </View>
        </View>
      </View>
      {/* Filter Modal-------------------------------------------------------------- */}
      <Modal transparent={true} visible={isPopup} animationType={"fade"}>
        <View style={styles.transparentBackground}>
          <View style={styles.modalContentContainer}>
            <View
              style={{
                flexGrow: 1,
                width: "85%",
                justifyContent: "center",
                alignSelf: "center",
                borderRadius: 10,
                padding: "2%",
                backgroundColor: color.sopetMediumBrown,
              }}
            >
              <View
                style={{
                  flexShrink: 1,
                  alignItems: "center",
                  paddingVertical: "3%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Kanit-Medium",
                    fontSize: 18,
                  }}
                >
                  กรุณาเลือก filter ที่ต้องการ
                </Text>
              </View>
              <View style={{ flexShrink: 1 }}>
                <TagBox title="ประเภทสัตว์" tagList={pets} />
              </View>
              <View style={{ flexShrink: 1 }}>
                <TagBox title="ลักษณะอาการ" tagList={symptoms}></TagBox>
              </View>
              <View
                style={{
                  flexShrink: 1,
                  flexDirection: "row",
                  paddingVertical: "5%",
                  justifyContent: "space-evenly",
                }}
              >
                <SopetButton
                  text="ยกเลิก"
                  width={"25%"}
                  backgroundColor={color.sopetRed}
                  onPress={() => {
                    setIsPopup(false);
                  }}
                />
                <SopetButton
                  text="ยืนยัน"
                  width={"25%"}
                  // backgroundColor={color.sopetRed}
                  onPress={() => {
                    setIsPopup(false);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <LoadingModal visible={!responseDataLoaded} />
    </SafeAreaView>
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
  contactItem: {
    width: "90%",
    // flexShrink: 1,
    justifyContent: "center",
    // padding: '5%',
    marginVertical: "3%",
    // marginVertical: '3%',
    marginHorizontal: "5%",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
  },
  modalContentContainer: {
    flexShrink: 1,
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 15,
    // backgroundColor: 'white',
  },
  transparentBackground: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#000000aa",
  },
});
