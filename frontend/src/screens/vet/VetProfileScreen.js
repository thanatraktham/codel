import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
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
  View,
  TouchableOpacity,
} from "react-native";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

import axios from "axios";

import color from "../../constants/color";
import NavBar from "../../components/NavBar";

import testImg from "../../assets/images/testImg.png";

import VetDetailScreen from "./VetDetailScreen";
import VetReviewScreen from "./VetReviewScreen";
import SopetButton from "../../components/SopetButton";
import MainScreenNavBar from "../../components/MainScreenNavBar";
import LoadingModal from "../../components/LoadingModal";
import DropDownBox from "../../components/DropDownBox";

import { useUserInfo } from "../../context/ClientInfoProvider";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

var keyIndex = 0;

const createKeyIndex = () => {
  var _keyIndex = keyIndex;
  keyIndex++;
  return _keyIndex;
};

export default function VetProfileScreen({ navigation }) {
  let _tmpStarCount = 1;
  const { userState, setUserState } = useUserInfo();

  const [activeContent, setActiveContent] = useState("info");
  const [responseDataLoaded, setResponseDataLoaded] = useState(false);
  // const [activeContent, setActiveContent] = useState("review")

  const [confirmLogout, setConfirmLogout] = useState(false);
  const [showSetStatus, setShowSetStatus] = useState(false);

  const [isActive, setIsActive] = useState(false);

  // Vet Info-----------------------------------------------------------
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [license, setLicense] = useState("123456");
  const [pets, setPets] = useState([]);
  const [specialty, setSpecialty] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  // Vet Review----------------------------------------------------------------
  const [serviceDoneCase, setServiceDoneCase] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  const isFocused = useIsFocused();

  const updateStatusHandler = async (isActive) => {
    const token = await AsyncStorage.getItem("token");
    const data = {
      status: isActive,
    };
    const userStateData = { ...userState, status: isActive };
    await axios
      .patch(
        "https://codel-prod2-2ha7uwuvpq-as.a.run.app/vet/updateStatus",
        data,
        {
          headers: {
            Authorization: "bearer " + token,
          },
        }
      )
      .then(function (response) {
        // setShowAcceptModal(false);
        setUserState(userStateData);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        console.log(userStateData);
      });
  };

  useEffect(() => {
    const getVetInfo = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log("token: " + token);
      await axios
        .get("https://codel-prod2-2ha7uwuvpq-as.a.run.app/vet/user", {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then(function (response) {
          console.log("Vet User---------------------------------------");
          console.log(response.data);
          setEmail(response.data.email);
          setFirstName(response.data.firstname);
          setLastName(response.data.lastname);
          setEducation(response.data.educations);
          setExperience(response.data.experiences);
          // setLicense_id(response.data.license_id);
          setPets(response.data.specialist_animals);
          setSpecialty(response.data.specialist_symptoms);
          setIsActive(response.data.status);
          // setResponseDataLoaded(true);
        })
        .catch(function (error) {
          console.error(error);
        });
      await axios
        .get(
          "https://codel-prod2-2ha7uwuvpq-as.a.run.app/service/vet?service_status=done",
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        )
        .then(async function (response) {
          // console.log("Service Done--------------------------------------");
          // console.log(response.data);
          setServiceDoneCase(response.data);

          setResponseDataLoaded(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getVetInfo();
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.sopetLightBrown }}>
      <View style={{ flex: 11, backgroundColor: "color.sopetLightBrown" }}>
        <View
          style={{
            flex: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "2%",
          }}
        >
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity
            style={{ flex: 2, aspectRatio: 1 }}
            onPress={() => {
              setShowSetStatus(true);
            }}
          >
            <Image
              source={{
                // uri: "https://storage.googleapis.com/sopet1/458ea5f4-027e-4449-91a7-c1e0bdd53723",
                uri: "https://www.collinsdictionary.com/images/full/vet_548214847_1000.jpg",
              }}
              style={{ flex: 1, aspectRatio: 1, borderRadius: 1000 }}
              // resizeMode="contain"
            />
            <View
              style={{
                justifyContent: "flex-end",
                position: "absolute",
                bottom: "0%",
                right: "0%",
              }}
            >
              <MatIcon
                name={isActive ? "circle" : null}
                size={45}
                color={"#31A24C"}
                style={{
                  flex: 1,
                  aspectRatio: 1,
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, height: "100%", justifyContent: "flex-end" }}
            onPress={() => {
              navigation.navigate("EditVetProfileScreen");
            }}
          >
            <Text
              style={{
                fontFamily: "Kanit-Medium",
                textDecorationLine: "underline",
                textAlign: "right",
                fontSize: 16,
                marginRight: "25%",
              }}
            >
              edit
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "5%" }}>
          <Pressable
            style={[
              styles.folderHeader,
              {
                marginTop: activeContent == "info" ? null : "1%",
                backgroundColor:
                  activeContent == "info" ? color.sopetMediumBrown : "#EFD8C8",
              },
            ]}
            onPress={() => {
              setActiveContent("info");
            }}
          >
            <Text style={{ fontFamily: "Kanit-Light", fontSize: 18 }}>
              ข้อมูล
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.folderHeader,
              {
                marginTop: activeContent == "review" ? null : "1%",
                backgroundColor:
                  activeContent == "review"
                    ? color.sopetMediumBrown
                    : "#EFD8C8",
              },
            ]}
            onPress={() => {
              setActiveContent("review");
            }}
          >
            <Text style={{ fontFamily: "Kanit-Light", fontSize: 18 }}>
              รีวิว
            </Text>
          </Pressable>
        </View>
        <View style={{ flex: 14 }}>
          <ScrollView
            style={{
              flex: 1,
              marginHorizontal: "5%",
              backgroundColor: color.sopetMediumBrown,
            }}
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: color.sopetMediumBrown,
            }}
          >
            {activeContent == "info" && responseDataLoaded && (
              <VetDetailScreen
                email={email}
                firstName={firstName}
                lastName={lastName}
                license={"654321"}
                pets={pets}
                specialty={specialty}
                education={education}
                experience={experience}
              />
            )}
            {activeContent == "review" && (
              <VetReviewScreen
                reviewList={
                  serviceDoneCase !== [] ? serviceDoneCase : reviewList
                }
              />
            )}
            <View style={{ height: 50, justifyContent: "center" }}>
              <Text
                style={{
                  textAlign: "center",
                  textDecorationLine: "underline",
                  fontSize: 16,
                  fontFamily: "Kanit-Medium",
                  // color: 'red',
                }}
                onPress={() => {
                  setConfirmLogout(true);
                }}
              >
                ออกจากระบบ
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
      {/* Confirm Logout Modal---------------------------------------------------------------------------------- */}
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
                      // AsyncStorage.clear(),
                      navigation.navigate("VetLoginScreen");
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
      {/* Set Status Modal---------------------------------------------------------------------------------- */}
      <Modal transparent={true} visible={showSetStatus} animationType={"fade"}>
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
              // flexShrink: 1,
              width: "80%",
              height: "30%",
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: 15,
              padding: 15,
              backgroundColor: "white",
            }}
          >
            <View style={{ flexShrink: 1 }}>
              <Text
                style={{
                  fontFamily: "Kanit-Medium",
                  fontSize: 16,
                }}
              >
                เปลี่ยน status ของคุณ
              </Text>
            </View>
            <View
              style={{
                flexGrow: 1,
                // flexDirection: "row",
                // justifyContent: "space-around",
                // backgroundColor: "brown",
              }}
            >
              <DropDownBox
                itemName="status"
                choice={[
                  { label: "Online", value: "Online" },
                  { label: "Offline", value: "Offline" },
                ]}
                placeholder={isActive ? "Online" : "Offline"}
                onChangeValue={(text) => {
                  if (text === "Online") {
                    setIsActive(true);
                    updateStatusHandler(true);
                  } else if (text === "Offline") {
                    setIsActive(false);
                    updateStatusHandler(false);
                  }
                }}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  // backgroundColor: "orange",
                }}
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <View style={{ justifyContent: "center" }}>
                    <View
                      style={{
                        width: 15,
                        aspectRatio: 1,
                        borderRadius: 15,
                        backgroundColor: isActive ? "#31A24C" : "grey",
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
                    {isActive ? "  Online" : "  Offline"}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flexShrink: 1, justifyContent: "flex-end" }}>
              <TouchableOpacity
                onPress={() => {
                  setShowSetStatus(false);
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
                  ปิด
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Loading Modal-------------------------------------------------------------------------------- */}
      <LoadingModal visible={!responseDataLoaded} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  folderHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "lime",
  },
});
