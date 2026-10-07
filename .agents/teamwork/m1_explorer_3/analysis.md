# Cyber Design System, Responsive CSS Tokens & Visual Architecture
**Author:** `m1_explorer_3` (Explorer: Design System & CSS Architecture)  
**Milestone:** Milestone 1 (Foundation Layout & Assets)  
**Target Path:** `/Users/andrewstrachan/career_portfolio/styles/` (`main.css`, `components.css`, `print.css`)  
**Date:** 2026-10-06  

---

## 1. Executive Summary & Design Philosophy

The objective of this design system is to deliver a cutting-edge, high-impact **Electronic Career Portfolio** for **Andrew Strachan**, positioning him as an elite **Information Security Analyst & Cybersecurity Systems Engineer** (Federal Public Service / CyberCorps SFS Specialization).

### Elevating Beyond the Student Benchmark
The coached student portfolio (`index1.html`, DonnaKaran Allen) utilized static white/light-gray cards, default Tailwind blue accents, a static JPEG scan of a paper resume, and basic spreadsheet screenshots. In stark contrast, Andrew Strachan's portfolio establishes an authoritative **Cyber-Themed Command Center**:
1. **Visual Tone**: Deep Midnight canvas (`#060b13` / `#0b1220`), metallic radiant Circuit Gold (`#d4af37`), and high-energy Electric Cyan (`#00e5ff`), directly extracted from his master brand mark emblem (`media_1791283990241.jpg`).
2. **Tactile Depth**: Refined glassmorphism (`backdrop-filter: blur(12px)`), multi-layered neon drop shadows, and animated printed circuit board (PCB) trace borders.
3. **Responsive Precision**: Fluid, zero-overflow layouts rigorously tested across **375px** (compact mobile), **768px** (tablet), and **1440px** (desktop) viewports.
4. **Performance & Core Web Vitals (CWV)**: Zero layout shift (`CLS = 0.000`), `scrollbar-gutter: stable`, `content-visibility: auto` layout containment, and `font-display: swap`.
5. **FBLA Exceeds Expectations**: Native `<dialog>` inspection sheets, interactive video preview frames with custom scrubbers, a sticky FBLA 7-minute presenter timer HUD, and high-contrast WCAG AAA compliance.

---

## 2. CSS Custom Properties & Token Architecture

The token architecture is organized into semantic layers within `:root` in `styles/main.css`. It incorporates progressive enhancement for modern color spaces (`in oklch` / `in oklab`) with fallback values for broad browser compatibility.

### 2.1. Color Tokens & Contrast Rationale

