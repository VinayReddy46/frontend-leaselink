import React, { useEffect } from "react";
import RentalPage from "../compoments/Rentalcomponents/RentalPage";

const Rental = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <RentalPage />
    </div>
  );
};

export default Rental;
