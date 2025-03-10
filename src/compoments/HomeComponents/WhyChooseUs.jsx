import React, { useState } from "react";
import { FaCar, FaTimesCircle, FaUserTie } from "react-icons/fa";
import { FiPlay } from "react-icons/fi";

const WhyChooseUs = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative w-full bg-black text-white">
      <div className="flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="relative z-10 w-full md:w-1/2 p-6 md:p-16 space-y-6">
          <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-widest">
            Why Choose Us
          </h4>
          <h2 className="text-3xl md:text-4xl font-bold">
            We Are Dedicated <span className="text-blue-500">To Provide</span> Quality Service
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>
          <div className="mt-6 space-y-6">
            <Feature icon={<FaCar />} title="Best Quality Cars" />
            <Feature icon={<FaTimesCircle />} title="No Cancellation Fees" />
            <Feature icon={<FaUserTie />} title="Personal Driver" />
          </div>
        </div>

        {/* Right Section (Image + Play Button) */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto flex items-center justify-center">
          {!showVideo ? (
            <>
              <img
                src="https://applecarrentals.com/public/cars/61f27ea7d0c6e20220127164447.png"
                alt="Luxury Car"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setShowVideo(true)}
                className="absolute bg-blue-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
              >
                <FiPlay size={30} />
              </button>
            </>
          ) : (
            <div className="w-15/22 md:w-3/4 lg:w-2/2 h-48 md:h-64 lg:h-80 shadow-lg  overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/QU32Wpk8v3w?autoplay=1"
                title="YouTube Video"
                
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, title }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-blue-500 p-3 rounded-full text-white text-lg flex items-center justify-center w-12 h-12">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration.
        </p>
      </div>
    </div>
  );
};

export default WhyChooseUs;