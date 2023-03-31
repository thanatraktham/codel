import React, { useState, useEffect } from "react";
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
import { useIsFocused } from "@react-navigation/native";
import { useUserInfo } from "../../context/ClientInfoProvider";

import MatIcon from "react-native-vector-icons/MaterialIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import CountDown from "react-native-countdown-component";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import testImg from "../../assets/images/testImg.png";
import color from "../../constants/color";

import NavBar from "../../components/NavBar";
import PetBox from "../../components/PetBox";
import SopetButton from "../../components/SopetButton";
import VetBox from "../../components/VetBox";
import { AsyncStorage } from "react-native";
import axios from "axios";
import LoadingModal from "../../components/LoadingModal";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

var keyIndex = 0;

const createKeyIndex = () => {
  var _keyIndex = keyIndex;
  keyIndex++;
  return _keyIndex;
};

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const InputBox = (props) => {
  return (
    <View style={{ flexShrink: 1, marginVertical: "2%" }}>
      <View style={{ flexShrink: 1, justifyContent: "center" }}>
        <Text
          style={{
            fontFamily: "Kanit-Medium",
            fontSize: 16,
          }}
        >
          {props.title}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          onChangeText={props.onChangeText}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          multiline={true}
          onPressIn={props.onPressIn}
          onPressOut={props.onPressOut}
          onSubmitEditing={props.onSubmitEditing}
          blurOnSubmit={true}
          autoCorrect={false}
        />
        {props.rightHandContent && (
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                fontFamily: "Kanit-Light",
                paddingRight: "3%",
              }}
            >
              {props.rightHandContent}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default function MatchingLandingScreen({ navigation, route }) {
  const [responseDataLoaded, setResponseDataLoaded] = useState(false);
  const vetInfo = route.params.vetInfo;
  const { userState } = useUserInfo();

  const [service_id, setService_id] = useState("");

  const [email, setEmail] = useState(userState.email);
  const [balance, setBalance] = useState(userState.cash_balance);
  const [imgUri, setImgUri] = useState(
    userState.profile_picture_url
      ? userState.profile_picture_url
      : "https://storage.googleapis.com/sopet1/458ea5f4-027e-4449-91a7-c1e0bdd53723"
  );

  const [myPet, setMyPet] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);

  const [matchingStep, setMatchingStep] = useState(1);
  // const [matchingStep, setMatchingStep] = useState(2);
  // const [matchingStep, setMatchingStep] = useState(3);
  // const [matchingStep, setMatchingStep] = useState(4);

  const [confirmConsult, setConfirmConsult] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [enoughMoney, setEnoughMoney] = useState(true);

  const [showConsent, setShowConsent] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [consentScrollEnd, setConsentScrollEnd] = useState(false);
  const consentDetail =
    "•	ผู้ใช้บริการทุกรายจะต้องใช้บริการ ตามข้อกำหนดที่ระบุไว้ในข้อกำหนดและเงื่อนไขฯ ฉบับนี้ โดยผู้ใช้จะไม่สามารถใช้บริการ ได้เว้นเสียแต่ผู้ใช้ได้ตกลงยอมรับข้อกำหนดและเงื่อนไขฯ ฉบับนี้แล้ว\n\n•	การให้บริการเป็นเพียงการให้คำปรึกษาจากสัตวแพทย์ที่ได้รับใบอนุญาต ผ่านทางออนไลน์ ไม่ใช่ การรักษา หรือวินิจฉัย อาการ ดังนั้น หากเกิดข้อผิดพลาดหรือความเสียหายที่เกิดจากผู้ใช้บริการเองทางผู้ให้บริการและสัตวแพทย์จะไม่รับผิดชอบใดๆทั้งสิ้น รวมถึง ทางผู้ให้บริการที่ไม่ได้เป็นผู้ให้บริการทางการแพทย์และไม่มีส่วนเกี่ยวข้องในการให้คำแนะนำหรือคำปรึกษา ทางการสัตวแพทย์ใดๆ ดังนั้นจึงไม่ต้องรับผิดชอบและรับผิดต่อผู้ใช้บริการ ไม่ว่าจะด้วยเหตุใดก็ตามจากการปรึกษาระหว่างผู้ใช้บริการและสัตวแพทย์\n\n•	ผู้ใช้บริการ ไม่ควร ใช้บริการในกรณีฉุกเฉินหรือเจ็บป่วยอย่างรุนแรง บริการนี้ไม่ได้จัดทำขึ้นเพื่อรองรับอาการฉุกเฉิน หรือทดแทนการพยาบาลฉุกเฉิน หากเกิดเหตุการณ์อันตรายขึ้น ทางผู้ให้บริการจะไม่รับผิดชอบใดๆทั้งสิ้น\n\n•	ผู้ใช้บริการไม่สามารถนำข้อมูลส่วนบุคคลของสัตวแพทย์ที่ให้คำปรึกษา หรือ ผู้ใช้บริการท่านอื่นไปใช้ หากไม่ได้รับอนุญาต\n\n•	ผู้ใช้บริการ ที่นำหลักฐานการชำระค่าบริการปลอมมาแสดงต่อผู้ให้บริการ ถือว่ามีความผิดทางกฏหมาย โดยทางผู้ให้บริการจะดำเนินคดีและปิดบัญชีของท่านอย่างถาวร\n\n•	ผู้ใช้บริการที่มีพฤติกรรมไม่เหมาะสม ระหว่างการใช้บริการ ทางผู้ให้บริการมีสิทธิ์ในการระงับการใช้บริการ โดยขึ้นอยู่กับดุลยพินิจของผู้ควบคุมเว็บไซต์\n\n•	ผู้ใช้บริการซึ่งเป็นผู้เยาว์จะสามารถใช้บริการฯ ได้ก็ต่อเมื่อได้รับความยินยอมล่วงหน้าจากบิดามารดาหรือผู้แทนโดยชอบกฎหมายเท่านั้น นอกจากนี้ หากผู้ใช้ดังกล่าวใช้บริการฯ ในนามหรือเพื่อวัตถุประสงค์ขององค์กรธุรกิจใด ให้ถือว่าองค์กรธุรกิจดังกล่าวได้ตกลงยอมรับข้อกำหนดและเงื่อนไขฯ ฉบับนี้แล้วล่วงหน้า\n\n•	หากมีข้อกำหนดและเงื่อนไขฯ เพิ่มเติมใดๆ ซึ่งเกี่ยวข้องกับการให้บริการฯ ผู้ใช้บริการจะต้องปฏิบัติตามข้อกำหนดและเงื่อนไขฯ เพิ่มเติมดังกล่าวเช่นเดียวกับข้อกำหนดและเงื่อนไขฯ ในการใช้งานฉบับนี้\n\n•	นโยบายการยกเลิกและการคืนเงิน การให้คำปรึกษาจากสัตวแพทย์บนบริการของเราจะมีการจ่ายเงินด้วย การโอนเงินผ่านธนาคาร หรือรูปแบบการชำระเงินทางอิเล็กทรอนิกส์อื่นๆ หากมีข้อผิดพลาดของการชำระเงิน ทางผู้ควบคุมเว็บไซต์จะพิจารณาตามกฎระเบียบของผู้ให้บริการ\n\n•	ยาที่สัตวแพทย์แนะนำเป็นเพียงการให้คำปรึกษาจากสัตวแพทย์ที่ได้รับใบอนุญาตผ่านทางออนไลน์ตามประวัติและอาการที่ได้รับแจ้งจากผู้ใช้บริการ ไม่ใช่การสั่งยาหรือรับรองใดๆ\n\n•	กรณีแนะนำ ยาทั่วไป หากอาการไม่ดีขึ้นหรือมีผลข้างเคียงใดๆควรนำไปพบสัตวแพทย์ที่โรงพยาบาลสัตว์ทันที\n\n";

  // หน้า 2
  const [consultHeader, setConsultHeader] = useState("");
  const [consultSymtompDuration, setConsultSymtompDuration] = useState(0);
  const [consultDetail, setConsultDetail] = useState("");
  const [consultQuestion, setConsultQuestion] = useState("");

  // หน้า 3
  const [consultType, setConsultType] = useState("แชท");
  const [consultDuration, setConsultDuration] = useState(5);
  const [consultFee, setConsultFee] = useState(100);
  const [hasError, setHasError] = useState(false);

  const [imageList, setImageList] = useState([]);

  const PushImage = (image) => {
    setImageList([
      ...imageList,
      <Image
        key={createKeyIndex()}
        source={image}
        style={{ flexShrink: 1, marginVertical: "2%" }}
        resizeMode={"contain"}
      />,
    ]);
  };

  const onConfirmation = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const data = {
      topic: consultHeader,
      duration: consultSymtompDuration,
      detail: consultDetail,
      question: consultQuestion,
      vet_email: vetInfo.email,
      pet_id: selectedPet.pet_id,
    };
    console.log(data);
    await axios
      .post("https://codel-prod2-2ha7uwuvpq-as.a.run.app/service/", data, {
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then(async function (response) {
        // console.log(response.data);
        // await setService_id(response.data.service_id);
        // console.log("test");
        // console.log(service_id);
        // const chatroom_id = response.data.chatroom_id;
        // console.log("test2");
        // console.log(chatroom_id);
        // setMatchingStep(matchingStep + 1);
        // navigation.navigate("ChatScreen", {
        //   chatroom_id: chatroom_id,
        //   service_id: response.data.service_id,
        // });
        navigation.navigate("MainScreen");
      })
      .catch(function (error) {
        console.log(error);
      });
    setConfirmConsult(false);
    setMatchingStep(3);
    // console.log("-----=-------=-=-=-=-=-=-=- chat2");
    // console.log(chatroom_id);
    // navigation.navigate("ChatScreen", {
    //   chatroom_id: chatroom_id,
    //   service_id: service_id,
    // });
  };

  const checkIfAllInputNotEmpty = () => {
    if (
      consultHeader == "" ||
      consultDuration == 0 ||
      consultDetail == "" ||
      consultQuestion == ""
    ) {
      setHasError(true);
      return false;
    }
    return true;
  };

  const isFocused = useIsFocused();
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

  useEffect(() => {
    const getMyPet = async () => {
      const token = await AsyncStorage.getItem("token");
      await axios
        .get("https://codel-prod2-2ha7uwuvpq-as.a.run.app/pet/myPets", {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then(function (response) {
          // console.log(response.data)
          setMyPet(response.data);

          setResponseDataLoaded(true);
        })
        .catch(function (error) {
          console.log("error status", error.response.status);
        });
    };
    getMyPet();
    console.log("Balance: " + userState.cash_balance);
    setBalance(userState.cash_balance);
    if (userState.cash_balance < consultFee) {
      console.log("Not Enough: balance = " + userState.cash_balance);
      setEnoughMoney(false);
    } else {
      console.log("Enough: balance = " + userState.cash_balance);
      setEnoughMoney(true);
    }
  }, [isFocused]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 70}
      style={styles.container}
      enabled={false}
      // enabled={false}
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
            // title='Matching'
            navigation={navigation}
            rightHandContent={
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <View style={{ justifyContent: "center", marginHorizontal: 7 }}>
                  <Text
                    style={{
                      textAlign: "right",
                      textAlignVertical: "center",
                      fontFamily: "Kanit-Medium",
                      fontSize: 14,
                    }}
                  >
                    {email}
                    {"\n"}ยอดเงินคงเหลือ: {balance} บาท
                  </Text>
                </View>
                <Image
                  source={{ uri: imgUri }}
                  resizeMode="contain"
                  style={{ height: 50, width: 50, borderRadius: 50 }}
                />
              </View>
            }
          />
        </View>

        <View style={{ flex: 10 }}>
          {/* Vet Info------------------------------------------------------------------- */}
          <View style={{ flex: 5, justifyContent: "center" }}>
            {!vetInfo && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>No vet here</Text>
              </View>
            )}
            {vetInfo && (
              <VetBox
                key={vetInfo.key}
                email={vetInfo.email}
                firstname={vetInfo.firstname}
                lastname={vetInfo.lastname}
                license_id={vetInfo.license_id}
                experiences={vetInfo.experiences}
                educations={vetInfo.educations}
                specialist_symptoms={vetInfo.specialist_symptoms}
                specialist_animals={vetInfo.specialist_animals}
                img={
                  "https://www.collinsdictionary.com/images/full/vet_548214847_1000.jpg"
                }
                point={vetInfo.point}
                status={vetInfo.status}
                convertToView={true}
              />
            )}
          </View>
          {/* Matching Step Counter-------------------------------------------------------- */}
          <View style={{ flex: 2, alignItems: "center" }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              {matchingStep === 1 && (
                <Text style={{ fontFamily: "Kanit-Light", fontSize: 20 }}>
                  เลือกสัตว์เลี้ยง
                </Text>
              )}
              {matchingStep === 2 && (
                <Text style={{ fontFamily: "Kanit-Light", fontSize: 20 }}>
                  ระบุอาการสัตว์เลี้ยง
                </Text>
              )}
              {matchingStep === 3 && (
                <Text style={{ fontFamily: "Kanit-Light", fontSize: 20 }}>
                  ยืนยันการชำระเงิน
                </Text>
              )}
              {matchingStep === 4 && (
                <Text style={{ fontFamily: "Kanit-Light", fontSize: 20 }}>
                  สัตวแพทย์รีวิวเคส
                </Text>
              )}
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View style={{ width: "100%", flexDirection: "row" }}>
                <View
                  style={[
                    styles.processCircle,
                    {
                      backgroundColor:
                        matchingStep > 0
                          ? color.sopetDarkBrown
                          : color.sopetMediumBrown,
                    },
                  ]}
                />
                <View style={{ width: "10%", justifyContent: "center" }}>
                  <View
                    style={{
                      height: 2,
                      backgroundColor:
                        matchingStep > 1
                          ? color.sopetDarkBrown
                          : color.sopetMediumBrown,
                    }}
                  />
                </View>

                <View
                  style={[
                    styles.processCircle,
                    {
                      backgroundColor:
                        matchingStep > 1
                          ? color.sopetDarkBrown
                          : color.sopetMediumBrown,
                    },
                  ]}
                />
                <View style={{ width: "10%", justifyContent: "center" }}>
                  <View
                    style={{
                      height: 2,
                      backgroundColor:
                        matchingStep > 2
                          ? color.sopetDarkBrown
                          : color.sopetMediumBrown,
                    }}
                  />
                </View>

                <View
                  style={[
                    styles.processCircle,
                    {
                      backgroundColor:
                        matchingStep > 2
                          ? color.sopetDarkBrown
                          : color.sopetMediumBrown,
                    },
                  ]}
                />
                {/* <View style={{ width: "10%", justifyContent: "center" }}>
                  <View
                    style={{
                      height: 2,
                      backgroundColor:
                        matchingStep > 3
                          ? color.sopetDarkBrown
                          : color.sopetMediumBrown,
                    }}
                  />
                </View>

                <View
                  style={[
                    styles.processCircle,
                    {
                      backgroundColor:
                        matchingStep > 3
                          ? color.sopetDarkBrown
                          : color.sopetMediumBrown,
                    },
                  ]}
                /> */}
              </View>
            </View>
          </View>

          <View style={styles.tasksWrapper}>
            {/* Step 1 Content----------------------------------------------------------------------- */}
            {myPet.length === 0 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontFamily: "Kanit-Medium", fontSize: 20 }}>
                  ยังไม่มีสัตว์เลี้ยง
                </Text>
              </View>
            )}
            {matchingStep === 1 && myPet.length !== 0 && (
              <ScrollView>
                {myPet.map((e) => {
                  // console.log("Pet Pic Url : " + e.pet_picture_url);
                  return (
                    <PetBox
                      key={e.pet_id}
                      name={e.name}
                      type={e.type}
                      sex={e.sex}
                      pet_picture_url={e.pet_picture_url}
                      onPress={() => {
                        setSelectedPet(e), setMatchingStep(matchingStep + 1);
                      }}
                    />
                  );
                })}
              </ScrollView>
            )}
            {
              // Step 2 Content-------------------------------------------------------------------------
              matchingStep === 2 && (
                <KeyboardAwareScrollView>
                  <InputBox
                    title="หัวข้อการให้คำปรึกษา"
                    onChangeText={(text) => setConsultHeader(text)}
                    maxLength={50}
                    onPressIn={() => {
                      setKeyboardIsOpen(true);
                    }}
                    // onPressOut={()=>{setKeyboardIsOpen(false)}}
                    onSubmitEditing={() => {
                      setKeyboardIsOpen(false);
                    }}
                  />
                  <InputBox
                    title="ระยะเวลาของอาการ"
                    onChangeText={(text) => setConsultSymtompDuration(text)}
                    maxLength={100}
                    // defaultValue={consultSymtompDuration}
                    placeholder={"0"}
                    keyboardType={"number-pad"}
                    rightHandContent={"ชั่วโมง"}
                    onPressIn={() => {
                      setKeyboardIsOpen(true);
                    }}
                    // onPressOut={()=>{setKeyboardIsOpen(false)}}
                    onSubmitEditing={() => {
                      setKeyboardIsOpen(false);
                    }}
                  />
                  <InputBox
                    title="รายละเอียดของอาการ"
                    onChangeText={(text) => setConsultDetail(text)}
                    maxLength={100}
                    onPressIn={() => {
                      setKeyboardIsOpen(true);
                    }}
                    // onPressOut={()=>{setKeyboardIsOpen(false)}}
                    onSubmitEditing={() => {
                      setKeyboardIsOpen(false);
                    }}
                  />
                  <InputBox
                    title="คำถามที่ต้องการปรึกษาแพทย์"
                    onChangeText={(text) => setConsultQuestion(text)}
                    maxLength={100}
                    onPressIn={() => {
                      setKeyboardIsOpen(true);
                    }}
                    // onPressOut={()=>{setKeyboardIsOpen(false)}}
                    onSubmitEditing={() => {
                      setKeyboardIsOpen(false);
                    }}
                  />
                  <View
                    style={{
                      flexShrink: 1,
                      // alignItems: "center",
                      // backgroundColor: "red",
                    }}
                  >
                    {hasError && (
                      <Text
                        style={{
                          fontFamily: "Kanit-Light",
                          color: color.sopetRed,
                        }}
                      >
                        กรุณาใส่ข้อมูลให้ครบทุกข้อ
                      </Text>
                    )}
                  </View>
                </KeyboardAwareScrollView>
              )
            }
            {
              // Step 3 Content-------------------------------------------------------------------------
              matchingStep === 3 && (
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "90%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Kanit-Light",
                          fontSize: 18,
                        }}
                      >
                        ประเภทการปรึกษา
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Kanit-Light",
                          fontSize: 18,
                        }}
                      >
                        {consultType}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "90%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Kanit-Light",
                          fontSize: 18,
                        }}
                      >
                        ระยะเวลาการปรึกษา
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Kanit-Light",
                          fontSize: 18,
                        }}
                      >
                        {consultDuration} นาที
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "90%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Kanit-Light",
                          fontSize: 18,
                        }}
                      >
                        ค่าบริการ
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Kanit-Light",
                          fontSize: 18,
                        }}
                      >
                        {consultFee} บาท
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Kanit-Medium",
                        fontSize: 18,
                      }}
                    >
                      เงินจะถูกตัดหลังจากเริ่มการปรึกษาสำเร็จ
                    </Text>
                    {!enoughMoney && (
                      <EntypoIcon
                        name="circle-with-cross"
                        color={color.sopetRed}
                        size={48}
                      />
                    )}
                  </View>
                </View>
              )
            }
            {
              // Step 4 Content-------------------------------------------------------------------------
              matchingStep === 4 && (
                <View style={{ flex: 1 }}>
                  <CountDown
                    until={5}
                    size={48}
                    onFinish={() => {
                      // console.log("service_id");
                      // console.log(service_id);
                      navigation.navigate("MatchingReviewScreen", {
                        service_id: service_id,
                      });
                    }}
                    digitStyle={{ backgroundColor: color.sopetLightBrown }}
                    digitTxtStyle={{ color: "black" }}
                    timeToShow={["S"]}
                    timeLabels={{ s: "" }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Kanit-Medium",
                      fontSize: 18,
                    }}
                  >
                    วินาที
                  </Text>
                </View>
              )
            }
          </View>
          {true && (
            // Bottom Buttons---------------------------------------------------------
            <View
              style={{
                flex: 2,
                justifyContent: "center",
              }}
            >
              {/* Step 1------------------------------------------------------------- */}
              {matchingStep === 1 && (
                <View style={{ alignItems: "center" }}>
                  <SopetButton
                    text="ย้อนกลับ"
                    onPress={() => {
                      navigation.pop();
                    }}
                  />
                </View>
              )}
              {/* Step 2--------------------------------------------------------- */}
              {matchingStep === 2 && (
                <View
                  style={{
                    flexShrink: 1,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <SopetButton
                    text="ย้อนกลับ"
                    onPress={() => {
                      setMatchingStep(matchingStep - 1);
                    }}
                  />
                  <SopetButton
                    text="ถัดไป"
                    onPress={() => {
                      if (checkIfAllInputNotEmpty()) {
                        if (consentAccepted) {
                          setMatchingStep(matchingStep + 1);
                        } else {
                          setShowConsent(true);
                        }
                      }
                      // console.log(selectedPet);
                    }}
                  />
                </View>
                // <View>
                // </View>
              )}
              {/* Step 3---------------------------------------------------------- */}
              {matchingStep === 3 && enoughMoney && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <SopetButton
                    text="ย้อนกลับ"
                    onPress={() => {
                      setMatchingStep(matchingStep - 1);
                    }}
                  />
                  <SopetButton
                    text="ถัดไป"
                    onPress={() => {
                      // setMatchingStep(matchingStep + 1)
                      if (balance < consultFee) {
                        setEnoughMoney(false);
                      } else {
                        setConfirmConsult(true);
                      }
                    }}
                  />
                </View>
              )}
              {matchingStep === 3 && !enoughMoney && (
                <View style={{ alignItems: "center" }}>
                  <SopetButton
                    text="เงินไม่พอ กดปุ่มนี้เพื่อเติมเงิน"
                    width="60%"
                    onPress={() => {
                      setEnoughMoney(true);
                      navigation.navigate("TopUpScreen");
                    }}
                  />
                </View>
              )}
              {/* Step 4----------------------------------------------------- */}
              {matchingStep === 4 && (
                <View style={{ alignItems: "center" }}>
                  <SopetButton
                    text="ยกเลิก"
                    onPress={() => {
                      setConfirmCancel(true);
                    }}
                  />
                </View>
              )}
            </View>
          )}
        </View>

        {/* Consent Modal----------------------------------------------------- */}
        <Modal transparent={true} visible={showConsent} animationType={"fade"}>
          <View style={styles.transparentBackground}>
            <View style={[styles.modalContentContainer, { height: "50%" }]}>
              <View style={{ flexGrow: 1 }}>
                <Text
                  style={{
                    fontFamily: "Kanit-Medium",
                    fontSize: 16,
                  }}
                >
                  หนังสือยินยอมเข้ารับบริการคำปรึกษาทางไกลสำหรับสัตว์ (Informed
                  Consent)
                </Text>
                <Text
                  style={{
                    textAlignVertical: "center",
                    fontFamily: "Kanit-Light",
                    fontSize: 14,
                  }}
                >
                  ข้อกำหนดและเงื่อนไขการใช้งาน เอสโอเพ็ท (SOPet)
                </Text>
                <View
                  style={{ width: "100%", height: 1, backgroundColor: "black" }}
                />
                <ScrollView
                  style={{ flex: 1 }}
                  onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                      setConsentScrollEnd(true);
                    }
                  }}
                  scrollEventThrottle={400}
                >
                  <Text
                    style={{
                      fontFamily: "Kanit-Light",
                      fontSize: 14,
                    }}
                  >
                    {consentDetail}
                  </Text>
                </ScrollView>
              </View>
              <View style={{ flexShrink: 1, justifyContent: "flex-end" }}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (consentScrollEnd) {
                        setShowConsent(false),
                          setConsentAccepted(true),
                          setMatchingStep(matchingStep + 1);
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.modalChoiceText,
                        {
                          color: consentScrollEnd
                            ? color.sopetDarkBrown
                            : "grey",
                        },
                      ]}
                    >
                      ยอมรับ
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setShowConsent(false);
                    }}
                  >
                    <Text style={[styles.modalChoiceText, { color: "grey" }]}>
                      ปฏิเสธ
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* Confirm Consult Modal----------------------------------------------------- */}
        <Modal
          transparent={true}
          visible={confirmConsult}
          animationType={"fade"}
        >
          <View style={styles.transparentBackground}>
            <View style={styles.modalContentContainer}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Kanit-Medium",
                    fontSize: 16,
                  }}
                >
                  คุณต้องการจะปรึกษากับ
                </Text>
                <Text
                  style={{
                    fontFamily: "Kanit-Light",
                    fontSize: 14,
                  }}
                >
                  ส.พ. {vetInfo.firstname} {vetInfo.lastname}
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                  <View
                    style={{ flexDirection: "row", justifyContent: "flex-end" }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        onConfirmation();
                      }}
                    >
                      <Text style={styles.modalChoiceText}>ใช่</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setConfirmConsult(false);
                      }}
                    >
                      <Text style={styles.modalChoiceText}>ไม่</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* Cancel Modal--------------------------------------------------------------------------- */}
        <Modal
          transparent={true}
          visible={confirmCancel}
          animationType={"fade"}
        >
          <View style={styles.transparentBackground}>
            <View style={styles.modalContentContainer}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Kanit-Medium",
                    fontSize: 16,
                  }}
                >
                  คุณต้องการจะยกเลิกการปรึกษาหรือไม่
                </Text>
                <Text
                  style={{
                    fontFamily: "Kanit-Light",
                    fontSize: 14,
                  }}
                >
                  คุณจะไม่ได้รับเงินคืน
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setConfirmCancel(false), navigation.pop();
                    }}
                  >
                    <Text style={styles.modalChoiceText}>ใช่</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setConfirmCancel(false);
                    }}
                  >
                    <Text style={styles.modalChoiceText}>ไม่</Text>
                  </TouchableOpacity>
                </View>
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
    backgroundColor: color.sopetLightBrown,
  },
  inputBox: {
    // width: '100%',
    flex: 1,
    textAlignVertical: "center",
    fontFamily: "Kanit-Light",
    paddingHorizontal: "5%",
    paddingVertical: "1%",
  },
  inputContainer: {
    flexGrow: 1,
    flexDirection: "row",
    width: "95%",
    // height: 40,
    justifyContent: "space-between",
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
    backgroundColor: color.sopetMediumBrown,
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
