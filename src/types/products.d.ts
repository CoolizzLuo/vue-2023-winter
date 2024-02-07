export type BaseResponse = {
  success: boolean;
  messages: string;
};

export type Product = {
  title: string;
  category: string;
  content: string;
  description: string;
  id: string;
  imageUrl: string;
  imagesUrl: string[];
  is_enabled: number;
  origin_price: number;
  price: number;
  unit: string;
  num: number;
};

export type PostProduct = {
  title: string;
  category: string;
  origin_price: number;
  price: number;
  unit: string;
  imageUrl?: string;
  imagesUrl?: string[];
  content?: string;
  description?: string;
  is_enabled?: number;
};
