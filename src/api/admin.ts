import type { PostProduct } from '@/lib/validators/productValidator';
import type { Pagination } from '@/types/comm';
import type { BaseResponse, Product } from '@/types/products';
import axiosInstance from './axiosInstance';

const PATH = import.meta.env.VITE_API_PATH;

// Product API
const getAllProducts = async ({ page, category = '' }: { page?: number; category?: string }) => {
  const queryString = new URLSearchParams({ page: String(page), category });

  const res = await axiosInstance.get<{
    success: boolean;
    products: Product[];
    pagination: Pagination;
    messages: string[];
  }>(`/api/${PATH}/admin/products?${queryString}`);

  return res.data;
};

const createProduct = (payload: PostProduct) =>
  axiosInstance.post<BaseResponse>(`/api/${PATH}/admin/product`, {
    data: {
      ...payload,
      is_enabled: payload.is_enabled ? 1 : 0,
    },
  });

const updateProduct = (payload: PostProduct, id: string) =>
  axiosInstance.put<BaseResponse>(`/api/${PATH}/admin/product/${id}`, {
    data: {
      ...payload,
      is_enabled: payload.is_enabled ? 1 : 0,
    },
  });

const deleteProduct = (id: string) => axiosInstance.delete<BaseResponse>(`/api/${PATH}/admin/product/${id}`);

const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('file-to-upload', file);

  return axiosInstance.post<{
    success: boolean;
    imageUrl?: string;
    message?: string;
  }>(`/api/${PATH}/admin/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
