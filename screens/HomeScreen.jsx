import { Text, View } from "react-native";
import globalStyles from "../shared/globalStyles";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import CurrentDate from "../components/CurrentDate";

const HomeScreen = () => {
  return (
    <SafeAreaProvider style={globalStyles.ScreenContainer}>
      <SafeAreaView>
        <View>
          <CurrentDate />
          <Text style={globalStyles.title}>Daily Macros</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;
