import { Menu, Settings as SettingsIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useIsDesktop } from '@/hooks/useMediaQuery';
import { useLayoutStore } from '@/store/useLayoutStore';

const styles = {
  root: 'sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4',
  brand: 'flex items-center gap-2',
  brandText: 'font-semibold',
  icon: 'size-5',
};

export function Navbar() {
  const isDesktop = useIsDesktop();
  const toggleLeftExpanded = useLayoutStore((s) => s.toggleLeftExpanded);
  const setLeftMobileOpen = useLayoutStore((s) => s.setLeftMobileOpen);
  const toggleRightVisible = useLayoutStore((s) => s.toggleRightVisible);
  const setRightMobileOpen = useLayoutStore((s) => s.setRightMobileOpen);

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
    </header>
  );
}
