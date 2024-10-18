// import React from 'react';
// import { format, addHours, startOfDay } from 'date-fns';
// import { Room, Bookings } from './types';
// import { Table, Card, CardBody } from '@nextui-org/react';

// interface TimeGridProps {
//   rooms: Room[];
//   bookings: Bookings;
//   onBooking: (roomId: string, time: string) => void;
// }

// const TimeGrid: React.FC<TimeGridProps> = ({ rooms, bookings, onBooking }) => {
//   const startTime = startOfDay(new Date());
//   const timeSlots = Array.from({ length: 9 }, (_, i) =>
//     addHours(startTime, i + 9)
//   );

//   return (
//     <div className="w-full md:w-3/4 mx-auto">
//       <Card>
//         <CardBody>
//           <table className="table-auto w-full border-collapse">
//             <thead>
//               <tr>
//                 <th className="p-2 border">Room</th>
//                 {timeSlots.map((slot) => (
//                   <th key={slot.toISOString()} className="p-2 border">
//                     {format(slot, 'HH:mm')}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {rooms.map((room) => (
//                 <tr key={room.id}>
//                   <td className="p-2 border font-semibold">{room.id}</td>
//                   {timeSlots.map((slot) => {
//                     const time = format(slot, 'HH:mm');
//                     const isBooked = bookings[room.id]?.[time];
//                     return (
//                       <td
//                         key={`${room.id}-${time}`}
//                         className={`p-2 border text-center cursor-pointer ${
//                           isBooked
//                             ? 'bg-red-200'
//                             : 'bg-white hover:bg-slate-300'
//                         }`}
//                         onClick={() => !isBooked && onBooking(room.id, time)}
//                       >
//                         {/* {isBooked ? 'Booked' : 'Available'} */}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default TimeGrid;
// import React from 'react';
// import { format, addHours, startOfDay } from 'date-fns';
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Tooltip,
// } from '@nextui-org/react';
// import { Room, Bookings } from './types';

// interface TimeGridProps {
//   rooms: Room[];
//   bookings: Bookings;
//   onBooking: (roomId: string, time: string) => void;
// }

// const TimeGrid: React.FC<TimeGridProps> = ({ rooms, bookings, onBooking }) => {
//   const startTime = startOfDay(new Date());
//   const timeSlots = Array.from({ length: 9 }, (_, i) =>
//     addHours(startTime, i + 9)
//   );

//   const getCellColor = (isBooked: boolean, hour: number) => {
//     if (isBooked) return 'bg-red-100 hover:bg-red-200';
//     if (hour < 12) return 'bg-blue-50 hover:bg-blue-100';
//     if (hour < 17) return 'bg-green-50 hover:bg-green-100';
//     return 'bg-purple-50 hover:bg-purple-100';
//   };

//   return (
//     <div className="w-full md:w-3/4 overflow-x-auto">
//       <Table aria-label="Room booking schedule" className="min-w-full">
//         <TableHeader columns={timeSlots}>
//           {/* <TableColumn>Room</TableColumn> */}
//           {timeSlots.map((slot) => (
//             <TableColumn key={slot.toISOString()}>
//               {format(slot, 'HH:mm')}
//             </TableColumn>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {rooms.map((room) => (
//             <TableRow key={room.id}>
//               {/* <TableCell>{room.id}</TableCell> */}
//               {timeSlots.map((slot) => {
//                 const time = format(slot, 'HH:mm');
//                 const isBooked = bookings[room.id]?.[time];
//                 const hour = slot.getHours();
//                 return (
//                   <TableCell
//                     key={`${room.id}-${time}`}
//                     className={`p-0 h-12 ${getCellColor(!!isBooked, hour)}`}
//                   >
//                     <Tooltip content={isBooked ? 'Booked' : 'Available'}>
//                       <div
//                         className="w-full h-full cursor-pointer"
//                         onClick={() => !isBooked && onBooking(room.id, time)}
//                       />
//                     </Tooltip>
//                   </TableCell>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default TimeGrid;

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
} from '@nextui-org/react';
import { Room, Bookings } from './types';
import { ListRooms } from '@/types/roomOverview';
import { RoomList } from './RoomList';

// RoomList component
// interface RoomListProps {
//   rooms: ListRoom[];
// }

// const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
//   return (
//     <div className="w-full md:w-1/4 mb-4 md:mb-0 h-[800px] max-h-[800px] overflow-y-auto">
//       {/* <h2 className="text-xl font-semibold mb-2">Rooms</h2> */}
//       <Table
//         aria-label="List of Rooms"
//         className="h-auto min-w-[100%] rounded-none"
//       >
//         <TableHeader>
//           <TableColumn>Room ID</TableColumn>
//           <TableColumn>Name</TableColumn>
//           <TableColumn>Image</TableColumn>
//         </TableHeader>
//         <TableBody>
//           {rooms.map((room) => (
//             <TableRow key={room.id}>
//               <TableCell>{room.id}</TableCell>
//               <TableCell>{room.name}</TableCell>
//               <TableCell>
//                 <Image
//                   src={room.image}
//                   alt={room.name}
//                   className="w-12 h-12 rounded"
//                 />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// TimeGrid component
interface TimeGridProps {
  rooms: ListRooms[];
  bookings: Bookings;
  onBooking: (roomId: string, time: string) => void;
}

const TimeGrid: React.FC<TimeGridProps> = ({ rooms, bookings, onBooking }) => {
  const startTime = startOfDay(new Date());
  const timeSlots = Array.from({ length: 9 }, (_, i) =>
    addHours(startTime, i + 9)
  );

  const getCellColor = (isBooked: boolean, hour: number) => {
    // if(isBooked) {
    //   return
    // }
    if (isBooked) return 'bg-red-100 hover:bg-red-200';
    if (hour < 12) return 'bg-blue-50 hover:bg-blue-100';
    if (hour < 17) return 'bg-green-50 hover:bg-green-100';
    return 'bg-purple-50 hover:bg-purple-100';
  };

  return (
    <div className="w-full md:w-3/4 overflow-x-auto h-[800px] max-h-[800px] overflow-y-hidden ">
      <Table
        isStriped
        aria-label="Room booking schedule"
        className="h-auto min-w-[100%]"
      >
        <TableHeader className="border-hidden" columns={timeSlots}>
          {timeSlots.map((slot) => (
            <TableColumn key={slot.toISOString()}>
              {format(slot, 'HH:mm')}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.roomId}>
              {timeSlots.map((slot) => {
                const time = format(slot, 'HH:mm');
                const isBooked = bookings[room.roomId]?.[time];
                const hour = slot.getHours();
                return (
                  <TableCell
                    key={`${room.roomId}-${time}`}
                    className={`p-0 h-16 max-h-auto ${getCellColor(!!isBooked, hour)}`}
                  >
                    <Tooltip content={isBooked ? 'Booked' : 'Available'}>
                      <div
                        className="w-full h-full cursor-pointer"
                        onClick={() =>
                          !isBooked && onBooking(room.roomId, time)
                        }
                      />
                    </Tooltip>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Combined RoomBooking component
interface RoomBookingProps {
  rooms: ListRooms[];
  bookings: Bookings;
  onBooking: (roomId: string, time: string) => void;
}

const RoomBooking: React.FC<RoomBookingProps> = ({
  rooms,
  bookings,
  onBooking,
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full m-0 h-[800px] max-h-[800px]">
      <RoomList rooms={rooms} />
      <TimeGrid rooms={rooms} bookings={bookings} onBooking={onBooking} />
    </div>
  );
};

export default RoomBooking;
