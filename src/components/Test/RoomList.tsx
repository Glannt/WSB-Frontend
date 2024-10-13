import React from 'react';
import { format, addHours, startOfDay } from 'date-fns';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Image,
  Skeleton,
} from '@nextui-org/react';
import { Room, Bookings } from './types';
import { ListRooms } from '@/types/roomOverview';

// RoomList component
interface RoomListProps {
  rooms: ListRooms[];
}

export const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  return (
    <div className="w-full md:w-1/4 mb-4 md:mb-0 h-[800px] max-h-[800px] overflow-y-hidden">
      {/* <h2 className="text-xl font-semibold mb-2">Rooms</h2> */}
      <Table
        isStriped
        aria-label="List of Rooms"
        className="h-auto min-w-[100%] rounded-none"
      >
        <TableHeader>
          <TableColumn>Room ID</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Image</TableColumn>
        </TableHeader>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.roomId}>
              <TableCell>{room.roomId}</TableCell>
              <TableCell>{room.roomName}</TableCell>
              {room.roomImg ? (
                <TableCell>
                  <Image
                    src={room.roomImg[0]}
                    alt={room.roomName}
                    className="w-12 h-12 rounded"
                  />
                </TableCell>
              ) : (
                <Skeleton className="mb-2 w-36 h-36 rounded-xl" />
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
