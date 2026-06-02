## 2024-05-24 - AnimatedBackground Re-renders
**Learning:** AnimatedBackground is an expensive, static background component that sits at the root of many application shells and routing components. Because it relies on complex pure CSS gradients/blurs, whenever its parent re-renders (like routing changes in App.tsx), it gets re-evaluated by React.
**Action:** Always wrap heavy static presentation components like `AnimatedBackground` in `React.memo()` to prevent them from participating in the React render cycle unnecessarily.
