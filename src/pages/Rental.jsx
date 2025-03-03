import React, { useEffect } from "react";
import RentalPage from "../compoments/HomeComponents/RentalPage";
import productsData from "../compoments/CartComponents/product";


const Rental = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <productsData/>
      <RentalPage products={productsData} />

      
      
    </div>
  );
};

export default Rental;
