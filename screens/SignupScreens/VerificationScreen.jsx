import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const VerificationScreen = ({ navigation }) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleNext = () => {
    // Validation and navigation logic
    navigation.navigate("UserNameImageScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter verification code:</Text>
      <TextInput
        placeholder="Verification Code"
        value={verificationCode}
        onChangeText={setVerificationCode}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={handleNext} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 20,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default VerificationScreen;
