import { Home, Menu, Search, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useLayoutStore } from '@/store/useLayoutStore';

const styles = {
  root: 'sticky bottom-0 z-30 flex h-14 items-center justify-around border-t bg-background md:hidden',
  icon: 'size-5',
};

export function MobileBottomNav() {
  const setLeftMobileOpen = useLayoutStore((s) => s.setLeftMobileOpen);

  return (
    <nav className={styles.root}>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        onPress={() => setLeftMobileOpen(true)}
      >
        <Menu className={styles.icon} />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Home">
        <Home className={styles.icon} />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Search">
        <Search className={styles.icon} />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Profile">
        <User className={styles.icon} />
      </Button>
    </nav>
  );
}
