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
import { Button, TextInput } from "react-native-paper";
import { COLORS } from "../constants";

const EditProfileScreen = () => {
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

      <Button
        mode="contained"
        onPress={handleSaveChanges}
        buttonColor={COLORS.primary}
      >
        Submit Changes
      </Button>
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
    color: "#007aff",
  },
  inputContainer: {
    width: "80%",
  },

  button: {
    backgroundColor: "#007aff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
});

export default EditProfileScreen;
