import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { Formik } from "formik";
import { object, string } from "yup";
import { CardField, createToken, useStripe } from "@stripe/stripe-react-native";
import { Button, TextInput } from "react-native-paper";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import Modal from "react-native-modal";

const BookingScreen = ({ navigation, route }) => {
  const [cardDetails, setCardDetails] = useState(null);
  const { amount, productId } = route.params;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const fetchCardDetails = (cardDetail) => {
    if (cardDetail.complete) {
      setCardDetails(cardDetail);
    } else {
      setCardDetails(null);
    }
  };

  const onDone = async (values) => {
    console.log("Final details", {
      cardDetails,
      name: values.name,
      email: values.email,
    });

    if (cardDetails) {
      try {
        setLoading(true);
        const resToken = await createToken({ ...cardDetails, type: "Card" });
        console.log("this is token", resToken.token);

        const res = await fetch(
          `http://starter-express-api-git-main-salman36.vercel.app/api/auth/payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: amount,
              stripeEmail: values.email,
              stripeToken: resToken,
              name: values.name,
            }),
          }
        );

        const data = await res.json();
        console.log("Response from server", data);

        if (data.message === "success") {
          setShowModal(true); // Show the payment done modal
          setTimeout(() => {
            setShowModal(false); // Hide the modal after 3 seconds
            updateDetails();
          }, 3000);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const updateDetails = async () => {
    console.log(productId, amount);
    try {
      const res = await fetch(
        `http://starter-express-api-git-main-salman36.vercel.app/api/auth/playland/update/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log("Response from server", data);
      dispatch({ type: "SET_BOOKING_REQUEST_FLAG", payload: true });
      setLoading(false);
      navigation.navigate("MyBookings");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const validationSchema = object().shape({
    name: string().required("Name is required"),
    email: string().email("Invalid email").required("Email is required"),
  });

  return (
    <View style={styles.container}>
      <Header />
      <Text style={{ ...FONTS.h1, marginTop: 100 }}>Pay with Card</Text>

      <Formik
        initialValues={{ name: "", email: "" }}
        onSubmit={onDone}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <Text style={{ ...FONTS.body3, marginTop: 10 }}>
              Enter your Name:
            </Text>
            <TextInput
              style={[
                styles.input,
                touched.name && errors.name && styles.error,
              ]}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorMessage}>{errors.name}</Text>
            )}

            <Text style={{ ...FONTS.body3, marginTop: 10 }}>
              Enter your Email:
            </Text>
            <TextInput
              style={[
                styles.input,
                touched.email && errors.email && styles.error,
              ]}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorMessage}>{errors.email}</Text>
            )}

            <Text style={{ ...FONTS.body3, marginTop: 10 }}>
              Safe money transfer using your bank account. Visa, Maestro,
              Discover, American Express.
            </Text>
            <Text style={{ ...FONTS.body3, marginTop: 10 }}>
              Enter your card details to make payment
            </Text>

            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: "4242 4242 4242 4242",
              }}
              cardStyle={{
                backgroundColor: COLORS.white,
                textColor: COLORS.black,
              }}
              style={styles.cardField}
              onCardChange={(cardDetails) => {
                fetchCardDetails(cardDetails);
              }}
              onFocus={(focusedField) => {
                console.log("focusField", focusedField);
              }}
            />
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: cardDetails ? COLORS.primary : COLORS.gray,
                  },
                ]}
                disabled={!cardDetails}
                onPress={handleSubmit}
              >
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                  Confirm Payment
                </Text>
              </TouchableOpacity>
            )}

            {/* Payment done modal */}
            <Modal isVisible={showModal}>
              <View style={styles.modalContainer}>
                <Image source={icons.tick} style={styles.modalIcon} />
                <Text style={styles.modalText}>Payment Done</Text>
              </View>
            </Modal>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding,
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.radius,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: COLORS.white,
  },
  error: {
    borderColor: "red",
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  cardField: {
    width: "100%",
    height: 50,
    marginVertical: 30,
    backgroundColor: COLORS.white,
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.radius,
    marginTop: 20,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: SIZES.radius,
    alignItems: "center",
    alignSelf: "center",
    width: 350,
    height: 300,
  },
  modalText: {
    ...FONTS.h1,
    color: COLORS.black,
  },
  modalIcon: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});

export default BookingScreen;
