# Dead Air — Product Context

> Kiroween 2026 entry. Category: **Resurrection** (reviving the old-time radio serial).
> Deadline: **Fri Dec 4, 2026, 2:00 PM Pacific** (Sat Dec 5, 3:30 AM India). Plan to submit Dec 3.
> Built entirely in Kiro — insufficient use of Kiro = disqualification.

## One-line pitch
Dead Air turns your day into a 3-minute old-time radio horror episode starring you — a memory journal you never have to write, where your real-life actions decide what happens next.

## Audience
18–35, phone-first, podcast/audio-drama/horror fans. Secondary: anyone who has tried and quit journaling.

## Core loop
1. **Night — Tell.** Tap record and talk for up to 60 s: "How was your day?" Typing also works. Optional quick chips: sleep, steps, mood 1–5.
2. **Tune in.** Turn the dial. Tonight's episode plays: 2–3 min, narrator + "you" + a villain, SFX, music bed, crackly radio sound.
3. **Cliffhanger + challenge.** The episode ends on a cliffhanger and a real-life challenge for tomorrow ("Walk 6,000 steps to outrun what's in the basement").
4. **Next night — Report.** "Did you do it?" Yes/no. Done → hero gains ground, villain strength −1. Skipped → villain gains ground, +1. Strength 10 = season finale; strength 0 = station saved. Either resets to a new season.
5. **Archive.** Every episode saved as a season ("Season 1, Episode 7: The Coffee With No Name").

## Screens (single-page — one vintage valve radio)
| Screen | Contents |
|---|---|
| **Radio (home)** | Wooden/Bakelite radio. Dial, glowing valve, speaker grille, record button, ON AIR lamp. Dial positions: Tonight / Archive / Settings. |
| **Tell** | Hold-to-record (or tap), 60 s ring timer, live waveform in grille, transcript preview, "type instead", quick chips, yesterday's challenge "Did you do it?" |
| **Brewing** | Valves warm up, static, radio-announcer status lines ("Scribbling the script…", "Waking the actors…"). No plain spinner. |
| **On Air** | Plays the episode. Needle VU meter, scrolling teleprompter script, scrub bar, download audio. Ends on challenge card. |
| **Archive** | Shelf of episode reels by date with title and challenge result (✓ / ✗). Tap to replay. Export/import all data as JSON. |
| **Settings** | Intensity: Spooky / Creepy / Nightmare. Character name (default "You"). Voice picks. Delete everything. |
| **Demo** | First visit: "Hear a sample night" — 3 pre-made episodes, no mic, no keys, no waiting. Judges must see the full loop in under 2 minutes. |

## Real-life challenges
- Kinds: steps, sleep, screen-off hour, call/text someone, drink water, go outside, finish one task.
- One per episode. Always doable in a day. Never unsafe. Never about food or weight.
- Checked by honest self-report the next night — no tracking required.

## Scope
**Must have (MVP):** radio UI, Demo mode, Tell (voice + type + chips), Redactor with PBT, Showrunner + Writer function, Censor, Kokoro voices + radio mix, On Air player, challenge loop, Archive, Settings (intensity, delete all), deployed URL.

**Nice to have:** shareable 30-s clip (canvas + MediaRecorder), PWA install, season finale episodes, export as MP3.

**Not now:** other genres, accounts/sync, calendar/health integrations, native apps.

## Demo video (≤ 2:50, Remotion, made after the app works)
1. 0:00–0:15 Radio crackles on; the Host reads Tarun's real line back as horror.
2. 0:15–0:35 Problem: journaling dies in a week.
3. 0:35–1:30 Record a voice note → Brewing → On Air. Overlays link real details to story beats. Show redacted payload ("Sam" → "a friend").
4. 1:30–2:00 Cliffhanger + challenge → next day steps done → "Did you do it?" ✓ → villain retreats.
5. 2:00–2:35 How it was built with Kiro: specs, steering, hooks, PBT catching a real redaction bug.
6. 2:35–2:50 Archive = "a season of your life". Name + URL.

No copyrighted music. Footage must show the app running on a real phone.
