// import { RoomType } from './roomType';

import { Staff } from './staff.type';

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
export interface Details {
  roomId: string | undefined;
  slots?: number[] | undefined;
  buildingId: string;
  checkinDate: string;
  checkoutDate: string;
}

export interface InitialQuantities {
  [key: string]: number;
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
  roomId?: string; // Unique identifier for the room
  roomName: string; // Name of the room
  price: number; // Price of the room
  creationTime: string; // Creation time of the room in ISO format
  roomImg: string[]; // URL of the room image
  status: string; // Current status of the room (e.g., 'available', 'maintenance')
  roomType: RoomType; // Details about the type of room
  staff: Staff[];
}

export interface RoomType {
  id: string; // Unique identifier for the room type
  roomTypeName: string; // Name of the room type
  quantity: number; // Quantity of rooms of this type
}

export const columnsRoom = [
  { name: 'Tên Phòng', uid: 'roomName', sortable: true },
  { name: 'Giá phòng', uid: 'price', sortable: true },
  { name: 'Trạng thái phòng', uid: 'status', sortable: true },
  { name: 'Loại phòng', uid: 'roomType' },
  { name: 'Ngày tạo', uid: 'creationTime', sortable: true },
  { name: 'Nhân viên', uid: 'staffs' },
  // { name: 'Employees', uid: 'employees' },
  { name: 'Actions', uid: 'actions' },
];

// export const listStaffID: string = {

// }

export interface RoomOverView {
  roomId: string;
  roomName: string;
  roomStatus: string;
}

export const columnsRoomOverview = [
  { uid: 'roomId', name: 'Mã phòng', sortable: true },
  { uid: 'roomName', name: 'Tên phòng', sortable: true },
  { uid: 'roomStatus', name: 'Trạng thái phòng', sortable: true },
  { uid: 'actions', name: 'Hành động', sortable: false },
];
