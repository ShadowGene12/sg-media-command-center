## 2024-05-24 - Zustand Full Store Subscription Re-renders
**Learning:** Application shell components (like `AppHeader`, `AppSidebar`, `CommandPalette`) frequently subscribe to the entire Zustand store (`useCommandStore()`). This causes unnecessary re-renders of the entire app shell whenever any unrelated state (like `overallScore` or `diyActions`) changes.
**Action:** Always use specific state selectors (`useCommandStore(state => state.property)`) instead of full store destructuring to prevent widespread unnecessary re-renders in global components.
