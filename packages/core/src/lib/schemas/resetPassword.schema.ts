import z from 'zod';

export const resetPasswordSchema = z.object({
  email: z.email(),
});

export type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;