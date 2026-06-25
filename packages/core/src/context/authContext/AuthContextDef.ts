import type { User } from '@supabase/supabase-js';
import { createContext } from 'react';
import type { Profile } from '@stretch4paws/db';

export type { Profile };

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
