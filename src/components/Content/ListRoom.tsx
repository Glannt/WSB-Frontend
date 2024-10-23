import React, { useState } from 'react';
import { Divider, Select, SelectItem, Slider } from '@nextui-org/react';
import { ListingCard } from './RoomCard';
import { getAllRoom } from '@/service/room.api';
import { useQuery } from '@tanstack/react-query';
import { ListRooms } from '@/types/roomOverview';
import { useNavigate } from 'react-router';
import { buildingCustomer } from '@/types/building.type';
import { getAllBuiding } from '@/service/customer.api';

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

  // const [selectedLocation, setSelectedLocation] = useState<Set<string>>(
  //   new Set([''])
  // );
  // const [selectedRoomType, setSelectedRoomType] = useState<Set<string>>(
  //   new Set([''])
  // );
  const [priceRange, setPriceRange] = useState([0, 20000000]);

  const getAllBuidingApi = async () => {
    const response = await getAllBuiding();
    return response.data.data;
  };

  const { data: buildings, isLoading: isLoadingBuildings } = useQuery<
    buildingCustomer[]
  >({
    queryKey: ['buildings'],
    queryFn: getAllBuidingApi,
  });

  const buildingOptions =
    buildings?.map((building) => ({
      key: building.buildingId,
      label: building.buildingName,
    })) || [];

  const roomTypeOptions = [
    { key: 'Văn phòng riêng', label: 'Văn phòng riêng' },
    { key: 'Phòng họp', label: 'Phòng họp' },
  ];

  // const handleLocationChange = (e: any) => {
  //   setSelectedLocation(new Set(e.target.value.split(',')));
  //   console.log(e.target.value.split(','));
  // };

  // const handleRoomTypeChange = (e: any) => {
  //   setSelectedRoomType(new Set(e.target.value.split(',')));
  //   console.log(e.target.value.split(','));
  // };

  const handlePriceRangeChange = (value: number | number[]) => {
    // Ensure that `priceRange` is always an array
    const updatedRange = Array.isArray(value) ? value : [value];
    console.log(updatedRange);

    setPriceRange(updatedRange);
  };

  // Hàm lọc danh sách phòng
  // const filteredRooms = rooms.filter((room) => {
  //   const isLocationMatch =
  //     selectedLocation.has('') || selectedLocation.has(room.building);
  //   const isRoomTypeMatch =
  //     selectedRoomType.has('') || selectedRoomType.has(room.roomType);
  //   const isPriceMatch =
  //     room.price >= priceRange[0] && room.price <= priceRange[1];
  //   return isLocationMatch && isRoomTypeMatch && isPriceMatch;
  // });

  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);

  const handleLocationChange = (keys: any) => {
    const selectedLabels = Array.from(keys as Set<string>).map(
      (key) => buildingOptions.find((option) => option.key === key)?.label
    );
    setSelectedLocations(selectedLabels as string[]);
  };

  // Handle room type change based on label
  const handleRoomTypeChange = (keys: any) => {
    const selectedLabels = Array.from(keys as Set<string>).map(
      (key) => roomTypeOptions.find((option) => option.key === key)?.label
    );
    setSelectedRoomTypes(selectedLabels as string[]);
  };

  // Filter rooms based on selected locations and room types (by label)
  const filteredRooms = rooms.filter((room) => {
    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(room.building);
    const matchesRoomType =
      selectedRoomTypes.length === 0 ||
      selectedRoomTypes.includes(room.roomType);
    const isPriceMatch =
      room.price >= priceRange[0] && room.price <= priceRange[1];
    return matchesLocation && matchesRoomType && isPriceMatch;
  });

  return (
    <>
      <div className="flex-row lg:flex-row bg-white h-screen max-h-screen">
        {/* Left Panel */}
        <div className="flex">
          <div className="w-1/5 mb-auto mt-10 ml-40 mr-20 ">
            <div className="flex justify-start items-stretch lg:w-full p-6 bg-gradient-to-r via-primary-50 from-background to-primary-100 shadow-lg shadow-primary-100 bg-opacity-60 flex-col gap-y-20 border border-gray-300 rounded-xl pb-[450px]">
              <Select
                label="Địa điểm"
                placeholder="Chọn địa điểm"
                selectionMode="multiple"
                variant="underlined"
                className="max-w-xs mx-4"
                onSelectionChange={handleLocationChange}
              >
                {buildingOptions.map((option) => (
                  <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
              </Select>

              <Select
                label="Loại Phòng"
                placeholder="Chọn loại phòng"
                selectionMode="multiple"
                variant="underlined"
                className="max-w-xs mx-4 text-"
                onSelectionChange={handleRoomTypeChange}
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
          </div>
          <Divider orientation="vertical" className="py-10 h-[800px]" />
          <div className="w-4/5 h-[900px] overflow-y-auto scrollbar-hide ml-16">
            {/* Right Panel */}
            <div className="lg:w-full p-4">
              <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredRooms.map((room) => (
                  <div className="rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
                    <ListingCard
                      key={room.roomId}
                      images={images}
                      room={room}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
