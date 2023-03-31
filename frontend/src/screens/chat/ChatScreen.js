import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  AsyncStorage,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import useWebSocket from "react-use-websocket";

import color from "../../constants/color";
import NavBar from "../../components/NavBar";
import testImg from "../../assets/images/testImg.png";

// import EntypoIcon from "react-native-vector-icons/Entypo";
import IonIcon from "react-native-vector-icons/Ionicons";

import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { useUserInfo } from "../../context/ClientInfoProvider";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

var keyIndex = 0;

const createKeyIndex = () => {
  var _keyIndex = keyIndex;
  keyIndex++;
  return _keyIndex;
};

const VetChatBox = (chat, userState, client_match) => {
  console.log("Client Picture: " + client_match.profile_picture_url);
  return (
    <View key={createKeyIndex()} style={{ flexDirection: "row" }}>
      <View
        style={{
          width: "15%",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Image
          source={
            userState.client_id
              ? {
                  uri: "https://www.collinsdictionary.com/images/full/vet_548214847_1000.jpg",
                }
              : {
                  uri: client_match.profile_picture_url
                    ? client_match.profile_picture_url
                    : "https://storage.googleapis.com/sopet1/458ea5f4-027e-4449-91a7-c1e0bdd53723",
                }
          }
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
          }}
        />
      </View>
      <View style={{ flexShrink: 1 }}>
        <View
          style={{
            flexGrow: 1,
            justifyContent: "center",
            margin: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            borderTopLeftRadius: 0,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontFamily: "Kanit-Light",
            }}
          >
            {chat}
          </Text>
        </View>
      </View>
    </View>
  );
};

