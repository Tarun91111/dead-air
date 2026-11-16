---
inclusion: fileMatch
fileMatchPattern: "src/ui/**"
---

# §4 + §9 — UI Style

## §4 Visual Design System

### 4.1 Metaphor

The entire app is a single vintage valve radio — wooden cabinet, Bakelite knobs, speaker grille, glowing valves. Every screen is a **state of that radio**. There is no navigation bar, no hamburger menu, no bottom tab bar. Movement between screens is turning the dial.

### 4.2 Colour palette

| Token | Hex | Usage |
|---|---|---|
| `--color-wood` | `#5C3317` | Cabinet background |
| `--color-bakelite` | `#2B1F14` | Knobs, borders |
| `--color-cream` | `#F5F0E8` | Primary text, dial labels |
| `--color-amber` | `#E8A020` | Valve glow, ON AIR lamp |
| `--color-static` | `#8B8B7A` | Inactive UI, placeholder text |
| `--color-signal` | `#48C774` | Villain strength low (safe) |
| `--color-warning` | `#FFDD57` | Villain strength mid |
| `--color-danger` | `#F14668` | Villain strength high |
| `--color-void` | `#0A0806` | Deep background behind radio |

All tokens must be defined as CSS custom properties in `src/styles/tokens.css`.

### 4.3 Typography

| Role | Font | Weight | Size (mobile) |
|---|---|---|---|
| Announcer / headings | `'Special Elite'` (Google Fonts) | 400 | 1.5rem |
| Body / UI labels | `'Courier Prime'` (Google Fonts) | 400 | 1rem |
| Episode title | `'Special Elite'` | 400 | 1.25rem |
| Transcript / teleprompter | `'Courier Prime'` | 400 | 1.125rem |
| Chip buttons | `'Courier Prime'` | 700 | 0.875rem |

Minimum body font size: **16px** (never smaller on mobile).

### 4.4 Spacing scale

Use a base-8 spacing scale: `4px · 8px · 16px · 24px · 32px · 48px · 64px`. Define as CSS custom properties `--space-1` through `--space-8`.

### 4.5 Motion

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Dial turn | CSS rotate transform | 300 ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring) |
| Valve glow | Pulse opacity 0.6 → 1.0 → 0.6 | 2 s | `ease-in-out`, infinite |
| ON AIR lamp | Blink off/on | 1.2 s | Step function |
| VU needle | CSS rotate, driven by audio level | Realtime | — |
| Brewing status text | Fade-in from opacity 0 | 400 ms | `ease-out` |
| Screen transitions | Crossfade | 250 ms | `ease-in-out` |

All animations must respect `prefers-reduced-motion: reduce` — disable or reduce to instant when set.

---

## §9 Screen Specifications

### 9.1 Mobile-first layout

Breakpoints:
- Default (mobile): 0–767px — single column, radio fills viewport width with 16px padding.
- Tablet: 768px–1023px — radio capped at 480px, centred.
- Desktop: 1024px+ — radio capped at 540px, centred, side padding 10%.

### 9.2 Radio (Home) screen

- The radio SVG/CSS illustration fills the screen.
- Dial positions: left = Archive, centre = Tonight (home), right = Settings.
- Turning the dial is the only navigation gesture — `touchstart`/`touchmove`/`touchend`.
- Visible affordances: glowing valve (always on), ON AIR lamp (lit when episode ready), record button (large, centred in speaker grille area).
- Record button: 72px minimum touch target.

### 9.3 Tell screen

- Triggered by pressing the record button.
- Full-screen overlay over the radio.
- **Hold-to-record**: hold the mic button to record (max 60 s); release to stop.
- 60 s ring timer around the button — SVG stroke-dasharray animation.
- Live waveform rendered in the speaker grille area using Canvas API.
- Transcript preview appears below mic as words are recognised.
- "Type instead" link opens a textarea (same screen, mic collapses).
- Quick chips row: Sleep, Steps, Mood 1–5, Water.
- "Did you do it?" section shown at top if a previous challenge exists.

### 9.4 Brewing screen

- Replaces the radio face with a close-up of warming valves.
- Status line cycles through vintage-flavoured messages (array of strings, one per 2–3 s).
- No progress bar, no percentage, no spinner.
- Example messages: "Scribbling the script…", "Waking the actors…", "Adjusting the aerial…", "Clearing the static…".

### 9.5 On Air screen

- Episode artwork: animated radio face with VU needle bouncing to audio.
- Episode title + season/episode number at top.
- Scrolling teleprompter: auto-scrolls to current word, highlighted in amber.
- Scrub bar at bottom, with elapsed and total time.
- Download button (↓ icon) top-right.
- Challenge card slides up at episode end — dark card, amber text, challenge text, "Got it" CTA.

### 9.6 Archive screen

- List of episode "reels" — each is a card with: episode title, date (day of week only), challenge outcome (✓ or ✗ with villain strength delta).
- Grouped by season.
- Tap to replay (navigates to On Air screen for that episode).
- Bottom: Export JSON button, Import JSON button.

### 9.7 Settings screen

- Intensity selector: three buttons (Spooky / Creepy / Nightmare) — radio-button style.
- Character name: text input, placeholder "You".
- Voice picker: list of 3–4 Kokoro voice options with 5 s preview button each.
- "Delete Everything" button: red, requires a confirmation dialog before wiping data.

### 9.8 Demo screen (first visit only)

- Shown on first app load if no episodes exist.
- Three pre-made episode thumbnails.
- "Hear a Sample Night" CTA — plays a pre-rendered episode, no mic, no API key.
- Skip button at bottom right.
- Must allow judges to experience the full loop in under 2 minutes.

### 9.9 Accessibility baseline

- All interactive elements: minimum 44×44px touch target.
- Colour is never the only signal — icons + text labels accompany colour indicators.
- Focus ring visible on all interactive elements (`outline: 2px solid var(--color-amber)`).
- `aria-label` on all icon-only buttons.
- Transcript on On Air screen for deaf/HoH users.
- Screen reader announcement when Brewing completes.
