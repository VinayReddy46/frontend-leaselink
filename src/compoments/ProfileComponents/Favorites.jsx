
import React from "react";
import { FaRoad, FaUsers, FaGasPump, FaHeart } from "react-icons/fa";
 import img from "../../assets/mycar1.jpg";
 import img1 from "../../assets/bmw.jpg";
 import img2 from "../../assets/mycar2.jpg"
 import img3 from "../../assets/mycar3.jpg";
 import img4 from "../../assets/mycar4.jpg";
 import img5 from "../../assets/mycar5.jpg";
const cars = [
  {
    name: "Mercedes Benz Car",
    image: img,
    model: "2020",
    seats: "4",
    type: "Hybrid",
    mileage: "10.15km / 1-litre",
    transmission: "Automatic",
  },
  {
    name: "Audi R8 Car",
    image: img1,
    model: "2020",
    seats: "4",
    type: "Hybrid",
    mileage: "10.15km / 1-litre",
    transmission: "Automatic",
  },
  {
    name: "Mercedes Benz Car",
    image: img2,
    model: "2020",
    seats: "4",
    type: "Hybrid",
    mileage: "10.15km / 1-litre",
    transmission: "Automatic",
  },
  {
    name: "Audi R8 Car",
    image: img3,
    model: "2020",
    seats: "4",
    type: "Hybrid",
    mileage: "10.15km / 1-litre",
    transmission: "Automatic",
  },
  {
    name: "Mercedes Benz Car",
    image: img4,
    model: "2020",
    seats: "4",
    type: "Hybrid",
    mileage: "10.15km / 1-litre",
    transmission: "Automatic",
  },
  {
    name: "Audi R8 Car",
    image: img5,
    model: "2020",
    seats: "4",
    type: "Hybrid",
    mileage: "10.15km / 1-litre",
    transmission: "Automatic",
  },
];

export default function CarRental() {
  return (
    <div className="bg-gray-100 flex justify-center py-10">
      <div className="w-[90%] max-w-5xl">
        <div className="grid md:grid-cols-2 gap-6">
          {cars.map((car, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <img src={car.image} className="rounded-lg w-full" alt={car.name} />
              <div className="flex items-center justify-between mt-3">
                <h2 className="text-xl font-semibold">{car.name}</h2>
                <div className="flex items-center text-yellow-500 text-sm">⭐ 5.0</div>
              </div>
              <div className="text-gray-600 text-sm mt-2 flex flex-wrap items-center gap-2">
                <FaRoad /> Model: {car.model} &nbsp;
                <FaUsers /> {car.seats} People &nbsp;
                <FaGasPump /> {car.type} &nbsp;
                {car.mileage} • {car.transmission}
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold text-blue-600">$390 / month</span>
                <div className="flex items-center gap-3">
                  <FaHeart className="text-gray-400 hover:text-red-500 cursor-pointer text-xl" />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Rent Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">Load More</button>
        </div>
      </div>
    </div>
  );
}
