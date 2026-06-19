## 2024-05-24 - Zustand Subscription Bottleneck
**Learning:** The application shell components (AppHeader, AppSidebar, CommandPalette) were subscribing to the entire Zustand store (e.g., `useCommandStore()`). This caused full application re-renders whenever any unrelated state in the store changed (like daily actions or overall scores).
**Action:** Always use individual selectors (e.g., `useCommandStore(state => state.property)`) for Zustand stores to prevent unnecessary component re-renders. Avoid relying on destructuring the entire store object.
