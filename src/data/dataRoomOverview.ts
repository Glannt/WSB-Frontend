import { Room } from '@/types/room.type';

export const columnsRoomOverview = [
  { uid: 'id', name: 'Room ID', sortable: true },
  { uid: 'roomName', name: 'Room Name', sortable: true },
  { uid: 'roomType', name: 'Room Type', sortable: true },
  { uid: 'roomStatus', name: 'Room Status', sortable: true },
  { uid: 'createdAt', name: 'Created At', sortable: true },
  { uid: 'actions', name: 'Actions', sortable: false },
];

export const statusOptions = [
  { name: 'Available', uid: 'available' },
  { name: 'Booked', uid: 'booked' },
  { name: 'Maintenance', uid: 'maintenance' },
];

export const roomsData = [
  {
    id: 1,
    roomName: 'Room 101',
    roomType: 'single',
    roomStatus: 'available',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    roomName: 'Room 102',
    roomType: 'double',
    roomStatus: 'booked',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 3,
    roomName: 'Room 103',
    roomType: 'suite',
    roomStatus: 'maintenance',
    createdAt: new Date('2024-01-25'),
  },
  // Add more rooms as needed
];
