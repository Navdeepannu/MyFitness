import { View, Text } from "react-native";
import React from "react";

const getDaySuffix = (day) => {
  if (day > 3 && day < 21) return "th"; // Catch 11th-13th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const CurrentDate = () => {
  const today = new Date();
  const day = today.getDate();
  const daySuffix = getDaySuffix(day);
  const formattedDate = `${today.toLocaleString("en-US", { weekday: "long" })}, ${today.toLocaleString("en-US", { month: "long" })} ${day}${daySuffix}`;

  return (
    <View>
      <Text style={{ color: "white", fontSize: 16 }}>{formattedDate}</Text>
    </View>
  );
};

export default CurrentDate;
