import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
  } catch (error) {
    console.log(error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("userToken");
  } catch (error) {
    console.log(error);
  }
};
