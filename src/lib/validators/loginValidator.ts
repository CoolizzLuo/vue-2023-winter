import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

export const LoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long.',
  }),
});

export const formSchema = toTypedSchema(LoginValidator);
export type TLoginValidator = z.infer<typeof LoginValidator>;
