import { useFonts } from "expo-font";
import React, { useState, useRef } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Text,
} from "react-native";

const AnimatedButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });

  const rotation = useRef(new Animated.Value(0)).current; // Rotation value
  const popupOpacity = useRef(new Animated.Value(0)).current; // Opacity for pop-up

  const toggleAnimation = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.timing(rotation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(!isOpen);
      togglePopup();
    });
  };

  const togglePopup = () => {
    if (!isPopupVisible) {
      setIsPopupVisible(true);
      Animated.timing(popupOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(popupOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsPopupVisible(false));
    }
  };

  const rotateCross1 = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "45deg"],
  });

  const rotateCross2 = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-45deg"],
  });

  const cross1Style = {
    transform: [{ rotate: rotateCross1 }],
  };

  const cross2Style = {
    transform: [{ rotate: rotateCross2 }],
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleAnimation}>
        <View style={styles.button}>
          <Animated.View style={[styles.line, cross1Style]} />
          <Animated.View style={[styles.line, cross2Style]} />
        </View>
      </TouchableWithoutFeedback>

      {isPopupVisible && (
        <Animated.View style={[styles.popup, { opacity: popupOpacity }]}>
          <Text style={styles.popupText}>Select your Ad type</Text>
          <View style={styles.adTypeContainer}>
            <Text style={styles.adTypeNormal}>Normal</Text>
            <Text style={styles.adTypeBidding}>Bidding</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    position: "absolute",
    width: 30,
    height: 3,
    backgroundColor: "white",
  },
  popup: {
    position: "absolute",
    bottom: 70,
    width: 330,
    height: 120,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    elevation: 5,
    justifyContent: "space-between",
  },
  popupText: {
    color: "black",
    marginVertical: 10,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  adTypeContainer: {
    flexDirection: "row",
    gap: 10,
  },
  adTypeNormal: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    paddingHorizontal: 40,
    paddingVertical: 8,
    marginBottom: 10,
    borderColor: "#B9271B",
    borderWidth: 1,
    borderRadius: 30,
    textAlign: "center",
    color: "#B9271B",
  },
  adTypeBidding: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    paddingHorizontal: 40,
    paddingVertical: 8,
    marginBottom: 10,
    borderColor: "#B9271B",
    borderWidth: 1,
    borderRadius: 30,
    textAlign: "center",
    color: "white",
    backgroundColor: "#B9271B",
  },
});

export default AnimatedButton;
