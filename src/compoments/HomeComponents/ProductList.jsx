import React from 'react';
import { Link, } from 'react-router-dom';
import { MdLaptopChromebook, MdTv, } from "react-icons/md";
import { FaRegSnowflake, FaTablet } from "react-icons/fa";
import { ImVideoCamera } from "react-icons/im";
import { FiPrinter } from "react-icons/fi";
import { MdAudiotrack } from "react-icons/md";
import { GiRiceCooker } from "react-icons/gi";
import { BiSolidCctv,BiSolidJoystick } from "react-icons/bi";


const productData = [
  {
    id: 1,
    name: "Laptop & Desktop",
    icon: <MdLaptopChromebook />,
    route: "/laptops",
    description: "Rent Now!"
  },
  {
    id: 2,
    name: "TV & Monitors",
    icon: <MdTv/>,
    route: "/tv-monitors",
    description: "Rent Now!"
  },
  {
    id: 3,
    name: "Air Purifier / Cooler",
    icon:  <FaRegSnowflake/>,
    route: "/air-purifiers",
    description: "Rent Now!"
  },
  {
    id: 4,
    name: "Projectors",
    icon: <ImVideoCamera />,
    route: "/projectors",
    description: "Rent Now!"
  },
  {
    id: 5,
    name: "Playstation 5",
    icon: <BiSolidJoystick />,
    route: "/ps5",
    description: "Rent Now!"
  },
  {
    id: 6,
    name: "Tablet",
    icon: <FaTablet />,
    route: "/tablets",
    description: "Rent Now!"
  },
  {
    id: 7,
    name: "Printer & Scanner",
    icon: <FiPrinter />,
    route: "/printers",
    description: "Rent Now!"
  },
  {
    id: 8,
    name: "Audio & Karaoke",
    icon: <MdAudiotrack/>,
    route: "/audio",
    description: "Rent Now!"
  },
  {
    id: 9,
    name: "Kitchen Products",
    icon: <GiRiceCooker /> ,
    route: "/kitchen",
    description: "Rent Now!"
  },
  {
    id: 10,
    name: "Video Conference",
    icon: < ImVideoCamera />,
    route: "/video-conference",
    description: "Rent Now!"
  },
  {
    id: 11,
    name: "Office Equipments",
    icon: <MdLaptopChromebook />,
    route: "/office",
    description: "Rent Now!"
  },
  {
    id: 12,
    name: "Security Cameras",
    icon: <BiSolidCctv />,
    route: "/security",
    description: "Coming Soon!"
  }
];

const ProductList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {productData.map((product) => (
          <Link
            key={product.id}
            to={product.route}
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