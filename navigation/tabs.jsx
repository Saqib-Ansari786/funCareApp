import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";

import { icons, COLORS } from "../constants";
import Onboarding1 from "../screens/OnBoardingScreens/Onboarding1";
import Onboarding2 from "../screens/OnBoardingScreens/Onboarding2";
import UserProfile from "../screens/UserProfile";
import SignUpScreen from "../screens/SignUpScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.primary : COLORS.gray;

          switch (route.name) {
            case "Home":
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
            case "PlayLands":
              return (
                <Image
                  source={icons.play}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 50,
                    height: 50,
                  }}
                />
              );
            case "History":
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
            case "Account":
              return (
                <Image
                  source={icons.user}
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="PlayLands" component={Onboarding1} />
      <Tab.Screen name="History" component={SignUpScreen} />
      <Tab.Screen name="Account" component={UserProfile} />
    </Tab.Navigator>
  );
};

export default Tabs;