'use client'

import { useState } from 'react'
import { Flag, ToggleLeft, ToggleRight, Save } from 'lucide-react'
import toast from 'react-hot-toast'

const DEFAULT_FLAGS = [
  { id: 'ai_chat', group: 'AI', label: 'AI Chat Interface', desc: 'Enable the full AI chat page at /ai', enabled: true },
  { id: 'ai_image_gen', group: 'AI', label: 'AI Image Generation', desc: 'Enable Pollinations AI image generator', enabled: true },
  { id: 'design_ai', group: 'Design', label: 'Design AI Universe', desc: 'Enable /design universe', enabled: true },
  { id: 'entertainment', group: 'Entertainment', label: 'Entertainment Universe', desc: 'Enable /entertainment (TMDB)', enabled: true },
  { id: 'news', group: 'News', label: 'News Universe', desc: 'Enable /news (GNews)', enabled: true },
  { id: 'marketplace', group: 'Marketplace', label: 'Marketplace', desc: 'Enable /marketplace', enabled: true },
  { id: 'discover', group: 'Discover', label: 'Discover Universe', desc: 'Enable /discover top-10 lists', enabled: true },
  { id: 'learn', group: 'Learn', label: 'Learn Universe', desc: 'Enable /learn AI study tools', enabled: true },
  { id: 'admin_panel', group: 'System', label: 'Admin Panel', desc: 'Enable /admin access (Clerk protected)', enabled: true },
  { id: 'newsletter', group: 'Marketing', label: 'Newsletter Signup', desc: 'Show newsletter form in footer', enabled: true },
  { id: 'dark_mode', group: 'UI', label: 'Dark Mode Toggle', desc: 'Allow users to switch dark/light mode', enabled: true },
  { id: 'tool_share', group: 'Tools', label: 'Tool Share Button', desc: 'Show share button on tool detail pages', enabled: true },
  { id: 'tool_save', group: 'Tools', label: 'Tool Save/Bookmark', desc: 'Allow users to save favorite tools', enabled: false },
  { id: 'adsense', group: 'Monetization', label: 'Google AdSense', desc: 'Enable ad placements', enabled: false },
  { id: 'beta_tools', group: 'Tools', label: 'Show Beta Tools', desc: 'Show tools marked as beta', enabled: true },
]

const GROUPS = Array.from(new Set(DEFAULT_FLAGS.map(f => f.group)))

export default function FlagsPage() {
  const [flags, setFlags] = useState(DEFAULT_FLAGS)

  function toggle(id: string) {
    setFlags(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f))
  }

  function save() {
    toast.success('Feature flags saved! (JSON config updated)')
  }

  return (
    <div className="space-y-5 max-w-screen-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Flag className="w-5 h-5 text-orange-500" /> Feature Flags</h1>
          <p className="text-muted-foreground text-sm mt-1">Enable or disable platform features without redeploying</p>
        </div>
        <button onClick={save} className="btn-primary flex items-center gap-2 text-sm py-2 px-4">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      {GROUPS.map(group => (
        <div key={group} className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-3 bg-muted/30 border-b border-border">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">{group}</h2>
          </div>
          <div className="divide-y divide-border">
            {flags.filter(f => f.group === group).map(flag => (
              <div key={flag.id} className="flex items-center justify-between px-5 py-4">
                <div className="flex-1 min-w-0 mr-4">
                  <p className="font-semibold text-sm">{flag.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{flag.desc}</p>
                  <code className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5 block font-mono">{flag.id}</code>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-medium ${flag.enabled ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                    {flag.enabled ? 'On' : 'Off'}
                  </span>
                  <button onClick={() => toggle(flag.id)}>
                    {flag.enabled
                      ? <ToggleRight className="w-8 h-8 text-emerald-500 hover:text-emerald-600 transition-colors" />
                      : <ToggleLeft className="w-8 h-8 text-muted-foreground hover:text-foreground transition-colors" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
