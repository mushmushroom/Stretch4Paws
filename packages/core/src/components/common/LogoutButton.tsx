import { signOut } from '@stretch4paws/db';

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({ className = 'btn btn--outline-basic' }: LogoutButtonProps) {
  return (
    <button className={className} onClick={() => signOut()}>
      Logout
    </button>
  );
}