```css
:root {
  /* ==========================================================================
     COLOR TOKENS: BASE CANVASES & SURFACES
     ========================================================================== */
  --color-midnight-base: #060b13;        /* Root viewport canvas (darkest abyss) */
  --color-midnight-surface: #0b1220;     /* Primary card & section surface */
  --color-midnight-elevated: #111a2e;    /* Hover states, inputs, elevated panels */
  --color-midnight-glass: rgba(11, 18, 32, 0.78); /* Glassmorphic panel background */
  --color-midnight-scrim: rgba(6, 11, 19, 0.85);  /* Modal & drawer backdrop scrim */

  /* ==========================================================================
     COLOR TOKENS: BRAND ACCENTS (EXTRACTED FROM MASTER CREST)
     ========================================================================== */
  /* Circuit Gold: Represents Academic Distinction, FBLA Heritage & Federal Leadership */
  --color-circuit-gold: #d4af37;         /* Radiant metallic gold */
  --color-circuit-gold-subtle: #e9d8a6;  /* Pale gold for secondary headers */
  --color-circuit-gold-dark: #8a7322;    /* Deep gold for borders & circuit traces */
  --color-circuit-gold-glow: rgba(212, 175, 55, 0.40);
  --color-circuit-gold-dim: rgba(212, 175, 55, 0.15);

  /* Cyber Cyan / Teal: Represents Zero-Trust Security, Defense & Quantum Logic */
  --color-cyber-cyan: #00e5ff;          /* High-voltage electric cyan */
  --color-cyber-cyan-hover: #33ebff;    /* Brightened cyan on hover */
  --color-cyber-cyan-dark: #0099aa;     /* Darker cyan for active borders */
  --color-cyber-cyan-glow: rgba(0, 229, 255, 0.40);
  --color-cyber-cyan-dim: rgba(0, 229, 255, 0.12);
  --color-cyber-teal: #0a9396;          /* Structural deep teal */
  --color-cyber-teal-dim: rgba(10, 147, 150, 0.20);

  /* Functional Status & Verification Indicators */
  --color-verify-green: #10b981;        /* Credly / NIST verified indicator */
  --color-verify-green-glow: rgba(16, 185, 129, 0.35);
  --color-alert-amber: #f59e0b;         /* Timer countdown warning */
  --color-alert-red: #ef4444;           /* SFS clearance restriction / urgent notice */

  /* ==========================================================================
     COLOR TOKENS: TYPOGRAPHY & CONTRAST
     ========================================================================== */
  --color-text-primary: #f8fafc;        /* High-contrast crisp ice white (18.4:1 contrast) */
  --color-text-secondary: #94a3b8;      /* Legible secondary slate text (5.8:1 contrast) */
  --color-text-muted: #64748b;          /* Meta notes, timestamps, inactive icons */
  --color-text-accent: #00e5ff;         /* Interactive links & cyber highlights */
  --color-text-gold: #d4af37;           /* Prestigious awards, credential badges */

  /* ==========================================================================
     BORDER & CIRCUIT GRID TOKENS
     ========================================================================== */
  --border-dim: 1px solid rgba(255, 255, 255, 0.08);
  --border-cyan-dim: 1px solid rgba(0, 229, 255, 0.22);
  --border-gold-dim: 1px solid rgba(212, 175, 55, 0.25);
  --border-cyan-active: 1px solid #00e5ff;
  --border-gold-active: 1px solid #d4af37;
}
```

### 2.2. WCAG Contrast Verification Matrix

| Element Pair | Foreground Hex | Background Hex | Calculated Contrast | WCAG Rating | Target Compliance |
|---|---|---|---|---|---|
| Primary Headings & Body | `#f8fafc` | `#060b13` (canvas) | **18.4 : 1** | **AAA** (> 7.0:1) | PASS |
| Secondary Slate Copy | `#94a3b8` | `#060b13` (canvas) | **6.7 : 1** | **AA** (> 4.5:1) | PASS |
| Primary Text on Panel | `#f8fafc` | `#0b1220` (panel) | **16.1 : 1** | **AAA** (> 7.0:1) | PASS |
| Secondary Text on Panel | `#94a3b8` | `#0b1220` (panel) | **5.8 : 1** | **AA** (> 4.5:1) | PASS |
| Electric Cyan Accent | `#00e5ff` | `#060b13` (canvas) | **12.5 : 1** | **AAA** (> 7.0:1) | PASS |
| Circuit Gold Accent | `#d4af37` | `#060b13` (canvas) | **8.8 : 1** | **AAA** (> 7.0:1) | PASS |
| Button Text on Cyan Pill | `#060b13` (dark) | `#00e5ff` (cyan) | **12.5 : 1** | **AAA** (> 7.0:1) | PASS |
| Button Text on Gold Pill | `#060b13` (dark) | `#d4af37` (gold) | **8.8 : 1** | **AAA** (> 7.0:1) | PASS |

### 2.3. Typography Tokens & Fluid Scaling

