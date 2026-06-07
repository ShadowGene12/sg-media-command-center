
## 2024-06-25 - Zustand Full-Store Subscriptions in App Shell
**Learning:** Components frequently subscribe to the entire Zustand store (e.g., `useCommandStore()`). In global layout components like `AppSidebar`, `AppHeader`, and `CommandPalette`, this causes unnecessary re-renders across the entire application shell whenever any unrelated property in the store changes.
**Action:** Always use specific state selectors (e.g., `useCommandStore(state => state.property)`) or `useShallow` when consuming state from Zustand, especially in components that are rendered frequently or globally.
