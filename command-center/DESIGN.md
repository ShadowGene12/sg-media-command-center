---
name: SG Media Command Center
colors:
  # Core Surfaces
  background: "#050505"
  surface: "#0A0A0C"
  surface-dim: "#050505"
  surface-bright: "#222831"
  surface-container-lowest: "#050505"
  surface-container-low: "#0A0A0C"
  surface-container: "#1A1E24"
  surface-container-high: "#222831"
  surface-container-highest: "#333A44"
  on-surface: "#F8F9FA"
  on-surface-variant: "#A8B2BD"
  inverse-surface: "#F8F9FA"
  inverse-on-surface: "#0A0A0C"

  # Borders & Outlines
  outline: "#515B68"
  outline-variant: "#333A44"
  surface-tint: "#6D4AE6"

  # Primary — Brand Violet
  primary: "#6D4AE6"
  on-primary: "#FFFFFF"
  primary-container: "#221359"
  on-primary-container: "#F0EEFF"
  inverse-primary: "#C4B5FD"
  primary-hover: "#8B6CF6"
  primary-muted: "#5233B8"

  # Secondary — Steel / Neutral
  secondary: "#333A44"
  on-secondary: "#F8F9FA"
  secondary-container: "#1A1E24"
  on-secondary-container: "#D8DDE3"

  # Tertiary — Emerald / Success
  tertiary: "#10B981"
  on-tertiary: "#FFFFFF"
  tertiary-container: "#1D9E75"
  on-tertiary-container: "#FFFFFF"

  # Semantic — Status Colors
  error: "#EF4444"
  on-error: "#FFFFFF"
  error-container: "#7F1D1D"
  on-error-container: "#FECACA"
  warning: "#F59E0B"
  on-warning: "#000000"
  info: "#378ADD"
  on-info: "#FFFFFF"

  # Pillar Accent Colors (Data Visualization)
  pillar-market: "#6D4AE6"
  pillar-acquisition: "#378ADD"
  pillar-sales: "#1D9E75"
  pillar-profit: "#F59E0B"
  pillar-finance: "#D85A30"

  # Glass Surface Alphas
  glass-card: rgba(0, 0, 0, 0.40)
  glass-card-hover: rgba(255, 255, 255, 0.04)
  glass-card-border: rgba(255, 255, 255, 0.05)
  glass-card-border-hover: rgba(255, 255, 255, 0.10)
  glass-card-border-active: rgba(139, 92, 246, 0.20)
  glass-shine: rgba(255, 255, 255, 0.08)

typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: "300"
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: "500"
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: "500"
    lineHeight: 20px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: "600"
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: "500"
    lineHeight: 20px
  mono-xs:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: "600"
    lineHeight: 14px
    letterSpacing: 0.1em

rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.625rem
  lg: 0.75rem
  xl: 1rem
  2xl: 1.5rem
  full: 9999px

spacing:
  base: 4px
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 40px
  3xl: 64px
  section-gap: 48px
  card-padding: 32px
  card-gap: 24px
  sidebar-collapsed: 80px
  sidebar-expanded: 260px
  header-height: 64px

motion:
  page-enter:
    duration: 400ms
    easing: spring(1, 100, 10, 0)
    properties: opacity, translateY, scale, filter
  page-exit:
    duration: 300ms
    easing: circOut
    properties: opacity, translateY, scale, filter
  sidebar-expand:
    duration: 350ms
    easing: spring(1, 200, 25, 0)
  stagger-children:
    delay: 100ms
    base-delay: 300ms
  element-reveal:
    duration: 600ms
    easing: spring(1, 100, 15, 0)
    properties: opacity, translateY, filter
  hover-glow:
    duration: 300ms
    easing: ease-out
  background-orb:
    duration: 25000ms
    easing: linear
    repeat: infinite
  typewriter-char:
    delay-per-char: 30ms
    blur-from: 4px
    blur-to: 0px

