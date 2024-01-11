import axiosInstance from './axiosInstance';
import type { BaseResponse, Pagination, PostProduct, Product } from '@/types/products';

const PATH = import.meta.env.VITE_API_PATH;

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
  return await axiosInstance.post<BaseResponse>('/logout');
};

const checkToken = async () => {
  return await axiosInstance.post<{
    success: boolean;
    uid: string;
  }>('/api/user/check');
};

// Product API
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

const createProduct = (payload: PostProduct) => axiosInstance.post<BaseResponse>(`/api/${PATH}/admin/product`, payload);

const updateProduct = (payload: PostProduct, id: string) =>
  axiosInstance.put<BaseResponse>(`/api/${PATH}/admin/product/${id}`, payload);

const deleteProduct = (id: string) => axiosInstance.delete<BaseResponse>(`/api/${PATH}/admin/product/${id}`);

export default {
  login,
  logout,
  checkToken,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
