export interface Staff {
  userId: string;
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
  email: string;
  workShift: string;
  workDays: string;
  buildingId: string;
  status: string;
}

export interface WorkShift {
  userId: string;
  workShift: string;
  startTime: string;
  endTime: string;
  workDays: string;
}

export const columnsStaff = [
  { name: 'Mã nhân viên', uid: 'userId', sortable: true },
  { name: 'Họ và tên', uid: 'fullName', sortable: true },
  { name: 'Ca làm việc', uid: 'workShift', sortable: true },
  { name: 'Số điện thoại', uid: 'phoneNumber', sortable: true },
  { name: 'Email', uid: 'email', sortable: true },
  { name: 'Ngày làm việc', uid: 'workDays', sortable: true },
  { name: 'Trạng thái', uid: 'status', sortable: true },
  { name: 'Hành động', uid: 'actions' },
];

export const columnWorkShift = [
  { name: 'Sáng', uid: 'morning' },
  { name: 'Chiều', uid: 'afternoon' },
  { name: 'Tối', uid: 'evening' },
];
