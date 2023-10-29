import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, Button } from "react-native-paper";
import Header from "../../components/Header";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const EmailScreen = ({ navigation }) => {
  const handleEmailSubmit = (values) => {
    // You can add your email handling logic here.
    // For example, sending the email to a server for verification.

    // After email verification, navigate to the VerificationScreen.
    navigation.navigate("VerificationScreen");
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
            <TextInput
              label="Email"
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <Button style={styles.button} onPress={handleSubmit}>
              Next
            </Button>
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
  },
  input: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "white",
  },
  button: {
    width: "100%",
    marginVertical: 20,
    padding: 10,
  },
  errorText: {
    color: "red",
  },
});

export default EmailScreen;
