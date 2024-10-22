import React, { useRef, useState } from "react";
import {
  Animated,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Easing,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar() {
  const animation = useRef(new Animated.Value(0)).current;
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleSearchBar = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const inputWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const iconOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputContainer, { width: inputWidth }]}>
        {isExpanded && (
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={true}
          />
        )}
      </Animated.View>

      {!isExpanded && (
        <Animated.View style={{ opacity: iconOpacity, paddingRight: 8 }}>
          <TouchableOpacity onPress={toggleSearchBar}>
            <Image source={require("../../assets/Search.png")} />
          </TouchableOpacity>
        </Animated.View>
      )}

      {isExpanded && (
        <TouchableOpacity onPress={toggleSearchBar} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
  },
  input: {
    height: "100%",
    fontSize: 16,
  },
  closeButton: {
    marginLeft: 10,
  },
});
