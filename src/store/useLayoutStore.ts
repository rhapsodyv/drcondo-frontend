import { create } from 'zustand';

interface LayoutState {
  leftExpanded: boolean;
  leftMobileOpen: boolean;
  rightVisible: boolean;
  rightMobileOpen: boolean;
  toggleLeftExpanded: () => void;
  setLeftMobileOpen: (open: boolean) => void;
  toggleRightVisible: () => void;
  setRightMobileOpen: (open: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  leftExpanded: true,
  leftMobileOpen: false,
  rightVisible: false,
  rightMobileOpen: false,
  toggleLeftExpanded: () =>
    set((state) => ({ leftExpanded: !state.leftExpanded })),
  setLeftMobileOpen: (open) => set({ leftMobileOpen: open }),
  toggleRightVisible: () =>
    set((state) => ({ rightVisible: !state.rightVisible })),
  setRightMobileOpen: (open) => set({ rightMobileOpen: open }),
}));
