import React from "react";
import Onboarding from "./Onboarding";
import { images } from "../../constants";

export default function Onboarding2({ navigation }) {
  return (
    <>
      <Onboarding
        title="Prebooking with offers"
        image={images.onboardingImage1}
        buttonNavigate={() => navigation.navigate("Signup")}
        description="Book your kids fun places with us and get 20% off on your first booking."
      />
    </>
  );
}
