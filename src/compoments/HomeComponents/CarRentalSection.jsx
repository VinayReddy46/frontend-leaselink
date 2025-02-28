import React from "react";


const CarRentalSection = () => {
  return (
    <section id="#about" className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-white">
      {/* Image Section */}
      <div className="relative flex-shrink-0">
        <img
          src="https://live.themewild.com/carway/assets/img/about/01.jpg"
          alt="Car Rental"
          className="rounded-lg w-full md:w-[500px] h-auto"
        />
        <div className="absolute bottom-4 left-20 bg-black text-white text-sm font-semibold px-4 py-2 rounded-md flex items-center gap-2">
          <span className="text-lg">🚗</span>
          <span>30 Years Of <br />Quality Service</span>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="mt-8 md:mt-0 md:ml-12 ">
        <h4 className="text-blue-600 font-semibold uppercase">About Us</h4>
        <h2 className="text-3xl font-bold mt-2">
          We Provide Quality <span className="text-blue-600">Rental</span> Services
        </h2>
        <p className="text-gray-600 mt-4">
          There are many variations of passages of Lorem Ipsum available, but the
          majority have suffered alteration in some form, by injected humour, or
          randomised words which don't look even slightly believable.
        </p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center gap-2 text-gray-700">
            ✅ At vero eos et accusamus et iusto odio
          </li>
          <li className="flex items-center gap-2 text-gray-700">
            ✅ Established fact that a reader will be distracted
          </li>
          <li className="flex items-center gap-2 text-gray-700">
            ✅ Sed ut perspiciatis unde omnis iste natus sit
          </li>
        </ul>
        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all">
          Discover More →
        </button>
      </div>
    </section>
  );
};

export default CarRentalSection;