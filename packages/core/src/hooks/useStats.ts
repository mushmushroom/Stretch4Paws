import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext/useAuth';
import { fetchRecentDailyStats } from '@stretch4paws/db';
import useGoal from './useGoal';
import type { Stats } from '../lib/types';

const EMPTY_STATS: Stats = {
  today: 0,
  thisWeek: 0,
  streak: 0,
  goalProgress: 0,
  perDay: [0, 0, 0, 0, 0, 0, 0],
  isLoading: false,
};

function getLocalDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function useStats(): Stats {
  const { user, isLoading: authLoading } = useAuth();
  const { goal } = useGoal();
  const [stats, setStats] = useState<Stats>({ ...EMPTY_STATS, isLoading: true });

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setStats(EMPTY_STATS);
      return;
    }

    async function fetchStats() {
      if (!user) return;

      // 90 days covers streak + this week with headroom
      const { data, error } = await fetchRecentDailyStats(user.id, 90);
      const rows = data ?? [];

      const now = new Date();
      const todayStr = getLocalDateStr(now);

      // start of current week (Sunday)
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      const startOfWeekStr = getLocalDateStr(startOfWeek);

      let today = 0;
      let thisWeek = 0;
      const perDay: number[] = [0, 0, 0, 0, 0, 0, 0];

      for (const row of rows) {
        const dateStr = row.date as string;
        const count = row.sessions_completed as number;

        if (dateStr === todayStr) today = count;

        if (dateStr >= startOfWeekStr) {
          thisWeek += count;
          // day of week from a local date string — parse as local midnight
          const [y, mo, d] = dateStr.split('-').map(Number);
          const dow = new Date(y, mo - 1, d).getDay();
          perDay[dow] = count;
        }
      }

      // streak: rows are ordered descending by date
      let streak = 0;
      const expected = new Date(now);
      expected.setHours(0, 0, 0, 0);

      for (const row of rows) {
        const dateStr = row.date as string;
        const expectedStr = getLocalDateStr(expected);

        if (dateStr === expectedStr) {
          streak++;
          expected.setDate(expected.getDate() - 1);
        } else if (dateStr < expectedStr) {
          // gap found
          break;
        }
        // dateStr > expectedStr shouldn't happen (ordered desc) but skip if so
      }

      setStats({
        today,
        thisWeek,
        streak,
        goalProgress: Math.min(Math.round((thisWeek / goal) * 100), 100),
        perDay,
        isLoading: false,
      });
    }

    fetchStats();
  }, [user, authLoading, goal]);

  return stats;
}
