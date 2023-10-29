import React, { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { COLORS, FONTS } from "../../constants";
import { TouchableOpacity } from "react-native";

const VerificationCodeInput = ({ value, onChangeText }) => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleInput = (text, index) => {
    if (text.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }

    const updatedValue = value.split("");
    updatedValue[index] = text;
    onChangeText(updatedValue.join(""));
  };

  return (
    <View style={styles.verificationCodeContainer}>
      {inputRefs.map((ref, index) => (
        <TextInput
          key={index}
          style={styles.verificationCodeInput}
          onChangeText={(text) => handleInput(text, index)}
          value={value[index]}
          ref={ref}
          maxLength={1}
        />
      ))}
    </View>
  );
};

const VerificationScreen = ({ navigation }) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerification = () => {
    console.log("Verification code: ", verificationCode);
    navigation.navigate("UserNameImageScreen");
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.verificationContainer}>
        <Text style={{ ...FONTS.h1 }}>Email Verification</Text>
        <Text>
          We've sent a verification code to your email. Please check your inbox
          and enter the code below to verify your email address.
        </Text>

        <VerificationCodeInput
          value={verificationCode}
          onChangeText={setVerificationCode}
        />

        <TouchableOpacity style={styles.button} onPress={handleVerification}>
          <Text style={{ color: "white" }}>Verify Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  verificationContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    height: "70%",
  },
  verificationCodeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  verificationCodeInput: {
    width: "20%",
    height: 50,
    backgroundColor: "white",
    margin: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: COLORS.primary,
    width: "70%",
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VerificationScreen;
