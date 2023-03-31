import React, { useState, useEffect } from "react";
import {
  AsyncStorage,
  Dimensions,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";

import NavBar from "../../components/NavBar";
import EditBox from "../../components/EditBox";
import DateBox from "../../components/DateBox";
import SopetButton from "../../components/SopetButton";
import DateToString from "../../components/Function/DateToString";
import DropDownBox from "../../components/DropDownBox";

import color from "../../constants/color";

import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { FileSystemUploadType } from "expo-file-system";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function NewPetScreen({ navigation, route }) {
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [fileToUpload, setFileToUpload] = useState(
    "https://storage.googleapis.com/sopet1/7426e405-d089-476b-91ee-642ca6a0bf0f"
  );
  const [isEditable, setIsEditable] = useState(true);
  const [show, setShow] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [UploadNewImage, setUploadNewImage] = useState(false);

  // Database Schema--------------------------------------------------------------------------------------------------------------
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [sex, setSex] = useState("male");
  const [scared, setScared] = useState("");
  const [species, setSpecies] = useState("");
  const [favorite_activity, setFavorite_activity] = useState("");
  const [birth_year, setBirth_year] = useState("2022-02-24");
  const [treat, setTreat] = useState("outside");
  const [weight, setWeight] = useState("");
  const [congenital_disease, setCongenital_disease] = useState("");
  const [physical_limitation, setPhysical_limitation] = useState("");
  const [microchip, setMicrochip] = useState("true");
  const [favorite_food, setFavorite_food] = useState("");
  const [food_amount, setFood_amount] = useState("");
  const [feeding_time, setFeeding_time] = useState("");
  const [other, setOther] = useState("");
  const [pet_picture_url, setPet_picture_url] = useState(
    "https://storage.googleapis.com/sopet1/7426e405-d089-476b-91ee-642ca6a0bf0f"
  );
  // ----------------------------------------------------------------------------------------------------------------------------

  const addPetHandler = async () => {
    setConfirmUpdate(true);
    await uploadImage();
    const token = await AsyncStorage.getItem("token");
    const data = {
      name: name,
      type: type,
      sex: sex,
      species: species,
      favorite_activity: favorite_activity,
      scared: scared,
      birth_year: birth_year,
      weight: weight,
      physical_limitation: physical_limitation,
      congenital_disease: congenital_disease,
      microchip: microchip,
      treat: treat,
      favorite_food: favorite_food,
      food_amount: food_amount,
      feeding_time: feeding_time,
      other: other,
      pet_picture_url: pet_picture_url,
    };
    // console.log(data);
    await axios
      .post("https://codel-prod2-2ha7uwuvpq-as.a.run.app/pet/", data, {
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then(async function (response) {
        navigation.pop();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setBirth_year(DateToString(currentDate));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.7,
    });
    console.log(result);
    if (!result.cancelled) {
      setUploadNewImage(true);
      setPet_picture_url(result.uri);
      setFileToUpload(result);
    }
  };

  const uploadImage = async () => {
    // Check if any file is selected or not
    if (UploadNewImage) {
      // If file selected then upload
      // fileToUpload.uri =
      //   Platform.OS === "ios" ? fileToUpload.uri : "file://" + fileToUpload.uri;
      setFileToUpload(
        Platform.OS === "ios" ? fileToUpload.uri : "file://" + fileToUpload.uri
      );
      await FileSystem.uploadAsync(
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
          console.log(res.body.slice(1, -1));
          setPet_picture_url(res.body.slice(1, -1));
          const token = await AsyncStorage.getItem("token");
          const data = {
            name: name,
            type: type,
            sex: sex,
            species: species,
            favorite_activity: favorite_activity,
            scared: scared,
            birth_year: birth_year,
            weight: weight,
            physical_limitation: physical_limitation,
            congenital_disease: congenital_disease,
            microchip: microchip,
            treat: treat,
            favorite_food: favorite_food,
            food_amount: food_amount,
            feeding_time: feeding_time,
            other: other,
            pet_picture_url: res.body.slice(1, -1),
          };
          // console.log(data);
          await axios
            .post("https://codel-prod2-2ha7uwuvpq-as.a.run.app/pet/", data, {
              headers: {
                Authorization: "bearer " + token,
              },
            })
            .then(async function (response) {
              navigation.pop();
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log("error status", error);
        });
    } else {
      const token = await AsyncStorage.getItem("token");
      const data = {
        name: name,
        type: type,
        sex: sex,
        species: species,
        favorite_activity: favorite_activity,
        scared: scared,
        birth_year: birth_year,
        weight: weight,
        physical_limitation: physical_limitation,
        congenital_disease: congenital_disease,
        microchip: microchip,
        treat: treat,
        favorite_food: favorite_food,
        food_amount: food_amount,
        feeding_time: feeding_time,
        other: other,
        pet_picture_url: pet_picture_url,
      };
      // console.log("data---------------------------------------------");
      // console.log(data);
      await axios
        .put("https://codel-prod2-2ha7uwuvpq-as.a.run.app/pet/", data, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then(function (response) {
          navigation.pop();
        })
        .catch(function (error) {
          console.log("error status", error.response.status);
        });
    }
  };

  const checkIfAllInputNotEmpty = () => {
    if (
      name === "" ||
      type === "" ||
      scared === "" ||
      species === "" ||
      weight === "" ||
      favorite_activity === "" ||
      congenital_disease === "" ||
      physical_limitation === "" ||
      physical_limitation === "" ||
      favorite_food === "" ||
      food_amount === "" ||
      feeding_time === "" ||
      other === ""
    ) {
      setHasError(true);
      return false;
    }
    return true;
  };

  useEffect(() => {
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "sopetLightBrown" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: color.sopetMediumBrown,
          }}
        >
          <NavBar title="เพิ่มสัตว์เลี้ยงใหม่" navigation={navigation} />
        </View>

        <View
          style={{
            flex: 2,
            flexDirection: "row",
            alignContent: "center",
            backgroundColor: color.sopetLightBrown,
          }}
        >
          <View style={{ flex: 2 }} />
          <TouchableOpacity
            style={{ flex: 1, alignItems: "center" }}
            onPress={() => {
              pickImage();
            }}
          >
            <Image
              source={{ uri: pet_picture_url }}
              style={{
                flex: 1,
                aspectRatio: 1,
                margin: "10%",
                borderRadius: 1000,
                borderWidth: 1,
              }}
            />
          </TouchableOpacity>

          <View style={{ flex: 2, height: "100%", justifyContent: "flex-end" }}>
            <Icon
              name="camera-plus"
              size={20}
              style={{ position: "relative", right: 10 }}
            />
          </View>
        </View>

        <View style={{ flex: 10, backgroundColor: color.sopetLightBrown }}>
          <ScrollView
            style={{ marginHorizontal: "5%", alignContent: "center" }}
            contentContainerStyle={{ paddingBottom: "5%" }}
            nestedScrollEnabled={true}
          >
            <Text style={{ fontFamily: "Kanit-Medium" }}>ข้อมูลเบื้องต้น</Text>
            <EditBox
              itemName="ชื่อ"
              defaultValue={name}
              editable={isEditable}
              onChangeText={(text) => setName(text)}
              maxLength={20}
            />
            <EditBox
              itemName="ประเภท"
              defaultValue={type}
              editable={isEditable}
              onChangeText={(text) => setType(text)}
              maxLength={50}
            />
            <DropDownBox
              itemName="เพศ"
              choice={[
                { label: "เพศผู้", value: "male" },
                { label: "เพศเมีย", value: "female" },
              ]}
              placeholder={"เพศผู้"}
              onChangeValue={(text) => setSex(text)}
            />
            <EditBox
              itemName="สายพันธ์ุ"
              defaultValue={species}
              editable={isEditable}
              onChangeText={(text) => setSpecies(text)}
              maxLength={50}
            />
            <Text style={{ fontFamily: "Kanit-Medium" }}>ข้อมูลสุขภาพ</Text>
            <DateBox
              itemName="วันเกิด"
              text={DateToString(date)}
              onPress={() => {
                setShow(!show);
              }}
              defaultValue={birth_year}
              editable={isEditable}
              onChangeText={(text) => setBirth_year(text)}
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
            <EditBox
              itemName="น้ำหนัก"
              defaultValue={weight + ""}
              editable={isEditable}
              onChangeText={(text) => setWeight(text)}
              keyboardType={"numeric"}
              maxLength={10}
            />
            <DropDownBox
              itemName="ลักษณะการเลี้ยงดู"
              choice={[
                { label: "Outside", value: "outside" },
                { label: "Inside", value: "inside" },
                { label: "Outside & Inside", value: "outsideandinside" },
              ]}
              placeholder={"Outside"}
              onChangeValue={(text) => setTreat(text)}
            />
            <EditBox
              itemName="โรคประจำตัว"
              defaultValue={congenital_disease}
              editable={isEditable}
              onChangeText={(text) => setCongenital_disease(text)}
              maxLength={50}
            />
            <EditBox
              itemName="ข้อจำกัดทางกายภาพ"
              defaultValue={physical_limitation}
              editable={isEditable}
              onChangeText={(text) => setPhysical_limitation(text)}
              maxLength={50}
            />
            <DropDownBox
              itemName="ไมโครชิฟ"
              choice={[
                { label: "ติดตั้ง", value: "True" },
                { label: "ไม่ได้ติดตั้ง", value: "False" },
              ]}
              placeholder={"ไม่ได้ติดตั้ง"}
              onChangeValue={(text) => setMicrochip(text)}
            />
            <EditBox
              itemName="สิ่งที่กลัว"
              defaultValue={scared}
              editable={isEditable}
              onChangeText={(text) => setScared(text)}
              maxLength={50}
            />
            <EditBox
              itemName="กิจกรรมโปรด"
              defaultValue={favorite_activity}
              editable={isEditable}
              onChangeText={(text) => setFavorite_activity(text)}
              maxLength={50}
            />

            <Text style={{ fontFamily: "Kanit-Medium" }}>อาหารและอื่นๆ</Text>
            <EditBox
              itemName="อาหารโปรด"
              defaultValue={favorite_food}
              editable={isEditable}
              onChangeText={(text) => setFavorite_food(text)}
              maxLength={50}
            />
            <EditBox
              itemName="ปริมาณอาหาร"
              defaultValue={food_amount + ""}
              editable={isEditable}
              onChangeText={(text) => setFood_amount(text)}
              keyboardType={"numeric"}
              maxLength={10}
            />
            <EditBox
              itemName="ช่วงเวลาอาหาร"
              defaultValue={feeding_time}
              editable={isEditable}
              onChangeText={(text) => setFeeding_time(text)}
              maxLength={20}
            />
            <EditBox
              itemName="อื่น ๆ"
              defaultValue={other}
              editable={isEditable}
              onChangeText={(text) => setOther(text)}
              maxLength={200}
            />
            <View>
              {hasError && (
                <Text
                  style={{ fontFamily: "Kanit-Light", color: color.sopetRed }}
                >
                  กรุณาใส่ข้อมูลให้ครบทุกข้อ
                </Text>
              )}
              {!show && (
                <View style={{ alignItems: "center" }}>
                  <SopetButton
                    text="บันทึก"
                    onPress={() => {
                      setHasError(false);
                      if (checkIfAllInputNotEmpty()) {
                        uploadImage();
                      }
                    }}
                  />
                </View>
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
                  เพิ่มสัตว์เลี้ยงใหม่เรียบร้อย
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setConfirmUpdate(false);
                      setIsEditable(false);
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
