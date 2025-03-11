import React from "react";
import { useNavigate } from "react-router-dom";

const items = [
  {
    id: 1,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2xTNDcIuwjdCmP00fk9Mr-qbWdpZZWcjBqw&s",
    title: "Modern Skyscraper",
    details: "Model: 2022 | 50 Floors | Smart Building",
    features: ["24/7 Security", "Energy Efficient"],
    price: "$390 / month",
    rating: 4.5,
    isAvailable: true,
  },
  {
    id: 2,
    image: "https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg",
    title: "Supra",
    details: "Model: 2023 | Ultra Modern | Super Fast",
    features: ["Energy Efficient", "Smart Tech"],
    price: "$10000 / month",
    rating: 4.7,
    isAvailable: false,
  },
  {
    id: 3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuruFWuubJNCwmfITvcPE4TkK_BUlTcKpMRg&s",
    title: "Dell Laptop",
    details: "Model: Intel i5 8th Gen | 8GB RAM | 1TB HDD",
    features: ["Ultra fast", "Chargeable"],
    price: "$1000 / month",
    rating: 4.5,
    isAvailable: true,
  },
  {
    id: 4,
    image: "https://i1.adis.ws/i/canon/eos-r8-frt_gallery-module_05_365x228_aa065f319187416e9ccdd3d67a9ba48b?$hotspot-dt-jpg$",
    title: "Canon Camera",
    details: "Model: 2023 | 4K | 60fps",
    features: ["Shutter speed", "Smart tech"],
    price: "$10000 / month",
    rating: 3.6,
    isAvailable: true,
  },
  {
    id: 5,
    image: "https://m.media-amazon.com/images/I/81qFhtzh5KL.jpg",
    title: "LG Television",
    details: "Model: 2020 | 64 inches | Color efficient",
    features: ["Energy Efficient", "Smart Tech"],
    price: "$1000 / month",
    rating: 4.3,
    isAvailable: true,
  },
  {
    id: 6,
    image: "https://p2-ofp.static.pub/fes/cms/2021/10/28/juqs65pgl1gh3dysi7yv1tnvtsiqva364946.png",
    title: "Tablet",
    details: "Model: 2023 | Smooth | Fast",
    features: ["Energy Efficient", "Smart Tech"],
    price: "$700 / month",
    rating: 4.4,
    isAvailable: true,
  },
  {
    id: 7,
    image: "https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg",
    title: "PlayStation 5",
    details: "Model: 2023 | 4K Gaming | 825GB SSD",
    features: [ "Haptic Feedback", "Ultra Performance"],
    price: "$600 / month",
    rating: 4.8,
    isAvailable: false,
  },
  {
    id: 8,
    image: "https://m.media-amazon.com/images/I/81qFhtzh5KL.jpg",
    title: "Hero Karizma XMR",
    details: "Model: 2024 | 210cc | Liquid-Cooled Engine",
    features: ["Sporty Design", "Fuel Efficient"],
    price: "$500 / month",
    rating: 3.5,
    isAvailable: true,
  },
];

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate("/chat");
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };
  const handleImageClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const renderRatingStars = (rating) => {
    const roundedRating = Math.round(rating);
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < roundedRating ? "text-yellow-400 text-lg" : "text-gray-300 text-lg"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
    onClick={handleImageClick}
    >
      {/* Clickable Heart Icon */}
      <div className="absolute top-3 right-3">
        <button
          onClick={handleWishlistClick}
          className="w-10 h-10 flex items-center justify-center rounded-full transition duration-300 hover:border-red-500 group bg-white shadow-md"
        >
          <span className="text-gray-500 text-xl group-hover:text-red-500 transition duration-300">♥</span>
        </button>
      </div>

      <img src={item.image} alt={item.title} className="w-full h-52 object-cover" />
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
          <span className={`text-sm font-medium ${item.isAvailable ? "text-green-600" : "text-red-500"}`}>
            {item.isAvailable ? "Available" : "Not Available"}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm flex-grow">{item.details}</p>
        
        <ul className="text-gray-500 text-xs mt-2 list-disc pl-4">
          {item.features.map((feature, index) => (
            <li key={index}>✔ {feature}</li>
          ))}
        </ul>
        
        <div className="flex items-center mt-2">
          {renderRatingStars(item.rating)}
          <span className="ml-2 text-xs text-gray-600">({item.rating})</span>
        </div>
        
        <div className="mt-1">
          <span className="text-lg font-bold text-[#27391C]">{item.price}</span>
        </div>

        <button
          onClick={handleChatClick}
          className={`mt-2 px-4 py-2 rounded-lg transition duration-300 ${
            item.isAvailable
              ? "bg-black text-white hover:bg-green-700"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          disabled={!item.isAvailable}
        >
          {item.isAvailable ? "Quote" : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

const FeaturedItems = () => {
  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Featured Rentals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedItems;