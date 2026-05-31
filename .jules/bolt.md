
## 2024-05-24 - React.memo on Static Visual Components
**Learning:** Purely visual components that span large areas (like `AnimatedBackground`) or are deeply reused (like `PageHeader`) are often wrapped in high-level layout components (`CommandCenterLayout`). Without memoization, ANY state update in the layout or routing context causes these complex DOM nodes to needlessly re-render. Since they take no props or static props, `React.memo` effectively nullifies this overhead.
**Action:** Next time, look for high-level static graphical components (backgrounds, overlays, static headers) and wrap them in `React.memo` by default to shield them from parent render cycles.
