import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Select, SelectItem, Slider } from '@nextui-org/react';
import { useNavigate } from 'react-router';
import { Carousel } from './Carouel';
import { ListRooms } from '@/types/roomOverview';

// interface Listing {
//   id: string;
//   name: string;
//   type: string;
//   building: string;
//   price: number;
//   images: string[];
// }

interface ListingCardProps {
  // listing: Listing;
  room: ListRooms;
  images: string[];
}

export const ListingCard: React.FC<ListingCardProps> = ({ room, images }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:bg-gray-50 transition-colors duration-200">
      <Carousel images={images} />

      <div
        onClick={() => navigate('/room-detail/' + room.roomId)}
        className="p-4 cursor-pointer"
      >
        <h2 className="text-xl font-bold mb-2">{room.roomName}</h2>
        <span className="text-gray-700">{room.roomType}</span>
        <span className="mx-2">•</span>
        <span className="text-gray-700">{room.building}</span>
        <div className="flex items-center">
          <span className="text-red-600 font-bold">
            {room.price.toLocaleString()} đ
          </span>
        </div>
      </div>
    </div>
  );
};
