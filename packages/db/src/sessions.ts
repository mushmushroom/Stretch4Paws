import { supabase } from './client';
import type { DailyStatRow } from './types';

export async function fetchDailyStats(userId: string, fromDate: string) {
  return supabase
    .from('daily_stats')
    .select<'date, sessions_completed', DailyStatRow>('date, sessions_completed')
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
    .select<'date, sessions_completed', DailyStatRow>('date, sessions_completed')
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

  const { error: rpcError } = await supabase.rpc('increment_daily_session', {
    p_user_id: userId,
    p_date: today,
    p_goal: goal,
  });

  if (rpcError) return { error: rpcError };

  return supabase.from('sessions').insert({ user_id: userId });
}
