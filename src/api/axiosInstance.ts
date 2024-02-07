import { useUserStore } from '@/stores/useUserStore';
import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { useToast } from '@/components/ui/toast/useToast';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

const onSend = (config: InternalAxiosRequestConfig) => {
  if (useUserStore().token) {
    config.headers.Authorization = useUserStore().token;
  }
  return config;
};

const onFulfilled = (response: AxiosResponse) => {
  return response;
};

const onRejected = (error: AxiosError<{ message: string }>) => {
  // return Promise.reject(error?.response?.data?.message || error.message);
  useToast().toast({
    title: 'Something went wrong',
    variant: 'destructive',
    duration: 2000,
    description: error?.response?.data?.message ?? error.message ?? 'Unknown error',
  });
};

axiosInstance.interceptors.request.use(onSend);
axiosInstance.interceptors.response.use(onFulfilled, onRejected);

export default axiosInstance;
