import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext/useAuth';
import { supabase } from '../lib/db';
import useGoal from './useGoal';

function isToday(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function isThisWeek(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return date >= startOfWeek;
}

function calcStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  // get unique calendar days, sorted descending
  const days = [...new Set(dates.map((d) => d.slice(0, 10)))].sort().reverse();

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < days.length; i++) {
    const expected = new Date(today);
    expected.setDate(today.getDate() - i);
    const expectedStr = expected.toISOString().slice(0, 10);

    if (days[i] === expectedStr) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export interface Stats {
  today: number;
  thisWeek: number;
  streak: number;
  goalProgress: number; // 0–100
  isLoading: boolean;
}

export default function useStats(): Stats {
  const { user } = useAuth();
  const { goal } = useGoal();
  const [stats, setStats] = useState<Stats>({ today: 0, thisWeek: 0, streak: 0, goalProgress: 0, isLoading: true });

  useEffect(() => {
    if (!user) return;

    async function fetchStats() {
      if (!user) return;
      const { data } = await supabase
        .from('sessions')
        .select('completed_at')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

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
  }, [user]);

  return stats;
}
