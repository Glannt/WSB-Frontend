import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Select, SelectItem, Slider } from '@nextui-org/react';
import { useNavigate } from 'react-router';
import { ListingCard } from './RoomCard';

export const ListRoom = () => {
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState<Set<string>>(
    new Set([''])
  );
  const [selectedRoomType, setSelectedRoomType] = useState<Set<string>>(
    new Set([''])
  );
  const [priceRange, setPriceRange] = useState([0, 20000000]);

  const listings = [
    {
      id: 'D01',
      name: 'Văn phòng S03',
      type: 'Văn phòng riêng',
      building: 'Đà Nẵng City Centre',
      price: 5000000,
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
      ],
    },
    {
      id: 'D02',
      name: 'Văn phòng S04',
      type: 'Văn phòng riêng',
      building: 'Hồ Chí Minh',
      price: 7000000,
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
      ],
    },
    {
      id: 'D03',
      name: 'Phòng Họp 1',
      type: 'Phòng họp',
      building: 'Đà Nẵng City Centre',
      price: 12000000,
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
      ],
    },
    {
      id: 'D04',
      name: 'Phòng Họp 2',
      type: 'Phòng họp',
      building: 'Hồ Chí Minh',
      price: 15000000,
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
      ],
    },
  ];

  const buildingOptions = [
    { key: 'Hồ Chí Minh', label: 'Hồ Chí Minh' },
    { key: 'Đà Nẵng City Centre', label: 'Đà Nẵng City Centre' },
  ];

  const roomTypeOptions = [
    { key: 'Văn phòng riêng', label: 'Văn phòng riêng' },
    { key: 'Phòng họp', label: 'Phòng họp' },
  ];

  const handleLocationChange = (e: any) => {
    setSelectedLocation(new Set(e.target.value.split(',')));
    console.log(e.target.value.split(','));
  };

  const handleRoomTypeChange = (e: any) => {
    setSelectedRoomType(new Set(e.target.value.split(',')));
    console.log(e.target.value.split(','));
  };

  const handlePriceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange(value);
    }
  };

  // Hàm lọc danh sách phòng
  const filteredListings = listings.filter((listing) => {
    const isLocationMatch =
      selectedLocation.has('') || selectedLocation.has(listing.building);
    const isRoomTypeMatch =
      selectedRoomType.has('') || selectedRoomType.has(listing.type);
    const isPriceMatch =
      listing.price >= priceRange[0] && listing.price <= priceRange[1];
    return isLocationMatch && isRoomTypeMatch && isPriceMatch;
  });

  return (
    <div className="flex-row lg:flex-row bg-white">
      {/* Left Panel */}
      <div className="flex justify-start lg:w-full p-6 bg-white">
        <Select
          label="Địa điểm"
          placeholder="Chọn địa điểm"
          selectionMode="multiple"
          className="max-w-xs mx-4"
          // onSelectionChange={handleLocationChange}
          onChange={handleLocationChange}
        >
          {buildingOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>

        <Select
          label="Loại Phòng"
          placeholder="Chọn loại phòng"
          selectionMode="multiple"
          className="max-w-xs mx-4"
          // onSelectionChange={handleRoomTypeChange}
          onChange={handleRoomTypeChange}
        >
          {roomTypeOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>

        <Slider
          label="Giá tiền"
          step={50000}
          maxValue={20000000}
          minValue={0}
          defaultValue={priceRange}
          onChange={handlePriceRangeChange}
          showSteps={true}
          showTooltip={true}
          showOutline={true}
          classNames={{
            base: 'max-w-md',
            thumb: 'bg-gradient-to-r from-secondary-400 to-primary-500',
          }}
          tooltipProps={{
            offset: 10,
            placement: 'bottom',
            classNames: {
              content:
                'py-2 shadow-xl text-white bg-gradient-to-r from-secondary-400 to-primary-500',
            },
          }}
        />
      </div>

      {/* Right Panel */}
      <div className="lg:w-full p-6 overflow-y-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

// interface Listing {
//   id: string;
//   name: string;
//   type: string;
//   building: string;
//   price: number;
//   images: string[];
// }

// interface ListingCardProps {
//   listing: Listing;
// }

// const ListingCard: React.FC<ListingCardProps> = ({ listing }) => (
//   <div className="bg-white rounded-lg shadow-md overflow-hidden hover:bg-gray-50 transition-colors duration-200">
//     <Carousel images={listing.images} />
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">{listing.name}</h2>
//       <span className="text-gray-700">{listing.type}</span>
//       <span className="mx-2">•</span>
//       <span className="text-gray-700">{listing.building}</span>
//       <div className="flex items-center">
//         <span className="text-red-600 font-bold">
//           {listing.price.toLocaleString()} đ
//         </span>
//       </div>
//     </div>
//   </div>
// );

// interface CarouselProps {
//   images: string[];
// }

// const Carousel: React.FC<CarouselProps> = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
//             index === currentIndex ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <img
//             src={image}
//             alt={`Slide ${index + 1}`}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       ))}
//       <button
//         onClick={prevSlide}
//         className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none"
//       >
//         <FaChevronLeft className="text-gray-800" />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none"
//       >
//         <FaChevronRight className="text-gray-800" />
//       </button>
//     </div>
//   );
// };
