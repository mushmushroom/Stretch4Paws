import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { type RegisterInputs, registerSchema } from '../lib/schemas/register.schema';
import { signUp } from '@stretch4paws/db';
import { useGoogleAuth } from './useGoogleAuth';
import { zxcvbn } from '../lib/zxcvbn';



export default function useRegister() {

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInputs>({ resolver: zodResolver(registerSchema), mode: 'onChange' });

  const { signInWithGoogle } = useGoogleAuth(setError);

  const inputPassword = watch('password');
  const passwordScore = zxcvbn.check(inputPassword ?? '').score;

  async function onSubmit(formData: RegisterInputs) {
    try {
      const { error } = await signUp(formData.email, formData.password, formData.name);

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
    isSubmitting,
  };
}
