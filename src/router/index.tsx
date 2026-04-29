import { createBrowserRouter, Outlet } from 'react-router';
import LoginPage from '@/pages/LoginPage';
import AdminPage from '@/pages/AdminPage';
import HomePage from '@/pages/HomePage';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

export function AppLayout() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'design-system',
        element: <HomePage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
        ],
      },
    ],
  },
]);
