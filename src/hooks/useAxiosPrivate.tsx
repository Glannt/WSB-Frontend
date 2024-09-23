import { axiosPrivate } from '@/service/customize_axios';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
const useAxiosPrivate = (): typeof axiosPrivate => {
  const refresh = useRefreshToken();
  const auth = useAuth();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.response.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.auth.accessToken}`; // Accessing accessToken correctly
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.response.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;
