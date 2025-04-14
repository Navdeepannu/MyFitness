import { Text, View } from "react-native";
import globalStyles from "../shared/globalStyles";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import CurrentDate from "../components/CurrentDate";
import NutritionDisplay from "../components/NutritionDisplay";
import Meals from "../components/Meals";
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = () => {
  return (
    <SafeAreaProvider style={globalStyles.ScreenContainer}>
      <SafeAreaView>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CurrentDate />
            <Text style={globalStyles.title}>Daily Macros</Text>

            {/* Nutrition Display  */}
            <NutritionDisplay />

            {/* All Meals Display */}

            <Meals />
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;
