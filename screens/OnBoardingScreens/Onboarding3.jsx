import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Onboarding3() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Onboarding1");
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hye Buddy!</Text>
      <Text style={styles.subtext}>
        We are currently active only in Lahore City
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  subtext: {
    color: "white",
    fontSize: 20,
    fontStyle: "italic",
  },
});
