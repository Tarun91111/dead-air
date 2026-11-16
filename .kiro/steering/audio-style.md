---
inclusion: fileMatch
fileMatchPattern: "src/audio/**"
---

# §8 — Audio Style

## 8.1 Target sound

Every episode must sound like a 1940s NBC radio drama heard through a valve radio in the next room — warm, slightly distorted, intimate. The goal is **convincing retro**, not parody.

Reference points: *Suspense* (CBS, 1942–1962), *Inner Sanctum Mysteries*, *Lights Out*.

## 8.2 Signal chain

```
Kokoro TTS (voice) ──┐
                      ├──► Wet mix ──► Radio EQ ──► Tape saturation ──► Output
SFX / music bed ─────┘
```

### 8.2.1 Voice processing

| Step | Settings |
|---|---|
| High-pass filter | 300 Hz, 12 dB/oct — remove low rumble |
| Low-pass filter | 6 kHz, 6 dB/oct — remove high sparkle |
| Presence boost | +3 dB shelf at 1.5 kHz — adds vintage warmth |
| Room reverb | Small room, 0.4 s RT60, pre-delay 10 ms |
| Compression | 4:1, fast attack (5 ms), medium release (100 ms) |
| Vinyl noise | −38 dBFS broadband hiss, filtered 400 Hz–8 kHz |

### 8.2.2 Music bed

- Source: royalty-free 1940s jazz or orchestral sting.
- Ducked to −18 dBFS under speech; fades to −12 dBFS at silence.
- Must start and end each episode.
- Stings: a 2–3 s orchestral hit at the cliffhanger moment.

### 8.2.3 SFX

- One ambient SFX loop per scene (rain on glass, footsteps on gravel, static bursts).
- Mixed at −22 dBFS — present but not distracting.
- SFX list drawn from a curated royalty-free pack; filenames stored in `src/assets/sfx/manifest.ts`.

## 8.3 Output format

| Property | Value |
|---|---|
| Codec | MP3 (via MediaRecorder or ffmpeg.wasm) |
| Bit rate | 128 kbps mono |
| Sample rate | 44 100 Hz |
| Channels | Mono |
| Normalisation | −14 LUFS (podcast standard) |

## 8.4 Kokoro voice mapping

| Character | Voice ID | Notes |
|---|---|---|
| Announcer | `af_heart` (default) | Warm, authoritative |
| You (player) | User-selectable in Settings | Default `am_michael` |
| Villain | `bf_emma` pitch-shifted −15 % | Uncanny, slightly wrong |

Voice IDs must be stored as constants in `src/audio/voices.ts`, not scattered through the codebase.

## 8.5 Player controls (On Air screen)

- Play/pause toggle — tapping the radio speaker grille.
- Scrub bar — horizontal, full width, shows elapsed / total time.
- Download button — exports the processed MP3 for this episode.
- No volume slider on mobile (use system volume).
- Needle VU meter — animated, 60 fps, driven by `AnalyserNode`.

## 8.6 Brewing screen audio

The Brewing screen must play a short ambient audio loop:
- Valve hum + low static + occasional relay click.
- Loop duration: 8–12 s, seamless.
- Must stop immediately when episode is ready, replaced by a "tune in" click SFX.

## 8.7 Accessibility

- All episode audio ships with a scrolling teleprompter transcript on the On Air screen.
- Transcript is synced to playback using the word timestamps returned by the TTS API.
- Transcript font: monospace, cream on dark, 18px minimum.
- The On Air screen must pass WCAG AA contrast for the transcript overlay.
