import React from "react";
import {
  Dimensions,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import testImg from "../assets/images/testImg.png";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const PetBox = (props) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        marginVertical: "2%",
        borderColor: "black",
        borderRadius: 10,
        // borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : "white",
      }}
      key={props.pet_id}
      onPress={props.onPress}
    >
      <View
        style={{
          flexShrink: 1,
          borderColor: "black",
          // borderRightWidth: 1 ,
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
            borderBottomLeftRadius: 8,
          }}
        />
      </View>
      <View
        style={{
          flexGrow: 1,
          paddingHorizontal: "5%",
          justifyContent: "space-evenly",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textInfo}>ชื่อ: </Text>
          <Text style={[styles.textInfo, { fontFamily: "Kanit-Light" }]}>
            {props.name}{" "}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textInfo}>ประเภทสัตว์: </Text>
          <Text style={[styles.textInfo, { fontFamily: "Kanit-Light" }]}>
            {props.type}{" "}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textInfo}>เพศ: </Text>
          <Text style={[styles.textInfo, { fontFamily: "Kanit-Light" }]}>
            {props.sex === "male" ? "ผู้" : "เมีย"}{" "}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textInfo: {
    fontFamily: "Kanit-Medium",
    fontSize: 15,
  },
});

export default PetBox;
