import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  searchFoods,
  addMeal,
  clearSearchResults,
} from "../redux/slices/nutritionSlice";
import { incrementMealsLogged } from "../redux/slices/userSlice";

import { useNavigation, useRoute } from "@react-navigation/native";

const AddMeal = () => {
  const [query, setQuery] = useState("");
  const [servingSizes, setServingSizes] = useState({}); // Store serving size inputs
  const navigation = useNavigation();
  const route = useRoute();
  const mealType = route.params?.mealType || "Breakfast";

  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector(
    (state) => state.nutrition
  );

  // Handle serving size input change
  const handleServingChange = (foodName, value) => {
    const updatedServingSizes = { ...servingSizes, [foodName]: value };
    setServingSizes(updatedServingSizes);
  };

  const handleSearch = () => {
    if (!query) {
      return;
    }
    dispatch(searchFoods(query));
  };

  const handleAddMeal = (meal) => {
    const enteredServing = servingSizes[meal.food_name] || 0;
    const mealWithServing = {
      ...meal,
      id: Date.now(), // Generates a unique ID
      servings: enteredServing,
      totalCalories: (meal.nf_calories * enteredServing).toFixed(2),
      totalCarbs: (meal.nf_total_carbohydrate * enteredServing).toFixed(2),
      totalFat: (meal.nf_total_fat * enteredServing).toFixed(2),
      totalProtein: (meal.nf_protein * enteredServing).toFixed(2),
      mealType: mealType,
    };

    dispatch(addMeal(mealWithServing));
    dispatch(incrementMealsLogged());
    dispatch(clearSearchResults());
    setQuery("");
    setServingSizes({});

    // Navigate back to home screen
    navigation.navigate("Macros");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mealTypeTitle}>Adding to {mealType}</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="gray"
          value={query}
          onChangeText={(text) => setQuery(text)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSearch}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Search Meal</Text>
        </TouchableOpacity>
      </View>

      <View>{error ? <Text style={styles.error}>{error}</Text> : null}</View>

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.food_name}
        renderItem={({ item }) => {
          const enteredServing =
            servingSizes[item.food_name] !== undefined
              ? servingSizes[item.food_name]
              : "1";
          const totalCalories = (item.nf_calories * enteredServing).toFixed(2);
          const totalCarbs = (
            item.nf_total_carbohydrate * enteredServing
          ).toFixed(2);
          const totalFat = (item.nf_total_fat * enteredServing).toFixed(2);
          const totalProtein = (item.nf_protein * enteredServing).toFixed(2);

          return (
            <View style={styles.foodCard}>
              <Text style={styles.foodName}>
                {item.food_name.toUpperCase()}
              </Text>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Calories:</Text>
                <Text style={styles.infoText}>{totalCalories} kcal</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Serving Size:</Text>
                <Text style={styles.infoText}>
                  {item.serving_qty} {item.serving_unit}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Protein:</Text>
                <Text style={styles.infoText}>{totalProtein} g</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Carbs:</Text>
                <Text style={styles.infoText}>{totalCarbs} g</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Fat:</Text>
                <Text style={styles.infoText}>{totalFat} g</Text>
              </View>

              {/* Input for serving size */}
              <View style={styles.inputRow}>
                <Text style={styles.label}>Enter Serving Size:</Text>
                <TextInput
                  style={styles.servingInput}
                  keyboardType="numeric"
                  placeholder="1"
                  placeholderTextColor="white"
                  value={String(enteredServing)}
                  onChangeText={(value) =>
                    handleServingChange(item.food_name, value)
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddMeal(item)}
              >
                <Text style={styles.buttonText}>Add to {mealType}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={
          !error && (
            <Text style={styles.title}>Try searching for something!</Text>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#1C1D2D",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2E303E",
  },
  mealTypeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    color: "white",
    paddingLeft: 10,
  },
  button: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  error: {
    color: "red",
    marginTop: 5,
    paddingHorizontal: 12,
  },
  foodCard: {
    backgroundColor: "#2E303E",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "white",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#eee",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  servingInput: {
    height: 30,
    width: 60,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    color: "white",
    textAlign: "center",
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#ff5a00",
  },
  title: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default AddMeal;
