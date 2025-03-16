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
          
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10, 
    justifyContent: "flex-start", 
    alignItems: "center",
    backgroundColor: "#1C1D2D",
    paddingHorizontal: 20, 
  },
  title: {
    fontSize: 22,
    color: "white",
    marginBottom: 20,
  },
  searchContainer: {
    width: "100%",
    marginTop: 30, 
    marginBottom: 20,
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
