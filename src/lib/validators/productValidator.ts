import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

export const ProductValidator = z.object({
  title: z.string().min(1, { message: '請輸入商品名稱' }),
  category: z.string().min(1, { message: '請選擇商品分類' }),
  origin_price: z.number().int().nonnegative({ message: '請輸入商品原價' }),
  price: z.number().int().nonnegative({ message: '請輸入商品售價' }),
  unit: z.string().min(1, { message: '請輸入商品單位' }),
  imageUrl: z.string().optional(),
  imagesUrl: z.array(z.string()).optional(),
  content: z.string().optional(),
  description: z.string().optional(),
  is_enabled: z.boolean().optional(),
});

export const productSchema = toTypedSchema(ProductValidator);
export type PostProduct = z.infer<typeof ProductValidator>;
