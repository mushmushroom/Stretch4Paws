import type { User } from '@supabase/supabase-js';
import { createContext } from 'react';

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
