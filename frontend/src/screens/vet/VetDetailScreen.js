import React from "react";
import { Dimensions, Text, View } from "react-native";

import color from "../../constants/color";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

var keyIndex = 0;

const createKeyIndex = () => {
  var _keyIndex = keyIndex;
  keyIndex++;
  return _keyIndex;
};

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

const InfoBox = (props) => {
  var textFromObj = "";
  if (!isString(props.detail) && props.detail !== undefined) {
    props.detail.map((e) => {
      if (textFromObj === "") {
        textFromObj += e.education || e.work;
      } else {
        textFromObj += ",\n" + (e.education || e.work);
      }
    });
  }
  return (
    <View
      key={props}
      style={{ flexShrink: 1, marginHorizontal: "5%", marginVertical: "3%" }}
    >
      <View style={{ flexShrink: 1 }}>
        <Text style={{ fontFamily: "Kanit-Light", fontSize: 18 }}>
          {props.title}
        </Text>
      </View>
      <View
        style={{
          flexGrow: 1,
          paddingHorizontal: "2%",
          borderRadius: 5,
          backgroundColor: "white",
        }}
      >
        {isString(props.detail) && (
          <Text style={{ fontFamily: "Kanit-Light", fontSize: 18 }}>
            {props.detail}
          </Text>
        )}
        {textFromObj !== "" && (
          <Text style={{ fontFamily: "Kanit-Light", fontSize: 18 }}>
            {textFromObj}
          </Text>
        )}
      </View>
    </View>
  );
};

const TagBox = (props) => {
  return (
    <View
      key={props}
      style={{ flexGrow: 1, marginHorizontal: "5%", marginVertical: "3%" }}
    >
      <View style={{ flexShrink: 1 }}>
        <Text style={{ fontFamily: "Kanit-Light", fontSize: 18 }}>
          {props.title}
        </Text>
      </View>
      <View
        style={{
          flexGrow: 1,
          flexWrap: "wrap",
          flexDirection: "row",
          borderRadius: 5,
        }}
      >
        {props.tagList &&
          props.tagList.map((e) => {
            return (
              <View
                key={createKeyIndex()}
                style={{
                  paddingHorizontal: "3%",
                  marginRight: "2%",
                  marginVertical: "2%",
                  borderRadius: 5,
                  backgroundColor: color.sopetDarkBrown,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Kanit-Light",
                    fontSize: 18,
                    color: "white",
                  }}
                >
                  {e.education}
                  {e.animal}
                  {e.symptom}
                  {e.work}
                </Text>
              </View>
            );
          })}
        {!props.tagList && (
          <Text
            style={{ fontFamily: "Kanit-Light", fontSize: 18, color: "red" }}
          >
            {"   "}ไม่มีประวัติ
          </Text>
        )}
      </View>
    </View>
  );
};

const VetDetailScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <InfoBox
        title="ชื่อจริง นามสกุล"
        detail={props.firstName + " " + props.lastName}
      />
      <InfoBox title="อีเมล" detail={props.email} />
      <InfoBox title="เลขที่ใบประกอบวิชาชีพ" detail={props.license} />
      <TagBox title="ประเภทสัตว์" tagList={props.pets} />
      <TagBox title="กลุ่มอาการ" tagList={props.specialty} />
      {/* <TagBox title="ประวัติการศึกษา" tagList={props.education} />
      <TagBox title="ประวัติการทำงาน" tagList={props.experience} /> */}
      <InfoBox title="ประวัติการศึกษา" detail={props.education} />
      <InfoBox title="ประวัติการทำงาน" detail={props.experience} />
    </View>
  );
};

export default VetDetailScreen;
