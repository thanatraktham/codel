import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const EditBox = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: "2%",
        zIndex: -10,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{ fontFamily: "Kanit-Light", textAlignVertical: "center" }}
        >
          {props.itemName}
        </Text>
      </View>
      <View style={[styles.inputContainer, { flex: 3 }]}>
        {props.editable && (
          <TextInput
            style={styles.inputBox}
            defaultValue={props.defaultValue}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            placeholderTextColor={"rgba(0, 0, 0, 0.7)"}
            maxLength={props.maxLength}
            blurOnSubmit={true}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType={"off"}
            keyboardType={props.keyboardType}
            secureTextEntry={props.secureTextEntry}
            onTouchStart={props.onTouchStart}
            showSoftInputOnFocus={props.showSoftInputOnFocus}
          />
        )}
        {!props.editable && (
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: "rgba(0, 0, 0, 0.1)" },
            ]}
          >
            <Text style={styles.inputBox}>
              {props.defaultValue}
              {/* tesetiiiii */}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    textAlignVertical: "center",
    fontFamily: "Kanit-Light",
    paddingHorizontal: "3%",
  },
  inputContainer: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    // backgroundColor: 'red'
  },
});

export default EditBox;
