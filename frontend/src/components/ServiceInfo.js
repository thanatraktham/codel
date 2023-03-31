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
  Modal,
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";

import color from "../constants/color";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ServiceInfo = (props) => {
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
  return (
    <Modal transparent={true} visible={props.visible} animationType={"fade"}>
      <View style={styles.transparentBackground}>
        <View style={styles.modalContentContainer}>
          <View style={{ flexGrow: 1, justifyContent: "space-between" }}>
            {props.showBeforeAccept && (
              <Text
                style={{
                  fontFamily: "Kanit-Medium",
                  fontSize: 16,
                }}
              >
                คุณต้องจะให้การปรึกษาเคสนี้หรือไม่
              </Text>
            )}
            <Text
              style={{
                fontFamily: "Kanit-Light",
                fontSize: 16,
              }}
            >
              ข้อมูลเบื้องต้น
            </Text>
            <ScrollView style={{ flexGrow: 1 }}>
              <View
                style={{
                  width: "100%",
                  height: 2,
                  backgroundColor: "black",
                }}
              />
              <DetailBox
                title="เจ้าของสัตว์เลี้ยง"
                detail={
                  props.service.client_match.firstname +
                  " " +
                  props.service.client_match.lastname
                }
              />
              <DetailBox
                title="ชื่อสัตว์เลี้ยง"
                detail={props.service.pet_match.name}
              />
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <DetailBox
                  title="ประเภท"
                  detail={
                    props.service.pet_match.type
                      ? props.service.pet_match.type
                      : "-"
                  }
                />
                <DetailBox
                  title="เพศ"
                  detail={
                    props.service.pet_match.sex === "male" ? "ผู้" : "เมีย"
                  }
                />
              </View>
              <View
                style={{
                  width: "100%",
                  height: 2,
                  backgroundColor: "black",
                }}
              />
              <DetailBox
                title="หัวข้อการให้คำปรึกษา"
                detail={props.service.topic}
              />
              <DetailBox
                title="ระยะเวลาของอาการ"
                detail={props.service.duration + " ชั่วโมง"}
              />
              <DetailBox
                title="รายละเอียดของอาการ"
                detail={props.service.detail}
              />
              <DetailBox
                title="คำถามที่ต้องการปรึกษา"
                detail={props.service.question}
              />
              <View
                style={{
                  width: "100%",
                  height: 2,
                  backgroundColor: "black",
                }}
              />
              <DetailBox title="ประเภทการปรึกษา" detail={"แชท"} />
              <DetailBox title="ระยะเวลาการปรึกษา" detail={"30 นาที"} />
            </ScrollView>
          </View>
          <View style={{ flexShrink: 1, justifyContent: "flex-end" }}>
            {!props.showBeforeAccept && (
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <TouchableOpacity onPress={props.onPress}>
                  <Text style={styles.modalChoiceText}>ปิด</Text>
                </TouchableOpacity>
              </View>
            )}
            {props.showBeforeAccept && (
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <TouchableOpacity onPress={props.onPressToAccept}>
                  <Text style={styles.modalChoiceText}>ใช่</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onPressToReject}>
                  <Text style={styles.modalChoiceText}>ไม่</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  transparentBackground: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#000000aa",
  },
});

export default ServiceInfo;
