import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className=" px-4 py-16">
      <div className="flex flex-col md:flex-row items-center gap-x-32 w-full">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src="https://workflow.com.vn/wp-content/uploads/2024/05/z5404832229897_c592108c054d4505476d97f2bbd6f86e-4.png"
            alt="Modern and spacious room"
            className="w-full h-auto rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105 object-contain"
          />
        </div>
        <div className="md:w-1/2 md:pl-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            Phòng hiện đại và rộng rãi
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Phòng của chúng tôi được thiết kế với tâm huyết và tinh tế, mang đến
            không gian sống thoải mái và hiện đại cho bạn.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-black rounded-full p-2 mr-4">
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
                {/* vietnamese */}
                Đầy đủ tiện nghi
              </span>
            </div>
            <div className="flex items-center">
              <div className="bg-black rounded-full p-2 mr-4">
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
                Thiết bị chất lượng cao
              </span>
            </div>
            <div className="flex items-center">
              <div className="bg-black rounded-full p-2 mr-4">
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
                Dịch vụ chăm sóc khách hàng tận tình
              </span>
            </div>
          </div>
          <button className="mt-8 bg-blackA12 text-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-black hover:shadow-2xl transition duration-300 ease-in-out flex items-center">
            Khám phá thêm
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
