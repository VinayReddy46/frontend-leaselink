import React from "react";
import Sidebar from "../compoments/ProfileComponents/Sidebar";
import { Outlet } from "react-router-dom";
import sidebarStyles from "../compoments/ProfileComponents/sidebar.module.css";
import img from "../assets/car.jpg";

const Content = () => {
  return (
    <>
      {/* Banner Section */}
      <section>
        <div className={`${sidebarStyles.bannerimg} relative w-full h-[500px]`}>
          <img src={img} alt="banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-4">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
              Home / My Profile
            </button>
          </div>
        </div>
      </section>

      {/* Sidebar + Outlet Section */}
      <section className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <Sidebar />
          </div>

          {/* Outlet (Profile Content) */}
          <div className="w-full md:w-3/4">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default Content;
