import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  AsyncStorage,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import testImg from "../../assets/images/testImg.png";

import DateToString from "../../components/Function/DateToString";
import MainScreenNavBar from "../../components/MainScreenNavBar";
import NavBar from "../../components/NavBar";

import color from "../../constants/color";

import axios from "axios";
import ServiceBox from "../../components/ServiceBox";
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

export default function ServiceHistoryScreen({ navigation }) {
  const [responseDataLoaded, setResponseDataLoaded] = useState(false);
  const [servicePendingHistory, setServicePendingHistory] = useState([]);
  const [serviceAcceptHistory, setServiceAcceptHistory] = useState([]);
  const [serviceDoneHistory, setServiceDoneHistory] = useState([]);

  const [selectedService, setSelectedService] = useState();
  const [showInfo, setShowInfo] = useState(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    const getMyCaseSummary = async () => {
      const token = await AsyncStorage.getItem("token");
      await axios
        .get(
          "https://codel-prod2-2ha7uwuvpq-as.a.run.app/service/client?service_status=pending",
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        )
        .then(function (response) {
          // ฝั่ง client รับ case summary จากอะไร
          console.log("Pending Case-------------------------------");
          console.log(response.data);
          setServicePendingHistory(response.data);
          // setResponseDataLoaded(true);
        })
        .catch(function (error) {
          console.log("error status", error);
        });
      await axios
        .get(
          "https://codel-prod2-2ha7uwuvpq-as.a.run.app/service/client?service_status=accept",
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        )
        .then(function (response) {
          // ฝั่ง client รับ case summary จากอะไร
          console.log("Accept Case-------------------------------");
          console.log(response.data);
          setServiceAcceptHistory(response.data);
          // setResponseDataLoaded(true);
        })
        .catch(function (error) {
          console.log("error status", error);
        });
      await axios
        .get(
          "https://codel-prod2-2ha7uwuvpq-as.a.run.app/service/client?service_status=done",
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        )
        .then(function (response) {
          // ฝั่ง client รับ case summary จากอะไร
          console.log("Done Case-------------------------------");
          console.log(response.data);
          setServiceDoneHistory(response.data);
          setResponseDataLoaded(true);
        })
        .catch(function (error) {
          console.log("error status", error);
        });
    };
    getMyCaseSummary();
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MainScreenNavBar />
      </View>
      <View style={{ flex: 11, backgroundColor: color.sopetLightBrown }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            // backgroundColor: "yellow",
          }}
        >
          <Text
            style={{
              fontFamily: "Kanit-Medium",
              fontSize: 20,
              marginHorizontal: "5%",
              marginVertical: "2%",
              alignContent: "center",
            }}
          >
            ประวัติการเข้ารับคำปรึกษา
          </Text>
        </View>
        <View style={{ flex: 10 }}>
          {(servicePendingHistory.length !== 0 ||
            serviceAcceptHistory.length !== 0 ||
            serviceDoneHistory.length !== 0) && (
            <ScrollView
              style={{ marginHorizontal: "5%", alignContent: "center" }}
              contentContainerStyle={{ paddingBottom: "5%" }}
            >
              {servicePendingHistory.map((e) => {
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
                    showOnClient={true}
                    // onPressToChat={() => {
                    //   navigation.navigate("ChatScreen", {
                    //     chatroom_id: e.chatroom_id,
                    //     vet_match: e.vet_match,
                    //     service_id: e.service_id,
                    //     service_status: "pending",
                    //   });
                    // }}
                    onPressToInfo={() => {
                      // setShowAcceptModal(true),
                      setShowInfo(true), setSelectedService(e);
                    }}
                  />
                );
              })}
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
                    // service_status={"pending"}
                    service_status={"accept"}
                    // service_status={"done"}
                    showOnClient={true}
                    onPressToChat={() => {
                      navigation.navigate("ChatScreen", {
                        service: e,
                        service_status: "accept",
                      });
                    }}
                    onPressToInfo={() => {
                      // setShowAcceptModal(true),
                      setShowInfo(true), setSelectedService(e);
                    }}
                  />
                );
              })}
              {serviceDoneHistory.map((e) => {
                return (
                  <ServiceBox
                    key={createKeyIndex()}
                    topic={e.topic}
                    type={e.pet_match.type}
                    date={DateToString(new Date(e.start_time))}
                    duration={5}
                    remainingDuration={20}
                    pet_picture_url={e.pet_match.pet_picture_url}
                    // service_status={"pending"}
                    // service_status={"accept"}
                    service_status={"done"}
                    showOnClient={true}
                    onPressToChat={() => {
                      navigation.navigate("ChatScreen", {
                        service: e,
                        service_status: "done",
                      });
                    }}
                    onPressToCaseSummary={() => {
                      navigation.navigate("CaseSummaryScreen", {
                        service_id: e.service_id,
                        // isEditable: false,
                      });
                    }}
                    onPressToInfo={() => {
                      // setShowAcceptModal(true),
                      setShowInfo(true), setSelectedService(e);
                    }}
                  />
                );
              })}
            </ScrollView>
          )}
          {servicePendingHistory.length === 0 &&
            serviceAcceptHistory.length === 0 &&
            serviceDoneHistory.length === 0 && (
              <View
                style={{
                  flex: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "red",
                }}
              >
                <Text style={{ fontFamily: "Kanit-Light", fontSize: 20 }}>
                  ยังไม่มีประวัติการขอคำปรึกษา
                </Text>
              </View>
            )}
        </View>
      </View>
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
