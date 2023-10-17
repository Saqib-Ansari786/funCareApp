import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function BookingBox({ booking, navigation }) {
  const [numSeats, setNumSeats] = useState(booking.seats || "1");
  const [updateMode, setUpdateMode] = useState(false); // Add this state
  const [amount, setAmount] = useState(
    (booking.price - (booking.price * booking.discount) / 100) * numSeats
  ); // Add this state

  const handleIncreaseSeats = () => {
    setNumSeats(numSeats + 1);
    setUpdateMode(true); // Enable update mode
  };

  const handleDecreaseSeats = () => {
    if (numSeats > 1) {
      setNumSeats(numSeats - 1);
      setUpdateMode(true); // Enable update mode
    }
  };

  const handleUpdateSeats = async (booking_id, numSeats) => {
    try {
      setUpdateMode(false); // Disable update mode
      alert("Seats updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = (productId, amount) => {
    if (updateMode) {
      handleUpdateSeats(productId, amount, numSeats); // Call update function
    } else {
      console.log(productId, amount);
      navigation.navigate("Cashpayment", {
        productId,
        amount,
      });
    }
  };

  useEffect(() => {
    setAmount(
      (booking.price - (booking.price * booking.discount) / 100) * numSeats
    ); // Update amount
  }, [numSeats]);

  return (
    <View key={booking._id} style={styles.bookingCard}>
      <Text style={styles.bookingTitle}>{booking.playland_name}</Text>
      <Text style={styles.bookingDescription}>
        Date: {booking.date_selected}
      </Text>
      <Text style={styles.bookingDescription}>
        Timing: {booking.timing_selected}
      </Text>
      <Text style={styles.bookingDescription}>Total Amount: {amount}</Text>
      <Text style={styles.bookingDescription}>
        Status: {booking.paymentstatus}
      </Text>
      <Text style={styles.bookingDescription}>
        Selected Package: {booking.packages_selected}
      </Text>
      <View style={styles.seatControl}>
        <Text style={styles.bookingStatus}>Number of seats:</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleIncreaseSeats}>
            <Text style={styles.controlButton}>+</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.numSeats}
            onChangeText={setNumSeats}
            value={numSeats.toString()}
          />

          <TouchableOpacity onPress={handleDecreaseSeats}>
            <Text style={styles.controlButton}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={updateMode ? styles.updateButton : styles.payButton}
        onPress={() => handlePayment(booking._id, amount)}
      >
        <Text style={styles.payButtonText}>
          {updateMode ? "Update" : "Pay"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bookingCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  bookingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bookingDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  bookingStatus: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  payButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  payButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  confirmedText: {
    color: "green",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  seatControl: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  controlButton: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  numSeats: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
});