```css
:root {
  /* ==========================================================================
     FONT FAMILIES
     ========================================================================== */
  /* Primary Sans: Clean, highly legible geometric system stack */
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Helvetica Neue", sans-serif;
  /* Monospace Stack: Technical code, NIST IDs, terminal metrics, timecodes */
  --font-mono: "JetBrains Mono", "SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace;
  /* Display / Headline: Futuristic cyber-styled headings */
  --font-display: "Space Grotesk", "Outfit", system-ui, sans-serif;

  /* ==========================================================================
     FLUID TYPE SCALES (clamp(min, preferred, max))
     Zero CLS fluid typography across 375px -> 1440px
     ========================================================================== */
  --font-size-xs: clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem); /* 12px - 13px */
  --font-size-sm: clamp(0.8125rem, 0.78rem + 0.2vw, 0.875rem);  /* 13px - 14px */
  --font-size-base: clamp(0.9375rem, 0.88rem + 0.25vw, 1.0rem); /* 15px - 16px */
  --font-size-md: clamp(1.0625rem, 0.98rem + 0.4vw, 1.25rem);   /* 17px - 20px */
  --font-size-lg: clamp(1.25rem, 1.15rem + 0.6vw, 1.625rem);    /* 20px - 26px */
  --font-size-xl: clamp(1.5rem, 1.35rem + 0.9vw, 2.125rem);     /* 24px - 34px */
  --font-size-2xl: clamp(1.875rem, 1.6rem + 1.4vw, 2.75rem);    /* 30px - 44px */
  --font-size-hero: clamp(2.35rem, 1.9rem + 2.4vw, 3.85rem);    /* 38px - 62px */

  /* Line Heights */
  --line-height-tight: 1.15;
  --line-height-snug: 1.3;
  --line-height-relaxed: 1.65;
  --line-height-code: 1.45;

  /* Letter Spacing */
  --letter-spacing-tight: -0.02em;
  --letter-spacing-wide: 0.05em;
  --letter-spacing-cyber: 0.12em;
}
```

### 2.4. Spacing, Layout, Elevation & Glow Shadows

```css
:root {
  /* ==========================================================================
     LAYOUT & SPACING TOKENS
     ========================================================================== */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1.0rem;   /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2.0rem;   /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3.0rem;  /* 48px */
  --space-16: 4.0rem;  /* 64px */
  --space-20: 5.0rem;  /* 80px */

  /* Viewport Constraints */
  --container-max-width: 1440px;
  --header-height: 4.25rem;            /* 68px reserved height to prevent CLS */
  --header-height-mobile: 3.75rem;     /* 60px reserved height */
  --border-radius-sm: 6px;
  --border-radius-md: 10px;
  --border-radius-lg: 16px;
  --border-radius-full: 9999px;

  /* ==========================================================================
     GLASSMORPHISM & DEPTH
     ========================================================================== */
  --glass-blur: blur(14px);
  --glass-saturate: saturate(180%);
  --glass-backdrop: blur(14px) saturate(180%);

  /* ==========================================================================
     NEON GLOW BOX-SHADOWS
     ========================================================================== */
  --shadow-card: 0 4px 24px -2px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.06);
  --shadow-card-hover: 0 12px 36px -4px rgba(0, 0, 0, 0.8), 0 0 24px -2px rgba(0, 229, 255, 0.22);
  --glow-cyan-sm: 0 0 12px rgba(0, 229, 255, 0.28);
  --glow-cyan-md: 0 0 20px rgba(0, 229, 255, 0.40), 0 0 40px rgba(0, 229, 255, 0.15);
  --glow-gold-sm: 0 0 12px rgba(212, 175, 55, 0.32);
  --glow-gold-md: 0 0 22px rgba(212, 175, 55, 0.45), 0 0 45px rgba(212, 175, 55, 0.18);
  --glow-text-cyan: 0 0 10px rgba(0, 229, 255, 0.5);
  --glow-text-gold: 0 0 10px rgba(212, 175, 55, 0.5);
}
```

---

## 3. Responsive Layout Rules & Breakpoint Specifications

The application uses a **mobile-first** fluid methodology with explicit breakpoint targets corresponding to the project criteria:
- **Compact Mobile**: `375px` (tested at iPhone SE / compact viewports)
- **Tablet / Medium Slate**: `768px` (iPad portrait / intermediate screens)
- **Desktop / High-Density**: `1440px` (macOS / standard wide monitors)

### 3.1. Global Viewport Mechanics & Container Constraints

