import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Progress from "react-native-progress";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

var keyIndex = -1;

const createKeyIndex = () => {
  var _keyIndex = keyIndex;
  keyIndex--;
  return _keyIndex;
};

const ReviewBar = (props) => {
  // console.log("create review bar");
  return (
    <View key={createKeyIndex()} style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "Kanit-Light" }}>{props.point}</Text>
      </View>
      <View
        style={{ flex: 7, justifyContent: "center", paddingHorizontal: "3%" }}
      >
        <Progress.Bar
          key={createKeyIndex()}
          progress={props.progress}
          color={"#34A853"}
          unfilledColor={"white"}
          borderWidth={0}
          width={null}
          height={12}
          borderRadius={5}
        />
      </View>
    </View>
  );
};

const ReviewBox = (props) => {
  // console.log("create review box: " + props.key);
  return (
    <View key={createKeyIndex()} style={styles.contactItem}>
      <View style={{ flex: 7 }}>
        <Text style={{ fontFamily: "Kanit-Medium" }}>{props.fullName}</Text>
        <Text style={{ fontFamily: "Kanit-Light" }}>{props.reviewText}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text style={{ fontFamily: "Kanit-Light" }}>
          {parseFloat(props.reviewScore).toFixed(1)}
        </Text>
        <Icon name={"star"} size={20} color={"#34A853"} />
      </View>
    </View>
  );
};

const CreateStar = (overallScore) => {
  var _tmpView = [];
  for (var i = 0; i < 5; i++) {
    // console.log("create star");
    _tmpView.push(
      <Icon
        key={createKeyIndex()}
        name={"star"}
        size={30}
        color={Math.floor(overallScore) > i ? "#34A853" : "white"}
      />
    );
  }

  return _tmpView;
};

const calOverallScore = (scoreList, totalReview) => {
  return parseFloat(
    (scoreList[0] * 5 +
      scoreList[1] * 4 +
      scoreList[2] * 3 +
      scoreList[3] * 2 +
      scoreList[4] * 1) /
      totalReview
  ).toFixed(1);
};

const VetReviewScreen = (props) => {
  const [scoreList, setScoreList] = useState([0, 0, 0, 0, 0]);
  const [calScoreDone, setCalScoreDone] = useState(false);

  var _tmpStarCount = 5;
  var totalReview =
    props.reviewList.length !== 0 ? props.reviewList.length : Number.MAX_VALUE;

  var allReviewBox = [];

  var _count = 0;
  props.reviewList.map((e) => {
    {
      if (!calScoreDone) {
        scoreList[5 - e.create_review.satisfaction_point] =
          scoreList[5 - e.create_review.satisfaction_point] + 1;
        _count++;
      }
      // console.log(scoreList);
      allReviewBox.push(
        <ReviewBox
          fullName={
            e.client_match.firstname + " " + e.client_match.lastname
            // " (ID: " +
            // e.service_id +
            // ")"
          }
          reviewText={e.create_review.suggestion}
          reviewScore={e.create_review.satisfaction_point}
        />
      );
      if (_count == totalReview) {
        setCalScoreDone(true);
      }
    }
  });

  var overallScore = calOverallScore(scoreList, totalReview);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 4, justifyContent: "center" }}>
          <View
            style={{
              flexShrink: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "Kanit-Light", fontSize: 48 }}>
              {overallScore}
            </Text>
          </View>
          <View
            style={{
              flexShrink: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {CreateStar(overallScore)}
          </View>
        </View>
        <View style={{ flex: 5 }}>
          {scoreList.map((e) => {
            var _star = _tmpStarCount;
            _tmpStarCount--;
            return (
              <ReviewBar
                key={createKeyIndex()}
                point={_star}
                progress={e / totalReview}
              />
            );
          })}
        </View>
      </View>
      <View style={{ flex: 8 }}>{allReviewBox}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    flexShrink: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: "3%",
    marginVertical: "2%",
    marginHorizontal: "5%",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
  },
});

export default VetReviewScreen;
