import React, { useState, useRef, useEffect } from "react";
import {
  AsyncStorage,
  Dimensions,
  Image,
  Keyboard,
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

import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FlatGrid } from "react-native-super-grid";

import color from "../../constants/color";
import NavBar from "../../components/NavBar";
import SopetButton from "../../components/SopetButton";

import sunSlip from "../../assets/images/sunSlip.png";
import testImg from "../../assets/images/testImg.png";
import primaryLogo from "../../assets/images/primaryLogo.png";
import DateToString from "../../components/Function/DateToString";
import TimeToString from "../../components/Function/TimeToString";

import { useUserInfo } from "../../context/ClientInfoProvider";
import axios from "axios";
import EditBox from "../../components/EditBox";
import DateBox from "../../components/DateBox";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

// const EditBox = (props) => {
//   return (
//     <View style={{ flexDirection: "row", marginVertical: "2%" }}>
//       <View style={{ flex: 1, justifyContent: "center" }}>
//         <Text style={{ fontFamily: "Kanit-Light" }}>{props.itemName}</Text>
//       </View>
//       <View style={{ flex: 2 }}>
//         <TextInput
//           style={styles.inputBox}
//           defaultValue={props.defaultValue}
//           value={props.value}
//           placeholder={props.placeholder}
//           onChangeText={props.onChangeText}
//           placeholderTextColor={"rgba(0, 0, 0, 0.7)"}
//           underlineColorAndroid="transparent"
//           autoCapitalize="none"
//           autoCorrect={false}
//           autoCompleteType={"off"}
//           keyboardType={props.keyboardType}
//           secureTextEntry={props.secureTextEntry}
//           onTouchStart={props.onTouchStart}
//           editable={props.editable}
//           showSoftInputOnFocus={props.showSoftInputOnFocus}
//         />
//       </View>
//     </View>
//   );
// };

// const DateBox = (props) => {
//   return (
//     <View style={{ flexDirection: "row", marginVertical: "2%" }}>
//       <View style={{ flex: 1, justifyContent: "center" }}>
//         <Text style={{ fontFamily: "Kanit-Light" }}>{props.itemName}</Text>
//       </View>
//       <TouchableOpacity style={{ flex: 2 }} onPress={props.onPress}>
//         <View style={styles.dateBox}>
//           <Text
//             style={{
//               textAlignVertical: "center",
//               fontFamily: "Kanit-Light",
//               fontSize: 18,
//             }}
//           >
//             {props.text}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

