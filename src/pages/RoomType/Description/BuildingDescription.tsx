import { Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';

interface Room {
  name: string;
  utilities: string[];
  image: string;
  url: string;
}

const BuildingDescription: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();
  const rooms: Room[] = [
    {
      name: 'Cơ sở 1',
      utilities: [
        'Bàn làm việc đơn rộng rãi',
        'Ghế văn phòng thoải mái',
        'Wi-Fi tốc độ cao',
        'Đèn bàn làm việc',
        'Ổ cắm điện và cổng USB',
        'Màn hình máy tính hỗ trợ',
        'Điều hòa không khí',
        'Hệ thống âm thanh cá nhân',
      ],
      image:
        'https://workflow.com.vn/wp-content/uploads/2024/07/b1f293e72e40e53c6d98a043c1cc3148.png',
      url: '/building-1',
    },
    {
      name: 'Cơ sở 2',
      utilities: [
        'Bàn làm việc cho 2 người',
        '2 ghế văn phòng thoải mái',
        'Wi-Fi tốc độ cao',
        'Đèn bàn làm việc riêng',
        'Màn hình máy tính kép',
        'Bảng ghi chú chung',
        'Điều hòa không khí',
        'Ổ cắm điện và cổng USB riêng',
      ],
      image:
        'https://workflow.com.vn/wp-content/uploads/2024/07/72d7d94d35b0d6bce9ae803e5e5b8975.png',
      url: '/building-2',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % rooms.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + rooms.length) % rooms.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % rooms.length);
  };

  return (
    <div className="flex justify-between flex-col md:flex-row w-full h-500px bg-white gap-11 shadow-2xl">
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-start items-center bg-white">
        <div className="text-3xl font-bold mb-6 ">
          &nbsp;
          {rooms[currentIndex].name}
        </div>

        <div className="flex justify-start pt-11 space-x-8">
          <div className="utility w-1/2 px-4">
            {rooms[currentIndex].utilities
              .slice(0, Math.ceil(rooms[currentIndex].utilities.length / 2))
              .map((utility, idx) => (
                <p
                  key={idx}
                  className="font-bold text-xl text-right text-gray-600 mb-8 leading-relaxed underline decoration-dotted underline-offset-8"
                >
                  {utility}
                </p>
              ))}
          </div>

          <div className="w-[2px] h-64 bg-gray-300"></div>

          <div className="w-1/2 px-4 ">
            {rooms[currentIndex].utilities
              .slice(Math.ceil(rooms[currentIndex].utilities.length / 2))
              .map((utility, idx) => (
                <p
                  key={idx}
                  className="font-bold text-xl text-gray-600 mb-8 leading-relaxed underline decoration-dotted underline-offset-8"
                >
                  {utility}
                </p>
              ))}
          </div>
        </div>
        <div className="flex w-full p-4 justify-center">
          <Button
            onClick={() => navigate(rooms[currentIndex].url)}
            className="pl-7 pr-7 pt-5 pb-5 font-semibold text-lg hover:transition hover:duration-500 hover:bg-transparent hover:border hover:border-blackA7 hover:text-black rounded-lg"
          >
            Tìm hiểu thêm
          </Button>
        </div>
      </div>

      <div className="w-full md:w-1/2 relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {rooms.map((room, index) => (
            <img
              key={index}
              src={room.image}
              alt={room.name}
              className="w-full h-auto object-cover flex-shrink-0 rounded-lg shadow-lg transition-transform duration-300"
            />
          ))}
        </div>
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-0 rounded-full p-2 focus:outline-none "
        >
          <FaChevronLeft className="text-2xl text-gray-800" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-0 rounded-full p-2 focus:outline-none "
        >
          <FaChevronRight className="text-2xl text-gray-800" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {rooms.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-50 opacity-50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuildingDescription;
