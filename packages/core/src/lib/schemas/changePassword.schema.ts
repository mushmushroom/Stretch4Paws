import z from 'zod';

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .refine((password) => /[A-Z]/.test(password), {
        message: 'Password must contain at least one uppercase letter (A-Z).',
      })
      .refine((password) => /[a-z]/.test(password), {
        message: 'Password must contain at least one lowercase letter (a-z).',
      })
      .refine((password) => /[0-9]/.test(password), {
        message: 'Password must contain at least one number (0-9).',
      })

      .refine((password) => /[!@#$%^&*?]/.test(password), {
        message: 'Password must contain at least one special character (!@#$%^&*?).',
      }),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ChangePasswordInputs = z.infer<typeof changePasswordSchema>;
