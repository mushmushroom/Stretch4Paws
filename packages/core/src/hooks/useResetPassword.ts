import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { resetPasswordForEmail } from '@stretch4paws/db';
import { resetPasswordSchema, type ResetPasswordInputs } from '../lib/schemas/resetPassword.schema';
import { AppRoutes, PUBLIC_URL } from '../lib/constants';

export default function useResetPassword() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
  });

  async function onSubmit(formData: ResetPasswordInputs) {
    try {
      const { error } = await resetPasswordForEmail(
        formData.email,
        `${PUBLIC_URL}${AppRoutes.CHANGE_PASSWORD}`,
      );

      if (error) {
        setError('root', { type: 'manual', message: error.message });
        return;
      }

      setSuccessMessage('Link sent! Check your inbox.');
      reset();
    } catch {
      setError('root', { type: 'manual', message: 'Unexpected error. Please try again.' });
    }
  }

  return {
    register,
    errors,
    onSubmit,
    handleSubmit,
    watch,
    successMessage,
    isSubmitting,
  };
}
