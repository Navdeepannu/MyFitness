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
          <Text style={styles.text}>Servings: {Totalserving}</Text>
        </View>
        <Text style={styles.text}>
          <Icon name="fire" style={styles.fireIcon} />{" "}
          <Text>{totalCalories} cal</Text>
        </Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2E303E",
    flexDirection: "row",
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
    color: "#ff9103",
  },
  deleteView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default MealShortCard;
