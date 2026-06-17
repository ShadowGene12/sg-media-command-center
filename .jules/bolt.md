## 2025-02-28 - Zustand Selectors
**Learning:** In the command-center application, components were subscribing to the entire Zustand store using `const { property } = useCommandStore();`. This causes the component to re-render whenever ANY property in the store changes, leading to unnecessary re-renders.
**Action:** Use Zustand's state selectors instead: `const property = useCommandStore(state => state.property);`. This ensures the component only re-renders when the specific property it needs changes.
