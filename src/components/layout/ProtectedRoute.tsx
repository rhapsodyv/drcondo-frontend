import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/store/useAuthStore';

export function ProtectedRoute() {
  const isLogado = useAuthStore((s) => s.isLogado);
  return isLogado ? <Outlet /> : <Navigate to="/login" replace />;
}