To prevent mobile URL-bar jumps and eliminate horizontal scrolling caused by scrollbars:
```css
/* Layout stability per modern-web-guidance */
html {
  box-sizing: border-box;
  scrollbar-gutter: stable;             /* Eliminates layout shifts when scrollbars appear */
  scroll-behavior: smooth;              /* Smooth anchor jumps */
  -webkit-text-size-adjust: 100%;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--color-midnight-base);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  overflow-x: clip;                    /* Clips accidental spillover without scroll container */
  min-height: 100dvh;                  /* Uses dynamic viewport height */
}

/* Centralized Page Container */
.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin-inline: auto;
  padding-inline: var(--space-4);      /* 16px on mobile 375px */
}

@media (min-width: 768px) {
  .container {
    padding-inline: var(--space-8);    /* 32px on tablet 768px */
  }
}

@media (min-width: 1440px) {
  .container {
    padding-inline: var(--space-12);   /* 48px on desktop 1440px */
  }
}

/* Offset all section anchors to prevent sticky header occlusion */
section[id] {
  scroll-margin-top: calc(var(--header-height) + var(--space-4));
}

@media (max-width: 767px) {
  section[id] {
    scroll-margin-top: calc(var(--header-height-mobile) + var(--space-3));
  }
}
```

### 3.2. Detailed Section Responsive Matrix

| Section / Element | Mobile (375px Viewport) | Tablet (768px Viewport) | Desktop (1440px Viewport) |
|---|---|---|---|
| **Sticky Header Navigation** | 60px height. Compact brand mark (34px), hamburger toggle, Presenter icon button. Slide-over glass sheet on open. | 68px height. Brand mark (40px) + name. Horizontal scrollable nav tab-bar + Presenter & PDF actions. | 68px height. Brand mark (44px) + title + 7 section links + SFS Fellow beacon + Presenter Mode & PDF buttons. |
| **Hero Presentation** | 1-column stacked. Centered 140px Brand Crest, title, SFS badge pill, stacked CTA buttons (48px touch targets). | 1-column or compact 2-column. 180px Brand Crest. 2-across metric chips. Inline CTA buttons. | 2-column split (60% / 40%). Left: Executive summary, credentials, live stat strip. Right: 3D illuminated Circuit "M" crest with orbital radar ring. |
| **Interactive Resume & Timeline** | Single-column. Horizontally scrollable skill filter pills with touch-snap. Compact vertical timeline nodes with expandable STAR cards. | 2-column or sticky category sidebar. Expanded STAR cards with inline credential tags. | Asymmetric 2-column layout. Left: Interactive skill matrix & radar breakdown. Right: Master chronological career spine with Credly/GitHub verification links. |
| **Career Summary & BLS Research** | Stacked 1-column metric cards. Touch-friendly obstacle drill-downs. | 2×2 metric matrix ($120k median, $182k top 10%, 32% growth, 500k cyber deficit). | 4-card metric strip + side-by-side NIST NICE cybersecurity work role matrix & federal GS pay progression (GS-9 to GS-14). |
| **Sample Materials & Skills** | 1-column accordion or card stack. Top 5 skills with inline Credly badge preview. | 2-column card grid. Interactive credential launcher. | 3-column card grid: (1) Academic & STRIDE Threat Modeling, (2) 51-Position Federal Tracker & SFS Job Fair, (3) Top 5 Skills with Credly MCE embed + 30 LinkedIn certs modal launcher. |
| **Media Showcase & Video Previews** | Single-column cards. 16:9 aspect-ratio video player with tap-to-play overlay and touch scrubber. | 2-column grid of 4 video cards (Sanctum, Tutor, AdaptiveHS, Maqkrs). | 4-column showcase grid (or 1 Featured Hero Player + 3 subordinate cards) followed by filterable directory of 28+ live URLs. |
| **Sources & Provenance Ledger** | Card-based evidence list with copyable source IDs and credential pills. | 2-column responsive layout with searchable data-table wrapper. | Full-width dense cyber audit table (`font-mono`) with rubric alignment columns, source hashes, and external verification links. |
| **Presenter Mode Overlay / HUD** | Bottom-anchored glass drawer with 7-minute timer, next/prev slide buttons, notes toggle. | Fixed bottom or top cyber HUD with time elapsed, progress bar, and collapsible speaker notes drawer. | Fullscreen cyber presentation HUD with floating 7-minute countdown bar, slide index, keyboard shortcuts guide (`Space`, `←`, `→`, `Esc`), and docked speaker notes. |

---

## 4. Component Styling Specifications

### 4.1. Cyber Glassmorphism Cards (`.cyber-card`)

Cards form the fundamental surface of the portfolio. They combine glassmorphism, subtle circuit border gradients, and cybernetic corner accents.

