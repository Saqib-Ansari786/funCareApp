import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { icons, COLORS, FONTS } from "../constants";
import MyBookings from "../screens/MyBookings";
import Helpfaq from "../screens/Helpfaq";
import { Text } from "react-native-paper";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          color: COLORS.primary,
        },
        tabBarLabel: ({ focused }) => {
          const tintColor = focused ? COLORS.primary : COLORS.gray;
          switch (route.name) {
            case "HomeScreen":
              return (
                <Text
                  style={{
                    color: tintColor,
                    ...FONTS.h4,
                  }}
                >
                  Home
                </Text>
              );

            case "MyBookings":
              return (
                <Text
                  style={{
                    color: tintColor,
                    ...FONTS.h4,
                  }}
                >
                  My Bookings
                </Text>
              );
            case "HelpCenter":
              return (
                <Text
                  style={{
                    color: tintColor,
                    ...FONTS.h4,
                  }}
                >
                  Help Center
                </Text>
              );
          }
        },

        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.primary : COLORS.gray;

          switch (route.name) {
            case "HomeScreen":
              return (
                <Image
                  source={icons.home}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );

            case "MyBookings":
              return (
                <Image
                  source={icons.bookmark}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
            case "HelpCenter":
              return (
                <Image
                  source={icons.faq}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={Home} />
      <Tab.Screen name="MyBookings" component={MyBookings} />
      <Tab.Screen name="HelpCenter" component={Helpfaq} />
    </Tab.Navigator>
  );
};

export default Tabs;