components:
  glass-card:
    backgroundColor: "{colors.glass-card}"
    backdropFilter: blur(24px)
    borderColor: "{colors.glass-card-border}"
    borderWidth: 1px
    rounded: "{rounded.2xl}"
    padding: "{spacing.card-padding}"
  glass-card-hover:
    backgroundColor: "{colors.glass-card-hover}"
    borderColor: "{colors.glass-card-border-hover}"
    boxShadow: 0 0 30px rgba(139, 92, 246, 0.12)
  glass-card-glow:
    backgroundColor: "{colors.glass-card}"
    backdropFilter: blur(24px)
    borderColor: "{colors.glass-card-border}"
    rounded: "{rounded.2xl}"
    glowRadius: 600px
    glowOpacity: 0
    glowOpacityHover: 1
    glowTransition: 300ms
  sidebar:
    backgroundColor: "{colors.glass-card}"
    backdropFilter: blur(24px)
    borderColor: "{colors.glass-card-border}"
    widthCollapsed: "{spacing.sidebar-collapsed}"
    widthExpanded: "{spacing.sidebar-expanded}"
  sidebar-item:
    textColor: "#94A3B8"
    rounded: "{rounded.xl}"
    padding: 10px
    height: 40px
  sidebar-item-active:
    textColor: "#FFFFFF"
    backgroundColor: rgba(139, 92, 246, 0.10)
    borderColor: rgba(139, 92, 246, 0.20)
    iconColor: "#A78BFA"
  header:
    backgroundColor: rgba(0, 0, 0, 0.20)
    backdropFilter: blur(24px)
    borderColor: "{colors.glass-card-border}"
    height: "{spacing.header-height}"
  button-primary:
    backgroundColor: "#FFFFFF"
    textColor: "#000000"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: 48px
    padding: 0 32px
  button-primary-hover:
    boxShadow: 0 0 30px rgba(255, 255, 255, 0.15)
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.lg}"
  command-palette:
    backgroundColor: rgba(10, 10, 15, 0.95)
    backdropFilter: blur(24px)
    borderColor: rgba(255, 255, 255, 0.10)
    rounded: "{rounded.2xl}"
    boxShadow: 0 0 100px -20px rgba(109, 74, 230, 0.6)
    maxWidth: 672px
  command-palette-item:
    textColor: rgba(255, 255, 255, 0.80)
    rounded: "{rounded.lg}"
    padding: 12px
  command-palette-item-selected:
    backgroundColor: rgba(255, 255, 255, 0.10)
    textColor: "#FFFFFF"
  toast:
    backgroundColor: rgba(15, 10, 31, 0.80)
    backdropFilter: blur(24px)
    borderColor: rgba(255, 255, 255, 0.10)
    boxShadow: 0 0 40px -10px rgba(109, 74, 230, 0.5)
  badge-tier:
    backgroundColor: rgba(139, 92, 246, 0.15)
    textColor: "#A78BFA"
    typography: "{typography.mono-xs}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  input-search:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.DEFAULT}"
    height: 40px
  action-item:
    backgroundColor: transparent
    rounded: "{rounded.xl}"
    padding: 16px
  action-item-hover:
    backgroundColor: rgba(255, 255, 255, 0.02)
  action-item-completed:
    opacity: 0.40
    textDecoration: line-through
  checkbox-unchecked:
    borderColor: "#475569"
    borderWidth: 2px
    rounded: "{rounded.full}"
    size: 20px
  checkbox-checked:
    backgroundColor: rgba(16, 185, 129, 0.20)
    borderColor: rgba(16, 185, 129, 0.50)
    iconColor: "#34D399"
---

## Brand & Style

SG Media Command Center is a strategic SaaS operating system for growth-stage businesses. The design language channels the personality of **an intelligent agent**: precise, calm, and quietly powerful. It takes inspiration from mission control interfaces and cinematic sci-fi HUDs, but grounds itself in functional clarity—every visual layer exists to reduce cognitive load and elevate focus.

The aesthetic is **Dark Ambient Glass**. The interface floats in a near-black void punctuated by slow-moving, organic light orbs. Surfaces are translucent crystalline panels layered with backdrop blur and subtle noise grain. The overall emotional register is **premium, focused, and trustworthy**—a user should feel they are sitting inside a high-end cockpit built specifically for their business.

The brand's visual axis is a single dominant accent: a **deep violet** (`#6D4AE6`) that functions as the system's heartbeat. It appears in active states, ambient glows, loading pulses, and laser-border animations. It never overwhelms—it signals.

