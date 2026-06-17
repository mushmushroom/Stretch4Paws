import { type UseFormSetError } from 'react-hook-form';

import { supabase } from '../lib/db';
import { AppRoutes, PUBLIC_URL } from '../lib/constants';

export function useGoogleAuth(setError: UseFormSetError<any>) {
  async function signInWithGoogle() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${PUBLIC_URL}${AppRoutes.HOME}`,
        },
      });

      if (error) {
        setError('root', { type: 'manual', message: error.message });
      }
    } catch {
      setError('root', { type: 'manual', message: 'Unexpected error. Please try again.' });
    }
  }

  return { signInWithGoogle };
}
