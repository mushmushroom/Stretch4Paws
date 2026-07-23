import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext/useAuth';
import { fetchDailyStats } from '@stretch4paws/db';
import type { MonthlyStats } from '../lib/types';

const EMPTY: MonthlyStats = {
  totalStretches: 0,
  weeklyAverage: 0,
  bestMonth: '—',
  perMonth: [0, 0, 0, 0, 0, 0],
  monthLabels: [],
  isLoading: false,
};

export default function useMonthlyStats(): MonthlyStats {
  const { user, isLoading: authLoading } = useAuth();
  const [stats, setStats] = useState<MonthlyStats>({ ...EMPTY, isLoading: true });

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setStats(EMPTY); return; }

    async function load() {
      if (!user) return;

      // 6-month window: start of month 5 months ago
      const now = new Date();
      const fromDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
      const fromStr = fromDate.toLocaleDateString('en-CA'); // YYYY-MM-DD

      const { data } = await fetchDailyStats(user.id, fromStr);
      const rows = data ?? [];

      // Build month buckets: oldest first
      const buckets: { label: string; key: string; total: number }[] = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const label = d.toLocaleDateString('en-US', { month: 'short' });
        buckets.push({ label, key, total: 0 });
      }

      for (const row of rows) {
        const monthKey = row.date.slice(0, 7); // YYYY-MM
        const bucket = buckets.find((b) => b.key === monthKey);
        if (!bucket) continue;
        bucket.total += row.sessions_completed;
      }

      const totalStretches = buckets.reduce((s, b) => s + b.total, 0);
      const perMonth = buckets.map((b) => b.total);
      const monthLabels = buckets.map((b) => b.label);

      // Weekly average: totalStretches over 6 months / ~26 weeks
      const weeklyAverage = Math.round(totalStretches / 26);

      // Best month: highest total
      const bestIdx = perMonth.indexOf(Math.max(...perMonth));
      const bestMonth = perMonth[bestIdx] > 0 ? buckets[bestIdx].label : '—';

      setStats({
        totalStretches,
        weeklyAverage,
        bestMonth,
        perMonth,
        monthLabels,
        isLoading: false,
      });
    }

    load();
  }, [user, authLoading]);

  return stats;
}
