---
inclusion: fileMatch
fileMatchPattern: "{src/engine/**,api/**}"
---

# §6 — Story Bible + §7 Challenges

## §6 Story Bible

### 6.1 World

Dead Air is set in a 1940s–1950s radio universe — a world where every human life is secretly a serialised radio drama, and a **Villain** is trying to cancel yours. The Villain grows stronger when you break your own commitments and weaker when you keep them.

The tone is **horror-adjacent, never graphic**. Think Orson Welles' *War of the Worlds*, *Inner Sanctum Mysteries*, *The Haunting of Hill House* (Shirley Jackson, not the Netflix show). Dread, not gore.

### 6.2 Recurring characters

| Character | Role | Voice notes |
|---|---|---|
| **The Announcer** | Omniscient narrator; warm, theatrical, slightly menacing | Received Pronunciation, 1940s cadence, calls the listener by name |
| **You** (player) | Protagonist; known only as the character name set in Settings (default: "You") | Voiced by the selected Kokoro voice |
| **The Villain** | Shapeshifter; takes a form drawn from the diary entry | Never named; described by what it does and how it feels |
| **The Supporting Cast** | Redacted versions of the real people in the entry | Referred to by role only ("a friend", "your boss") |

### 6.3 Episode structure

Every episode follows this exact arc:

1. **Cold open** (10–15 s) — The Announcer recaps the previous episode in one sentence, or introduces the pilot.
2. **Act 1 — Ordinary world** (30–40 s) — The protagonist's day, narrated as vintage radio drama. Real mundane details become genre set-pieces.
3. **Act 2 — Intrusion** (40–50 s) — The Villain enters. Its form is drawn from the emotional texture of the diary entry (anxiety → something that waits; anger → something that burns; sadness → something that floods).
4. **Act 3 — Confrontation** (30–40 s) — The protagonist makes a choice. The challenge outcome from the previous day shapes the result: success → protagonist gains ground; failure → Villain gains ground.
5. **Cliffhanger** (15–20 s) — End on an unresolved threat. The Announcer teases next episode, then issues the challenge.

Total runtime target: **2:30–3:00**.

### 6.4 Villain strength arc

- Strength starts at 5 (mid-season).
- Kept/completed challenge: strength −1 (minimum 0).
- Missed/skipped challenge: strength +1 (maximum 10).
- Strength 0 → **Station Saved** season finale, then reset.
- Strength 10 → **Cancelled** season finale, then reset.
- Strength affects episode tone: 1–3 = atmospheric dread; 4–6 = escalating threat; 7–9 = desperate; 10 = finale.

### 6.5 Writing rules

- Maximum **two** named characters per episode (Announcer + one supporting role).
- Never invent health, financial, or relationship details not in the diary entry.
- Never use a diary detail that the Redactor has stripped.
- The Villain's actions must be metaphorical, not literal violence.
- Episodes must be family-safe at Intensity: Spooky; PG-13 at Creepy; R-adjacent atmosphere (no gore) at Nightmare.

### 6.6 Intensity levels

| Level | Tone | Villain behaviour |
|---|---|---|
| **Spooky** | Cosy horror; mild dread | Villain lurks, is heard but not seen |
| **Creepy** | Classic horror; genuine unease | Villain is glimpsed; makes threats |
| **Nightmare** | Psychological horror; visceral dread | Villain is present; confrontation imminent |

---

## §7 Challenges

### 7.1 Design rules

Every episode ends with exactly one real-life challenge for the next 24 hours.

- **Doable in a day** — achievable by most people without special equipment.
- **Non-harmful** — never unsafe, never about food, weight, body image, or caloric intake.
- **Honest self-report** — no external tracking required; just a yes/no next night.
- **Thematically linked** — drawn from the emotional thread of the episode, not random.
- **Specific** — "Walk 6,000 steps" not "Exercise more".

### 7.2 Challenge categories

| Category | Example challenge |
|---|---|
| Movement | "Walk 6,000 steps before the sun sets" |
| Sleep | "Be in bed with lights off by 11 PM" |
| Digital rest | "No screens for one hour after 9 PM" |
| Connection | "Call or voice-note one person you haven't spoken to this week" |
| Hydration | "Drink eight glasses of water" |
| Outdoors | "Spend 20 minutes outside, not commuting" |
| Focus | "Complete one task you've been avoiding" |
| Rest | "Take a 20-minute nap or quiet sit" |

### 7.3 Challenge outcome logic

The Writer LLM must return the challenge as a structured field:

```ts
interface Challenge {
  text: string          // The challenge sentence shown to the user
  category: ChallengeCategory
  durationHours?: number  // Deadline hint, if relevant
}
```

The Showrunner stores the challenge with the episode. The next night's Tell screen shows "Did you do it?" before recording the new entry. The boolean result is passed into the next Writer call as `previousChallengeCompleted`.
