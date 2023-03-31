import React from "react";
import {
  Dimensions,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Star from "react-native-vector-icons/Entypo";
import color from "../constants/color";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const SubVetBox = (props) => {
  return (
    <View
      style={{
        justifyContent: "center",
        // backgroundColor: 'brown'
      }}
    >
      <View>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingHorizontal: "2%",
            backgroundColor: 'red'
          }}
        >
          <View
            style={{
              justifyContent: "flex-end",
              marginHorizontal: "2%",
              backgroundColor: 'orange'
            }}
          >
            <Text
              style={{
                fontFamily: "Kanit-Light",
              }}
            >
              {props.point}
            </Text>
          </View>
          <Star
            style={{ flexShrink: 1 }}
            name="star"
            size={20}
            color={"gold"}
          ></Star>
        </View> */}
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 3, justifyContent: "center" }}>
          <View
            style={{
              flex: 3,
              // aspectRatio: 1,
              justifyContent: "center",
              backgroundColor: "white",
              marginLeft: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: props.img }}
                style={{
                  flex: 1,
                  aspectRatio: 1,
                  position: "relative",
                  borderRadius: 1000,
                }}
              />
              <View
                style={{
                  justifyContent: "flex-end",
                  position: "absolute",
                  bottom: "0%",
                  right: "0%",
                }}
              >
                <MatIcon
                  name={props.status ? "circle" : null}
                  size={24}
                  color={"#31A24C"}
                  style={{
                    flex: 1,
                    aspectRatio: 1,
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{ flex: 7, justifyContent: "center", paddingBottom: "3%" }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingHorizontal: "2%",
              // backgroundColor: 'red'
            }}
          >
            <View
              style={{
                justifyContent: "flex-end",
                marginHorizontal: "2%",
                //   backgroundColor: 'orange'
              }}
            >
              <Text
                style={{
                  fontFamily: "Kanit-Light",
                }}
              >
                {props.point < 0 ? "ยังไม่มีรีวิว" : props.point.toFixed(1)}
              </Text>
            </View>
            <Star
              style={{ flexShrink: 1, paddingTop: "2%", paddingRight: "1%" }}
              name="star"
              size={20}
              color={"gold"}
            ></Star>
          </View>
          <Text
            style={{
              fontFamily: "Kanit-Medium",
              paddingHorizontal: "4%",
              textAlignVertical: "center",
            }}
          >
            สพ. {props.firstname} {props.lastname}
          </Text>
          <Text
            style={{
              paddingHorizontal: "4%",
              textAlignVertical: "center",
              fontFamily: "Kanit-Light",
            }}
          >
            เลขใบประกอบวิชาชีพ: 654321
          </Text>
          <Text
            style={{
              paddingHorizontal: "4%",
              textAlignVertical: "center",
              fontFamily: "Kanit-Light",
            }}
          >
            ประเภทสัตว์:{" "}
            {props.specialist_animals &&
              props.specialist_animals.map((e) => {
                return e.animal + " ";
              })}
            {!props.specialist_animals && "-"}
          </Text>
          <Text
            style={{
              paddingHorizontal: "4%",
              textAlignVertical: "center",
              fontFamily: "Kanit-Light",
            }}
          >
            กลุ่มอาการ:{" "}
            {props.specialist_symptoms &&
              props.specialist_symptoms.map((e) => {
                return e.symptom + " ";
              })}
            {!props.specialist_symptoms && "-"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const VetBox = (props) => {
  if (props.convertToView) {
    return (
      <View style={styles.contactItem} onPress={props.onPress}>
        <SubVetBox
          email={props.email}
          firstname={props.firstname}
          lastname={props.lastname}
          license_id={props.license_id}
          experiences={props.experiences}
          educations={props.educations}
          specialist_symptoms={props.specialist_symptoms}
          specialist_animals={props.specialist_animals}
          point={props.point}
          img={props.img}
          status={props.status}
        />
      </View>
    );
  } else {
    return (
      <TouchableOpacity style={styles.contactItem} onPress={props.onPress}>
        <SubVetBox
          email={props.email}
          firstname={props.firstname}
          lastname={props.lastname}
          license_id={props.license_id}
          experiences={props.experiences}
          educations={props.educations}
          specialist_symptoms={props.specialist_symptoms}
          specialist_animals={props.specialist_animals}
          point={props.point}
          img={props.img}
          status={props.status}
        />
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  contactItem: {
    width: "90%",
    justifyContent: "center",
    marginVertical: "1.5%",
    marginBottom: "1.5%",
    marginHorizontal: "5%",
    paddingBottom: "1%",
    borderRadius: 12.5,
    //   borderWidth: 1,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 6,
  },
});

export default VetBox;
