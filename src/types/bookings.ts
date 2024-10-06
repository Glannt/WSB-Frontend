export interface Booking {
  id: number; // Unique identifier for the booking
  roomId: number; // ID of the room being booked
  userId: number; // ID of the user making the booking
  startDate: Date; // Start date of the booking
  endDate: Date; // End date of the booking
  status: 'confirmed' | 'pending' | 'canceled'; // Booking status
  createdAt: Date; // Date when the booking was created
}

export interface CustomerOrderBookingHistory {
  id: number;
  date: string;
  amount: string;
  status: string;
  address: string;
}
