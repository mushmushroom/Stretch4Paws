import { supabase } from './client';

export async function fetchDailyStats(userId: string, fromDate: string) {
  return supabase
    .from('daily_stats')
    .select('date, sessions_completed')
    .eq('user_id', userId)
    .gte('date', fromDate)
    .order('date', { ascending: true });
}

export async function fetchRecentDailyStats(userId: string, days: number) {
  const from = new Date();
  from.setDate(from.getDate() - days);
  const fromStr = from.toLocaleDateString('en-CA');
  return supabase
    .from('daily_stats')
    .select('date, sessions_completed')
    .eq('user_id', userId)
    .gte('date', fromStr)
    .order('date', { ascending: false });
}

export async function fetchSessions(userId: string) {
  return supabase
    .from('sessions')
    .select('completed_at')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false });
}

export async function insertSession(userId: string, goal: number) {
  const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD local

  const { data } = await supabase
    .from('daily_stats')
    .select('sessions_completed')
    .eq('user_id', userId)
    .eq('date', today)
    .maybeSingle();

  await supabase.from('daily_stats').upsert(
    {
      user_id: userId,
      date: today,
      sessions_completed: (data?.sessions_completed ?? 0) + 1,
      goal,
    },
    { onConflict: 'user_id,date' },
  );

  return supabase.from('sessions').insert({ user_id: userId });
}
