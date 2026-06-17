import { Navigate } from 'react-router';
import { useAuth } from '../../context/authContext/useAuth';
import { AppRoutes } from '../../lib/constants';

export default function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (user) return <Navigate to={AppRoutes.HOME} replace />;
  return <>{children}</>;
}
