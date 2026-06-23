import type { User } from '@supabase/supabase-js';
import { createContext } from 'react';

export type Profile = {
  id: string;
  name: string | null;
};

export type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
