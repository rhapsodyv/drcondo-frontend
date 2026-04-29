# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (proxies /api and /uploads to localhost:3000)
npm run build     # Type-check + production build
npm run lint      # ESLint (flat config)
npm run preview   # Preview production build
```

Testing (Vitest):
```bash
npx vitest              # Run tests in watch mode
npx vitest run          # Run tests once
npx vitest run <file>   # Run a single test file
```

## Architecture

**Entry point:** `src/main.tsx` sets up `QueryClientProvider` (TanStack Query) + `BrowserRouter` wrapping `<App />`.

**Routing:** `src/router/index.tsx` — React Router 7 with `<RouterProvider>`. Pages live in `src/pages/`.

**Layout:** `src/components/layout/AdminLayout.tsx` is the shell — it composes `Navbar`, `LeftSidebar`, `RightSidebar`, and `MobileBottomNav`. Desktop shows a collapsible left sidebar; mobile uses a bottom nav bar with swipe-to-close sheet panels.

**State:** Zustand stores in `src/store/`:
- `useAppStore` — application-level state (e.g., counters)
- `useLayoutStore` — sidebar expanded/collapsed and mobile open/closed flags

Custom hooks in `src/hooks/` derive from these stores and abstract media query detection (`useIsDesktop`, `useMediaQuery`, `useSwipeToClose`).

**UI components:** `src/components/ui/` — built on **React Aria Components** and styled with **Tailwind Variants** (`tv()`). Use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) for conditional class composition.

**Styling:** Tailwind CSS with CSS-variable design tokens defined in `src/index.css`. Component variants use `tailwind-variants` for composable, type-safe styling.

**Data fetching:** TanStack React Query. No custom fetch wrapper yet — add one under `src/lib/` when needed.

**Forms:** React Hook Form + Zod for validation.

**i18n:** Locale files at `src/i18n/locales/{en,pt}.json`. The i18n library is not yet wired into `main.tsx` — the `t()` call in `HomePage` is a placeholder.

**Dev proxy:** Vite forwards `/api/*` and `/uploads/*` to `http://localhost:3000` (the backend).

## Key conventions

- Responsive breakpoint: `md` (768 px) — below is mobile, above is desktop.
- Icon library: Radix UI Icons (`@radix-ui/react-icons`) and Lucide React.
- Drag-and-drop: `@dnd-kit/core` + `@dnd-kit/sortable`.
- File uploads: `simple-uploader.js`.
- Rich text editing: `pell`.
