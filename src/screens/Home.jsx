import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  FlatList,
} from "react-native";
import React, { useRef } from "react";
import SearchBar from "../components/SearchBar";
import { useFonts } from "expo-font";
import brands from "../module/brands";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import engines from "../module/engines";
import EngineList from "../components/EngineList";

const { width: screenWidth, height } = Dimensions.get("window");
const ITEM_SIZE = screenWidth / 4;
const originalWidth = 335;
const originalHeight = 161;
const aspectRatio = originalWidth / originalHeight;
const scaledWidth = screenWidth * 0.9;
const scaledHeight = scaledWidth / aspectRatio;

export default function Home() {
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });

  const renderBrandItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.brandCircle}>
        <Image source={item.icon} style={styles.brandIcon} />
      </View>
      <Text style={styles.brandName}>{item.name}</Text>
    </TouchableOpacity>
  );

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

      <View style={styles.coverContainer}>
        <ImageBackground
          style={styles.coverImg}
          source={require("../../assets/Cover.png")}
        >
          <Text style={styles.textCover}>Find All Parts Now!</Text>
        </ImageBackground>
      </View>

      <View style={styles.aboveBrandsContainer}>
        <Text style={styles.searchByBrand}>Search by Brands</Text>
        <TouchableOpacity style={styles.expandAllContainer}>
          <Text style={styles.seeAll}>See all</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={12}
            color="#A3A2A3"
            style={{ marginBottom: 3 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.brandsContainer}>
        <FlatList
          data={brands}
          renderItem={renderBrandItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <View>
        <FlatList
          data={engines}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <EngineList engine={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: height,
    paddingVertical: 10,
  },
  upperContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: height * 0.08,
  },
  coverContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  coverImg: {
    width: scaledWidth,
    height: scaledHeight,
    resizeMode: "contain",
  },
  textCover: {
    fontWeight: "500",
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: "white",
    paddingTop: 30,
    paddingLeft: 15,
  },
  brandsContainer: {
    alignItems: "center",
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 15,
  },
  brandItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  brandCircle: {
    width: 71,
    height: 71,
    borderRadius: 40,
    backgroundColor: "#f6f6f6",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  brandIcon: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#f6f6f6",
    resizeMode: "contain",
  },
  brandName: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "#14151A",
    fontFamily: "Poppins-Medium",
    marginTop: 5,
  },
  aboveBrandsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  searchByBrand: {
    color: "#14151A",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    marginRight: "auto",
    marginLeft: 15,
  },
  seeAll: {
    color: "#FF0000",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    marginLeft: "auto",
  },
  expandAllContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    gap: 5,
  },
});
