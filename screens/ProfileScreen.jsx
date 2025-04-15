import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Modal,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setDailyGoals } from "../redux/slices/nutritionSlice";
import { updateProfile } from "../redux/slices/userSlice";
import globalStyles from "../shared/globalStyles";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showCalorieModal, setShowCalorieModal] = useState(false);
  const [newCalorieTarget, setNewCalorieTarget] = useState("");

  const dispatch = useDispatch();

  const { dailyGoals } = useSelector((state) => state.nutrition);
  const userProfile = useSelector((state) => state.user.profile);
  const userStats = useSelector((state) => state.user.stats);

  const [editableProfile, setEditableProfile] = useState(userProfile);

  const handleEdit = () => {
    if (isEditing) {
      dispatch(updateProfile(editableProfile));
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setEditableProfile({ ...editableProfile, [field]: value });
  };

  const handleCalorieTargetChange = () => {
    const target = parseInt(newCalorieTarget);
    if (isNaN(target) || target <= 0) {
      Alert.alert("Error", "Please enter a valid calorie target");
      return;
    }

    dispatch(setDailyGoals({ ...dailyGoals, calories: target }));
    setShowCalorieModal(false);
    setNewCalorieTarget("");
    Alert.alert("Success", "Calorie target updated!");
  };

  const handleLogout = () => {
    alert("Logging out...");
  };

  return (
    <SafeAreaProvider style={globalStyles.ScreenContainer}>
      <SafeAreaView>
        <Text style={styles.title}>User Profile</Text>

        {isEditing ? (
          <View>
            <TextInput
              style={styles.input}
              value={editableProfile.name}
              onChangeText={(text) => handleInputChange("name", text)}
              placeholder="Name"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              value={editableProfile.age.toString()}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange("age", text)}
              placeholder="Age"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              value={editableProfile.height}
              onChangeText={(text) => handleInputChange("height", text)}
              placeholder="Height"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              value={editableProfile.weight}
              onChangeText={(text) => handleInputChange("weight", text)}
              placeholder="Weight"
              placeholderTextColor="#999"
            />
            <Text style={styles.label}>Goal</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={editableProfile.goal}
                style={styles.picker}
                dropdownIconColor="#fff"
                onValueChange={(itemValue) =>
                  handleInputChange("goal", itemValue)
                }
              >
                <Picker.Item label="Select Goal" value="" />
                <Picker.Item label="Muscle Gain" value="Muscle Gain" />
                <Picker.Item label="Lose Weight" value="Lose Weight" />
                <Picker.Item label="Maintain Weight" value="Maintain Weight" />
                <Picker.Item
                  label="Improve Endurance"
                  value="Improve Endurance"
                />
              </Picker>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.infoText}>👤 Name: {userProfile.name}</Text>
            <Text style={styles.infoText}>🎂 Age: {userProfile.age}</Text>
            <Text style={styles.infoText}>📏 Height: {userProfile.height}</Text>
            <Text style={styles.infoText}>⚖️ Weight: {userProfile.weight}</Text>
            <Text style={styles.infoText}>🎯 Goal: {userProfile.goal}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>
            {isEditing ? "Save" : "Edit Profile"}
          </Text>
        </TouchableOpacity>

        <View style={styles.statsBox}>
          <Text style={styles.statText}>
            🍽️ Meals Logged: {userStats.mealsLogged}
          </Text>
          <Text style={styles.statText}>
            🏋️ Workouts: {userStats.workoutsCompleted}
          </Text>
          <Text style={styles.statText}>
            🔥 Calorie Target: {dailyGoals.calories} cal
          </Text>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setShowCalorieModal(true)}
          >
            <Text style={styles.buttonText}>Change Calorie Target</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        {/* Calorie Modal */}
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
                placeholder="e.g. 2200"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={newCalorieTarget}
                onChangeText={setNewCalorieTarget}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleCalorieTargetChange}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonCancel}
                  onPress={() => setShowCalorieModal(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  infoText: {
    fontSize: 18,
    color: "#e2e2e2",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#ffffff",
    color: "#000",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  secondaryButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  logoutButton: {
    backgroundColor: "#f44336",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 5,
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
  picker: {
    color: "#333",
  },
  statsBox: {
    backgroundColor: "#3a3d4d",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  statText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#2e303e",
    borderRadius: 10,
    padding: 20,
    width: "85%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: "#f44336",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 10,
  },
});

export default ProfileScreen;
