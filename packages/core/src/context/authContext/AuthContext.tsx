import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { getSession, onAuthStateChange, fetchProfile, fetchGoal } from '@stretch4paws/db';
import { AuthContext, type Profile, DEFAULT_GOAL } from './AuthContextDef';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [goal, setGoal] = useState(DEFAULT_GOAL);
  const [isLoading, setIsLoading] = useState(true);

  async function loadProfile(userId: string) {
    const { data } = await fetchProfile(userId);
    setProfile(data ?? null);
  }

  async function loadGoal(userId: string) {
    const { data } = await fetchGoal(userId);
    if (data) setGoal(data.sessions_per_day);
  }

  async function refreshProfile() {
    if (user) await loadProfile(user.id);
  }

  async function refreshGoal() {
    if (user) await loadGoal(user.id);
  }

  useEffect(() => {
    getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await Promise.all([loadProfile(session.user.id), loadGoal(session.user.id)]).catch(
          console.error,
        );
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
        loadGoal(session.user.id);
      } else {
        setProfile(null);
        setGoal(DEFAULT_GOAL);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, goal, isLoading, refreshProfile, refreshGoal }}>
      {children}
    </AuthContext.Provider>
  );
};
