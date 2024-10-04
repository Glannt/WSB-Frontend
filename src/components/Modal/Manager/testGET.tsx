import { getAllRoom } from '@/service/manager.api'; // API service to get rooms data
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

// Interface definition for a Room
interface Room {
  id: number;
  roomName: string;
  price: number;
  status: string;
  roomType: string;
  // staff: string[]; // Assuming staff is a list of strings (names or IDs)
}

const RoomsList = () => {
  const [rooms, setRooms] = useState<Room[]>([]); // Define your Room type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch rooms data
  const getAllRoomsApi = async () => {
    try {
      const response = await getAllRoom();
      setRooms(response.data); // Assuming the data is inside response.data.data
      setLoading(false);
    } catch (err) {
      setError('Failed to load rooms');
      setLoading(false);
    }
  };

  // Call API on component mount
  useEffect(() => {
    getAllRoomsApi();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="rooms-list">
      {rooms.map((room) => (
        <div key={room.id} className="room-card">
          <img
            // src={room.roomImg || 'https://via.placeholder.com/150'}
            alt={room.roomName}
            className="room-image"
          />
          <div className="room-details">
            <h3>{room.roomName}</h3>
            <p>Price: ${room.price}</p>
            {/* <p>Created at: {new Date(room.creationTime).toLocaleString()}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomsList;
