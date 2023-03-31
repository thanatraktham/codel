import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SopetButton from "./SopetButton";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const LoadingModal = (props) => {
  const [closeLoadingModal, setCloseLoadingModal] = useState(false);
  return (
    <Modal
      transparent={true}
      visible={closeLoadingModal ? !closeLoadingModal : props.visible}
      animationType={"fade"}
    >
      <View style={styles.transparentBackground}>
        <View style={styles.modalContentContainer}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                fontFamily: "Kanit-Medium",
                fontSize: 16,
              }}
            >
              กำลังโหลดข้อมูล . . .
            </Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <SopetButton
              width={WIDTH * 0.2}
              text={"ปิด"}
              onPress={() => {
                setCloseLoadingModal(true);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContentContainer: {
    width: "50%",
    height: "15%",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 15,
    padding: 15,
    backgroundColor: "white",
  },
  transparentBackground: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#000000aa",
  },
});

export default LoadingModal;
