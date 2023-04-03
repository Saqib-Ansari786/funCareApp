import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { icons, COLORS } from "../constants";
import PlayLands from "../screens/PlayLands";
import MyBookings from "../screens/MyBookings";
import UserProfileScreen from "../screens/UserProfile";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
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
            case "UserProfile":
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
      <Tab.Screen name="HomeScreen" component={Home} />
      <Tab.Screen name="PlayLands" component={PlayLands} />
      <Tab.Screen name="MyBookings" component={MyBookings} />
      <Tab.Screen name="UserProfile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;
