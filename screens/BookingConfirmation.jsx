import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS } from "../constants";
import Header from "../components/Header";

const BookingScreen = ({ navigation }) => {
  const [selectedPackage, setSelectedPackage] = useState({
    name: "Luxury Vacation Package",
    price: "Rs.999",
    discount: "Rs.200 off",
  });
  const [playlandName, setPlaylandName] = useState("Playland Name");
  const [playlandTimings, setPlaylandTimings] = useState("9:00 AM - 5:00 PM");
  const [seats, setSeats] = useState("");

  const handleBooking = () => {
    // Handle the booking logic here, e.g., send data to a server or perform any necessary action
    // You can customize this function to match your booking process
    // For this example, we'll just navigate back to the PackageDetail screen.
    if (seats === "" || seats === "0") {
      alert("Please enter the number of seats to reserve");
      return;
    }
    navigation.navigate("MyBookings");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <Text style={styles.title}>Booking Details</Text>

      <Text style={styles.playlandName}>Playland: {playlandName}</Text>
      <Text style={styles.timings}>Timings: {playlandTimings}</Text>

      <Text style={styles.packageDetails}>Selected Package:</Text>
      <Text style={styles.packageName}>{selectedPackage.name}</Text>
      <Text style={styles.packagePrice}>Price: {selectedPackage.price}</Text>
      <Text style={styles.packageDiscount}>
        Discount: {selectedPackage.discount}
      </Text>

      <Text style={styles.inputLabel}>Number of Seats to Reserve:</Text>
      <TextInput
        style={styles.input}
        value={seats}
        onChangeText={(text) => setSeats(text)}
        placeholder="Enter the number of seats"
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={handleBooking} style={styles.button}>
        <Text
          style={{ ...FONTS.body2, color: COLORS.white, textAlign: "center" }}
        >
          Book Now
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 20,
  },
  title: {
    ...FONTS.h1,
    marginBottom: 20,
    marginTop: 80,
  },
  playlandName: {
    ...FONTS.h2,
    marginBottom: 10,
  },
  timings: {
    ...FONTS.body3,
    marginBottom: 20,
  },
  packageDetails: {
    ...FONTS.h2,
    marginBottom: 10,
    marginTop: 50,
  },
  packageName: {
    ...FONTS.body2,
    marginBottom: 5,
  },
  packagePrice: {
    ...FONTS.body3,
    marginBottom: 5,
  },
  packageDiscount: {
    ...FONTS.body4,
    marginBottom: 20,
  },
  inputLabel: {
    ...FONTS.body2,
    marginBottom: 5,
    marginTop: 50,
  },
  input: {
    ...FONTS.body2,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    color: "white",
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
  },
});

export default BookingScreen;
