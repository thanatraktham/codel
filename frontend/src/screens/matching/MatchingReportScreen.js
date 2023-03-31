import React, { useReducer, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
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

import MatIcon from "react-native-vector-icons/MaterialIcons";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";

import testImg from "../../assets/images/testImg.png";

import color from "../../constants/color";
import { useUserInfo } from "../../context/ClientInfoProvider";

import NavBar from "../../components/NavBar";
import PetBox from "../../components/PetBox";
import SopetButton from "../../components/SopetButton";
import VetBox from "../../components/VetBox";

import axios from "axios";

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
    <View style={{ flexShrink: 1, marginVertical: "2%" }}>
      <View
        style={{
          flexShrink: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Kanit-Light" }}>{props.title}</Text>
      </View>
      <View style={[styles.inputContainer, { borderWidth: 1 }]}>
        <TextInput
          style={styles.inputBox}
          onChangeText={props.onChangeText}
          multiline={true}
        />
      </View>
    </View>
  );
};

export default function MatchingReportScreen({ navigation, route }) {
  const [userReview, setUserReview] = useState(2);
  const [finishReview, setFinishReview] = useState(false);
  // const [showReportVet, setShowReportVet] = useState(true);
  // const [reviewText, setReviewText] = useState("review test");
  const [reportText, setReportText] = useState("พิมพ์ข้อความ");

  //

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
            title="รายงานความไม่เหมาะสม"
            navigation={navigation}
            // rightHandContent={
            //     <MatComIcon
            //         name={"dots-vertical"}
            //         size={30}
            //         style={{alignSelf: 'center'}}
            //         onPress={()=>{
            //             setShowReportVet(true)
            //         }}
            //     />
            // }
          />
        </View>

        <View style={{ flex: 10 }}>
          {/* Vet Info------------------------------------------------------------------- */}
          {/* <View style={{flex: 5, justifyContent: 'center'}}>
                            <VetBox
                                img={"https://www.collinsdictionary.com/images/full/vet_548214847_1000.jpg"}
                                vetName="ศุภวิชญ์ สิทธัทถะ"
                                vetNo="1234567890"
                                animalType={["หมู", "หมา", "กา", "ไก่"]}
                                syndromeType={["ผิวหนัง", "ภูมิแพ้", "อายุกรรมทั่วไป"]}
                                url="facebook"
                                point={4.5}
                                status={true}
                                convertToView={true}
                            />
                        </View> */}

          {/* Report Box------------------------------------------------------------------- */}
          <View style={styles.tasksWrapper}>
            <InputBox
              title="เขียนรายงาน"
              onChangeText={(text) => setReportText(text)}
            />
          </View>
          {/* Bottom Buttons--------------------------------------------------------- */}
          <View style={{ flex: 2, justifyContent: "center" }}>
            <View style={{ alignItems: "center" }}>
              <SopetButton
                text="เสร็จสิ้น"
                onPress={() => {
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
                  ขอบคุณสำหรับการรายงาน
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setFinishReview(false), navigation.pop();
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
    fontFamily: "Kanit-Light",
    paddingHorizontal: "3%",
  },
  inputContainer: {
    flexGrow: 1,
    marginTop: 10,
    width: "95%",
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
    paddingHorizontal: 20,
  },
  transparentBackground: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#000000aa",
  },
});
