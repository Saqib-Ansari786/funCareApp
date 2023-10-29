import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const UserNameImageScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState(null);

  const handleImagePick = () => {
    // Use Expo Image Picker to select an image
  };

  const handleFinish = () => {
    // Save user's name and image and navigate to the desired screen
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter your name:</Text>
      <TextInput
        placeholder="Name"
        value={userName}
        onChangeText={setUserName}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={handleImagePick} style={styles.button}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFinish} style={styles.button}>
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 20,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default UserNameImageScreen;
