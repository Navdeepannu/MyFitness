import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import plateImage from "../assets/plate1.png";

const MealCard = () => {
  const navigation = useNavigation();
  const [mealSet, setMealSet] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.flexHead}>
        <Text style={styles.title}>Breakfast</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddMeal")}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        {!mealSet ? (
          <View style={styles.emptyContainer}>
            <Image style={styles.image} source={plateImage} />
            <Text style={styles.emptyMessage}>
              This meal is empty, click + to add Meals.
            </Text>
          </View>
        ) : (
          <View>
            <Text>Meal added.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#2E303E",
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  flexHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "#2E303E",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "space-center",
    padding: 20,
  },
  emptyMessage: {
    color: "gray",
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 10,
  },
  image: {
    width: 70,
    height: 70,
  },
});

export default MealCard;
