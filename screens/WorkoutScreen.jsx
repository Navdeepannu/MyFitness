import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  StyleSheet,
  Animated,
  Platform,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { addWorkoutLog, deleteWorkoutLog } from "../redux/slices/workoutSlice";
import globalStyles from "../shared/globalStyles";
import CurrentDate from "../components/CurrentDate";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WORKOUT_TYPES = [
  {
    id: 1,
    name: "Cardio",
    exercises: ["Running", "Cycling", "Swimming", "Jump Rope"],
  },
  {
    id: 2,
    name: "Strength",
    exercises: ["Push-ups", "Pull-ups", "Squats", "Deadlifts"],
  },
  { id: 3, name: "Flexibility", exercises: ["Yoga", "Stretching", "Pilates"] },
  {
    id: 4,
    name: "HIIT",
    exercises: ["Burpees", "Mountain Climbers", "Jump Squats"],
  },
];

const quotes = [
  "Push yourself, because no one else is going to do it for you.",
  "Success starts with self-discipline.",
  "No pain, no gain. Shut up and train.",
  "The body achieves what the mind believes.",
];

const getRandomExercise = () => {
  const randomWorkoutType =
    WORKOUT_TYPES[Math.floor(Math.random() * WORKOUT_TYPES.length)];
  const randomExercise =
    randomWorkoutType.exercises[
      Math.floor(Math.random() * randomWorkoutType.exercises.length)
    ];
  return `💪 Exercise of the Day: ${randomExercise}`;
};

const WorkoutScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [exerciseOfTheDay, setExerciseOfTheDay] = useState("");
  const [quote, setQuote] = useState("");

  const dispatch = useDispatch();
  const { workoutLogs } = useSelector((state) => state.workout);

  useEffect(() => {
    setExerciseOfTheDay(getRandomExercise());
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleAddWorkout = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const handleSaveWorkout = () => {
    if (!selectedWorkout || !duration) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    dispatch(
      addWorkoutLog({
        id: Date.now(),
        date: new Date().toISOString(),
        type: selectedWorkout.name,
        exercise: selectedWorkout.exercises[0],
        duration,
        notes,
      })
    );

    setShowModal(false);
    setSelectedWorkout(null);
    setDuration("");
    setNotes("");
    Alert.alert("Success", "Workout logged successfully!");
  };

  const handleDeleteWorkout = (id) => {
    dispatch(deleteWorkoutLog(id));
    Alert.alert("Deleted", "Workout deleted successfully");
  };

  useEffect(() => {
    setExerciseOfTheDay(getRandomExercise());
  }, []);

  return (
    <SafeAreaView style={globalStyles.ScreenContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <CurrentDate />

          <Animated.View
            style={[styles.inspirationSection, { opacity: fadeAnim }]}
          >
            <Text style={styles.quote}>{quote}</Text>
            <Text style={styles.exerciseOfTheDay}>{exerciseOfTheDay}</Text>
          </Animated.View>

          <Text style={globalStyles.title}>Daily Workout</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowModal(true)}
          >
            <MaterialIcons name="add" size={24} color="white" />
            <Text style={styles.buttonText}>Add Workout</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.workoutList}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {workoutLogs.map((log) => (
            <Swipeable
              key={log.id}
              renderRightActions={() => (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteWorkout(log.id)}
                >
                  <Icon
                    name="delete-forever-outline"
                    size={40}
                    color="#D84040"
                  />
                </TouchableOpacity>
              )}
            >
              <View style={styles.workoutCard}>
                <Text style={styles.workoutType}>{log.type}</Text>
                <Text style={styles.workoutDetails}>
                  Exercise: {log.exercise}
                </Text>
                <Text style={styles.workoutDetails}>
                  Duration: {log.duration} minutes
                </Text>
                {log.notes && (
                  <Text style={styles.workoutNotes}>Notes: {log.notes}</Text>
                )}
                <Text style={styles.workoutDate}>
                  {new Date(log.date).toLocaleDateString()}
                </Text>
              </View>
            </Swipeable>
          ))}
        </ScrollView>

        <Modal
          visible={showModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Workout</Text>

              {!selectedWorkout ? (
                WORKOUT_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={styles.workoutTypeButton}
                    onPress={() => handleAddWorkout(type)}
                  >
                    <Text style={styles.workoutTypeText}>{type.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <>
                  <Text style={styles.selectedWorkout}>
                    Selected: {selectedWorkout.name}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Duration (minutes)"
                    placeholderTextColor="gray"
                    value={duration}
                    onChangeText={setDuration}
                    keyboardType={
                      Platform.OS === "ios" ? "number-pad" : "numeric"
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Notes (optional)"
                    placeholderTextColor="gray"
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                  />
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveWorkout}
                  >
                    <Text style={styles.saveButtonText}>Save Workout</Text>
                  </TouchableOpacity>
                </>
              )}

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setShowModal(false);
                  setSelectedWorkout(null);
                  setDuration("");
                  setNotes("");
                }}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1D2D",
    paddingTop: 16,
  },
  header: {
    marginBottom: 20,
  },
  inspirationSection: {
    backgroundColor: "#2E303E",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#ffa726",
    marginBottom: 10,
  },
  exerciseOfTheDay: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff5a00",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
  workoutList: {
    flex: 1,
  },
  workoutCard: {
    backgroundColor: "#2E303E",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  workoutType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  workoutDetails: {
    fontSize: 16,
    color: "#eee",
    marginBottom: 4,
  },
  workoutNotes: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 8,
    fontStyle: "italic",
  },
  workoutDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
    alignSelf: "flex-end",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "90%",
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
  workoutTypeButton: {
    backgroundColor: "#1C1D2D",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  workoutTypeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  selectedWorkout: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1C1D2D",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    color: "white",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
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

export default WorkoutScreen;
