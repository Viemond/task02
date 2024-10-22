import { View, Text, TouchableOpacity, Platform, Button } from "react-native";
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

export default function BottomNavigation() {
  const Tab = createBottomTabNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const styleView = (iconName, focused) => {
    return (
      <View
        style={{
          padding: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons name={iconName} />
      </View>
    );
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
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 45,
              alignSelf: "center",
              width: 60,
              height: 60,
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
            }}
          >
            {/* <MaterialIcons name="add" size={34} color="white" /> */}
          </TouchableOpacity>
          <Button title="Clear onboarding (test)" onPress={clearOnboarding} />
          <Button title="Sign out (test)" onPress={signOut} />
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "#696c71",
              tabBarInactiveTintColor: "white",
              tabBarStyle: {
                backgroundColor: "#050a13",
                borderRadius: 25,
                height: 70,
                margin: 5,
                position: "absolute",
              },
              tabBarShowLabel: false,
            }}
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{
                      width: 65,
                      height: 50,
                      padding: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="home"
                      size={34}
                      color={focused ? "white" : "#696c71"}
                    />
                  </View>
                ),
              }}
            />
            <Tab.Screen
              name="Favorite"
              component={Favorite}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{
                      width: 65,
                      height: 50,
                      padding: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 45,
                    }}
                  >
                    <MaterialIcons
                      name="favorite"
                      size={34}
                      color={focused ? "white" : "#696c71"}
                    />
                  </View>
                ),
              }}
            />

            <Tab.Screen
              name="My Car"
              component={MyCar}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{
                      width: 65,
                      height: 50,
                      padding: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 45,
                    }}
                  >
                    <MaterialIcons
                      name="directions-car"
                      size={34}
                      color={focused ? "white" : "#696c71"}
                    />
                  </View>
                ),
              }}
            />
            <Tab.Screen
              name="Message"
              component={Message}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{
                      width: 65,
                      height: 50,
                      padding: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="message"
                      size={34}
                      color={focused ? "white" : "#696c71"}
                    />
                  </View>
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