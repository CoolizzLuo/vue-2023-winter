export type Product = {
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

export type Cart = {
  final_total: number;
  id: string;
  product: Product;
  product_id: string;
  qty: number;
  total: number;
};
