import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useRef } from "react";
import SearchBar from "../components/SearchBar";

const { width, height } = Dimensions.get("window");

export default function Home() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.upperContainer}
        source={require("../../assets/Frame 19.png")}
        resizeMode="stretch"
      >
        <Image source={require("../../assets/ProfilePic.png")} />
        <Image source={require("../../assets/Small_Logo.png")} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SearchBar />
          <TouchableOpacity>
            <Image source={require("../../assets/Notification.png")} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: height * 0.08,
    padding: 10,
  },
  upperContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: height * 0.08,
  },
});
