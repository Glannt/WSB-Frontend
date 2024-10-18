export interface Staff {
  staffId: string;
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
  email: string;
  workShift: string;
  workDays: string;
  buildingId: string;
  status: string;
}
export const columnsStaff = [
  { name: 'Staff ID', uid: 'staffId', sortable: true },
  { name: 'Full Name', uid: 'fullName', sortable: true },
  { name: 'Work Shift', uid: 'workShift', sortable: true },
  { name: 'Phone Number', uid: 'phoneNumber', sortable: true },
  { name: 'Email', uid: 'email', sortable: true },
  { name: 'Work Days', uid: 'workDays', sortable: true },
  { name: 'Status ', uid: 'status', sortable: true },
  { name: 'Actions', uid: 'actions' },
];

export const columnWorkShift = [
  { name: 'Sáng', uid: 'morning' },
  { name: 'Chiều', uid: 'afternoon' },
  { name: 'Tối', uid: 'evening' },
];
