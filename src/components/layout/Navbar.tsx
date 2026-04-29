import { Menu, Settings as SettingsIcon, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  MenuTrigger,
  Menu as UiMenu,
  MenuPopover,
  MenuItem,
  MenuSeparator,
  MenuHeader,
} from '@/components/ui/menu';
import { useIsDesktop } from '@/hooks/useMediaQuery';
import { useLayoutStore } from '@/store/useLayoutStore';
import { useAuthStore } from '@/store/useAuthStore';

const styles = {
  root: 'sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4',
  brand: 'flex items-center gap-2',
  brandText: 'font-semibold',
  icon: 'size-5',
  actions: 'flex items-center gap-1',
};

export function Navbar() {
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();
  const toggleLeftExpanded = useLayoutStore((s) => s.toggleLeftExpanded);
  const setLeftMobileOpen = useLayoutStore((s) => s.setLeftMobileOpen);
  const toggleRightVisible = useLayoutStore((s) => s.toggleRightVisible);
  const setRightMobileOpen = useLayoutStore((s) => s.setRightMobileOpen);
  const logout = useAuthStore((s) => s.logout);

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className={styles.root}>
      <div className={styles.brand}>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle left sidebar"
          onPress={() =>
            isDesktop ? toggleLeftExpanded() : setLeftMobileOpen(true)
          }
        >
          <Menu className={styles.icon} />
        </Button>
        <span className={styles.brandText}>drcondo3</span>
      </div>

      <div className={styles.actions}>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle right sidebar"
          onPress={() =>
            isDesktop ? toggleRightVisible() : setRightMobileOpen(true)
          }
        >
          <SettingsIcon className={styles.icon} />
        </Button>

        <MenuTrigger>
          <Button variant="ghost" size="icon" aria-label="Menu do usuário">
            <User className={styles.icon} />
          </Button>
          <MenuPopover placement="bottom end">
            <UiMenu>
              <MenuHeader separator>Minha conta</MenuHeader>
              <MenuSeparator />
              <MenuItem
                className="text-destructive data-[focused]:bg-destructive/10 data-[focused]:text-destructive"
                onAction={handleLogout}
              >
                <LogOut className="size-4" />
                Sair
              </MenuItem>
            </UiMenu>
          </MenuPopover>
        </MenuTrigger>
      </div>
    </header>
  );
}
