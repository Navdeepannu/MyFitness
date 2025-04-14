import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

const MealShortCard = ({ food_name, totalCalories, Totalserving }) => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{food_name}</Text>
        <Text style={styles.text}>Servings: {Totalserving}</Text>
      </View>
      <Text style={styles.text}>
        <Icon name="fire" style={styles.fireIcon} />
        {totalCalories}
        cal
      </Text>
    </View>
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
    fontSize: 14,
    fontWeight: "200",
    color: "white",
  },
  fireIcon: {
    fontSize: 15,
    color: "#ff9103",
  },
});

export default MealShortCard;
