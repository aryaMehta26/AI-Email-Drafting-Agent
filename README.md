# AI Email Drafting Agent

**Iconic Founders Group — AI Intern Finalist Assignment (Challenge #1)**

Draft context-aware, professional email replies for 3 common workflows (inbound RA, outbound follow‑up, post‑meeting thank you). The output is designed to be **reviewed, lightly edited, and sent**.

---

## Demo (what you’ll show in Loom)

- Pick an email type → choose tone → paste an email → click **Generate draft reply**
- Show the **Quick analysis** + the generated **Draft reply**
- Click **Copy** and paste into a blank doc to prove it’s “send-ready”

---

## Features

- **Three email types (required)**
  - **Inbound RA — Vague Request**: warm + strategically inquisitive (qualifies intent before committing to a meeting)
  - **Outbound RA — Follow‑Up**: light, personal nudge (non‑pushy; doesn’t feel automated)
  - **Post‑Meeting — Thank You**: reinforces next steps and leaves a strong impression
- **Tone selection (bonus)**: crisp / warm / assertive
- **Email analysis (required)**: lightweight signal detection (scheduling, apology, gratitude, next steps)
- **Clean UI (bonus)**: one screen, fast workflow, sample buttons to generate the 3 submission drafts quickly

---

## Tech stack

- **Frontend**: Vite + React + TypeScript
- **Styling**: Tailwind CSS

---

## Run locally

```bash
cd email-drafting-agent
npm install
npm run dev
```

Open the **Local** URL printed in the terminal (usually `http://localhost:5173/`).

---

## How to generate the 3 required sample replies

In the running app:

1. Click **Inbound RA — Vague request** → **Generate** → copy the draft
2. Click **Outbound RA — Follow‑up** → **Generate** → copy the draft
3. Click **Post‑meeting — Thank you** → **Generate** → copy the draft

Paste each into your submission doc as “Sample Reply 1/2/3”.

---

## Notes on “agent” + integrations

This MVP is a **fast, reliable draft generator** that runs locally in the browser (no API key required).

- **Included**: scenario selection + tone selection + intent/tone signal analysis + draft generation
- **Not included (bonus)**: Outlook/M365 API integration (Graph), automatic thread fetch, or one‑click “Insert into Outlook”

---

## What I’d build next (3–5 sentences)

Next, I’d connect to Outlook/M365 using Microsoft Graph so the tool can read the active thread and draft directly inside the composer, with citation of key thread details it used. I’d add lightweight CRM context (contact type, relationship strength, last touchpoint) to improve personalization and reduce back‑and‑forth. I’d also implement an edit‑feedback loop (final sent version vs draft) to tune prompts, build reusable snippets by scenario, and enforce safety checks (no auto‑send, compliance language, and hallucination guardrails). Finally, I’d add basic telemetry to measure time saved and reply quality by scenario and tone.
