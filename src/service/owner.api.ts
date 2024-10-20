import http from '@/utils/http';

export const getAllBuilding = () => http.get('/api/auth/buildings');

export const createBuilding = (body: {
  buildingName: string;
  buildingLocation: string;
  phoneContact: string;
  image: string;
}) => http.post('/api/auth/buildings', body);

export const updateBuilding = (
  buildingId: string,
  body: {
    buildingName: string;
    buildingLocation: string;
    phoneContact: string;
  }
) => http.put(`/api/auth/buildings/${buildingId}`, body);

export const deleteBuilding = (buildingId: string) =>
  http.delete(`/api/auth/buildings/${buildingId}`);
