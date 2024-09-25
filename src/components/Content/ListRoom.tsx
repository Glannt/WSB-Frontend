import React, { useState } from 'react';
import {
  FaSearch,
  FaUser,
  FaUsers,
  FaCalendarAlt,
  FaClock,
} from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import { Select } from '@radix-ui/react-select';
import { DatePicker, Input } from '@nextui-org/react';
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

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Left Panel */}
      <div className="lg:w-1/3 p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-6">Room Search</h2>
        <div className="relative mb-4">
          <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {/* Search Input */}
          <Input
            placeholder="Search rooms..."
            // contentLeft={<FaSearch />}
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search rooms"
            className="mb-4 rounded-xl"
            fullWidth
            // rounded
          />
        </div>

        {/* Categories */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => handleCategoryChange('')}
              color={selectedCategory === '' ? 'primary' : 'default'}
              // icon={<FaUser />}
              // rounded
              className="rounded-2xl shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              All
            </Button>
            <Button
              onClick={() => handleCategoryChange('single')}
              color={selectedCategory === 'single' ? 'primary' : 'default'}
              // icon={<FaUser />}
              // rounded
              className="rounded-2xl shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Single
            </Button>
            <Button
              onClick={() => handleCategoryChange('double')}
              color={selectedCategory === 'double' ? 'primary' : 'default'}
              // icon={<FaUsers />}
              // rounded
              className="rounded-2xl shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Double
            </Button>
            <Button
              onClick={() => handleCategoryChange('meeting7')}
              color={selectedCategory === 'meeting7' ? 'primary' : 'default'}
              // icon={<MdMeetingRoom />}
              // rounded
              className="rounded-2xl shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Meeting (7)
            </Button>
            <Button
              onClick={() => handleCategoryChange('meeting10')}
              color={selectedCategory === 'meeting10' ? 'primary' : 'default'}
              // icon={<MdMeetingRoom />}
              // rounded
              className="rounded-2xl shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Meeting (10)
            </Button>
          </div>
        </div>

        {/* Time Slot Selection */}
        {/* <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Time Slot</h3>
          <div className="relative">
            <select
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none hover:shadow-md"
              value={selectedTimeSlot}
              onChange={handleTimeSlotChange}
              aria-label="Select time slot"
            >
              {Array.from({ length: 18 }, (_, i) => {
                const hour = i + 7;
                return (
                  <option
                    key={hour}
                    value={`${hour.toString().padStart(2, '0')}:00`}
                  >
                    {`${hour.toString().padStart(2, '0')}:00 - ${(hour + 3).toString().padStart(2, '0')}:00`}
                  </option>
                );
              })}
            </select>
            <FaClock className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div> */}

        {/* Date Selection */}
        {/* <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Date</h3>
          <Input
            type="date"
            fullWidth
            // contentLeft={<FaCalendarAlt />}
            // content
            value={selectedDate}
            onChange={handleDateChange}
            aria-label="Select date"
            // rounded
          />
          <DatePicker
            label="Birth date"
            className="max-w-full rounded-lg hover:shadow-lg"
          />
        </div> */}
      </div>

      {/* Right Panel */}
      <div className="lg:w-2/3 p-6 overflow-y-auto">
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
                onPress={() => navigate(`/room-detail`)}
              >
                Book Now
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
