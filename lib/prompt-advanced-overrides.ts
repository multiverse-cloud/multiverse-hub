import type { PromptEntry } from '@/lib/prompt-library-data'

type PromptOverride = Partial<
  Omit<PromptEntry, 'id' | 'slug' | 'category' | 'categoryTitle' | 'subcategory' | 'models' | 'relatedSlugs' | 'updatedAt'>
>

export const PROMPT_ADVANCED_OVERRIDES: Partial<Record<string, PromptOverride>> = {
  'meeting-notes-to-action-plan': {
    summary: 'A sharper operator-grade prompt that turns long meeting notes into decisions, owners, blockers, and a real execution plan.',
    description:
      'Upgraded for founders, operators, and team leads who want a post-meeting output that can actually be forwarded without cleanup.',
    prompt: `You are my chief of staff and operating editor.

I will paste messy meeting notes, transcript fragments, side comments, and action hints.
Your job is to turn them into a decision-grade action plan.

First, silently identify:
- decisions that were truly made
- unresolved questions
- implied owners
- hidden blockers
- deadlines that sound real versus vague

Then return the final answer in this exact structure:
1. Executive summary
   - 3 to 5 bullets only
   - what actually changed because of this meeting
2. Decisions made
   - each decision as a short bullet
3. Action table
   - columns: Owner | Action | Deadline | Dependency | Priority | Confidence
4. Open questions
5. Risks and blockers
6. What must happen in the next 48 hours
7. Follow-up items for the next meeting

Rules:
- Do not repeat the meeting notes.
- Remove filler, rambling, and duplicated statements.
- If ownership is unclear, mark "Unassigned".
- If a deadline sounds implied but not committed, mark "Needs confirmation".
- If the conversation drifted, recover the operational core.
- If there is a conflict between comments, note it clearly.
- Keep the output scannable for a busy team.

Meeting notes:
[PASTE NOTES HERE]`,
    bestFor: ['Operator meeting cleanups', 'Founder syncs', 'Client delivery calls'],
    workflow: ['Paste raw notes without cleaning them first', 'Review the decisions and action table', 'Send the output directly to the team or PM tool'],
    tips: [
      'Paste the exact transcript or rough bullets first. The prompt is designed to handle messy input.',
      'If you want stronger accountability, ask for a version grouped by team or owner.',
      'Use Claude when the meeting notes are extremely long or fragmented.',
    ],
  },
  'react-bug-hunt': {
    summary: 'An engineering-grade debugging prompt for isolating React bugs, ranking hypotheses, and testing the safest fix first.',
    description:
      'This version is stronger for real product bugs because it forces hypothesis ranking, evidence checks, and minimal-risk patches.',
    prompt: `Act as a senior React and Next.js debugging partner.

I will give you:
- the bug description
- expected behavior
- actual behavior
- reproduction steps
- relevant component or hook code
- any console, runtime, or build errors

Your job is not to guess randomly. Your job is to produce a disciplined debugging path.

Return the answer in this exact structure:
1. Bug restatement
2. Most likely root causes ranked from highest to lowest confidence
3. Evidence already present for each hypothesis
4. Missing evidence I should collect next
5. Smallest safe fix to test first
6. Why that fix is lower-risk than broader rewrites
7. Follow-up checks after the first fix
8. If this is actually architectural, say so directly

Rules:
- Do not dump generic React advice.
- Do not rewrite the whole component unless absolutely necessary.
- Call out stale state, effect dependency mistakes, server/client boundary issues, hydration mismatches, render loops, memo problems, race conditions, or uncontrolled side effects when relevant.
- If the bug may come from data shape or async timing, say exactly what to inspect.
- Prefer a minimal patch that proves or disproves a hypothesis.
- Mention what result would falsify your top hypothesis.

Context:
[PASTE BUG DETAILS HERE]`,
    bestFor: ['Hydration bugs', 'State sync issues', 'Next.js client-server edge cases'],
    workflow: ['Paste the smallest reproducible context', 'Test the first minimal patch only', 'Loop back with the result and new evidence'],
    tips: [
      'Always include expected versus actual behavior. That sharpens the hypothesis ranking.',
      'If it only fails in production or build, say that clearly.',
      'If the bug involves data fetching, paste the request timing and state transitions too.',
    ],
  },
  'sql-query-review': {
    summary: 'A production-minded SQL review prompt that checks logic, cost, edge cases, and safer rewrites before you run anything risky.',
    description:
      'Better suited for real analytics and production review because it forces correctness, performance, and failure-mode thinking together.',
    prompt: `Act as a staff-level SQL reviewer.

I will paste a query and optional schema context.
You must review it like production code, not like a syntax checker.

Return the answer in this exact structure:
1. Query intent
2. Logical risks or likely bugs
3. Edge cases that can silently break the result
4. Performance concerns
5. Ambiguous assumptions or missing schema details
6. Safer rewrite
7. What to test before running on production data

Rules:
- Be concrete, not generic.
- Flag join duplication risk, null handling, window-function traps, time-boundary issues, aggregation mistakes, and hidden row inflation when relevant.
- If the query mutates data, explicitly call out blast radius and rollback concerns.
- If missing schema context prevents certainty, say exactly what is missing.
- Do not praise the query unless you can justify it.

Query and context:
[PASTE SQL HERE]`,
    bestFor: ['Analytics reviews', 'Costly query checks', 'Pre-production SQL validation'],
    workflow: ['Paste the query and any schema context', 'Inspect logic and edge-case warnings', 'Test the safer rewrite on safe data first'],
    tips: [
      'Include rough table sizes if performance matters.',
      'Mention the SQL dialect when it is not obvious.',
      'If the query updates or deletes, ask for a rollback-safe test checklist too.',
    ],
  },
  'resume-tailor-from-job-description': {
    summary: 'A higher-signal resume tailoring prompt that improves fit, keeps claims honest, and surfaces what should not be faked.',
    description:
      'This version is stronger for serious applications because it balances keyword fit, credibility, and recruiter readability.',
    prompt: `Act as a senior resume strategist and hiring-side editor.

I will give you:
- my current resume
- a target job description

Your job is to tailor the resume honestly, not cosmetically.

Return your answer in this exact structure:
1. Strongest overlap between my real experience and the role
2. Missing but important requirements I should not fake
3. Rewritten headline and summary
4. Rewritten bullet points for the most relevant experience sections
5. Keywords that are fair to incorporate
6. Weak areas that still need to be addressed outside the resume
7. A final recruiter-readability check

Rules:
- Do not invent achievements, tools, ownership, or scope.
- Do not turn every line into buzzword soup.
- Keep bullets compact, credible, and impact-oriented.
- Preserve honest nuance when my background is adjacent rather than exact.
- If a career pivot is involved, help frame transferability without pretending direct match.

Resume and job description:
[PASTE RESUME AND JOB DESCRIPTION HERE]`,
    bestFor: ['Role-specific applications', 'Adjacent career pivots', 'Serious resume upgrades'],
    workflow: ['Paste the resume and target role together', 'Review honest overlap first', 'Keep only edits that still sound like your real experience'],
    tips: [
      'Ask for a one-page version after the core rewrite if you need tighter screening fit.',
      'If the role is senior, ask for stronger leadership framing without overstating ownership.',
      'Use Claude for longer resumes where tone and nuance matter more.',
    ],
  },
  'nextjs-performance-audit': {
    summary: 'A deeper performance audit prompt for bundle weight, hydration waste, server-client boundaries, and rendering inefficiency in Next.js.',
    description:
      'Built for real app optimization work where you need practical audit findings, not generic performance advice.',
    prompt: `Act as a senior Next.js performance reviewer.

I will give you page code, component code, route structure, or build output.
Your job is to audit for real performance issues and return actionable findings.

Return the answer in this exact structure:
1. Most important performance risks in priority order
2. What is causing bundle weight or render waste
3. Server versus client boundary issues
4. Data-fetching inefficiencies
5. Component-level waste or re-render risks
6. Best high-impact fixes first
7. Lower-priority cleanup opportunities
8. What to measure after the fixes

Rules:
- Do not give generic advice like "use memo" without showing why.
- Call out over-clientized trees, unnecessary large imports, heavy static params, repeated data fetches, and expensive list rendering when relevant.
- Explain tradeoffs clearly.
- Prioritize fixes by impact and effort.
- If something is acceptable, do not invent a problem.

Context:
[PASTE NEXTJS PAGE OR BUILD CONTEXT HERE]`,
    bestFor: ['Bundle audits', 'Route performance reviews', 'Next.js refactor planning'],
    workflow: ['Paste the route or build output', 'Fix the highest-impact issues first', 'Re-measure after each wave of changes'],
    tips: [
      'Include first-load JS or build output when available.',
      'Paste both the route file and the heavy child components if possible.',
      'Ask for a fix order if you need the fastest win path.',
    ],
  },
  'compare-ai-models-by-use-case': {
    summary: 'A more advanced model-comparison prompt that ranks AI models by actual workflow fit instead of generic hype or benchmark talk.',
    description:
      'This version is better for choosing between ChatGPT, Claude, Gemini, and others because it frames the tradeoff around task, context, speed, and risk.',
    prompt: `Act as a practical AI model evaluator.

I will give you a workflow, task mix, constraints, and candidate models.
Do not answer based on hype or generic benchmark chatter.

Return the answer in this exact structure:
1. Workflow summary
2. What actually matters for this use case
3. Model-by-model comparison table
   - reasoning quality
   - speed
   - context handling
   - structure reliability
   - writing quality
   - instruction-following
   - cost sensitivity
   - risk or failure modes
4. Best model for this use case
5. Best backup model
6. When a mixed-model workflow is smarter than a single-model choice
7. Final recommendation in plain language

Rules:
- Judge the models based on the stated workflow, not generic reputation.
- Mention tradeoffs clearly.
- If the workflow has privacy, safety, or consistency concerns, include them.
- If the use case needs structured output or long context, weight those heavily.
- If the candidate list is weak, say what other model type should be considered.

Workflow and candidate models:
[PASTE AI MODEL COMPARISON CONTEXT HERE]`,
    bestFor: ['Model selection', 'Workflow design', 'Team AI stack decisions'],
    workflow: ['Paste the real workflow and candidate models', 'Compare based on task constraints, not hype', 'Choose a primary and fallback model'],
    tips: [
      'Include what matters most: speed, quality, structure, cost, or long-context reliability.',
      'If the model will be used by a team, mention consistency and onboarding needs.',
      'Ask for a recommended routing strategy if different tasks need different models.',
    ],
  },
  'realistic-founder-headshot-prompt': {
    summary: 'A premium portrait prompt for founder and creator headshots that prioritizes realism, posture, lighting, and editorial restraint.',
    description:
      'Stronger than a generic portrait prompt because it gives the model art direction, realism constraints, and anti-plastic safeguards.',
    prompt: `Act as a portrait art director for a premium founder headshot.

I will give you the subject description and optional brand cues.
Generate a prompt that produces a high-end founder portrait that still feels believable.

The final prompt must control:
- lens feel and camera distance
- facial realism and skin texture
- wardrobe tone
- posture and expression
- background simplicity
- lighting direction
- editorial polish without fashion-magazine excess

Rules for the generated image prompt:
- preserve natural skin texture
- avoid plastic retouching
- avoid exaggerated jawline or symmetry changes
- avoid over-styled luxury clichés unless explicitly requested
- make the subject look credible, confident, and current
- favor premium tech, founder, or operator energy over influencer energy

Return:
1. Main generation prompt
2. Negative prompt or avoid list
3. Optional variations for studio, office, or lifestyle setting

Subject context:
[PASTE SUBJECT DETAILS HERE]`,
    bestFor: ['Founder headshots', 'Team profile upgrades', 'Brand photo concepts'],
    workflow: ['Describe the subject and brand vibe', 'Choose studio or environmental direction', 'Generate variants and keep the most believable one'],
    tips: [
      'Mention whether you want founder, executive, creator, or consultant energy.',
      'Add clothing constraints if the image should match a real brand palette.',
      'Use the negative prompt to avoid hyper-retouched skin and fake luxury styling.',
    ],
  },
  'background-replacement-edit-prompt': {
    summary: 'A more advanced edit prompt for replacing backgrounds while keeping edges, lighting, and subject realism intact.',
    description:
      'Better than a simple background swap because it tells the model how to preserve hair detail, natural edge softness, and scene lighting logic.',
    prompt: `Act as a senior photo retoucher.

I will give you an existing subject image and the desired new background direction.
Your job is to write an edit prompt that replaces the background while keeping the subject believable.

The edit prompt must control:
- edge quality around hair, fabric, and fingers
- lighting consistency between subject and new scene
- shadow direction and density
- color temperature matching
- natural depth separation
- avoidance of sticker-like cutout edges

Return:
1. Main edit prompt
2. Cleanup notes for edge handling and lighting blend
3. Negative prompt or avoid list
4. A simpler fallback version for weaker editors

Rules:
- Preserve the subject identity and pose.
- Do not over-smooth skin.
- Do not create fake halo edges.
- Match background perspective to the subject crop.
- Keep the final look clean and realistic.

Edit context:
[PASTE IMAGE EDIT GOAL HERE]`,
    bestFor: ['Profile images', 'Productive background cleanup', 'Professional image upgrades'],
    workflow: ['Define the new background and mood', 'Generate the edit prompt with lighting notes', 'Check edges and realism before final export'],
    tips: [
      'Say whether the new background should feel studio-clean, natural, or office-like.',
      'Mention the original light direction if you know it.',
      'If hair detail matters, say that explicitly in the input.',
    ],
  },
  'remove-busy-background-keep-subject-natural-prompt': {
    summary: 'A cleaner edit prompt for simplifying busy scenes without flattening the subject or making the image look synthetic.',
    description:
      'Useful when the goal is not a full replacement, but a calmer scene that still feels like the same photo.',
    prompt: `Act as a photo cleanup retoucher.

I want to reduce background clutter while keeping the subject, perspective, and realism intact.
Write an edit prompt that removes distractions without making the image feel fake.

The edit prompt must control:
- which objects to remove or soften
- what should stay untouched
- preservation of subject edges and natural lighting
- realistic background reconstruction
- depth and texture continuity

Return:
1. Main edit prompt
2. Priority cleanup list
3. Negative prompt or avoid list
4. A subtle version and a stronger cleanup version

Rules:
- Preserve subject identity, pose, and expression.
- Do not over-blur the background unless requested.
- Do not make the result look like a cutout collage.
- Keep textures believable.
- Prefer a premium minimal finish over obvious heavy editing.

Photo cleanup goal:
[PASTE CLEANUP CONTEXT HERE]`,
    bestFor: ['Lifestyle photos', 'Creator profile photos', 'Marketing image cleanup'],
    workflow: ['List the distracting objects or zones', 'Generate subtle and stronger cleanup versions', 'Keep the least edited result that still solves the problem'],
    tips: [
      'Mention whether the goal is minimal cleanup or a more commercial look.',
      'If one background area matters, tell the model to preserve that zone.',
      'Use the subtle version first when realism matters most.',
    ],
  },
  'consent-face-swap-retouch-prompt': {
    summary: 'A safer, more advanced face-swap edit prompt focused on consent, identity preservation, believable blending, and respectful realism.',
    description:
      'This version makes the operation stricter and safer by emphasizing consent, likeness preservation, clean edges, and non-deceptive output quality.',
    prompt: `Act as a photo compositing specialist working on a fully consent-based face swap.

I will provide the edit goal for a face swap where all parties have consented.
Write an edit prompt that prioritizes realism, respectful handling, and identity safety.

The edit prompt must control:
- facial alignment and head angle matching
- skin tone continuity
- lighting and shadow blend
- edge cleanup around hairline and jawline
- expression consistency
- preservation of the destination image posture and context

Return:
1. Main face-swap edit prompt
2. Blend and cleanup instructions
3. Negative prompt or avoid list
4. Quality-check list for artifacts or identity distortion

Rules:
- This is only for consent-based edits.
- Preserve the original scene context.
- Do not produce uncanny skin smoothing or broken facial proportions.
- Do not change age, ethnicity, or body cues unless explicitly requested and appropriate.
- Keep the final result believable and respectful.

Consent-based edit goal:
[PASTE CONSENT-BASED FACE SWAP CONTEXT HERE]`,
    bestFor: ['Consent-based composites', 'Creative photo edits', 'Private mockups with identity safety'],
    workflow: ['Describe the source and destination image relationship', 'Generate the blend-safe edit prompt', 'Check for face geometry, skin, and lighting artifacts before final use'],
    tips: [
      'Mention whether the destination shot is studio-lit or candid so the blend logic stays realistic.',
      'Ask for a stricter artifact checklist if the result will be viewed close-up.',
      'Keep the final edit private and clearly labeled if it is a mockup or concept.',
    ],
  },
  'executive-email-rewrite': {
    summary: 'A more strategic email rewrite prompt that sharpens the ask, removes emotional noise, and matches the recipient context before sending.',
    description:
      'Built for important emails where tone, positioning, and clarity matter more than just sounding polished.',
    prompt: `Act as a senior communications editor for high-stakes professional email.

I will give you:
- the rough email draft
- who the recipient is
- the relationship context
- the desired outcome

Your job is to rewrite the email so it becomes easier to read, easier to answer, and harder to misinterpret.

Return the answer in this exact structure:
1. Communication goal
2. Subject line options
   - one neutral
   - one direct
   - one warmer
3. Final email
4. Short version for a busy recipient
5. Tone notes
   - what changed
   - what was removed
   - what still feels risky

Rules:
- Keep the meaning intact unless the draft is strategically weak.
- Make the ask obvious.
- Remove passive-aggressive wording, repetition, and throat-clearing.
- If the draft is too emotional, calm it without making it cold.
- If the relationship is sensitive, protect rapport while keeping clarity.
- Do not turn it into robotic corporate language.

Draft and context:
[PASTE EMAIL DRAFT AND CONTEXT HERE]`,
    bestFor: ['Client escalations', 'Executive follow-ups', 'Sensitive internal emails'],
    workflow: ['Paste the draft with recipient context', 'Pick the best subject line and full version', 'Send the short version only if the recipient is highly time-constrained'],
    tips: [
      'Tell the model whether you need the email to preserve warmth, authority, or urgency.',
      'If the email involves conflict, include what must not be damaged in the relationship.',
      'Ask for a firmer rewrite only after you see the balanced version first.',
    ],
  },
  'article-outline-from-source-notes': {
    summary: 'A stronger article-planning prompt that turns messy notes into a real argument, cleaner structure, and a more useful reader journey.',
    description:
      'Better than a normal outline prompt because it forces thesis clarity, section jobs, evidence gaps, and pacing before drafting begins.',
    prompt: `Act as a senior editor shaping a long-form article.

I will paste raw source notes, links, ideas, quotes, and half-formed arguments.
Your job is to convert them into a high-signal article plan.

Return the answer in this exact structure:
1. Core thesis
2. Reader promise
3. Best working titles
4. Recommended outline
   - H2s
   - H3s where needed
   - the job of each section
5. What should open the article and why
6. Evidence gaps or weak sections
7. What should be cut because it dilutes the angle
8. Writing risks
   - too broad
   - too repetitive
   - too abstract

Rules:
- Do not simply rearrange the notes.
- Strengthen the argument.
- Remove low-signal points that do not serve the thesis.
- If the idea is still too vague, name the missing decision clearly.
- Optimize for a useful article, not a bloated one.

Source notes:
[PASTE SOURCE NOTES HERE]`,
    bestFor: ['Thought-leadership articles', 'Deep-dive posts', 'Founder essays'],
    workflow: ['Paste all notes before you self-edit them', 'Choose the strongest thesis and section order', 'Draft one section at a time using the section jobs as guardrails'],
    tips: [
      'Add the target reader if you want the outline to lean more practical or more strategic.',
      'If SEO matters, include the main keyword and the outcome the article should own.',
      'Ask for a contrarian angle pass if the first outline feels too familiar.',
    ],
  },
  'api-docs-from-code': {
    summary: 'A production-grade API documentation prompt that separates confirmed behavior from inference and turns code into usable integration docs.',
    description:
      'Designed for real teams who need documentation another developer can trust, not just a nicer summary of the handler code.',
    prompt: `Act as a staff-level API documentation engineer.

I will give you endpoint code, schemas, request examples, or route handlers.
Your job is to produce documentation that helps another engineer integrate quickly and safely.

Return the answer in this exact structure:
1. Endpoint purpose
2. Method and path
3. Authentication and permissions
4. Request contract
   - params
   - body
   - headers
5. Response contract
6. Error cases and likely causes
7. Integration notes
8. Assumptions or unclear behavior
9. Example request and response

Rules:
- Separate confirmed behavior from reasonable inference.
- If the code is ambiguous, say exactly what is unclear.
- Mention validation, auth, pagination, idempotency, and rate-limit concerns when relevant.
- Do not hide breaking assumptions.
- Write for someone who did not author the code.

Code and route context:
[PASTE ENDPOINT CODE HERE]`,
    bestFor: ['Internal API docs', 'Partner integrations', 'Backend handoffs'],
    workflow: ['Paste the route and schema context together', 'Review the assumptions section carefully', 'Use the final doc as the source of truth only after unclear behavior is confirmed'],
    tips: [
      'Include sample error responses if integration reliability matters.',
      'If the route is public, ask for consumer-facing wording with fewer internal implementation notes.',
      'Ask for OpenAPI-shaped output after the human-readable version if you need both.',
    ],
  },
  'interview-story-builder': {
    summary: 'A more advanced interview-story prompt that turns rough experience into credible, speakable stories with stronger judgment and impact framing.',
    description:
      'Better for real interviews because it avoids fake hero framing and makes follow-up risk visible before you practice aloud.',
    prompt: `Act as a senior interview coach focused on behavioral and leadership interviews.

I will give you rough notes from a real experience.
Your job is to convert them into a story that sounds credible, clear, and strong when spoken aloud.

Return the answer in this exact structure:
1. Best interview angle for this story
2. Full STAR answer
3. Short version for a fast answer
4. Strongest impact line
5. Follow-up risks
   - where the interviewer may push
   - what sounds weak or vague
6. Better phrasing for awkward parts
7. What not to overclaim

Rules:
- Keep the story honest.
- Do not inflate ownership or outcomes.
- Optimize for spoken clarity, not resume language.
- Preserve nuance if the result was mixed.
- If the story is weak for interviews, say so and explain why.

Experience notes:
[PASTE STORY NOTES HERE]`,
    bestFor: ['Behavioral interviews', 'Leadership rounds', 'Manager interviews'],
    workflow: ['Paste one real experience at a time', 'Practice the short version aloud first', 'Refine only the parts that sound vague or overlong when spoken'],
    tips: [
      'Mention the role level you are interviewing for so the framing matches the bar.',
      'Ask for likely follow-up questions once the story is solid.',
      'Use one story per competency instead of forcing one story to do every job.',
    ],
  },
  'plain-english-explainer': {
    summary: 'A deeper explainer prompt that teaches from first principles, checks confusion points, and builds understanding in layers instead of dumping jargon.',
    description:
      'Stronger than a normal explainer because it treats the learner as confused but capable, and designs the explanation around clarity and retention.',
    prompt: `Act as a world-class teacher for smart beginners.

I will give you a concept that feels confusing.
Your job is to explain it so that someone new can actually understand it and remember it.

Return the answer in this exact structure:
1. One-line plain-English version
2. Simple analogy
3. What problem this concept solves
4. Beginner explanation
5. More technical explanation
6. Common misconceptions
7. Quick memory hooks
8. Three check-your-understanding questions with answers

Rules:
- Start simple before getting technical.
- Avoid jargon until the later sections.
- If jargon is necessary, define it immediately.
- Explain why the concept matters, not just what it is.
- If the topic is controversial or nuanced, say where simplification breaks down.

Concept:
[PASTE TOPIC HERE]`,
    bestFor: ['Technical learning', 'Career pivots', 'Student revision'],
    workflow: ['Read the one-line version and analogy first', 'Only then move into the deeper explanation', 'Use the memory hooks and questions to check whether the concept actually stuck'],
    tips: [
      'Ask for examples from your field if you want the concept grounded in a domain you know.',
      'If the first explanation still feels abstract, ask for three real-world scenarios.',
      'Use the misconception section to spot where your current understanding is shaky.',
    ],
  },
  'research-brief-from-source-links': {
    summary: 'A stronger synthesis prompt that turns scattered research into a decision-grade brief with evidence, tensions, and next questions.',
    description:
      'Useful when you have enough raw material but still lack a crisp point of view or actionable research output.',
    prompt: `Act as a senior research analyst.

I will give you notes, pasted excerpts, source summaries, or transcript fragments.
Your job is to produce a brief that is useful for thinking and decision-making, not just summarization.

Return the answer in this exact structure:
1. Core research question
2. Executive summary
3. Main findings
4. Evidence by theme
5. Contradictions or tensions
6. Gaps and unknowns
7. What deserves follow-up next
8. Final recommendation or reading of the landscape

Rules:
- Group by insight, not chronology.
- Preserve nuance where sources disagree.
- Flag weak evidence instead of smoothing it over.
- If the material is too thin for confidence, say so.
- Keep the final brief useful for an operator, writer, or strategist.

Research material:
[PASTE MATERIAL HERE]`,
    bestFor: ['Market research', 'Trend analysis', 'Strategy briefs'],
    workflow: ['Paste all usable notes and excerpts together', 'Review the evidence and contradiction sections closely', 'Use the follow-up questions to drive the next research pass'],
    tips: [
      'Label which sources you trust most if the material quality varies.',
      'Ask for a stakeholder-ready brief only after the analyst version feels solid.',
      'If you need traceability, ask for source-backed bullets under each theme.',
    ],
  },
  'competitor-positioning-compare': {
    summary: 'A more advanced positioning prompt that compares competitors by promise, audience, proof, and whitespace rather than shallow feature grids.',
    description:
      'Built for founders and marketers who need sharper positioning insight, not just a prettier comparison table.',
    prompt: `Act as a senior positioning strategist.

I will give you competitor copy, screenshots, notes, or homepage language.
Your job is to compare how each company is framing itself and where the market language is becoming crowded.

Return the answer in this exact structure:
1. Market snapshot
2. Competitor-by-competitor positioning read
   - target audience
   - core promise
   - emotional angle
   - proof style
   - likely tradeoff
3. Messaging overlaps that weaken differentiation
4. White-space opportunities
5. Risks in copying what the market is already saying
6. Recommended positioning direction for a sharper narrative

Rules:
- Do not reduce everything to features.
- Judge what the language implies about who the product is for.
- If the evidence is weak, mark confidence accordingly.
- Call out when two competitors sound interchangeable.
- Make the output useful for messaging decisions, not just analysis theater.

Competitor material:
[PASTE COMPETITOR NOTES HERE]`,
    bestFor: ['Positioning audits', 'Homepage strategy', 'Category messaging work'],
    workflow: ['Paste at least three competitors if possible', 'Review the overlaps and whitespace before rewriting your own story', 'Use the recommended direction as a draft, not as a final slogan'],
    tips: [
      'Include pricing-page language too if the offer positioning matters.',
      'If you are comparing yourself against the field, include your current copy in the same input.',
      'Ask for a side-by-side narrative map if the first output feels too abstract.',
    ],
  },
  'mvp-spec-from-product-idea': {
    summary: 'A sharper MVP planning prompt that cuts fantasy scope, surfaces assumptions, and turns a vague idea into a testable first version.',
    description:
      'Stronger than a normal ideation prompt because it forces user problem clarity, workflow discipline, and explicit cuts.',
    prompt: `Act as a product strategist for an early-stage MVP.

I will give you a product idea, target user, and rough context.
Your job is to turn it into a smaller, more testable first version.

Return the answer in this exact structure:
1. User problem in plain language
2. Primary user and why they would care
3. Core job to be done
4. Main user workflow
5. Must-have MVP scope
6. Nice-to-have features to cut for now
7. Key assumptions that still need validation
8. Fastest path to testing the idea
9. Biggest scope and execution risks

Rules:
- Keep the MVP small enough to ship.
- Do not include fantasy roadmap features.
- If the value proposition is fuzzy, say exactly where it breaks.
- Make tradeoffs explicit.
- If the idea is not yet sharp enough for an MVP, say what decision must come first.

Product idea:
[PASTE IDEA HERE]`,
    bestFor: ['Founder scoping', 'Idea validation', 'No-code or first-build planning'],
    workflow: ['Paste the idea with the user and context', 'Stress-test the must-have scope against the validation goal', 'Use the assumptions section as the real worklist before building too much'],
    tips: [
      'Mention your build constraints so the scope is realistic.',
      'Ask for a no-code version if speed-to-test matters more than technical elegance.',
      'If you already have users, include what they currently do instead of this product.',
    ],
  },
  'youtube-script-retention-beats': {
    summary: 'A more advanced YouTube scripting prompt that builds around tension, pacing, visual resets, and retention instead of generic content structure.',
    description:
      'Useful for creators who want scripts that feel more watchable, more strategic, and less like information read out loud.',
    prompt: `Act as a YouTube script strategist focused on retention.

I will give you a video topic, audience, and optional notes.
Your job is to turn it into a script plan that earns attention all the way through.

Return the answer in this exact structure:
1. Core promise of the video
2. Best hook options
3. Recommended script structure
4. Retention beats
   - tension or curiosity reset
   - visual shift
   - proof or example moment
5. Places where the script may sag
6. Closing CTA that fits the video
7. Full draft in a speakable style

Rules:
- Do not write like a school essay.
- Keep sentences easy to say aloud.
- Use open loops and resets only when they fit the topic.
- If the topic is educational, preserve clarity without losing energy.
- Show where visuals or examples should carry the weight instead of narration.

Topic and audience:
[PASTE VIDEO IDEA HERE]`,
    bestFor: ['YouTube explainers', 'Creator essays', 'Educational video scripts'],
    workflow: ['Paste the topic and viewer angle', 'Pick the strongest hook and retention structure first', 'Only then expand into the full draft'],
    tips: [
      'Mention target video length so the pacing feels realistic.',
      'If you already know the visual format, say talking-head, voiceover, tutorial, or mixed.',
      'Ask for a Shorts adaptation after the long-form structure is locked.',
    ],
  },
  'landing-page-copy-from-product-brief': {
    summary: 'A premium landing-page prompt that turns messy product notes into clearer positioning, sharper sections, and more believable conversion copy.',
    description:
      'Built for teams that need better sales clarity without hype-heavy SaaS language or generic feature dumping.',
    prompt: `Act as a senior landing-page strategist and conversion copy editor.

I will give you a rough product brief.
Your job is to turn it into a premium landing page structure and first-pass copy.

Return the answer in this exact structure:
1. Best positioning angle
2. Headline options
3. Subheadline
4. Hero CTA line
5. 3 benefit sections
6. Proof section
7. Objections section
8. Why switch now section
9. Closing CTA
10. Where the current product story is still weak

Rules:
- Do not sound fake, breathless, or over-optimized.
- Make the audience and the pain explicit.
- Use features only when they support outcomes.
- If the positioning is weak, say that clearly.
- Optimize for clarity, trust, and conversion.

Product brief:
[PASTE PRODUCT BRIEF HERE]`,
    bestFor: ['Homepage rewrites', 'SaaS launches', 'Service landing pages'],
    workflow: ['Paste the full brief including user and pain points', 'Choose the positioning angle before editing sections', 'Refine the proof and objections using real customer language if available'],
    tips: [
      'Paste competitor pages if you want stronger differentiation pressure.',
      'Ask for a more premium or more practical tone only after the first strategy pass.',
      'If social proof is weak, ask for proof placeholders that are honest and easy to fill later.',
    ],
  },
  'brand-voice-rewrite-from-sample': {
    summary: 'A stronger brand-voice prompt that extracts real voice traits first and then rewrites content to match them without parodying the brand.',
    description:
      'Useful when the brand already sounds distinct, but new copy keeps drifting into generic AI or generic startup language.',
    prompt: `Act as a brand voice strategist and editorial rewriter.

I will give you:
- sample writing that represents the real brand voice
- a new draft that needs rewriting

Your job is to identify the true voice system first, then rewrite the draft to match it.

Return the answer in this exact structure:
1. Voice diagnosis
   - tone
   - rhythm
   - vocabulary
   - sentence style
   - what the brand avoids
2. Rewritten draft
3. Why the rewrite sounds closer to the brand
4. Lines that still feel off-brand
5. A short voice guide for future writing

Rules:
- Do not imitate the brand in a cheesy or exaggerated way.
- Keep the meaning intact unless the source draft is strategically weak.
- Prefer believable voice consistency over flashy wording.
- If the sample voice is inconsistent, say so.
- If the draft should stay simpler than the brand sample, explain that tradeoff.

Brand samples:
[PASTE BRAND VOICE SAMPLES HERE]

Draft to rewrite:
[PASTE NEW DRAFT HERE]`,
    bestFor: ['Founder brands', 'B2B content teams', 'Editorial voice consistency'],
    workflow: ['Paste the strongest existing brand samples', 'Review the voice diagnosis before accepting the rewrite', 'Reuse the short voice guide for future prompts and reviews'],
    tips: [
      'Give samples from one channel first if the brand voice changes a lot by format.',
      'If there are banned phrases or overused words, include them explicitly.',
      'Ask for two rewrite options if the brand can flex between warmer and sharper tones.',
    ],
  },
  'customer-feedback-to-roadmap': {
    summary: 'A more advanced product-triage prompt that converts scattered feedback into themes, priorities, and roadmap decisions with clearer tradeoffs.',
    description:
      'Better for product teams because it separates volume from value and forces reasoning about impact, urgency, and fit.',
    prompt: `Act as a product triage lead.

I will give you customer feedback, support notes, or request clusters.
Your job is to turn that messy feedback into sharper product decisions.

Return the answer in this exact structure:
1. Main feedback themes
2. What users are really asking for underneath the surface
3. Priority ranking
   - urgent fix
   - important improvement
   - monitor
   - likely not now
4. Product tradeoffs
5. Recommended roadmap actions
6. Risks if we misread the feedback
7. What extra evidence would improve confidence

Rules:
- Do not prioritize by raw loudness alone.
- Separate bug pain from feature desire.
- Call out when multiple requests are symptoms of the same underlying friction.
- If the feedback is too thin or too skewed, say so.
- Optimize for better product judgment, not for saying yes to everything.

Feedback:
[PASTE CUSTOMER FEEDBACK HERE]`,
    bestFor: ['Roadmap triage', 'Support-driven product decisions', 'Founder feedback reviews'],
    workflow: ['Paste feedback in one batch if possible', 'Review the underlying-friction section before acting on feature requests', 'Use the confidence gaps to decide what to validate next'],
    tips: [
      'Label feedback by segment or customer type if you have it.',
      'Include rough revenue or strategic context if certain users matter more.',
      'Ask for a release-note-friendly summary after the roadmap direction is chosen.',
    ],
  },
  'refactor-large-component-plan': {
    summary: 'A safer refactor-planning prompt that breaks bloated React components into responsibilities, extraction boundaries, and low-risk execution order.',
    description:
      'Designed for real cleanup work where the biggest risk is breaking behavior while trying to improve architecture.',
    prompt: `Act as a senior frontend architect planning a safe refactor.

I will paste a large React component or related file.
Your job is to produce a refactor plan that improves structure without breaking behavior.

Return the answer in this exact structure:
1. What responsibilities are mixed together
2. Natural extraction boundaries
3. Risk map
   - safe now
   - medium risk
   - dangerous until later
4. Recommended order of work
5. What to test after each step
6. Where state or prop flow is fragile
7. When not to refactor yet

Rules:
- Do not rewrite the entire file as the first move.
- Prefer incremental steps that preserve behavior.
- Call out if the component is ugly but stable enough to defer.
- Mention server/client boundary concerns when relevant.
- If the real issue is data shape or architecture, say so directly.

Component:
[PASTE COMPONENT HERE]`,
    bestFor: ['Large component cleanup', 'Safer architecture work', 'Incremental refactors'],
    workflow: ['Paste the component and the pain points', 'Sequence only the first safe extraction first', 'Run checks after each step instead of attempting one giant rewrite'],
    tips: [
      'Say whether the component is business-critical so risk tolerance stays realistic.',
      'If tests are weak, ask for a test-first layer before extraction.',
      'Ask for a follow-up plan after the first refactor step lands cleanly.',
    ],
  },
  'write-unit-tests-from-function': {
    summary: 'A stronger testing prompt that designs unit tests around actual behavior, regression risk, and edge-case coverage instead of filler assertions.',
    description:
      'Better for engineering teams because it prioritizes what can actually break and keeps the test file focused.',
    prompt: `Act as a pragmatic software test engineer.

I will give you a function or module.
Your job is to design high-value unit tests that protect real behavior.

Return the answer in this exact structure:
1. What the code is responsible for
2. Highest-risk behaviors
3. Must-have happy-path tests
4. Edge cases
5. Failure and invalid-input cases
6. What should probably not be unit-tested directly
7. Example test file

Rules:
- Avoid filler tests.
- Prioritize regression protection and behavioral confidence.
- If the code mixes too many responsibilities, say so.
- Keep mocks minimal unless the dependency boundary truly requires them.
- If integration tests would be more valuable, mention that.

Code:
[PASTE FUNCTION HERE]`,
    bestFor: ['Business logic testing', 'Regression coverage', 'Utility and module tests'],
    workflow: ['Paste the code and the expected behavior', 'Start with the must-have tests before edge cases', 'Only expand the suite after the risky behaviors are protected'],
    tips: [
      'Mention the framework you want if you need runnable test output.',
      'Include one real past bug if you want the suite to guard against it explicitly.',
      'Ask for a minimal test set first if you do not want a full file yet.',
    ],
  },
  'api-contract-review': {
    summary: 'A more advanced API review prompt that audits ambiguity, versioning risk, DX friction, and contract clarity before teams build on shaky assumptions.',
    description:
      'Useful when an API shape looks almost ready, but you want to catch confusing semantics and future breakage early.',
    prompt: `Act as a senior API design reviewer.

I will give you an API contract, schema, or endpoint list.
Your job is to review it from the perspective of a developer who has to integrate with it and maintain it later.

Return the answer in this exact structure:
1. Contract intent
2. Strong design choices
3. Ambiguous fields or behaviors
4. Naming and consistency problems
5. Developer-experience pain points
6. Versioning or breaking-change risks
7. Cleaner revised direction

Rules:
- Be concrete, not theoretical.
- Look for places where frontend and backend teams may interpret behavior differently.
- Mention missing examples, pagination rules, idempotency, or error semantics when relevant.
- If the contract is good enough, say why instead of inventing issues.
- Optimize for integration safety and future maintainability.

API contract:
[PASTE API CONTRACT HERE]`,
    bestFor: ['Internal API reviews', 'Public API planning', 'Schema cleanup before release'],
    workflow: ['Paste the contract and one real use case', 'Review ambiguity before implementation spreads', 'Revise names and semantics before generating docs or SDKs'],
    tips: [
      'Include one real client flow so the review stays grounded.',
      'If the API is already live, say what cannot change.',
      'Ask for example requests and responses after the design review if you need docs next.',
    ],
  },
  'cover-letter-from-role-and-resume': {
    summary: 'A sharper cover-letter prompt that connects real experience to the role without begging, exaggerating, or sounding machine-written.',
    description:
      'Built for serious applications where fit, tone, and honest relevance matter more than generic enthusiasm.',
    prompt: `Act as a senior hiring-side editor for cover letters.

I will give you my relevant experience and the target job description.
Your job is to write a cover letter that feels thoughtful, credible, and specific to the role.

Return the answer in this exact structure:
1. Why my background is plausibly relevant
2. Opening paragraph
3. Middle paragraph connecting experience to the role
4. Closing paragraph
5. Shorter alternative version
6. What still feels weak or unsupported

Rules:
- Do not overpraise the company.
- Do not invent fit where it does not exist.
- Keep the tone confident, not needy.
- Use evidence from the real background instead of buzzwords.
- If this should really be a short note rather than a full cover letter, say so.

Resume and role:
[PASTE RESUME AND JOB DESCRIPTION HERE]`,
    bestFor: ['Selective job applications', 'Career pivots', 'Roles needing stronger narrative fit'],
    workflow: ['Paste your relevant experience and the target role', 'Review the fit logic before using the final letter', 'Use the shorter version when the application flow makes long letters feel forced'],
    tips: [
      'Highlight one or two concrete achievements instead of summarizing your whole resume again.',
      'If you are pivoting fields, say what transferability should be emphasized.',
      'Ask for a warmer or more concise version based on company culture.',
    ],
  },
  'research-paper-simplifier': {
    summary: 'A more useful paper-simplifying prompt that preserves the actual claim, method, and limits instead of flattening research into vague takeaways.',
    description:
      'Helpful for students and curious readers who want papers explained clearly without losing the important caveats.',
    prompt: `Act as a research explainer for intelligent non-specialists.

I will paste a paper abstract, notes, or key sections.
Your job is to explain what the paper says, why it matters, and where it should not be overclaimed.

Return the answer in this exact structure:
1. One-sentence plain-English summary
2. What question the paper is trying to answer
3. How the researchers approached it
4. Main finding
5. What this does not prove
6. Why the result matters
7. What a beginner should read next

Rules:
- Do not oversell the paper.
- Keep the explanation understandable without erasing uncertainty.
- If the method is weak or the evidence looks narrow, say so.
- Separate the paper's finding from your interpretation of why it matters.

Paper content:
[PASTE PAPER CONTENT HERE]`,
    bestFor: ['Paper reading', 'Student study support', 'Research onboarding'],
    workflow: ['Paste the abstract or notes first', 'Review the what-this-does-not-prove section carefully', 'Use the final reading-next guidance to deepen understanding if needed'],
    tips: [
      'Ask for a field-specific analogy if the paper still feels abstract.',
      'If you want exam prep, ask for a flashcard version after the main explanation.',
      'Paste only the most relevant sections if the full paper is too long.',
    ],
  },
  'decision-matrix-for-tool-choice': {
    summary: 'A more advanced decision prompt that compares tools by actual use-case fit, tradeoffs, and failure modes rather than marketing checklists.',
    description:
      'Useful when several tools seem viable and you need a grounded recommendation based on workflow, budget, and team reality.',
    prompt: `Act as a practical tool-selection advisor.

I will give you a workflow, constraints, and a shortlist of tools.
Your job is to help me choose with clearer criteria and fewer assumptions.

Return the answer in this exact structure:
1. Decision context
2. What actually matters for this choice
3. Comparison matrix
   - ease of adoption
   - depth
   - collaboration fit
   - cost sensitivity
   - lock-in risk
   - failure modes
4. Best choice
5. Best lower-risk alternative
6. When the decision should be delayed
7. Final recommendation in plain language

Rules:
- Judge the tools against the stated workflow, not generic reputation.
- Mention tradeoffs clearly.
- If the shortlist is weak, say what kind of tool is missing.
- If two tools solve different layers of the problem, say that instead of forcing a winner.

Workflow and tool options:
[PASTE TOOL CHOICE CONTEXT HERE]`,
    bestFor: ['Software selection', 'Team stack decisions', 'Budget-conscious tool reviews'],
    workflow: ['Paste the real workflow and the shortlist', 'Check whether the comparison criteria match your decision', 'Pick a primary tool and one fallback only after reviewing lock-in and failure modes'],
    tips: [
      'Include team size and budget if the decision will affect multiple people.',
      'If migration pain matters, ask for a switching-cost section too.',
      'Ask for a quick trial plan if the top two options still feel close.',
    ],
  },
  'product-hero-image-prompt': {
    summary: 'A more art-directed product-hero prompt that adds surface realism, composition discipline, and commercial hierarchy to generated product shots.',
    description:
      'Stronger than a generic hero prompt because it controls staging, material behavior, negative space, and ad-readiness in one pass.',
    prompt: `Act as a commercial art director for a premium product launch visual.

I will give you the product, brand feel, and intended use.
Write a product-image prompt that creates an ad-ready hero shot.

The prompt must control:
- hero composition and camera angle
- lighting logic and highlight placement
- material realism and texture behavior
- background styling and brand palette
- negative space for copy if needed
- prop restraint so the product stays dominant

Return:
1. Main image-generation prompt
2. Art-direction notes
3. Negative prompt or avoid list
4. Two variations
   - cleaner ecommerce version
   - richer campaign version

Rules:
- Keep the product as the obvious focal point.
- Avoid clutter, weak shadows, fake packaging text, and chaotic reflections.
- Make the final direction feel premium, not over-styled.
- Match the scene to how the product would realistically be photographed.

Product and brand context:
[PASTE PRODUCT HERO CONTEXT HERE]`,
    bestFor: ['Launch hero visuals', 'Premium product campaigns', 'Landing-page hero art'],
    workflow: ['Define the product, brand mood, and placement needs', 'Generate the clean and campaign versions', 'Choose the version that best matches where the image will actually be used'],
    tips: [
      'Mention whether the image needs copy space before generating variants.',
      'If the product surface is reflective, say that explicitly so lighting stays believable.',
      'Use the ecommerce version first if accuracy matters more than drama.',
    ],
  },
  'thumbnail-polish-edit-prompt': {
    summary: 'A more advanced thumbnail-edit prompt that sharpens hierarchy, face emphasis, and readability without turning the result into noisy clickbait.',
    description:
      'Useful for creators who want stronger CTR visuals while still looking premium and intentional.',
    prompt: `Act as a thumbnail retouch and composition specialist.

I will give you the source image and the thumbnail goal.
Write an edit prompt that improves click clarity without making the image look cheap or overprocessed.

The edit prompt must control:
- focal emphasis on face or hero subject
- contrast and separation from the background
- cleanup of distracting objects
- skin and detail treatment without plastic smoothing
- room for short text if needed
- emotional readability at small size

Return:
1. Main edit prompt
2. Priority edit moves
3. Negative prompt or avoid list
4. A restrained version and a higher-energy version

Rules:
- Keep one clear focal point.
- Avoid clutter, over-sharpening, fake glow, and noisy backgrounds.
- Preserve identity and core realism.
- Optimize for thumbnail readability, not just full-size beauty.

Thumbnail edit goal:
[PASTE THUMBNAIL CONTEXT HERE]`,
    bestFor: ['YouTube thumbnails', 'Creator promos', 'Course or video cover images'],
    workflow: ['Describe the video angle and desired viewer reaction', 'Generate restrained and higher-energy variants', 'Test the smallest version first to check readability'],
    tips: [
      'Mention whether text will be added later so negative space is preserved.',
      'If the thumbnail must feel more premium than dramatic, say that before editing.',
      'Use the restrained version first unless the channel style is intentionally loud.',
    ],
  },
  'old-photo-restore-edit-prompt': {
    summary: 'A more careful restoration prompt that improves damaged photos while protecting original identity, texture, and historical feel.',
    description:
      'Better than a normal restore prompt because it balances cleanup with respect for the source image and avoids over-modernizing faces.',
    prompt: `Act as a photo restoration specialist.

I will give you an old or damaged photo and the restoration goal.
Write an edit prompt that restores the image while respecting the original photograph.

The edit prompt must control:
- scratch, tear, and dust cleanup
- tonal recovery and contrast balance
- face and skin restoration without plastic smoothing
- preservation of age-appropriate texture
- detail recovery without hallucinating fake modern sharpness

Return:
1. Main restoration prompt
2. Cleanup priorities
3. Negative prompt or avoid list
4. A conservative version and a fuller restoration version

Rules:
- Preserve identity and facial proportions.
- Do not over-colorize unless requested.
- Do not make old faces look digitally airbrushed.
- Respect the original mood and era of the image.

Restoration goal:
[PASTE PHOTO RESTORATION CONTEXT HERE]`,
    bestFor: ['Family photo restoration', 'Archive cleanup', 'Historical image repair'],
    workflow: ['Describe the condition of the photo first', 'Start with the conservative restoration pass', 'Only increase cleanup if the image still feels too damaged'],
    tips: [
      'Mention if the photo should stay black and white.',
      'If one face matters most, say that so identity preservation is prioritized there.',
      'Avoid aggressive restoration if the original charm of the image is important.',
    ],
  },
  'portrait-relight-edit-prompt': {
    summary: 'A more advanced portrait-relighting prompt that improves facial sculpting, mood, and realism without breaking skin tone or source geometry.',
    description:
      'Useful when a portrait needs more polish or atmosphere but still has to look like the same believable photo.',
    prompt: `Act as a portrait retouch and lighting specialist.

I will give you a portrait and the desired lighting mood.
Write an edit prompt that relights the image while keeping the person believable.

The edit prompt must control:
- main light direction
- highlight and shadow balance
- skin-tone integrity
- eye and facial feature clarity
- background separation
- overall mood without overdramatizing

Return:
1. Main relighting prompt
2. Lighting notes
3. Negative prompt or avoid list
4. A subtle version and a more editorial version

Rules:
- Preserve identity and facial proportions.
- Do not over-smooth skin or bleach tones.
- Keep the shadow logic consistent with the new light direction.
- Make the final image flattering but still credible.

Portrait relighting goal:
[PASTE PORTRAIT RELIGHTING CONTEXT HERE]`,
    bestFor: ['Headshots', 'Personal-brand portraits', 'Editorial portrait cleanup'],
    workflow: ['Describe the current portrait and target mood', 'Generate subtle and editorial lighting versions', 'Pick the least aggressive version that still improves the portrait'],
    tips: [
      'Mention whether the portrait should feel corporate-clean, cinematic, or lifestyle-natural.',
      'If the background is important, tell the model whether to preserve or soften it.',
      'Use the subtle version first for profile photos and bios.',
    ],
  },
}
