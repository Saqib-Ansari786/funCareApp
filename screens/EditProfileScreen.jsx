import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { COLORS, FONTS, SIZES } from "../constants";
import * as ImagePicker from "expo-image-picker";
import Header from "../components/Header";
import { useDispatch } from "react-redux";

const EditProfileScreen = ({ navigation, route }) => {
  const { name, email, image, firebase_id, phone } = route.params;
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const [avatarUrl, setAvatarUrl] = React.useState(image);
  const dispatch = useDispatch();

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
      setAvatarUrl(result.assets[0].uri);
    }
  };
  async function updateUser(username, email) {
    try {
      console.log(avatarUrl);
      const response = await fetch(
        `http://starter-express-api-git-main-salman36.vercel.app/api/auth/appuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firebase_id: firebase_id,
            name: username,
            email: email,
            image: avatarUrl,
            phone: phone,
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      dispatch({ type: "SET_USER_REQUEST_FLAG", payload: true });
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      username: name,
      email: email,
    },
    validationSchema,
    onSubmit: (values) => {
      updateUser(values.username, values.email);
      navigation.goBack();
    },
  });

  return (
    <View style={styles.container}>
      <Header />
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
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          onBlur={formik.handleBlur("username")}
          error={formik.touched.username && formik.errors.username}
          right={<TextInput.Icon icon="face-man-profile" />}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={styles.errorText}>{formik.errors.username}</Text>
        )}
        <TextInput
          mode="outlined"
          label="Email"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          error={formik.touched.email && formik.errors.email}
          right={<TextInput.Icon icon="email" />}
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.errorText}>{formik.errors.email}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
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
    width: 300,
    height: 300,
    borderRadius: 80,
    marginBottom: 10,
  },
  changeAvatar: {
    ...FONTS.h3,
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default EditProfileScreen;
