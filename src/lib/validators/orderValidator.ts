import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

export const OrderValidator = z.object({
  email: z
    .string({
      required_error: 'email 為必填',
    })
    .email(),
  name: z.string({
    required_error: 'name 為必填',
  }),
  phone: z
    .string({
      required_error: 'phone 為必填',
    })
    .min(10, {
      message: 'phone 長度不足',
    }),
  address: z.string({
    required_error: 'address 為必填',
  }),
  message: z.string().optional(),
});

export const formSchema = toTypedSchema(OrderValidator);
export type TOrderValidator = z.infer<typeof OrderValidator>;
