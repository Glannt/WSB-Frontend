import React, { useState } from 'react';
import {
  FaStar,
  FaWifi,
  FaParking,
  FaSwimmingPool,
  FaCoffee,
} from 'react-icons/fa';
import { MdAir, MdTv } from 'react-icons/md';
import { BookingRoomDetail } from './BookingRoomDetail';
import { useNavigate, useParams } from 'react-router';
import path from '@/constants/path';

const RoomDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roomImages = [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  ];

  const amenities = [
    { icon: <FaWifi />, name: 'Free Wi-Fi' },
    { icon: <FaParking />, name: 'Parking' },
    { icon: <FaSwimmingPool />, name: 'Pool' },
    { icon: <FaCoffee />, name: 'Coffee Machine' },
    { icon: <MdAir />, name: 'Air Conditioning' },
    { icon: <MdTv />, name: 'Smart TV' },
  ];

  const similarRooms1 = [
    {
      id: 1,
      name: 'Phòng đơn',
      price: '50',
      image:
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 2,
      name: 'Phòng đôi',
      price: '80',
      image:
        'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
    },

    {
      id: 3,
      name: 'Phòng 7',
      price: '120',
      image:
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
    },
    {
      id: 4,
      name: 'Phòng 10',
      price: '150',
      image:
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
    },
  ];
  const navigate = useNavigate();

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [rooms, setRooms] = useState([
    { id: 1, name: 'Cozy Single', category: 'single', basePrice: 50 },
    { id: 2, name: 'Spacious Double', category: 'double', basePrice: 80 },
    { id: 3, name: 'Meeting Room (7)', category: 'meeting7', basePrice: 120 },
    { id: 4, name: 'Meeting Room (10)', category: 'meeting10', basePrice: 150 },
  ]);

  const { roomId } = useParams<{ roomId: string }>();
  // console.log(roomId);
  const room = rooms.find((room) => room.id === Number(roomId));
  const similarRooms = similarRooms1.filter(
    (room) => room.id !== Number(roomId)
  );
  // console.log(similarRooms);

  if (!room) {
    return <div>Phòng không tồn tại</div>;
  }

  return (
    <div className="bg-white text-black min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={roomImages[selectedImage]}
                alt={`Room Image ${selectedImage + 1}`}
                className="w-full h-[400px] object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
              />
            </div>
            <div className="flex mt-4 gap-2 overflow-x-auto">
              {roomImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover cursor-pointer rounded-md ${index === selectedImage ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>
          <div className="md:w-1/3">
            <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} className="text-yellow-400" />
              ))}
              <span className="ml-2">(4.8/5 based on 120 reviews)</span>
            </div>
            <p className="text-gray-600 mb-4">
              Experience luxury and comfort in our spacious king room. Perfect
              for couples or business travelers seeking a premium stay.
            </p>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Amenities</h2>
              <div className="grid grid-cols-2 gap-2">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <span className="mr-2">{amenity.icon}</span>
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-2 flex justify-end">
              <div>Giá: {room.basePrice}$/slot</div>
            </div>
            <button
              onClick={() => navigate('/room-booking/' + room.id)}
              className="w-full bg-black text-white py-3 rounded-lg font-bold text-lg transition-colors duration-300 hover:bg-white hover:text-black shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label="Book Now"
            >
              Book Now
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Similar Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarRooms.map((room, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{room.name}</h3>
                  <p className="text-gray-600">
                    Starting from {room.price}$/night
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <BookingRoomDetail />
        </div>
      )} */}
    </div>
  );
};

export default RoomDetail;
