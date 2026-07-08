## 2024-07-08 - Zustand Subscriptions in App Shell
**Learning:** Widespread re-renders in the application shell (e.g., AppHeader) can be caused by components subscribing to the entire Zustand store instead of specific selectors.
**Action:** Refactor Zustand store subscriptions in frequently rendered or global components to use specific state selectors (e.g., `useStore(state => state.property)`) to prevent unnecessary re-renders.
