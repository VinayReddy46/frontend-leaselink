import React, { useState } from "react";
import car1 from "../../assets/mycar1.jpg";
import car2 from "../../assets/mycar2.jpg";
import car3 from "../../assets/mycar3.jpg";
import car4 from "../../assets/mycar4.jpg";
import car5 from "../../assets/mycar5.jpg";
import car6 from "../../assets/mycar1.jpg";
import car7 from "../../assets/mycar2.jpg";
import car8 from "../../assets/mycar3.jpg";
import car9 from "../../assets/mycar4.jpg";

const carData = [
  { id: 1, image: car1, name: "Toyota Sports Car", year: 2020, transmission: "Automatic", fuel: "Hybrid", price: "$600" },
  { id: 2, image: car2, name: "Toyota Sports Car", year: 2020, transmission: "Automatic", fuel: "Hybrid", price: "$600" },
  { id: 3, image: car3, name: "Toyota Sports Car", year: 2020, transmission: "Automatic", fuel: "Hybrid", price: "$600" },
  { id: 4, image: car4, name: "Toyota Sports Car", year: 2020, transmission: "Automatic", fuel: "Hybrid", price: "$600" },
  { id: 5, image: car5, name: "Toyota Sports Car", year: 2020, transmission: "Automatic", fuel: "Hybrid", price: "$600" },
  { id: 6, image: car6, name: "Toyota Sports Car", year: 2020, transmission: "Automatic", fuel: "Hybrid", price: "$600" },
  { id: 7, image: car7, name: "Toyota Sports Car", year: 2020, transmission: "Automatic", fuel: "Hybrid", price: "$600" },
  { id: 8, image: car8, name: "Toyota Sports Car", year: 2020, transmission: "Automatic", fuel: "Hybrid", price: "$600" },
  { id: 9, image: car9, name: "Toyota Sports Car", year: 2020, transmission: "Automatic", fuel: "Hybrid", price: "$600" },
];

const itemsPerPage = 5;

const MyCarListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(carData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCars = carData.slice(startIndex, startIndex + itemsPerPage);

  const goToPrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPage = (page) => setCurrentPage(page);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h4 className="text-2xl font-semibold mb-6">My Car Listing</h4>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="p-3 border">Car Info</th>
                <th className="p-3 border">Year</th>
                <th className="p-3 border">Transmission</th>
                <th className="p-3 border">Fuel Type</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCars.map((car) => (
                <tr key={car.id} className="border-b hover:bg-gray-100">
                  <td className="p-3 flex items-center space-x-3">
                    <img src={car.image} alt={car.name} className="w-16 h-16 rounded object-cover" />
                    <span>{car.name}</span>
                  </td>
                  <td className="p-3 text-gray-700">{car.year}</td>
                  <td className="p-3 text-gray-700">{car.transmission}</td>
                  <td className="p-3 text-gray-700">{car.fuel}</td>
                  <td className="p-3 text-gray-700 font-semibold">{car.price}</td>
                  <td className="p-3">
                    <button className="text-red-500 hover:text-red-700 text-xl">❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={goToPrevious}
            className={`px-4 py-2 rounded-md text-white ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={goToNext}
            className={`px-4 py-2 rounded-md text-white ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyCarListing;

