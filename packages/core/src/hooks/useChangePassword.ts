import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { supabase } from '../lib/db';
import { AppRoutes } from '../lib/constants';
import {
  changePasswordSchema,
  type ChangePasswordInputs,
} from '../lib/schemas/changePassword.schema';
import { zxcvbn } from '../lib/zxcvbn';
import { useNavigate } from 'react-router';

type ResetPasswordStatus = 'checking' | 'verified' | 'error';

export default function useChangePassword() {
  const [status, setStatus] = useState<ResetPasswordStatus>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordInputs>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const error = hash.get('error');
    const errorDescription = hash.get('error_description');

    if (error) {
      setErrorMessage(errorDescription ?? 'Invalid or expired link');
      setStatus('error');
      return;
    }

    const timeout = setTimeout(() => {
      setErrorMessage('No valid reset link found. Please request a new one.');
      setStatus('error');
    }, 3000);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        clearTimeout(timeout);
        setStatus('verified');
      }
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const navigate = useNavigate();
  const inputPassword = watch('password');
  const passwordScore = zxcvbn.check(inputPassword ?? '').score;

  async function onSubmit(formData: ChangePasswordInputs) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (error) {
        setError('root', { type: 'manual', message: error.message });
        return;
      }

      reset();
      navigate(AppRoutes.LOGIN);
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
    isSubmitting,
    passwordScore,
    errorMessage,
    status,
  };
}
