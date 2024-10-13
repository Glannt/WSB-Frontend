export interface Room {
  id: string;
  name: string;
  image: string;
}

export interface Booking {
  name: string;
  purpose: string;
}

export interface Bookings {
  [roomId: string]: {
    [time: string]: Booking;
  };
}

export interface BookingSlot {
  roomId: string;
  time: string;
}
