import http from '@/utils/http';

export const getAllBuilding = () => http.get('/api/auth/buildings');

export const createBuilding = (body: {
  buildingName: string;
  buildingLocation: string;
  phoneContact: string;
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

// export const createAccount = (body: {
//   userName: string;
//   password: string;
//   role: string;
//   buildingId: string;
// }) => {
//   const formData = new FormData();
//   formData.append('userName', body.userName);
//   formData.append('password', body.password);
//   formData.append('role', 'MANAGER');
//   formData.append('buildingId', body.buildingId);
//   // console.log('formData', formData.getAll);

//   return http.post('/api/owner/create-account', formData);
// };

export const createAccount = (formdata: FormData) =>
  http.post('/api/owner/create-account', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const deleteManager = (id: string) =>
  http.put(`/api/auth/managers/delete/${id}`);

export const getAllManagers = () => http.get(`/api/auth/managers`);
