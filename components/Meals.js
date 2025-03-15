import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import globalStyles from "../shared/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import MealCard from "./MealsCard";

const Meals = () => {
  // TODO: add a pop-up modal to add a new meal category
  const showModal = () => {};

  return (
    <View>
      <View style={globalStyles.mealsDisplay}>
        {/* Title */}
        <View>
          <Text style={globalStyles.title}>Your Meals</Text>
        </View>

        {/* Button with Aligned Icon */}
        <TouchableOpacity style={globalStyles.button} onPress={showModal}>
          <MaterialIcons
            name="add"
            size={24}
            color="white"
            style={globalStyles.buttonIcon}
          />
          <Text style={globalStyles.buttonText}>Add Meals</Text>
        </TouchableOpacity>
      </View>

      {/* Append the meal display here */}
      <View>
        <MealCard />
      </View>
    </View>
  );
};

export default Meals;
