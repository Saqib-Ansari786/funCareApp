import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

export default function BookingBox({ booking }) {
  const [numSeats, setNumSeats] = useState(1);
  const [updateMode, setUpdateMode] = useState(false); // Add this state
  const [amount, setAmount] = useState(booking.amount); // Add this state

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

  const handleUpdateSeats = async (productId, amount, numSeats) => {
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
    setAmount(booking.amount * numSeats); // Update amount
  }, [numSeats]);

  return (
    <View key={booking._id} style={styles.bookingCard}>
      <Text style={styles.bookingTitle}>{booking.appplayland_id}</Text>
      <Text style={styles.bookingTitle}>{booking._id}</Text>
      <Text
        style={styles.bookingDescription}
      >{`Amount: Rs.${booking.amount} x ${numSeats} = ${amount}`}</Text>
      <Text style={styles.bookingDescription}>
        Status: {booking.bookingstatus}
      </Text>
      <Text style={styles.bookingDescription}>
        Selected Package: {booking.bookingstatus}
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
          <Text style={styles.numSeats}>{numSeats}</Text>
          <TouchableOpacity onPress={handleDecreaseSeats}>
            <Text style={styles.controlButton}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={updateMode ? styles.updateButton : styles.payButton}
        onPress={() => handlePayment(booking._id, booking.amount)}
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
