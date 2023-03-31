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

import DateBox from "../../components/DateBox";
import DropDownBox from "../../components/DropDownBox";
import EditBox from "../../components/EditBox";
import NavBar from "../../components/NavBar";
import SopetButton from "../../components/SopetButton";

import DateToString from "../../components/Function/DateToString";

import color from "../../constants/color";

import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { FileSystemUploadType } from "expo-file-system";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function EditPetScreen({ navigation, route }) {
  const { pet_id } = route.params.e;

  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [fileToUpload, setFileToUpload] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [show, setShow] = useState(false);
  const [UploadNewImage, setUploadNewImage] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Database Schema--------------------------------------------------------------------------------------------------------------
  const [name, setName] = useState(route.params.e.name);
  const [type, setType] = useState(route.params.e.type);
  const [sex, setSex] = useState(route.params.e.sex);
  const [scared, setScared] = useState(route.params.e.scared);
  const [species, setSpecies] = useState(route.params.e.species);
  const [favorite_activity, setFavorite_activity] = useState(
    route.params.e.favorite_activity
  );
  const [birth_year, setBirth_year] = useState(route.params.e.birth_year);
  const [treat, setTreat] = useState(route.params.e.treat);
  const [weight, setWeight] = useState(route.params.e.weight);
  const [congenital_disease, setCongenital_disease] = useState(
    route.params.e.congenital_disease
  );
  const [physical_limitation, setPhysical_limitation] = useState(
    route.params.e.physical_limitation
  );
  const [microchip, setMicrochip] = useState(route.params.e.microchip);
  const [favorite_food, setFavorite_food] = useState(
    route.params.e.favorite_food
  );
  const [food_amount, setFood_amount] = useState(route.params.e.food_amount);
  const [feeding_time, setFeeding_time] = useState(route.params.e.feeding_time);
  const [other, setOther] = useState(route.params.e.other);
  const [pet_picture_url, setPet_picture_url] = useState(
    route.params.e.pet_picture_url
      ? route.params.e.pet_picture_url
      : "https://storage.googleapis.com/sopet1/7426e405-d089-476b-91ee-642ca6a0bf0f"
  );
  // ----------------------------------------------------------------------------------------------------------------------------

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
    // console.log(result);
    if (!result.cancelled) {
      setUploadNewImage(true);
      setPet_picture_url(result.uri);
      setFileToUpload(result);
    }
  };

  const TreatToLabel = (treat) => {
    if (treat === "inside") {
      return "Inside";
    } else if (treat === "outside") {
      return "Outside";
    } else {
      return "Outside & Inside";
    }
  };

  const uploadImage = async () => {
    // Check if any file is selected or not
    if (UploadNewImage) {
      // If file selected then upload
      fileToUpload.uri =
        Platform.OS === "ios" ? fileToUpload.uri : "file://" + fileToUpload.uri;
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
            pet_id: pet_id,
            pet_picture_url: res.body.slice(1, -1),
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
          };
          // console.log("data---------------------------------------------");
          // console.log(data);
          await axios
            .put(
              "https://codel-prod2-2ha7uwuvpq-as.a.run.app/pet/update",
              data,
              {
                headers: {
                  Authorization: "bearer " + token,
                },
              }
            )
            .then(function (response) {
              navigation.pop();
            })
            .catch(function (error) {
              console.log("error status", error.response.status);
            });
        })
        .catch(function (error) {
          console.log("error status", error);
        });
    } else {
      const token = await AsyncStorage.getItem("token");
      const data = {
        pet_id: pet_id,
        pet_picture_url: pet_picture_url,
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
      };
      // console.log("data---------------------------------------------");
      // console.log(data);
      await axios
        .put("https://codel-prod2-2ha7uwuvpq-as.a.run.app/pet/update", data, {
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
          <NavBar title="ข้อมูลสัตว์เลี้ยง" navigation={navigation} />
        </View>

        <View
          style={{
            flex: 2,
            flexDirection: "row",
            alignItems: "flex-start",
            backgroundColor: color.sopetLightBrown,
          }}
        >
          <View style={{ flex: 2 }} />

          <TouchableOpacity
            style={{ flex: 1, alignItems: "center" }}
            onPress={() => {
              if (isEditable) {
                pickImage();
              }
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

          <View style={{ flex: 1, height: "100%", justifyContent: "flex-end" }}>
            <Icon
              name="camera-plus"
              size={20}
              style={{ position: "relative", right: 10 }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                setIsEditable(!isEditable);
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
                {isEditable ? "editing.." : "edit"}
              </Text>
            </TouchableOpacity>
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
                { label: "ผู้", value: "male" },
                { label: "เมีย", value: "female" },
              ]}
              placeholder={sex === "male" ? "ผู้" : "เมีย"}
              onChangeValue={(text) => setSex(text)}
              disabled={!isEditable}
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
              itemName="ปีเกิด"
              text={birth_year}
              defaultValue={birth_year}
              editable={isEditable}
              onPress={() => {
                if (isEditable) {
                  setShow(!show);
                }
              }}
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
              maxLength={10}
            />
            <DropDownBox
              itemName="ลักษณะการเลี้ยงดู"
              choice={[
                { label: "Outside", value: "outside" },
                { label: "Inside", value: "inside" },
                { label: "Outside & Inside", value: "outsideandinside" },
              ]}
              placeholder={TreatToLabel(treat)}
              onChangeValue={(text) => setTreat(text)}
              disabled={!isEditable}
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
              placeholder={microchip === true ? "ติดตั้ง" : "ไม่ได้ติดตั้ง"}
              onChangeValue={(text) => setMicrochip(text)}
              disabled={!isEditable}
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
              maxLength={6}
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
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <SopetButton
                    text="บันทึก"
                    onPress={() => {
                      setHasError(false);
                      if (checkIfAllInputNotEmpty()) {
                        uploadImage();
                      }
                    }}
                  />

                  {/* {isEditable && (
                    <SopetButton
                      text="ลบ"
                      backgroundColor={"#EA4335"}
                      onPress={() => {
                        // editPetHandler(), setConfirmUpdate(true);
                      }}
                    />
                  )} */}
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
                  อัพเดตโปรไฟล์เรียบร้อย
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
                      navigation.navigate("PetScreen");
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
