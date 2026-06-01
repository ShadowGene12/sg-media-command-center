## 2024-05-30 - App Shell Re-render Bottleneck
**Learning:** Using `useLocation` directly in the main layout component (`CommandCenterLayout`) forces the entire application shell (sidebar, header, background) to re-render on every single route change, creating an architectural performance bottleneck.
**Action:** Extract routing hooks and animated transitions into a dedicated `PageTransitionOutlet` component so the layout shell remains static while only the main content area re-renders.
