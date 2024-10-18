import { Table } from '@nextui-org/react';
import React, { useState } from 'react';

// Sample data types
interface Room {
  RID: string;
  RoomName: string;
  Price: number;
  Status: string;
  RoomType_RID: string;
  WorkSpace_UserID: string;
  manager_UserID: string;
  quantity: number;
}

interface TimeslotDetail {
  TSID: string;
  Room_RID: string;
  timeslot_TID: number;
  Status: string;
  quantity: number;
}

interface Timeslot {
  TID: number;
  DayStart: string;
  DayEnd: string;
  Timeslot: number;
}

// Sample data
const rooms: Room[] = [
  {
    RID: 'R001',
    RoomName: 'Conference Room A',
    Price: 150.0,
    Status: 'Available',
    RoomType_RID: 'RT001',
    WorkSpace_UserID: 'U001',
    manager_UserID: 'M001',
    quantity: 10,
  },
  {
    RID: 'R002',
    RoomName: 'Meeting Room B',
    Price: 100.0,
    Status: 'Occupied',
    RoomType_RID: 'RT002',
    WorkSpace_UserID: 'U002',
    manager_UserID: 'M002',
    quantity: 5,
  },
];

const timeslotDetails: TimeslotDetail[] = [
  {
    TSID: 'TS001',
    Room_RID: 'R001',
    timeslot_TID: 1,
    Status: 'Scheduled',
    quantity: 2,
  },
  {
    TSID: 'TS002',
    Room_RID: 'R001',
    timeslot_TID: 2,
    Status: 'Cancelled',
    quantity: 0,
  },
  {
    TSID: 'TS003',
    Room_RID: 'R002',
    timeslot_TID: 1,
    Status: 'Available',
    quantity: 1,
  },
  {
    TSID: 'TS004',
    Room_RID: 'R002',
    timeslot_TID: 2,
    Status: 'Occupied',
    quantity: 0,
  },
];

const timeslots: Timeslot[] = [
  {
    TID: 1,
    DayStart: '2024-09-28',
    DayEnd: '2024-09-28',
    Timeslot: 30,
  },
  {
    TID: 2,
    DayStart: '2024-09-29',
    DayEnd: '2024-09-29',
    Timeslot: 60,
  },
];

// Main Component
const RoomList: React.FC = () => {
  // State to store selected time slots for each room
  const [selectedTimeslot, setSelectedTimeslot] = useState<
    Record<string, number | undefined>
  >({});

  // Handle timeslot selection
  const handleTimeslotChange = (
    roomId: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTID = parseInt(event.target.value);
    setSelectedTimeslot((prevState) => ({
      ...prevState,
      [roomId]: selectedTID,
    }));
  };

  return (
    <div className="h-full mt-12 ml-5 mr-5">
      <h1>Room List</h1>
      <table>
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Room Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Select Timeslot</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => {
            // Find the timeslot details for the current room
            const roomTimeslotDetails = timeslotDetails.filter(
              (detail) => detail.Room_RID === room.RID
            );
            const roomTimeslots = timeslots.filter((slot) =>
              roomTimeslotDetails.some(
                (detail) => detail.timeslot_TID === slot.TID
              )
            );

            // Get selected timeslot status, or default to first available
            const selectedTID =
              selectedTimeslot[room.RID] ||
              roomTimeslotDetails[0]?.timeslot_TID;
            const selectedTimeslotDetail = roomTimeslotDetails.find(
              (detail) => detail.timeslot_TID === selectedTID
            );

            return (
              <tr key={room.RID}>
                <td>{room.RID}</td>
                <td>{room.RoomName}</td>
                <td>${room.Price.toFixed(2)}</td>
                <td>
                  {selectedTimeslotDetail
                    ? selectedTimeslotDetail.Status
                    : 'N/A'}
                </td>
                <td>
                  <select
                    value={selectedTID}
                    onChange={(event) => handleTimeslotChange(room.RID, event)}
                  >
                    {roomTimeslots.map((slot) => (
                      <option key={slot.TID} value={slot.TID}>
                        {`${slot.DayStart} - ${slot.DayEnd} (${slot.Timeslot} mins)`}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;
