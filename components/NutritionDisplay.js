import React from "react";
import { Text, View } from "react-native";
import globalStyles from "../shared/globalStyles";
import * as Progress from "react-native-progress";

import { useSelector } from "react-redux";

import Icon from "react-native-vector-icons/Entypo";

const NutritionDisplay = () => {
  const { dailyGoals, currentMeals } = useSelector((state) => state.nutrition);

  // calculate total nutrition
  const totals = currentMeals.reduce(
    (acc, meal) => {
      const servings = meal.servings || 1;
      acc.calories += (meal.nf_calories || 0) * servings;
      acc.protein += (meal.nf_protein || 0) * servings;
      acc.carbs += (meal.nf_total_carbohydrate || 0) * servings;
      acc.fat += (meal.nf_total_fat || 0) * servings;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  // calculating the over amount for calories, if the user added more that the target calories goal.
  const calorieGoal = Number(dailyGoals.calories);
  const isOver = totals.calories > calorieGoal;
  const overAmount = Math.round(totals.calories - calorieGoal);

  // progress
  const progress = Math.min(totals.calories / calorieGoal, 1);
  const progressColor = isOver ? "#FF4C4C" : "#24c778"; // red if over, green if within

  return (
    <View style={globalStyles.nutritionDisplay}>
      {/* Chart Display */}
      <View style={globalStyles.chartWrapper}>
        <Progress.Circle progress={progress} size={130} color={progressColor} />
        <Text style={globalStyles.chartText}>
          {isOver
            ? `Over ${overAmount}\ncalories`
            : `${Math.round(totals.calories)}\ncalories`}
        </Text>
      </View>
      {/* Nutrition Values display*/}
      <View style={globalStyles.nutritionValues}>
        <Text style={globalStyles.nutritionText}>
          {Math.round(totals.protein)}(g) Protein
        </Text>
        <Text style={globalStyles.nutritionText}>
          {Math.round(totals.carbs)}(g) Carbs
        </Text>
        <Text style={globalStyles.nutritionText}>
          {Math.round(totals.fat)}(g) Fat
        </Text>

        <Text style={globalStyles.targetView}>
          <Icon name="bar-graph" color={"#24c778"} size={20} />
          <Text style={[globalStyles.nutritionText, { color: "#DEDEDE" }]}>
            Target: {dailyGoals.calories} cal
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default NutritionDisplay;