## Colors

The palette is built on a strict dark-mode foundation. All surface colors descend from near-black (`#050505`) through a progression of steel-tinted neutrals. This creates a sense of infinite depth while maintaining clear foreground/background separation.

- **Background:** The application canvas is `#050505`—not pure black, but a warm-cool midnight that avoids the harshness of `#000000`. A fractal noise grain texture at 2.5% opacity is applied globally as a `body::after` pseudo-element to prevent banding and add organic texture.
- **Surfaces:** All interactive panels use `rgba(0, 0, 0, 0.40)` with `backdrop-blur: 24px`, creating the signature "frosted dark glass" effect. Borders are set at `rgba(255, 255, 255, 0.05)`, upgrading to `0.10` on hover.
- **Accent:** Brand violet (`#6D4AE6`) is the sole primary accent. It is never used as a fill for large areas—only for icon tints, glow emissions, active-state indicators, and the animated "laser border" effect.
- **Semantic:** Pillar colors (violet, blue, green, amber, burnt orange) are reserved for data visualization and categorical badges. They are applied at low opacity for backgrounds (`color + "20"` alpha) and full saturation for text labels.
- **Text:** Primary text is `#F8F9FA` (near-white). Secondary text is `#A8B2BD` (steel-400). Tertiary/disabled text is `#515B68` (steel-600). The monospaced font (JetBrains Mono) is used at the `#94A3B8` (slate-400) level for timestamps, labels, and data points.

## Typography

The type system uses two font families that create a clear functional split:

- **Plus Jakarta Sans** is the primary display and body typeface. Its rounded terminals and generous x-height give the interface a contemporary, approachable warmth that counterbalances the dark, technical environment. Headlines use light weights (300–500) to maintain elegance at large sizes, while body text uses regular weight (400) for readability.
- **JetBrains Mono** is the data typeface. It is applied to all numerical readouts, status labels, timestamps, keyboard shortcuts, tier badges, and metadata strings. Using a monospaced font for these elements signals precision and technical authority. It is styled at `10–14px` with `0.05–0.1em` letter-spacing and uppercase transforms for labels.

Key typographic decisions:
- Hero greetings use `display-lg` (48px / light / -0.02em tracking) to create a cinematic, editorial opening.
- Section headers use `label-sm` in monospace, uppercase, with wide tracking (`0.05em+`) to create a "systems UI" feel—small, precise, and unobtrusive.
- Action item text uses `body-sm` (14px) to maintain density without sacrificing legibility.
- A character-by-character "typewriter" animation with a per-character blur-in reveals the greeting text, reinforcing the "intelligent agent" personality.

## Layout & Spacing

The layout follows a responsive shell model: a collapsible sidebar on the left, a sticky header at the top, and a fluid content area in the center.

- **Sidebar:** Collapses to 80px (icon-only) and expands to 260px on hover. The expand/collapse is animated with a spring physics curve (`stiffness: 200, damping: 25`). Nav labels and group headings fade in/out with a 200ms opacity transition. An animated `layoutId` highlight pill tracks the active route.
- **Content Area:** Maximum width is capped at `max-w-5xl` (1024px) and horizontally centered. Page padding is `16px` on mobile and `32px` on desktop. Vertical section spacing uses 48px gaps to create generous breathing room.
- **Grid:** The dashboard uses a 12-column CSS grid. The primary "Focus Card" spans 8 columns, while the "Score Card" spans 4 columns. Full-width sections (action list, activity feed) span all 12.
- **Rhythm:** All dimensions derive from a 4px base unit. Common spacing tokens are 8px, 16px, 24px, 32px, 40px, and 64px.

## Elevation & Depth

Depth in this system is achieved through **light physics**, not traditional shadows. The interface uses three elevation layers:

