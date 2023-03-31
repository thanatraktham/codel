import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FlatGrid } from "react-native-super-grid";
import DateBox from "../../components/DateBox";

import color from "../../constants/color";
import NavBar from "../../components/NavBar";
import EditBox from "../../components/EditBox";

import sunSlip from "../../assets/images/sunSlip.png";
import testImg from "../../assets/images/testImg.png";
import primaryLogo from "../../assets/images/primaryLogo.png";

import SopetButton from "../../components/SopetButton";
import DateToString from "../../components/Function/DateToString";
import axios from "axios";
import { AsyncStorage } from "react-native";
import LoadingModal from "../../components/LoadingModal";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ObjToString = (obj) => {
  var _string = "";
  obj.map((e) => {
    if (e) {
      // console.log(e);
      return (_string =
        _string + (e.animal || e.symptom || e.education || e.work) + ", ");
    }
  });
  return _string;
};

const ObjToArray = (obj) => {
  var _arr = [];
  obj.map((e) => {
    if (e) {
      _arr.push(e.work || e.animal || e.symptom || e.education);
    }
  });
  return _arr;
};

export default function EditProfileScreen({ navigation }) {
  const [responseDataLoaded, setResponseDataLoaded] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [showUpload, setShowUpload] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setBirthdate(currentDate);
  };

  const [confirmUpdate, setConfirmUpdate] = useState(false);

  const [profilePictureUrl, setProfilePictureUrl] = useState(testImg);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [license_id, setLicense_id] = useState("");
  const [specialist_animals, setSpecialist_animals] = useState([]);
  const [specialist_symptoms, setSpecialist_symptoms] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  const [gallary, setGallary] = useState([
    { img: sunSlip },
    { img: testImg },
    { img: primaryLogo },
    { img: sunSlip },
    { img: testImg },
    { img: sunSlip },
    { img: testImg },
    { img: primaryLogo },
    { img: sunSlip },
    { img: testImg },
  ]);

  // const updateVetHandler = async () => {
  //   const token = await AsyncStorage.getItem("token");
  //   const data = {
  //     email: email,
  //     firstname: firstname,
  //     lastname: lastname,
  //     phone_number: phone_number,
  //     // birth_date: birthdate,
  //     experiences: experience,
  //     educations: education,
  //     specialist_symptoms: specialist_symptoms,
  //     specialist_animals: specialist_animals,
  //   };
  //   await axios
  //     .put("https://codel-prod2-2ha7uwuvpq-as.a.run.app/vet/update", data, {
  //       headers: {
  //         Authorization: "bearer " + token,
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log("test1");

  //       console.error(error);
  //     });
  // };

  useEffect(() => {
    const getVetInfo = async () => {
      const token = await AsyncStorage.getItem("token");
      await axios
        .get("https://codel-prod2-2ha7uwuvpq-as.a.run.app/vet/user", {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then(function (response) {
          console.log(response.data);
          setEmail(response.data.email);
          setFirstName(response.data.firstname);
          setLastName(response.data.lastname);
          setPhone_number(response.data.phone_number);
          // setLicense_id(response.data.license_id);
          setSpecialist_animals(response.data.specialist_animals);
          setSpecialist_symptoms(response.data.specialist_symptoms);
          setExperience(response.data.experiences);
          setEducation(response.data.educations);

          setResponseDataLoaded(true);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    getVetInfo();
  }, []);

  const updateProfileHandler = async () => {
    const token = await AsyncStorage.getItem("token");
    const data = {
      email: email,
      firstname: firstname ? firstname : "",
      lastname: lastname ? lastname : "",
      phone_number: phone_number ? phone_number : "",
      experiences: ObjToArray(experience),
      educations: ObjToArray(education),
      specialist_symptoms: ObjToArray(specialist_symptoms),
      specialist_animals: ObjToArray(specialist_animals),
    };
    await axios
      .put("https://codel-prod2-2ha7uwuvpq-as.a.run.app/vet/update", data, {
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: color.sopetLightBrown }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: color.sopetMediumBrown,
          }}
        >
          <NavBar title="แก้ไขโปรไฟล์สัตวแพทย์" navigation={navigation} />
        </View>

        <View style={{ flex: 2, flexDirection: "row", alignItems: "center" }}>
          {/* <View style={{ flex: 1 }} /> */}
          <View
            style={{ flex: 1, alignItems: "center" }}
            // onPress={() => {
            //   setShowUpload(true);
            // }}
          >
            <Image
              source={{
                // uri: "https://storage.googleapis.com/sopet1/458ea5f4-027e-4449-91a7-c1e0bdd53723",
                uri: "https://www.collinsdictionary.com/images/full/vet_548214847_1000.jpg",
              }}
              style={{
                flex: 1,
                aspectRatio: 1,
                margin: "3%",
                borderRadius: 1000,
                borderWidth: 1,
              }}
            />
          </View>
          {/* <View style={{ flex: 1, height: "100%", justifyContent: "flex-end" }}>
            <Icon
              name="camera-plus"
              size={20}
              style={{ position: "relative", right: 30 }}
            />
          </View> */}
        </View>

        <View style={{ flex: 10 }}>
          <ScrollView
            style={{ marginHorizontal: "5%", alignContent: "center" }}
            contentContainerStyle={{ paddingBottom: "5%" }}
          >
            <Text style={{ fontFamily: "Kanit-Medium" }}>ข้อมูลส่วนตัว</Text>
            <EditBox
              itemName="ชื่อ"
              defaultValue={firstname}
              onChangeText={(text) => setFirstName(text)}
              editable={false}
            />
            <EditBox
              itemName="นามสกุล"
              defaultValue={lastname}
              onChangeText={(text) => setLastName(text)}
              editable={false}
            />
            <EditBox
              itemName="โทรศัพท์"
              defaultValue={phone_number}
              onChangeText={(text) => setPhone_number(text)}
              keyboardType={"number-pad"}
              editable={true}
            />
            <EditBox
              itemName="อีเมล"
              defaultValue={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType={"email-address"}
              editable={false}
            />
            {/* <EditBox
                            itemName="ที่อยู่"
                            defaultValue={address}
                            onChangeText={(text) => setAddress(text)}
                            editable={true}
                        /> */}
            <DateBox
              itemName="วันเกิด"
              text={DateToString(date)}
              editable={false}
              // onPress={() => {
              //   setShow(!show);
              // }}
            />
            <EditBox
              itemName="เลขใบประกอบวิชาชีพ"
              defaultValue={"12345678"}
              onChangeText={(text) => setLicense_id(text)}
              editable={false}
            />
            <EditBox
              itemName="ประเภทสัตว์"
              defaultValue={ObjToString(specialist_animals)}
              // onChangeText={(text) => setSpecialist_animals(text)}
              editable={false}
            />
            <EditBox
              itemName="กลุ่มอาการ"
              defaultValue={ObjToString(specialist_symptoms)}
              // onChangeText={(text) => setSpecialist_symptoms(text)}
              editable={false}
            />
            <EditBox
              itemName="ประวัติการศึกษา"
              defaultValue={ObjToString(education)}
              // onChangeText={(text) => setEducation(text)}
              // keyboardType={"email-address"}
              editable={false}
            />
            <EditBox
              itemName="ประวัติการทำงาน"
              defaultValue={ObjToString(experience)}
              // onChangeText={(text) => setExperience(text)}
              // keyboardType={"email-address"}
              editable={false}
            />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"date"}
                is24Hour={true}
                display="spinner"
                onChange={onChange}
              />
            )}
            {show && (
              <View style={{ alignItems: "center" }}>
                <SopetButton
                  text="ตกลง"
                  onPress={() => {
                    setShow(false);
                  }}
                />
              </View>
            )}

            <View style={{ alignItems: "center" }}>
              {!show && (
                <SopetButton
                  text="บันทึก"
                  onPress={() => {
                    updateProfileHandler(), setConfirmUpdate(true);
                  }}
                />
              )}
            </View>
          </ScrollView>
        </View>

        {/* Alert Profile Updated */}
        <Modal
          transparent={true}
          visible={confirmUpdate}
          animationType={"fade"}
        >
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
                  อัพเดตโปรไฟล์เรียบร้อย
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setConfirmUpdate(false), navigation.pop();
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
                      ตกลง
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* Upload Profile Picture From Gallary */}
        <Modal transparent={true} visible={showUpload} animationType={"fade"}>
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
                height: "80%",
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
                  เลือกรูปภาพ
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <FlatGrid
                  itemDimension={WIDTH * 0.2}
                  data={gallary}
                  style={{ marginTop: 10, flex: 1 }}
                  spacing={2}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        aspectRatio: 1,
                        alignItems: "center",
                      }}
                      onPress={() => {
                        // setSlipAdded(true),
                        setShowUpload(false), setProfilePictureUrl(item.img);
                      }}
                    >
                      <Image
                        source={item.img ? item.img : primaryLogo}
                        style={{
                          flex: 1,
                          aspectRatio: 1,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                />
                <SopetButton
                  text="ปิด"
                  onPress={() => {
                    setShowUpload(false);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <LoadingModal visible={!responseDataLoaded} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBox: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    textAlignVertical: "center",
    fontFamily: "Kanit-Light",
    paddingHorizontal: "3%",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  dateBox: {
    flex: 3,
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: "3%",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});
