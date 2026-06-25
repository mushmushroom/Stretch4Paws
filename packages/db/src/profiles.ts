import { supabase } from './client';
import type { ProfileSettings } from './types';

export function fetchProfile(userId: string) {
  return supabase
    .from('profiles')
    .select('id, user_id, name, settings')
    .eq('user_id', userId)
    .maybeSingle();
}

export function updateProfileSettings(userId: string, settings: ProfileSettings) {
  return supabase
    .from('profiles')
    .update({ settings })
    .eq('user_id', userId);
}

export function updateProfileName(userId: string, name: string) {
  return supabase.from('profiles').update({ name }).eq('user_id', userId);
}
