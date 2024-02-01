import axiosInstance from '../axiosInstance';
import type { Cart } from '@/types/customer';

const PATH = import.meta.env.VITE_API_PATH;

// Product API
const getCartDetail = async () => {
  return axiosInstance.get<{
    success: boolean;
    data: {
      carts: Cart[];
      total: number;
      final_total: number;
    };
    message: string[];
  }>(`/api/${PATH}/cart`);
};

export default {
  getCartDetail,
};
