import React, { useState, useEffect } from "react";
import {
  AsyncStorage,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import NavBar from "../../components/NavBar";
import DateToString from "../../components/Function/DateToString";
import TimeToString from "../../components/Function/TimeToString";

import color from "../../constants/color";

import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import LoadingModal from "../../components/LoadingModal";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

var keyIndex = 0;

const createKeyIndex = () => {
  var _keyIndex = keyIndex;
  keyIndex++;
  return _keyIndex;
};

const formatTimeByOffset = (dateString, offset) => {
  // Params:
  // How the backend sends me a timestamp
  // dateString: on the form yyyy-mm-dd hh:mm:ss
  // offset: the amount of hours to add.
  // If we pass anything falsy return empty string
  if (!dateString) return "";
  if (dateString.length === 0) return "";
  // Step a: Parse the backend date string
  // Get Parameters needed to create a new date object
  const year = dateString.slice(0, 4);
  const month = dateString.slice(5, 7);
  const day = dateString.slice(8, 10);
  const hour = dateString.slice(11, 13);
  const minute = dateString.slice(14, 16);
  const second = dateString.slice(17, 19);
  // Step: bMake a JS date object with the data
  const dateObject = new Date(
    `${year}-${month}-${day}T${hour}:${minute}:${second}`
  );
  // Step c: Get the current hours from the object
  const currentHours = dateObject.getHours();
  // Step d: Add the offset to the date object
  dateObject.setHours(currentHours + offset);
  // Step e: stringify the date object, replace the T with a space and slice off the seconds.
  const newDateString = dateObject
    .toISOString()
    .replace("T", "   ")
    .slice(0, 18);
  // Step f: Return the new formatted date string with the added offset
  return `${newDateString}`;
};

export default function TopUpHistoryScreen({ navigation }) {
  const [responseDataLoaded, setResponseDataLoaded] = useState(false);

  const [walletHistory, setWalletHistory] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getWalletHistory = async () => {
      const token = await AsyncStorage.getItem("token");
      await axios
        .get("https://codel-prod2-2ha7uwuvpq-as.a.run.app/client/history", {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then(function (response) {
          console.log(response.data);
          setWalletHistory(response.data);

          setResponseDataLoaded(true);
        })
        .catch(function (error) {
          console.log("error status", error.response.status);
        });
    };
    getWalletHistory();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: color.sopetMediumBrown,
        }}
      >
        <NavBar title="ประวัติการชำระเงิน" navigation={navigation} />
      </View>
      <View style={{ flex: 12, backgroundColor: color.sopetLightBrown }}>
        {walletHistory.length !== 0 && (
          <ScrollView
            style={{ alignContent: "center" }}
            // contentContainerStyle={{ paddingBottom: "5%" }}
          >
            {walletHistory.map((e) => {
              var topup_id = e.topup_id;
              // var payment_id = e.payment_id;
              return (
                <TouchableOpacity
                  key={createKeyIndex()}
                  style={styles.historyItem}
                >
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 3, justifyContent: "center" }}>
                      <Text style={{ fontFamily: "Kanit-Medium" }}>
                        {topup_id ? "เติมเงิน" : "ชำระค่าบริการ"}
                      </Text>
                      <Text style={{ fontFamily: "Kanit-Light" }}>
                        {Platform.OS == "ios" &&
                          formatTimeByOffset(
                            topup_id ? e.topup_datetime : e.payment_datetime,
                            14
                          )}
                        {Platform.OS == "android" &&
                          formatTimeByOffset(
                            topup_id ? e.topup_datetime : e.payment_datetime,
                            7
                          )}

                        {/* {DateToString(
                          new Date(
                            topup_id ? e.topup_datetime : e.payment_datetime
                          )
                        ) +
                          "   " +
                          TimeToString(
                            new Date(
                              topup_id ? e.topup_datetime : e.payment_datetime
                            )
                          ) +
                          " น."} */}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        justifyContent: "center",
                        alignItems: "center",
                        //   backgroundColor: "blue",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Kanit-Light",
                          textAlign: "right",
                          width: "100%",
                          fontSize: 18,
                          // backgroundColor: "orange",
                          color: topup_id ? "green" : "red",
                        }}
                      >
                        {topup_id ? "+ " : "- "}
                        {topup_id ? e.topup_amount : e.payment_amount} บาท
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
        {walletHistory.length === 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "lime",
            }}
          >
            <Text style={{ fontFamily: "Kanit-Light", fontSize: 20 }}>
              ยังไม่มีประวัติการชำระเงิน
            </Text>
          </View>
        )}
      </View>
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
    padding: "5%",
    marginVertical: "3%",
    marginHorizontal: "5%",
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
