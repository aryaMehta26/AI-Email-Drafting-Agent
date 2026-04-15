# IFG AI Intern Assignment — Challenge #1 Submission

## Project
**AI Email Drafting Agent** — an MVP that takes an email (or last message in a thread), identifies the scenario + tone, and generates a professional reply that’s ready to review, lightly edit, and send.

## What I built
### Core capabilities
- **Accepts email input** (paste the email / thread context)
- **Understands scenario** (3 workflows required by the prompt)
- **Tone selection** (crisp / warm / assertive)
- **Quick analysis** (lightweight signals like scheduling / gratitude / apology / next steps)
- **Draft reply output** with one-click copy

### Scenarios supported (required)
1. **Inbound RA — Vague Request**
   - Goal: warm but strategically inquisitive; qualify intent before committing to a meeting
2. **Outbound RA — Follow‑Up**
   - Goal: light, non‑pushy re‑engagement that feels personal (not automated)
3. **Post‑Meeting — Thank You**
   - Goal: timely thank you, reinforce next steps, leave a positive impression

## How I built it (approach)
1. **Simple UI flow**
   - Pick the scenario + tone → paste email text → generate → copy.
2. **Deterministic MVP generator**
   - I implemented a rules-based generator so the tool works reliably without external credentials.
   - The generator uses scenario-specific structures (openers, qualifying questions, soft CTAs) and adjusts phrasing based on the chosen tone.
3. **Lightweight signal detection**
   - The app detects simple indicators (e.g., scheduling language, gratitude, apology, next steps) to help the user sanity-check context before sending.

## Tech stack
- **Vite + React + TypeScript** (frontend + UI)
- **Tailwind CSS** (styling)

## 3 sample draft replies (one per email type)

### 1) Inbound RA — Vague Request
Hi Jordan,

Thanks for reaching out — hope you’re doing well.

Quick question before we set time: what prompted you to reach out — are you looking to refer a founder, explore a partnership, or just get connected?

If helpful, a sentence or two on who you typically work with (industry + size range) would help me route this the right way.

If it makes sense, I’m happy to set up a quick call.

Best,  
Kory

### 2) Outbound RA — Follow‑Up
Hi Taylor,

Just circling back — I know things get busy. If it’s not a priority right now, no worries at all.

If a quick intro call would be useful, I can do 15 minutes this week. Otherwise, happy to stay in touch and reconnect when timing is better.

Best,  
Kory

### 3) Post‑Meeting — Thank You
Hi Alex,

Thanks again for the time today.

I enjoyed the conversation and the context on what you’re building and what matters most to you as you think about growth and optionality.

As next steps, I’m happy to send over a quick recap and proposed timeline if helpful.

If you’d like, I can also share a couple of relevant data points from recent lower middle market outcomes in adjacent services businesses.

Best,  
Kory

## What I’d build next (3–5 sentences)
Next, I’d connect to Outlook/M365 via Microsoft Graph so the tool can pull the active thread and draft directly inside the composer, with explicit citation of the thread details it used. I’d add lightweight CRM context (contact type, relationship strength, last touchpoint) to improve personalization and reduce back‑and‑forth. I’d implement an edit‑feedback loop (final sent version vs draft) to tune prompts, build reusable snippets by scenario, and enforce safety checks (no auto‑send, compliance language, hallucination guardrails). Finally, I’d add telemetry to quantify time saved and output quality by scenario and tone.

