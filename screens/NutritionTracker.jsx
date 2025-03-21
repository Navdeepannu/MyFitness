import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";

const NutritionTracker = () => {
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // environment variables
  const api_id = Constants.expoConfig.extra.API_ID;
  const api_key = Constants.expoConfig.extra.API_KEY;

  // Fetch food data from Nutritionix API
  const searchFoods = async () => {
    if (!query) {
      setError("Please enter a food item.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": api_id,
            "x-app-key": api_key,
          },
          body: JSON.stringify({
            query: query,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch food data.");
      }

      const data = await response.json();
      setFoods(data.foods);
    } catch (error) {
      console.error("Error fetching food data:", error);
      setError("Failed to fetch food data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Calories Tracker</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a food item (e.g., 2 slices of pizza)"
            value={query}
            onChangeText={setQuery}
          />
          <Button
            title={loading ? "Searching..." : "Search"}
            onPress={searchFoods}
            disabled={loading}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <FlatList
          data={foods}
          keyExtractor={(item) => item.food_name}
          renderItem={({ item }) => (
            <View style={styles.foodCard}>
              <Text style={styles.foodName}>{item.food_name}</Text>
              <Text>
                <Text style={styles.label}>Calories: {item.nf_calories}</Text>
              </Text>
              <Text>
                <Text style={styles.label}>
                  Serving Size: {item.serving_qty} {item.serving_unit}
                </Text>
              </Text>
              <Text>
                <Text style={styles.label}>Protein: {item.nf_protein} g</Text>
              </Text>
              <Text>
                <Text style={styles.label}>
                  Carbs: {item.nf_total_carbohydrate} g
                </Text>
              </Text>
              <Text>
                <Text style={styles.label}>Fat: {item.nf_total_fat} g </Text>
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.label}>
              No foods found. Try searching for something else!
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1C1D2D",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  foodCard: {
    backgroundColor: "#2E2F3E",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  foodName: {
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: "white",
  },
});

export default NutritionTracker;
