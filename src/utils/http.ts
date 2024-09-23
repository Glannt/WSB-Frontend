import { HttpStatusCode } from '@/constants/httpStatusCode.enum';
import { AuthResponse } from '@/types/auth.type';
import axios, { type AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import {
  clearAccessTokenFromLS,
  getAccessTokenFromLS,
  saveAccessTokenToLS,
} from './auth';

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
          console.log(this.accessToken);

          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === '/sign-in' || url === '/sign-up') {
          this.accessToken = (response.data as AuthResponse).data.access_token;
          console.log(response.data as AuthResponse);

          saveAccessTokenToLS(this.accessToken);
        } else if (url === '/logout') {
          this.accessToken = '';
          clearAccessTokenFromLS();
        }
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
