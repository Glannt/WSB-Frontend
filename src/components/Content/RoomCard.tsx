import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button, Select, SelectItem, Slider } from '@nextui-org/react';
import { useNavigate } from 'react-router';
import { Carousel } from './Carousel';
import { ListRooms, ListRooms2 } from '@/types/roomOverview';

interface ListingCardProps {
  room: ListRooms2;
  images: string[];
}

export const ListingCard: React.FC<ListingCardProps> = ({ room, images }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:bg-gray-50 transition-colors duration-200">
      <Carousel images={images} />

      <div
        // onClick={() => navigate('/room-detail/' + room.roomId)}
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
      <Button
        onClick={() =>
          navigate('/room-booking/' + room.building + '/' + room.roomId)
        }
        className="mx-6 w-auto px-40 bg-black text-white hover:bg-zinc-800 hover:transition hover:duration-500 hover:translate-y-1 mb-5"
      >
        Đặt phòng
      </Button>
    </div>
  );
};
