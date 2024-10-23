import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";

const { width: screenWidth, height } = Dimensions.get("window");

export default function EngineList({ engine }) {
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });

  return (
    <>
      <View style={styles.premiumAdContainer}>
        <Text style={styles.premiumAdText}>Premium Ad</Text>
      </View>
      <TouchableOpacity style={styles.cardContainer}>
        <View>
          <Image source={engine.image} style={styles.engineImage} />
        </View>
        <View>
          <View style={styles.rowContainer}>
            <Image source={require("../../assets/Flag.png")} />
            <Text style={styles.forSaleText}>FOR SALE</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.engineName}>
              {engine.name.length > 19
                ? `${engine.name.substring(0, 19)}...`
                : engine.name}
            </Text>
            <Text style={styles.locationText}>Hawalli, Kuwait</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceValue}>{engine.price}</Text>
              <Image source={require("../../assets/Delivery.png")} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  premiumAdContainer: {
    position: "absolute",
    top: -5,
    right: 50,
    alignSelf: "center",
    width: 120,
    height: 35,
    borderRadius: 30,
    backgroundColor: "#b9271b",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderWidth: 5,
    borderColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  premiumAdText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  cardContainer: {
    flexDirection: "row",
    width: screenWidth * 0.65,
    height: height * 0.14,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#061023",
    marginTop: 10,
  },
  engineImage: {
    marginLeft: 15,
    resizeMode: "contain",
  },
  rowContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginHorizontal: 10,
  },
  forSaleText: {
    fontWeight: "500",
    fontSize: 8,
    fontFamily: "Poppins-Medium",
    color: "#36393D",
    backgroundColor: "#f0f2f5",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  detailsContainer: {
    marginHorizontal: 10,
  },
  engineName: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    fontWeight: "500",
    color: "black",
  },
  locationText: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    fontWeight: "500",
    color: "#6F767D",
  },
  priceContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  priceLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    fontWeight: "500",
    color: "#5B6066",
  },
  priceValue: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    fontWeight: "500",
    color: "black",
  },
});