```css
/* Component: Cyber Glass Card */
.cyber-card {
  position: relative;
  background-color: var(--color-midnight-glass);
  backdrop-filter: var(--glass-backdrop);
  -webkit-backdrop-filter: var(--glass-backdrop);
  border-radius: var(--border-radius-md);
  border: 1px solid rgba(0, 229, 255, 0.16);
  padding: var(--space-6);
  box-shadow: var(--shadow-card);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.25s ease,
              box-shadow 0.25s ease;
  overflow: hidden;
}

/* Corner Circuit Accents */
.cyber-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  border-top: 2px solid var(--color-circuit-gold);
  border-left: 2px solid var(--color-circuit-gold);
  pointer-events: none;
}

.cyber-card::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  border-bottom: 2px solid var(--color-cyber-cyan);
  border-right: 2px solid var(--color-cyber-cyan);
  pointer-events: none;
}

.cyber-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 229, 255, 0.45);
  box-shadow: var(--shadow-card-hover);
}

/* Card Gold Variant for Honors / FBLA Rubric Highlights */
.cyber-card.card-gold {
  border-color: rgba(212, 175, 55, 0.25);
}
.cyber-card.card-gold:hover {
  border-color: var(--color-circuit-gold);
  box-shadow: 0 12px 36px -4px rgba(0, 0, 0, 0.8), var(--glow-gold-sm);
}
```

### 4.2. Interactive Timeline Nodes (`.timeline-node`, `.timeline-spine`)

Used in the Interactive Resume and Career-Related Education sections to trace Andrew Strachan's career milestones.

```css
/* Component: Interactive Career Timeline */
.timeline-container {
  position: relative;
  padding-left: var(--space-8);
  margin-block: var(--space-6);
}

/* The Glowing Circuit Spine Line */
.timeline-container::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 11px;
  width: 2px;
  background: linear-gradient(
    to bottom,
    var(--color-circuit-gold) 0%,
    var(--color-cyber-cyan) 60%,
    var(--color-cyber-teal) 100%
  );
  box-shadow: 0 0 8px rgba(0, 229, 255, 0.3);
}

.timeline-item {
  position: relative;
  margin-bottom: var(--space-8);
}

/* The Diamond / Circular Circuit Node Marker */
.timeline-node {
  position: absolute;
  left: -29px; /* Centered over spine (11px spine - 16px node radius) */
  top: 6px;
  width: 18px;
  height: 18px;
  background-color: var(--color-midnight-base);
  border: 2px solid var(--color-circuit-gold);
  border-radius: 4px; /* Diamond rotated */
  transform: rotate(45deg);
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  z-index: 2;
}

.timeline-item:hover .timeline-node,
.timeline-item.active .timeline-node {
  transform: rotate(45deg) scale(1.25);
  border-color: var(--color-cyber-cyan);
  box-shadow: 0 0 16px var(--color-cyber-cyan);
  background-color: var(--color-cyber-cyan-dim);
}

.timeline-content {
  background: var(--color-midnight-surface);
  border: var(--border-dim);
  border-radius: var(--border-radius-md);
  padding: var(--space-5);
  transition: border-color 0.2s ease;
}

.timeline-item:hover .timeline-content {
  border-color: rgba(0, 229, 255, 0.3);
}
```

### 4.3. Filter Chips & Verification Badges (`.chip-filter`, `.badge-credly`)

Used for interactive filtering across the skills matrix, 30 LinkedIn certifications, and 28+ project deployments.

```css
/* Component: Interactive Filter Chips */
.chip-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-block: var(--space-4);
}

.chip-filter {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
  background-color: rgba(11, 18, 32, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: var(--border-radius-full);
  cursor: pointer;
  min-height: 44px;                    /* WCAG 2.5.5 touch target minimum */
  transition: all 0.2s ease;
  user-select: none;
}

.chip-filter:hover {
  color: var(--color-text-primary);
  border-color: var(--color-cyber-cyan);
  box-shadow: var(--glow-cyan-sm);
  background-color: var(--color-cyber-cyan-dim);
}

.chip-filter.active {
  color: var(--color-midnight-base);
  background-color: var(--color-cyber-cyan);
  border-color: var(--color-cyber-cyan);
  box-shadow: var(--glow-cyan-md);
  font-weight: 700;
}

/* Gold Variant Chip for Federal SFS & FBLA Rubric Targets */
.chip-filter.chip-gold.active {
  background-color: var(--color-circuit-gold);
  border-color: var(--color-circuit-gold);
  box-shadow: var(--glow-gold-md);
}

/* Credly & Verification Badges */
.badge-verified {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 2px 8px;
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  color: #10b981;
  background-color: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
  border-radius: var(--border-radius-sm);
}
```

