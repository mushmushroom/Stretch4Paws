import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext/useAuth';
import { fetchSessions } from '@stretch4paws/db';
import useGoal from './useGoal';
import type { Stats } from '../lib/types';
import { calcStreak, isThisWeek, isToday } from '../lib/utils';

export default function useStats(): Stats {
  const { user, isLoading: authLoading } = useAuth();
  const { goal } = useGoal();
  const [stats, setStats] = useState<Stats>({ today: 0, thisWeek: 0, streak: 0, goalProgress: 0, isLoading: true });

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setStats({ today: 0, thisWeek: 0, streak: 0, goalProgress: 0, isLoading: false });
      return;
    }

    async function fetchStats() {
      if (!user) return;
      const { data } = await fetchSessions(user.id);

      const rows = data ?? [];
      const dates = rows.map((r) => r.completed_at as string);

      const thisWeek = dates.filter(isThisWeek).length;
      setStats({
        today: dates.filter(isToday).length,
        thisWeek,
        streak: calcStreak(dates),
        goalProgress: Math.min(Math.round((thisWeek / goal) * 100), 100),
        isLoading: false,
      });
    }

    fetchStats();
  }, [user, authLoading]);

  return stats;
}
