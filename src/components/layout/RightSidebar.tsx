import { tv } from 'tailwind-variants';

import { DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { useSwipeToClose } from '@/hooks/useSwipeToClose';
import { useLayoutStore } from '@/store/useLayoutStore';

const aside = tv({
  base: 'hidden shrink-0 bg-background transition-[width] duration-200 ease-out md:flex md:flex-col',
  variants: {
    visible: {
      true: 'w-80 border-l',
      false: 'w-0 overflow-hidden',
    },
  },
});

const styles = {
  panel: 'flex flex-1 flex-col gap-4 p-4',
  title: 'text-lg font-semibold',
  description: 'text-sm text-muted-foreground',
};

function Panel() {
  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Settings</h2>
      <p className={styles.description}>
        Adjust your workspace preferences.
      </p>
    </div>
  );
}

export function RightSidebar() {
  const rightVisible = useLayoutStore((s) => s.rightVisible);
  const rightMobileOpen = useLayoutStore((s) => s.rightMobileOpen);
  const setRightMobileOpen = useLayoutStore((s) => s.setRightMobileOpen);

  const swipeHandlers = useSwipeToClose({
    side: 'right',
    onClose: () => setRightMobileOpen(false),
    enabled: rightMobileOpen,
  });

  return (
    <>
      <aside className={aside({ visible: rightVisible })}>
        {rightVisible && <Panel />}
      </aside>

      <DialogOverlay isOpen={rightMobileOpen} onOpenChange={setRightMobileOpen}>
        <DialogContent side="right" closeButton aria-label="Settings panel">
          <div {...swipeHandlers} className="flex h-full touch-pan-y flex-col">
            <Panel />
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  );
}
