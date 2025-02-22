import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../compoments/InsuranceComponents/HeroSection";
import AdditionalFeatures from "../compoments/InsuranceComponents/AdditionalFeatures";
import FormSection from "../compoments/InsuranceComponents/FormSection";
import SubscriptionPlans from "../compoments/InsuranceComponents/SubscriptionPlans";

const Insurance = () => {
  const [showPlans, setShowPlans] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/background.jpg')" }} // Update with your image path
    >
      {/* Optional Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Section */}
      <div className="relative z-10">
        <HeroSection />
        <AdditionalFeatures />
        <FormSection onFindPlans={() => navigate("/plans")} />

        {/* Show plans only on the "/plans" route */}
        {showPlans && <SubscriptionPlans />}
      </div>
    </div>
  );
};

export default Insurance;
