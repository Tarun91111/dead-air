---
inclusion: always
---

# §5 — Privacy Rules

Dead Air runs entirely on-device. These rules are non-negotiable and enforced by the **Redactor** pipeline before any text leaves the device.

## 5.1 What the Redactor must strip

| Category | Examples | Replacement token |
|---|---|---|
| Full names (non-user) | "Sam", "Dr. Patel" | `a friend`, `a colleague`, `a stranger` |
| Locations | addresses, place names, postcodes | `a place`, `somewhere nearby` |
| Organisations | company names, schools, hospitals | `a workplace`, `an institution` |
| Health details | diagnoses, medications, symptoms | `a health matter` |
| Financial figures | specific amounts, account refs | `a sum of money` |
| Relationship labels + names | "my wife Maria", "boss Kevin" | generic role only: `my wife`, `my boss` |

## 5.2 What stays in

- Emotions, moods, feelings — the story depends on them.
- Challenge outcomes (did/did not complete).
- Timestamps (day-of-week only; no exact dates sent to any API).
- Intensity setting.

## 5.3 Redactor contract (enforced by PBT)

1. **Idempotency** — `redact(redact(x)) === redact(x)` for all string inputs.
2. **No token leakage** — the output must not contain any of the original named entities.
3. **Preservation** — emotional polarity words survive redaction.
4. **Short-circuit** — empty string in → empty string out, no errors.
5. **Determinism** — same input → same output (no random tokens in redacted text).

## 5.4 Data storage

- All episode data stored in `localStorage` only.
- No analytics, no telemetry, no crash reporting to third parties.
- Settings screen must include a "Delete Everything" button that wipes `localStorage` completely.
- The exported JSON (Archive screen) must be clearly labelled "your personal data" in the UI.

## 5.5 API calls

- Only the **Writer** function sends data to an LLM API.
- Payload sent = redacted diary entry + intensity + challenge outcome. No raw names, no locations.
- API key lives in a server-only environment variable (`LLM_API_KEY`), never committed to git, never prefixed with `VITE_`.
- The key is read exclusively by the serverless function in `/api` — never by any file in `src/`.

## 5.6 Voice data

- MediaRecorder audio is transcribed client-side where possible (Whisper WASM) or via a one-shot API call.
- The raw audio blob is never persisted — only the transcript is saved after redaction.
- Microphone permission is requested only on the Tell screen, with visible explanation text.
