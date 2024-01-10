import axiosInstance from './axiosInstance';

const test = async () => {
  return await axiosInstance.get('https://jsonplaceholder.typicode.com/todos/1');
};

const login = async (payload: { username: string; password: string }) => {
  return await axiosInstance.post<{
    success: boolean;
    message: string;
    uid: string;
    token: string;
    expired: number;
  }>('/admin/signin', payload);
};

const logout = async () => {
  return await axiosInstance.post<{
    success: boolean;
    message: string;
  }>('/logout');
};

const checkToken = async () => {
  return await axiosInstance.post<{
    success: boolean;
    uid: string;
  }>('/api/user/check');
};

const getProducts = async () => {
  return await axiosInstance.get(`/api/${import.meta.env.VITE_API_PATH}/admin/products`);
};

export default {
  test,
  login,
  logout,
  checkToken,
  getProducts,
};
