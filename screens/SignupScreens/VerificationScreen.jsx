import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Header from "../../components/Header";
import { COLORS, FONTS } from "../../constants";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const handleBackspace = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index !== 0) {
      inputRefs[index - 1].current.focus();
    }
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
          keyboardType="number-pad"
          onKeyPress={(e) => handleBackspace(e, index)}
        />
      ))}
    </View>
  );
};

const VerificationScreen = ({ navigation, route }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { userId } = route.params;
  const dispatch = useDispatch();

  const handleVerification = () => {
    console.log("Verification code: ", verificationCode);
    postVerificationCode(verificationCode);
  };

  const postVerificationCode = async (code) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://funcare-backend.vercel.app/api/auth/clientuser/verifyEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ verification_code: code, userId }),
        }
      );
      const data = await response.json();
      console.log(data.clientUser._id);
      dispatch({ type: "SET_USER_ID", payload: data.clientUser._id });
      await AsyncStorage.setItem("authId", data.clientUser._id);
      navigation.navigate("UserNameImageScreen", {
        userId,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
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
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{ color: "#fff", ...FONTS.h3 }}>Verify</Text>
          )}
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
    backgroundColor: "lightgrey",
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
