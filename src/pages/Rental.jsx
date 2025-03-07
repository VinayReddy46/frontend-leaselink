import React, { useEffect } from "react";
import RentalPage from "../compoments/Rentalcomponents/RentalPage";
import ProductsData from "../compoments/CartComponents/Product";


const Rental = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <productsData/> */}
      <RentalPage products={ProductsData} />

    </div>
  );
};

export default Rental;
