export type Product = {
  category: string;
  content: string;
  description: string;
  id: string;
  imageUrl: string;
  imagesUrl: string[];
  is_enabled: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
  num: number;
};

export type Pagination = {
  total_pages: number;
  current_page: number;
  has_pre: boolean;
  has_next: boolean;
  category: string;
};
