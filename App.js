import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import WorkoutScreen from "./screens/WorkoutScreen";
import NutritionTracker from "./screens/NutritionTracker"; // Import the NutritionTracker screen
import globalStyles from "./shared/globalStyles";

// Initiate bottom tabs
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Workout") {
              iconName = "dumbbell";
            } else if (route.name === "Profile") {
              iconName = "account";
            } else if (route.name === "Nutrition") {
              iconName = "food"; // Icon for NutritionTracker
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#808080",
          tabBarStyle: {
            paddingTop: 5,
            backgroundColor: "#10111a",
            borderTopWidth: 0,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Workout" component={WorkoutScreen} />
        <Tab.Screen name="Nutrition" component={NutritionTracker} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1D2D",
    alignItems: "center",
    justifyContent: "center",
  },
});