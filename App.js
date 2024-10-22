import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BottomNavigation from "./src/navigation/BottomNavigation";
import Onboarding from "./src/components/Onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewOnboarding, setViewOnboarding] = useState(false);

  const Stack = createNativeStackNavigator();
  const Loading = () => {
    <View>
      <ActivityIndicator size={"large"} />
    </View>;
  };

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      console.log(value);
      if (value !== null) {
        setViewOnboarding(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  // const renderScreens = () => {
  //   if (loading) {
  //     return <Stack.Screen name="Loading" component={Loading} />;
  //   }
  //   if (viewOnboarding) {
  //     return <Stack.Screen name="Navigation" component={BottomNavigation} />;
  //   }
  //   return <Stack.Screen name="Onboarding" component={Onboarding} />;
  // };

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {loading ? (
            <Stack.Screen name="Loading" component={Loading} />
          ) : viewOnboarding ? (
            <Stack.Screen name="Navigation" component={BottomNavigation} />
          ) : (
            <Stack.Screen
              name="Onboarding"
              children={(props) => (
                <Onboarding {...props} setOnboarding={setViewOnboarding} />
              )}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
