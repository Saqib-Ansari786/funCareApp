import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import { icons, images, COLORS, FONTS, SIZES } from "../../constants";

const Onboarding = (props) => {
  // Render

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={props.image}
          resizeMode="contain"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ alignItems: "center", marginHorizontal: SIZES.padding }}>
          <Text style={{ ...FONTS.h2 }}>{props.title}</Text>
          <Text
            style={{
              color: COLORS.gray,
              marginTop: SIZES.padding,
              textAlign: "center",
              ...FONTS.body3,
            }}
          >
            {props.description}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.shadow,
            {
              marginTop: SIZES.padding * 2,
              width: "20%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
          onPress={props.buttonNavigate}
        >
          <Image
            source={icons.arrow}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 15,
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Onboarding;