- **Layer 0 — The Void:** The `#050505` canvas with slow-drifting ambient light orbs (violet and cyan, at 3–8% opacity, 160–180px blur radius) that create a living, breathing background. A 40px grid overlay at 5% opacity with a radial fade mask adds subtle structure.
- **Layer 1 — Glass Panels:** All cards, the sidebar, and the header use `backdrop-blur: 24px` with `bg: rgba(0, 0, 0, 0.40)`. They are separated from the void by a single 1px border at `rgba(255, 255, 255, 0.05)`. The `PremiumCard` component adds a secondary top-edge-only inner border at `rgba(255, 255, 255, 0.08)` to simulate a light refraction "shine."
- **Layer 2 — Elevated Surfaces:** Modals and the Command Palette sit at `z-100` with a stronger blur (`blur-2xl`) and a dramatic violet box-shadow (`0 0 100px -20px rgba(109, 74, 230, 0.6)`). The background scrim uses `rgba(0, 0, 0, 0.80)` with `backdrop-blur: md`.
- **Interactive Glow:** The `PremiumCard` component tracks the mouse cursor and renders a radial gradient (`600px circle`) at the pointer position, creating a "flashlight" glow effect that follows the user's movement. The glow color defaults to violet at 15% opacity and fades in/out over 300ms.

## Shapes

The shape language is smooth and organic, reinforcing the premium, non-aggressive personality:

- **Cards:** All glass panels use `rounded-2xl` (1.5rem / 24px). This large radius softens the edges and avoids the rigid, "spreadsheet" feel of sharp corners.
- **Buttons:** Primary CTAs use `rounded-full` (pill shape) with solid white fills and black text—maximum contrast against the dark environment. Ghost buttons use `rounded-lg` (12px).
- **Sidebar Items:** Use `rounded-xl` (16px) with the animated active highlight matching the same radius.
- **Badges & Tags:** Use `rounded-full` for status indicators and tier labels.
- **Inputs:** Search fields use `rounded-DEFAULT` (8px) to maintain a structured, professional feel.
- **Icons:** All icons are sourced from Lucide React (2px stroke weight, rounded caps/joins), harmonizing with the soft border radii of their containers.

### Glass Cards

The `PremiumCard` is the foundational container component. It wraps all content sections in a translucent panel with mouse-tracking glow, a top-edge shine border, and smooth hover transitions. Cards never use solid backgrounds—transparency is the defining characteristic.

The `glass-card-border` intensifies from `0.05` to `0.10` alpha on hover. On active/focused states, the border shifts to a violet tint at `0.20` alpha. Large decorative icons (e.g., Target, Compass) are rendered at 3–5% opacity as watermark-style background elements inside hero cards to add visual texture without competing with content.

### Animated Backgrounds

The background layer uses Framer Motion to animate two large blurred orbs:
- A violet orb (top-left quadrant, 50vw diameter) oscillates position and opacity over 25 seconds.
- A cyan orb (bottom-right quadrant, 60vw diameter) counter-moves over 30 seconds with a 2-second phase delay.
- A central violet radial gradient pulses scale between 1.0x and 1.1x over 20 seconds.

This creates a slow, ambient "breathing" effect that makes the void feel alive without distracting from foreground content.

### Motion System

Page transitions use spring-based animations with blur:
- **Enter:** `opacity: 0 → 1`, `y: 15 → 0`, `scale: 0.99 → 1`, `blur: 4px → 0px` over 400ms.
- **Exit:** The reverse, with a 300ms duration.
- **Stagger:** Child elements within a page reveal sequentially with 100ms delays, starting after a 300ms base delay.

The sidebar uses a `layoutId` shared animation for the active indicator pill, creating a fluid, physics-based sliding highlight when navigating between routes.

### Command Palette

The Command Palette is a full-screen overlay triggered by `Ctrl/Cmd + K`. It uses the highest elevation treatment in the system:
- Scrim: `bg-black/80` with `backdrop-blur: md`.
- Panel: Near-black glass (`rgba(10, 10, 15, 0.95)`) with `backdrop-blur: 2xl`, a violet bloom shadow, and `rounded-2xl`.
- Input: Large (text-2xl) display font with no background, creating a "floating prompt" feel.
- Items: Each result shows an icon, label, and a `kbd` enter-key hint that only appears on the selected item.

### Laser Border

A CSS-only animated conic gradient border can be applied to any element via the `.animated-laser-border` class. It uses `@property --border-angle` to rotate a conic gradient (transparent → violet) around the element's perimeter over 4 seconds, creating a "scanning laser" effect.
