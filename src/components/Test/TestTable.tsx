import React, { useState } from 'react';
// import RoomList from './RoomList';
// import TimeGrid from './TimeGrid';
import BookingModal from './BookingModal';
import { Room, Bookings, BookingSlot, Booking } from './types';
import { useNavigate } from 'react-router';
import path from '@/constants/path';
import RoomBooking from './TimeGrid';
import { getAllRoom } from '@/service/room.api';
import { useQuery } from '@tanstack/react-query';
import { ListRooms } from '@/types/roomOverview';
export const TestTable = () => {
  //   const [rooms, setRooms] = useState<Room[]>([
  //     { id: 'HD.M-101', name: 'Phòng họp 1', image: '🏢' },
  //     { id: 'HD.M-102', name: 'Phòng họp 2', image: '🏢' },
  //     { id: 'HD.M-103', name: 'Phòng hội thảo', image: '🎤' },
  //     { id: 'HD.M-104', name: 'Phòng làm việc nhóm', image: '👥' },
  //   ]);

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

  const [bookings, setBookings] = useState<Bookings>({});
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const navigate = useNavigate();
  const handleBooking = (roomId: string, time: string) => {
    setSelectedSlot({ roomId, time });
    navigate(path.rooms);
  };

  const confirmBooking = (details: Booking) => {
    if (selectedSlot) {
      setBookings((prev) => ({
        ...prev,
        [selectedSlot.roomId]: {
          ...(prev[selectedSlot.roomId] || {}),
          [selectedSlot.time]: details,
        },
      }));
      setSelectedSlot(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Room Booking Interface</h1>
      <div className="flex flex-col md:flex-row">
        {/* <RoomList rooms={rooms} />
        <TimeGrid rooms={rooms} bookings={bookings} onBooking={handleBooking} /> */}
        <RoomBooking
          rooms={rooms}
          bookings={bookings}
          onBooking={handleBooking}
        />
      </div>
      {/* {selectedSlot && (
        <BookingModal
          slot={selectedSlot}
          onConfirm={confirmBooking}
          onClose={() => setSelectedSlot(null)}
        />
      )} */}
    </div>
  );
};
