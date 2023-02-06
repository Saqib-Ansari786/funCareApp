import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { firebaseConfig } from "../firebase";
import firebase from "firebase/compat/app";
import { FirebaseAuthApplicationVerifier } from "expo-firebase-recaptcha";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
const SignUpScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerificationCode = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();

    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId)
      .catch((error) => {
        setErrorMessage(error.message);
      });
    setPhoneNumber("");
  };

  const verifyCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        setVerificationCode("");
        console.log(result);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        alert(error.message);
      });

    Alert.alert("Verification Successful", "You are now signed in!");
  };

  return (
    <View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <TextInput
        placeholder="Enter phone number"
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
        style={styles.textInput}
        keyboardType="phone-pad"
        autoComplete="tel"
      />
      <TouchableOpacity onPress={sendVerificationCode} style={styles.button}>
        <Text>Send Verification Code</Text>
      </TouchableOpacity>
      {verificationId && (
        <>
          <TextInput
            placeholder="Enter verification code"
            value={verificationCode}
            onChangeText={(text) => setVerificationCode(text)}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={verifyCode} style={styles.button}>
            <Text>Verify Code</Text>
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
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10,
  },
});
