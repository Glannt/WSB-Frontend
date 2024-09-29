interface Room {
  id: number; // Unique identifier for the room
  roomName: string; // Name of the room
  roomType: 'single' | 'double' | 'suite'; // Type of room
  roomStatus: 'available' | 'booked' | 'maintenance'; // Status of the room
  createdAt: Date; // Date when the room was created
}
