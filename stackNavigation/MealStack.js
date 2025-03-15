import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AddMeal from "../screens/AddMeal";

const Stack = createStackNavigator();

const MealStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="AddMeal"
        component={AddMeal}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#1c1d2d",
          },
          headerTintColor: "white",
          headerTitle: "Add Meal",
          headerBackTitle: " ",
        }}
      />
    </Stack.Navigator>
  );
};

export default MealStack;