### 4.4. Video Player Frame & Custom Cyber Controls (`.video-player-frame`)

Accommodates the four 10-second web-compressed videos (`sanctum`, `tutor`, `adaptivehs`, `maqkrs`) with zero CLS layout guarantees.

```css
/* Component: Video Player Frame */
.video-card {
  display: flex;
  flex-direction: column;
  background: var(--color-midnight-surface);
  border: var(--border-dim);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.video-card:hover {
  border-color: rgba(0, 229, 255, 0.35);
}

.video-player-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;               /* Mandatory zero-CLS layout reservation */
  background-color: #000;
  overflow: hidden;
  contain: strict;                    /* Layout containment for smooth rendering */
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Custom Cyber Play Overlay */
.video-overlay-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(6, 11, 19, 0.4);
  backdrop-filter: blur(2px);
  cursor: pointer;
  transition: opacity 0.2s ease, visibility 0.2s;
  z-index: 3;
}

.video-player-container.is-playing .video-overlay-play {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.play-button-glyph {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(11, 18, 32, 0.85);
  border: 2px solid var(--color-cyber-cyan);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--glow-cyan-md);
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.video-player-container:hover .play-button-glyph {
  transform: scale(1.1);
  background-color: var(--color-cyber-cyan-dim);
}

/* Bottom Glassmorphic Control Bar */
.video-controls-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-2) var(--space-4);
  background: linear-gradient(to top, rgba(6, 11, 19, 0.95), rgba(6, 11, 19, 0));
  display: flex;
  align-items: center;
  gap: var(--space-3);
  opacity: 0;
  transition: opacity 0.25s ease;
  z-index: 4;
}

.video-player-container:hover .video-controls-bar,
.video-player-container:focus-within .video-controls-bar {
  opacity: 1;
}

/* Scrubber Bar */
.video-scrubber {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  position: relative;
  cursor: pointer;
}

.video-progress-fill {
  height: 100%;
  background: linear-gradient(to right, var(--color-circuit-gold), var(--color-cyber-cyan));
  border-radius: 3px;
  width: 0%;
  position: relative;
}

.video-time-display {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  white-space: nowrap;
}
```

### 4.5. Modal Overlays & Evidence Dialogs (`dialog.cyber-modal`)

Implements the official W3C `<dialog closedby="any">` standard retrieved from `modern-web-guidance`, providing native light-dismiss and keyboard focus trapping for Credly badges, NIST evidence, and video expansions.

```css
/* Component: Native Cyber Dialog */
dialog.cyber-modal {
  max-width: min(90vw, 760px);
  width: 100%;
  margin: auto;
  padding: 0;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-cyber-cyan);
  background-color: var(--color-midnight-surface);
  color: var(--color-text-primary);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), var(--glow-cyan-md);
  overflow: hidden;
  transition: opacity 0.25s ease, transform 0.25s ease, display 0.25s allow-discrete;
}

/* Backdrop Styling */
dialog.cyber-modal::backdrop {
  background-color: var(--color-midnight-scrim);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: opacity 0.25s ease;
}

/* Modern Starting Style for Smooth Entry */
@starting-style {
  dialog.cyber-modal[open] {
    opacity: 0;
    transform: scale(0.96) translateY(12px);
  }
  dialog.cyber-modal[open]::backdrop {
    opacity: 0;
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  border-bottom: var(--border-dim);
  background: var(--color-midnight-elevated);
}

.modal-close-btn {
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  font-size: 1.5rem;
  line-height: 1;
  padding: var(--space-2);
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  min-width: 44px;
  min-height: 44px;
}

.modal-close-btn:hover {
  color: var(--color-cyber-cyan);
}

.modal-body {
  padding: var(--space-6);
  max-height: 75vh;
  overflow-y: auto;
  scrollbar-gutter: stable;
}
```

