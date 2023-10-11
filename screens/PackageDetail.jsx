import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS } from "../constants";
import Header from "../components/Header";

const PackageDetailScreen = ({ navigation }) => {
  const packageData = {
    title: "Luxury Vacation Package",
    description:
      "Discover the beauty of a paradise island with our exclusive luxury vacation package. Enjoy breathtaking views, exquisite cuisine, and top-notch accommodations.",
    price: "Rs.999", // Add the package price
    discount: "Rs.200 off", // Add the discount information
  };

  return (
    <ImageBackground
      source={{
        uri: "https://ryerecord.com/wp-content/uploads/2019/08/paying-for-playland.jpg",
      }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Header />

        <Text style={styles.title}>{packageData.title}</Text>
        <Text style={styles.description}>{packageData.description}</Text>

        {/* Display the price */}
        <Text style={styles.priceText}>Price: {packageData.price}</Text>
        {/* Display the discount */}
        <Text style={styles.discountText}>
          Discount: {packageData.discount}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("BookingConfirmation")}
          style={styles.button}
        >
          <Text style={{ color: "white", ...FONTS.body2, textAlign: "center" }}>
            Confirm Booking
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 20,
  },
  title: {
    ...FONTS.h1,
    marginBottom: 20,
    marginTop: 70,
  },
  description: {
    marginBottom: 30,
    letterSpacing: 2,
    ...FONTS.body2,
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 20,
  },
  priceText: {
    ...FONTS.h2,
    marginTop: 10,
    backgroundColor: COLORS.white,
    padding: 10,
  },
  discountText: {
    ...FONTS.body3,
    marginTop: 10,
    backgroundColor: COLORS.white,
    padding: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    color: "white",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    fontSize: 18,
    marginTop: 70,
  },
});

export default PackageDetailScreen;
