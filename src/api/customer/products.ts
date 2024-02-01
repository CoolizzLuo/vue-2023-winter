import axiosInstance from '../axiosInstance';
import type { Pagination } from '@/types/comm';
import type { Product } from '@/types/customer';

const PATH = import.meta.env.VITE_API_PATH;

// Product API
const getProducts = async () => {
  return axiosInstance.get<{
    success: boolean;
    products: Product[];
    pagination: Pagination;
    message: string[];
  }>(`/api/${PATH}/products`);
};

const getProductById = async (id: string) => {
  return axiosInstance.get<{
    success: boolean;
    product: Product;
    message: string[];
  }>(`/api/${PATH}/product/${id}`);
};

export default {
  getProducts,
  getProductById,
};
