import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { firebaseConfig } from "../firebase";
import firebase from "firebase/compat/app";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { phone, verification } from "../constants/images";
import { COLORS, FONTS, SIZES } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ActivityIndicator } from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [countryCode, setCountryCode] = useState("+92");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const sendVerificationCode = () => {
    setIsLoading(true); // start loading
    const phoneProvider = new firebase.auth.PhoneAuthProvider();

    phoneProvider
      .verifyPhoneNumber(countryCode + phoneNumber, recaptchaVerifier.current)
      .then((id) => {
        setVerificationId(id);
        setErrorMessage(null);
      })
      .catch((error) => {
        setErrorMessage("Invalid Phone number! Please Try Again");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false); // end loading
      });
    setPhoneNumber("");
  };

  const verifyCode = () => {
    setIsLoading(true); // start loading
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(async (result) => {
        setVerificationCode("");
        setErrorMessage(null);
        console.log(result);
        Alert.alert("Verification Successful", "You are now signed in!");
        await AsyncStorage.setItem("authId", result.user.uid); // Save the authentication ID to storage
        dispatch({ type: "SET_USER_ID", payload: result.user.uid });
        const data = {
          firebase_id: result.user.uid,
          name: "Salman",
          email: "salman@gmail.com",
          phone: Number(result.user.phoneNumber),
          latitude: 24.8607,
          longitude: 67.0011,
          image: "salmanimage",
        };
        try {
          const response = await fetch(
            "http://starter-express-api-git-main-salman36.vercel.app/api/auth/appuser",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
          const json = await response.json();
          console.log(json);
          gotoUserProfile();
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        setErrorMessage("Invalid OTP Code! Please write Right Code...");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false); // end loading
      });
  };

  function gotoUserProfile() {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : !verificationId ? (
        <>
          <Image source={phone} style={styles.image} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                borderWidth: 1,
                padding: 5,
                borderRadius: 5,
                borderColor: COLORS.secondary,
                fontWeight: "bold",
              }}
            >
              {countryCode}
            </Text>
            <TextInput
              placeholder="3211234567"
              onChangeText={(text) => setPhoneNumber(text)}
              value={phoneNumber}
              style={styles.textInput}
              keyboardType="phone-pad"
              autoComplete="tel"
            />
          </View>

          <TouchableOpacity
            onPress={sendVerificationCode}
            style={styles.button}
          >
            <Text style={styles.text}>Send Verification Code</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Image source={verification} style={styles.image} />
          <TextInput
            placeholder="Enter verification code"
            value={verificationCode}
            onChangeText={(text) => setVerificationCode(text)}
            style={styles.textInput}
            keyboardType="number-pad"
          />
          <TouchableOpacity onPress={verifyCode} style={styles.button}>
            <Text style={styles.text}>Verify Code</Text>
          </TouchableOpacity>
        </>
      )}
      {errorMessage && <Text>{errorMessage}</Text>}
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: SIZES.height * 0.07,
    width: SIZES.width * 0.8,
    borderColor: COLORS.secondary,
    borderBottomWidth: 1,
    padding: SIZES.radius,
    margin: SIZES.radius,
    borderRadius: SIZES.radius,
    fontSize: SIZES.h3,
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: SIZES.radius,
    margin: SIZES.radius,
    borderRadius: SIZES.radius,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  text: {
    ...FONTS.h2,
  },
});
