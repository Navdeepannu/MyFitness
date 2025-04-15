import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import globalStyles from "../shared/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import MealCard from "./MealsCard";

// Meal Type options
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const Meals = () => {
  const [showModal, setShowModal] = useState(false);
  const [mealCards, setMealCards] = useState(["Breakfast", "Lunch"]);

  const handleAddMeal = (mealType) => {
    setShowModal(false);
    // Add new meal card if it doesn't exist
    if (!mealCards.includes(mealType)) {
      setMealCards([...mealCards, mealType]);
      Alert.alert(
        "Success",
        `${mealType} meal card has been added successfully!`,
        [{ text: "OK" }]
      );
    } else {
      Alert.alert("Info", `${mealType} meal card already exists!`, [
        { text: "OK" },
      ]);
    }
  };

  return (
    <View>
      <View style={globalStyles.mealsDisplay}>
        {/* Title */}
        <View>
          <Text style={globalStyles.title}>Your Meals</Text>
        </View>

        {/* Button with Aligned Icon */}
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => setShowModal(true)}
        >
          <MaterialIcons
            name="add"
            size={24}
            color="white"
            style={globalStyles.buttonIcon}
          />
          <Text style={globalStyles.buttonText}>Add Meals</Text>
        </TouchableOpacity>
      </View>

      {/* Append Meals Type card */}
      <View>
        {MEAL_TYPES.map((type) => (
          <View key={type}>
            {mealCards.includes(type) && <MealCard mealType={type} />}
          </View>
        ))}
      </View>

      {/* Meal Type Selection Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Meal Type</Text>
            {MEAL_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.mealTypeButton}
                onPress={() => handleAddMeal(type)}
              >
                <Text style={styles.mealTypeText}>{type}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#2E303E",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  mealTypeButton: {
    backgroundColor: "#1C1D2D",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  mealTypeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  closeButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#ff5a00",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Meals;
