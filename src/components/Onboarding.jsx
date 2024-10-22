import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useRef, useState } from "react";
import slides from "../module/slides";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

const { width, height } = Dimensions.get("window");

export default function Onboarding({ setOnboarding }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);
  const navigation = useNavigation();
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem("@viewedOnboarding", "true");
      setOnboarding(true);
      navigation.replace("Navigation");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.skipButton}
        onPress={handleSkip}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
      <View style={styles.flatListContainer}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
        />
      </View>
      <ImageBackground
        source={require("../../assets/Subtract (1).png")}
        style={styles.imageBackground}
      >
        <Paginator data={slides} scrollX={scrollX} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f8f8",
  },
  skipButton: {
    paddingTop: 15,
    paddingRight: 30,
    zIndex: 1,
    marginLeft: "auto",
  },
  skipButtonText: {
    color: "#061023",
    fontSize: 16,
    fontWeight: "medium",
    fontFamily: "Poppins-Medium",
  },
  flatListContainer: {
    flex: 3,
  },
  imageBackground: {
    width: width,
    alignItems: "center",
  },
});
