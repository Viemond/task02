import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";

export default function useGlobalFonts() {
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });

  return fontsLoaded;
}

export const globalStyles = StyleSheet.create({
  textPoppinsMedium: {
    fontFamily: "Poppins-Medium",
  },
});
