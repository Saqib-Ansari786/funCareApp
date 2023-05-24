import React from "react";
import Onboarding from "./Onboarding";
import { images } from "../../constants";

export default function Onboarding1({ navigation }) {
  return (
    <>
      <Onboarding
        title="Plan your kids fun time"
        image={images.onboardingImage}
        buttonNavigate={() => navigation.navigate("Onboarding2")}
        description="Find the best places to take your kids to have fun and enjoy their time."
      />
    </>
  );
}
