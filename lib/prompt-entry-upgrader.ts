import type { PromptCategoryId, PromptEntry } from '@/lib/prompt-library-data'

const ROLE_BY_CATEGORY: Record<PromptCategoryId, string> = {
  writing: 'Act as a senior editorial strategist and conversion-focused messaging editor.',
  work: 'Act as a chief-of-staff level operator who turns messy context into executable output.',
  coding: 'Act as a senior software engineer and technical reviewer who values correctness over speed theatre.',
  career: 'Act as a hiring-side career strategist who improves positioning without inventing credibility.',
  study: 'Act as a rigorous teacher who explains simply first and deepens only after confusion is removed.',
  research: 'Act as a research analyst who synthesizes evidence, contradictions, and decisions clearly.',
  'image-generation': 'Act as a premium visual art director for AI image generation with strong commercial taste.',
  'image-editing': 'Act as a senior retoucher and compositing director focused on realism and believable finishing.',
}

const SUMMARY_SUFFIX_BY_CATEGORY: Record<PromptCategoryId, string> = {
  writing: 'The upgraded version sharpens angle, structure, and final polish so the output feels more publishable.',
  work: 'The upgraded version adds execution logic, cleaner prioritization, and more useful next-action framing.',
  coding: 'The upgraded version raises the bar on reasoning, edge cases, and implementation safety.',
  career: 'The upgraded version improves fit, positioning, and clarity without drifting into fake confidence.',
  study: 'The upgraded version improves clarity, retention, and learner-friendly structure.',
  research: 'The upgraded version strengthens evidence handling, synthesis quality, and practical decision value.',
  'image-generation': 'The upgraded version adds stronger art direction, composition control, and better variant logic.',
  'image-editing': 'The upgraded version improves realism, cleanup priorities, and believable edit control.',
}

const DESCRIPTION_SUFFIX_BY_CATEGORY: Record<PromptCategoryId, string> = {
  writing: 'It is tuned to sound more intentional and less like generic AI-assisted drafting.',
  work: 'It is tuned to create outputs that can be used by a real team with less cleanup.',
  coding: 'It is tuned to avoid hand-wavy advice and surface the most likely failure points first.',
  career: 'It is tuned to stay persuasive while protecting credibility and honesty.',
  study: 'It is tuned to lower friction first and then deepen understanding in a useful sequence.',
  research: 'It is tuned to separate signal from noise and keep confidence levels visible.',
  'image-generation': 'It is tuned to generate more premium-looking visuals with less generic model drift.',
  'image-editing': 'It is tuned to preserve identity, texture, and realism instead of overprocessing the image.',
}

const WORKFLOW_ADDONS_BY_CATEGORY: Record<PromptCategoryId, string[]> = {
  writing: ['Paste the raw draft, audience, and real objective before trying to polish tone manually.'],
  work: ['Give the model the real deadline, constraints, and stakeholders before asking for the deliverable.'],
  coding: ['Include the exact code, expected behavior, and current failure symptoms before asking for a fix or review.'],
  career: ['Share the real role context and your actual background so the result stays believable.'],
  study: ['Start with the most confusing part so the model removes friction before adding detail.'],
  research: ['Paste the full raw material first so the synthesis is based on the complete picture.'],
  'image-generation': ['State the use case, subject, mood, and final destination of the image before asking for variants.'],
  'image-editing': ['Describe the source condition and the intended finish before asking for the edit prompt.'],
}

const TIPS_ADDONS_BY_CATEGORY: Record<PromptCategoryId, string[]> = {
  writing: [
    'If the result feels polished but still weak, ask where the angle is generic and what should be cut.',
    'Request one stronger alternate version when you need a bolder option instead of a safer rewrite.',
  ],
  work: [
    'Force the model to separate urgent action from later cleanup when execution speed matters.',
    'Give real tradeoffs so the output does not become idealized and unusable.',
  ],
  coding: [
    'Ask what evidence would disprove the top recommendation if you want a safer debugging path.',
    'Mention scale, production risk, and framework constraints when they materially change the right answer.',
  ],
  career: [
    'Keep every achievement grounded in evidence and ask the model to point out weak claims directly.',
    'Ask for a tighter version if the output feels polished but too long for real usage.',
  ],
  study: [
    'Use the explanation plus one test question if you want to verify the idea actually landed.',
    'Ask for a second example from your own subject if the first explanation still feels abstract.',
  ],
  research: [
    'Ask the model to mark strong evidence versus weak signals if the topic is noisy or controversial.',
    'Use the gaps section to plan the next round of research instead of overtrusting the first output.',
  ],
  'image-generation': [
    'If the first result feels generic, tighten composition, materials, and lighting before adding more style words.',
    'Generate one subtle version and one bolder campaign version so you can pick the right energy level.',
  ],
  'image-editing': [
    'Start with the subtle version first if realism matters more than dramatic change.',
    'Always inspect edges, texture, skin tone, and shadows before accepting the polished result.',
  ],
}

