export const buildingBase = [
  { name: 'Lê Văn Việt', uid: 'Cơ sở 1' },
  { name: 'Phạm Văn Đồng', uid: 'Cơ sở 2' },
];

export interface buildingCustomer {
  buildingId: string;
  buildingName: string;
}

export interface Building {
  buildingId: string; // Unique identifier for the building
  buildingName: string; // Name of the building
  buildingLocation: string; // Location of the building
  buildingImg?: string; // URL of the building image
  phoneContact: string; // Phone contact of the building
}
