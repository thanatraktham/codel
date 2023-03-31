import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  AsyncStorage,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  Modal,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";

import mainScreenBackground from "../../assets/pages/mainScreenBackground.png";

import color from "../../constants/color";
import device from "../../constants/device";

import DateToString from "../../components/Function/DateToString";
import LoadingModal from "../../components/LoadingModal";
import MainScreenNavBar from "../../components/MainScreenNavBar";
import ServiceBox from "../../components/ServiceBox";

import { useUserInfo } from "../../context/ClientInfoProvider";
import axios from "axios";
import ServiceInfo from "../../components/ServiceInfo";
import VetStatusModal from "../../components/VetStatusModal";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

var keyIndex = 0;

const createKeyIndex = () => {
  var _keyIndex = keyIndex;
  keyIndex--;
  return _keyIndex;
};

const DetailBox = (props) => {
  return (
    <View style={{ flex: 1, marginVertical: "3%" }}>
      <View style={{ flexShrink: 1 }}>
        <Text
          style={{
            fontFamily: "Kanit-Medium",
            fontSize: 16,
          }}
        >
          {props.title}
        </Text>
      </View>
      <View style={{ flexGrow: 1 }}>
        <Text
          style={{
            fontFamily: "Kanit-Light",
            fontSize: 14,
            paddingLeft: "5%",
          }}
        >
          {props.detail}
        </Text>
      </View>
    </View>
  );
};

