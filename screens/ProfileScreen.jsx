import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import globalStyles from "../shared/globalStyles";
import CurrentDate from "../components/CurrentDate";

import Icon from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useDispatch } from "react-redux";
import { saveTargetCalories} from "../redux/slices/nutritionSlice";

import { auth, db } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const [modals, setModals] = useState({
    login: false,
    register: false,
    calories: false,
    workout: false,
    weight: false,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [targetCalories, setTargetCalories] = useState("");
  const [targetWorkout, setTargetWorkout] = useState("");
  const [weight, setWeight] = useState("");

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [macroLogCount, setMacroLogCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setTargetCalories(data.targetCalories || "");
          setTargetWorkout(data.targetWorkout || "");
          setWeight(data.weight || "");

          // Fetch macro logs count
          const macrosRef = collection(db, "macros");
          const macrosQuery = query(macrosRef, where("userId", "==", user.uid));
          const macrosSnapshot = await getDocs(macrosQuery);
          setMacroLogCount(macrosSnapshot.size);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // handle registration
  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      await setDoc(doc(db, "users", uid), {
        username,
        email,
        targetCalories: "",
        targetWorkout: "",
        weight: "",
      });
      setModals({ ...modals, register: false });
    } catch (error) {
      Alert.alert("Registration Error", error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setModals({ ...modals, login: false });
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  const updateUserField = async (field, value) => {
    if (field === "targetCalories") {
      dispatch(saveTargetCalories(value));
    }
    
    if(user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { [field]: value });
    }
    if(field === "targetCalories") {
      setTargetCalories(value);
    }
    if(field === "targetWorkout") {
      setTargetWorkout(value);
    }
    if(field === "weight") {
      setWeight(value);
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.ScreenContainer}>
        <ScrollView>
          <CurrentDate />
          <Text style={styles.title}>Hello!</Text>
          <Text style={styles.loginInfo}>
            {user ? `Logged in as ${userData?.username}` : "Logged in as Guest"}
          </Text>

          <Text style={styles.title}>Targets</Text>

          <TouchableOpacity
            style={styles.inputContainers}
            onPress={() => setModals({ ...modals, calories: true })}
          >
            <View style={styles.iconText}>
              <Icons name="fire" style={styles.fireIcon} />
              <Text style={styles.inputField}>
                Target Daily Calories: {targetCalories || "Not set"}
              </Text>
            </View>
            <Icon name="right" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.inputContainers}
            onPress={() => setModals({ ...modals, workout: true })}
          >
            <View style={styles.iconText}>
              <MaterialIcons name="weight-lifter" style={styles.builderIcon} />
              <Text style={styles.inputField}>
                Target Workout per Week: {targetWorkout || "Not set"}
              </Text>
            </View>
            <Icon name="right" style={styles.icon} />
          </TouchableOpacity>

          <Text style={styles.title}>Stats</Text>

          <TouchableOpacity
            style={styles.inputContainers}
            onPress={() => setModals({ ...modals, weight: true })}
          >
            <View style={styles.iconText}>
              <Icons name="weight" style={styles.icon} />
              <Text style={styles.inputField}>
                Current Weight: {weight || "Not set"}
              </Text>
            </View>
            <Icon name="right" style={styles.icon} />
          </TouchableOpacity>

          <View style={styles.inputContainers}>
            <View style={styles.iconText}>
              <MaterialIcons name="food" style={styles.icon} />
              <Text style={styles.inputField}>
                Total days Logged - Macros: {macroLogCount}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>Account</Text>

          {!user ? (
            <TouchableOpacity
              style={styles.inputContainers}
              onPress={() => setModals({ ...modals, login: true })}
            >
              <View style={styles.iconText}>
                <MaterialIcons name="account" style={styles.icon} />
                <Text style={styles.inputField}>Log In</Text>
              </View>
              <Icon name="right" style={styles.icon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.inputContainers}
              onPress={handleLogout}
            >
              <View style={styles.iconText}>
                <MaterialIcons name="logout" style={styles.icon} />
                <Text style={styles.inputField}>Log Out</Text>
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>

        {/* Reusable Input Modal */}
        {["calories", "workout", "weight"].map((key) => (
          <Modal
            key={key}
            visible={modals[key]}
            transparent
            animationType="slide"
            onRequestClose={() => setModals({ ...modals, [key]: false })}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalBox}>
                <TextInput
                  placeholder={`Enter your ${key}`}
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    if (key === "calories") setTargetCalories(value);
                    if (key === "workout") setTargetWorkout(value);
                    if (key === "weight") setWeight(value);
                  }}
                  style={styles.modalInput}
                />
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    updateUserField(
                      key === "calories"
                        ? "targetCalories"
                        : key === "workout"
                          ? "targetWorkout"
                          : "weight",
                      key === "calories"
                        ? targetCalories
                        : key === "workout"
                          ? targetWorkout
                          : weight
                    );
                    setModals({ ...modals, [key]: false });
                  }}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ))}

        {/* Login Modal */}
        <Modal visible={modals.login} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.modalInput}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.modalInput}
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleLogin}
              >
                <Text style={styles.modalButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setModals({ ...modals, login: false, register: true })
                }
              >
                <Text style={styles.registerText}>
                  Don't have an account? Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Register Modal */}
        <Modal visible={modals.register} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.modalInput}
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.modalInput}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.modalInput}
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleRegister}
              >
                <Text style={styles.modalButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 20,
    marginBottom: 10,
  },
  loginInfo: {
    color: "white",
    marginBottom: 20,
  },
  inputContainers: {
    borderTopWidth: 1,
    borderColor: "#303955",
    paddingVertical: 15,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconText: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  inputField: {
    color: "white",
    fontSize: 16,
  },
  icon: {
    color: "white",
    fontSize: 22,
  },
  fireIcon: {
    color: "orange",
    fontSize: 22,
  },
  builderIcon: {
    color: "#30f9f5",
    fontSize: 22,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#1e1e2e",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalInput: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  modalButton: {
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  registerText: {
    color: "#90caf9",
    marginTop: 10,
    textAlign: "center",
  },
});

export default ProfileScreen;
