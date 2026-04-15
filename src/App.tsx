import { useMemo, useState } from 'react'
import { generateDraftReply, type EmailKind, type Tone } from './lib/generate'

const EMAIL_KIND_LABEL: Record<EmailKind, string> = {
  inbound_ra_vague: 'Inbound RA — Vague request',
  outbound_ra_followup: 'Outbound RA — Follow-up',
  post_meeting_thanks: 'Post-meeting — Thank you',
}

const TONE_LABEL: Record<Tone, string> = {
  crisp: 'Crisp + direct',
  warm: 'Warm + personable',
  assertive: 'Assertive (still respectful)',
}

const SAMPLE_EMAILS: Record<EmailKind, string> = {
  inbound_ra_vague: `Subject: Quick intro

Hi Kory —

I hope you’re doing well. I’d love to connect sometime soon. Let me know what your calendar looks like.

Best,
Jordan`,
  outbound_ra_followup: `Subject: Re: Intro

Hi Kory,

Sorry I missed this last week — things got busy. Happy to connect, just not sure when.

Thanks,
Taylor`,
  post_meeting_thanks: `Subject: Great speaking today

Kory —

Thanks again for the time today. Really enjoyed the conversation about the platform you’re building and how you think about add-ons.

Talk soon,
Alex`,
}

export default function App() {
  const [emailKind, setEmailKind] = useState<EmailKind>('inbound_ra_vague')
  const [tone, setTone] = useState<Tone>('warm')
  const [senderName, setSenderName] = useState('Kory')
  const [recipientName, setRecipientName] = useState('')
  const [emailInput, setEmailInput] = useState(SAMPLE_EMAILS.inbound_ra_vague)
  const [draft, setDraft] = useState<string>('')
  const [analysis, setAnalysis] = useState<string>('')
  const [isWorking, setIsWorking] = useState(false)
  const [copied, setCopied] = useState(false)

  const placeholder = useMemo(() => SAMPLE_EMAILS[emailKind], [emailKind])

  async function onGenerate() {
    setIsWorking(true)
    setCopied(false)
    try {
      const result = await generateDraftReply({
        emailKind,
        tone,
        senderName: senderName.trim() || 'Kory',
        recipientName: recipientName.trim() || undefined,
        emailText: emailInput.trim(),
      })
      setDraft(result.draft)
      setAnalysis(result.analysis)
    } finally {
      setIsWorking(false)
    }
  }

  async function onCopy() {
    if (!draft) return
    await navigator.clipboard.writeText(draft)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  function onLoadSample(kind: EmailKind) {
    setEmailKind(kind)
    setEmailInput(SAMPLE_EMAILS[kind])
    setDraft('')
    setAnalysis('')
    setCopied(false)
  }

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-fuchsia-400 to-cyan-300 shadow-soft" />
            <div className="leading-tight">
              <div className="text-sm text-slate-300">IFG Challenge #1</div>
              <h1 className="text-2xl font-semibold tracking-tight">
                AI Email Drafting Agent
              </h1>
            </div>
          </div>
          <p className="max-w-3xl text-sm text-slate-300">
            Paste an email, pick the scenario + tone, and generate a professional,
            context-aware reply for M&A advisory workflows.
          </p>
        </header>

        <main className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-200">
                Input email
              </h2>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    'inbound_ra_vague',
                    'outbound_ra_followup',
                    'post_meeting_thanks',
                  ] as const
                ).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => onLoadSample(k)}
                    className="rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-xs text-slate-200 hover:border-slate-500"
                  >
                    {EMAIL_KIND_LABEL[k]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1">
                <span className="text-xs text-slate-300">Email type</span>
                <select
                  value={emailKind}
                  onChange={(e) => setEmailKind(e.target.value as EmailKind)}
                  className="h-10 rounded-xl border border-slate-700 bg-slate-950/40 px-3 text-sm outline-none focus:border-cyan-300"
                >
                  {(Object.keys(EMAIL_KIND_LABEL) as EmailKind[]).map((k) => (
                    <option key={k} value={k}>
                      {EMAIL_KIND_LABEL[k]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-1">
                <span className="text-xs text-slate-300">Tone</span>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as Tone)}
                  className="h-10 rounded-xl border border-slate-700 bg-slate-950/40 px-3 text-sm outline-none focus:border-fuchsia-300"
                >
                  {(Object.keys(TONE_LABEL) as Tone[]).map((t) => (
                    <option key={t} value={t}>
                      {TONE_LABEL[t]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-1">
                <span className="text-xs text-slate-300">Sender name</span>
                <input
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="h-10 rounded-xl border border-slate-700 bg-slate-950/40 px-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Kory"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-xs text-slate-300">
                  Recipient name (optional)
                </span>
                <input
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="h-10 rounded-xl border border-slate-700 bg-slate-950/40 px-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Jordan"
                />
              </label>
            </div>

            <label className="mt-4 grid gap-1">
              <span className="text-xs text-slate-300">
                Email text (the thread or last message)
              </span>
              <textarea
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder={placeholder}
                className="h-72 resize-none rounded-2xl border border-slate-700 bg-slate-950/40 p-3 text-sm leading-relaxed outline-none focus:border-slate-400"
              />
            </label>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onGenerate}
                disabled={isWorking || !emailInput.trim()}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-400 to-cyan-300 px-4 text-sm font-semibold text-slate-950 shadow-soft disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isWorking ? 'Generating…' : 'Generate draft reply'}
              </button>
              <div className="text-xs text-slate-400">
                Uses a strong rules-based generator by default (no API key
                required).
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-200">
                Draft reply
              </h2>
              <button
                type="button"
                onClick={onCopy}
                disabled={!draft}
                className="rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-xs text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-3">
                <div className="text-xs font-semibold text-slate-300">
                  Quick analysis
                </div>
                <p className="mt-1 whitespace-pre-wrap text-sm text-slate-200">
                  {analysis || '—'}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-3">
                <div className="text-xs font-semibold text-slate-300">
                  Email body
                </div>
                <pre className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-100">
                  {draft || 'Generate to see a draft reply here.'}
                </pre>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-3 text-xs text-slate-300">
                Tip: reviewers like seeing 3 sample outputs. Use the three sample
                buttons on the left, generate each, and paste into your submission
                doc.
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-10 text-xs text-slate-500">
          Built for Iconic Founders Group finalist assignment. No external
          integrations included in this MVP.
        </footer>
      </div>
    </div>
  )
}
