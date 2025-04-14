import React from "react";
import { Text, View } from "react-native";
import globalStyles from "../shared/globalStyles";
import PieChart from "react-native-pie-chart";

const NutritionDisplay = () => {
  const dummydata = [{ value: 1, color: "#24c778" }];
  const pieSize = 120;

  return (
    <View style={globalStyles.nutritionDisplay}>
      {/* Chart Display */}
      <View style={globalStyles.chartWrapper}>
        <PieChart widthAndHeight={pieSize} series={dummydata} cover={0.9} />
        <Text style={globalStyles.chartText}>2000{"\n"}calories</Text>
      </View>

      {/* Nutrition Values display*/}
      <View style={globalStyles.nutritionValues}>
        <Text style={globalStyles.nutritionText}>0(g) Protein</Text>
        <Text style={globalStyles.nutritionText}>0(g) Carbs</Text>
        <Text style={globalStyles.nutritionText}>0(g) Fat</Text>
        <Text style={[globalStyles.nutritionText, { color: "#A0A0A0" }]}>
          Target: 2000 cal
        </Text>
      </View>
    </View>
  );
};

export default NutritionDisplay;
