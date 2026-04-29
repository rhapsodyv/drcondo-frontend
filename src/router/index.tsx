import {createBrowserRouter, Outlet} from 'react-router';
import HomePage from '@/pages/HomePage';
import AdminPage from "@/pages/AdminPage.tsx";

export function AppLayout() {
  return (
    <Outlet />
  );
}


export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/login',
        element: <HomePage />,
      },
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
]);
