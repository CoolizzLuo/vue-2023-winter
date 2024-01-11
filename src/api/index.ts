import axiosInstance from './axiosInstance';
import type { Pagination, Product } from '@/types/products';

const PATH = import.meta.env.VITE_API_PATH;

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

const getAllProducts = async () => {
  try {
    const res = await axiosInstance.get<{
      success: boolean;
      products: Product[];
      pagination: Pagination;
      messages: string[];
    }>(`/api/${PATH}/admin/products`);

    return res.data.products;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default {
  test,
  login,
  logout,
  checkToken,
  getAllProducts,
};
