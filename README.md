# AI Email Drafting Agent

Draft professional, context-aware email replies for 3 common workflows (inbound intro, outbound follow‑up, post‑meeting thank you). Designed to be **reviewed, lightly edited, and sent**.

## Highlights

- **3 scenarios**: inbound vague request, outbound follow‑up, post‑meeting thank you
- **Tone control**: crisp / warm / assertive
- **Lightweight context analysis**: detects common signals (scheduling, gratitude, next steps)
- **Fast UI**: paste → generate → copy

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS

## Run locally

```bash
cd email-drafting-agent
npm install
npm run dev
```

Open the **Local** URL printed in the terminal (usually `http://localhost:5173/`).

## Project layout

- `src/App.tsx`: UI (controls, input, output, copy)
- `src/lib/generate.ts`: draft generation + signal detection
