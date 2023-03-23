import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, IconButton, TextInput } from "react-native-paper";
import { COLORS, FONTS, SIZES } from "../constants";

const EditProfileScreen = ({ navigation }) => {
  const [text, setText] = React.useState("");

  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [avatarUrl, setAvatarUrl] = useState(
    "https://randomuser.me/api/portraits/men/1.jpg"
  );

  const handlePickImage = async () => {
    let permissionResult;
    if (Platform.OS === "ios") {
      permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    if (permissionResult && permissionResult.status !== "granted") {
      alert("You need to grant permission to access your photo gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setAvatarUrl(result.uri);
    }
  };

  const handleSaveChanges = () => {
    // Your code to save changes here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={handlePickImage}
      >
        <Image style={styles.avatar} source={{ uri: avatarUrl }} />
        <IconButton icon="camera" size={30} color={COLORS.primary} />
        <Text style={styles.changeAvatar}>Change Avatar</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="Username"
          activeOutlineColor={COLORS.primary}
          right={<TextInput.Icon icon="face-man-profile" />}
        />
        <TextInput
          mode="outlined"
          label="Email"
          activeOutlineColor={COLORS.primary}
          right={<TextInput.Icon icon="email" />}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Submit Changes</Text>
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
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  changeAvatar: {
    fontSize: 18,
    color: COLORS.primary,
  },
  inputContainer: {
    width: "80%",
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.radius,
    borderRadius: SIZES.radius,
    marginVertical: SIZES.padding,
  },
  buttonText: {
    color: "#ffffff",
    ...FONTS.h3,
    letterSpacing: 1,
  },
});

export default EditProfileScreen;
