import { Outlet } from 'react-router';

import { LeftSidebar } from './LeftSidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { Navbar } from './Navbar';
import { RightSidebar } from './RightSidebar';

const styles = {
  root: 'flex min-h-screen flex-col',
  body: 'flex flex-1 overflow-hidden',
  main: 'flex-1 overflow-auto p-4',
};

export function AppLayout() {
  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.body}>
        <LeftSidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
        <RightSidebar />
      </div>
      <MobileBottomNav />
    </div>
  );
}
