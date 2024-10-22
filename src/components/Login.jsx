import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { login } from "../auth/auth";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  const [token, setToken] = useState("");
  const [inputType, setInputType] = useState("phone");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
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

  const handleLogin = async () => {
    await login(token);
    navigation.replace("Navigation");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.container, { width: width }]}>
          <TouchableOpacity style={styles.skipButtonContainer}>
            <Text style={styles.skipButton}>Skip</Text>
          </TouchableOpacity>
          <Image
            source={require("../../assets/Isolation_Mode.png")}
            style={styles.image}
          />
          <View style={[styles.grayContainer, { width: width * 0.6 }]}>
            <TouchableOpacity onPress={() => setInputType("phone")}>
              <Text
                style={[
                  inputType === "phone"
                    ? styles.activeButton
                    : styles.inactiveButton,
                  { width: width * 0.4 },
                ]}
              >
                Phone number
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setInputType("email")}>
              <Text
                style={[
                  inputType === "email"
                    ? styles.activeButton
                    : styles.inactiveButton,
                  { width: width * 0.4 },
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>
          </View>

          {inputType === "phone" ? (
            <View>
              <Text style={styles.inputLabel}>Phone number</Text>
              <TextInput
                style={[
                  styles.inputContainer,
                  { width: width * 0.8, height: height * 0.06 },
                ]}
                placeholder="Enter phone number"
                value={token}
                onChangeText={setToken}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.inputLabel}>E-mail</Text>
              <TextInput
                style={[
                  styles.inputContainer,
                  { width: width * 0.8, height: height * 0.06 },
                ]}
                placeholder="Enter e-mail"
                value={email}
                onChangeText={setEmail}
              />
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={[
                  styles.inputContainer,
                  { width: width * 0.8, height: height * 0.06 },
                ]}
                placeholder="Enter password"
                value={token}
                onChangeText={setToken}
              />
            </View>
          )}

          <TouchableOpacity onPress={handleLogin}>
            <Text style={[styles.signIn, { width: width * 0.8 }]}>Sign in</Text>
          </TouchableOpacity>

          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.textLine}>Or sign in with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.signMethodsContainer}>
            <View style={styles.appleGoogle}>
              <Image
                resizeMethod="resize"
                source={require("../../assets/Apple.png")}
              />
            </View>
            <View style={styles.appleGoogle}>
              <Image
                resizeMethod="resize"
                source={require("../../assets/Google.png")}
              />
            </View>
          </View>

          <View style={styles.haveAnAccount}>
            <Text style={styles.accountText}>Already have an account?</Text>
            <Text style={styles.signUpText}>Sign up</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    gap: 10,
  },
  inputLabel: {
    padding: 4,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  input: {
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginVertical: 10,
  },
  image: {
    marginVertical: 30,
  },
  skipButtonContainer: { marginLeft: "auto" },
  skipButton: {
    fontSize: 16,
    fontWeight: "500",
    paddingRight: 20,
    paddingTop: 20,
  },
  grayContainer: {
    borderRadius: 70,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  inputContainer: {
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    padding: 10,
    fontFamily: "Poppins-Medium",
    color: "#A3A2A3",
  },
  activeButton: {
    backgroundColor: "#b9271b",
    color: "white",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 70,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  inactiveButton: {
    backgroundColor: "#f5f5f5",
    color: "black",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 70,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  signIn: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    backgroundColor: "#b9271b",
    textAlign: "center",
    padding: 10,
    borderRadius: 70,
    marginTop: 10,
    fontFamily: "Poppins-Medium",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  line: {
    flex: 0.2,
    height: 1,
    backgroundColor: "#DBDBDB",
    marginHorizontal: 10,
  },
  textLine: {
    color: "#a3a2a3",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  signMethodsContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  appleGoogle: {
    alignSelf: "center",
    borderRadius: 60,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f6f6f6",
  },
  haveAnAccount: {
    marginBottom: 10,
    flexDirection: "row",
    gap: 5,
  },
  accountText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  signUpText: {
    fontSize: 12,
    fontWeight: "500",
    textDecorationLine: "underline",
    color: "#B9271B",
    fontFamily: "Poppins-Medium",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
