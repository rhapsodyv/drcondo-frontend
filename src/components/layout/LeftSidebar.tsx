import { NavLink } from 'react-router';
import { tv } from 'tailwind-variants';

import { DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { useSwipeToClose } from '@/hooks/useSwipeToClose';
import { useLayoutStore } from '@/store/useLayoutStore';

import { navItems } from './nav-items';

const aside = tv({
  base: 'hidden shrink-0 border-r bg-background transition-[width] duration-200 ease-out md:flex md:flex-col',
  variants: {
    expanded: {
      true: 'w-64',
      false: 'w-16',
    },
  },
});

const navItem = tv({
  base: [
    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
  ],
  variants: {
    active: {
      true: 'bg-accent text-accent-foreground',
    },
    collapsed: {
      true: 'justify-center px-2',
    },
  },
});

const styles = {
  list: 'flex flex-1 flex-col gap-1 p-2',
  itemIcon: 'size-5 shrink-0',
};

function NavList({ collapsed }: { collapsed: boolean }) {
  return (
    <nav className={styles.list}>
      {navItems.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            navItem({ active: isActive, collapsed })
          }
          title={collapsed ? label : undefined}
        >
          <Icon className={styles.itemIcon} />
          {!collapsed && <span>{label}</span>}
        </NavLink>
      ))}
    </nav>
  );
}

export function LeftSidebar() {
  const leftExpanded = useLayoutStore((s) => s.leftExpanded);
  const leftMobileOpen = useLayoutStore((s) => s.leftMobileOpen);
  const setLeftMobileOpen = useLayoutStore((s) => s.setLeftMobileOpen);

  const swipeHandlers = useSwipeToClose({
    side: 'left',
    onClose: () => setLeftMobileOpen(false),
    enabled: leftMobileOpen,
  });

  return (
    <>
      <aside className={aside({ expanded: leftExpanded })}>
        <NavList collapsed={!leftExpanded} />
      </aside>

      <DialogOverlay isOpen={leftMobileOpen} onOpenChange={setLeftMobileOpen}>
        <DialogContent
          side="left"
          closeButton={false}
          aria-label="Main navigation"
        >
          <div {...swipeHandlers} className="flex h-full touch-pan-y flex-col">
            <NavList collapsed={false} />
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  );
}
