import { useUserStore } from '@/stores/useUserStore';
import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

const onSend = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `${useUserStore().token}`;
  return config;
};

const onFulfilled = (response: AxiosResponse) => {
  return response;
};

const onRejected = (error: AxiosError) => {
  if (error.response?.data) {
    return Promise.resolve(error.response.data);
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onSend);
axiosInstance.interceptors.response.use(onFulfilled, onRejected);

export default axiosInstance;
