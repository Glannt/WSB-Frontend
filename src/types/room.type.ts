// import { RoomType } from './roomType';

export interface AddRoomResponse {
  data: {
    roomId: number;
    roomName: string;
    price: number;
    creationTime: string;
    roomImg: string;
    status: string;
    roomType: RoomType;
  };
  message: string;
  status: string;
}

export interface Column {
  uid: string; // Unique identifier for the column, used as the key
  name: string; // Display name for the column header
  sortable?: boolean; // Optional flag to indicate if the column can be sorted
}

// Define the type for a status option in the filter
export interface StatusOption {
  uid: string; // Unique identifier for the status option
  name: string; // Display name for the status option
}
// Define the Room type
export interface Room {
  roomId: number; // Unique identifier for the room
  roomName: string; // Name of the room
  price: number; // Price of the room
  creationTime: string; // Creation time of the room in ISO format
  roomImg: string; // URL of the room image
  status: string; // Current status of the room (e.g., 'available', 'maintenance')
  roomType: RoomType; // Details about the type of room
}

export interface RoomType {
  id: string; // Unique identifier for the room type
  roomTypeName: string; // Name of the room type
  quantity: number; // Quantity of rooms of this type
}

export const columnsRoom = [
  { name: 'Room Name', uid: 'roomName', sortable: true },
  { name: 'Room Price', uid: 'price', sortable: true },
  { name: 'Room Status', uid: 'status', sortable: true },
  { name: 'Room Type', uid: 'roomType' },
  { name: 'Create Date', uid: 'creationTime', sortable: true },
  // { name: 'Employees', uid: 'employees' },
  { name: 'Actions', uid: 'actions' },
];
