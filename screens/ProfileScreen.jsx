import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TextInput, Modal, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setDailyGoals } from "../redux/slices/nutritionSlice";
import globalStyles from "../shared/globalStyles";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showCalorieModal, setShowCalorieModal] = useState(false);
  const [newCalorieTarget, setNewCalorieTarget] = useState("");
  
  const dispatch = useDispatch();
  const { dailyGoals } = useSelector((state) => state.nutrition);

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

  const handleCalorieTargetChange = () => {
    const target = parseInt(newCalorieTarget);
    if (isNaN(target) || target <= 0) {
      Alert.alert("Error", "Please enter a valid calorie target");
      return;
    }
    
    dispatch(setDailyGoals({
      ...dailyGoals,
      calories: target
    }));
    setShowCalorieModal(false);
    setNewCalorieTarget("");
    Alert.alert("Success", "Calorie target updated successfully!");
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
            <Text style={styles.profileText}>
              Current Calorie Target: {dailyGoals.calories} cal
            </Text>
            <Button
              title="Change Calorie Target"
              onPress={() => setShowCalorieModal(true)}
            />
          </View>

          <Button title="Logout" onPress={handleLogout} color="red" />
        </View>

        {/* Calorie Target Modal */}
        <Modal
          visible={showCalorieModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowCalorieModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Set Calorie Target</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter new calorie target"
                keyboardType="numeric"
                value={newCalorieTarget}
                onChangeText={setNewCalorieTarget}
              />
              <View style={styles.modalButtons}>
                <Button
                  title="Save"
                  onPress={handleCalorieTargetChange}
                />
                <Button
                  title="Cancel"
                  onPress={() => setShowCalorieModal(false)}
                  color="red"
                />
              </View>
            </View>
          </View>
        </Modal>
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
  input: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
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
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default ProfileScreen;
