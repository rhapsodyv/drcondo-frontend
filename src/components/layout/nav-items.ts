import { Home, LayoutDashboard, Users, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Users', to: '/users', icon: Users },
  { label: 'Settings', to: '/settings', icon: Settings },
];
