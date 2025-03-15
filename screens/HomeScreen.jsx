import { Text, View } from "react-native";
import globalStyles from "../shared/globalStyles";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import CurrentDate from "../components/CurrentDate";
import NutritionDisplay from "../components/NutritionDisplay";
import Meals from "../components/Meals";

const HomeScreen = () => {
  return (
    <SafeAreaProvider style={globalStyles.ScreenContainer}>
      <SafeAreaView>
        <View>
          <CurrentDate />
          <Text style={globalStyles.title}>Daily Macros</Text>

          <NutritionDisplay />

          <Meals />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;
