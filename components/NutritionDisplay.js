import React from "react";
import { Text, View } from "react-native";
import globalStyles from "../shared/globalStyles";

import PieChart from "react-native-pie-chart";

const NutritionDisplay = () => {
  const dummydata = [{ value: 1, color: "#24c778" }];
  const pieSize = 130;

  return (
    <View style={globalStyles.nutritionDisplay}>
      {/* Chart Display */}
      <View style={globalStyles.chartWrapper}>
        <PieChart widthAndHeight={pieSize} series={dummydata} cover={0.9} />
        <Text style={globalStyles.chartText}>2000{"\n"}calories</Text>
      </View>

      {/* Nutrition Values display*/}
      <View style={globalStyles.nutritionValues}>
        <Text style={globalStyles.nutritionText}>0(g)Protien</Text>
        <Text style={globalStyles.nutritionText}>0(g)carbs</Text>
        <Text style={globalStyles.nutritionText}>0(g)fat</Text>
        <Text style={globalStyles.nutritionText}>Target Cals: 2000</Text>
      </View>
    </View>
  );
};

export default NutritionDisplay;
