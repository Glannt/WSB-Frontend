import React, { useState } from 'react';
import { Select, SelectItem, Slider } from '@nextui-org/react';
import { ListingCard } from './RoomCard';
import { getAllRoom } from '@/service/room.api';
import { useQuery } from '@tanstack/react-query';
import { ListRooms } from '@/types/roomOverview';
import { useNavigate } from 'react-router';

export const ListRoom = () => {
  const getAllRoomApi = async () => {
    const response = await getAllRoom();
    console.log(response.data.data);

    return response.data.data;
  };
  const {
    data: rooms = [],
    isLoading,
    refetch,
  } = useQuery<ListRooms[]>({
    queryKey: ['rooms'],
    queryFn: getAllRoomApi,
  });

  const images = [
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
  ];

  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState<Set<string>>(
    new Set([''])
  );
  const [selectedRoomType, setSelectedRoomType] = useState<Set<string>>(
    new Set([''])
  );
  const [priceRange, setPriceRange] = useState([0, 20000000]);

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
  const filteredRooms = rooms.filter((room) => {
    const isLocationMatch =
      selectedLocation.has('') || selectedLocation.has(room.building);
    const isRoomTypeMatch =
      selectedRoomType.has('') || selectedRoomType.has(room.roomType);
    const isPriceMatch =
      room.price >= priceRange[0] && room.price <= priceRange[1];
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
          {filteredRooms.map((room) => (
            <ListingCard key={room.roomId} images={images} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};
