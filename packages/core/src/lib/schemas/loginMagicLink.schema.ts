import z from 'zod';

export const loginMagicLinkSchema = z.object({
  email: z.email(),
});

export type LoginMagicLinkInputs = z.infer<typeof loginMagicLinkSchema>;
