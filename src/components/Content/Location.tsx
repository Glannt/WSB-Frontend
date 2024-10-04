import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const Location = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<{
    id: number;
    name: string;
    address: string;
    map: string;
  } | null>(null);

  const facilities = [
    {
      id: 1,
      name: 'District 1 Workspace',
      address: '123 Nguyen Hue Boulevard, District 1, Ho Chi Minh City',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.3060219274423!2d-73.98823492346382!3d40.74844097138868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1685158645145!5m2!1sen!2sus',
    },
    {
      id: 2,
      name: 'District 3 Coworking',
      address: '456 Vo Van Tan Street, District 3, Ho Chi Minh City',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.3060219274423!2d-73.98823492346382!3d40.74844097138868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1685158645145!5m2!1sen!2sus',
    },
    {
      id: 3,
      name: 'District 7 Hub',
      address: '789 Nguyen Van Linh Parkway, District 7, Ho Chi Minh City',
      map: 'https://www.gddasdoogle.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.3060219274423!2d-73.98823492346382!3d40.74844097138868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1685158645145!5m2!1sen!2sus',
    },
  ];

  const filteredFacilities = facilities.filter((facility) =>
    facility.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFacilityClick = (facility: {
    id: number;
    name: string;
    address: string;
    map: string;
  }) => {
    setSelectedFacility(facility);
  };

  const mapUrl = selectedFacility
    ? `${selectedFacility.map}`
    : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.3060219274423!2d-73.98823492346382!3d40.74844097138868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1685158645145!5m2!1sen!2sus`;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Workspace in Ho Chi Minh City
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Discover modern workspaces in Ho Chi Minh City, a vibrant economic hub
        perfect for businesses, freelancers, and teams.
      </p>

      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search facilities..."
            className="w-full p-4 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search facilities"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Available Facilities</h2>
          {filteredFacilities.length > 0 ? (
            filteredFacilities.map((facility) => (
              <div
                key={facility.id}
                className="bg-white p-6 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleFacilityClick(facility)}
              >
                <h3 className="text-xl font-semibold mb-2">{facility.name}</h3>
                <p className="text-gray-600 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  {facility.address}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              No facilities found. Please try a different search.
            </p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Location Map</h2>
          <iframe
            src={mapUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Selected Facility Map"
          ></iframe>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">About Ho Chi Minh City</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-600 mb-4">
              Ho Chi Minh City, formerly known as Saigon, is the economic
              powerhouse of Vietnam. It's a bustling metropolis that seamlessly
              blends traditional charm with modern innovation, making it an
              ideal location for businesses and entrepreneurs.
            </p>
            <p className="text-gray-600">
              Our workspaces in Ho Chi Minh City offer state-of-the-art
              facilities, flexible arrangements, and a vibrant community of
              professionals. Whether you're a local startup or an international
              company, you'll find the perfect space to grow and thrive in this
              dynamic city.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Ho Chi Minh City Skyline"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
