import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import plateImage from "../assets/plate1.png";
import MealShortCard from "./MealShortCard";

import { removeMeal } from "../redux/slices/nutritionSlice";
import { decrementMealsLogged } from "../redux/slices/userSlice";

const MealCard = ({ mealType }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { currentMeals } = useSelector((state) => state.nutrition);

  // Navigate to AddMeal with the specific meal type
  const handleAddMeal = () => {
    navigation.navigate("AddMeal", { mealType });
  };

  // Delete meals
  const handleDeleteMeal = (id) => {
    dispatch(removeMeal(id));
    dispatch(decrementMealsLogged());
  };

  // Filter meals by type
  const mealsForType = currentMeals.filter(
    (meal) => meal.mealType === mealType
  );

  return (
    <View style={styles.card}>
      <View style={styles.flexHead}>
        <Text style={styles.title}>{mealType}</Text>
        <TouchableOpacity style={styles.button} onPress={handleAddMeal}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        {mealsForType.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image style={styles.image} source={plateImage} />
            <Text style={styles.emptyMessage}>
              This meal is empty, click + to add Meals.
            </Text>
          </View>
        ) : (
          <View>
            {mealsForType.map((meal) => (
              <MealShortCard
                key={meal.id}
                food_name={meal.food_name}
                totalCalories={meal.totalCalories}
                Totalserving={meal.servings}
                onDelete={() => handleDeleteMeal(meal.id)}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#2E303E",
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  flexHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "#2E303E",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "space-center",
    padding: 20,
  },
  emptyMessage: {
    color: "gray",
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 10,
  },
  image: {
    width: 70,
    height: 70,
  },
});

export default MealCard;
