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

export const getAllManagers = () => http.get(`/api/owner/all-user`);

export const deleteUser = (username: string) =>
  http.put(`/api/owner/delete-user/${username}`);

export const getTotalBookingInDate = (buildingId: string) =>
  http.get(`/api/dashboard/owner/total-booking-in-date/${buildingId}`);

export const getTotalBookingInWeek = (buildingId: string) =>
  http.get(`/api/dashboard/owner/total-booking-in-week/${buildingId}`);

export const getTotalBookingInMonth = (buildingId: string) =>
  http.get(`/api/dashboard/owner/total-booking-in-month/${buildingId}`);

export const getTotalSpace = (buildingId: string) =>
  http.get(`/api/dashboard/owner/total-space/${buildingId}`);

export const getRoomTypeAnalysisByMonth = (buildingId: string) =>
  http.get(`/api/dashboard/owner/room-type-analyst-month/${buildingId}`);

export const getBookingAnalysisByMonth = (buildingId: string) =>
  http.get(`/api/dashboard/owner/booking-analyst-month/${buildingId}`);