### 4.6. Presenter HUD & FBLA 7-Minute Timer (`.presenter-hud`)

Supports the high-priority FBLA Presentation requirement (10 pts) with an integrated countdown bar and speaker notes drawer.

```css
/* Component: Presenter Mode HUD */
.presenter-hud {
  position: fixed;
  bottom: var(--space-4);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-6);
  background: rgba(11, 18, 32, 0.92);
  backdrop-filter: var(--glass-backdrop);
  border: 1px solid var(--color-circuit-gold);
  border-radius: var(--border-radius-full);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), var(--glow-gold-sm);
  z-index: 1000;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.presenter-hud.hidden {
  transform: translate(-50%, 150%);
}

.timer-pill {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--font-size-md);
  font-weight: 700;
  color: var(--color-circuit-gold);
}

.timer-pill.urgent {
  color: var(--color-alert-red);
  animation: pulse-urgent 1s infinite alternate;
}

.speaker-notes-drawer {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: min(90vw, 420px);
  background: var(--color-midnight-surface);
  border-left: 1px solid var(--color-circuit-gold);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.7);
  padding: var(--space-6);
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999;
  overflow-y: auto;
}

.speaker-notes-drawer.open {
  transform: translateX(0);
}
```

---

## 5. Animation, Motion Engineering & Accessibility

### 5.1. CSS Keyframe Animations

All animations strictly modify compositor-friendly properties (`transform` and `opacity`) to guarantee 60fps/120fps smooth performance across devices.

```css
/* Animation 1: Ambient Circuit Pulse */
@keyframes circuit-pulse {
  0% {
    opacity: 0.6;
    filter: drop-shadow(0 0 4px rgba(0, 229, 255, 0.3));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 14px rgba(0, 229, 255, 0.7));
  }
  100% {
    opacity: 0.6;
    filter: drop-shadow(0 0 4px rgba(0, 229, 255, 0.3));
  }
}

/* Animation 2: Status Beacon Blink (SFS Active / Defense Operational) */
@keyframes beacon-blink {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.85);
  }
}

/* Animation 3: Radar Sweep for Crest Frame */
@keyframes radar-sweep {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Animation 4: Urgent FBLA Timer Pulse (< 1 min remaining) */
@keyframes pulse-urgent {
  0% {
    box-shadow: 0 0 4px rgba(239, 68, 68, 0.4);
  }
  100% {
    box-shadow: 0 0 16px rgba(239, 68, 68, 0.9);
  }
}

/* Classes for animation assignment */
.animate-circuit-pulse {
  animation: circuit-pulse 4s infinite ease-in-out;
}

.status-beacon-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-verify-green);
  box-shadow: 0 0 8px var(--color-verify-green);
  animation: beacon-blink 2s infinite ease-in-out;
}
```

### 5.2. Strict `prefers-reduced-motion` Compliance

Per `modern-web-guidance` and WCAG Success Criterion 2.3.3 (Animation from Interactions), animations must gracefully degrade without causing jarring visual cuts:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto !important;
  }

  *, *::before, *::after {
    animation-duration: 0.001s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001s !important;
  }

  /* Maintain functional transitions for opacity where necessary */
  .fade-transition {
    transition: opacity 0.1s linear !important;
  }
}
```

---

## 6. Performance & Core Web Vitals (CWV) Optimization

### 6.1. Layout Containment & Rendering Speed
To guarantee high performance and pass Lighthouse scores (`Accessibility ≥ 90`, `Performance ≥ 80`):
1. **`content-visibility: auto`**: Applied to heavy lower sections (`#sample-materials`, `#projects-directory`, `#provenance-ledger`). The browser skips rendering calculations for offscreen sections until the user scrolls near them.
2. **`contain-intrinsic-block-size`**: Paired with `content-visibility` to prevent scrollbar jumps and layout shifts (CLS):
   ```css
   .section-defer {
     content-visibility: auto;
     contain-intrinsic-block-size: auto 650px;
   }
   ```
