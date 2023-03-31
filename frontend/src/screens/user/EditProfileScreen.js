import React, { useState, useEffect } from "react";
import {
  AsyncStorage,
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";

// import sunSlip from "../../assets/images/sunSlip.png";
// import testImg from "../../assets/images/testImg.png";
// import primaryLogo from "../../assets/images/primaryLogo.png";

import DateToString from "../../components/Function/DateToString";
import EditBox from "../../components/EditBox";
import LoadingModal from "../../components/LoadingModal";
import NavBar from "../../components/NavBar";
import SopetButton from "../../components/SopetButton";

import color from "../../constants/color";

import { useUserInfo } from "../../context/ClientInfoProvider";

import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { FileSystemUploadType } from "expo-file-system";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const DateBox = (props) => {
  return (
    <View style={{ flexDirection: "row", marginVertical: "2%" }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontFamily: "Kanit-Light" }}>{props.itemName}</Text>
      </View>
      <Pressable style={{ flex: 3 }} onPress={props.onPress}>
        <View style={styles.dateBox}>
          <Text
            style={{ textAlignVertical: "center", fontFamily: "Kanit-Light" }}
          >
            {props.text}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default function EditProfileScreen({ navigation }) {
  const [responseDataLoaded, setResponseDataLoaded] = useState(false);
  const { userState, setUserState } = useUserInfo();

  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [show, setShow] = useState(false);
  const [UploadNewImage, setUploadNewImage] = useState(false);

  // Database Schema--------------------------------------------------------------------------------------------------------------
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [birth_date, setBirth_date] = useState(new Date());
  const [profile_picture_url, setProfile_picture_url] = useState(
    "https://storage.googleapis.com/sopet1/458ea5f4-027e-4449-91a7-c1e0bdd53723"
  );
  // ----------------------------------------------------------------------------------------------------------------------------

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(birth_date);
    setShow(Platform.OS === "ios");
    setBirth_date(DateToString(currentDate));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.7,
    });
    // console.log(result);
    if (!result.cancelled) {
      setUploadNewImage(true);
      setProfile_picture_url(result.uri);
      setFileToUpload(result);
    }
  };

  const uploadImage = async () => {
    // Check if any file is selected or not
    if (UploadNewImage) {
      // If file selected then upload
      fileToUpload.uri =
        Platform.OS === "ios" ? fileToUpload.uri : "file://" + fileToUpload.uri;
      FileSystem.uploadAsync(
        "https://codel-prod2-2ha7uwuvpq-as.a.run.app/file/uploadjpg",
        fileToUpload.uri,
        {
          httpMethod: "POST",
          uploadType: FileSystemUploadType.MULTIPART,
          fieldName: "file",
          mimeType: "image/jpeg",
        }
      )
        .then(async function (res) {
          setProfile_picture_url(res.body.slice(1, -1));
          const data = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            address: address,
            phone_number: phone_number,
            birth_date: birth_date,
            profile_picture_url: res.body.slice(1, -1),
          };
          // await setUserState(data);
          const token = await AsyncStorage.getItem("token");
          await axios
            .put(
              "https://codel-prod2-2ha7uwuvpq-as.a.run.app/client/update",
              data,
              {
                headers: {
                  Authorization: "bearer " + token,
                },
              }
            )
            .then(function (response) {
              setUserState(data);
            })
            .catch(function (error) {
              console.error(error);
            });
          setUploadNewImage(false);
        })
        .catch(function (error) {
          console.log("error status", error);
        });
    } else {
      const data = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        address: address,
        phone_number: phone_number,
        birth_date: birth_date,
        case_balance: userState.case_balance,
        profile_picture_url: profile_picture_url,
      };
      const token = await AsyncStorage.getItem("token");
      console.log("Data-----------------------------------");
      console.log(data);
      await axios
        .put(
          "https://codel-prod2-2ha7uwuvpq-as.a.run.app/client/update",
          data,
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        )
        .then(function (response) {
          console.log(response.data);
          setUserState(data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    setEmail(userState.email);
    setFirstName(userState.firstname);
    setLastName(userState.lastname);
    setAddress(userState.address ? userState.address : "");
    setPhone_number(userState.phone_number ? userState.phone_number : "");
    setBirth_date(
      userState.birth_date ? userState.birth_date : DateToString(new Date())
    );
    setProfile_picture_url(
      userState.profile_picture_url
        ? userState.profile_picture_url
        : "https://storage.googleapis.com/sopet1/458ea5f4-027e-4449-91a7-c1e0bdd53723"
    );
    setResponseDataLoaded(true);
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: color.sopetMediumBrown,
          }}
        >
          <NavBar title="แก้ไขโปรไฟล์" navigation={navigation} />
        </View>

        <View style={{ flex: 2, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={{ flex: 1, alignItems: "center" }}
            onPress={() => {
              pickImage();
            }}
          >
            <Image
              source={{ uri: profile_picture_url }}
              style={{
                flex: 1,
                aspectRatio: 1,
                margin: "3%",
                borderRadius: 1000,
                borderWidth: 1,
              }}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, height: "100%", justifyContent: "flex-end" }}>
            <Icon
              name="camera-plus"
              size={20}
              style={{ position: "relative", right: 30 }}
            />
          </View>
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
              maxLength={50}
              editable={true}
            />
            <EditBox
              itemName="นามสกุล"
              defaultValue={lastname}
              onChangeText={(text) => setLastName(text)}
              maxLength={50}
              editable={true}
            />
            <EditBox
              itemName="โทรศัพท์"
              defaultValue={phone_number}
              onChangeText={(text) => setPhone_number(text)}
              maxLength={10}
              keyboardType={"phone-pad"}
              editable={true}
            />
            <EditBox
              itemName="อีเมล"
              defaultValue={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType={"email-address"}
              editable={false}
            />
            <DateBox
              itemName="วันเกิด"
              text={DateToString(new Date(birth_date))}
              onPress={() => {
                setShow(!show);
              }}
            />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(birth_date)}
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
            <EditBox
              itemName="ที่อยู่"
              defaultValue={address}
              onChangeText={(text) => setAddress(text)}
              maxLength={200}
              editable={true}
            />

            <View style={{ alignItems: "center", marginVertical: "2%" }}>
              {!show && (
                <SopetButton
                  width="30%"
                  text="บันทึก"
                  onPress={() => {
                    uploadImage(), setConfirmUpdate(true);
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
                      setConfirmUpdate(false), navigation.goBack();
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
      </SafeAreaView>
      <LoadingModal visible={!responseDataLoaded} />
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
