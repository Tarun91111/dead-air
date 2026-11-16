---
inclusion: always
---

# Project Structure

```
dead-air/
├── public/
│   └── vite.svg
├── e2e/                          # Playwright E2E tests
│   └── home.spec.ts
├── src/
│   ├── main.tsx                  # App entry point
│   ├── App.tsx                   # Root component
│   ├── App.test.tsx
│   ├── index.css                 # Global reset + base styles
│   ├── styles/
│   │   └── tokens.css            # CSS custom properties (colours, spacing, fonts)
│   ├── test/
│   │   └── setup.ts              # Vitest + Testing Library setup
│   │
│   ├── components/               # Shared, stateless UI components
│   │   ├── Radio/                # The radio shell SVG/CSS
│   │   ├── Dial/                 # Rotatable dial
│   │   ├── VUMeter/              # Animated needle
│   │   ├── Waveform/             # Canvas waveform
│   │   └── ChipButton/           # Quick-input chips
│   │
│   ├── screens/                  # One folder per screen
│   │   ├── Home/                 # Radio face, dial navigation
│   │   ├── Tell/                 # Record / type entry
│   │   ├── Brewing/              # Loading state
│   │   ├── OnAir/                # Episode player
│   │   ├── Archive/              # Episode list
│   │   ├── Settings/             # App settings
│   │   └── Demo/                 # First-visit demo
│   │
│   ├── redactor/                 # §5 — PII stripping
│   │   ├── redactor.ts
│   │   ├── redactor.test.ts
│   │   └── redactor.pbt.test.ts  # fast-check invariants
│   │
│   ├── showrunner/               # §6 — Episode assembly
│   │   ├── writer.ts             # LLM prompt builder + caller
│   │   ├── writer.test.ts
│   │   └── arc.ts                # Villain strength state machine
│   │
│   ├── audio/                    # §8 — Audio pipeline
│   │   ├── voices.ts             # Kokoro voice ID constants
│   │   ├── processor.ts          # Web Audio chain (EQ, reverb, saturation)
│   │   ├── recorder.ts           # MediaRecorder wrapper
│   │   └── player.ts             # Playback + VU meter data
│   │
│   ├── storage/                  # localStorage abstraction
│   │   ├── episodes.ts
│   │   ├── settings.ts
│   │   └── storage.test.ts
│   │
│   ├── types/                    # Shared TypeScript types
│   │   ├── episode.ts
│   │   ├── challenge.ts
│   │   └── settings.ts
│   │
│   └── assets/
│       └── sfx/
│           └── manifest.ts       # SFX file list + metadata
│
├── .kiro/
│   ├── steering/
│   │   ├── product.md
│   │   ├── privacy-rules.md
│   │   ├── story-bible-rules.md
│   │   ├── audio-style.md
│   │   ├── ui-style.md
│   │   ├── tech.md
│   │   └── structure.md
│   └── hooks/
│       └── run-tests-after-kiro-finishes.json
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.ts
├── .prettierrc
├── .prettierignore
├── playwright.config.ts
├── package.json
└── .gitignore
```

## Module conventions

- **One component per folder** — `Dial/index.tsx` + `Dial.module.css` (or plain CSS import).
- **Barrel exports** — each folder exports from `index.ts`. No reaching inside another module's folder.
- **Co-located tests** — unit tests live next to the file they test (`foo.ts` → `foo.test.ts`).
- **PBT files** — always named `*.pbt.test.ts`, always use fast-check, picked up by `test:pbt` script.
- **Screen components** — receive no props from a parent router; they read from context or storage directly.

## Import path alias

`@/*` resolves to `src/*` (configured in `tsconfig.app.json` and `vite.config.ts`).

```ts
// Good
import { redact } from '@/redactor/redactor'

// Bad
import { redact } from '../../redactor/redactor'
```

## State flow

```
User input (voice/text/chips)
  → Tell screen
  → Redactor (strips PII)
  → Showrunner (builds LLM payload)
  → Writer (calls OpenAI)
  → Episode (typed object)
  → Audio pipeline (Kokoro TTS + Web Audio processing)
  → On Air player
  → Storage (localStorage)
  → Archive
```

## Key type shapes (source of truth in `src/types/`)

```ts
// episode.ts
interface Episode {
  id: string
  season: number
  episode: number
  title: string
  transcript: string
  audioUrl: string        // object URL or data URL
  challenge: Challenge
  createdAt: number       // Unix ms
  challengeCompleted?: boolean
}

// challenge.ts
type ChallengeCategory =
  | 'movement' | 'sleep' | 'digital-rest' | 'connection'
  | 'hydration' | 'outdoors' | 'focus' | 'rest'

interface Challenge {
  text: string
  category: ChallengeCategory
  durationHours?: number
}

// settings.ts
type Intensity = 'spooky' | 'creepy' | 'nightmare'

interface Settings {
  intensity: Intensity
  characterName: string
  voiceId: string
}
```
