// data/bookings.ts

import { Booking } from '../types/bookings';

export const columnsBooking = [
  { uid: 'bookingID', name: 'Booking ID', sortable: true },
  { uid: 'roomId', name: 'Room ID', sortable: true },
  { uid: 'userId', name: 'User ID', sortable: true },
  { uid: 'startDate', name: 'Start Date', sortable: true },
  { uid: 'endDate', name: 'End Date', sortable: true },
  { uid: 'status', name: 'Status', sortable: true },
  { uid: 'actions', name: 'Actions', sortable: false },
];

export const statusOptionsBooking = [
  { name: 'Confirmed', uid: 'confirmed' },
  { name: 'Pending', uid: 'pending' },
  { name: 'Canceled', uid: 'canceled' },
];

export const bookings: Booking[] = [
  {
    id: 1,
    roomId: 1, // Assuming this corresponds to a room ID in your rooms data
    userId: 1, // Assuming this corresponds to a user ID in your users/staff data
    startDate: new Date('2024-10-01T10:00:00'),
    endDate: new Date('2024-10-01T12:00:00'),
    status: 'confirmed',
    createdAt: new Date('2024-09-28T09:00:00'),
  },
  {
    id: 2,
    roomId: 2,
    userId: 2,
    startDate: new Date('2024-10-01T13:00:00'),
    endDate: new Date('2024-10-01T15:00:00'),
    status: 'pending',
    createdAt: new Date('2024-09-28T10:00:00'),
  },
  {
    id: 3,
    roomId: 3,
    userId: 1,
    startDate: new Date('2024-10-02T09:00:00'),
    endDate: new Date('2024-10-02T11:00:00'),
    status: 'canceled',
    createdAt: new Date('2024-09-28T11:00:00'),
  },
  // Add more bookings as needed...
];
