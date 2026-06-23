import { supabase } from './client';

export function fetchSessions(userId: string) {
  return supabase
    .from('sessions')
    .select('completed_at')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false });
}

export function insertSession(userId: string) {
  return supabase.from('sessions').insert({ user_id: userId });
}
