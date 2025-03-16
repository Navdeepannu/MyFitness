import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import globalStyles from "../shared/globalStyles";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "John Doe",
    age: 25,
    height: "175 cm",
    weight: "70 kg",
    goal: "Muscle Gain",
    mealsLogged: 15,
    workoutsCompleted: 5,
    streak: 3,
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleLogout = () => {
    alert("Logging out...");
  };

  return (
    <SafeAreaProvider style={globalStyles.ScreenContainer}>
      <SafeAreaView>
        <View>
          <Text style={globalStyles.title}>User Profile</Text>

          {isEditing ? (
            <View>
              <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
              <TextInput
                style={styles.input}
                value={profile.age.toString()}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange("age", text)}
              />
              <TextInput
                style={styles.input}
                value={profile.height}
                onChangeText={(text) => handleInputChange("height", text)}
              />
              <TextInput
                style={styles.input}
                value={profile.weight}
                onChangeText={(text) => handleInputChange("weight", text)}
              />
              <TextInput
                style={styles.input}
                value={profile.goal}
                onChangeText={(text) => handleInputChange("goal", text)}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.profileText}>Name: {profile.name}</Text>
              <Text style={styles.profileText}>Age: {profile.age}</Text>
              <Text style={styles.profileText}>Height: {profile.height}</Text>
              <Text style={styles.profileText}>Weight: {profile.weight}</Text>
              <Text style={styles.profileText}>Goal: {profile.goal}</Text>
            </View>
          )}

          <Button
            title={isEditing ? "Save" : "Edit Profile"}
            onPress={handleEdit}
          />

          <View style={styles.progressContainer}>
            <Text style={styles.profileText}>
              Meals Logged: {profile.mealsLogged}
            </Text>
            <Text style={styles.profileText}>
              Workouts Completed: {profile.workoutsCompleted}
            </Text>
            <Text style={styles.profileText}>
              Current Streak: {profile.streak} Days
            </Text>
          </View>

          <Button title="Logout" onPress={handleLogout} color="red" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  profileText: {
    color: "white",
    fontSize: 18,
    marginVertical: 5,
  },
  progressContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#2E303E",
    borderRadius: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  input: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default ProfileScreen;
