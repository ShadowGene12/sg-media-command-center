## 2024-06-27 - Zustand App Shell Re-renders
**Learning:** Application shell components subscribe to the entire Zustand store by destructuring (e.g., `const { tier } = useCommandStore()`), which causes them to re-render anytime unrelated store state (like `diyActions`) changes.
**Action:** Always use individual selectors (`useCommandStore(state => state.tier)`) to subscribe only to the required state slices.
