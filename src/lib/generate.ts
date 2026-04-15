export type EmailKind =
  | 'inbound_ra_vague'
  | 'outbound_ra_followup'
  | 'post_meeting_thanks'

export type Tone = 'crisp' | 'warm' | 'assertive'

export type GenerateInput = {
  emailKind: EmailKind
  tone: Tone
  senderName: string
  recipientName?: string
  emailText: string
}

export type GenerateResult = {
  analysis: string
  draft: string
}

function clampText(s: string, max = 10_000) {
  const t = s.replace(/\r\n/g, '\n').trim()
  return t.length > max ? `${t.slice(0, max)}\n\n[truncated]` : t
}

function detectSignals(emailText: string) {
  const t = emailText.toLowerCase()
  const hasScheduling = /(calendar|availability|available|time to connect|schedule|meet|call)/.test(
    t,
  )
  const hasApology = /(sorry|apolog)/.test(t)
  const hasThanks = /(thank you|thanks again|appreciate)/.test(t)
  const hasNextSteps = /(next steps|follow up|send over|i'll|we'll|let's)/.test(t)
  return { hasScheduling, hasApology, hasThanks, hasNextSteps }
}

function toneDirectives(tone: Tone) {
  switch (tone) {
    case 'crisp':
      return {
        opener: 'Thanks for reaching out.',
        vibe: 'Concise, professional, minimal fluff.',
        close: 'Best,',
      }
    case 'assertive':
      return {
        opener: 'Thanks for reaching out — quick question before we set time.',
        vibe: 'Confident, time-efficient, politely leading.',
        close: 'Best,',
      }
    case 'warm':
    default:
      return {
        opener: 'Thanks for reaching out — hope you’re doing well.',
        vibe: 'Warm, human, still businesslike.',
        close: 'Best,',
      }
  }
}

function formatGreeting(recipientName?: string) {
  return recipientName ? `Hi ${recipientName},` : 'Hi —'
}

function inboundVague({
  senderName,
  recipientName,
  tone,
  signals,
}: {
  senderName: string
  recipientName?: string
  tone: Tone
  signals: ReturnType<typeof detectSignals>
}) {
  const td = toneDirectives(tone)
  const q1 = `What prompted you to reach out — are you looking to refer a founder, explore a partnership, or just get connected?`
  const q2 =
    'If helpful, a sentence or two on who you typically work with (industry + size range) would help me route this the right way.'
  const scheduleLine = signals.hasScheduling
    ? 'Once I understand the context, I’m happy to set up a quick call.'
    : 'If it makes sense, I’m happy to set up a quick call.'

  return [
    formatGreeting(recipientName),
    '',
    td.opener,
    '',
    q1,
    q2,
    '',
    scheduleLine,
    '',
    td.close,
    senderName,
  ].join('\n')
}

function outboundFollowUp({
  senderName,
  recipientName,
  tone,
}: {
  senderName: string
  recipientName?: string
  tone: Tone
}) {
  const td = toneDirectives(tone)
  const nudge =
    tone === 'crisp'
      ? 'Bumping this in case it got buried.'
      : tone === 'assertive'
        ? 'Just resurfacing this — I know inboxes get loud.'
        : 'Just circling back — I know things get busy.'

  return [
    formatGreeting(recipientName),
    '',
    `${nudge} If it’s not a priority right now, no worries at all.`,
    '',
    'If a quick intro call would be useful, I can do 15 minutes this week. Otherwise, happy to stay in touch and reconnect when timing is better.',
    '',
    td.close,
    senderName,
  ].join('\n')
}

function postMeetingThanks({
  senderName,
  recipientName,
  tone,
  signals,
}: {
  senderName: string
  recipientName?: string
  tone: Tone
  signals: ReturnType<typeof detectSignals>
}) {
  const td = toneDirectives(tone)
  const nextStepsLine = signals.hasNextSteps
    ? 'Appreciate the clarity on next steps — I’ll follow through on my side.'
    : 'As next steps, I’m happy to send over a quick recap and proposed timeline if helpful.'

  return [
    formatGreeting(recipientName),
    '',
    'Thanks again for the time today.',
    '',
    'I enjoyed the conversation and the context on what you’re building and what matters most to you as you think about growth and optionality.',
    '',
    nextStepsLine,
    '',
    'If you’d like, I can also share a couple of relevant data points from recent lower middle market outcomes in adjacent services businesses.',
    '',
    td.close,
    senderName,
  ].join('\n')
}

export async function generateDraftReply(
  input: GenerateInput,
): Promise<GenerateResult> {
  const emailText = clampText(input.emailText)
  const signals = detectSignals(emailText)

  const analysisLines = [
    `Type: ${input.emailKind.replace(/_/g, ' ')}`,
    `Tone: ${input.tone}`,
    signals.hasScheduling ? 'Signal: scheduling language detected' : undefined,
    signals.hasApology ? 'Signal: apology language detected' : undefined,
    signals.hasThanks ? 'Signal: gratitude language detected' : undefined,
    signals.hasNextSteps ? 'Signal: next-steps language detected' : undefined,
  ].filter(Boolean)

  const analysis = analysisLines.join('\n')

  const draft =
    input.emailKind === 'inbound_ra_vague'
      ? inboundVague({
          senderName: input.senderName,
          recipientName: input.recipientName,
          tone: input.tone,
          signals,
        })
      : input.emailKind === 'outbound_ra_followup'
        ? outboundFollowUp({
            senderName: input.senderName,
            recipientName: input.recipientName,
            tone: input.tone,
          })
        : postMeetingThanks({
            senderName: input.senderName,
            recipientName: input.recipientName,
            tone: input.tone,
            signals,
          })

  return { analysis, draft }
}