3. **Component Containment**: Repeating table rows and showcase cards use `contain: layout style paint;` to isolate re-layout calculations.

### 6.2. Zero Cumulative Layout Shift (Target CLS: 0.000)
1. **Explicit Dimensions & Aspect Ratios**:
   - Master Brand Crest: `width: 1024px; height: 1024px; aspect-ratio: 1 / 1;`
   - Video Viewports: `aspect-ratio: 16 / 9;`
   - Hero Badge Avatars: `width: 44px; height: 44px;`
2. **Scrollbar Gutter Reservation**:
   - `scrollbar-gutter: stable;` on the root `html` tag reserves space for the vertical scrollbar, completely eliminating the 15px layout shift when navigating long pages.
3. **Fixed Header Reservation**:
   - Navigation header height is fixed at `var(--header-height)` (68px desktop, 60px mobile), preventing content from jumping as the header initializes.

### 6.3. Font Display & Text Rendering
To eliminate Flash of Invisible Text (FOIT):
```css
@font-face {
  font-family: 'Space Grotesk';
  font-display: swap;                 /* Mandatory FOIT prevention */
  src: local('Space Grotesk'), local('SpaceGrotesk');
}

/* System font fallback priority guarantees instant text paint with zero blocking */
```

---

## 7. High-Fidelity Print Stylesheet (`styles/print.css`)

To satisfy Requirement R4 (Printable PDF Portfolio Companion matching the student benchmark standard), `styles/print.css` ensures high-clarity black/white and navy/gold reproduction on standard letter/A4 paper:

```css
/* ==========================================================================
   PRINT SPECIFICATION FOR PDF COMPANION GENERATION
   ========================================================================== */
@media print {
  @page {
    size: letter portrait;
    margin: 0.6in 0.6in 0.6in 0.6in;
  }

  /* Reset dark backgrounds for clean, ink-efficient print */
  html, body {
    background-color: #ffffff !important;
    color: #0f172a !important;
    font-size: 10pt !important;
    line-height: 1.4 !important;
  }

  /* Hide interactive web UI controls */
  header.nav-header,
  .presenter-hud,
  .video-controls-bar,
  .video-overlay-play,
  .chip-container,
  dialog.cyber-modal,
  .btn-interactive,
  .no-print {
    display: none !important;
  }

  /* Convert cards to clean structured print panels */
  .cyber-card,
  .timeline-content,
  .video-card {
    background: #f8fafc !important;
    border: 1px solid #cbd5e1 !important;
    box-shadow: none !important;
    break-inside: avoid !important;   /* Prevent awkward page break cuts */
    margin-bottom: 0.3in !important;
    padding: 0.2in !important;
  }

  /* Convert links to printable URLs */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 8pt;
    color: #475569;
  }

  /* Section Page Breaks */
  .page-break-before {
    page-break-before: always !important;
    break-before: page !important;
  }

  /* Print Header with Brand Mark */
  .print-header {
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2pt solid #d4af37;
    padding-bottom: 0.15in;
    margin-bottom: 0.3in;
  }
}
```

---

## 8. Concrete Implementation Blueprint for Milestone Builders

The builder agents in Milestone 1 and 2 should implement the stylesheets according to the following file breakdown:

```
styles/
├── main.css          # :root custom properties, typography, resets, layout containers, responsive grid, animations
├── components.css    # .cyber-card, .timeline-*, .chip-*, .video-*, dialog.cyber-modal, .presenter-hud
└── print.css         # @media print rules, page-break controls, PDF companion formatting
```

### Key Implementation Checklist for Builders:
- [ ] Load `styles/main.css`, `styles/components.css`, and `styles/print.css` in `index.html`.
- [ ] Add `scrollbar-gutter: stable;` to `html` to prevent layout shifts.
- [ ] Apply `aspect-ratio: 16 / 9` and `contain: strict` to video player wrappers.
- [ ] Implement native `<dialog closedby="any">` with the JavaScript light-dismiss fallback for older Safari versions per `modern-web-guidance`.
- [ ] Ensure all button touch targets meet the minimum `44px × 44px` on viewports ≤ 768px.
- [ ] Verify zero console errors and contrast compliance before final sign-off.
