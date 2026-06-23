import { supabase } from './client';

export function fetchProfile(userId: string) {
  return supabase
    .from('profiles')
    .select('id, user_id, name')
    .eq('user_id', userId)
    .maybeSingle();
}
