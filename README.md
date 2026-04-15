# ✉️ AI Email Drafting Agent

**Iconic Founders Group — AI Intern Finalist Assignment (Challenge #1)**  
Built by **Arya (aryaMehta26)**.

> A fast, clean MVP that **reads email context** (lightweight signals), then drafts a **professional, send‑ready reply** for common M&A advisory workflows.

---

## ⚡ One‑minute demo (Loom talk track)

1. Select **Email Type** (Inbound RA / Outbound follow‑up / Post‑meeting thanks)
2. Choose **Tone** (Crisp / Warm / Assertive)
3. Paste an email → click **Generate draft reply**
4. Show:
   - **Quick analysis** (intent/tone signals)
   - **Draft reply** (ready to review + send)
5. Click **Copy** and paste into a blank doc/email to prove it’s “send‑ready”

---

## ✅ Requirement checklist (from the prompt)

- **Accept email input**: ✅
- **Analyze tone + intent**: ✅ (signal detection)
- **Generate professional reply**: ✅
- **Email Type 1 — Inbound RA (vague request)**: ✅ warm + strategically inquisitive
- **Email Type 2 — Outbound RA follow‑up**: ✅ light, personal, non‑pushy
- **Email Type 3 — Post‑meeting thank you**: ✅ reinforces next steps + positive impression
- **Tone selection (bonus)**: ✅
- **Simple UI (bonus)**: ✅
- **Outlook/M365 integration (bonus)**: ❌ (next step)

---

## 🧠 What the “agent” is (and isn’t)

This is an **MVP drafting agent** that runs locally in the browser.

- **Included**: scenario selection + tone selection + lightweight context analysis + draft generation
- **Not included (yet)**: Microsoft Graph thread fetch, in‑Outlook compose add‑in, or “insert draft into Outlook”

---

## 🧩 Features

- **3 workflows supported**
  - **Inbound RA — Vague Request**: qualifies intent before committing time (warm + inquisitive)
  - **Outbound RA — Follow‑Up**: gentle re‑engagement that feels personal
  - **Post‑Meeting — Thank You**: closes the loop, reinforces next steps, keeps momentum
- **Tone control**: Crisp / Warm / Assertive
- **Quick analysis panel**: detects common signals (scheduling, apology, gratitude, next steps)
- **“Load sample” buttons**: generate the 3 required submission drafts in seconds

---

## 🛠️ Tech stack

- **React + TypeScript** (UI + logic)
- **Vite** (dev + build)
- **Tailwind CSS** (modern UI styling)

---

## 🚀 Run locally

```bash
cd email-drafting-agent
npm install
npm run dev
```

Open the **Local** URL printed in the terminal (usually `http://localhost:5173/`).

---

## 📝 Generate the 3 required sample replies

In the running app:

1. Click **Inbound RA — Vague request** → **Generate** → copy the draft
2. Click **Outbound RA — Follow‑up** → **Generate** → copy the draft
3. Click **Post‑meeting — Thank you** → **Generate** → copy the draft

Paste into your submission doc as **Sample Reply 1 / 2 / 3**.

---

## 📁 Project layout (where things live)

- `src/App.tsx`: UI (controls, input, output, copy)
- `src/lib/generate.ts`: draft generation + signal detection (the “agent” logic)

---

## 🔭 What I’d build next (3–5 sentences)

Next, I’d connect to Outlook/M365 via **Microsoft Graph** so the tool can pull the active thread and draft directly inside the composer, with explicit citation of the thread details it used. I’d add lightweight CRM context (contact type, relationship strength, last touchpoint) to improve personalization and reduce back‑and‑forth. I’d implement an edit‑feedback loop (final sent version vs draft) to tune prompts, build reusable snippets by scenario, and enforce safety checks (no auto‑send, compliance language, hallucination guardrails). Finally, I’d add telemetry to quantify time saved and output quality by scenario and tone.
