import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

const DateBox = (props) => {
  return (
    <View style={{ flexDirection: "row", marginVertical: "2%" }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontFamily: "Kanit-Light" }}>{props.itemName}</Text>
      </View>
      <Pressable style={{ flex: 3 }} onPress={props.onPress}>
        <View
          style={[
            styles.dateBox,
            {
              backgroundColor: props.editable
                ? "rgba(0, 0, 0, 0.1)"
                : "rgba(0, 0, 0, 0.2)",
            },
          ]}
        >
          <Text
            style={{ textAlignVertical: "center", fontFamily: "Kanit-Light" }}
          >
            {props.text}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  dateBox: {
    flex: 3,
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: "3%",
    borderRadius: 10,
  },
});

export default DateBox;
