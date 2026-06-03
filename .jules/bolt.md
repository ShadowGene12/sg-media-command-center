## 2024-06-03 - [App Shell Re-renders from Routing Hooks]
**Learning:** Having `useLocation()` in the main layout wrapper (`CommandCenterLayout`) causes the entire application shell (sidebar, header, background, command palette) to re-render on every single route change, even if those components don't need to re-render.
**Action:** Extract routing hooks (`useLocation`) into smaller, isolated components (like a `PageTransition` wrapper for `AnimatePresence`) so only the components that actually depend on the location state will re-render, preserving the shell's performance.
