## 2025-02-28 - Onboarding overlays intercept Playwright clicks
**Learning:** The application uses `driver.js` for onboarding, which renders a full-page overlay (`.driver-overlay`) that intercepts pointer events during local testing, causing Playwright click actions to timeout.
**Action:** Always strip driver elements (`document.querySelectorAll('.driver-overlay, .driver-popover').forEach(e => e.remove())`) when writing visual verification scripts for UI components.
