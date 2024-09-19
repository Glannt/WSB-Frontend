import React, { useState, useEffect } from 'react';
import { FaSearch, FaSort } from 'react-icons/fa';

export const ListFood = () => {
  const [foods, setFoods] = useState([
    {
      id: 1,
      name: 'Pizza',
      price: 12.99,
      status: 'available',
      image:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 2,
      name: 'Burger',
      price: 8.99,
      status: 'available',
      image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 3,
      name: 'Sushi',
      price: 15.99,
      status: 'unavailable',
      image:
        'https://images.unsplash.com/photo-1563612116625-3012372fccce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 4,
      name: 'Salad',
      price: 7.99,
      status: 'available',
      image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 5,
      name: 'Steak',
      price: 24.99,
      status: 'available',
      image:
        'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceRangeChange = (e: any) => {
    setPriceRange({ ...priceRange, [e.target.name]: Number(e.target.value) });
  };

  const handleStatusFilterChange = (e: any) => {
    setStatusFilter(e.target.value);
  };

  const handleSortChange = (e: any) => {
    setSortBy(e.target.value);
  };

  const filteredFoods = foods
    .filter(
      (food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        food.price >= priceRange.min &&
        food.price <= priceRange.max &&
        (statusFilter === 'all' || food.status === statusFilter)
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        return a.price - b.price;
      }
      return 0;
    });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Food Listing</h1>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search foods..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search foods"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="minPrice" className="text-sm font-medium">
            Min Price:
          </label>
          <input
            type="number"
            id="minPrice"
            name="min"
            value={priceRange.min}
            onChange={handlePriceRangeChange}
            className="w-20 px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="maxPrice" className="text-sm font-medium">
            Max Price:
          </label>
          <input
            type="number"
            id="maxPrice"
            name="max"
            value={priceRange.max}
            onChange={handlePriceRangeChange}
            className="w-20 px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>

        <select
          value={sortBy}
          onChange={handleSortChange}
          className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Sort by"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
            tabIndex={0}
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{food.name}</h2>
              <p className="text-gray-600 mb-2">${food.price.toFixed(2)}</p>
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${food.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              >
                {food.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No foods found matching your criteria.
        </p>
      )}
    </div>
  );
};
