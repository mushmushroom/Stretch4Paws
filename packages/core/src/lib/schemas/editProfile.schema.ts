import z from 'zod';

export const editProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
});

export type EditProfileInputs = z.infer<typeof editProfileSchema>;
