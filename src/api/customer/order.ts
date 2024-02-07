import axiosInstance from '../axiosInstance';

const PATH = import.meta.env.VITE_API_PATH;

const createOrder = async (payload: {
  user: {
    name: string;
    email: string;
    tel: string;
    address: string;
  };
  message: string;
}) => {
  return axiosInstance.post<{
    success: boolean;
    message: string;
    total: number;
    orderId: string;
    created_at: number;
  }>(`/api/${PATH}/order`, {
    data: payload,
  });
};

export default {
  createOrder,
};
