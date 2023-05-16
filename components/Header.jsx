import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

export default function Header() {
  return (
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
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <TouchableOpacity
          onPress={() => {
            console.log("Menu on pressed");
          }}
        >
          <Image
            source={icons.menu}
            resizeMode="cover"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
