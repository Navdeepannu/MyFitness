import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import MealStack from "./stackNavigation/MealStack";
import ProfileScreen from "./screens/ProfileScreen";
import WorkoutScreen from "./screens/WorkoutScreen";

import { GestureHandlerRootView } from "react-native-gesture-handler";

// Initiate bottom tabs
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer style={styles.container}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === "Macros") {
                  iconName = "food";
                } else if (route.name === "Workout") {
                  iconName = "dumbbell";
                } else if (route.name === "Profile") {
                  iconName = "account";
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
            <Tab.Screen name="Macros" component={MealStack} />
            <Tab.Screen name="Workout" component={WorkoutScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
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
