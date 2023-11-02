import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, Button } from "react-native-paper";
import Header from "../../components/Header";
import { COLORS, FONTS } from "../../constants";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const EmailScreen = ({ navigation }) => {
  const handleEmailSubmit = (values) => {
    sendEmail(values.email);
  };

  const [loading, setLoading] = useState(false);

  const sendEmail = async (email) => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://funcare-backend.vercel.app/api/auth/clientuser/sendEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      console.log(data);
      navigation.navigate("VerificationScreen", {
        userId: data.isClientUser._id,
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://t3.ftcdn.net/jpg/02/98/73/38/360_F_298733817_4721ndxzrFXWfFw3ra7vpQ3rM9Jph22c.jpg",
        }}
        style={styles.backgroundImage}
      />
      <Header />

      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleEmailSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            <Text style={{ ...FONTS.h1 }}>Enter Your Email</Text>
            <TextInput
              label="Email"
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              mode="outlined"
              theme={{ colors: { primary: COLORS.primary } }}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{ color: "white" }}>Next</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    height: "50%",
    justifyContent: "space-evenly",
    shadowColor: "#000",
  },
  input: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: COLORS.primary,
    width: "70%",
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
});

export default EmailScreen;
