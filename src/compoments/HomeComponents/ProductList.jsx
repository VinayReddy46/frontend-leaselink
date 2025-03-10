import React, { useState } from 'react';
import { Link, } from 'react-router-dom';
import { MdLaptopChromebook, MdTv, } from "react-icons/md";
import { FaRegSnowflake, FaTablet } from "react-icons/fa";
import { ImVideoCamera } from "react-icons/im";
import { FiPrinter } from "react-icons/fi";
import { MdAudiotrack } from "react-icons/md";
import { GiRiceCooker } from "react-icons/gi";
import { BiSolidCctv,BiSolidJoystick } from "react-icons/bi";


const productData = [
  { id: 1, name: "Laptop & Desktop", icon: <MdLaptopChromebook />, category: "laptops" },
  { id: 2, name: "TV & Monitors", icon: <MdTv />, category: "tv-monitors" },
  { id: 3, name: "Air Purifier / Cooler", icon: <FaRegSnowflake />, category: "air-purifiers" },
  { id: 4, name: "Projectors", icon: <ImVideoCamera />, category: "projectors" },
  { id: 5, name: "Playstation 5", icon: <BiSolidJoystick />, category: "ps5" },
  { id: 6, name: "Tablet", icon: <FaTablet />, category: "tablets" },
  { id: 7, name: "Printer & Scanner", icon: <FiPrinter />, category: "printers" },
  { id: 8, name: "Audio & Karaoke", icon: <MdAudiotrack />, category: "audio" },
  { id: 9, name: "Kitchen Products", icon: <GiRiceCooker />, category: "kitchen" },
  { id: 10, name: "Video Conference", icon: <ImVideoCamera />, category: "video-conference" },
  { id: 11, name: "Office Equipments", icon: <MdLaptopChromebook />, category: "office" },
  { id: 12, name: "Security Cameras", icon: <BiSolidCctv />, category: "security" }
];

const ProductList = () => {

  const [selected,setSelected] = useState('');

  const handleSetCategory = (category) =>{
    setSelected(category)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {productData.map((product) => (
          <Link
          onClick={() => handleSetCategory(product.category)}
            key={product.id}
            to={selected && `/rental/${selected}`}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105"
          >
            <div className="text-4xl mb-2 cursor-pointer transform transition-transform hover:scale-105 hover:text-blue-500">{product.icon}</div>
            <h3 className="text-center text-gray-800 font-medium text-sm mb-1  ">
              {product.name}
            </h3>
            <p className="text-center text-blue-600 text-xs">
              {product.description}
            </p>
          </Link>
        ))}
      </div>
    
    </div>
    
  );
};

export default ProductList;