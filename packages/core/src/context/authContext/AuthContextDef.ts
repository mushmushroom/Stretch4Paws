import type { User } from '@supabase/supabase-js';
import { createContext } from 'react';
import type { Profile } from '@stretch4paws/db';
import { DEFAULT_GOAL } from '../../lib/constants';

export type { Profile };
export { DEFAULT_GOAL };

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  goal: number;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
  refreshGoal: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
