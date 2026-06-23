import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { getSession, onAuthStateChange, fetchProfile } from '@stretch4paws/db';
import { AuthContext, type Profile } from './AuthContextDef';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadProfile(userId: string) {
    const { data } = await fetchProfile(userId);
    setProfile(data ?? null);
  }

  useEffect(() => {
    getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user.id);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, isLoading }}>{children}</AuthContext.Provider>
  );
};
