import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { Swipeable } from "react-native-gesture-handler";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const MealShortCard = ({
  food_name,
  totalCalories,
  Totalserving,
  onDelete,
}) => {
  const renderRightActions = () => {
    return (
      <TouchableOpacity onPress={onDelete} style={styles.deleteView}>
        <Icons name="delete-forever-outline" size={30} color={"#D84040"} />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>{food_name.toUpperCase()}</Text>
          <Text style={styles.text}>servings: {Totalserving}</Text>
        </View>
        <Text style={styles.calorieButton}>
          <Icon name="fire" style={styles.fireIcon} />{" "}
          <Text>{Math.round(totalCalories)} cal</Text>
        </Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#303955",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
  text: {
    fontSize: 15,
    fontWeight: "200",
    color: "white",
  },
  fireIcon: {
    fontSize: 15,
    color: "#ff7500",
  },
  deleteView: {
    flexDirection: "row",
    alignItems: "center",
  },
  calorieButton: {
    fontSize: 15,
    fontWeight: "200",
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 100,
    backgroundColor: "#303955",
  },
});

export default MealShortCard;
