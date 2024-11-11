import { getAllBuilding } from '@/service/owner.api';
import { Building } from '@/types/building.type';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router';

const ChooseBuilding = () => {
  const getAllBuildingsApi = async () => {
    const response = await getAllBuilding();
    return response.data.data;
  };

  const {
    data: buildings = [],
    isLoading,
    refetch,
  } = useQuery<Building[]>({
    queryKey: ['buildings'],
    queryFn: getAllBuildingsApi,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const navigate = useNavigate();

  return (
    <>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Chọn cơ sở</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-12 h-auto">
          {buildings.map((building) => (
            <div
              key={building.buildingId}
              onClick={() => {
                navigate(`/owner/${building.buildingId}`);
              }}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={building.buildingImg || 'https://via.placeholder.com/300'}
                alt="Building Image"
                className="w-full h-96 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  {building.buildingName}
                </h2>
                <p className="text-gray-600">
                  Địa chỉ: {building.buildingLocation}
                </p>
                <p className="text-gray-600">
                  Liên hệ: {building.phoneContact}
                </p>
                {/* <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  Chọn Building
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChooseBuilding;
