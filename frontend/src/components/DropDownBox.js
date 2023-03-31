import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const DropDownBox = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(props.choice);
  return (
    <View style={{ flexDirection: "row", marginVertical: "2%" }}>
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
          listMode="SCROLLVIEW"
          dropDownDirection="BOTTOM"
          disabled={props.disabled}
        />
      </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});

export default DropDownBox;
