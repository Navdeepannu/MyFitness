import { Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import globalStyles from "../shared/globalStyles";

import CurrentDate from "../components/CurrentDate";

const ProfileScreen = () => {
  return (
    <SafeAreaProvider style={globalStyles.ScreenContainer}>
      <SafeAreaView>
        <View>
          <CurrentDate />
          <Text style={globalStyles.title}>Hello!</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ProfileScreen;
