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
import { FirebaseAuthApplicationVerifier } from "expo-firebase-recaptcha";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { phone, verification } from "../constants/images";
import { COLORS, FONTS, SIZES } from "../constants";
const SignUpScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerificationCode = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();

    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then((id) => {
        setVerificationId(id);
        setErrorMessage(null);
      })
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
        setErrorMessage(null);
        console.log(result);
        Alert.alert("Verification Successful", "You are now signed in!");
        gotoUserProfile();
      })
      .catch((error) => {
        setErrorMessage(error.message);
        alert(error.message);
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
      {!verificationId ? (
        <>
          <Image source={phone} style={styles.image} />
          <TextInput
            placeholder="Enter phone number"
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
            style={styles.textInput}
            keyboardType="phone-pad"
            autoComplete="tel"
          />
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
    width: SIZES.width * 0.9,
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
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    ...FONTS.h2,
  },
});
