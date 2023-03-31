import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  AsyncStorage,
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

import NavBar from "../../components/NavBar";
import PetBox from "../../components/PetBox";
import SopetButton from "../../components/SopetButton";
import VetBox from "../../components/VetBox";
import DateToString from "../../components/Function/DateToString";
import axios from "axios";
import LoadingModal from "../../components/LoadingModal";

import { useUserInfo } from "../../context/ClientInfoProvider";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

var keyIndex = 0;

const createKeyIndex = () => {
  var _keyIndex = keyIndex;
  keyIndex++;
  return _keyIndex;
};

const InfoBox = (props) => {
  return (
    <View key={createKeyIndex()} style={{ flexShrink: 1 }}>
      <View style={{ flexShrink: 1 }}>
        <Text style={{ fontFamily: "Kanit-Light", fontSize: 18 }}>
          {props.title}
        </Text>
      </View>
      <View
        style={{
          flexGrow: 1,
          paddingHorizontal: "2%",
          marginVertical: "2%",
          borderRadius: 5,
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontFamily: "Kanit-Light", fontSize: 16 }}>
          {props.detail}
        </Text>
      </View>
    </View>
  );
};

const TagBox = (props) => {
  return (
    <View key={createKeyIndex()} style={{ flexGrow: 1 }}>
      <View style={{ flexShrink: 1 }}>
        <Text style={{ fontFamily: "Kanit-Light", fontSize: 18 }}>
          {props.title}
        </Text>
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
            <View
              key={createKeyIndex()}
              style={{
                paddingHorizontal: "3%",
                marginRight: "2%",
                marginVertical: "2%",
                borderRadius: 5,
                backgroundColor: color.sopetDarkBrown,
              }}
            >
              <Text
                style={{
                  fontFamily: "Kanit-Light",
                  fontSize: 16,
                  color: "white",
                }}
              >
                {e.animal || e.symptom}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const InputBox = (props) => {
  return (
    <View style={{ flexShrink: 1, marginVertical: "2%" }}>
      <View style={{ flexShrink: 1 }}>
        <Text style={{ fontFamily: "Kanit-Light", fontSize: 18 }}>
          {props.title}
        </Text>
      </View>
      <View style={[styles.inputContainer, { borderWidth: 0 }]}>
        <TextInput
          style={styles.inputBox}
          defaultValue={props.defaultValue}
          onChangeText={props.onChangeText}
          multiline={true}
          maxLength={props.maxLength}
        />
      </View>
    </View>
  );
};

export default function CaseSummaryScreen({ navigation, route }) {
  const { service_id, isEditable } = route.params;
  const { userState } = useUserInfo();
  const [responseDataLoaded, setResponseDataLoaded] = useState(false);

  const [reportText, setReportText] = useState("พิมพ์ข้อความ");
  const [finishReview, setFinishReview] = useState(false);

  const [caseSummaryByServiceId, setCaseSummaryByServiceId] = useState();

  const isFocused = useIsFocused();
  const AddCaseSummaryHandler = async () => {
    const token = await AsyncStorage.getItem("token");
    // console.log("Login Token : " + token);
    const data = {
      summary_deal: reportText,
      service_id: service_id,
    };
    // console.log(data);
    await axios
      .post(
        "https://codel-prod2-2ha7uwuvpq-as.a.run.app/service/summary",
        data,
        {
          headers: {
            Authorization: "bearer " + token,
          },
        }
      )
      .then(async function (response) {
        // console.log("Data--------------------------------------");
        // console.log(response.data);
        // setServiceHistory(response.data);
        navigation.pop();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    async function GetCaseSummary() {
      // const token = await AsyncStorage.getItem("token");
      // console.log("Login Token : " + token);
      await axios
        .get(
          `https://codel-prod2-2ha7uwuvpq-as.a.run.app/service/service/${service_id}`
        )
        .then(async function (response) {
          console.log("Data--------------------------------------");
          console.log(response.data);
          setCaseSummaryByServiceId(response.data);
          setResponseDataLoaded(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    GetCaseSummary();
  }, [isFocused]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "color.sopetMediumBrown",
          }}
        >
          <NavBar title="Case Summary" navigation={navigation} />
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
            {caseSummaryByServiceId && (
              <ScrollView>
                <InfoBox
                  title={"ชื่อสัตวแพทย์"}
                  detail={
                    "สพ. " +
                    (caseSummaryByServiceId.vet_match.firstname
                      ? caseSummaryByServiceId.vet_match.firstname
                      : "test") +
                    " " +
                    (caseSummaryByServiceId.vet_match.lastname
                      ? caseSummaryByServiceId.vet_match.lastname
                      : "test")
                  }
                />
                <TagBox
                  title={"ประเภทสัตว์ที่เชียวชาญ"}
                  tagList={
                    caseSummaryByServiceId.vet_match.specialist_animals
                      ? caseSummaryByServiceId.vet_match.specialist_animals
                      : " "
                  }
                />
                <TagBox
                  title={"กลุ่มอาการที่เชียวชาญ"}
                  tagList={
                    caseSummaryByServiceId.vet_match.specialist_symptoms
                      ? caseSummaryByServiceId.vet_match.specialist_symptoms
                      : " "
                  }
                />
                <InfoBox
                  title={"ชื่อเจ้าของสัตว์เลี้ยง"}
                  detail={
                    caseSummaryByServiceId.client_match.firstname +
                    " " +
                    caseSummaryByServiceId.client_match.lastname
                  }
                />
                <InfoBox
                  title={"ชื่อสัตว์เลี้ยง"}
                  detail={caseSummaryByServiceId.pet_match.name}
                />
                <InfoBox
                  title={"ประเภทสัตว์"}
                  detail={caseSummaryByServiceId.pet_match.type}
                />
                <InfoBox
                  title={"วันที่รักษา"}
                  detail={DateToString(
                    new Date(caseSummaryByServiceId.start_time)
                  )}
                />
                <InfoBox
                  title={"หัวข้อการรักษา"}
                  detail={caseSummaryByServiceId.topic}
                />
                {userState.client_id && !userState.vet_id && (
                  <InfoBox
                    title={"สรุปหลังการรักษา"}
                    detail={
                      caseSummaryByServiceId.create_summary
                        ? caseSummaryByServiceId.create_summary.summary_deal
                        : ""
                    }
                  />
                )}
                {userState.vet_id && !userState.client_id && (
                  <InputBox
                    title={"สรุปหลังการรักษา"}
                    defaultValue={
                      caseSummaryByServiceId.create_summary
                        ? caseSummaryByServiceId.create_summary.summary_deal
                        : ""
                    }
                    onChangeText={(text) => setReportText(text)}
                    maxLength={500}
                    editable={isEditable}
                  />
                )}
              </ScrollView>
            )}
            {!caseSummaryByServiceId && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontFamily: "Kanit-Medium", fontSize: 20 }}>
                  มีปัญหาให้การโหลดข้อมูล :(
                </Text>
              </View>
            )}
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
                  บันทึกเรียบร้อย
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setFinishReview(false), AddCaseSummaryHandler();
                    }}
                  >
                    <Text style={styles.modalChoiceText}>กลับ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        {/* Loading Modal--------------------------------------------------------------------------------------- */}
        <LoadingModal visible={!responseDataLoaded} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.sopetLightBrown,
  },
  inputBox: {
    fontFamily: "Kanit-Light",
    fontSize: 16,
    paddingHorizontal: "3%",
  },
  inputContainer: {
    flexGrow: 1,
    marginTop: 10,
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "white",
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.3,
    // shadowRadius: 3,
    // elevation: 3,
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
  tasksWrapper: {
    flex: 13,
    // height: '100%',
    borderRadius: 10,
    marginHorizontal: "5%",
    marginTop: "5%",
    paddingHorizontal: "5%",
    paddingTop: "5%",
    backgroundColor: color.sopetMediumBrown,
  },
  transparentBackground: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#000000aa",
  },
});
