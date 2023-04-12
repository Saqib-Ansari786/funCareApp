import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Title, List, Divider } from "react-native-paper";
import { images } from "../constants";

import React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";

const Card = ({ title, image }) => {
  return (
    <View style={styles.card}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const PlaylandsScreen = () => {
  const [playlands, setPlaylands] = React.useState([
    {
      id: 0,
      name: "Joy land",
      description:
        "Visit the ski village for an amazing and unforgettable day.",
      img: images.skiVilla,
      playLocate: "lahore",
      about: "Ski Villa is a beautiful place to visit in the winter.",
      price: 1000,
      rating: 5,
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
      rating: 2,
    },
    {
      id: 2,
      name: "Museum Vibe place",
      description: "Travel to the snow for an unforgettable experience.",
      img: images.frozenHills,
      playLocate: "lahore",
      about: "Ski Villa is a beautiful place to visit in the winter.",
      price: 1000,
      rating: 4,
    },
    {
      id: 3,
      name: "Cartoon Network",
      description: "Spend a full day in the sun and sand.",
      img: images.beach,
      playLocate: "lahore",
      about: "Ski Villa is a beautiful place to visit in the winter.",
      price: 1000,
      rating: 3,
    },
  ]);

  return (
    <View style={styles.container}>
      <Title style={styles.heading}>Nearby playlands</Title>
      <List.Section>
        {playlands.map((playland) => {
          Card(playland.name, playland.img);
        })}
      </List.Section>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    marginVertical: 10,
  },
  card: {
    height: 200,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default PlaylandsScreen;