const RETURN_STRUCTURE_BY_CATEGORY: Record<PromptCategoryId, string[]> = {
  writing: [
    'Strategic read of the task',
    'Best final draft',
    'Alternate version or shorter version',
    'What changed and why',
  ],
  work: [
    'Outcome restatement',
    'Recommended structure or action plan',
    'Main deliverable',
    'Risks, blockers, and next actions',
  ],
  coding: [
    'Problem understanding',
    'Ranked risks or likely root causes',
    'Recommended solution or review output',
    'Validation and follow-up checks',
  ],
  career: [
    'Fit read',
    'Main final draft',
    'Shorter or alternate version',
    'Weak spots or honesty checks',
  ],
  study: [
    'Simple explanation first',
    'Deeper explanation or structure',
    'Common mistakes or misconceptions',
    'Quick check for understanding',
  ],
  research: [
    'Core frame',
    'Main findings',
    'Evidence, gaps, or contradictions',
    'Recommendation or next step',
  ],
  'image-generation': [
    'Main generation prompt',
    'Art-direction notes',
    'Negative prompt or avoid list',
    'Variant directions',
  ],
  'image-editing': [
    'Main edit prompt',
    'Cleanup or adjustment priorities',
    'Negative prompt or avoid list',
    'Subtle and stronger variants',
  ],
}

const HARD_RULES_BY_CATEGORY: Record<PromptCategoryId, string[]> = {
  writing: [
    'Do not default to empty marketing language or fake authority.',
    'Preserve the real intent and audience instead of rewriting for style alone.',
    'Cut repetition aggressively when it weakens the message.',
  ],
  work: [
    'Do not produce idealized plans that ignore the real constraints.',
    'Keep ownership, deadlines, and dependencies explicit whenever possible.',
    'Prioritize what actually moves execution forward.',
  ],
  coding: [
    'Do not give generic best-practice advice without linking it to the actual code or problem.',
    'Call out uncertainty instead of pretending confidence when evidence is missing.',
    'Prefer the smallest safe change before broad rewrites.',
  ],
  career: [
    'Do not invent achievements, scope, or tools.',
    'Make the candidate look stronger by framing honestly, not by inflating fit.',
    'Surface weak match areas directly when they matter.',
  ],
  study: [
    'Do not jump into jargon before the foundation is clear.',
    'Use examples that reduce confusion instead of adding extra abstraction.',
    'Treat misconceptions as part of the teaching path.',
  ],
  research: [
    'Do not flatten contradictions when they matter to the decision.',
    'Separate evidence from assumption clearly.',
    'Keep confidence and uncertainty visible.',
  ],
  'image-generation': [
    'Do not rely on generic style-dump wording.',
    'Keep subject clarity, composition, and light direction stronger than decorative adjectives.',
    'Make the result usable for a real visual workflow, not just dramatic on first glance.',
  ],
  'image-editing': [
    'Do not overprocess skin, texture, or edges.',
    'Preserve identity and realism unless a stylized result is explicitly requested.',
    'Check blend logic, shadow logic, and material consistency.',
  ],
}

const SELF_CHECKS_BY_CATEGORY: Record<PromptCategoryId, string[]> = {
  writing: [
    'Is the angle specific and useful?',
    'Did the final draft remove repetition and vague filler?',
  ],
  work: [
    'Would a busy operator actually use this output as-is?',
    'Are priorities, blockers, and ownership clear?',
  ],
  coding: [
    'Is the recommendation grounded in evidence from the code or symptoms?',
    'Did you identify the riskiest assumptions and how to test them?',
  ],
  career: [
    'Does the final draft improve fit without faking experience?',
    'Are the weak points still visible where honesty matters?',
  ],
  study: [
    'Will a beginner understand the first pass without outside help?',
    'Did you include a way to check understanding?',
  ],
  research: [
    'Did you separate signal, gaps, and disagreement clearly?',
    'Is the final recommendation justified by the evidence shown?',
  ],
  'image-generation': [
    'Is the subject, composition, and light direction specific enough to generate premium results?',
    'Did you control clutter, text artifacts, and generic model drift?',
  ],
  'image-editing': [
    'Did you protect realism, identity, and texture where needed?',
    'Did you specify what should not be changed or overdone?',
  ],
}

function dedupeStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)))
}

function trimSentence(value: string) {
  return value.trim().replace(/\s+/g, ' ').replace(/[. ]+$/, '')
}

function includesAny(source: string, keywords: string[]) {
  return keywords.some(keyword => source.includes(keyword))
}

