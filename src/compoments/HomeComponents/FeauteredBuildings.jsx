import React from "react";
import { useNavigate } from "react-router-dom";

const buildings = [
  {
    id: 1,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2xTNDcIuwjdCmP00fk9Mr-qbWdpZZWcjBqw&s",
    title: "Modern Skyscraper",
    details: "Model: 2022 ` | 50 Floors | Smart Building",
    features: ["24/7 Security", "Energy Efficient"],
    price: "$390 / month",
  },
  {
    id: 2,
    image: "https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg",
    title: "supra",
    details: "Model: 2023 | ultra modern | super fast",
    features: ["Energy Efficient", "Smart Tech"],
    price: "$10000 / month",
  },
  {
    id: 3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuruFWuubJNCwmfITvcPE4TkK_BUlTcKpMRg&s",
    title: "Dell",
    details: "Model: intel i5 8thgen | 8GB RAM | 1TB HDD",
    features: ["Ultra fast", "Chargeable", "Smart tech"],
    price: "$1000 / month",
  },
  {
    id: 4,
    image: "https://i1.adis.ws/i/canon/eos-r8-frt_gallery-module_05_365x228_aa065f319187416e9ccdd3d67a9ba48b?$hotspot-dt-jpg$",
    title: "Camera",
    details: "Model: 2023 | 4K | 60fps",
    features: ["Shutter speed", "Smart tech"],
    price: "$10000 / month",
  },
  {
    id: 5,
    image: "https://m.media-amazon.com/images/I/81qFhtzh5KL.jpg",
    title: "LG-Television",
    details: "Model: 2020 | 64 inches | Color efficient",
    features: ["Energy Efficient", "Smart Tech"],
    price: "$1000 / month",
  },
  {
    id: 6,
    image: "https://p2-ofp.static.pub/fes/cms/2021/10/28/juqs65pgl1gh3dysi7yv1tnvtsiqva364946.png",
    title: "Tablet",
    details: "Model: 2023 | Smooth | Fast",
    features: ["Energy Efficient", "Smart Tech"],
    price: "$700 / month",
  },
];

const BuildingCard = ({ building }) => {
  const navigate = useNavigate();

  const handleRentClick = () => {
    navigate(`/rent/${building.id}`); // Navigate dynamically
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col transform transition duration-300 hover:scale-105">
      <img src={building.image} alt={building.title} className="w-full h-56 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{building.title}</h3>
        <p className="text-gray-600 text-sm flex-grow">{building.details}</p>
        <ul className="text-gray-500 text-sm mt-2 list-disc list-inside">
          {building.features.map((feature, index) => (
            <li key={index}>✔ {feature}</li>
          ))}
        </ul>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-blue-600">{building.price}</span>
          <button
            onClick={handleRentClick}
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

const FeaturedBuildings = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Featured Rentals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {buildings.map((building) => (
            <BuildingCard key={building.id} building={building} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBuildings;