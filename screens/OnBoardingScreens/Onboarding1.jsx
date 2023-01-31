import React from "react";
import Onboarding from "./Onboarding";
import { images } from "../../constants";

export default function Onboarding1({ navigation }) {
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
