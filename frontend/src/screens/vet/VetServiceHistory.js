import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  AsyncStorage,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import color from "../../constants/color";
import NavBar from "../../components/NavBar";
import DropDownPicker from "react-native-dropdown-picker";

import testImg from "../../assets/images/testImg.png";
import DateToString from "../../components/Function/DateToString";
import MainScreenNavBar from "../../components/MainScreenNavBar";
import ServiceBox from "../../components/ServiceBox";

import { useUserInfo } from "../../context/ClientInfoProvider";
import axios from "axios";
import LoadingModal from "../../components/LoadingModal";
import ServiceInfo from "../../components/ServiceInfo";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

var keyIndex = 0;

const createKeyIndex = () => {
  var _keyIndex = keyIndex;
  keyIndex++;
  return _keyIndex;
};

export default function VetServiceHistory({ navigation }) {
  const { userState, setUserState } = useUserInfo();
  const [responseDataLoaded, setResponseDataLoaded] = useState(false);
  const [serviceDoneCase, setServiceDoneCase] = useState([]);
  const [serviceChatRoom, setServiceChatRoom] = useState("");
  const [selectedCase, setSelectedCase] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [showSetStatus, setShowSetStatus] = useState(false);
  const [isActive, setIsActive] = useState(userState.status);

  const [serviceAcceptHistory, setServiceAcceptHistory] = useState([
    // {
    //     id: createKeyIndex(),
    //     name: "ใบหม่อน",
    //     type: "ไททัน",
    //     date: DateToString(new Date()),
    //     duration: 30,
    //     remainingDuration: 20,
    // },
    // {
    //     id: createKeyIndex(),
    //     name: "Tony",
    //     type: "avengers",
    //     date: DateToString(new Date()),
    //     duration: 20,
    //     remainingDuration: 0,
    // },
  ]);

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
    async function GetServiceHistory() {
      const token = await AsyncStorage.getItem("token");
      // console.log("Login Token : " + token);
      await axios
        .get(
          "https://codel-prod2-2ha7uwuvpq-as.a.run.app/service/vet?service_status=accept",
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        )
        .then(async function (response) {
          // console.log("Data--------------------------------------");
          // console.log(response.data);
          setServiceAcceptHistory(response.data);

          // setResponseDataLoaded(true);
        });
      await axios
        .get(
          "https://codel-prod2-2ha7uwuvpq-as.a.run.app/service/vet?service_status=done",
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        )
        .then(async function (response) {
          // console.log("Data--------------------------------------");
          console.log(response.data);
          setServiceDoneCase(response.data);

          setResponseDataLoaded(true);
        });
    }
    GetServiceHistory();
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MainScreenNavBar
          onPress={() => {
            setShowSetStatus(true);
          }}
        />
      </View>
      <View style={{ flex: 11, backgroundColor: color.sopetLightBrown }}>
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
            ประวัติการให้คำปรึกษา
          </Text>
        </View>
        <View style={{ flex: 10 }}>
          <ScrollView
            style={{ marginHorizontal: "5%", alignContent: "center" }}
            contentContainerStyle={{ paddingBottom: "5%" }}
          >
            {serviceAcceptHistory.map((e) => {
              return (
                <ServiceBox
                  key={createKeyIndex()}
                  topic={e.topic}
                  type={e.pet_match.type}
                  date={DateToString(new Date(e.start_time))}
                  duration={5}
                  remainingDuration={20}
                  pet_picture_url={e.pet_match.pet_picture_url}
                  service_status={"accept"}
                  showOnClient={false}
                  onPressToChat={() => {
                    navigation.navigate("ChatScreen", {
                      service: e,
                      service_status: "accept",
                    });
                  }}
                  onPressToInfo={() => {
                    // setShowAcceptModal(true),
                    setShowInfo(true), setSelectedCase(e);
                  }}
                />
              );
            })}
            {serviceDoneCase.map((e) => {
              return (
                <ServiceBox
                  key={createKeyIndex()}
                  topic={e.topic}
                  type={e.pet_match.type}
                  date={DateToString(new Date(e.start_time))}
                  duration={5}
                  remainingDuration={20}
                  pet_picture_url={e.pet_match.pet_picture_url}
                  service_status={"done"}
                  showOnClient={false}
                  onPressToChat={() => {
                    navigation.navigate("ChatScreen", {
                      service: e,
                      service_status: "done",
                    });
                  }}
                  onPressToCaseSummary={() => {
                    navigation.navigate("CaseSummaryScreen", {
                      service_id: e.service_id,
                      // isEditable: true,
                    });
                  }}
                  onPressToInfo={() => {
                    // setShowAcceptModal(true),
                    setShowInfo(true), setSelectedCase(e);
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
      {selectedCase && (
        <ServiceInfo
          visible={showInfo}
          service={selectedCase}
          onPress={() => {
            setShowInfo(false);
          }}
        />
      )}

      <Modal transparent={true} visible={showSetStatus} animationType={"fade"}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iPhoneNotch: {
    height: 44,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 20,
  },
  historyItem: {
    // height: 120,
    flexShrink: 1,
    justifyContent: "center",
    padding: "3%",
    marginVertical: "3%",
    borderRadius: 10,
    //borderWidth: 1,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
  },
});