const MyChatBox = (chat) => {
  return (
    <View key={createKeyIndex()} style={{ flexDirection: "row-reverse" }}>
      <View style={{ flexShrink: 1 }}>
        <View
          style={{
            flexGrow: 1,
            justifyContent: "center",
            margin: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            borderTopRightRadius: 0,
            backgroundColor: color.sopetMediumBrown,
          }}
        >
          <Text
            style={{
              textAlign: "right",
              fontFamily: "Kanit-Light",
            }}
          >
            {chat}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default function ChatScreen({ navigation, route }) {
  const scrollViewRef = useRef();

  const [remainingTime, setRemainingTime] = useState(5);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [connected, setConnected] = useState(false);
  const { userState } = useUserInfo();

  // Passed Parameters----------------------------------------------------
  const service = route.params.service;

  const chatroom_id = service.chatroom_id;
  const vet_match = service.vet_match;
  const service_id = service.service_id;
  const service_status = route.params.service_status;
  ////////////////////////////////////////////////////////////////////////

  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    `wss://codel-prod2-2ha7uwuvpq-as.a.run.app/ws/${chatroom_id}/${
      userState.client_id ? userState.client_id : userState.vet_id
    }`,
    {
      onOpen: () => {
        // console.log("opened");
        setConnected(true);
      },
      shouldReconnect: (closeEvent) => true,
    }
  );
  if (connected) {
    getWebSocket().onmessage = (event) => {
      var sender = JSON.stringify(event.data.replace(/\'/g, '"'));
      var jsonText = JSON.parse(JSON.parse(sender));
      if (
        (userState.client_id && jsonText.user.id != userState.client_id) ||
        (userState.vet_id && jsonText.user.id != userState.vet_id)
      ) {
        setChatList([...chatList, [0, jsonText.text]]);
      }
    };
  }

  const [chatList, setChatList] = useState([]);

  const onMessageHandler = (text) => {
    sendMessage(text);
    setChatList([...chatList, [1, text]]);
    setCurrentText(null);
  };

  const [currentText, setCurrentText] = useState();

  const isFocused = useIsFocused();
  useEffect(() => {
    async function getChatHistory() {
      const arr = [];
      await axios
        .get(
          `https://codel-prod2-2ha7uwuvpq-as.a.run.app/socket/${chatroom_id}`
        )
        .then(function (response) {
          response.data.map(async (each) => {
            // console.log(each);
            // console.log("--=-=-=-=-=-=-=-=");
            // console.log(userState.client_id);
            if (
              each.sender == userState.client_id ||
              each.sender == userState.vet_id
            ) {
              // console.log("hello1");
              // console.log(chatList);
              arr.push([1, each.text]);
              // setChatList([...chatList, [1, each.text]]);
            } else {
              // console.log("hello2");
              // console.log(chatList);
              arr.push([0, each.text]);
              // setChatList([...chatList, [0, each.text]]);
            }
            await new Promise((r) => setTimeout(r, 3000));
          });
          // setChatList();
          // setMyPet(response.data);
        })
        .catch(function (error) {
          console.log("error status", error.response.status);
        });
      setChatList(arr);
    }

    getChatHistory();
  }, [isFocused]);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const EndServiceHandler = async () => {
    const token = await AsyncStorage.getItem("token");
    const data = {
      service_id: service_id,
      service_status: "done",
    };
    await axios
      .patch("https://codel-prod2-2ha7uwuvpq-as.a.run.app/vet/service/", data, {
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then(function (response) {
        navigation.navigate("MatchingReviewScreen", {
          service_id: service_id,
          vet_match: vet_match,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={WIDTH * 0.1}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: color.sopetMediumBrown,
          }}
        >
          <NavBar
            title={
              userState.client_id
                ? service.vet_match.firstname + " " + service.vet_match.lastname
                : service.client_match.firstname +
                  " " +
                  service.client_match.lastname
            }
            navigation={navigation}
            rightHandContent={
              service_status === "accept" &&
              userState.client_id && (
                <Pressable
                  style={{
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    setShowTimeoutModal(true);
                  }}
                >
                  <IonIcon name={"log-out-outline"} size={30} />
                </Pressable>
              )
            }
          />
        </View>
        <View style={{ flex: 12, backgroundColor: color.sopetLightBrown }}>
          {/* Remaining Time--------------------------------------------------------------------------- */}
          {service_status === "accept" && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Kanit-Medium",
                  fontSize: 20,
                }}
              >
                Remaining Time{"\n"}
                {remainingTime} minute(s)
              </Text>
            </View>
          )}
          {/* Chat Room----------------------------------------------------------------------------------- */}
          <View style={{ flex: 8 }}>
            <ScrollView
              style={{ flex: 1 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
            >
              {chatList.map((each) => {
                if (each[0] === 0) {
                  return VetChatBox(each[1], userState, service.client_match);
                } else if (each[0] === 1) {
                  return MyChatBox(each[1]);
                }
              })}
            </ScrollView>
          </View>
          {/* Input Box------------------------------------------------------------------------------------ */}
          {service_status === "accept" && (
            <View style={{ flexShrink: 1, height: 60 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginHorizontal: "2%",
                  marginVertical: "2%",
                  paddingHorizontal: "1%",
                  borderWidth: 2,
                  borderRadius: 10,
                  backgroundColor: "white",
                }}
              >
                {/* <Pressable
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                  onPress={() => {}}
                >
                  <EntypoIcon name={"plus"} size={30} />
                </Pressable> */}
                <View
                  style={{
                    flex: 10,
                    justifyContent: "center",
                  }}
                >
                  <TextInput
                    style={{
                      flexShrink: 1,
                      textAlignVertical: "center",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      marginHorizontal: "3%",
                      // backgroundColor: "orange",
                    }}
                    value={currentText}
                    multiline={true}
                    onChangeText={(text) => setCurrentText(text)}
                    maxLength={200}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType={"off"}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                  onPress={() => {}}
                >
                  <IonIcon
                    name={"send"}
                    size={30}
                    color={currentText ? "black" : color.greyInactive}
                    onPress={() => {
                      onMessageHandler(currentText);
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        {/* Timeout Modal--------------------------------------------------------------------------- */}
        <Modal
          transparent={true}
          visible={showTimeoutModal}
          animationType={"fade"}
        >
          <View style={styles.transparentBackground}>
            <View style={styles.modalContentContainer}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Kanit-Medium",
                    fontSize: 16,
                  }}
                >
                  ต้องการจบการปรึกษาใช่หรือไม่
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setShowTimeoutModal(false), EndServiceHandler();
                    }}
                  >
                    <Text style={styles.modalChoiceText}>ใช่</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowTimeoutModal(false);
                    }}
                  >
                    <Text style={styles.modalChoiceText}>ไม่</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  modalContentContainer: {
    width: "80%",
    height: "15%",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 15,
    padding: 15,
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