function buildKeywordBullets(entry: PromptEntry) {
  const fingerprint = `${entry.slug} ${entry.title} ${entry.subcategory}`.toLowerCase()
  const bullets: string[] = []

  if (includesAny(fingerprint, ['email', 'outreach', 'follow-up', 'linkedin', 'newsletter'])) {
    bullets.push('Make the ask, tone, and recipient context obvious without sounding robotic or mass-produced.')
  }

  if (includesAny(fingerprint, ['resume', 'cover-letter', 'cover letter', 'interview', 'recruiter'])) {
    bullets.push('Keep all claims honest and make the fit stronger through framing, not exaggeration.')
  }

  if (includesAny(fingerprint, ['sql', 'api', 'schema', 'regex', 'test', 'bug', 'contract', 'performance', 'react', 'nextjs'])) {
    bullets.push('Call out edge cases, hidden failure modes, and assumptions that could break the recommendation.')
  }

  if (includesAny(fingerprint, ['research', 'brief', 'compare', 'positioning', 'matrix', 'paper', 'reviews', 'market'])) {
    bullets.push('Separate strong evidence from weak signals and preserve contradictions when they matter.')
  }

  if (includesAny(fingerprint, ['study', 'exam', 'explain', 'quiz', 'flashcards', 'theories'])) {
    bullets.push('Reduce confusion first, then deepen understanding with examples, misconceptions, or quick checks.')
  }

  if (includesAny(fingerprint, ['youtube', 'script', 'thumbnail', 'creator', 'social'])) {
    bullets.push('Prioritize viewer attention, clarity, and structure over generic creator tropes.')
  }

  if (includesAny(fingerprint, ['portrait', 'headshot', 'face', 'skin', 'fashion'])) {
    bullets.push('Preserve identity, believable skin tone, and natural proportions in every output.')
  }

  if (includesAny(fingerprint, ['product', 'ecommerce', 'hero', 'marketplace', 'poster', 'campaign', 'food'])) {
    bullets.push('Keep the hero subject dominant with cleaner composition, realistic materials, and commercial polish.')
  }

  if (includesAny(fingerprint, ['background', 'restore', 'relight', 'retouch', 'cleanup', 'recolor'])) {
    bullets.push('Preserve realism by controlling edges, texture, shadow logic, and overprocessed finishing.')
  }

  return bullets
}

function buildAdvancedPrompt(entry: PromptEntry) {
  const qualityBullets = dedupeStrings([
    'Make the result feel senior-grade, directly usable, and easy to scan.',
    'Be specific instead of defaulting to generic best-practice language.',
    'If the input is incomplete, ask up to 3 high-leverage clarifying questions first; otherwise proceed with clearly labeled assumptions.',
    ...buildKeywordBullets(entry),
  ])

  const returnStructure = RETURN_STRUCTURE_BY_CATEGORY[entry.category]
    .map((item, index) => `${index + 1}. ${item}`)
    .join('\n')

  const qualitySection = qualityBullets.map(item => `- ${item}`).join('\n')
  const hardRulesSection = HARD_RULES_BY_CATEGORY[entry.category].map(item => `- ${item}`).join('\n')
  const selfCheckSection = SELF_CHECKS_BY_CATEGORY[entry.category].map(item => `- ${item}`).join('\n')

  return `${ROLE_BY_CATEGORY[entry.category]}

You are not here to give a quick generic answer. You are here to produce the strongest useful result for the exact task below.

Working method:
1. Understand the real goal, audience, and constraints.
2. Identify what is missing, risky, vague, or likely to create a weak result.
3. Produce the best version of the output in a structure that is easy to use immediately.
4. Self-review the output before finishing.

Additional quality bar:
${qualitySection}

Hard rules:
${hardRulesSection}

Return structure:
${returnStructure}

Before finalizing, self-check:
${selfCheckSection}

Base task:
${entry.prompt}`
}

export function applyPromptAdvancedBaseline(entry: PromptEntry, hasManualOverride: boolean): PromptEntry {
  if (hasManualOverride) {
    return entry
  }

  return {
    ...entry,
    summary: `${trimSentence(entry.summary)} ${SUMMARY_SUFFIX_BY_CATEGORY[entry.category]}`,
    description: `${trimSentence(entry.description)} ${DESCRIPTION_SUFFIX_BY_CATEGORY[entry.category]}`,
    prompt: buildAdvancedPrompt(entry),
    workflow: dedupeStrings([...WORKFLOW_ADDONS_BY_CATEGORY[entry.category], ...entry.workflow]).slice(0, 4),
    tips: dedupeStrings([...entry.tips, ...TIPS_ADDONS_BY_CATEGORY[entry.category]]).slice(0, 4),
  }
}
