import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { COLORS, FONTS } from "../../constants";

const UserNameImageScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      postImage(result.assets[0].uri);
    }
  };

  const handleSkip = () => {
    // Handle skipping the step (e.g., proceed to the next screen)
    navigation.navigate("Home");
  };

  const handleContinue = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          imageUri,
        }),
      });
      const resData = await response.json();
      console.log(resData);
      setLoading(false);
      if (resData.success) {
        navigation.navigate("Home");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const postImage = async (image) => {
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "funcare_business_images");
      data.append("cloud_name", "dj4jj7sog");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dj4jj7sog/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const resData = await response.json();
      setImageUri(resData.secure_url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.h1 }}>Add Your Name and Image</Text>

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: imageUri
              ? imageUri
              : "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
          }}
          style={styles.image}
        />
      </View>
      <Button
        mode="outlined"
        icon="camera"
        onPress={handleImagePick}
        style={styles.imageButton}
        theme={{ colors: { primary: COLORS.primary } }}
      >
        Choose Image
      </Button>

      <TextInput
        label="Your Name"
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        theme={{ colors: { primary: COLORS.primary } }}
        mode="outlined"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>

        <Button
          mode="contained"
          onPress={handleContinue}
          theme={{ colors: { primary: COLORS.primary } }}
          loading={loading}
        >
          Continue
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imageButton: {
    width: 150,
  },
  input: {
    width: "100%",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  skipButton: {
    padding: 10,
  },
  buttonText: {
    color: COLORS.primary,
  },
});

export default UserNameImageScreen;
