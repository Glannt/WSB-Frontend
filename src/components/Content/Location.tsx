import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const Location = () => {
  const navigate = useNavigate();
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
      name: 'FPT WorkSpace',
      address: '01 Khu CNC, Thu Duc',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4620109147554!2d106.79240238491266!3d10.852421630217462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175274103e53973%3A0xa6e53a8587e21c91!2zMSDEkC4gRDEsIFBoxrDhu51uZyBUw6JuIFBow7osIFF14bqtbiA5LCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2sus!4v1729959389573!5m2!1svi!2sus',
    },
    {
      id: 2,
      name: 'FPT NVH',
      address: '100 Le Van Viet',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5664434319997!2d106.78327977583895!3d10.844453457933579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752713d6664815%3A0xc94c9bae67924dee!2zMTAwIEzDqiBWxINuIFZp4buHdCwga2h1IHBo4buRIDUsIFF14bqtbiA5LCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2sus!4v1729959508785!5m2!1svi!2sus',
    },
  ];

  const filteredFacilities = facilities.filter((facility) =>
    facility.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        Workspace ở Thành phố Hồ Chí Minh
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Khám phá không gian làm việc hiện đại tại Thành phố Hồ Chí Minh, một
        trung tâm kinh tế sôi động, hoàn hảo cho các doanh nghiệp, người làm
        việc tự do và nhóm.
      </p>

      {/* <div className="mb-8">
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
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Các cơ sở có sẵn</h2>
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
                <div className="flex justify-end">
                  <button
                    className="underline text-black px-2 py-2 rounded-lg transition-colors duration-300"
                    onClick={() => navigate(`/building-${facility.id}`)}
                  >
                    Details
                  </button>
                </div>
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
        <h2 className="text-2xl font-semibold mb-4">
          Về Thành phố Hồ Chí Minh
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-600 mb-4">
              Thành phố Hồ Chí Minh trước đây gọi là Sài Gòn, là trung tâm kinh
              tế cường quốc Việt Nam. Đó là một đô thị nhộn nhịp liền mạch pha
              trộn nét quyến rũ truyền thống với sự đổi mới hiện đại, làm cho nó
              trở thành một vị trí lý tưởng cho các doanh nghiệp và doanh nhân.
            </p>
            <p className="text-gray-600">
              Không gian làm việc của chúng tôi tại Thành phố Hồ Chí Minh mang
              đến những không gian làm việc hiện đại cơ sở vật chất, sự sắp xếp
              linh hoạt và một cộng đồng sôi động của các chuyên gia. Cho dù bạn
              là một công ty khởi nghiệp địa phương hay quốc tế công ty, bạn sẽ
              tìm thấy không gian hoàn hảo để phát triển và thịnh vượng trong
              lĩnh vực này thành phố năng động.
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
