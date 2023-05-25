import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();
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
            navigation.goBack();
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
    </View>
  );
}
