import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImVideoCamera } from "react-icons/im";
import { FiPrinter } from "react-icons/fi";
import { MdAudiotrack } from "react-icons/md";
import { BiSolidCctv, BiSolidJoystick } from "react-icons/bi";
import { useGetCategoriesQuery } from "../../../redux/services/categoriesSlice";
import {
  MdLaptopChromebook,
  MdTv,
  MdPhoneIphone,
  MdWatch,
  MdHeadset,
  MdCameraAlt,
} from "react-icons/md";
import {
  FaRegSnowflake,
  FaTablet,
  FaGamepad,
  FaBlender,
  FaFan,
  FaLightbulb,
} from "react-icons/fa";
import {
  GiRiceCooker,
  GiVacuumCleaner,
  GiWashingMachine,
} from "react-icons/gi";
import { Skeleton } from "primereact/skeleton";

// const productData = [
//   {
//     id: 1,
//     name: "Laptop & Desktop",
//     icon: <MdLaptopChromebook />,
//     category: "laptops",
//   },
//   { id: 2, name: "TV & Monitors", icon: <MdTv />, category: "tv-monitors" },
//   {
//     id: 3,
//     name: "Air Purifier / Cooler",
//     icon: <FaRegSnowflake />,
//     category: "air-purifiers",
//   },
//   {
//     id: 4,
//     name: "Projectors",
//     icon: <ImVideoCamera />,
//     category: "projectors",
//   },
//   { id: 5, name: "Playstation 5", icon: <BiSolidJoystick />, category: "ps5" },
//   { id: 6, name: "Tablet", icon: <FaTablet />, category: "tablets" },
//   {
//     id: 7,
//     name: "Printer & Scanner",
//     icon: <FiPrinter />,
//     category: "printers",
//   },
//   { id: 8, name: "Audio & Karaoke", icon: <MdAudiotrack />, category: "audio" },
//   {
//     id: 9,
//     name: "Kitchen Products",
//     icon: <GiRiceCooker />,
//     category: "kitchen",
//   },
//   {
//     id: 10,
//     name: "Video Conference",
//     icon: <ImVideoCamera />,
//     category: "video-conference",
//   },
//   {
//     id: 11,
//     name: "Office Equipments",
//     icon: <MdLaptopChromebook />,
//     category: "office",
//   },
//   {
//     id: 12,
//     name: "Security Cameras",
//     icon: <BiSolidCctv />,
//     category: "security",
//   },
// ];

const EmptySkeleton = () => {
  const items = Array.from({ length: 5 }, (v, i) => i);
  return (
    <>
      {items.map((each, ind) => (
        <Skeleton key={ind} width="10rem" height="7rem" />
      ))}
    </>
  );
};
const ProductList = () => {
  const [selected, setSelected] = useState("");
  const { data: categoriesData, isLoading, error } = useGetCategoriesQuery();
  // const [productData, setproductData] = useState([]);
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/productData") // Replace with your API URL
  //     .then((response) => {
  //       setproductData(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     });
  // }, []);
  // if (loading) {
  //   return <p>Loading productData...</p>;
  // }

  const handleSetCategory = (category) => {
    setSelected(category);
  };

  const iconMapping = {
    LaptopChromebook: <MdLaptopChromebook />,
    Tv: <MdTv />,
    Snowflake: <FaRegSnowflake />,
    Tablet: <FaTablet />,
    VideoCamera: <ImVideoCamera />,
    Printer: <FiPrinter />,
    Audiotrack: <MdAudiotrack />,
    RiceCooker: <GiRiceCooker />,
    Cctv: <BiSolidCctv />,
    Joystick: <BiSolidJoystick />,
    Phone: <MdPhoneIphone />,
    Watch: <MdWatch />,
    Headset: <MdHeadset />,
    Camera: <MdCameraAlt />,
    Gamepad: <FaGamepad />,
    Blender: <FaBlender />,
    Fan: <FaFan />,
    Lightbulb: <FaLightbulb />,
    VacuumCleaner: <GiVacuumCleaner />,
    WashingMachine: <GiWashingMachine />,
    // Fridge: <BiFridge />,
  };
  const iconOptions = Object.keys(iconMapping).map((key) => ({
    label: key,
    value: key,
    icon: iconMapping[key],
  }));
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {categoriesData?.categories ? (
          categoriesData?.categories.map((product) => (
            <Link
              onClick={() => handleSetCategory(product.category)}
              key={product.id}
              to={`/rental/${product._id}`}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="text-4xl mb-2 cursor-pointer transform transition-transform hover:scale-105 hover:text-blue-500">
                {iconMapping[product.icon]}
              </div>
              <h3 className="text-center text-gray-800 font-medium text-sm mb-1  ">
                {product.name}
              </h3>
              <p className="text-center text-blue-600 text-xs">
                {product.description}
              </p>
            </Link>
          ))
        ) : (
          <EmptySkeleton />
        )}
      </div>
    </div>
  );
};

export default ProductList;
