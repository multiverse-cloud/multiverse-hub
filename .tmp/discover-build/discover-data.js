"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISCOVER_LISTS = exports.DISCOVER_SCALE_PLAN = exports.DISCOVER_CATEGORIES = void 0;
exports.getPublishedDiscoverLists = getPublishedDiscoverLists;
exports.getDiscoverListBySlugLocal = getDiscoverListBySlugLocal;
const discover_high_traffic_seeds_1 = require("./discover-high-traffic-seeds");
exports.DISCOVER_CATEGORIES = [
    'Movies',
    'Series',
    'Songs',
    'Actors',
    'Actresses',
    'Directors',
    'Watch Guides',
    'Weekend Picks',
    'War & Defense',
    'Sports',
    'Politics',
    'Geopolitics',
    'History',
    'Space',
    'Games',
    'Apps',
    'Software',
    'Tech',
    'Mobile Problems',
    'AI',
    'AI Models',
    'Designers',
    'Editing Apps',
    'YouTubers',
    'Creator Economy',
    'Money & Online Income',
    'Business',
    'Startups',
    'Productivity',
    'Career',
    'Education',
    'Self Improvement',
    'Lifestyle',
    'Health',
    'Finance & Investing',
    'Crypto',
    'Cybersecurity',
    'SEO & Marketing',
    'Streaming Platforms',
    'Smartphones',
    'Laptops',
    'Gadgets',
    'Cars & EVs',
    'Science',
    'Internet Culture',
];
exports.DISCOVER_SCALE_PLAN = {
    starterLists: 160,
    targetLists: 2200,
    targetEntities: 5000,
    targetGuides: 1600,
    targetSupportingFaqs: 9000,
};
const DISCOVER_UPDATED_AT = '2026-03-27';
function toDiscoverSlug(value) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
function lowerFirst(value) {
    return value.charAt(0).toLowerCase() + value.slice(1);
}
const DISCOVER_SCOPE_PATTERNS = [
    { pattern: /\btamil\b/i, label: 'Tamil' },
    { pattern: /\bhindi\b/i, label: 'Hindi' },
    { pattern: /\bkorean\b/i, label: 'Korean' },
    { pattern: /\benglish\b/i, label: 'English-language' },
    { pattern: /\bindian\b/i, label: 'Indian' },
    { pattern: /\bglobal\b/i, label: 'Global' },
];
function inferDiscoverScope(...parts) {
    const combined = parts
        .flatMap(part => (Array.isArray(part) ? part : part ? [part] : []))
        .join(' ');
    const labels = DISCOVER_SCOPE_PATTERNS.flatMap(({ pattern, label }) => (pattern.test(combined) ? [label] : []));
    const uniqueLabels = Array.from(new Set(labels));
    if (uniqueLabels.length === 0)
        return undefined;
    if (uniqueLabels.length === 1)
        return uniqueLabels[0];
    return uniqueLabels.join(' + ');
}
function buildScopeSentence(scope) {
    return scope ? ` Scope: ${scope}.` : '';
}
function getEditorialLens(category) {
    if (category === 'AI' || category === 'AI Models') {
        return {
            rankingPriority: 'workflow fit, output quality, and day-to-day usefulness',
            rankingComparisonCue: 'task fit, response quality, and friction before brand familiarity',
            summaryFocus: 'practical workflow fit instead of generic AI hype',
            guidePriority: 'task clarity, model fit, and workflow tradeoffs',
            guideMistake: 'choosing based only on hype, benchmark chatter, or one flashy demo prompt',
            successSignal: 'clearer task fit, lower friction, and more useful outputs in normal work',
        };
    }
    if (category === 'Apps' ||
        category === 'Software' ||
        category === 'Tech' ||
        category === 'Smartphones' ||
        category === 'Laptops' ||
        category === 'Mobile Problems' ||
        category === 'Editing Apps' ||
        category === 'Cybersecurity' ||
        category === 'Gadgets' ||
        category === 'Cars & EVs') {
        return {
            rankingPriority: 'reliability, friction, and how well each option holds up in real usage',
            rankingComparisonCue: 'setup friction, everyday usability, and tradeoffs instead of spec-sheet noise',
            summaryFocus: 'lower friction and stronger daily reliability',
            guidePriority: 'clear setup choices, common bottlenecks, and practical fixes',
            guideMistake: 'changing too many variables at once before you identify the real hardware, software, or workflow problem',
            successSignal: 'less friction, better stability, or a clearer buying/setup decision',
        };
    }
    if (category === 'Money & Online Income' ||
        category === 'Business' ||
        category === 'Startups' ||
        category === 'Career' ||
        category === 'Finance & Investing' ||
        category === 'Crypto' ||
        category === 'SEO & Marketing' ||
        category === 'Creator Economy' ||
        category === 'YouTubers') {
        return {
            rankingPriority: 'real-world usefulness, realistic upside, and cleaner execution tradeoffs',
            rankingComparisonCue: 'how fast something becomes useful, how sustainable it feels, and what effort it actually demands',
            summaryFocus: 'practical upside and execution clarity rather than fantasy-income language',
            guidePriority: 'practical execution, clearer tradeoffs, and cleaner next steps',
            guideMistake: 'chasing hype or scale too early before you validate the simpler version of the idea',
            successSignal: 'better clarity, cleaner execution, and a more realistic sense of next moves',
        };
    }
    if (category === 'Education' ||
        category === 'Productivity' ||
        category === 'Self Improvement' ||
        category === 'Lifestyle' ||
        category === 'Health') {
        return {
            rankingPriority: 'repeatability, everyday usefulness, and whether the advice survives real routines',
            rankingComparisonCue: 'what you can actually sustain instead of what looks impressive on paper',
            summaryFocus: 'repeatable progress you can actually sustain',
            guidePriority: 'consistency, clarity, and manageable behavior change',
            guideMistake: 'trying to change everything at once instead of building one stable improvement path',
            successSignal: 'lower friction, steadier habits, and progress that feels easier to repeat',
        };
    }
    if (category === 'Politics' ||
        category === 'Geopolitics' ||
        category === 'History' ||
        category === 'Space' ||
        category === 'Science' ||
        category === 'War & Defense' ||
        category === 'Sports') {
        return {
            rankingPriority: 'clarity, context, and whether the page helps people build a stronger mental model',
            rankingComparisonCue: 'entry clarity, context, and how fast a pick helps the topic make more sense',
            summaryFocus: 'clearer context and a stronger learning path',
            guidePriority: 'orientation, mental models, and easier topic entry',
            guideMistake: 'consuming random headlines or scattered facts before you build a basic framework for the topic',
            successSignal: 'stronger context, better recall, and less confusion when new information appears',
        };
    }
    if (category === 'Games') {
        return {
            rankingPriority: 'replay value, approachability, and whether the pick fits the player mood it promises',
            rankingComparisonCue: 'difficulty, replayability, and how much commitment the game really asks for',
            summaryFocus: 'cleaner fit between player mood and gameplay loop',
            guidePriority: 'starter clarity, low-friction progression, and avoiding avoidable frustration',
            guideMistake: 'picking complexity too early and mistaking initial confusion for depth',
            successSignal: 'better fit, easier entry, and more enjoyable time with less random frustration',
        };
    }
    return {
        rankingPriority: 'fit, recommendation confidence, and replay or reuse value',
        rankingComparisonCue: 'real fit, practical tradeoffs, and recommendation confidence',
        summaryFocus: 'stronger fit and recommendation value',
        guidePriority: 'clarity, momentum, and practical next steps',
        guideMistake: 'taking a generic path without matching it to your real situation',
        successSignal: 'faster clarity and a next step that feels easier to repeat',
    };
}
function getGuideIntentFrame(title) {
    const normalized = title.toLowerCase();
    if (normalized.startsWith('how to fix')) {
        return {
            label: 'diagnose the bottleneck and test targeted fixes',
            firstStepValue: 'it separates the real issue from the symptoms',
            progressSignal: 'the problem becomes easier to isolate and the fixes feel more measurable',
        };
    }
    if (normalized.startsWith('how to start')) {
        return {
            label: 'build a beginner path with cleaner momentum',
            firstStepValue: 'it prevents overcomplication at the start',
            progressSignal: 'the next few decisions feel more obvious and less overwhelming',
        };
    }
    if (normalized.startsWith('what is')) {
        return {
            label: 'build a useful mental model before adding complexity',
            firstStepValue: 'it makes the concept easier to hold in plain language',
            progressSignal: 'you can explain the topic more clearly without depending on jargon',
        };
    }
    if (normalized.includes(' vs ') || normalized.includes('which is better')) {
        return {
            label: 'compare tradeoffs through real usage instead of vague winner claims',
            firstStepValue: 'it anchors the comparison in your actual use case',
            progressSignal: 'one option starts to look more correct for your workflow, budget, or constraints',
        };
    }
    if (normalized.startsWith('tips for')) {
        return {
            label: 'improve results with a smaller set of useful adjustments',
            firstStepValue: 'it keeps the improvement path realistic',
            progressSignal: 'you keep more of the advice because it fits real daily use',
        };
    }
    return {
        label: 'turn a vague topic into a clearer action path',
        firstStepValue: 'it gives the page direction instead of random advice',
        progressSignal: 'you feel less stuck and more certain about the next move',
    };
}
function getGuideLensCategory(seed) {
    const joined = `${seed.title} ${seed.subcategory} ${seed.tags.join(' ')}`.toLowerCase();
    if (joined.includes('ai'))
        return 'AI';
    if (joined.includes('money') || joined.includes('income') || joined.includes('freelanc') || joined.includes('startup') || joined.includes('business')) {
        return 'Business';
    }
    if (joined.includes('phone') || joined.includes('wifi') || joined.includes('mobile') || joined.includes('app') || joined.includes('software') || joined.includes('tech')) {
        return 'Tech';
    }
    if (joined.includes('study') || joined.includes('student') || joined.includes('education')) {
        return 'Education';
    }
    if (joined.includes('sleep') || joined.includes('health') || joined.includes('routine') || joined.includes('fitness')) {
        return 'Health';
    }
    if (joined.includes('politic') || joined.includes('geopolitic') || joined.includes('history') || joined.includes('space') || joined.includes('science')) {
        return 'Politics';
    }
    if (joined.includes('game'))
        return 'Games';
    if (joined.includes('movie') || joined.includes('series') || joined.includes('song') || joined.includes('playlist') || joined.includes('drama')) {
        return 'Movies';
    }
    return 'Watch Guides';
}
const DISCOVER_LIST_OVERRIDES = {
    'best-ai-tools-for-daily-work': {
        seoTitle: 'Best AI Tools for Daily Work in 2026',
        metaDescription: 'Compare the best AI tools for daily work across drafting, research, summaries, and workflow fit without generic hype.',
        description: 'Practical AI tools ranked by how useful they feel in real daily work.',
        intro: 'This page is built for professionals who want AI to reduce friction in normal work, not just look impressive in demos. The ranking favors tools that help with drafting, research, structured thinking, and repeatable workflow support without creating a second layer of busywork.',
        methodology: [
            'We prioritized repeatable daily usefulness over novelty or benchmark hype.',
            'Tools were judged by task fit, editing quality, and how much friction they remove in real workflows.',
            'The goal is to help readers choose a cleaner default tool, not to chase every AI product on the market.',
        ],
        faq: [
            {
                question: 'What is the best general AI tool for daily work?',
                answer: 'For most people, the safest starting point is the tool that handles drafting, summarizing, and back-and-forth editing well enough to become a default. This page helps you compare that default-tool fit more than one-time flashy outputs.',
            },
            {
                question: 'Should I use one AI tool or multiple tools?',
                answer: 'Most people work better with one strong default tool and one backup specialist. Too many overlapping AI apps usually create more friction than leverage.',
            },
            {
                question: 'How should I compare AI tools for work?',
                answer: 'Test them on the work you already repeat: writing, meetings, research, analysis, or planning. The better tool is the one that saves cleaner time with less correction overhead.',
            },
            {
                question: 'What mistake do people make when choosing work AI tools?',
                answer: 'They often compare tools on fun prompts instead of real work. A good daily-work tool should feel reliable across ordinary tasks, not just impressive in one lucky example.',
            },
        ],
        itemSummaryOverrides: {
            ChatGPT: 'ChatGPT remains one of the safest starting points for daily work because it handles drafting, brainstorming, rewriting, and explanation tasks with relatively low friction. It is strongest when you need one flexible default rather than a narrow specialist.',
            Claude: 'Claude stands out when you need calmer long-form editing, structured reasoning, and cleaner document revision. It tends to work well for people who want a more deliberate writing and analysis companion.',
            Perplexity: 'Perplexity is most useful when the real bottleneck is fast research, source discovery, or quick fact-pattern orientation. It often wins when you need research-style support more than pure drafting help.',
        },
    },
    'best-apps-for-earning-money': {
        seoTitle: 'Best Apps for Earning Money Without Hype',
        metaDescription: 'A practical ranking of money-making apps based on realistic entry paths, effort required, and whether the opportunity actually fits beginners.',
        description: 'Money-making apps ranked by realistic entry path, effort, and practical usefulness.',
        intro: 'Most people searching for earning apps are not looking for fantasy income claims. They want realistic entry points, cleaner effort-to-reward tradeoffs, and a better sense of what actually fits their time, skills, and patience. This ranking is built with that lens.',
        methodology: [
            'We prioritized realistic earning paths over viral income claims or vague side-hustle hype.',
            'Each app had to make sense as a real starting point for a specific type of user or work style.',
            'The ranking rewards lower confusion, clearer monetization paths, and more believable beginner outcomes.',
        ],
        faq: [
            {
                question: 'Can you really make money with apps?',
                answer: 'Yes, but the better question is what kind of work the app unlocks. The strongest options usually help you sell a service, product, or skill rather than magically generate income with no effort.',
            },
            {
                question: 'What is the safest type of earning app to start with?',
                answer: 'Apps tied to real work, like freelancing, selling, tutoring, or creator workflows, are usually more reliable than gimmicky reward systems with unclear payout quality.',
            },
            {
                question: 'How should I pick a money-making app?',
                answer: 'Match the app to your actual asset: time, skill, audience, products, or communication ability. The best app is the one that fits what you can do consistently.',
            },
            {
                question: 'What mistake should beginners avoid?',
                answer: 'Avoid choosing an app only because it promises fast money. Look for clarity: how the money is made, who pays, what work is involved, and how repeatable the process really is.',
            },
        ],
    },
    'best-online-jobs-for-students-without-confusion': {
        seoTitle: 'Best Online Jobs for Students Without Confusion',
        metaDescription: 'Compare realistic online jobs for students based on schedule fit, skill barrier, and how safely they work alongside studies.',
        description: 'Student-friendly online jobs ranked by schedule fit, skill barrier, and realistic earning path.',
        intro: 'Students do not need a giant list of random online jobs. They need options that fit around classes, have a believable entry path, and do not destroy focus or sleep. This page favors jobs that feel more realistic when studies still need to come first.',
        methodology: [
            'We prioritized flexible work that can coexist with classes and revision.',
            'The best jobs here offer clearer starter pathways instead of vague “earn online” promises.',
            'We favored lower-complexity roles that still help students build useful skills or portfolio proof.',
        ],
    },
    'best-startup-ideas-for-solo-founders': {
        seoTitle: 'Best Startup Ideas for Solo Founders in 2026',
        metaDescription: 'A solo-founder startup ideas ranking focused on low coordination overhead, realistic execution, and clearer validation paths.',
        description: 'Solo-founder startup ideas ranked by execution simplicity and validation potential.',
        intro: 'Solo founders do not need the broadest idea. They need the idea that can survive limited bandwidth, lower coordination capacity, and slower early momentum. This page focuses on ideas that still make sense when one person is doing the thinking, building, selling, and iterating.',
        methodology: [
            'We rewarded ideas with lower coordination overhead and cleaner validation paths.',
            'The ranking favors narrower problem spaces that a solo founder can actually understand and ship around.',
            'Ideas were filtered for realistic execution, not just theoretical market size.',
        ],
    },
    'best-productivity-apps-for-students-in-2026': {
        seoTitle: 'Best Productivity Apps for Students in 2026',
        metaDescription: 'Compare the best productivity apps for students across deadlines, notes, focus, and revision without building an overloaded tool stack.',
        description: 'Student productivity apps ranked by deadline clarity, focus support, and study workflow fit.',
        intro: 'Students usually do not need more apps. They need fewer apps that make deadlines, notes, focus sessions, and revision easier to manage. This ranking favors tools that reduce chaos instead of expanding it.',
        methodology: [
            'We prioritized deadline visibility, focus support, and note-to-revision usefulness.',
            'Each app had to make sense in a real student workflow instead of only looking good in onboarding.',
            'The list favors cleaner systems over bloated productivity stacks.',
        ],
    },
    'best-apps-for-personal-finance-tracking': {
        seoTitle: 'Best Apps for Personal Finance Tracking',
        metaDescription: 'A practical ranking of personal finance tracking apps focused on spending clarity, budgeting visibility, and monthly control.',
        description: 'Finance tracking apps ranked by spending clarity, budgeting visibility, and ease of review.',
        intro: 'A good finance tracking app should make your money feel more legible. The right choice is usually the one that helps you notice patterns, control categories, and actually review your spending without turning budgeting into a second full-time job.',
        methodology: [
            'We prioritized spending visibility and month-to-month clarity over flashy finance dashboards.',
            'Apps had to help with real review habits, not just data collection.',
            'The ranking favors tools that make budget awareness easier to repeat over time.',
        ],
    },
    'how-to-choose-the-right-ai-tool-for-your-workflow': {
        seoTitle: 'How to Choose the Right AI Tool for Your Workflow',
        metaDescription: 'A practical guide to choosing the right AI tool by task pattern, workflow friction, output quality, and real daily use.',
        description: 'A practical framework for choosing AI tools by real workflow fit instead of hype.',
        intro: 'Most AI tool confusion comes from shopping by feature list instead of by repeated task. This guide is built for people who feel buried under too many AI choices and want a cleaner way to decide what actually belongs in their workflow.',
        methodology: [
            'The guide is centered on repeated work patterns rather than product hype or benchmark chatter.',
            'We focus on task fit, friction, file handling, and editing behavior because those are what people feel in normal use.',
            'The goal is to help readers choose a cleaner default tool and avoid chaotic tool stacking.',
        ],
        faq: [
            {
                question: 'What is the best way to compare AI tools?',
                answer: 'Compare them on your real repeated tasks, not on novelty prompts. The better tool is the one that stays useful when the task becomes ordinary, messy, or slightly harder.',
            },
            {
                question: 'Should I keep multiple AI tools?',
                answer: 'Usually one default tool and one backup specialist is enough. More than that often creates decision drag unless your workflow is unusually broad.',
            },
            {
                question: 'What matters more: raw quality or workflow fit?',
                answer: 'Workflow fit often wins. A slightly smarter tool can still be the wrong daily choice if it slows you down, adds friction, or forces awkward switching.',
            },
            {
                question: 'What mistake should I avoid while choosing?',
                answer: 'Do not choose based only on hype, leaderboard talk, or one clever answer. The real test is whether the tool improves your repeated work without adding cleanup burden.',
            },
        ],
    },
    'how-to-start-freelancing-as-a-student': {
        seoTitle: 'How to Start Freelancing as a Student',
        metaDescription: 'A student-first freelancing guide focused on manageable service selection, proof of work, and protecting study time.',
        description: 'A student-first freelancing guide built around manageable services, proof of work, and schedule safety.',
        intro: 'Freelancing can help students earn and build real-world skill, but it turns risky fast when it starts competing with classes, sleep, or revision. This guide is designed to help students start smaller, build proof carefully, and avoid chaotic overcommitment.',
        methodology: [
            'We prioritized clean skill positioning, manageable client complexity, and schedule protection.',
            'The guide favors proof-of-work and clarity over premature branding or platform obsession.',
            'It is written for students who need freelancing to fit around education, not replace it recklessly.',
        ],
    },
    'what-is-product-market-fit-in-simple-terms': {
        seoTitle: 'What Is Product-Market Fit in Simple Terms',
        metaDescription: 'A plain-language guide to product-market fit for beginners who want to understand startup growth without jargon overload.',
        description: 'A plain-language explanation of product-market fit for people who want startup ideas to make more sense.',
        intro: 'Product-market fit gets discussed like a magic milestone, which makes the concept harder than it needs to be. This guide turns it into a simpler mental model: what demand feels like, how usage changes, and why retention matters more than compliments.',
        methodology: [
            'We explain the concept using practical growth signals instead of abstract startup jargon.',
            'The guide is designed for beginners who need a strong mental model before deeper founder metrics.',
            'Each step helps separate real demand from surface-level excitement.',
        ],
    },
    'how-to-build-better-study-notes': {
        seoTitle: 'How to Build Better Study Notes That Help During Revision',
        metaDescription: 'A practical study-notes guide focused on faster capture, clearer structure, and revision-friendly note quality.',
        description: 'A practical study-notes guide for students who want revision to feel easier and less messy.',
        intro: 'Good notes are not just neat notes. They should help you recall faster, spot confusion earlier, and reduce revision panic later. This guide focuses on turning class material into notes that stay useful when exams get closer.',
        methodology: [
            'We prioritized revision usefulness over aesthetics.',
            'The guide focuses on clearer structure, same-day cleanup, and note quality that survives real exam pressure.',
            'Each step is meant to reduce revision friction rather than create perfect-looking notes.',
        ],
    },
    'how-to-fix-phone-battery-drain-without-panic': {
        seoTitle: 'How to Fix Phone Battery Drain Without Panic',
        metaDescription: 'A practical phone battery-drain guide covering settings, apps, signal issues, and battery-age reality before expensive replacement.',
        description: 'A practical battery-drain guide for people whose phone dies too fast and needs a calmer troubleshooting path.',
        intro: 'Battery drain often feels mysterious because several small issues can combine into one bad experience. This guide is designed to help you inspect the real cause first, fix the biggest drains, and decide whether the phone needs tuning or the battery is simply aging out.',
        methodology: [
            'We prioritized diagnosis before random tweaking or expensive replacement.',
            'The guide focuses on the highest-impact drains first: apps, signal, brightness, sync, and battery health.',
            'It is written to reduce panic and help readers measure whether a fix actually works.',
        ],
    },
    'how-to-understand-geopolitics-without-getting-lost-in-news': {
        seoTitle: 'How to Understand Geopolitics Without Getting Lost in News',
        metaDescription: 'A beginner-friendly geopolitics guide that turns noisy headlines into clearer geography, incentives, strategy, and context.',
        description: 'A beginner-friendly geopolitics guide for turning noisy headlines into clearer strategic context.',
        intro: 'Geopolitics feels overwhelming when every headline seems disconnected from the last one. This guide is built to make world events more coherent by using geography, incentives, regional focus, and longer strategic patterns instead of random headline surfing.',
        methodology: [
            'We emphasize maps, incentives, regional focus, and history so the topic stops feeling like headline chaos.',
            'The guide is written for beginners who need a stable framework before following fast-moving news cycles.',
            'Each step aims to improve context and reduce confusion, not to flood the page with jargon or ideology.',
        ],
    },
    'how-to-start-learning-about-space-as-a-beginner': {
        seoTitle: 'How to Start Learning About Space as a Beginner',
        metaDescription: 'A beginner-friendly space guide built around missions, stories, visuals, and curiosity before technical overload.',
        description: 'A beginner-friendly space guide designed to build curiosity before technical overwhelm.',
        intro: 'Space becomes easier to learn when it starts with missions, stories, and visible scale instead of abstract technical overload. This guide is designed to help beginners build curiosity, orientation, and momentum before they move into denser science.',
        methodology: [
            'We prioritized curiosity and continuity over trying to explain everything at once.',
            'The guide moves from visible, story-led entry points toward deeper questions at a manageable pace.',
            'Each step helps beginners hold the topic more clearly before jumping into harder physics or cosmology.',
        ],
    },
    'how-to-follow-politics-more-intelligently': {
        seoTitle: 'How to Follow Politics More Intelligently',
        metaDescription: 'A practical politics guide focused on systems, source quality, policy patterns, and calmer long-term understanding.',
        description: 'A practical politics guide for people who want better understanding without nonstop overload.',
        intro: 'Following politics becomes less exhausting when you stop treating every controversy as equally important. This guide is designed to help readers build a calmer, smarter information habit centered on systems, source quality, and policy patterns rather than endless outrage cycles.',
        methodology: [
            'We focused on institutions, source quality, and pattern recognition instead of controversy chasing.',
            'The guide is built for people who want stronger political awareness without turning news into all-day emotional noise.',
            'Each step is meant to improve understanding over time, not just keep up with the loudest story of the day.',
        ],
    },
    'how-to-choose-better-productivity-apps': {
        seoTitle: 'How to Choose Better Productivity Apps',
        metaDescription: 'A practical guide to choosing productivity apps based on real workflow bottlenecks, simpler stacks, and lower daily friction.',
        description: 'A practical productivity-app guide built around real bottlenecks, lower friction, and simpler tool stacks.',
        intro: 'Most productivity problems do not come from a lack of apps. They come from too many overlapping tools, unclear bottlenecks, and stacks that look impressive but are hard to maintain. This guide helps readers choose tools based on actual work patterns instead of app hype.',
        methodology: [
            'We focused on real workflow bottlenecks, not abstract productivity fantasies.',
            'The guide rewards simpler stacks and tools that stay easy to return to in normal work.',
            'Each step is designed to help readers reduce tool clutter while keeping useful structure.',
        ],
    },
};
function applyDiscoverListOverride(list) {
    const override = DISCOVER_LIST_OVERRIDES[list.slug];
    if (!override)
        return list;
    const itemSummaryOverrides = override.itemSummaryOverrides;
    const items = itemSummaryOverrides
        ? list.items.map(item => ({
            ...item,
            summary: itemSummaryOverrides[item.name] || item.summary,
        }))
        : list.items;
    return {
        ...list,
        ...override,
        items,
    };
}
function buildSeedSummary(seed, pick) {
    const lens = getEditorialLens(seed.category);
    const tagPhrase = pick.tags.slice(0, 2).join(' and ');
    return `${pick.name} stands out if you want ${lowerFirst(pick.bestFor)}. It earns its place through ${tagPhrase} and a stronger fit for ${seed.subcategory.toLowerCase()} readers who care about ${lens.summaryFocus}.`;
}
function buildRankingMethodology(seed) {
    const lens = getEditorialLens(seed.category);
    return [
        `We prioritized ${seed.angle} plus ${lens.rankingPriority} over empty popularity spikes.`,
        `Every pick had to feel easy to recommend for ${lowerFirst(seed.audience)} who care about ${lens.rankingComparisonCue}.`,
        `This is an editorial ranking built around fit, tradeoffs, and recommendation confidence, not a chart or awards table.`,
    ];
}
function buildGuideMethodology(seed) {
    const lens = getEditorialLens(getGuideLensCategory(seed));
    const frame = getGuideIntentFrame(seed.title);
    return [
        `This guide is optimized for ${lowerFirst(seed.audience)} and aims to ${frame.label}.`,
        `We focused on ${seed.angle} and practical clarity instead of overwhelming the page with too many options.`,
        `The steps are designed to reduce decision fatigue, surface tradeoffs faster, and stay closer to ${lens.guidePriority}.`,
    ];
}
function buildGeneratedRankingFaq(seed) {
    const lens = getEditorialLens(seed.category);
    const firstPick = seed.picks[0];
    return [
        {
            question: `Who is this ${seed.subcategory.toLowerCase()} page best for?`,
            answer: `This page is best for ${lowerFirst(seed.audience)} who want faster discoverability instead of endless searching.`,
        },
        {
            question: 'How was this page curated?',
            answer: `We used an editorial angle centered on ${seed.angle}, then filtered for ${lens.rankingPriority} so the shortlist feels easier to recommend in real usage.`,
        },
        {
            question: 'What should I compare first on this list?',
            answer: `Start with the "best for" line on each pick. The fastest signal here is ${lens.rankingComparisonCue}, not only overall familiarity.`,
        },
        {
            question: `What is the safest starting pick here?`,
            answer: firstPick
                ? `${firstPick.name} is usually the cleanest starting point if you want ${lowerFirst(firstPick.bestFor)}, then you can move down the list if your priorities are narrower.`
                : `Use the shortlist as a fit-first decision page instead of assuming the first slot is the only good option.`,
        },
    ];
}
function buildGeneratedGuideFaq(seed) {
    const lens = getEditorialLens(getGuideLensCategory(seed));
    const frame = getGuideIntentFrame(seed.title);
    const firstStep = seed.steps[0];
    return [
        {
            question: 'Who is this guide for?',
            answer: `This guide is meant for ${lowerFirst(seed.audience)} who want a simpler starting path around ${seed.subcategory.toLowerCase()}.`,
        },
        {
            question: 'What should I do first?',
            answer: firstStep
                ? `Start with "${firstStep.title}" because ${frame.firstStepValue}. That first move makes the rest of the page easier to use properly.`
                : `Start by clarifying the real version of the problem you want this guide to solve.`,
        },
        {
            question: 'What mistake should I avoid while using this guide?',
            answer: `Avoid ${lens.guideMistake}. That usually creates more confusion than progress.`,
        },
        {
            question: 'How do I know the guide is working?',
            answer: `A good sign is that ${frame.progressSignal}. You should feel more clarity and less random trial-and-error after the first few steps.`,
        },
    ];
}
function buildGeneratedRankingList(seed) {
    const slug = toDiscoverSlug(seed.title);
    const scope = seed.scope || inferDiscoverScope(seed.title, seed.tags);
    return {
        id: slug,
        slug,
        type: 'ranking',
        title: seed.title,
        seoTitle: `${seed.title} - Editorial Picks for ${seed.audience}`,
        metaDescription: `Explore ${seed.title.toLowerCase()} curated for ${lowerFirst(seed.audience)}. These editorial picks focus on ${seed.angle}.${buildScopeSentence(scope)}`,
        description: `${seed.title} curated for ${lowerFirst(seed.audience)}.${buildScopeSentence(scope)}`,
        intro: `This ranking is built for ${lowerFirst(seed.audience)}. We prioritized ${seed.angle}, replay value, and how confidently each pick can be recommended when someone wants better ${seed.subcategory.toLowerCase()} options.${buildScopeSentence(scope)}`,
        category: seed.category,
        subcategory: seed.subcategory,
        angle: seed.angle,
        audience: seed.audience,
        scope,
        icon: seed.icon,
        itemCount: seed.picks.length,
        updatedAt: DISCOVER_UPDATED_AT,
        featured: Boolean(seed.featured),
        published: true,
        tags: seed.tags,
        methodology: buildRankingMethodology(seed),
        items: seed.picks.map((pick, index) => ({
            rank: index + 1,
            name: pick.name,
            logo: pick.name
                .split(' ')
                .slice(0, 2)
                .map(part => part.charAt(0))
                .join('')
                .slice(0, 2)
                .toUpperCase(),
            summary: buildSeedSummary(seed, pick),
            bestFor: pick.bestFor,
            pricing: 'Editorial pick',
            badge: 'editorial',
            tags: pick.tags,
            rating: pick.rating,
        })),
        steps: [],
        faq: buildGeneratedRankingFaq(seed),
        relatedSlugs: [],
    };
}
function buildGeneratedGuideList(seed) {
    const slug = toDiscoverSlug(seed.title);
    const scope = seed.scope || inferDiscoverScope(seed.title, seed.tags);
    return {
        id: slug,
        slug,
        type: 'guide',
        title: seed.title,
        seoTitle: `${seed.title} - Practical Discover Guide`,
        metaDescription: `Learn ${seed.title.toLowerCase()} with a practical step-by-step path built for ${lowerFirst(seed.audience)}.${buildScopeSentence(scope)}`,
        description: `${seed.title} for ${lowerFirst(seed.audience)}.${buildScopeSentence(scope)}`,
        intro: `This guide is built for ${lowerFirst(seed.audience)}. The goal is ${seed.angle}, so each step is written to remove friction and make the next decision easier.${buildScopeSentence(scope)}`,
        category: 'Watch Guides',
        subcategory: seed.subcategory,
        angle: seed.angle,
        audience: seed.audience,
        scope,
        icon: seed.icon,
        itemCount: seed.steps.length,
        updatedAt: DISCOVER_UPDATED_AT,
        featured: Boolean(seed.featured),
        published: true,
        tags: seed.tags,
        methodology: buildGuideMethodology(seed),
        items: [],
        steps: seed.steps.map((step, index) => ({
            step: index + 1,
            title: step.title,
            description: step.focus,
        })),
        faq: buildGeneratedGuideFaq(seed),
        relatedSlugs: [],
    };
}
function withDerivedScope(lists) {
    return lists.map(list => ({
        ...list,
        scope: list.scope || inferDiscoverScope(list.title, list.tags),
    }));
}
function withAutoRelatedSlugs(lists) {
    return lists.map(list => {
        const existing = new Set(list.relatedSlugs);
        const similar = lists
            .filter(candidate => candidate.slug !== list.slug)
            .filter(candidate => candidate.category === list.category ||
            candidate.subcategory === list.subcategory ||
            candidate.tags.some(tag => list.tags.includes(tag)))
            .slice(0, 4)
            .map(candidate => candidate.slug);
        for (const slug of similar) {
            existing.add(slug);
            if (existing.size >= 4)
                break;
        }
        return {
            ...list,
            relatedSlugs: Array.from(existing).slice(0, 4),
        };
    });
}
function assertUniqueDiscoverLists(lists) {
    const seenIds = new Map();
    const seenSlugs = new Map();
    for (const list of lists) {
        const duplicateIdTitle = seenIds.get(list.id);
        if (duplicateIdTitle) {
            throw new Error(`Duplicate discover id "${list.id}" found for "${duplicateIdTitle}" and "${list.title}".`);
        }
        seenIds.set(list.id, list.title);
        const duplicateSlugTitle = seenSlugs.get(list.slug);
        if (duplicateSlugTitle) {
            throw new Error(`Duplicate discover slug "${list.slug}" found for "${duplicateSlugTitle}" and "${list.title}".`);
        }
        seenSlugs.set(list.slug, list.title);
    }
    return lists;
}
const BASE_DISCOVER_LISTS = [
    {
        id: 'top-tamil-thriller-movies',
        slug: 'top-tamil-thriller-movies',
        type: 'ranking',
        title: 'Top Tamil Thriller Movies',
        seoTitle: 'Top Tamil Thriller Movies to Watch Next',
        metaDescription: 'A curated ranking of Tamil thriller movies that balance tension, strong performances, and rewatch value.',
        description: 'High-tension Tamil thrillers with strong hooks and replay value.',
        intro: 'This list focuses on thrillers that keep momentum high, reward attention, and leave you with at least one memorable scene or twist. The picks are ordered by replay value, pacing, and payoff.',
        category: 'Movies',
        subcategory: 'Thriller',
        icon: 'Film',
        itemCount: 6,
        updatedAt: '2026-03-27',
        featured: true,
        published: true,
        tags: ['tamil movies', 'thriller', 'best picks', 'discover'],
        methodology: [
            'We prioritized suspense, narrative control, and replay value.',
            'We avoided filler-heavy titles that lose momentum after the setup.',
            'Every pick had to justify its place with pacing, atmosphere, or payoff.',
        ],
        items: [
            { rank: 1, name: 'Ratsasan', logo: 'RA', summary: 'A gripping cat-and-mouse thriller that stays tense almost the entire runtime.', bestFor: 'Viewers who want nonstop tension', pricing: 'Editorial pick', badge: 'editorial', tags: ['serial killer', 'suspense'], rating: 4.9 },
            { rank: 2, name: 'Dhuruvangal Pathinaaru', logo: 'DP', summary: 'A compact mystery thriller that hooks fast and rewards careful viewing.', bestFor: 'Fans of layered investigations', pricing: 'Editorial pick', badge: 'editorial', tags: ['mystery', 'investigation'], rating: 4.8 },
            { rank: 3, name: 'Por Thozhil', logo: 'PT', summary: 'A polished procedural thriller with a calm but effective build in dread.', bestFor: 'Crime-thriller fans', pricing: 'Editorial pick', badge: 'editorial', tags: ['crime', 'procedural'], rating: 4.7 },
            { rank: 4, name: 'Vettaiyaadu Vilaiyaadu', logo: 'VV', summary: 'A stylish investigation thriller with strong atmosphere and scale.', bestFor: 'Viewers who like classic police thrillers', pricing: 'Editorial pick', badge: 'editorial', tags: ['police', 'investigation'], rating: 4.6 },
            { rank: 5, name: 'Game Over', logo: 'GO', summary: 'A tense, contained survival thriller with sharp visual control.', bestFor: 'People who enjoy compact thrillers', pricing: 'Editorial pick', badge: 'editorial', tags: ['survival', 'contained'], rating: 4.5 },
            { rank: 6, name: 'Maanagaram', logo: 'MA', summary: 'An urban hyperlink thriller driven by urgency and constant movement.', bestFor: 'Fast city thrillers', pricing: 'Editorial pick', badge: 'editorial', tags: ['urban', 'multi-story'], rating: 4.4 },
        ],
        steps: [],
        faq: [
            { question: 'Are these movies beginner friendly?', answer: 'Yes. This ranking favors thrillers that are easy to enter even if you do not watch the genre regularly.' },
            { question: 'How were these ranked?', answer: 'The order reflects suspense, pacing, payoff, and how memorable the overall viewing experience feels.' },
        ],
        relatedSlugs: ['crime-series-worth-binge', 'how-to-pick-a-weekend-movie'],
    },
    {
        id: 'best-korean-series-for-beginners',
        slug: 'best-korean-series-for-beginners',
        type: 'ranking',
        title: 'Best Korean Series for Beginners',
        seoTitle: 'Best Korean Series for Beginners Who Want Easy First Picks',
        metaDescription: 'Starter-friendly Korean series picks for viewers who want strong hooks without needing deep genre knowledge.',
        description: 'Approachable Korean series with strong hooks and easy entry points.',
        intro: 'This ranking is built for first-time or casual K-drama viewers. We favored series with clean premises, accessible tone, and enough emotional payoff to keep a new viewer going past episode one.',
        category: 'Series',
        subcategory: 'Korean',
        icon: 'Tv',
        itemCount: 6,
        updatedAt: '2026-03-27',
        featured: true,
        published: true,
        tags: ['korean series', 'beginners', 'drama'],
        methodology: [
            'Beginner accessibility mattered more than niche prestige.',
            'We balanced romance, thriller, and feel-good picks to cover different moods.',
            'Each show had to offer a strong first-episode hook.',
        ],
        items: [
            { rank: 1, name: 'Crash Landing on You', logo: 'CL', summary: 'A big, emotional gateway series with romance, scale, and immediate momentum.', bestFor: 'First-time K-drama viewers', pricing: 'Editorial pick', badge: 'editorial', tags: ['romance', 'beginner'], rating: 4.9 },
            { rank: 2, name: 'Itaewon Class', logo: 'IC', summary: 'A driven underdog story with clear stakes and a modern energy.', bestFor: 'Viewers who like ambition arcs', pricing: 'Editorial pick', badge: 'editorial', tags: ['underdog', 'business'], rating: 4.7 },
            { rank: 3, name: 'Vincenzo', logo: 'VI', summary: 'A glossy dark-comedy thriller that is stylish and easy to binge.', bestFor: 'People who want attitude and pace', pricing: 'Editorial pick', badge: 'editorial', tags: ['dark comedy', 'thriller'], rating: 4.7 },
            { rank: 4, name: 'Hometown Cha-Cha-Cha', logo: 'HC', summary: 'A warm coastal comfort watch with an easy rhythm.', bestFor: 'Relaxed weekend watching', pricing: 'Editorial pick', badge: 'editorial', tags: ['comfort', 'romance'], rating: 4.6 },
            { rank: 5, name: 'Signal', logo: 'SG', summary: 'A gripping time-link crime series for viewers ready for something sharper.', bestFor: 'Thriller-first viewers', pricing: 'Editorial pick', badge: 'editorial', tags: ['crime', 'time-link'], rating: 4.8 },
            { rank: 6, name: 'Business Proposal', logo: 'BP', summary: 'A light, fast, and easy romantic comedy with broad appeal.', bestFor: 'Quick feel-good viewing', pricing: 'Editorial pick', badge: 'editorial', tags: ['rom-com', 'light'], rating: 4.4 },
        ],
        steps: [],
        faq: [
            { question: 'What if I do not like slow romance shows?', answer: 'Start with Vincenzo or Signal first. They are usually easier for thriller-oriented viewers.' },
            { question: 'Is this list only romance?', answer: 'No. It mixes romance, crime, comfort viewing, and underdog stories so beginners can find a style that fits.' },
        ],
        relatedSlugs: ['how-to-start-with-korean-dramas', 'crime-series-worth-binge'],
    },
    {
        id: 'top-road-trip-songs-tamil',
        slug: 'top-road-trip-songs-tamil',
        type: 'ranking',
        title: 'Top Tamil Road Trip Songs',
        seoTitle: 'Top Tamil Road Trip Songs for Long Drives and Night Rides',
        metaDescription: 'A curated Tamil road-trip playlist ranking with energetic, breezy, and replayable picks for travel mood.',
        description: 'Tamil songs that suit long drives, night rides, and open-road mood.',
        intro: 'These picks are selected for drive energy, replay value, and how well they hold mood across a longer playlist. We favored tracks that feel expansive, memorable, and easy to revisit on repeat.',
        category: 'Songs',
        subcategory: 'Road Trip',
        icon: 'Music2',
        itemCount: 6,
        updatedAt: '2026-03-27',
        featured: false,
        published: true,
        tags: ['songs', 'tamil', 'playlist', 'road trip'],
        methodology: [
            'Songs were ranked by travel mood, replay value, and broad crowd appeal.',
            'We mixed energetic and breezy picks to suit different drive phases.',
            'This is an editorial playlist, not a chart recap.',
        ],
        items: [
            { rank: 1, name: 'Aaromale', logo: 'AR', summary: 'Dreamy, expansive, and perfect for scenic stretches.', bestFor: 'Sunset drives', pricing: 'Editorial pick', badge: 'editorial', tags: ['melodic', 'scenic'], rating: 4.8 },
            { rank: 2, name: 'Mental Manadhil', logo: 'MM', summary: 'Light, rhythmic, and great for keeping the drive upbeat.', bestFor: 'Morning drives', pricing: 'Editorial pick', badge: 'editorial', tags: ['upbeat', 'light'], rating: 4.7 },
            { rank: 3, name: 'Thalli Pogathey', logo: 'TP', summary: 'Big, emotional, and easy to sing along with during long rides.', bestFor: 'Night rides', pricing: 'Editorial pick', badge: 'editorial', tags: ['anthemic', 'sing-along'], rating: 4.7 },
            { rank: 4, name: 'Megham Karukatha', logo: 'MK', summary: 'Comforting and replayable without tiring the mood.', bestFor: 'Relaxed playlists', pricing: 'Editorial pick', badge: 'editorial', tags: ['comfort', 'repeat'], rating: 4.5 },
            { rank: 5, name: 'New York Nagaram', logo: 'NY', summary: 'A city-night favorite that brings strong travel energy.', bestFor: 'Urban night drives', pricing: 'Editorial pick', badge: 'editorial', tags: ['urban', 'night'], rating: 4.6 },
            { rank: 6, name: 'Hosanna', logo: 'HO', summary: 'Still works as a wide-appeal travel pick with emotional lift.', bestFor: 'Mixed group drives', pricing: 'Editorial pick', badge: 'editorial', tags: ['romantic', 'group trip'], rating: 4.4 },
        ],
        steps: [],
        faq: [
            { question: 'Are these chart rankings?', answer: 'No. This page is an editorial road-trip ranking built around mood and replay value.' },
            { question: 'Can this work as a starter playlist?', answer: 'Yes. The list is intentionally broad so you can use it as a simple base playlist and extend it later.' },
        ],
        relatedSlugs: ['how-to-build-roadtrip-playlist', 'best-family-weekend-movies'],
    },
    {
        id: 'best-action-actors-modern-cinema',
        slug: 'best-action-actors-modern-cinema',
        type: 'ranking',
        title: 'Best Action Actors Across Global and Indian Cinema',
        seoTitle: 'Best Action Actors Across Global and Indian Cinema Ranked by Screen Impact',
        metaDescription: 'An editorial ranking of action actors across global and Indian cinema, selected for screen command, consistency, and memorable set pieces.',
        description: 'Action stars across global and Indian cinema ranked by presence, consistency, and screen command.',
        intro: 'This list is built around action credibility, command in high-pressure sequences, and how instantly an actor can elevate a movie built on momentum. It mixes global and Indian cinema picks on purpose so the scope is clear and the shortlist feels genuinely comparative.',
        category: 'Actors',
        subcategory: 'Action',
        scope: 'Global + Indian cinema',
        icon: 'Users',
        itemCount: 6,
        updatedAt: '2026-03-27',
        featured: false,
        published: true,
        tags: ['actors', 'action', 'cinema'],
        methodology: [
            'We ranked performers by action screen presence and consistency.',
            'A memorable action persona mattered more than one-off peaks.',
            'We favored actors who feel credible in both mass and grounded setups.',
        ],
        items: [
            { rank: 1, name: 'Keanu Reeves', logo: 'KR', summary: 'A modern benchmark for composed, physically precise action screen presence.', bestFor: 'Fans of clean, committed action', pricing: 'Editorial pick', badge: 'editorial', tags: ['precision', 'modern'], rating: 4.9 },
            { rank: 2, name: 'Tom Cruise', logo: 'TC', summary: 'Still unmatched at making big-scale action feel urgent and personal.', bestFor: 'Spectacle-driven action lovers', pricing: 'Editorial pick', badge: 'editorial', tags: ['spectacle', 'commitment'], rating: 4.9 },
            { rank: 3, name: 'Dhanush', logo: 'DH', summary: 'Flexible enough to bring wiry unpredictability and dramatic weight together.', bestFor: 'Viewers who like intensity with style', pricing: 'Editorial pick', badge: 'editorial', tags: ['intense', 'stylish'], rating: 4.6 },
            { rank: 4, name: 'Vijay', logo: 'VJ', summary: 'Mass action charisma with strong crowd-facing energy.', bestFor: 'Large-scale crowd-pleasing action', pricing: 'Editorial pick', badge: 'editorial', tags: ['mass', 'charisma'], rating: 4.5 },
            { rank: 5, name: 'Jason Statham', logo: 'JS', summary: 'Reliable, hard-edged action efficiency with strong genre identity.', bestFor: 'Straightforward action fans', pricing: 'Editorial pick', badge: 'editorial', tags: ['hard-edged', 'genre'], rating: 4.5 },
            { rank: 6, name: 'Vikram', logo: 'VK', summary: 'A performer whose intensity gives action roles extra commitment.', bestFor: 'Performance-driven action picks', pricing: 'Editorial pick', badge: 'editorial', tags: ['intensity', 'performance'], rating: 4.5 },
        ],
        steps: [],
        faq: [
            { question: 'Is this based on popularity alone?', answer: 'No. Screen command, action credibility, and long-run consistency mattered more than only popularity.' },
        ],
        relatedSlugs: ['visionary-directors-modern-cinema', 'top-tamil-thriller-movies'],
    },
    {
        id: 'iconic-actresses-screen-presence',
        slug: 'iconic-actresses-screen-presence',
        type: 'ranking',
        title: 'Iconic Indian Actresses with Strong Screen Presence',
        seoTitle: 'Iconic Indian Actresses Ranked by Screen Presence and Rewatch Value',
        metaDescription: 'A ranking focused on Indian actresses whose screen presence, role selection, and recall value stay with audiences.',
        description: 'Indian actresses whose presence and recall value make scenes last longer.',
        intro: 'This page is not a career encyclopedia. It is a curated ranking centered on Indian actresses whose presence, memorability, and screen command continue to shape audience recall across eras and styles.',
        category: 'Actresses',
        subcategory: 'Screen Presence',
        icon: 'Sparkles',
        itemCount: 6,
        updatedAt: '2026-03-27',
        featured: false,
        published: true,
        tags: ['actresses', 'screen presence', 'cinema'],
        methodology: [
            'We focused on recall value, emotional command, and scene ownership.',
            'The list rewards performers whose presence is felt even in compact roles.',
            'This is an editorial ranking, not an awards table.',
        ],
        items: [
            { rank: 1, name: 'Sridevi', logo: 'SR', summary: 'A rare performer who balanced star power, rhythm, and emotional intelligence.', bestFor: 'Viewers exploring iconic screen command', pricing: 'Editorial pick', badge: 'editorial', tags: ['iconic', 'versatile'], rating: 4.9 },
            { rank: 2, name: 'Nayanthara', logo: 'NA', summary: 'A dependable modern star presence with steady command in high-visibility roles.', bestFor: 'Modern mainstream cinema fans', pricing: 'Editorial pick', badge: 'editorial', tags: ['modern', 'star'], rating: 4.6 },
            { rank: 3, name: 'Simran', logo: 'SI', summary: 'A strong blend of ease, warmth, and instant scene readability.', bestFor: 'Fans of charismatic performances', pricing: 'Editorial pick', badge: 'editorial', tags: ['charismatic', 'warm'], rating: 4.6 },
            { rank: 4, name: 'Sai Pallavi', logo: 'SP', summary: 'Natural, expressive, and able to shift a scene with very little overstatement.', bestFor: 'Viewers who like grounded intensity', pricing: 'Editorial pick', badge: 'editorial', tags: ['grounded', 'expressive'], rating: 4.7 },
            { rank: 5, name: 'Tabu', logo: 'TB', summary: 'Quiet authority and unusual precision make her performances linger.', bestFor: 'Performance-first audiences', pricing: 'Editorial pick', badge: 'editorial', tags: ['precision', 'authority'], rating: 4.8 },
            { rank: 6, name: 'Trisha', logo: 'TR', summary: 'A familiar and durable screen presence with broad audience recall.', bestFor: 'Mainstream romance and drama fans', pricing: 'Editorial pick', badge: 'editorial', tags: ['mainstream', 'recall'], rating: 4.4 },
        ],
        steps: [],
        faq: [
            { question: 'Is this a definitive all-time list?', answer: 'No. It is an editorial shortlist aimed at discoverability and broad cultural recall.' },
        ],
        relatedSlugs: ['visionary-directors-modern-cinema', 'best-family-weekend-movies'],
    },
    {
        id: 'visionary-directors-modern-cinema',
        slug: 'visionary-directors-modern-cinema',
        type: 'ranking',
        title: 'Visionary Directors Across Global and Indian Cinema',
        seoTitle: 'Visionary Directors Across Global and Indian Cinema Worth Exploring',
        metaDescription: 'A curated director ranking across global and Indian cinema, built around visual identity, storytelling control, and influence.',
        description: 'Directors across global and Indian cinema with a strong visual signature and clear storytelling identity.',
        intro: 'This ranking favors filmmakers whose work feels authored, recognizable, and direction-led. It deliberately mixes global and Indian cinema so the page reads as a broader discovery path rather than a single-industry shortlist.',
        category: 'Directors',
        subcategory: 'Modern Cinema',
        scope: 'Global + Indian cinema',
        icon: 'Clapperboard',
        itemCount: 6,
        updatedAt: '2026-03-27',
        featured: true,
        published: true,
        tags: ['directors', 'modern cinema', 'auteurs'],
        methodology: [
            'We prioritized visual identity and clarity of authorship.',
            'Influence and recognizability mattered more than raw volume.',
            'The list balances mainstream reach with strong directorial voice.',
        ],
        items: [
            { rank: 1, name: 'Christopher Nolan', logo: 'CN', summary: 'A director whose scale, structure, and audience pull rarely separate.', bestFor: 'Viewers who like cerebral blockbusters', pricing: 'Editorial pick', badge: 'editorial', tags: ['scale', 'structure'], rating: 4.9 },
            { rank: 2, name: 'Mani Ratnam', logo: 'MR', summary: 'Elegant storytelling, control of mood, and long-term influence keep him central.', bestFor: 'Viewers exploring Indian modern classics', pricing: 'Editorial pick', badge: 'editorial', tags: ['elegant', 'influential'], rating: 4.8 },
            { rank: 3, name: 'Bong Joon Ho', logo: 'BJ', summary: 'Sharp tonal control and layered storytelling make his work deeply memorable.', bestFor: 'Genre-bending cinema fans', pricing: 'Editorial pick', badge: 'editorial', tags: ['layered', 'genre'], rating: 4.8 },
            { rank: 4, name: 'Lokesh Kanagaraj', logo: 'LK', summary: 'Strong momentum and branded cinematic identity give his films immediate recognition.', bestFor: 'High-energy thriller viewers', pricing: 'Editorial pick', badge: 'editorial', tags: ['momentum', 'identity'], rating: 4.6 },
            { rank: 5, name: 'Denis Villeneuve', logo: 'DV', summary: 'Large-scale visual discipline with a careful sense of tone and atmosphere.', bestFor: 'Science-fiction and mood-driven cinema', pricing: 'Editorial pick', badge: 'editorial', tags: ['atmosphere', 'scale'], rating: 4.8 },
            { rank: 6, name: 'Vetrimaaran', logo: 'VM', summary: 'Grounded storytelling intensity with a clear directorial weight.', bestFor: 'Raw, dramatic crime cinema', pricing: 'Editorial pick', badge: 'editorial', tags: ['grounded', 'intense'], rating: 4.7 },
        ],
        steps: [],
        faq: [
            { question: 'What makes a director visionary in this list?', answer: 'A clear creative identity, repeatable authorship, and strong control over story mood and execution.' },
        ],
        relatedSlugs: ['how-to-watch-nolan-movies', 'top-tamil-thriller-movies'],
    },
    {
        id: 'best-family-weekend-movies',
        slug: 'best-family-weekend-movies',
        type: 'ranking',
        title: 'Best Family Weekend Movies Across Tamil and Global Cinema',
        seoTitle: 'Best Family Weekend Movies Across Tamil and Global Cinema',
        metaDescription: 'Family-friendly weekend movie picks across Tamil and global cinema, chosen for comfort, accessibility, and broad age-group appeal.',
        description: 'Easy, rewatchable family weekend picks across Tamil and global cinema.',
        intro: 'This ranking is for low-friction family viewing across both Tamil and global cinema. We favored movies that are easy to recommend, emotionally warm, and likely to work for mixed-age viewing without too much setup.',
        category: 'Movies',
        subcategory: 'Family',
        scope: 'Tamil + Global cinema',
        icon: 'Popcorn',
        itemCount: 6,
        updatedAt: '2026-03-27',
        featured: false,
        published: true,
        tags: ['family', 'weekend', 'movies'],
        methodology: [
            'Broad age-group appeal mattered more than critical prestige.',
            'We prioritized warmth, replayability, and low-friction setups.',
            'The list is designed for quick family picks, not heavy viewing.',
        ],
        items: [
            { rank: 1, name: 'Panchathanthiram', logo: 'PA', summary: 'A lively ensemble comedy that works especially well in group viewing.', bestFor: 'Family laugh-heavy nights', pricing: 'Editorial pick', badge: 'editorial', tags: ['comedy', 'ensemble'], rating: 4.7 },
            { rank: 2, name: 'Moana', logo: 'MO', summary: 'Colorful, musical, and easy to replay with family audiences.', bestFor: 'All-age home viewing', pricing: 'Editorial pick', badge: 'editorial', tags: ['animation', 'family'], rating: 4.8 },
            { rank: 3, name: 'Kadaisi Vivasayi', logo: 'KV', summary: 'Gentle and sincere, with a warm viewing rhythm.', bestFor: 'Calm family evenings', pricing: 'Editorial pick', badge: 'editorial', tags: ['gentle', 'heartfelt'], rating: 4.6 },
            { rank: 4, name: 'Inside Out', logo: 'IO', summary: 'Emotionally intelligent and widely accessible across age groups.', bestFor: 'Meaningful family watch sessions', pricing: 'Editorial pick', badge: 'editorial', tags: ['animation', 'emotional'], rating: 4.8 },
            { rank: 5, name: 'The Sound of Music', logo: 'SM', summary: 'Classic comfort viewing with timeless family-watch energy.', bestFor: 'Long-form classic family viewing', pricing: 'Editorial pick', badge: 'editorial', tags: ['classic', 'musical'], rating: 4.5 },
            { rank: 6, name: 'Abiyum Naanum', logo: 'AN', summary: 'A warm family drama with easy emotional connect.', bestFor: 'Parent-child viewing', pricing: 'Editorial pick', badge: 'editorial', tags: ['drama', 'family'], rating: 4.5 },
        ],
        steps: [],
        faq: [
            { question: 'Are these all kid-only movies?', answer: 'No. The list aims for mixed-age appeal, including family dramas, animation, and broad comedies.' },
        ],
        relatedSlugs: ['how-to-pick-a-weekend-movie', 'top-road-trip-songs-tamil'],
    },
    {
        id: 'crime-series-worth-binge',
        slug: 'crime-series-worth-binge',
        type: 'ranking',
        title: 'Crime Series Worth Binge Watching Across Global and Indian Streaming',
        seoTitle: 'Crime Series Worth Binge Watching Across Global and Indian Streaming',
        metaDescription: 'Bingeable crime series across global and Indian streaming, selected for hook strength, episode momentum, and overall payoff.',
        description: 'Fast-moving crime series picks across global and Indian streaming with enough hook to keep the next episode easy.',
        intro: 'This page favors crime shows that know how to keep viewers moving. A good binge series needs more than a strong premise. It needs rhythm, episode-end momentum, and enough clarity to hold attention over multiple sessions. The picks intentionally mix global and Indian streaming titles so the scope stays clear.',
        category: 'Series',
        subcategory: 'Crime',
        scope: 'Global + Indian streaming',
        icon: 'Clock3',
        itemCount: 6,
        updatedAt: '2026-03-27',
        featured: false,
        published: true,
        tags: ['crime series', 'binge watch', 'discover'],
        methodology: [
            'Hook strength and episode-end momentum carried extra weight.',
            'We rewarded shows with consistent urgency rather than only one standout season.',
            'The list is optimized for binge value, not just prestige.',
        ],
        items: [
            { rank: 1, name: 'Breaking Bad', logo: 'BB', summary: 'Still one of the clearest examples of escalation done right.', bestFor: 'Viewers who want long-form intensity', pricing: 'Editorial pick', badge: 'editorial', tags: ['crime', 'escalation'], rating: 4.9 },
            { rank: 2, name: 'Mindhunter', logo: 'MH', summary: 'Measured but deeply absorbing for psychological crime fans.', bestFor: 'Investigative and profiling drama lovers', pricing: 'Editorial pick', badge: 'editorial', tags: ['psychological', 'investigation'], rating: 4.8 },
            { rank: 3, name: 'Money Heist', logo: 'ML', summary: 'High-concept momentum and crowd-pleasing urgency make it easy to continue.', bestFor: 'Fast binge sessions', pricing: 'Editorial pick', badge: 'editorial', tags: ['heist', 'fast'], rating: 4.6 },
            { rank: 4, name: 'Delhi Crime', logo: 'DC', summary: 'A focused and grounded crime series with strong procedural pull.', bestFor: 'Viewers who prefer realism', pricing: 'Editorial pick', badge: 'editorial', tags: ['procedural', 'grounded'], rating: 4.7 },
            { rank: 5, name: 'Signal', logo: 'SG', summary: 'Still one of the best gateway crime picks from Korean television.', bestFor: 'Fans of clever high-concept crime', pricing: 'Editorial pick', badge: 'editorial', tags: ['time-link', 'crime'], rating: 4.8 },
            { rank: 6, name: 'Farzi', logo: 'FZ', summary: 'Stylish, energetic, and easy to queue up for another episode.', bestFor: 'Viewers who like slick Indian crime drama', pricing: 'Editorial pick', badge: 'editorial', tags: ['stylish', 'indian'], rating: 4.5 },
        ],
        steps: [],
        faq: [
            { question: 'Which one is easiest to start with?', answer: 'Money Heist and Farzi are the easiest fast-start options. Mindhunter is better if you want a slower psychological pull.' },
        ],
        relatedSlugs: ['best-korean-series-for-beginners', 'top-tamil-thriller-movies'],
    },
    {
        id: 'how-to-start-with-korean-dramas',
        slug: 'how-to-start-with-korean-dramas',
        type: 'guide',
        title: 'How to Start With Korean Dramas',
        seoTitle: 'How to Start With Korean Dramas if You Are Completely New',
        metaDescription: 'A clean beginner path for choosing your first Korean dramas without getting overwhelmed by genre and length.',
        description: 'A simple starting path for people who are new to Korean dramas.',
        intro: 'A lot of new viewers bounce off K-dramas because they start with a series that does not match their taste. This guide helps you choose by mood first, then genre, then commitment level.',
        category: 'Watch Guides',
        subcategory: 'Korean Dramas',
        scope: 'Korean dramas',
        icon: 'PlayCircle',
        itemCount: 5,
        updatedAt: '2026-03-27',
        featured: false,
        published: true,
        tags: ['guide', 'k-drama', 'beginners'],
        methodology: [
            'The guide is optimized for first-time viewer confidence.',
            'Mood matching matters more than hype when you are just starting out.',
            'A successful first series is more important than a prestigious first series.',
        ],
        items: [],
        steps: [
            { step: 1, title: 'Pick your mood first', description: 'Decide whether you want romance, thriller, comfort viewing, or an underdog story before choosing a title.' },
            { step: 2, title: 'Start with accessible shows', description: 'Pick a widely approachable series with a strong first episode instead of a niche prestige drama.' },
            { step: 3, title: 'Avoid overcommitting immediately', description: 'Do not queue five long shows at once. Finish one strong starter before expanding.' },
            { step: 4, title: 'Use one contrast pick next', description: 'After your first series, choose a second show from a different mood so you understand your own taste better.' },
            { step: 5, title: 'Build from what you liked, not from trends', description: 'Use your first success as the base for future picks rather than only following social media hype.' },
        ],
        faq: [
            { question: 'What is the safest first pick?', answer: 'Choose a broad gateway show with a strong first episode and simple premise. That usually keeps new viewers engaged longer.' },
        ],
        relatedSlugs: ['best-korean-series-for-beginners', 'crime-series-worth-binge'],
    },
    {
        id: 'how-to-pick-a-weekend-movie',
        slug: 'how-to-pick-a-weekend-movie',
        type: 'guide',
        title: 'How to Pick a Weekend Movie Fast',
        seoTitle: 'How to Pick a Weekend Movie Fast Without Endless Scrolling',
        metaDescription: 'A practical weekend movie-picking guide for couples, families, and solo viewers who want faster choices.',
        description: 'A quick decision guide for choosing the right weekend movie without wasting time.',
        intro: 'Endless scrolling kills movie night faster than a bad movie. This guide helps you cut the decision time by matching energy level, who you are watching with, and how much emotional weight you want.',
        category: 'Watch Guides',
        subcategory: 'Weekend',
        icon: 'ListChecks',
        itemCount: 5,
        updatedAt: '2026-03-27',
        featured: false,
        published: true,
        tags: ['weekend guide', 'movie night', 'how to'],
        methodology: [
            'The guide is decision-first, not review-first.',
            'We reduce choice fatigue by using mood and company as the primary filters.',
            'The aim is fast confidence, not exhaustive browsing.',
        ],
        items: [],
        steps: [
            { step: 1, title: 'Decide who is watching', description: 'Solo, couple, friends, or family changes what kind of movie will actually work.' },
            { step: 2, title: 'Choose the energy level', description: 'Pick between comfort, intense, funny, emotional, or visually big before looking at titles.' },
            { step: 3, title: 'Set a runtime ceiling', description: 'A smaller runtime window usually speeds up the final choice and reduces drop-off.' },
            { step: 4, title: 'Use one backup option', description: 'Keep one lighter fallback ready in case the main pick feels too heavy for the moment.' },
            { step: 5, title: 'Save the winner pattern', description: 'Note what worked so your next weekend choice gets faster and more accurate.' },
        ],
        faq: [
            { question: 'What is the fastest filter?', answer: 'The fastest filter is mood plus company. That narrows the field much better than genre alone.' },
        ],
        relatedSlugs: ['best-family-weekend-movies', 'top-tamil-thriller-movies'],
    },
    {
        id: 'how-to-watch-nolan-movies',
        slug: 'how-to-watch-nolan-movies',
        type: 'guide',
        title: 'How to Watch Nolan Movies Without Overcomplicating It',
        seoTitle: 'How to Watch Nolan Movies in a Simple Starter Order',
        metaDescription: 'A starter-friendly Nolan viewing path that focuses on variety, momentum, and easy entry for first-time viewers.',
        description: 'A simple Nolan viewing path for viewers who want the highlights first.',
        intro: 'If you are new to Nolan films, the best order is not necessarily a strict release marathon. A better approach is to start with one accessible crowd-pleaser, then move into heavier puzzle-box films once you already trust the style.',
        category: 'Watch Guides',
        subcategory: 'Director Watch Order',
        scope: 'Christopher Nolan filmography',
        icon: 'Clapperboard',
        itemCount: 5,
        updatedAt: '2026-03-27',
        featured: false,
        published: true,
        tags: ['nolan', 'watch order', 'guide'],
        methodology: [
            'The guide is optimized for entry and momentum, not total completionism.',
            'We alternate accessible and dense films so the viewing path does not become monotonous.',
            'The aim is to help viewers understand the director voice quickly.',
        ],
        items: [],
        steps: [
            { step: 1, title: 'Start with one easy gateway film', description: 'Open with a crowd-friendly Nolan film that gives you the broad mix of scale, structure, and emotional hook.' },
            { step: 2, title: 'Move to a puzzle film next', description: 'Once the style clicks, choose one more intricate movie so you understand the director rhythm better.' },
            { step: 3, title: 'Add the large-scale prestige pick', description: 'This is where the most visually expansive films hit harder because you already trust the storytelling style.' },
            { step: 4, title: 'Use the darkest film later, not first', description: 'Save the heavier mood-driven titles until you are already invested in the director voice.' },
            { step: 5, title: 'Finish with your personal curiosity picks', description: 'Once you know what part of the filmography you enjoy most, branch into the remaining titles by taste.' },
        ],
        faq: [
            { question: 'Should I watch in release order?', answer: 'You can, but first-time viewers often have a smoother experience with a simple starter order built around accessibility.' },
        ],
        relatedSlugs: ['visionary-directors-modern-cinema', 'how-to-pick-a-weekend-movie'],
    },
    {
        id: 'how-to-build-roadtrip-playlist',
        slug: 'how-to-build-roadtrip-playlist',
        type: 'guide',
        title: 'How to Build a Road Trip Playlist',
        seoTitle: 'How to Build a Road Trip Playlist That Does Not Get Tiring',
        metaDescription: 'A practical guide for building road-trip playlists with better pacing, mood changes, and replay-friendly sequencing.',
        description: 'A simple process for making a drive playlist that keeps the mood fresh.',
        intro: 'A great road-trip playlist is not just a pile of favorite songs. It should rise, relax, recover, and avoid repeating the exact same energy too long. This guide gives you a usable shape.',
        category: 'Watch Guides',
        subcategory: 'Playlist Guide',
        icon: 'Music2',
        itemCount: 5,
        updatedAt: '2026-03-27',
        featured: false,
        published: true,
        tags: ['playlist', 'road trip', 'songs'],
        methodology: [
            'The guide is built around energy flow, not pure popularity.',
            'Travel listening needs mood shifts so the playlist does not flatten out.',
            'Replayability matters more than only the first ten minutes.',
        ],
        items: [],
        steps: [
            { step: 1, title: 'Open with easy winners', description: 'Start with a few familiar songs that put everyone in the trip mood immediately.' },
            { step: 2, title: 'Do not stack the same tempo too long', description: 'Shift between energetic, breezy, and reflective tracks so the playlist keeps movement.' },
            { step: 3, title: 'Keep one singer or texture from dominating', description: 'Too much of the same voice or sound palette can make the drive feel repetitive.' },
            { step: 4, title: 'Place the sing-along songs in the middle stretch', description: 'This is usually where drive energy settles and shared tracks work best.' },
            { step: 5, title: 'End with softer recall songs', description: 'A good ending stretch should feel warm and memorable instead of abrupt.' },
        ],
        faq: [
            { question: 'How long should a road-trip playlist be?', answer: 'Build one strong 60 to 90 minute block first. You can always layer more once the core mood works.' },
        ],
        relatedSlugs: ['top-road-trip-songs-tamil', 'how-to-pick-a-weekend-movie'],
    },
];
const GENERATED_DISCOVER_LISTS = [
    ...discover_high_traffic_seeds_1.HIGH_TRAFFIC_DISCOVER_RANKING_SEEDS.map(buildGeneratedRankingList),
    ...discover_high_traffic_seeds_1.HIGH_TRAFFIC_DISCOVER_GUIDE_SEEDS.map(buildGeneratedGuideList),
].map(applyDiscoverListOverride);
exports.DISCOVER_LISTS = assertUniqueDiscoverLists(withAutoRelatedSlugs(withDerivedScope([...BASE_DISCOVER_LISTS, ...GENERATED_DISCOVER_LISTS])));
function getPublishedDiscoverLists() {
    return exports.DISCOVER_LISTS.filter(list => list.published);
}
function getDiscoverListBySlugLocal(slug) {
    return exports.DISCOVER_LISTS.find(list => list.slug === slug) || null;
}
