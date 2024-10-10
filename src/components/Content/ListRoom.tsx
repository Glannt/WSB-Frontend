import React, { useState } from 'react';
import {
  FaSearch,
  FaUser,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
  FaRulerCombined,
} from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import {
  DatePicker,
  Input,
  Select,
  SelectItem,
  Slider,
} from '@nextui-org/react';
import { Button, Card } from '@nextui-org/react';
import { useNavigate } from 'react-router';

export const ListRoom = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('07:00');
  const [selectedDate, setSelectedDate] = useState('');
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Cozy Single', category: 'single', basePrice: 50 },
    { id: 2, name: 'Spacious Double', category: 'double', basePrice: 80 },
    { id: 3, name: 'Meeting Room (7)', category: 'meeting7', basePrice: 120 },
    { id: 4, name: 'Meeting Room (10)', category: 'meeting10', basePrice: 150 },
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTimeSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeSlot(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const calculateAdjustedPrice = (basePrice: number) => {
    const hour = parseInt(selectedTimeSlot.split(':')[0]);
    let multiplier = 1;
    if (hour >= 7 && hour < 10) multiplier = 0.8;
    else if (hour >= 10 && hour < 16) multiplier = 1.2;
    else if (hour >= 16 && hour < 22) multiplier = 1.5;
    return Math.round(basePrice * multiplier);
  };

  const filteredRooms = rooms.filter((room) => {
    return (
      room.category.includes(selectedCategory) &&
      room.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  interface CarouselProps {
    images: string[];
  }
  const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };

    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };

    return (
      <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none"
        >
          <FaChevronLeft className="text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none"
        >
          <FaChevronRight className="text-gray-800" />
        </button>
      </div>
    );
  };

  const listings = [
    {
      id: 'D01',
      name: 'Văn phòng S03',
      type: 'Văn phòng riêng',
      building: 'Đà Nẵng City Centre',
      price: '5,000,000',
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
      building: 'Đà Nẵng City Centre',
      price: '5,000,000',
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
      ],
    },
    {
      id: 'D03',
      name: 'Văn phòng S05',
      type: 'Văn phòng riêng',
      building: 'Đà Nẵng City Centre',
      price: '5,000,000',
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
      ],
    },
    {
      id: 'D04',
      name: 'Văn phòng S06',
      type: 'Văn phòng riêng',
      building: 'Đà Nẵng City Centre',
      price: '5,000,000',
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
      ],
    },
    // Add more listings as needed
  ];

  interface Listing {
    id: string;
    name: string;
    type: string;
    building: string;
    price: string;
    images: string[];
  }
  interface ListingCardProps {
    listing: Listing;
  }
  const ListingCard: React.FC<ListingCardProps> = ({ listing }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:bg-gray-50 transition-colors duration-200">
      <Carousel images={listing.images} />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{listing.id}</h2>
        <span className="text-gray-700 mr-4">{listing.name}</span>
        <div className="flex items-center mb-2">
          {/* <FaRulerCombined className="text-gray-500 mr-2" /> */}

          {/* <FaUser className="text-gray-500 mr-2" /> */}
          <span className="text-gray-700">{listing.building}</span>
        </div>
        <div className="flex items-center">
          {/* <span className="text-gray-500 line-through mr-2">
            {listing.originalPrice} đ
          </span> */}
          <span className="text-red-600 font-bold">{listing.price} đ</span>
        </div>
      </div>
    </div>
  );
  const building = [
    { key: '1', label: 'Hồ Chí Minh' },
    { key: '2', label: 'Đà Nẵng City Centre' },
  ];
  return (
    <div className="flex-row lg:flex-row bg-white">
      {/* Left Panel */}
      <div className="flex justify-start lg:w-full p-6 bg-white">
        <Select
          label="Địa điểm"
          placeholder="Chọn địa điểm"
          selectionMode="multiple"
          className="max-w-xs mx-4"
        >
          {building.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <Select
          label="Loại Phòng"
          placeholder="Chọn loại phòng"
          selectionMode="multiple"
          className="max-w-xs mx-4"
        >
          {building.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <Slider
          label="Giá tiền"
          step={50000}
          maxValue={1000000}
          minValue={0}
          defaultValue={[0, 800]}
          showSteps={true}
          showTooltip={true}
          showOutline={true}
          disableThumbScale={true}
          formatOptions={{ style: 'currency', currency: 'VND' }}
          tooltipValueFormatOptions={{
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0,
          }}
          classNames={{
            base: 'max-w-md',
            // filler: 'bg-gradient-to-r from-primary-500 to-secondary-400',
            labelWrapper: 'mb-2',
            label: 'font-medium text-default-700 text-medium',
            value: 'font-medium text-default-500 text-small',
            thumb: [
              'transition-size',
              'bg-gradient-to-r from-secondary-400 to-primary-500',
              'data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20',
              'data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6',
            ],
            step: 'data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50',
          }}
          tooltipProps={{
            offset: 10,
            placement: 'bottom',
            classNames: {
              base: [
                // arrow color
                'before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500',
              ],
              content: [
                'py-2 shadow-xl',
                'text-white bg-gradient-to-r from-secondary-400 to-primary-500',
              ],
            },
          }}
        />
        {/* <h2 className="text-2xl font-bold mb-6">Room Search</h2>
        <div className="relative mb-4">
          <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search rooms"
            className="mb-4 rounded-xl"
            fullWidth
          />
        </div> */}

        <div className="">
          {/* <h3 className="text-lg font-semibold mb-2">Categories</h3> */}
          <div className="flex flex-wrap gap-2">
            {/* <Button
              onClick={() => handleCategoryChange('')}
              color={selectedCategory === '' ? 'primary' : 'default'}
              className="rounded-2xl shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              All
            </Button>
            <Button
              onClick={() => handleCategoryChange('single')}
              color={selectedCategory === 'single' ? 'primary' : 'default'}
              className="rounded-2xl shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Single
            </Button>
            <Button
              onClick={() => handleCategoryChange('double')}
              color={selectedCategory === 'double' ? 'primary' : 'default'}
              className="rounded-2xl shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Double
            </Button>
            <Button
              onClick={() => handleCategoryChange('meeting7')}
              color={selectedCategory === 'meeting7' ? 'primary' : 'default'}
              className="rounded-2xl shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Meeting (7)
            </Button>
            <Button
              onClick={() => handleCategoryChange('meeting10')}
              color={selectedCategory === 'meeting10' ? 'primary' : 'default'}
              className="rounded-2xl shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Meeting (10)
            </Button> */}
          </div>
        </div>
      </div>

      <div className="lg:w-full p-6 overflow-y-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>

      {/* Right Panel */}
      {/* <div className="lg:w-full p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => (
            <Card
              key={room.id}
              isHoverable
              isPressable
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
              <p className="text-gray-600 mb-2">
                Category:{' '}
                {room.category.charAt(0).toUpperCase() + room.category.slice(1)}
              </p>
              <p className="text-2xl font-bold text-blue-600">
                ${calculateAdjustedPrice(room.basePrice)}
              </p>
              <ul className="mt-2 text-sm text-gray-500">
                <li>Free Wi-Fi</li>
                <li>Air Conditioning</li>
                <li>24/7 Support</li>
              </ul>
              <Button
                className="mt-8 bg-blackA12 text-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-black hover:shadow-2xl transition duration-300 ease-in-out flex items-center w-full"
                color="primary"
                onPress={() => navigate(`/room-detail/${room.id}`)}
              >
                Book Now
              </Button>
            </Card>
          ))}
        </div>
      </div> */}
    </div>
  );
};
