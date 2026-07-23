import { Navigate } from 'react-router';
import { useAuth } from '../../context/authContext/useAuth';
import { AppRoutes } from '../../lib/constants';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (!user) return <Navigate to={AppRoutes.LOGIN} replace />;
  return <>{children}</>;
}
