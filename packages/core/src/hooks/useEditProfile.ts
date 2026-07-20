import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileName, updateEmail } from '@stretch4paws/db';
import { useAuth } from '../context/authContext/useAuth';
import { PUBLIC_URL } from '../lib/constants';
import { editProfileSchema, type EditProfileInputs } from '../lib/schemas/editProfile.schema';

export default function useEditProfile() {
  const { user, profile, refreshProfile } = useAuth();
  const [saved, setSaved] = useState(false);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(savedTimerRef.current), []);

  const isOAuthUser = user?.app_metadata?.provider !== 'email';

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EditProfileInputs>({
    resolver: zodResolver(editProfileSchema),
  });

  useEffect(() => {
    if (profile || user) {
      reset({
        name: profile?.name ?? '',
        email: user?.email ?? '',
      });
    }
  }, [profile, user, reset]);

  async function onSubmit(formData: EditProfileInputs) {
    if (!user) return;
    setSaved(false);

    const nameChanged = formData.name !== profile?.name;
    const emailChanged = !isOAuthUser && formData.email && formData.email !== user.email;

    const results = await Promise.all([
      nameChanged ? updateProfileName(user.id, formData.name) : null,
      emailChanged
        ? updateEmail(formData.email!, `${PUBLIC_URL}/dashboard/profile`)
        : null,
    ]);

    const firstError = results.find((r) => r?.error)?.error;
    if (firstError) {
      setError('root', { type: 'manual', message: firstError.message });
      return;
    }

    await refreshProfile();
    setSaved(true);
    savedTimerRef.current = setTimeout(() => setSaved(false), 5000);
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    isDirty,
    saved,
    isOAuthUser,
  };
}
