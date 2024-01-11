import { type ClassValue, clsx } from 'clsx';
import { jwtDecode } from 'jwt-decode';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getEmailByJWT = (token: string) => {
  const payload = jwtDecode(token) as { email?: string };

  return payload?.email;
};
