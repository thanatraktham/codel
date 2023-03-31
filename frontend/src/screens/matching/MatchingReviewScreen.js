import React, { useReducer, useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  AsyncStorage,
  Dimensions,
  Image,
  Modal,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";

import MatIcon from "react-native-vector-icons/MaterialIcons";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import testImg from "../../assets/images/testImg.png";
import color from "../../constants/color";

import axios from "axios";

import NavBar from "../../components/NavBar";
import PetBox from "../../components/PetBox";
import SopetButton from "../../components/SopetButton";
import VetBox from "../../components/VetBox";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

var keyIndex = 0;

const createKeyIndex = () => {
  var _keyIndex = keyIndex;
  keyIndex++;
  return _keyIndex;
};

const InputBox = (props) => {
  return (
    <View style={{ flexGrow: 1, marginVertical: "2%" }}>
      <View
        style={{
          flexShrink: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Kanit-Light" }}>{props.title}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder={"พิมพ์ข้อความ"}
          onChangeText={props.onChangeText}
          multiline={true}
          maxLength={props.maxLength}
        />
      </View>
    </View>
  );
};

export default function MatchingReviewScreen({ navigation, route }) {
  const [userReview, setUserReview] = useState(5);
  // const [service_id, setService_id] = useState(route.params.service_id);
  const [finishReview, setFinishReview] = useState(false);
  const [showReportVet, setShowReportVet] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reportText, setReportText] = useState("พิมพ์ข้อความ");
  // console.log(route.params);

  // const { service_id, vet_match } = route.params;

  const service_id = route.params.service_id;
  const vet_match = route.params.vet_match;

  // console.log("-----------------------------------------------------");
  // console.log(vet_match);

  var reviewStars = [];
  for (let i = 0; i < 5; i++) {
    reviewStars.push(
      <MatIcon
        key={createKeyIndex()}
        name={"star"}
        size={60}
        color={userReview > i ? "#FFCB12" : "grey"}
        onPress={() => {
          setUserReview(i + 1);
        }}
      />
    );
  }

  const UpdateVetPointHandler = async () => {
    const token = await AsyncStorage.getItem("token");
    const data = {
      vet_id: vet_match.vet_id,
      // point: userReview,
    };
    await axios
      .patch(
        "https://codel-prod2-2ha7uwuvpq-as.a.run.app/client/update/vet/point",
        data,
        {
          headers: {
            Authorization: "bearer " + token,
          },
        }
      )
      .then(async function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  const addReviewHandler = async () => {
    const token = await AsyncStorage.getItem("token");
    const data = {
      suggestion: reviewText,
      satisfaction_point: userReview,
      service_id: service_id,
    };
    console.log(data);
    await axios
      .post(
        "https://codel-prod2-2ha7uwuvpq-as.a.run.app/service/review",
        data,
        {
          headers: {
            Authorization: "bearer " + token,
          },
        }
      )
      .then(async function (response) {
        UpdateVetPointHandler();
      })
      .catch(function (error) {
        console.log("error status", error.response.status);
      });
  };

  const addReportHandler = async () => {
    const token = await AsyncStorage.getItem("token");
    const data = {
      report_detail: reportText,
      service_id: service_id,
    };
    console.log(data);
    await axios
      .post(
        "https://codel-prod2-2ha7uwuvpq-as.a.run.app/service/report",
        data,
        {
          headers: {
            Authorization: "bearer " + token,
          },
        }
      )
      .then(async function (response) {})
      .catch(function (error) {
        console.log("error status", error.response.status);
      });
  };

  return (
    // <KeyboardAvoidingView
    //     behavior={Platform.OS === "ios" ? "padding" : "height"}
    //     style={styles.container}
    // >
    <Pressable
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: color.sopetMediumBrown,
          }}
        >
          <NavBar
            title="รีวิวหลังการปรึกษา"
            navigation={navigation}
            rightHandContent={
              <FontAwesomeIcon
                name={"exclamation-circle"}
                size={30}
                style={{ alignSelf: "center" }}
                onPress={() => {
                  setShowReportVet(true);
                }}
              />
            }
          />
        </View>

        <View style={{ flex: 10 }}>
          {/* Vet Info------------------------------------------------------------------- */}
          <View
            style={{
              flex: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {vet_match && (
              <VetBox
                key={createKeyIndex()}
                email={vet_match.email ? vet_match.email : "test@gmail.com"}
                firstname={vet_match.firstname}
                lastname={vet_match.lastname}
                license_id={
                  vet_match.license_id ? vet_match.license_id : "654321"
                }
                experiences={vet_match.experiences}
                educations={vet_match.educations}
                specialist_symptoms={vet_match.specialist_symptoms}
                specialist_animals={vet_match.specialist_animals}
                img={
                  "https://www.collinsdictionary.com/images/full/vet_548214847_1000.jpg"
                }
                point={vet_match.point}
                status={true}
                convertToView={true}
              />
            )}
            {!vet_match && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Text style={{ fontFamily: "Kanit-Light" }}>กำลังโหลด...</Text>
              </View>
            )}
          </View>
          {/* Matching Step Counter-------------------------------------------------------- */}
          <View style={{ flex: 2, alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}>{reviewStars}</View>
          </View>

          {/* Review Box------------------------------------------------------------------- */}
          <View style={styles.tasksWrapper}>
            <InputBox
              title="เขียนรีวิว"
              onChangeText={(text) => setReviewText(text)}
              maxLength={250}
            />
          </View>
          {/* Bottom Buttons--------------------------------------------------------- */}
          <View style={{ flex: 2, justifyContent: "center" }}>
            <View style={{ alignItems: "center" }}>
              <SopetButton
                text="เสร็จสิ้น"
                onPress={() => {
                  addReviewHandler();
                  setFinishReview(true);
                }}
              />
            </View>
          </View>
        </View>
        {/* Finish Review Modal--------------------------------------------------------------------------- */}
        <Modal transparent={true} visible={finishReview} animationType={"fade"}>
          <View style={styles.transparentBackground}>
            <View style={styles.modalContentContainer}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Kanit-Medium",
                    fontSize: 16,
                  }}
                >
                  ขอบคุณสำหรับการรีวิว
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setFinishReview(false),
                        // navigation.pop();
                        navigation.navigate("MainScreen");
                    }}
                  >
                    <Text style={styles.modalChoiceText}>กลับ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* Report Vet Modal--------------------------------------------------------------------------- */}
        <Modal
          transparent={true}
          visible={showReportVet}
          animationType={"fade"}
        >
          <View style={styles.transparentBackground}>
            <View style={styles.modalContentContainer}>
              <View style={{ flexShrink: 1 }}>
                <Text
                  style={{
                    fontFamily: "Kanit-Medium",
                    fontSize: 16,
                  }}
                >
                  รายงานความไม่เหมาะสม
                </Text>
              </View>
              <View style={{ flexGrow: 1, justifyContent: "flex-end" }}>
                <View style={{ width: "100%", justifyContent: "center" }}>
                  <TextInput
                    style={{ fontFamily: "Kanit-Light" }}
                    // value={reportText}
                    placeholder={"พิมพ์ข้อความ"}
                    onChangeText={(text) => setReportText(text)}
                    placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
                    underlineColorAndroid="transparent"
                  />
                </View>
              </View>
              <View style={{ flexGrow: 1, justifyContent: "flex-end" }}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setShowReportVet(false);
                    }}
                  >
                    <Text style={styles.modalChoiceText}>ส่ง</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowReportVet(false);
                      addReportHandler();
                    }}
                  >
                    <Text style={styles.modalChoiceText}>กลับ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </Pressable>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.sopetLightBrown,
  },
  inputBox: {
    flex: 1,
    textAlignVertical: "top",
    fontFamily: "Kanit-Light",
    padding: "3%",
    // backgroundColor: 'red'
  },
  inputContainer: {
    flexGrow: 1,
    width: "90%",
    // height: 40,
    // justifyContent: 'center',
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  modalContentContainer: {
    width: "80%",
    height: "15%",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 15,
    padding: 15,
    backgroundColor: "white",
  },
  modalChoiceText: {
    textAlign: "right",
    paddingHorizontal: 20,
    fontFamily: "Kanit-Medium",
    fontSize: 16,
    color: color.sopetDarkBrown,
  },
  processCircle: {
    width: "5%",
    aspectRatio: 1,
    borderRadius: 1000,
    backgroundColor: "grey",
  },
  tasksWrapper: {
    flex: 13,
    // backgroundColor: 'brown'
  },
  transparentBackground: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#000000aa",
  },
});
