import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import { Video, AVPlaybackStatus } from "expo-av";

const OptionItem = ({ bgColor, icon, label, onPress }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onPress={onPress}
    >
      <View style={[styles.shadow, { width: 60, height: 60 }]}>
        <LinearGradient
          style={[
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              backgroundColor: "red",
            },
          ]}
          colors={bgColor}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Image
            source={icon}
            resizeMode="cover"
            style={{
              tintColor: COLORS.white,
              width: 30,
              height: 30,
            }}
          />
        </LinearGradient>
      </View>
      <Text
        style={{ marginTop: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const Home = ({ navigation }) => {
  // Dummy Data

  const [destinations, setDestinations] = React.useState([
    {
      id: 0,
      name: "Joy land",
      description:
        "Visit the ski village for an amazing and unforgettable day.",
      img: images.skiVilla,
      playLocate: "lahore",
      about: "Ski Villa is a beautiful place to visit in the winter.",
      price: 1000,
    },
    {
      id: 1,
      name: "Play land",
      description:
        "Visit the ski village for an amazing and unforgettable day.",
      img: images.climbingHills,
      playLocate: "lahore",
      about: "Ski Villa is a beautiful place to visit in the winter.",
      price: 1000,
    },
    {
      id: 2,
      name: "Museum Vibe place",
      description: "Travel to the snow for an unforgettable experience.",
      img: images.frozenHills,
      playLocate: "lahore",
      about: "Ski Villa is a beautiful place to visit in the winter.",
      price: 1000,
    },
    {
      id: 3,
      name: "Cartoon Network",
      description: "Spend a full day in the sun and sand.",
      img: images.beach,
      playLocate: "lahore",
      about: "Ski Villa is a beautiful place to visit in the winter.",
      price: 1000,
    },
  ]);

  // Render

  function renderDestinations(item, index) {
    return (
      <TouchableOpacity
        style={[
          styles.shadow,
          {
            justifyContent: "space-between",
            marginHorizontal: SIZES.base,
            flexDirection: "row",
            height: 100,
            padding: SIZES.base,
            width: SIZES.width * 0.9,
          },
        ]}
        onPress={() => {
          navigation.navigate("DestinationDetail", {
            name: item.name,
            description: item.description,
            img: item.img,
            playLocate: item.playLocate,
            about: item.about,
            price: item.price,
          });
        }}
      >
        <Image
          source={item.img}
          resizeMode="cover"
          style={{
            width: SIZES.width * 0.2,
            height: "90%",
            borderRadius: 30,
          }}
        />
        <View style={{ marginLeft: SIZES.base * 2 }}>
          <Text style={{ marginTop: SIZES.base / 2, ...FONTS.h4 }}>
            {item.name}
          </Text>
          <Text
            style={{
              marginTop: SIZES.base / 2,
              ...FONTS.body4,
              color: COLORS.gray,
            }}
          >
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.container}>
      {/* Banner */}
      <View
        style={{
          flex: 0.5,
          marginTop: SIZES.base,
          paddingHorizontal: SIZES.padding * 0.6,
        }}
      >
        <Video
          ref={video}
          source={require("../assets/playLand.mp4")}
          resizeMode="cover"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          style={{ width: "100%", height: "100%", borderRadius: 20 }}
          shouldPlay
        />
      </View>

      {/* Options */}

      {/* Destination */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            marginTop: SIZES.base * 2,
            marginHorizontal: SIZES.padding,
            marginBottom: SIZES.base,
            ...FONTS.h2,
          }}
        >
          Nearby PlayLands
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FlatList
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            data={destinations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => renderDestinations(item, index)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 5,
      height: 6,
    },
    shadowOpacity: 0.85,
    shadowRadius: 4.84,

    elevation: 70,
  },
});

export default Home;
