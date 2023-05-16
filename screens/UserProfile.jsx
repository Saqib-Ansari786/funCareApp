import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const userData = {
  name: "John Doe",
  email: "johnDoe@example.com",
  phone: "+1 (555) 123-4567",
};

const UserProfileScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const userId = useSelector((state) => state.user.userId);
  const [userData, setUserData] = React.useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          `http://starter-express-api-git-main-salman36.vercel.app/api/auth/user/record/${userId}`
        );
        const responseData = await response.json();
        setUserData(responseData.userRecord[0]);
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
    }
    if (isFocused) {
      // Fetch or update data here
      fetchUser();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: userData.image }} />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.phone}>{userData.phone}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditProfile", userData)}
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
