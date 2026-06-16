import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ZxcvbnFactory } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

import { type RegisterInputs, registerSchema } from '../lib/schemas/register.schema';
import { supabase } from '../lib/db';
import { useGoogleAuth } from './useGoogleAuth';

const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
};

export default function useRegister() {
  const zxcvbn = new ZxcvbnFactory(options);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm<RegisterInputs>({ resolver: zodResolver(registerSchema), mode: 'onChange' });

  const { signInWithGoogle } = useGoogleAuth(setError);

  const inputPassword = watch('password');
  const passwordScore = zxcvbn.check(inputPassword ?? '').score;

  async function onSubmit(formData: RegisterInputs) {
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { name: formData.name },
        },
      });

      if (error) {
        setError('root', { type: 'manual', message: error.message });
        return;
      }

      setSuccessMessage('Success! Now click button below to log in.');
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
    passwordScore,
    signInWithGoogle,
  };
}
