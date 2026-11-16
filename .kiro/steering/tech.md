---
inclusion: always
---

# Tech Stack

## Runtime

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 18 + TypeScript 5 (strict) | Ecosystem, hooks, Vite integration |
| Build | Vite 6 | Fast HMR, ESM-first, easy env vars |
| Styling | Plain CSS + CSS custom properties | No runtime overhead, full control, mobile-first |
| State | React `useState` / `useReducer` + Context | No Redux for this scale; keep it simple |
| Routing | None (single-page, dial-driven) | The radio IS the navigation |

## Audio

| Need | Tool |
|---|---|
| TTS | Kokoro via `kokoro-js` (WASM, runs in-browser) |
| Audio processing | Web Audio API (`AudioContext`, `AnalyserNode`, `BiquadFilterNode`) |
| MP3 encoding | `lamejs` (client-side) or `ffmpeg.wasm` (nice-to-have) |
| Voice recording | MediaRecorder API |
| Speech-to-text | Whisper WASM (`whisper.cpp` port) or OpenAI Whisper API fallback |

## LLM

| Need | Tool |
|---|---|
| Episode writer | OpenAI `gpt-4o-mini` via `openai` npm package |
| API key | `LLM_API_KEY` server-only env var (provider chosen in Part 3) |
| Prompt | Assembled by `src/showrunner/writer.ts` |

## Testing

| Layer | Tool |
|---|---|
| Unit / integration | Vitest 2 + Testing Library |
| Property-based | fast-check 3 (all files `*.pbt.test.ts`) |
| E2E | Playwright (Mobile Chrome + Mobile Safari primary) |
| Coverage | `@vitest/coverage-v8` |

**PBT targets:** Redactor (§5.3 invariants), challenge generator (no unsafe categories), villain strength arc (never outside 0–10).

## Code quality

| Tool | Config file |
|---|---|
| ESLint 9 (flat config) | `eslint.config.ts` |
| Prettier 3 | `.prettierrc` |
| TypeScript strict | `tsconfig.app.json` — `strict: true`, `noUnusedLocals`, `noUnusedParameters` |

## npm scripts

| Script | Command | What it does |
|---|---|---|
| `dev` | `vite` | Dev server on port 5173 |
| `build` | `tsc -b && vite build` | Type-check + production bundle |
| `test` | `vitest run` | All unit/integration tests, single pass |
| `test:pbt` | `vitest run --reporter=verbose src/**/*.pbt.test.ts` | Property-based tests only |
| `e2e` | `playwright test` | E2E suite (requires dev server running or starts it) |
| `lint` | `eslint . --max-warnings 0` | Zero-warning policy |
| `format` | `prettier --write .` | Format all files |
| `format:check` | `prettier --check .` | CI format check |

## Environment variables

```
# LLM_API_KEY= (server-only, provider chosen in Part 3)
# Read by /api only. Never use the VITE_ prefix — that exposes the key to the browser.
```

Add `.env` to `.gitignore`. Provide `.env.example` with keys but no values.

## Browser targets

- Chrome/Edge ≥ 110
- Safari ≥ 16.4 (for full Web Audio + MediaRecorder)
- Firefox ≥ 115

No IE support. No SSR.

## Performance budget (mobile)

| Metric | Target |
|---|---|
| LCP | < 2.5 s on a 4G connection |
| CLS | < 0.1 |
| Initial JS bundle | < 200 kB gzip (excluding WASM assets) |
| WASM assets | Lazy-loaded only when needed |
