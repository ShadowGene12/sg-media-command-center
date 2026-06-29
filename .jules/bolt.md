## 2026-06-29 - Zustand Application Shell Re-renders
**Learning:** Components across the application were subscribing to the entire Zustand store using destructuring (e.g., `const { tier } = useCommandStore()`), causing unnecessary re-renders when unrelated state changed. The application shell was particularly affected.
**Action:** Always use multiple individual selector calls (e.g., `const tier = useCommandStore(state => state.tier);`) when accessing Zustand state to prevent widespread unnecessary re-renders.
