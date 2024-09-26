import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Room {
  name: string;
  description: string;
  image: string;
}

const RoomDecription: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const rooms: Room[] = [
    {
      name: 'Phòng Deluxe',
      description: 'Phòng Deluxe sang trọng với view thành phố tuyệt đẹp.',
      image:
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    },
    {
      name: 'Phòng Suite',
      description: 'Phòng Suite rộng rãi với không gian riêng biệt.',
      image:
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
      name: 'Phòng Gia đình',
      description:
        'Phòng Gia đình thoải mái với đầy đủ tiện nghi cho cả gia đình.',
      image:
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
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
    <div className="flex flex-col md:flex-row w-full h-500px bg-gray-100">
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
              className="w-full h-auto object-cover flex-shrink-0"
            />
          ))}
        </div>
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FaChevronLeft className="text-2xl text-gray-800" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FaChevronRight className="text-2xl text-gray-800" />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {rooms.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-start bg-white">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 transition-all duration-500">
          {rooms[currentIndex].name}
        </h2>
        <p className="text-lg text-gray-600 transition-all duration-500">
          {rooms[currentIndex].description}
        </p>
      </div>
    </div>
  );
};

export default RoomDecription;
