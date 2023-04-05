import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, icons } from "../constants";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate("Onboarding1");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  // const checkIfLoggedIn = async () => {
  //   const authId = await AsyncStorage.getItem("authId");
  //   if (authId) {
  //     // User is already authenticated, navigate to home screen
  //     navigation.navigate("Home");
  //   } else {
  //     // User is not authenticated, navigate to sign up screen
  //     navigation.navigate("Onboarding1");
  //   }
  // };

  return (
    <View style={styles.container}>
      <Image source={icons.main} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
  logo: {
    width: 400,
    height: 400,
  },
});

export default SplashScreen;
