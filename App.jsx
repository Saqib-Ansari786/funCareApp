import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";
import Onboarding1 from "./screens/OnBoardingScreens/Onboarding1";
import Onboarding2 from "./screens/OnBoardingScreens/Onboarding2";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";
import { COLORS, SIZES, FONTS, icons } from "./constants";
import Tabs from "./navigation/tabs";
import DestinationDetail from "./screens/DestinationDetail";
import EditProfileScreen from "./screens/EditProfileScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { Provider } from "react-native-paper";
import MapLocation from "./screens/MapLocation";
import SplashScreen from "./screens/SplashScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import store from "./store/store";
import Cashpayment from "./screens/Cashpayment";
import UserProfileScreen from "./screens/UserProfile";
import Onboarding3 from "./screens/OnBoardingScreens/Onboarding3";
import { StripeProvider } from "@stripe/stripe-react-native";
import PackageDetailScreen from "./screens/PackageDetail";
import BookingScreen from "./screens/BookingConfirmation";
import EmailScreen from "./screens/SignupScreens/EmailScreen";
import VerificationScreen from "./screens/SignupScreens/VerificationScreen";
import UserNameImageScreen from "./screens/SignupScreens/UserNameImageScreen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

function Main() {
  const [route, setRoute] = useState("Onboarding1");
  const dispatch = useDispatch();
  useEffect(() => {
    checkIfLoggedIn();
  }, []);
  const checkIfLoggedIn = async () => {
    const authId = await AsyncStorage.getItem("authId");
    if (authId) {
      // User is already authenticated, navigate to home screen
      dispatch({ type: "SET_USER_ID", payload: authId });
      console.log(authId);
      setRoute("EmailScreen");
    } else {
      // User is not authenticated, navigate to sign up screen
      setRoute("Onboarding1");
    }
  };

  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  const Stack = createStackNavigator();

  return (
    <Provider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName={route}
          screenOptions={() => ({
            headerTitle: () => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Image
                  source={icons.main}
                  resizeMode="cover"
                  style={{
                    width: 200,
                    height: 200,
                  }}
                />
              </View>
            ),
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: COLORS.black,
            },
            headerTintColor: COLORS.white,
          })}
        >
          {/* Screens */}
          {/* <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              title: null,
              headerShown: false,
            }}
          /> */}
          <Stack.Screen
            name="Cashpayment"
            component={Cashpayment}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Onboarding1"
            component={Onboarding1}
            options={{
              title: null,
              headerStyle: {
                backgroundColor: COLORS.black,
              },
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="Onboarding2"
            component={Onboarding2}
            options={{
              title: null,
              headerStyle: {
                backgroundColor: COLORS.black,
              },
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="Onboarding3"
            component={Onboarding3}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignUpScreen}
            options={() => ({
              headerLeft: null,
            })}
          />
          <Stack.Screen
            name="DestinationDetail"
            component={DestinationDetail}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MapLocation"
            component={MapLocation}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="UserProfileScreen"
            component={UserProfileScreen}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PackageDetail"
            component={PackageDetailScreen}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BookingConfirmation"
            component={BookingScreen}
            options={{
              title: null,
              headerShown: false,
            }}
          />

          {/* Authentication User screens */}
          <Stack.Screen
            name="EmailScreen"
            component={EmailScreen}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="VerificationScreen"
            component={VerificationScreen}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="UserNameImageScreen"
            component={UserNameImageScreen}
            options={{
              title: null,
              headerShown: false,
            }}
          />

          {/* Tabs */}
          <Stack.Screen
            name="Home"
            component={Tabs}
            options={({ navigation }) => ({
              headerLeft: null,
              headerRight: () => (
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => navigation.navigate("UserProfileScreen")}
                >
                  <Image
                    source={icons.user}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: COLORS.white,
                    }}
                  />
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App = () => {
  return (
    <ReduxProvider store={store}>
      <StripeProvider
        publishableKey="pk_test_51NEDnZD7q9cT09mV6Bjmfbw2bCxFBBpORXAx2bErfqJAJrNbTTCNg3jdeUUTBrmV9QJBrDZLcSBIgJJXkHfWM6wF00gpSsThTc"
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
      >
        <Main />
      </StripeProvider>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },

  button: {
    backgroundColor: "red",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});
