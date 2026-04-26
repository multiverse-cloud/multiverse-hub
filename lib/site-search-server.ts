import 'server-only'

import { unstable_cache } from 'next/cache'
import { getCareerTemplates } from '@/lib/career-db'
import { getPublishedDiscoverLists } from '@/lib/discover-db'
import { getDiscoverIntentLabel } from '@/lib/discover-query'
import { FIX_GUIDES } from '@/lib/fixes-data'
import { getPublishedPrompts } from '@/lib/prompt-db'
import { getPublishedTemplates } from '@/lib/template-db'
import type { SiteSearchResult } from '@/lib/site-search'
import { searchTools } from '@/lib/tools-data'

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function includesQuery(value: string | undefined, query: string) {
  return Boolean(value && normalize(value).includes(query))
}

function getScore(
  candidate: {
    title: string
    description?: string
    category?: string
    tags?: string[]
  },
  query: string
) {
  const normalizedTitle = normalize(candidate.title)
  let score = 0

  if (normalizedTitle === query) score += 120
  if (normalizedTitle.startsWith(query)) score += 90
  if (normalizedTitle.includes(query)) score += 70
  if (includesQuery(candidate.category, query)) score += 30
  if (includesQuery(candidate.description, query)) score += 18
  if (candidate.tags?.some(tag => includesQuery(tag, query))) score += 16

  return score
}

const getCachedSearchSiteContent = unstable_cache(
  async (normalizedQuery: string, limit: number): Promise<SiteSearchResult[]> => {
    const toolResults = searchTools(normalizedQuery).map(tool => ({
      id: `tool:${tool.id}`,
      type: 'tool' as const,
      title: tool.name,
      description: tool.description,
      href: `/tools/${tool.categorySlug}/${tool.slug}`,
      category: tool.category,
      subcategory: tool.categorySlug,
      badge: 'Tool',
      score: getScore(
        { title: tool.name, description: tool.description, category: tool.category, tags: tool.tags },
        normalizedQuery
      ),
    }))

    const discoverLists = await getPublishedDiscoverLists()
    const discoverResults = discoverLists
      .filter(list =>
        [list.title, list.description, list.category, list.subcategory, list.scope, ...list.tags].some(value =>
          includesQuery(value, normalizedQuery)
        )
      )
      .map(list => ({
        id: `discover:${list.id}`,
        type: 'discover' as const,
        title: list.title,
        description: list.description,
        href: `/discover/${list.slug}`,
        category: list.category,
        subcategory: list.subcategory || getDiscoverIntentLabel(list.title),
        badge: list.type === 'guide' ? 'Guide' : 'Ranking',
        score: getScore(
          {
            title: list.title,
            description: `${list.description} ${list.intro}`,
            category: `${list.category} ${list.subcategory || ''}`,
            tags: list.tags,
          },
          normalizedQuery
        ),
      }))

    const fixResults = FIX_GUIDES
      .filter(guide =>
        [
          guide.title,
          guide.summary,
          guide.description,
          guide.clusterTitle,
          guide.platformLabel,
          ...guide.tags,
          ...guide.symptoms,
        ].some(value => includesQuery(value, normalizedQuery))
      )
      .map(guide => ({
        id: `fix:${guide.id}`,
        type: 'fix' as const,
        title: guide.title,
        description: guide.summary,
        href: `/fixes/${guide.slug}`,
        category: 'Fixes',
        subcategory: guide.clusterTitle,
        badge: 'Fix Guide',
        score: getScore(
          {
            title: guide.title,
            description: `${guide.summary} ${guide.quickAnswer}`,
            category: `${guide.clusterTitle} ${guide.platformLabel}`,
            tags: [...guide.tags, ...guide.symptoms],
          },
          normalizedQuery
        ),
      }))

    const prompts = await getPublishedPrompts()
    const promptResults = prompts
      .filter(prompt =>
        [
          prompt.title,
          prompt.summary,
          prompt.description,
          prompt.categoryTitle,
          prompt.subcategory,
          prompt.audience,
          prompt.visualStyle,
          ...prompt.models,
          ...prompt.tags,
          ...prompt.bestFor,
        ].some(value => includesQuery(value, normalizedQuery))
      )
      .map(prompt => ({
        id: `prompt:${prompt.id}`,
        type: 'prompt' as const,
        title: prompt.title,
        description: prompt.summary,
        href: `/prompts/${prompt.slug}`,
        category: 'Prompt Hub',
        subcategory: prompt.subcategory,
        badge: 'Prompt',
        score: getScore(
          {
            title: prompt.title,
            description: `${prompt.summary} ${prompt.description}`,
            category: `${prompt.categoryTitle} ${prompt.subcategory}`,
            tags: [...prompt.models, ...prompt.tags, ...prompt.bestFor],
          },
          normalizedQuery
        ),
      }))

    const templates = await getPublishedTemplates()
    const templateResults = templates
      .filter(template =>
        [
          template.title,
          template.summary,
          template.description,
          template.categoryTitle,
          template.platformLabel,
          template.industry,
          template.style,
          ...template.tags,
          ...template.bestFor,
          ...template.sections,
        ].some(value => includesQuery(value, normalizedQuery))
      )
      .map(template => ({
        id: `template:${template.id}`,
        type: 'template' as const,
        title: template.title,
        description: template.summary,
        href: `/templates/${template.slug}`,
        category: 'UI Templates',
        subcategory: `${template.categoryTitle} | ${template.platformLabel}`,
        badge: template.industry,
        score: getScore(
          {
            title: template.title,
            description: `${template.summary} ${template.description}`,
            category: `${template.categoryTitle} ${template.platformLabel} ${template.industry}`,
            tags: [...template.tags, ...template.bestFor, ...template.sections],
          },
          normalizedQuery
        ),
      }))

    const careerTemplates = await getCareerTemplates()
    const careerResults = careerTemplates
      .filter(template =>
        [
          template.title,
          template.summary,
          template.description,
          template.categoryTitle,
          template.theme,
          template.audience,
          template.focus,
          ...template.tags,
          ...template.bestFor,
          ...template.sections,
        ].some(value => includesQuery(value, normalizedQuery))
      )
      .map(template => ({
        id: `career:${template.id}`,
        type: 'career' as const,
        title: template.title,
        description: template.summary,
        href: `/career/${template.slug}`,
        category: 'Career Universe',
        subcategory: template.categoryTitle,
        badge: 'Resume',
        score: getScore(
          {
            title: template.title,
            description: `${template.summary} ${template.description} ${template.focus}`,
            category: `${template.categoryTitle} ${template.theme} ${template.audience}`,
            tags: [...template.tags, ...template.bestFor, ...template.sections],
          },
          normalizedQuery
        ),
      }))

    return [
      ...toolResults,
      ...discoverResults,
      ...fixResults,
      ...promptResults,
      ...templateResults,
      ...careerResults,
    ]
      .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
      .slice(0, limit)
      .map(({ score: _score, ...result }) => result)
  },
  ['site-search-results'],
  { revalidate: 1800, tags: ['career', 'discover', 'prompts', 'templates', 'tools'] }
)

export async function searchSiteContent(query: string, limit = 12): Promise<SiteSearchResult[]> {
  const normalizedQuery = normalize(query)

  if (normalizedQuery.length < 2) {
    return []
  }

  return getCachedSearchSiteContent(normalizedQuery, limit)
}
