import React, { useEffect } from "react";
import RentalPage from "../compoments/HomeComponents/RentalPage";
import productsData from "../compoments/HomeComponents/Product";

const Rental = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <productsData/>
      <RentalPage />
      
    </div>
  );
};

export default Rental;
