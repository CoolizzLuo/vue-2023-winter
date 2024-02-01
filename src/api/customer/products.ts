import type { Pagination } from '@/types/products';
import axiosInstance from '../axiosInstance';

const PATH = import.meta.env.VITE_API_PATH;

type Product = {
  id: string;
  title: string;
  category: string;
  content: string;
  description: string;
  imageUrl: string;
  imagesUrl: string[];
  is_enabled: number;
  origin_price: number;
  price: number;
  unit: string;
};

// Product API
const getProducts = async () => {
  return axiosInstance.get<{
    success: boolean;
    products: Product[];
    pagination: Pagination;
    message: string[];
  }>(`/api/${PATH}/products`);
};

const getProduct = async (id: string) => {
  return axiosInstance.get<{
    success: boolean;
    product: Product;
    message: string[];
  }>(`/api/${PATH}/product/${id}`);
};

export default {
  getProducts,
  getProduct,
};
