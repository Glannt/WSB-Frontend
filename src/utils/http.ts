import { HttpStatusCode } from '@/constants/httpStatusCode.enum';
import axios, { type AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        console.log(error);
        if (error.response.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data;
          const message = data.message || error.message;
          toast.error(data.message);
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export default http;
