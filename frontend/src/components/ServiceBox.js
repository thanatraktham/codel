// service_status
// showOnClient

// Client -> showOnClient === true
// 	pending
// 		service_status === "pending" -> orange text + ToChat
// 	accept
// 		service_status === "accept" -> green text + ToChat
// 	done
// 		service_status === "done" -> red text + ToChat + ToSummary

// Vet -> showOnClient === false
// 	pending
// 		service_status === "pending" -> choose accept or reject
// 	accept
// 		service_status === "accept" -> ToChat
// 	done
// 		service_status === "done" -> ToChat + ToCaseSummary

import React from "react";
import {
  Dimensions,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";

import color from "../constants/color";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ServiceBox = (props) => {
  const ToChatBox = (props) => {
    return (
      <TouchableOpacity
        style={[styles.navigationBox, { borderLeftWidth: 1 }]}
        onPress={props.onPress}
      >
        <Text style={{ fontFamily: "Kanit-Light" }}>ไปสู่หน้าแชท</Text>
        <MatComIcon name={"chat-processing-outline"} size={16} />
      </TouchableOpacity>
    );
  };

  const ToChatBoxDisabled = () => {
    return (
      <View style={[styles.navigationBox, { borderLeftWidth: 1 }]}>
        <Text
          style={{
            fontFamily: "Kanit-Light",
            color: "rgba(0, 0, 0, 0.5)",
          }}
        >
          ไปสู่หน้าแชท
        </Text>
        <MatComIcon
          name={"chat-processing-outline"}
          color={"rgba(0, 0, 0, 0.5)"}
          size={16}
        />
      </View>
    );
  };

  const ToCaseSummaryBox = (props) => {
    return (
      <TouchableOpacity
        style={[styles.navigationBox, { borderRightWidth: 1 }]}
        onPress={props.onPress}
      >
        <Text style={{ fontFamily: "Kanit-Light" }}>ดูสรุปการรักษา</Text>
        <MatComIcon name={"file-document-outline"} size={16} />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        marginVertical: "2%",
        borderColor: "black",
        borderRadius: 10,
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 3 },
        // shadowOpacity: 0.3,
        // shadowRadius: 3,
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : "white",
      }}
      key={props.pet_id}
      //   onPress={props.onPress}
    >
      <View
        style={{
          flexGrow: 1,
          flexDirection: "row",
          // backgroundColor: 'brown'
        }}
      >
        <View
          style={{
            flexGrow: 1,
            borderColor: "black",
            // borderRightWidth: 1 ,
            // backgroundColor: "brown",
          }}
        >
          <Image
            source={{
              uri: props.pet_picture_url
                ? props.pet_picture_url
                : "https://storage.googleapis.com/sopet1/7426e405-d089-476b-91ee-642ca6a0bf0f",
            }}
            style={{
              width: 0.3 * WIDTH,
              height: 0.3 * WIDTH,
              borderTopLeftRadius: 8,
            }}
            resizeMode="center"
          />
        </View>
        <View
          style={{
            flexShrink: 1,
            width: "100%",
            flexWrap: "wrap",
            paddingHorizontal: "3%",
            justifyContent: "space-evenly",
            // backgroundColor: "red",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              // backgroundColor: "orange",
            }}
          >
            <View style={{ flexShrink: 1 }}>
              <Text style={[styles.textInfo, { fontSize: 16 }]}>
                {props.topic}
              </Text>
            </View>
            <View
              style={{
                flexGrow: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                // backgroundColor: "yellow",
              }}
            >
              <TouchableOpacity
                style={{ justifyContent: "flex-end" }}
                onPress={props.onPressToInfo}
              >
                <EntypoIcon name={"info-with-circle"} size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{ flex: 1, flexDirection: "row", paddingHorizontal: "5%" }}
          >
            <Text style={styles.textInfo}>ประเภท: </Text>
            <Text style={[styles.textInfo, { fontFamily: "Kanit-Light" }]}>
              {props.type}{" "}
            </Text>
          </View>
          <View
            style={{ flex: 1, flexDirection: "row", paddingHorizontal: "5%" }}
          >
            <Text style={styles.textInfo}>วันที่: </Text>
            <Text style={[styles.textInfo, { fontFamily: "Kanit-Light" }]}>
              {props.date}{" "}
            </Text>
          </View>
          <View
            style={{ flex: 1, flexDirection: "row", paddingHorizontal: "5%" }}
          >
            <Text style={styles.textInfo}>ระยะเวลา: </Text>
            <Text style={[styles.textInfo, { fontFamily: "Kanit-Light" }]}>
              {props.duration}
              {" นาที"}
            </Text>
          </View>
          <View style={{ flexDirection: "row", paddingHorizontal: "5%" }}>
            <Text
              style={[
                styles.textInfo,
                {
                  fontFamily: "Kanit-Light",
                  color:
                    props.service_status === "pending"
                      ? "orange"
                      : props.service_status === "accept"
                      ? "green"
                      : "red",
                },
              ]}
            >
              {props.service_status === "pending"
                ? "รอการยืนยันคำปรึกษา"
                : props.service_status === "accept"
                ? "ระยะเวลาการปรึกษาเหลือ " + props.remainingDuration + " นาที"
                : "สิ้นสุดการปรึกษา"}
            </Text>
          </View>
        </View>
      </View>
      {props.showOnClient && (
        <View
          style={{
            flexShrink: 1,
            flexDirection: "row",
            // paddingVertical: '2%',
            // backgroundColor: 'orange'
          }}
        >
          {props.service_status === "done" && (
            <ToCaseSummaryBox onPress={props.onPressToCaseSummary} />
          )}
          {props.service_status === "pending" && <ToChatBoxDisabled />}
          {props.service_status !== "pending" && (
            <ToChatBox onPress={props.onPressToChat} />
          )}
        </View>
      )}
      {!props.showOnClient && props.service_status === "pending" && (
        <View
          style={{
            flexShrink: 1,
            flexDirection: "row",
            // paddingVertical: '2%',
            // backgroundColor: 'orange'
          }}
        >
          <TouchableOpacity
            style={[styles.navigationBox, { borderRightWidth: 1 }]}
            onPress={props.onPressToAcceptCase}
          >
            <MatComIcon name={"check"} size={16} color={"green"} />
            <Text style={{ fontFamily: "Kanit-Light", color: "green" }}>
              ให้การปรึกษา
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navigationBox, { borderLeftWidth: 1 }]}
            onPress={props.onPressToRejectCase}
          >
            <EntypoIcon name={"cross"} size={16} color={color.sopetRed} />
            <Text style={{ fontFamily: "Kanit-Light", color: color.sopetRed }}>
              ปฏิเสธการปรึกษา
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {!props.showOnClient && props.service_status !== "pending" && (
        <View
          style={{
            flexShrink: 1,
            flexDirection: "row",
            // paddingVertical: '2%',
            // backgroundColor: 'orange'
          }}
        >
          {props.service_status === "done" && (
            <ToCaseSummaryBox onPress={props.onPressToCaseSummary} />
          )}
          <ToChatBox onPress={props.onPressToChat} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInfo: {
    fontFamily: "Kanit-Medium",
    fontSize: 14,
  },
  navigationBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 2,
    // borderLeftWidth: 1,
    paddingVertical: "2%",
    borderColor: "#rgba(0, 0, 0, 0.1)",
    // backgroundColor: 'yellow'
  },
});

export default ServiceBox;
