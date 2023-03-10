import React, { useEffect, useState } from "react";
import Onboarding from "./Onboarding";
import { images } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding1({ navigation }) {
  // modify to use redux to save isFirstLaunch state

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  return (
    <>
      <Onboarding
        title="Plan your hangout with friends"
        image={images.onboardingImage}
        buttonNavigate={() => navigation.navigate("Onboarding2")}
        description="Find the best places to hangout with your friends and enjoy your time."
      />
    </>
  );
}
