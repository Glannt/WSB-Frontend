import { Room } from './room.type';

export interface Booking {
  id: number; // Unique identifier for the booking
  roomId: number; // ID of the room being booked
  userId: number; // ID of the user making the booking
  startDate: Date; // Start date of the booking
  endDate: Date; // End date of the booking
  status: 'confirmed' | 'pending' | 'canceled'; // Booking status
  createdAt: Date; // Date when the booking was created
}

export interface SlotBooking {
  slotId: number;
  timeStart: string;
  timeEnd: string;
  status: string;
}
export interface CustomerOrderBookingHistory {
  bookingId: string;
  checkinDate: string;
  totalPrice: string;
  status: string;
  room: Room;
  slot: SlotBooking[];
}
