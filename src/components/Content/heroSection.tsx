import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className=" px-4 py-16 w-screen">
      <div className="flex flex-col md:flex-row items-center gap-x-32 w-full">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
            alt="Modern and spacious room"
            className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 object-contain"
          />
        </div>
        <div className="md:w-1/2 md:pl-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            Discover Your Perfect Space
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Experience the epitome of comfort and style in our meticulously
            designed room spaces. From cozy corners to expansive layouts, we
            offer the perfect blend of functionality and aesthetics to suit your
            unique needs.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-full p-2 mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <span className="text-lg text-gray-700">
                Thoughtfully designed layouts
              </span>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-full p-2 mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <span className="text-lg text-gray-700">
                High-quality furnishings
              </span>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-full p-2 mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <span className="text-lg text-gray-700">
                Ample natural lighting
              </span>
            </div>
          </div>
          <button className="mt-8 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out flex items-center">
            Explore Rooms
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
