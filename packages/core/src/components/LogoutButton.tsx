import { supabase } from '../lib/db';

export default function LogoutButton() {
  async function signOut() {
    const { error } = await supabase.auth.signOut({ scope: 'local' });
    if (error) return;
  }
  return (
    <button className="btn btn--outline-basic" onClick={signOut}>
      Logout
    </button>
  );
}
