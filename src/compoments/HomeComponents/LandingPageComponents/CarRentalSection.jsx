import React from "react";

const CarRentalSection = () => {
  return (
    <section id="/aboutus" className="flex flex-col md:flex-row items-center  px-10 md:px-24 py-20 bg-gradient-to-r from-blue-100 to-blue-300 shadow-2xl rounded-xl">
      {/* Image Section */}
      <div className="relative flex-shrink-0">
        <img
          src="https://live.themewild.com/carway/assets/img/about/01.jpg"
          alt="Car Rental"
          className="rounded-3xl w-full md:w-[600px] h-auto shadow-xl border-4 border-white"
        />
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-blue-700 text-sm font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-lg">
          <span className="text-lg">🚗</span>
          <span>30 Years of <br /> Excellence in Car Rentals</span>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="mt-12 md:mt-0 md:ml-16 max-w-lg text-center md:text-left">
        <h4 className="text-white font-bold uppercase tracking-wide bg-blue-600 px-4 py-2 rounded-lg inline-block shadow-md">
          About Us
        </h4>
        <h2 className="text-5xl font-extrabold mt-4 text-blue-900">
          Your Reliable <span className="text-blue-600">Car Rental</span> Service
        </h2>
        <p className="text-gray-800 mt-6 leading-relaxed">
          Discover the ease of renting a car with us! We offer a diverse fleet of vehicles, ensuring you find the perfect ride for your journey. Enjoy affordable prices, top-notch service, and hassle-free bookings.
        </p>
        <ul className="mt-6 space-y-4 text-lg">
          <li className="flex items-center gap-3 text-gray-900 font-semibold">
            ✅ Luxury and budget-friendly cars available
          </li>
          <li className="flex items-center gap-3 text-gray-900 font-semibold">
            ✅ 24/7 customer support for smooth assistance
          </li>
          <li className="flex items-center gap-3 text-gray-900 font-semibold">
            ✅ Simple and quick online reservations
          </li>
        </ul>
        <button className="mt-10 bg-blue-900 text-white px-10 py-4 rounded-full font-bold shadow-2xl hover:bg-blue-700 transition-all transform hover:scale-110">
          Get Started →
        </button>
      </div>
    </section>
  );
};

export default CarRentalSection;
