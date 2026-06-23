import { supabase } from '../../lib/db';

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({ className = 'btn btn--outline-basic' }: LogoutButtonProps) {
  async function signOut() {
    await supabase.auth.signOut({ scope: 'local' });
  }
  return (
    <button className={className} onClick={signOut}>
      Logout
    </button>
  );
}
