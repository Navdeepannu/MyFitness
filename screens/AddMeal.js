import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from "react-native";

const AddMeal = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Add space from top to the input field */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <Button
        title="Add Meal"
        onPress={() => {
          /* Add your logic here */
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10, // Ensure content starts from the top
    justifyContent: "flex-start", // Align content to the top
    alignItems: "center",
    backgroundColor: "#1C1D2D",
    paddingHorizontal: 20, // Add horizontal padding to the container
  },
  title: {
    fontSize: 22,
    color: "white",
    marginBottom: 20,
  },
  searchContainer: {
    width: "100%",
    marginTop: 30, // Adds space from the top to the input field
    marginBottom: 20, // Space between search bar and button
  },
  searchInput: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    color: "white",
    paddingLeft: 10,
  },
});

export default AddMeal;
