import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import { useState } from "react";
import { Linking } from "react-native";

const IconLabel = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
      <Image
        source={icon}
        resizeMode="cover"
        style={{
          width: 50,
          height: 50,
        }}
      />
      <Text
        style={{ marginTop: SIZES.padding, color: COLORS.gray, ...FONTS.h3 }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const DestinationDetail = ({ route, navigation }) => {
  // Render

  const {
    name,
    description,
    discount,
    price,
    time_open,
    time_close,
    playlandId,
    location,
    path_url,
  } = route.params;
  const userId = useSelector((state) => state.user.userId);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  async function bookland() {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://starter-express-api-git-main-salman36.vercel.app/api/auth/businessbookinguser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appuser_id: userId,
            appplayland_id: playlandId,
            bookingstatus: "pending",
            amount: price,
            method: "cash",
            paymentstatus: "pending",
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        dispatch({ type: "SET_BOOKING_REQUEST_FLAG", payload: true });
        navigation.navigate("MyBookings");
      } else {
        alert("Booking Failed");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  const handleOpenLink = async (url) => {
    // Check if the device supports opening the given URL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Open the URL in the default browser
      await Linking.openURL(url);
    } else {
      console.log("Cannot open URL: " + url);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ flex: 2 }}>
        <Image
          source={{ uri: path_url }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "70%",
          }}
        />
        <View
          style={[
            {
              position: "absolute",
              bottom: "10%",
              left: "5%",
              right: "5%",
              borderRadius: 15,
              padding: SIZES.padding,
              backgroundColor: COLORS.white,
            },
            styles.shadow,
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.shadow}>
              <Image
                source={{ uri: path_url }}
                resizeMode="cover"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 15,
                }}
              />
            </View>

            <View
              style={{
                marginHorizontal: SIZES.radius,
                justifyContent: "center",
              }}
            >
              <Text style={{ ...FONTS.h2 }}>{name}</Text>
            </View>
          </View>

          <View style={{ marginTop: SIZES.radius }}>
            <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
              {description}
            </Text>
          </View>
        </View>

        {/* Header Buttons */}
        <View
          style={{
            position: "absolute",
            top: 50,
            left: 20,
            right: 20,
            //height: 50,
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Image
                source={icons.back}
                resizeMode="cover"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Body */}
      <ScrollView style={{ flex: 1.5, marginBottom: 30 }}>
        {/* Icons */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.base,
            paddingHorizontal: SIZES.padding * 2,
            justifyContent: "space-between",
            marginBottom: SIZES.base,
          }}
        >
          <IconLabel
            icon={icons.villa}
            label={"Location"}
            onPress={() => handleOpenLink(location)}
          />

          <IconLabel icon={icons.parking} label={`Rs. ${price}`} />

          <IconLabel icon={icons.wind} label={`Disc ${discount}%`} />
        </View>

        {/* About */}
        <View
          style={{ marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}
        >
          <Text style={{ ...FONTS.h2 }}>About:</Text>
          <Text
            style={{
              marginTop: SIZES.radius,
              color: COLORS.gray,
              ...FONTS.body3,
            }}
          >
            Timing: {time_open} - {time_close}
          </Text>
          <Text style={{ ...FONTS.h2, marginTop: SIZES.radius }}>
            Select Packages:
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("PackageDetail")}
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
              paddingVertical: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              borderRadius: 5,
              backgroundColor: COLORS.gray,
            }}
          >
            <Text
              style={{
                color: COLORS.black,
                ...FONTS.body2,
              }}
            >
              Luxury Vacation
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PackageDetail")}
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
              paddingVertical: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              borderRadius: 5,
              backgroundColor: COLORS.gray,
            }}
          >
            <Text
              style={{
                color: COLORS.black,
                ...FONTS.body2,
              }}
            >
              bumper Vacation
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      {/* <View style={{ flex: 0.3, paddingHorizontal: SIZES.padding }}>
        <LinearGradient
          style={[{ height: 70, width: "100%", borderRadius: 15 }]}
          colors={["#edf0fc", "#d6dfff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flex: 1,
                marginHorizontal: SIZES.padding,
                justifyContent: "center",
              }}
            >
              <Text style={{ ...FONTS.h1 }}>{price}</Text>
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : (
              <TouchableOpacity
                style={{
                  width: 130,
                  height: "80%",
                  marginHorizontal: SIZES.radius,
                }}
                onPress={bookland}
              >
                <LinearGradient
                  style={[
                    {
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    },
                  ]}
                  colors={["#46aeff", "#5884ff"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
                    BOOKING
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default DestinationDetail;
