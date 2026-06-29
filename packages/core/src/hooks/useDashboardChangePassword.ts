import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePassword } from '@stretch4paws/db';
import { changePasswordSchema, type ChangePasswordInputs } from '../lib/schemas/changePassword.schema';
import { zxcvbn } from '../lib/zxcvbn';

export default function useDashboardChangePassword() {
  const [saved, setSaved] = useState(false);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(savedTimerRef.current), []);

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

  const inputPassword = watch('password');
  const passwordScore = zxcvbn.check(inputPassword ?? '').score;

  async function onSubmit(formData: ChangePasswordInputs) {
    setSaved(false);
    const { error } = await updatePassword(formData.password);
    if (error) {
      setError('root', { type: 'manual', message: error.message });
      return;
    }
    reset();
    setSaved(true);
    savedTimerRef.current = setTimeout(() => setSaved(false), 5000);
  }

  return { register, handleSubmit, onSubmit, errors, isSubmitting, passwordScore, saved };
}
