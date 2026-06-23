import { supabase } from './client';

export function fetchGoal(userId: string) {
  return supabase.from('goals').select('sessions_per_day').eq('user_id', userId).maybeSingle();
}

export function upsertGoal(userId: string, sessions_per_day: number) {
  return supabase
    .from('goals')
    .upsert({ user_id: userId, sessions_per_day }, { onConflict: 'user_id' });
}
