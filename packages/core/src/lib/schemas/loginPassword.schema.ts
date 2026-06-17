import z from 'zod';

export const loginPasswordSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginPasswordInputs = z.infer<typeof loginPasswordSchema>;
