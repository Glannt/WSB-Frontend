import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Select, SelectItem, Slider } from '@nextui-org/react';
import { useNavigate } from 'react-router';
import { Carousel } from './Carouel';

interface Listing {
  id: string;
  name: string;
  type: string;
  building: string;
  price: number;
  images: string[];
}

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:bg-gray-50 transition-colors duration-200">
      <Carousel images={listing.images} />

      <div
        onClick={() => navigate('/room-booking/' + listing.id)}
        className="p-4 cursor-pointer"
      >
        <h2 className="text-xl font-bold mb-2">{listing.name}</h2>
        <span className="text-gray-700">{listing.type}</span>
        <span className="mx-2">•</span>
        <span className="text-gray-700">{listing.building}</span>
        <div className="flex items-center">
          <span className="text-red-600 font-bold">
            {listing.price.toLocaleString()} đ
          </span>
        </div>
      </div>
    </div>
  );
};
