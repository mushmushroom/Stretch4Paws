import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { supabase } from './client';

export function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export function signInWithOtp(email: string, emailRedirectTo: string) {
  return supabase.auth.signInWithOtp({ email, options: { emailRedirectTo } });
}

export function signInWithGoogle(redirectTo: string) {
  return supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } });
}

export function signUp(email: string, password: string, name: string) {
  return supabase.auth.signUp({ email, password, options: { data: { name } } });
}

export function signOut() {
  return supabase.auth.signOut({ scope: 'local' });
}

export function resetPasswordForEmail(email: string, redirectTo: string) {
  return supabase.auth.resetPasswordForEmail(email, { redirectTo });
}

export function updatePassword(password: string) {
  return supabase.auth.updateUser({ password });
}

export function getSession() {
  return supabase.auth.getSession();
}

export function onAuthStateChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void,
) {
  return supabase.auth.onAuthStateChange(callback);
}
