import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");

export default function OnboardingItem({ item }) {
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { width }]}>
      <Image source={item.image} style={styles.image} />

      <ImageBackground
        source={require("../../assets/Subtract (1).png")}
        style={styles.imageBackground}
        resizeMode="stretch"
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.6,
    height: height,
    resizeMode: "contain",
    position: "absolute",
  },
  imageBackground: {
    width: width,
    height: height * 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
    width: width * 0.9,
    paddingTop: 40,
    paddingBottom: 20,
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  curvedEdge: {
    width: width * 0.75, // Approximate aspect ratio 3/2
    height: 200,
    backgroundColor: "#40C0CB",
    borderBottomLeftRadius: 70, // Mimicking curvature
    borderBottomRightRadius: 70,
    overflow: "hidden",
  },
});
