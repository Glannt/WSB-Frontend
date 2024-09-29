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

const dummyEquipment: EquipmentItem[] = [
  {
    id: 1,
    name: 'Laptop',
    type: 'Electronics',
    description: 'High-performance laptop for professionals',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
  },
  {
    id: 2,
    name: 'Drill',
    type: 'Tools',
    description: 'Cordless drill with multiple speed settings',
    image:
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 3,
    name: 'Forklift',
    type: 'Machinery',
    description: 'Electric forklift for warehouse operations',
    image:
      'https://images.unsplash.com/photo-1504811519131-4a4d61afa507?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 4,
    name: 'Printer',
    type: 'Office',
    description: 'All-in-one printer with scanning capabilities',
    image:
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 5,
    name: 'Safety Helmet',
    type: 'Safety',
    description: 'Hard hat for construction site protection',
    image:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 6,
    name: 'Desktop Computer',
    type: 'Electronics',
    description: 'Powerful workstation for graphic design',
    image:
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 7,
    name: 'Circular Saw',
    type: 'Tools',
    description: 'Professional-grade circular saw for woodworking',
    image:
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
  },
  {
    id: 8,
    name: 'Conveyor Belt',
    type: 'Machinery',
    description: 'Industrial conveyor system for material handling',
    image:
      'https://images.unsplash.com/photo-1596443686812-2f45229eebc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
  },
  {
    id: 9,
    name: 'Ergonomic Chair',
    type: 'Office',
    description: 'Adjustable office chair for optimal comfort',
    image:
      'https://images.unsplash.com/photo-1589384267710-7a170981ca78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 10,
    name: 'Fire Extinguisher',
    type: 'Safety',
    description: 'Multi-purpose fire extinguisher for emergencies',
    image:
      'https://images.unsplash.com/photo-1596720226872-556eda5983dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  },
];

const EquipmentList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [filteredEquipment, setFilteredEquipment] =
    useState<EquipmentItem[]>(dummyEquipment);
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

  const filterEquipment = () => {
    let filtered = dummyEquipment;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((item) => selectedTypes.includes(item.type));
    }

    setFilteredEquipment(filtered);

    if (filtered.length === 0) {
      setError('No equipment found. Please try a different search or filter.');
    } else {
      setError('');
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const suggestionList = dummyEquipment
        .filter((item) =>
          item.name.toLowerCase().startsWith(value.toLowerCase())
        )
        .map((item) => item.name);
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
            placeholder="Search equipment..."
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
          <div key={item.id} className="border rounded-lg shadow-lg">
            <ImageSlider images={[item.image]} />
            <div className="p-4">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentList;
