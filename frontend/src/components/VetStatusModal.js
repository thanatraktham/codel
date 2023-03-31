import React, { useState } from "react";
import { Dimensions, Modal, Text, TouchableOpacity, View } from "react-native";
import color from "../constants/color";
import DropDownPicker from "react-native-dropdown-picker";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const VetStatusModal = (props) => {
  const [currentStatus, setCurrentStatus] = useState(
    props.isActive ? "Online" : "Offline"
  );

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
    <Modal transparent={true} visible={props.visible} animationType={"fade"}>
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
            {/* <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "center" }}>
                <View
                  style={{
                    width: 15,
                    aspectRatio: 1,
                    borderRadius: 15,
                    backgroundColor: "lime",
                  }}
                />
              </View>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    fontFamily: "Kanit-Medium",
                    fontSize: 16,
                  }}
                  onPress={props.onPressToOnline}
                >
                  {"  "}Online
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "center" }}>
                <View
                  style={{
                    width: 15,
                    aspectRatio: 1,
                    borderRadius: 15,
                    backgroundColor: "grey",
                  }}
                />
              </View>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    fontFamily: "Kanit-Medium",
                    fontSize: 16,
                  }}
                  onPress={props.onPressToOffline}
                >
                  {"  "}Offline
                </Text>
              </View>
            </View> */}
            <DropDownBox
              itemName="status"
              choice={[
                { label: "Online", value: "Online" },
                { label: "offline", value: "offline" },
              ]}
              placeholder={currentStatus}
              onChangeValue={(text) => {
                setCurrentStatus(text),
                  console.log("new status set to: " + text);
              }}
              // disabled={!isEditable}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                // backgroundColor: "orange",
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View style={{ justifyContent: "center" }}>
                  <View
                    style={{
                      width: 15,
                      aspectRatio: 1,
                      borderRadius: 15,
                      backgroundColor:
                        currentStatus === "Online" ? "lime" : "grey",
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
                  {currentStatus === "Online" ? "  Online" : "  Offline"}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexShrink: 1, justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={props.onPressToClose}>
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
  );
};

export default VetStatusModal;
