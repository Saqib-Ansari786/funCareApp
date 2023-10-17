import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONTS } from "../constants";
import Header from "../components/Header";
import DropDown from "react-native-paper-dropdown";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";

const BookingScreen = ({ navigation, route }) => {
  const { package_name, price, discount, discription, playlandId, _id } =
    route.params.item;

  const playLand = useSelector((state) => state.playland);
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const selected_playland = playLand.playland.find(
    (item) => item._id === playlandId
  );
  const { timing1, timing2, timing3, playland_name } = selected_playland;

  const [seats, setSeats] = useState("1");
  const [selectedTiming, setSelectedTiming] = useState(timing1.timing);
  const timings = [
    { label: timing1.timing, value: timing1.timing },
    { label: timing2.timing, value: timing2.timing },
    { label: timing3.timing, value: timing3.timing },
  ];
  const [showDropDown, setShowDropDown] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(
    price - price * (discount / 100) * seats
  );
  const [loading, setLoading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const handleBooking = async () => {
    // Handle the booking logic here, e.g., send data to a server or perform any necessary action
    // You can customize this function to match your booking process
    // For this example, we'll just navigate back to the PackageDetail screen.
    if (seats === "" || seats === "0") {
      alert("Please enter the number of seats to reserve");
      return;
    }
    const bookingData = {
      appuser_id: userId,
      appplayland_id: playlandId,
      playland_name,
      price,
      discount,
      seats,
      date_selected: date.toLocaleDateString(),
      timing_selected: selectedTiming,
      packages_selected: package_name,
      method: "card",
      paymentstatus: "pending",
      bookingstatus: "pending",
    };

    console.log(bookingData);

    try {
      setLoading(true);
      const response = await fetch(
        "https://funcare-backend.vercel.app/api/auth/businessbookinguser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert("Booking Successful");
        dispatch({ type: "SET_BOOKING_REQUEST_FLAG", payload: true });
        setLoading(false);
        navigation.navigate("MyBookings");
      } else {
        alert("Booking Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <Text style={styles.title}>Booking Details</Text>

      <Text style={styles.playlandName}>Playland: {playland_name}</Text>

      <Text style={styles.packageDetails}>Selected Package:</Text>
      <Text style={styles.packageName}>{package_name}</Text>
      <Text style={styles.packagePrice}>Price: {price}</Text>
      <Text style={styles.packageDiscount}>Discount: {discount}</Text>
      <DropDown
        label={"Select a Timing"}
        mode={"outlined"}
        value={selectedTiming}
        setValue={setSelectedTiming}
        list={timings}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        dropDownItemStyle={{ backgroundColor: COLORS.white }}
      />
      <Text style={styles.inputLabel}>Select a Date:</Text>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
        <Text style={{ ...FONTS.body2 }}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="calendar"
          onChange={onChange}
        />
      )}
      <Text style={styles.inputLabel}>Number of Seats to Reserve:</Text>
      <TextInput
        style={styles.input}
        value={seats}
        onChangeText={(text) => {
          setSeats(text);
          setAmount((price - price * (discount / 100)) * text);
        }}
        placeholder="Enter the number of seats"
        keyboardType="numeric"
      />
      <Text style={styles.inputLabel}>Total Amount:</Text>
      <TextInput
        style={styles.input}
        value={amount.toString()}
        editable={false}
      />

      <TouchableOpacity onPress={handleBooking} style={styles.button}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text
            style={{ ...FONTS.body2, color: COLORS.white, textAlign: "center" }}
          >
            Book Now
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    padding: 20,
    flexGrow: 1,
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
    marginBottom: 40,
  },
  inputLabel: {
    ...FONTS.body2,
    marginBottom: 5,
    marginTop: 30,
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
    marginTop: 20,
  },
});

export default BookingScreen;
