import 'server-only'
import { unstable_cache, revalidateTag } from 'next/cache'
import { resolveToolSlug, TOOLS, VIDEO_DOWNLOADER_TOOL_SLUGS, type Tool, type ToolTag } from './tools-data'
import { applyLocalToolOverrides, saveLocalToolUpdate } from './tool-local-store'

const VALID_TOOL_TAGS = new Set<ToolTag>(['new', 'trending', 'beta', 'hot', 'free'])

export function isExternalToolStoreConfigured() {
  return false
}

function normalizeTool(rawTool: Partial<Tool> | null | undefined, fallbackId?: string): Tool | null {
  if (!rawTool || typeof rawTool !== 'object') {
    return null
  }

  const id =
    typeof rawTool.id === 'string' && rawTool.id.trim().length > 0
      ? rawTool.id
      : fallbackId || ''
  const name = typeof rawTool.name === 'string' ? rawTool.name : ''
  const description = typeof rawTool.description === 'string' ? rawTool.description : ''
  const category = typeof rawTool.category === 'string' ? rawTool.category : ''
  const categorySlug = typeof rawTool.categorySlug === 'string' ? rawTool.categorySlug : ''
  const icon =
    typeof rawTool.icon === 'string' && rawTool.icon.trim().length > 0
      ? rawTool.icon
      : 'Wrench'
  const slug = typeof rawTool.slug === 'string' ? rawTool.slug : ''

  if (!id || !name || !category || !categorySlug || !slug) {
    return null
  }

  const tags = Array.isArray(rawTool.tags)
    ? rawTool.tags.filter((tag): tag is ToolTag => VALID_TOOL_TAGS.has(tag as ToolTag))
    : []

  const acceptedFormats = Array.isArray(rawTool.acceptedFormats)
    ? rawTool.acceptedFormats.filter((format): format is string => typeof format === 'string')
    : undefined

  return {
    id,
    name,
    description,
    category,
    categorySlug,
    icon,
    slug,
    tags,
    popular: Boolean(rawTool.popular),
    implemented: typeof rawTool.implemented === 'boolean' ? rawTool.implemented : false,
    enabled: typeof rawTool.enabled === 'boolean' ? rawTool.enabled : true,
    inputType: rawTool.inputType,
    outputType: rawTool.outputType,
    acceptedFormats,
    createdAt: typeof rawTool.createdAt === 'string' ? rawTool.createdAt : undefined,
    updatedAt: typeof rawTool.updatedAt === 'string' ? rawTool.updatedAt : undefined,
  }
}

function applyDefaultToolGuards(tool: Tool): Tool {
  const videoDownloadersEnabled =
    process.env.VIDEO_DOWNLOADERS_ENABLED === 'true' ||
    process.env.NEXT_PUBLIC_VIDEO_DOWNLOADERS_ENABLED === 'true'

  if (!videoDownloadersEnabled && VIDEO_DOWNLOADER_TOOL_SLUGS.has(tool.slug)) {
    return {
      ...tool,
      enabled: false,
    }
  }

  return tool
}

async function getNormalizedLocalTools() {
  const normalizedTools = TOOLS.map(tool => normalizeTool(tool, tool.id))
    .filter((tool): tool is Tool => Boolean(tool))
    .map(applyDefaultToolGuards)
  return applyLocalToolOverrides(normalizedTools)
}

const TOOL_CACHE_VERSION = `${TOOLS.length}:${TOOLS.map(tool => tool.slug).join('|')}`

export const getAdminTools = unstable_cache(
  async (): Promise<Tool[]> => {
    return getNormalizedLocalTools()
  },
  ['admin-all-tools-cache-v2', TOOL_CACHE_VERSION],
  { revalidate: 3600, tags: ['tools'] }
)

export const getTools = unstable_cache(
  async (): Promise<Tool[]> => {
    const tools = await getNormalizedLocalTools()
    return tools.filter(tool => tool.enabled !== false)
  },
  ['all-public-tools-cache-v2', TOOL_CACHE_VERSION],
  { revalidate: 3600, tags: ['tools'] }
)

export const getToolBySlug = unstable_cache(
  async (slug: string): Promise<Tool | null> => {
    const normalizedSlug = resolveToolSlug(slug)
    const tools = await getTools()
    return tools.find(tool => tool.slug === normalizedSlug) || null
  },
  ['tool-by-slug-cache-v2', TOOL_CACHE_VERSION],
  { revalidate: 3600, tags: ['tools'] }
)

export const getToolsByCategory = unstable_cache(
  async (categorySlug: string): Promise<Tool[]> => {
    const tools = await getTools()
    return tools.filter(tool => tool.categorySlug === categorySlug && tool.enabled !== false)
  },
  ['tools-by-category-cache-v2', TOOL_CACHE_VERSION],
  { revalidate: 3600, tags: ['tools'] }
)

export async function updateTool(id: string, updates: Partial<Tool>) {
  await saveLocalToolUpdate(id, updates)
  revalidateTag('tools')
  return true
}

export async function seedExternalStoreWithLocalTools() {
  return {
    success: false,
    count: 0,
    message: 'External database sync is disabled. Tools are now local-only.',
  }
}
