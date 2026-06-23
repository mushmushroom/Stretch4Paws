import { supabase } from './client';

export function fetchGoal(userId: string) {
  return supabase
    .from('goals')
    .select('sessions_per_week')
    .eq('user_id', userId)
    .maybeSingle();
}

export function upsertGoal(userId: string, sessions_per_week: number) {
  return supabase.from('goals').upsert({ user_id: userId, sessions_per_week });
}
