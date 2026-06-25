import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { loginPasswordSchema, type LoginPasswordInputs } from '../lib/schemas/loginPassword.schema';
import {
  loginMagicLinkSchema,
  type LoginMagicLinkInputs,
} from '../lib/schemas/loginMagicLink.schema';
import { AppRoutes } from '../lib/constants';
import { signIn, signInWithOtp } from '@stretch4paws/db';
import { useGoogleAuth } from './useGoogleAuth';

export default function useLogin() {
  const [successMagicLinkMessage, setSuccessMagicLinkMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const passwordForm = useForm<LoginPasswordInputs>({
    resolver: zodResolver(loginPasswordSchema),
    mode: 'onChange',
  });
  const magicLinkForm = useForm<LoginMagicLinkInputs>({
    resolver: zodResolver(loginMagicLinkSchema),
    mode: 'onChange',
  });

  const { signInWithGoogle } = useGoogleAuth(passwordForm.setError);

  async function onPasswordSubmit(formData: LoginPasswordInputs) {
    try {
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        passwordForm.setError('root', { type: 'manual', message: error.message });
        return;
      }

      passwordForm.reset();
      navigate(AppRoutes.HOME);
    } catch {
      passwordForm.setError('root', {
        type: 'manual',
        message: 'Unexpected error. Please try again.',
      });
    }
  }

  async function onMagicLinkSubmit(formData: LoginMagicLinkInputs) {
    setSuccessMagicLinkMessage(null);
    try {
      const { error } = await signInWithOtp(formData.email, AppRoutes.HOME);

      if (error) {
        magicLinkForm.setError('root', { type: 'manual', message: error.message });
        return;
      }

      magicLinkForm.reset();
      setSuccessMagicLinkMessage('Email was sent, please check your inbox.');
    } catch {
      magicLinkForm.setError('root', {
        type: 'manual',
        message: 'Unexpected error. Please try again.',
      });
    }
  }

  return {
    passwordForm,
    onPasswordSubmit,
    signInWithGoogle,
    onMagicLinkSubmit,
    magicLinkForm,
    successMagicLinkMessage,
  };
}
