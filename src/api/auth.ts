import type { BaseResponse } from '@/types/products';
import axiosInstance from './axiosInstance';

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

export default { login, logout, checkToken };
