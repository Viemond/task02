import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Favorite from "../screens/Favorite";
import MyCar from "../screens/MyCar";
import Message from "../screens/Message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken, logout } from "../auth/auth";
import Login from "../components/Login";
import AnimatedButton from "../components/AnimatedButton";
import { useFonts } from "expo-font";

export default function BottomNavigation() {
  const Tab = createBottomTabNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
    } catch (error) {}
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await getToken();
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <>
          <TouchableOpacity style={styles.addButton}>
            <AnimatedButton />
          </TouchableOpacity>

          {/* <Button title="Clear onboarding (test)" onPress={clearOnboarding} />
          <Button title="Sign out (test)" onPress={signOut} /> */}

          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "#696c71",
              tabBarInactiveTintColor: "white",
              tabBarStyle: styles.tabBar,
              tabBarShowLabel: true,
            }}
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={styles.iconContainer}>
                    {focused ? (
                      <Image
                        source={require("../../assets/Home_focused.png")}
                      />
                    ) : (
                      <Image source={require("../../assets/Home.png")} />
                    )}
                  </View>
                ),
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={[
                      styles.label,
                      { color: focused ? "white" : "#696c71" },
                    ]}
                  >
                    Home
                  </Text>
                ),
              }}
            />
            <Tab.Screen
              name="Favorite"
              component={Favorite}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={[styles.iconContainer, { marginRight: 50 }]}>
                    {focused ? (
                      <Image
                        source={require("../../assets/Heart_focused.png")}
                      />
                    ) : (
                      <Image source={require("../../assets/Heart.png")} />
                    )}
                  </View>
                ),
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={[
                      styles.label,
                      { color: focused ? "white" : "#696c71" },
                      { marginRight: 50 },
                    ]}
                  >
                    Favorite
                  </Text>
                ),
              }}
            />
            <Tab.Screen
              name="My Car"
              component={MyCar}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={[styles.iconContainer, { marginLeft: 50 }]}>
                    {focused ? (
                      <Image
                        source={require("../../assets/MyCar_focused.png")}
                      />
                    ) : (
                      <Image source={require("../../assets/MyCar.png")} />
                    )}
                  </View>
                ),
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={[
                      styles.label,
                      { color: focused ? "white" : "#696c71" },
                      { marginLeft: 50 },
                    ]}
                  >
                    My Car
                  </Text>
                ),
              }}
            />
            <Tab.Screen
              name="Message"
              component={Message}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={styles.iconContainer}>
                    {focused ? (
                      <Image source={require("../../assets/Chat-bright.png")} />
                    ) : (
                      <Image source={require("../../assets/Chat.png")} />
                    )}
                  </View>
                ),
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={[
                      styles.label,
                      { color: focused ? "white" : "#696c71" },
                    ]}
                  >
                    Messages
                  </Text>
                ),
              }}
            />
          </Tab.Navigator>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 45,
    alignSelf: "center",
    width: 50,
    height: 50,
    borderRadius: 30,
    borderColor: "white",
    backgroundColor: "#b9271b",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 4,
  },
  tabBar: {
    backgroundColor: "#050a13",
    borderRadius: 25,
    height: 68,
    margin: 5,
    position: "absolute",
  },
  iconContainer: {
    width: 65,
    height: 50,
    // padding: 5,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 10,
    fontWeight: "500",
    paddingBottom: 10,
    fontFamily: "Poppins-Medium",
  },
});
