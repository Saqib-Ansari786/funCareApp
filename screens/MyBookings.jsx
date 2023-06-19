import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BookingScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("pending");
  const { userId } = useSelector((state) => state.user);
  const [bookingPlaylands, setBookingPlaylands] = useState([]);
  const [loading, setLoading] = useState(true);
  const { bookingRequest } = useSelector((state) => state.request);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getBookingPlaylands() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://starter-express-api-git-main-salman36.vercel.app/api/auth/userbooking/${userId}`
        );
        const responseData = await response.json();
        setBookingPlaylands(responseData.userbooking);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }

    getBookingPlaylands();

    dispatch({ type: "SET_BOOKING_REQUEST_FLAG", payload: false });
  }, [bookingRequest === true]);

  const handlePayment = (productId, amount) => {
    // Implement payment logic here

    console.log(productId, amount);

    navigation.navigate("Cashpayment", {
      productId,
      amount,
    });
  };

  const pendingBookings = bookingPlaylands.filter(
    (booking) => booking.bookingstatus === "pending"
  );
  const confirmedBookings = bookingPlaylands.filter(
    (booking) => booking.bookingstatus === "confirmed"
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "pending" && styles.activeTab,
              ]}
              onPress={() => setSelectedTab("pending")}
            >
              <Text style={styles.tabText}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "confirmed" && styles.activeTab,
              ]}
              onPress={() => setSelectedTab("confirmed")}
            >
              <Text style={styles.tabText}>Confirmed</Text>
            </TouchableOpacity>
          </View>
          {selectedTab === "pending" ? (
            <ScrollView>
              {pendingBookings.map((booking) => (
                <View key={booking._id} style={styles.bookingCard}>
                  <Text style={styles.bookingTitle}>
                    {booking.appplayland_id}
                  </Text>
                  <Text
                    style={styles.bookingDescription}
                  >{`Amount: Rs.${booking.amount}`}</Text>
                  <Text style={styles.bookingStatus}>
                    {booking.bookingstatus}
                  </Text>
                  <TouchableOpacity
                    style={styles.payButton}
                    onPress={() => handlePayment(booking._id, booking.amount)}
                  >
                    <Text style={styles.payButtonText}>Pay</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          ) : (
            <ScrollView>
              {confirmedBookings.map((booking) => (
                <View key={booking._id} style={styles.bookingCard}>
                  <Text style={styles.bookingTitle}>
                    {booking.appplayland_id}
                  </Text>
                  <Text
                    style={styles.bookingDescription}
                  >{`Amount: Rs.${booking.amount}`}</Text>
                  <Text style={styles.bookingStatus}>
                    {booking.bookingstatus}
                  </Text>
                  <Text style={styles.confirmedText}>Confirmed</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
  activeTab: {
    borderBottomColor: "#000",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "bold",
  },
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
});

export default BookingScreen;
