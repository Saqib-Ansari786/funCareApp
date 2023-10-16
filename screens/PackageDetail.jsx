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

const PackageDetailScreen = ({ navigation, route }) => {
  const { package_name, price, discount, discription, playlandId } =
    route.params.item;

  return (
    <ImageBackground
      source={{
        uri: "https://ryerecord.com/wp-content/uploads/2019/08/paying-for-playland.jpg",
      }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Header />

        <Text style={styles.title}>{package_name}</Text>
        <Text style={styles.description}>{discription}</Text>

        {/* Display the price */}
        <Text style={styles.priceText}>Price: {price}</Text>
        {/* Display the discount */}
        <Text style={styles.discountText}>Discount: {discount}</Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("BookingConfirmation", {
              item: route.params.item,
            })
          }
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