export default function TopUpScreen({ navigation }) {
  // const [copyString, setCopyString] = useClipboard();

  // const [text, setText] = useState('This is some sample Text to copy in React Native. Long Press on Text to COPY.');

  // const [newText, setNewText] = useState('Paste Text Here....');

  // const copyToClipboard = () => {
  //     Clipboard.setString(text);
  //     Alert.alert('Text Copied Successfully...');
  // };

  // const fetchCopiedText = async () => {
  //     const temp = await Clipboard.getString();
  //     setNewText(temp);
  //     console.log(temp);
  // };
  const scrollViewRef = useRef();

  const onDateChange = (event, selectedDate) => {
    const _date = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(_date);
    setTopUpDate(DateToString(_date));
  };

  const onTimeChange = (event, selectedTime) => {
    const _time = selectedTime || date;
    setShowTimePicker(Platform.OS === "ios");
    setDate(_time);
    setTopUpTime(TimeToString(_time));
  };

  const [showUpload, setShowUpload] = useState(false);
  const [showUploadWithoutSlip, setShowUploadWithoutSlip] = useState(false);
  const [slipImg, setSlipImg] = useState(null);
  const [slipAdded, setSlipAdded] = useState(false);
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

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [qrImg, setQrImg] = useState(sunSlip);
  const [bankName, setBankName] = useState("พร้อมเพย์");
  const [bookID, setBookID] = useState("057-8-58249-5");
  const [bookName, setBookName] = useState("ธนัท รักธรรม");

  const [ownerName, setOwnerName] = useState("");
  const [topUpDate, setTopUpDate] = useState(DateToString(date));
  const [topUpTime, setTopUpTime] = useState(TimeToString(date));
  const [amount, setAmount] = useState(0);

  const { userState, setUserState } = useUserInfo();

  const addMoneyHandler = async () => {
    const token = await AsyncStorage.getItem("token");
    const data = {
      amount: parseFloat(amount),
    };
    console.log(data);
    await axios
      .post(
        "https://codel-prod2-2ha7uwuvpq-as.a.run.app/client/balance",
        data,
        {
          headers: {
            Authorization: "bearer " + token,
          },
        }
      )
      .then(async function (response) {
        // setUserState({

        //   cash_balance: parseFloat(amount) });
        setUserState({
          address: userState.address,
          birth_date: userState.birth_date,
          cash_balance: userState.cash_balance + parseFloat(amount),
          client_id: userState.client_id,
          email: userState.email,
          firstname: userState.firstname,
          lastname: userState.lastname,
          phone_number: userState.phone_number,
          profile_picture_url: userState.profile_picture_url,
        });

        console.log(userState);
        navigation.pop();
      })
      .catch(function (error) {
        console.log("error status", error.response.status);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: color.sopetMediumBrown,
          }}
        >
          <NavBar title="เติมเงิน" navigation={navigation} />
        </View>
        <View style={{ flex: 12, backgroundColor: color.sopetLightBrown }}>
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center",
              padding: "3%",
            }}
          >
            <View style={{ padding: "3%", backgroundColor: "white" }}>
              <Image source={sunSlip} style={{ flex: 1, aspectRatio: 1 }} />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "Kanit-Light" }}>{bankName}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontFamily: "Kanit-Light" }}>{bookID}</Text>
              {/* <Pressable
                                style={{justifyContent: 'center', paddingLeft: '2%'}}
                                onPress={()=>copyToClipboard()}    
                            >
                                <FontIcon
                                    name={"clipboard"}
                                    size={15}
                                />
                            </Pressable> */}
            </View>
            <Text style={{ fontFamily: "Kanit-Light" }}>{bookName}</Text>
          </View>
          {!slipAdded && (
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setShowUpload(true), Keyboard.dismiss();
                }}
              >
                <Icon
                  name="add-circle"
                  color={color.sopetDarkBrown}
                  size={60}
                />
              </TouchableOpacity>
              <Text style={{ fontFamily: "Kanit-Light" }}>อัพโหลดสลิป</Text>
            </View>
          )}
          {slipAdded && (
            <Pressable
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <View style={{ flex: 7 }}>
                <Image
                  source={slipImg}
                  style={{ height: "100%" }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontFamily: "Kanit-Light" }}
                  onPress={() => {
                    setShowUpload(true);
                  }}
                >
                  อัพโหลดใหม่
                </Text>
              </View>
            </Pressable>
          )}
          <Pressable
            style={{ flex: 4 }}
            onPress={() => {
              setShowDatePicker(false), setShowTimePicker(false);
            }}
          >
            <ScrollView
              ref={scrollViewRef}
              // onContentSizeChange={() =>
              //     scrollViewRef.current.scrollToEnd({ animated: true })
              // }
            >
              <View
                style={{
                  flex: showDatePicker || showTimePicker ? null : 1,
                  flexGrow: showDatePicker || showTimePicker ? 1 : null,
                  marginHorizontal: "5%",
                  marginVertical: "5%",
                  paddingHorizontal: "2%",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: color.sopetMediumBrown,
                  backgroundColor: "white",
                }}
              >
                <EditBox
                  itemName="ชื่อบัญชีผู้โอน"
                  onChangeText={(text) => setOwnerName(text)}
                  maxLength={50}
                  editable={true}
                />
                <DateBox
                  itemName="วันที่โอน"
                  text={DateToString(date)}
                  onPress={() => {
                    setShowDatePicker(!showDatePicker),
                      setShowTimePicker(false);
                  }}
                  editable={true}
                />
                <DateBox
                  itemName="เวลาที่โอน"
                  text={TimeToString(date)}
                  onPress={() => {
                    setShowDatePicker(false),
                      setShowTimePicker(!showTimePicker);
                  }}
                  editable={true}
                />
                <EditBox
                  placeholder={"0"}
                  itemName="จำนวนเงิน (฿)"
                  onChangeText={(text) => setAmount(text)}
                  keyboardType={"numeric"}
                  maxLength={12}
                  editable={true}
                />
              </View>
            </ScrollView>
          </Pressable>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: 'brown'
            }}
          >
            {amount > 0 && (
              <SopetButton
                text="ยืนยัน"
                onPress={() => {
                  // {
                  //   slipImg
                  //     ? (console.log("Img : " + slipImg),
                  //       console.log("\nname : " + ownerName),
                  //       console.log("\ndate : " + topUpDate),
                  //       console.log("\ntime : " + topUpTime),
                  //       console.log("\namount : " + amount),
                  //       addMoneyHandler())
                  //     : setShowUploadWithoutSlip(true);
                  // }
                  console.log("Img : " + slipImg),
                    console.log("\nname : " + ownerName),
                    console.log("\ndate : " + topUpDate),
                    console.log("\ntime : " + topUpTime),
                    console.log("\namount : " + amount),
                    addMoneyHandler();
                }}
              />
            )}
            {amount <= 0 && (
              <SopetButton
                text="ยืนยัน"
                backgroundColor={color.sopetDarkBrown + "99"}
              />
            )}
          </View>
        </View>

        {/* Upload Slip From Gallary */}
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
                        setSlipAdded(true),
                          setShowUpload(false),
                          setSlipImg(item.img);
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

        {/* Alert Slip's Not Uploaded --------------------------------------------------*/}
        <Modal
          transparent={true}
          visible={showUploadWithoutSlip}
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
                  กรุณาอัพโหลดสลิปการชำระเงิน
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setShowUploadWithoutSlip(false);
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
        {/* Date Time Modal----------------------------------------- */}
        <Modal
          transparent={true}
          visible={showDatePicker || showTimePicker}
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
                width: "85%",
                justifyContent: "center",
                alignSelf: "center",
                borderRadius: 15,
                padding: 15,
                backgroundColor: "white",
              }}
            >
              {showDatePicker && (
                <View>
                  <DateTimePicker
                    testID="datePicker"
                    value={date}
                    mode={"date"}
                    display="spinner"
                    onChange={onDateChange}
                  />
                  <View style={{ alignItems: "center" }}>
                    <SopetButton
                      text="ตกลง"
                      onPress={() => {
                        setShowDatePicker(false);
                      }}
                    />
                  </View>
                </View>
              )}
              {showTimePicker && (
                <View>
                  <DateTimePicker
                    testID="timePicker"
                    value={date}
                    mode={"time"}
                    is24Hour={true}
                    display="spinner"
                    onChange={onTimeChange}
                  />
                  <View style={{ alignItems: "center" }}>
                    <SopetButton
                      text="ตกลง"
                      onPress={() => {
                        setShowTimePicker(false);
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    textAlignVertical: "center",
    fontFamily: "Kanit-Light",
    fontSize: 18,
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
