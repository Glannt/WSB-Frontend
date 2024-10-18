import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MouseEvent,
} from 'react';
import {
  FaSearch,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { getService } from '@/service/customer.api';
import { useQuery } from '@tanstack/react-query';
import { Services } from '@/types/service.type';

// Define types for equipment items
interface EquipmentItem {
  id: number;
  name: string;
  type: string;
  description: string;
  image: string;
}

const equipmentTypes: string[] = [
  'Electronics',
  'Machinery',
  'Tools',
  'Office',
  'Safety',
];

const EquipmentList: React.FC = () => {
  const getServiceApi = async () => {
    const response = await getService();
    return response.data.data;
  };
  const {
    data: services = [],
    isLoading: isLoadingServices,
    refetch: refetchServices,
  } = useQuery<Services[]>({
    queryKey: ['services'],
    queryFn: getServiceApi,
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<Services[]>([]);
  const [error, setError] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const searchBar = searchBarRef.current;
      if (searchBar) {
        const sticky = searchBar.offsetTop;
        if (window.pageYOffset > sticky) {
          searchBar.classList.add('sticky');
        } else {
          searchBar.classList.remove('sticky');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    filterEquipment();
  }, [searchTerm, selectedTypes]);

  useEffect(() => {
    setFilteredEquipment(services);
  }, [services]);

  const filterEquipment = () => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((item) =>
        selectedTypes.includes(item.serviceType)
      );
    }

    setFilteredEquipment(filtered);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const suggestionList = services
        .filter((item) =>
          item.serviceName.toLowerCase().startsWith(value.toLowerCase())
        )
        .map((item) => item.serviceName);
      setSuggestions(suggestionList);
    } else {
      setSuggestions([]);
    }
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  const ImageSlider: React.FC<{ images: string[] }> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

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

    if (isLoadingServices) {
      return <p>Loading...</p>;
    }

    return (
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="Equipment"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full"
          onClick={prevSlide}
        >
          <FaChevronLeft className="text-white" />
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full"
          onClick={nextSlide}
        >
          <FaChevronRight className="text-white" />
        </button>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <div ref={searchBarRef} className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Tìm thiết bị..."
            className="border border-gray-300 rounded-lg p-2 mr-2 w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={clearSearch} className="p-2">
            <FaTimes />
          </button>
        </div>
        {suggestions.length > 0 && (
          <div className="border border-gray-300 rounded-lg p-2 bg-white shadow-lg">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer hover:bg-gray-100 p-2"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex space-x-4 mb-4">
        {equipmentTypes.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg ${
              selectedTypes.includes(type)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => handleTypeToggle(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEquipment.map((item) => (
          <div key={item.serviceId} className="border rounded-lg shadow-lg">
            <ImageSlider images={[item.serviceImg]} />
            <div className="p-4">
              <h3 className="text-xl font-bold">{item.serviceName}</h3>
              <p className="text-gray-600">{}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentList;
