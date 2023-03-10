import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const UserProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.phone}>+1 (555) 123-4567</Text>
        <Text style={styles.email}>johndoe@example.com</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    marginBottom: 5,
    letterSpacing: 1,
    ...FONTS.largeTitle,
  },
  phone: {
    marginBottom: 5,
    color: "#999999",
    ...FONTS.body2,
  },
  email: {
    marginBottom: 20,
    color: "#999999",
    ...FONTS.body2,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.radius,
    borderRadius: SIZES.radius,
  },
  buttonText: {
    color: "#ffffff",
    ...FONTS.h3,
    letterSpacing: 1,
  },
});

export default UserProfileScreen;
