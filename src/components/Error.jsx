import { ArrowLeftIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import React from "react";
import logo from "../assets/logo-dark.svg";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-16">
      <div className="min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative">
        <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
          <div className="w-full md:w-1/2">
            <div className="mb-10 lg:mb-20">
              <img src={logo} alt="logo" className="h-16 -rotate-12" />
            </div>
            <div className="mb-10 md:mb-20 text-gray-600 font-light">
              <h1 className="font-black uppercase text-3xl lg:text-5xl text-indigo-500 mb-10">Please log in to continue.</h1>
              <p>The page you're looking for isn't available.</p>
              <p>You may wanna check your internet connection and try refreshing page.</p>
            </div>
            <div className="mb-20 md:mb-0">
              <button
                onClick={() => navigate(-1)}
                className="text-lg font-light outline-none focus:outline-none transform transition-all hover:scale-110 text-indigo-500 hover:text-indigo-600"
              >
                <ArrowLeftIcon className="" />
                Go Back
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center">
            <div className="mb-20 md:mb-0">
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/auth/login");
                  window.location.reload()
                }}
                className="text-4xl font-light outline-none focus:outline-none transform transition-all hover:scale-110 text-[#66a392] hover:text-[#87c1bb]"
              >
                <ArrowLeftOnRectangleIcon className="" />
                Login
              </button>
            </div>
          </div>
        </div>
        <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
        <div className="w-96 h-full bg-yellow-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
      </div>
    </div>
  );
};

export default Error;
