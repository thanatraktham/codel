import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import NavBar from "../../components/NavBar";
import LoadingModal from "../../components/LoadingModal";
import PetBox from "../../components/PetBox";

import color from "../../constants/color";

import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useIsFocused } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

var keyIndex = 0;

const createKeyIndex = () => {
  var _keyIndex = keyIndex;
  keyIndex--;
  return _keyIndex;
};

export default function PetScreen({ navigation }) {
  const [responseDataLoaded, setResponseDataLoaded] = useState(false);

  const [myPet, setMyPet] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    const getMyPet = async () => {
      const token = await AsyncStorage.getItem("token");
      await axios
        .get("https://codel-prod2-2ha7uwuvpq-as.a.run.app/pet/myPets", {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then(function (response) {
          // console.log(response.data)
          setMyPet(response.data);
          setResponseDataLoaded(true);
        })
        .catch(function (error) {
          console.log("error status", error.response.status);
        });
    };
    getMyPet();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: color.sopetMediumBrown,
        }}
      >
        <NavBar title="สัตว์เลี้ยง" navigation={navigation} />
      </View>

      <View style={styles.tasksWrapper}>
        {myPet.length === 0 && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontFamily: "Kanit-Light", fontSize: 20 }}>
              ยังไม่มีสัตว์เลี้ยง
            </Text>
          </View>
        )}
        {myPet.length !== 0 && (
          <ScrollView>
            {myPet.map((e) => {
              return (
                <PetBox
                  key={e.pet_id}
                  pet_picture_url={e.pet_picture_url}
                  name={e.name}
                  type={e.type}
                  sex={e.sex}
                  onPress={() => {
                    navigation.navigate("EditPetScreen", {
                      e,
                    });
                  }}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
      {myPet.length === 0 && (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontFamily: "Kanit-Light", fontSize: 20 }}>
            เพิ่มสัตว์เลี้ยง
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center", padding: 15 }}
        onPress={() => {
          navigation.navigate("NewPetScreen");
        }}
      >
        <Icon name="add-circle" color={color.sopetDarkBrown} size={60} />
      </TouchableOpacity>
      <LoadingModal visible={!responseDataLoaded} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.sopetLightBrown,
  },
  tasksWrapper: {
    flex: 10,
    paddingHorizontal: 20,
    // backgroundColor: color.sopetLightBrown,
  },
});
