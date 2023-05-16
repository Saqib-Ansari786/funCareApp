import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../constants";
import Header from "../components/Header";

const BookingScreen = ({ navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  const handlePayment = () => {
    if (paymentMethod === "cash") {
      // Handle cash payment
      console.log("Processing cash payment...");
    } else if (paymentMethod === "creditCard") {
      // Handle credit card payment
      console.log("Processing credit card payment...");
    }

    // Redirect to success screen
    navigation.navigate("MyBookings");
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Payment Method</Text>
      <Text style={styles.subTitle}>Select your payment method</Text>

      <TouchableOpacity
        style={[
          styles.paymentMethodButton,
          paymentMethod === "cash" && { backgroundColor: COLORS.primary },
        ]}
        onPress={() => setPaymentMethod("cash")}
      >
        <AntDesign name="wallet" size={24} color={COLORS.white} />
        <Text
          style={[
            styles.paymentMethodButtonText,
            paymentMethod === "cash" && { color: COLORS.white },
          ]}
        >
          Cash
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.paymentMethodButton,
          paymentMethod === "creditCard" && { backgroundColor: COLORS.primary },
        ]}
        onPress={() => setPaymentMethod("creditCard")}
      >
        <MaterialIcons name="credit-card" size={24} color={COLORS.white} />
        <Text
          style={[
            styles.paymentMethodButtonText,
            paymentMethod === "creditCard" && { color: COLORS.white },
          ]}
        >
          Credit Card
        </Text>
      </TouchableOpacity>

      {paymentMethod === "creditCard" && (
        <View>
          <Text style={styles.subTitle}>Credit Card Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={(text) => setCardNumber(text)}
          />
          <TextInput
            style={[styles.input]}
            placeholder="Expiry Date"
            value={cardExpiry}
            onChangeText={(text) => setCardExpiry(text)}
          />
          <TextInput
            style={[styles.input]}
            placeholder="CVC"
            value={cardCVC}
            onChangeText={(text) => setCardCVC(text)}
          />
        </View>
      )}

      <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SIZES.padding,
  },
  title: {
    ...FONTS.h2,
    marginBottom: SIZES.padding,
    marginTop: 90,
  },
  subTitle: {
    ...FONTS.h3,
    marginBottom: SIZES.body1,
  },
  paymentMethodButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: COLORS.lightGray2,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
  },
  paymentMethodButtonText: {
    ...FONTS.body2,
    marginLeft: SIZES.base,
  },
  input: {
    width: 200,
    height: 50,
    backgroundColor: COLORS.lightGray2,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.body1,
    ...FONTS.body3,
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
  },
  confirmButton: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SIZES.padding,
  },
  confirmButtonText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
});

export default BookingScreen;
