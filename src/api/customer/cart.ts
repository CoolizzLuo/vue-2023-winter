import axiosInstance from '../axiosInstance';
import type { Cart } from '@/types/customer';

const PATH = import.meta.env.VITE_API_PATH;

const getCarts = async () => {
  return axiosInstance.get<{
    success: boolean;
    data: {
      carts: Cart[];
      total: number;
      final_total: number;
    };
    messages: string[];
  }>(`/api/${PATH}/cart`);
};

const postCart = async (product_id: string, qty: number) => {
  return axiosInstance.post<{
    success: boolean;
    data: Cart;
    message: string;
  }>(`/api/${PATH}/cart`, {
    data: {
      product_id,
      qty,
    },
  });
};

const updateCart = async (cartId: string, productId: string, qty: number) => {
  return axiosInstance.put<{
    success: boolean;
    data: Cart;
    message: string;
  }>(`/api/${PATH}/cart/${cartId}`, {
    data: {
      product_id: productId,
      qty,
    },
  });
};

const deleteCart = async (product_id: string) => {
  return axiosInstance.delete<{
    success: boolean;
    message: string;
  }>(`/api/${PATH}/cart/${product_id}`);
};

const deleteAllCarts = async () => {
  return axiosInstance.delete<{
    success: boolean;
    message: string;
  }>(`/api/${PATH}/carts`);
};

export default {
  getCarts,
  postCart,
  updateCart,
  deleteCart,
  deleteAllCarts,
};