export default function VetHomeScreen({ navigation }) {
  const [responseDataLoaded, setResponseDataLoaded] = useState(false);

  const { userState, setUserState } = useUserInfo();

  const [activeCasePet, setActiveCasePet] = useState([]);
  const [owner, setOwner] = useState();
  const [servicePendingCase, setServicePendingCase] = useState([]);
  const [selectedService, setSelectedService] = useState();

  const [selectedService_id, setSelectedService_id] = useState();
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showSetStatus, setShowSetStatus] = useState(false);
  const [isActive, setIsActive] = useState(userState.status);

  const acceptCase = async () => {
    const token = await AsyncStorage.getItem("token");
    const data = {
      service_id: selectedService.service_id,
      service_status: "accept",
    };
    await axios
      .patch("https://codel-prod2-2ha7uwuvpq-as.a.run.app/vet/service/", data, {
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then(function (response) {
        const chatroom_id = response.data.chatroom_id;
        console.log(response.data.chatroom_id);
        setShowAcceptModal(false);
        navigation.navigate("ChatScreen", {
          service: selectedService,
          service_status: "accept",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const rejectCase = async () => {
    const token = await AsyncStorage.getItem("token");
    const data = {
      service_id: selectedService.service_id,
      service_status: "reject",
    };
    await axios
      .patch("https://codel-prod2-2ha7uwuvpq-as.a.run.app/vet/service/", data, {
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then(function (response) {
        // setShowAcceptModal(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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

  const isFocused = useIsFocused();
  useEffect(() => {
    async function LoginFromToken() {
      const token = await AsyncStorage.getItem("token");
      // console.log("Login Token : " + token);
      await axios
        .get(
          "https://codel-prod2-2ha7uwuvpq-as.a.run.app/service/vet?service_status=pending",
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        )
        .then(async function (response) {
          // console.log(
          //   "------------------------============================-------------"
          // );
          // console.log(
          //   "Pending Case-------------------------------------------------"
          // );
          // console.log(response.data);
          setServicePendingCase(response.data);

          setResponseDataLoaded(true);
          //   setContactList(response.data);
          // response.data
          //   .map((e) => {
          //     axios
          //       .post(
          //         `https://codel-prod2-2ha7uwuvpq-as.a.run.app/pet/getPetsByPetId?pet_id=${e.pet_id}`
          //       )
          //       .then(function (response) {
          //         console.log("Data--------------------");
          //         console.log(response.data);
          //         // console.log(
          //         //   "=========================pet-==================info"
          //         // );
          //         // const data = { ...e, ...response.data[0] };
          //         // console.log(data);
          //         // // setServicePendingCase([...servicePendingCase, data]);
          //         // setServicePendingCase(servicePendingCase)
          //         // setActiveCasePet(data)
          //         // //   console.log(response.data);
          //         // // setMatchingStep(matchingStep + 1);
          //       })
          //       .catch(function (error) {
          //         console.log(
          //           "------------------------error---------------------------"
          //         );
          //         console.log(e.pet_id);
          //         if (error.response.status) {
          //           console.log("error ", error.response.status);
          //         }
          //       });
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
        });
    }
    LoginFromToken();
  }, [isFocused]);

  const DropDownBox = (props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(props.choice);
    return (
      <View style={{ flex: 1, flexDirection: "row", marginVertical: "2%" }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={{ fontFamily: "Kanit-Light", textAlignVertical: "center" }}
          >
            {props.itemName}
          </Text>
        </View>
        <View style={{ flex: 3, justifyContent: "center", borderRadius: 10 }}>
          <DropDownPicker
            style={{
              height: 40,
              borderWidth: 0,
              backgroundColor: props.disabled
                ? "rgba(0, 0, 0, 0.2)"
                : "rgba(0, 0, 0, 0.1)",
              zIndex: 10,
            }}
            textStyle={{
              fontFamily: "Kanit-Light",
            }}
            placeholder={props.placeholder}
            zIndexInverse={-1}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={props.onChangeValue}
            // listMode="SCROLLVIEW"
            dropDownDirection="BOTTOM"
            // disabled={props.disabled}
          />
        </View>
      </View>
    );
  };

  return (
    <React.Fragment>
      {device.iPhoneNotch && <Animated.View style={styles.iPhoneNotch} />}

      <ImageBackground
        source={mainScreenBackground}
        style={{ flex: 1 }}
        resizeMode="stretch"
      >
        {/* MainScreenNavBar-------------------------------------------------------- */}
        <MainScreenNavBar
          onPress={() => {
            setShowSetStatus(true);
          }}
        />
        <View style={{ flex: 11 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Kanit-Medium",
                fontSize: 20,
                marginHorizontal: "5%",
                marginVertical: "2%",
                alignContent: "center",
              }}
            >
              เคสสัตว์เลี้ยงทั้งหมด
            </Text>
          </View>

          <View style={styles.tasksWrapper}>
            <ScrollView>
              {servicePendingCase.map((e) => {
                return (
                  <ServiceBox
                    key={createKeyIndex()}
                    topic={e.topic}
                    type={e.pet_match.type}
                    date={DateToString(new Date(e.start_time))}
                    duration={5}
                    remainingDuration={20}
                    pet_picture_url={e.pet_match.pet_picture_url}
                    service_status={"pending"}
                    showOnClient={false}
                    onPressToAcceptCase={() => {
                      setShowAcceptModal(true), setSelectedService(e);
                      // setSelectedService_id(e.service_id);
                    }}
                    onPressToRejectCase={() => {
                      setShowRejectModal(true);
                      // navigation.navigate("CaseSummaryScreen", {
                      //   service_id: e.service_id,
                      // });
                    }}
                    onPressToInfo={() => {
                      // setShowAcceptModal(true),
                      setShowInfo(true), setSelectedService(e);
                    }}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
        {/* Accept/Reject Modal-------------------------------------------------------------------------- */}
        {selectedService && (
          <ServiceInfo
            visible={showAcceptModal}
            service={selectedService}
            showBeforeAccept={true}
            onPressToAccept={() => {
              setShowAcceptModal(false);
              acceptCase();
            }}
            onPressToReject={() => {
              setShowAcceptModal(false);
            }}
          />
        )}
        {/* Info Modal--------------------------------------------------------------------------------------- */}
        {selectedService && (
          <ServiceInfo
            visible={showInfo}
            service={selectedService}
            onPress={() => {
              setShowInfo(false);
            }}
          />
        )}
        <Modal
          transparent={true}
          visible={showRejectModal}
          animationType={"fade"}
        >
          <View style={styles.transparentBackground}>
            <View style={styles.modalContentContainer}>
              <View
                style={{
                  flexGrow: 1,
                  justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Kanit-Medium",
                    fontSize: 16,
                  }}
                >
                  ปฏิเสธการปรึกษาเคสนี้ใช่หรือไม่
                </Text>
              </View>
              <View style={{ flexShrink: 1, justifyContent: "flex-end" }}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setShowRejectModal(false);
                      rejectCase();
                      // reject แล้ว setServiceStatus เป็น false เลยหรอ แล้วฝั่ง client จะเห็นอะไรมั้ย
                    }}
                  >
                    <Text style={styles.modalChoiceText}>ใช่</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowRejectModal(false);
                    }}
                  >
                    <Text style={styles.modalChoiceText}>ไม่</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          visible={showSetStatus}
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
        <LoadingModal visible={!responseDataLoaded} />
      </ImageBackground>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  iPhoneNotch: {
    height: 44,
    position: "absolute",
    top: 0,
    width: "100%",
    // backgroundColor: 'red',
    zIndex: 20,
  },
  containerHeader: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: "5%",
    paddingTop: device.iPhoneNotch ? 60 : 36,
    // position: 'absolute',
    // top: 0,
    backgroundColor: color.sopetLightBrown,
    zIndex: 10,
  },
  inputBox: {
    width: WIDTH * 0.86,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "Kanit-Light",
    paddingHorizontal: 20,
    borderRadius: 40,
    backgroundColor: "white",
  },
  itemContainer: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "white",
  },
  modalContentContainer: {
    flexShrink: 1,
    width: "80%",
    // height: "30%",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 15,
    padding: 15,
    // marginVertical: "15%",
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
    flex: 10,
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
