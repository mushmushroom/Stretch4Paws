import { type UseFormSetError } from 'react-hook-form';

import { signInWithGoogle as signInWithGoogleDb } from '@stretch4paws/db';
import { AppRoutes, PUBLIC_URL } from '../lib/constants';

export function useGoogleAuth(setError: UseFormSetError<any>) {
  async function signInWithGoogle() {
    try {
      const { error } = await signInWithGoogleDb(`${PUBLIC_URL}${AppRoutes.HOME}`);

      if (error) {
        setError('root', { type: 'manual', message: error.message });
      }
    } catch {
      setError('root', { type: 'manual', message: 'Unexpected error. Please try again.' });
    }
  }

  return { signInWithGoogle };
}
