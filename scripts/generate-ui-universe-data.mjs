import fs from 'node:fs'
import path from 'node:path'

const categories = [
  { id: 'all', label: 'All UI', icon: 'Sparkles' },
  { id: 'button', label: 'Buttons', icon: 'RectangleHorizontal' },
  { id: 'checkbox', label: 'Checkboxes', icon: 'CheckSquare' },
  { id: 'radio', label: 'Radios', icon: 'CircleDot' },
  { id: 'shadow', label: 'Shadows', icon: 'SquareDashedBottom' },
  { id: 'shape', label: 'Shapes', icon: 'Shapes' },
  { id: 'navbar', label: 'Navbars', icon: 'Menu' },
  { id: 'hero', label: 'Hero Sections', icon: 'PanelsTopLeft' },
  { id: 'feature', label: 'Feature Sections', icon: 'LayoutPanelTop' },
  { id: 'testimonial', label: 'Testimonials', icon: 'MessageSquareQuote' },
  { id: 'pricing', label: 'Pricing Sections', icon: 'BadgeDollarSign' },
  { id: 'faq', label: 'FAQ Sections', icon: 'MessagesSquare' },
  { id: 'cta', label: 'CTA Sections', icon: 'Megaphone' },
  { id: 'stats', label: 'Stats Blocks', icon: 'BarChart3' },
  { id: 'footer', label: 'Footers', icon: 'Rows3' },
  { id: 'card', label: 'Cards', icon: 'PanelsTopLeft' },
  { id: 'form', label: 'Forms', icon: 'FileText' },
  { id: 'auth', label: 'Auth UI', icon: 'ShieldCheck' },
  { id: 'dashboard', label: 'Dashboards', icon: 'LayoutDashboard' },
  { id: 'sidebar', label: 'Sidebars', icon: 'PanelLeftClose' },
  { id: 'table', label: 'Tables', icon: 'Table2' },
  { id: 'search', label: 'Search UI', icon: 'Search' },
  { id: 'filter', label: 'Filter UI', icon: 'ListFilter' },
  { id: 'ecommerce', label: 'Commerce UI', icon: 'ShoppingBag' },
]

const buttonThemes = [
  ['indigo', 'Indigo', '#4f46e5', '#ffffff', '#eef2ff', '#c7d2fe', '#818cf8'],
  ['cyan', 'Cyan', '#0891b2', '#ffffff', '#ecfeff', '#a5f3fc', '#22d3ee'],
  ['emerald', 'Emerald', '#059669', '#ffffff', '#ecfdf5', '#a7f3d0', '#34d399'],
  ['rose', 'Rose', '#e11d48', '#ffffff', '#fff1f2', '#fecdd3', '#fb7185'],
  ['amber', 'Amber', '#d97706', '#111827', '#fffbeb', '#fde68a', '#f59e0b'],
  ['violet', 'Violet', '#7c3aed', '#ffffff', '#f5f3ff', '#ddd6fe', '#a78bfa'],
  ['sky', 'Sky', '#0284c7', '#ffffff', '#f0f9ff', '#bae6fd', '#38bdf8'],
  ['slate', 'Slate', '#0f172a', '#ffffff', '#f8fafc', '#cbd5e1', '#64748b'],
  ['lime', 'Lime', '#65a30d', '#ffffff', '#f7fee7', '#d9f99d', '#a3e635'],
  ['orange', 'Orange', '#ea580c', '#ffffff', '#fff7ed', '#fdba74', '#fb923c'],
  ['pink', 'Pink', '#db2777', '#ffffff', '#fdf2f8', '#fbcfe8', '#f472b6'],
  ['teal', 'Teal', '#0f766e', '#ffffff', '#f0fdfa', '#99f6e4', '#2dd4bf'],
]

const checkboxThemes = [
  ['indigo', '#4f46e5', '#c7d2fe', '#eef2ff'],
  ['cyan', '#0891b2', '#a5f3fc', '#ecfeff'],
  ['emerald', '#059669', '#a7f3d0', '#ecfdf5'],
  ['rose', '#e11d48', '#fecdd3', '#fff1f2'],
  ['amber', '#d97706', '#fde68a', '#fffbeb'],
  ['violet', '#7c3aed', '#ddd6fe', '#f5f3ff'],
  ['sky', '#0284c7', '#bae6fd', '#f0f9ff'],
  ['slate', '#334155', '#cbd5e1', '#f8fafc'],
  ['lime', '#65a30d', '#d9f99d', '#f7fee7'],
  ['orange', '#ea580c', '#fdba74', '#fff7ed'],
  ['pink', '#db2777', '#fbcfe8', '#fdf2f8'],
  ['teal', '#0f766e', '#99f6e4', '#f0fdfa'],
  ['red', '#dc2626', '#fecaca', '#fef2f2'],
]

const radioThemes = [
  ['indigo', '#4f46e5', '#c7d2fe', '#eef2ff'],
  ['cyan', '#0891b2', '#a5f3fc', '#ecfeff'],
  ['emerald', '#059669', '#a7f3d0', '#ecfdf5'],
  ['rose', '#e11d48', '#fecdd3', '#fff1f2'],
  ['amber', '#d97706', '#fde68a', '#fffbeb'],
  ['violet', '#7c3aed', '#ddd6fe', '#f5f3ff'],
  ['sky', '#0284c7', '#bae6fd', '#f0f9ff'],
  ['slate', '#334155', '#cbd5e1', '#f8fafc'],
  ['lime', '#65a30d', '#d9f99d', '#f7fee7'],
  ['pink', '#db2777', '#fbcfe8', '#fdf2f8'],
  ['teal', '#0f766e', '#99f6e4', '#f0fdfa'],
]

const shadowThemes = [
  ['slate', '#0f172a', 'rgba(15,23,42,0.18)', '#ffffff'],
  ['indigo', '#4f46e5', 'rgba(79,70,229,0.22)', '#eef2ff'],
  ['cyan', '#0891b2', 'rgba(8,145,178,0.22)', '#ecfeff'],
  ['emerald', '#059669', 'rgba(5,150,105,0.22)', '#ecfdf5'],
  ['rose', '#e11d48', 'rgba(225,29,72,0.18)', '#fff1f2'],
  ['amber', '#d97706', 'rgba(217,119,6,0.18)', '#fffbeb'],
  ['violet', '#7c3aed', 'rgba(124,58,237,0.2)', '#f5f3ff'],
  ['sky', '#0284c7', 'rgba(2,132,199,0.2)', '#f0f9ff'],
  ['lime', '#65a30d', 'rgba(101,163,13,0.2)', '#f7fee7'],
  ['orange', '#ea580c', 'rgba(234,88,12,0.18)', '#fff7ed'],
  ['pink', '#db2777', 'rgba(219,39,119,0.18)', '#fdf2f8'],
  ['teal', '#0f766e', 'rgba(15,118,110,0.2)', '#f0fdfa'],
]

const buttonPatterns = [
  'Solid',
  'Outline',
  'Soft',
  'Lift',
  'Shine',
  'Slide',
  'Glow',
  'Pill',
]

const checkboxPatterns = [
  'Classic',
  'Soft',
  'Inset',
  'Glow',
  'Chip',
]

const radioPatterns = [
  'Classic',
  'Soft',
  'Ring',
]

const shadowPatterns = [
  'Soft',
  'Lifted',
  'Layered',
  'Inset',
  'Glow',
  'Hard Edge',
  'Floating',
  'Ambient',
]

const modernCategories = [
  ['navbar', 'Navbar'],
  ['hero', 'Hero'],
  ['feature', 'Feature'],
  ['testimonial', 'Testimonial'],
  ['pricing', 'Pricing'],
  ['faq', 'FAQ'],
  ['cta', 'CTA'],
  ['stats', 'Stats'],
  ['footer', 'Footer'],
  ['card', 'Card'],
  ['form', 'Form'],
  ['auth', 'Auth'],
  ['dashboard', 'Dashboard'],
  ['sidebar', 'Sidebar'],
  ['table', 'Table'],
  ['search', 'Search'],
  ['filter', 'Filter'],
  ['ecommerce', 'Commerce'],
]

const sectionThemes = [
  ['slate', '#0f172a', '#ffffff', '#f8fafc', '#cbd5e1', '#4f46e5'],
  ['indigo', '#3730a3', '#ffffff', '#eef2ff', '#c7d2fe', '#6366f1'],
  ['emerald', '#065f46', '#ffffff', '#ecfdf5', '#a7f3d0', '#10b981'],
  ['rose', '#9f1239', '#ffffff', '#fff1f2', '#fecdd3', '#f43f5e'],
  ['amber', '#92400e', '#111827', '#fffbeb', '#fde68a', '#f59e0b'],
  ['sky', '#075985', '#ffffff', '#f0f9ff', '#bae6fd', '#0ea5e9'],
]

const effects = []

function pad(value) {
  return String(value).padStart(3, '0')
}

function pushEffect(effect) {
  effects.push({
    ...effect,
    previewClass: effect.id,
  })
}

function sectionFrameCss(className, theme) {
  const [, primary, foreground, soft, border, accent] = theme
  return `
.${className} {
  width: 100%;
  max-width: 380px;
  min-height: 150px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid ${border};
  background: #ffffff;
  color: #0f172a;
  font-family: Inter, system-ui, sans-serif;
  display: grid;
  gap: 10px;
}
.${className} * { box-sizing: border-box; }
.${className} .muted { color: #64748b; }
.${className} .pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid ${border};
  background: ${soft};
  color: ${primary};
  font: 700 12px/1 Inter, system-ui, sans-serif;
}
.${className} .primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 14px;
  border-radius: 10px;
  background: ${primary};
  color: ${foreground};
  font: 700 12px/1 Inter, system-ui, sans-serif;
}
.${className} .ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid ${border};
  background: #fff;
  color: ${primary};
  font: 700 12px/1 Inter, system-ui, sans-serif;
}
.${className} .chip {
  height: 8px;
  border-radius: 999px;
  background: ${accent};
}
.${className} .surface {
  border: 1px solid ${border};
  background: ${soft};
  border-radius: 14px;
}
`
}

function buildModernPreview(className, categoryId, variant, theme) {
  const [, primary, foreground, soft, border, accent] = theme
  const css = sectionFrameCss(className, theme)
  let html = ''
  const layout = variant % 3

  if (categoryId === 'navbar') {
    html = layout === 0
      ? `<div class="${className}"><div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><div style="display:flex;align-items:center;gap:10px"><span style="width:30px;height:30px;border-radius:10px;background:${primary};display:block"></span><strong>Acme UI</strong></div><div style="display:flex;gap:8px"><span class="pill">Docs</span><span class="ghost">Login</span><span class="primary">Start</span></div></div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px"><div class="chip"></div><div class="chip" style="opacity:.7"></div><div class="chip" style="opacity:.45"></div></div></div>`
      : layout === 1
        ? `<div class="${className}"><div style="display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px"><strong style="font-size:15px">Northstar</strong><div style="display:flex;justify-content:center;gap:10px" class="muted"><span>Home</span><span>Work</span><span>Pricing</span></div><span class="primary">Book demo</span></div><div class="surface" style="height:36px;display:flex;align-items:center;padding:0 12px" class="muted">Trusted by 9,400+ teams</div></div>`
        : `<div class="${className}"><div style="display:flex;align-items:center;justify-content:space-between"><div style="display:flex;gap:8px"><span class="pill">Studio</span><span class="pill">Docs</span></div><span class="ghost">Contact</span></div><div class="surface" style="display:grid;grid-template-columns:1fr auto;gap:10px;padding:10px 12px"><strong style="font-size:14px">Premium navigation shell</strong><span style="width:26px;height:26px;border-radius:9px;background:${primary};display:block"></span></div></div>`
  } else if (categoryId === 'hero') {
    html = layout === 0
      ? `<div class="${className}"><span class="pill">New</span><div style="display:grid;gap:6px"><strong style="font-size:20px;line-height:1.05">Launch faster with modern UI</strong><span class="muted" style="font-size:12px">Clean hero composition with strong CTA and proof.</span></div><div style="display:flex;gap:8px"><span class="primary">Get started</span><span class="ghost">Preview</span></div><div class="surface" style="height:42px;display:grid;grid-template-columns:1.4fr .8fr;gap:8px;padding:8px"><div style="border-radius:8px;background:#fff"></div><div style="border-radius:8px;background:${accent};opacity:.18"></div></div></div>`
      : layout === 1
        ? `<div class="${className}" style="grid-template-columns:1.2fr .8fr;align-items:stretch"><div style="display:grid;gap:8px"><span class="pill">Benchmark</span><strong style="font-size:22px;line-height:1.02">Sharper launches for product teams</strong><span class="muted" style="font-size:12px">Poster-style hero with compact proof and focused action.</span><div style="display:flex;gap:8px"><span class="primary">Start free</span><span class="ghost">View stack</span></div></div><div class="surface" style="min-height:116px;background:linear-gradient(145deg, color-mix(in srgb, ${accent} 16%, white), #fff);display:grid;place-items:center"><div style="width:70%;height:58%;border-radius:16px;background:${primary};opacity:.12"></div></div></div>`
        : `<div class="${className}"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px"><div style="display:grid;gap:6px"><strong style="font-size:20px;line-height:1.04">Build calm, premium websites</strong><span class="muted" style="font-size:12px">High-conversion hero with visual balance.</span></div><span class="pill">2026</span></div><div class="surface" style="padding:10px;display:grid;grid-template-columns:1fr 1fr;gap:10px"><div style="height:52px;border-radius:12px;background:#fff;border:1px solid ${border}"></div><div style="display:grid;gap:8px"><div style="height:10px;border-radius:999px;background:${accent};opacity:.22"></div><div style="height:10px;border-radius:999px;background:${accent};opacity:.14"></div><span class="primary" style="width:max-content">Launch</span></div></div></div>`
  } else if (categoryId === 'feature') {
    html = layout === 0
      ? `<div class="${className}"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px"><div class="surface" style="padding:10px"><div style="width:28px;height:28px;border-radius:10px;background:${accent};opacity:.18"></div><div style="margin-top:10px;font-weight:700;font-size:12px">Fast</div></div><div class="surface" style="padding:10px"><div style="width:28px;height:28px;border-radius:10px;background:${accent};opacity:.28"></div><div style="margin-top:10px;font-weight:700;font-size:12px">Secure</div></div><div class="surface" style="padding:10px"><div style="width:28px;height:28px;border-radius:10px;background:${accent};opacity:.38"></div><div style="margin-top:10px;font-weight:700;font-size:12px">Scalable</div></div></div><span class="muted" style="font-size:12px">Feature grid for SaaS and service sites.</span></div>`
      : layout === 1
        ? `<div class="${className}"><div class="surface" style="padding:12px;display:grid;grid-template-columns:.8fr 1.2fr;gap:12px"><div style="display:grid;gap:8px"><span style="height:30px;border-radius:10px;background:${accent};opacity:.18"></span><span style="height:30px;border-radius:10px;background:${accent};opacity:.28"></span></div><div style="display:grid;gap:8px"><strong style="font-size:14px">Feature stack</strong><span class="muted" style="font-size:12px">One highlighted capability with two supporting rows.</span><span class="primary" style="width:max-content">Explore</span></div></div></div>`
        : `<div class="${className}"><div style="display:grid;gap:8px">${['Workflow','Automation','Security'].map((t,i)=>`<div class="surface" style="padding:10px 12px;display:flex;align-items:center;justify-content:space-between"><strong style="font-size:12px">${t}</strong><span style="width:22px;height:22px;border-radius:8px;background:${accent};opacity:${0.18 + i*0.1};display:block"></span></div>`).join('')}</div></div>`
  } else if (categoryId === 'testimonial') {
    html = `<div class="${className}"><div class="surface" style="padding:12px"><div style="display:flex;gap:10px;align-items:center"><span style="width:34px;height:34px;border-radius:999px;background:${accent};opacity:.25;display:block"></span><div><div style="font-weight:700;font-size:12px">Maya Rao</div><div class="muted" style="font-size:11px">Product Designer</div></div></div><p style="margin:10px 0 0;font-size:12px;line-height:1.5">“This layout feels premium without becoming noisy.”</p></div><div style="display:flex;gap:5px">${'<span style="width:10px;height:10px;border-radius:999px;background:'+accent+';opacity:.75;display:block"></span>'.repeat(5)}</div></div>`
  } else if (categoryId === 'pricing') {
    html = layout === 0
      ? `<div class="${className}"><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div class="surface" style="padding:12px"><div style="font-weight:700;font-size:12px">Starter</div><div style="margin-top:8px;font-size:22px;font-weight:800">$19</div><div class="muted" style="font-size:11px">per month</div><div style="margin-top:12px;display:grid;gap:6px">${[1,2,3].map(()=>`<span style="height:8px;border-radius:999px;background:${accent};opacity:.14;display:block"></span>`).join('')}</div></div><div style="padding:12px;border-radius:16px;background:${primary};color:${foreground};box-shadow:0 20px 28px -24px color-mix(in srgb, ${primary} 60%, transparent)"><div style="display:flex;justify-content:space-between;align-items:center"><div style="font-weight:700;font-size:12px">Pro</div><span style="font-size:10px;opacity:.78">Popular</span></div><div style="margin-top:8px;font-size:22px;font-weight:800">$49</div><div style="font-size:11px;opacity:.82">best value</div></div></div></div>`
      : layout === 1
        ? `<div class="${className}"><div class="surface" style="padding:14px;display:grid;gap:12px"><div style="display:flex;justify-content:space-between;align-items:flex-start"><div><div style="font-size:12px;font-weight:700">Scale plan</div><div style="margin-top:6px;font-size:24px;font-weight:800">$89</div></div><span class="pill">Annual</span></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${['Seats','API','Support'].map(label=>`<div style="padding:10px;border-radius:12px;background:#fff;border:1px solid ${border}"><div class="muted" style="font-size:10px">${label}</div><div style="margin-top:6px;font-size:12px;font-weight:700">Included</div></div>`).join('')}</div><div style="display:flex;justify-content:space-between;align-items:center"><span class="ghost">Compare</span><span class="primary">Choose</span></div></div></div>`
        : `<div class="${className}" style="grid-template-columns:.95fr 1.05fr;gap:10px"><div style="display:grid;gap:8px"><strong style="font-size:18px;line-height:1.08">Pricing that grows with your product</strong><span class="muted" style="font-size:12px">Simple tiers, sharp emphasis, easy scanning.</span><div style="display:flex;gap:8px"><span class="primary">Start free</span><span class="ghost">Talk sales</span></div></div><div class="surface" style="padding:12px;display:grid;gap:8px"><div style="display:flex;justify-content:space-between"><strong style="font-size:12px">Enterprise</strong><span class="pill">Custom</span></div><div style="height:10px;border-radius:999px;background:${accent};opacity:.18"></div><div style="height:10px;border-radius:999px;background:${accent};opacity:.12"></div><div style="height:10px;border-radius:999px;background:${accent};opacity:.09"></div></div></div>`
  } else if (categoryId === 'faq') {
    html = `<div class="${className}"><div class="surface" style="padding:10px 12px;display:flex;justify-content:space-between;align-items:center"><strong style="font-size:12px">How does billing work?</strong><span class="pill">+</span></div><div class="surface" style="padding:10px 12px;display:flex;justify-content:space-between;align-items:center"><strong style="font-size:12px">Can I cancel anytime?</strong><span class="pill">+</span></div><div class="surface" style="padding:10px 12px;display:flex;justify-content:space-between;align-items:center"><strong style="font-size:12px">Is there team access?</strong><span class="pill">+</span></div></div>`
  } else if (categoryId === 'cta') {
    html = `<div class="${className}" style="background:${soft}"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><div><div style="font-weight:800;font-size:18px">Ready to launch?</div><div class="muted" style="font-size:12px;margin-top:4px">Turn traffic into signups with a focused CTA.</div></div><span class="primary">Start free</span></div></div>`
  } else if (categoryId === 'stats') {
    html = `<div class="${className}"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px"><div class="surface" style="padding:10px"><div style="font-size:20px;font-weight:800">42K</div><div class="muted" style="font-size:11px">Visits</div></div><div class="surface" style="padding:10px"><div style="font-size:20px;font-weight:800">12%</div><div class="muted" style="font-size:11px">CVR</div></div><div class="surface" style="padding:10px"><div style="font-size:20px;font-weight:800">4.9</div><div class="muted" style="font-size:11px">Rating</div></div></div></div>`
  } else if (categoryId === 'footer') {
    html = `<div class="${className}"><div style="display:flex;justify-content:space-between;align-items:center"><strong>Brandverse</strong><span class="muted" style="font-size:12px">Built for modern products</span></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px"><div class="muted" style="font-size:12px;display:grid;gap:6px"><span>Product</span><span>Pricing</span><span>Docs</span></div><div class="muted" style="font-size:12px;display:grid;gap:6px"><span>Company</span><span>About</span><span>Careers</span></div><div class="muted" style="font-size:12px;display:grid;gap:6px"><span>Social</span><span>X</span><span>GitHub</span></div></div></div>`
  } else if (categoryId === 'card') {
    html = layout === 0
      ? `<div class="${className}"><div class="surface" style="padding:12px;display:grid;gap:10px"><div style="height:60px;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb, ${accent} 20%, white),color-mix(in srgb, ${primary} 16%, white));border:1px solid ${border}"></div><div style="font-weight:800;font-size:14px">Modern content card</div><div class="muted" style="font-size:12px">Balanced media, copy and action.</div><div style="display:flex;justify-content:space-between;align-items:center"><span class="pill">Featured</span><span class="primary">Open</span></div></div></div>`
      : layout === 1
        ? `<div class="${className}" style="grid-template-columns:.92fr 1.08fr;gap:10px"><div class="surface" style="min-height:138px;background:linear-gradient(160deg,color-mix(in srgb, ${accent} 22%, white),#fff);display:grid;place-items:end;padding:12px"><span class="pill">New</span></div><div style="display:grid;gap:8px;align-content:center"><strong style="font-size:16px">Editorial product card</strong><span class="muted" style="font-size:12px">Image-led layout with clear hierarchy and action.</span><div style="display:flex;gap:8px"><span class="primary">Read more</span><span class="ghost">Save</span></div></div></div>`
        : `<div class="${className}"><div class="surface" style="padding:14px;display:grid;gap:10px"><div style="display:flex;justify-content:space-between;align-items:center"><span class="pill">Collection</span><span style="width:28px;height:28px;border-radius:10px;background:${accent};opacity:.2"></span></div><strong style="font-size:15px;line-height:1.2">Compact profile card with premium spacing</strong><div class="muted" style="font-size:12px;line-height:1.55">Useful for content, product highlights, and saved items.</div></div></div>`
  } else if (categoryId === 'form') {
    html = layout === 0
      ? `<div class="${className}"><div class="surface" style="padding:10px"><div class="muted" style="font-size:11px">Email</div><div style="margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid ${border};display:flex;align-items:center;padding:0 10px;font-size:12px;color:#94a3b8">hello@brand.com</div></div><div class="surface" style="padding:10px"><div class="muted" style="font-size:11px">Password</div><div style="margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid ${border};display:flex;align-items:center;padding:0 10px;font-size:12px;color:#94a3b8">••••••••</div></div><div style="display:flex;justify-content:flex-end"><span class="primary">Submit</span></div></div>`
      : layout === 1
        ? `<div class="${className}"><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div class="surface" style="padding:10px"><div class="muted" style="font-size:11px">First name</div><div style="margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid ${border};display:flex;align-items:center;padding:0 10px;font-size:12px">Maya</div></div><div class="surface" style="padding:10px"><div class="muted" style="font-size:11px">Team size</div><div style="margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid ${border};display:flex;align-items:center;padding:0 10px;font-size:12px">11-50</div></div></div><div class="surface" style="padding:10px"><div class="muted" style="font-size:11px">Message</div><div style="margin-top:6px;height:48px;border-radius:10px;background:#fff;border:1px solid ${border};padding:10px;font-size:12px;color:#94a3b8">Tell us about your project</div></div></div>`
        : `<div class="${className}"><div class="surface" style="padding:12px;display:grid;gap:10px"><strong style="font-size:14px">Join the beta</strong><div style="height:36px;border-radius:12px;background:#fff;border:1px solid ${border};display:flex;align-items:center;padding:0 12px;font-size:12px;color:#94a3b8">Work email</div><div style="display:flex;gap:8px"><span class="primary">Request invite</span><span class="ghost">Privacy</span></div></div></div>`
  } else if (categoryId === 'auth') {
    html = layout === 0
      ? `<div class="${className}"><div style="display:grid;place-items:center;gap:8px"><span style="width:36px;height:36px;border-radius:12px;background:${primary};display:block"></span><strong style="font-size:16px">Welcome back</strong><span class="muted" style="font-size:12px">Sign in to access your workspace.</span></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><span class="ghost">Google</span><span class="primary">Email</span></div></div>`
      : layout === 1
        ? `<div class="${className}"><div class="surface" style="padding:12px;display:grid;gap:10px"><div style="display:flex;justify-content:space-between;align-items:center"><strong style="font-size:15px">Admin access</strong><span class="pill">Secure</span></div><div style="height:34px;border-radius:10px;background:#fff;border:1px solid ${border};display:flex;align-items:center;padding:0 10px;font-size:12px;color:#94a3b8">name@company.com</div><div style="display:flex;gap:8px"><span class="primary">Continue</span><span class="ghost">SSO</span></div></div></div>`
        : `<div class="${className}" style="grid-template-columns:.95fr 1.05fr;gap:12px"><div style="border-radius:14px;background:linear-gradient(145deg, color-mix(in srgb, ${accent} 16%, white), #fff);min-height:120px"></div><div style="display:grid;gap:8px;align-content:center"><strong style="font-size:16px">Create your account</strong><span class="muted" style="font-size:12px">Fast auth shell for premium products.</span><span class="primary" style="width:max-content">Join now</span></div></div>`
  } else if (categoryId === 'dashboard') {
    html = layout === 0
      ? `<div class="${className}"><div style="display:grid;grid-template-columns:1.15fr .85fr;gap:10px"><div class="surface" style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:center"><div style="font-weight:700;font-size:12px">Revenue</div><span class="pill">+18%</span></div><div style="margin-top:12px;height:60px;display:grid;grid-template-columns:repeat(6,1fr);gap:6px;align-items:end">${[18,34,22,45,30,52].map(h=>`<span style="display:block;border-radius:8px 8px 0 0;background:${accent};height:${h}px;opacity:.74"></span>`).join('')}</div></div><div style="display:grid;gap:10px"><div class="surface" style="padding:10px"><div style="font-size:18px;font-weight:800">18.4%</div><div class="muted" style="font-size:11px">Growth</div></div><div class="surface" style="padding:10px"><div style="font-size:18px;font-weight:800">124</div><div class="muted" style="font-size:11px">Orders</div></div></div></div></div>`
      : layout === 1
        ? `<div class="${className}" style="grid-template-columns:74px 1fr;align-items:stretch"><div class="surface" style="padding:10px;display:grid;gap:8px">${[1,2,3,4].map(i=>`<span style="height:28px;border-radius:10px;background:${i===1 ? accent : '#fff'};opacity:${i===1 ? '.18' : '1'};border:1px solid ${border};display:block"></span>`).join('')}</div><div style="display:grid;gap:10px"><div class="surface" style="padding:12px;display:grid;gap:8px"><div style="display:flex;justify-content:space-between"><strong style="font-size:12px">Overview</strong><span class="pill">Today</span></div><div style="height:44px;border-radius:12px;background:linear-gradient(145deg,color-mix(in srgb, ${accent} 16%, white),#fff)"></div></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">${['MRR','Users','Refunds'].map(label=>`<div class="surface" style="padding:10px"><div style="font-size:15px;font-weight:800">${label==='Refunds'?'2':'128'}</div><div class="muted" style="font-size:10px">${label}</div></div>`).join('')}</div></div></div>`
        : `<div class="${className}"><div class="surface" style="padding:14px;display:grid;gap:10px"><div style="display:flex;justify-content:space-between;align-items:center"><strong style="font-size:14px">Analytics board</strong><span style="width:32px;height:32px;border-radius:10px;background:${accent};opacity:.18"></span></div><div style="display:grid;grid-template-columns:1.1fr .9fr;gap:10px"><div style="height:74px;border-radius:14px;background:#fff;border:1px solid ${border};display:grid;grid-template-columns:repeat(7,1fr);gap:6px;align-items:end;padding:10px">${[16,24,18,32,28,40,36].map(h=>`<span style="display:block;height:${h}px;border-radius:999px;background:${accent};opacity:.75"></span>`).join('')}</div><div style="display:grid;gap:8px">${[1,2,3].map(i=>`<div style="height:18px;border-radius:999px;background:${accent};opacity:${0.12 + i * 0.05}"></div>`).join('')}</div></div></div></div>`
  } else if (categoryId === 'sidebar') {
    html = layout === 0
      ? `<div class="${className}" style="grid-template-columns:74px 1fr;align-items:stretch"><div class="surface" style="padding:10px;display:grid;gap:8px">${[1,2,3,4].map(i=>`<span style="height:28px;border-radius:10px;background:${i===1 ? accent : '#fff'};opacity:${i===1 ? '.18' : '1'};border:1px solid ${border};display:block"></span>`).join('')}</div><div class="surface" style="padding:12px"><div style="height:16px;width:60%;border-radius:999px;background:${accent};opacity:.2"></div><div style="margin-top:10px;display:grid;gap:8px">${[1,2,3].map(()=>`<span style="height:26px;border-radius:10px;background:#fff;border:1px solid ${border};display:block"></span>`).join('')}</div></div></div>`
      : layout === 1
        ? `<div class="${className}"><div class="surface" style="padding:12px;display:grid;grid-template-columns:.78fr 1.22fr;gap:12px"><div style="display:grid;gap:8px">${[1,2,3,4,5].map(i=>`<span style="height:26px;border-radius:10px;background:${i===3 ? accent : '#fff'};opacity:${i===3 ? '.18' : '1'};border:1px solid ${border};display:block"></span>`).join('')}</div><div style="display:grid;gap:8px"><strong style="font-size:14px">Workspace</strong><div style="height:52px;border-radius:12px;background:linear-gradient(145deg,color-mix(in srgb, ${accent} 14%, white),#fff);border:1px solid ${border}"></div><div style="height:22px;border-radius:999px;background:${accent};opacity:.12"></div><div style="height:22px;border-radius:999px;background:${accent};opacity:.08"></div></div></div></div>`
        : `<div class="${className}" style="padding:0;overflow:hidden"><div style="display:grid;grid-template-columns:82px 1fr;min-height:150px"><div style="background:${primary};padding:12px;display:grid;align-content:start;gap:8px">${[1,2,3,4].map(()=>`<span style="height:28px;border-radius:10px;background:rgba(255,255,255,.14);display:block"></span>`).join('')}</div><div style="padding:14px;display:grid;gap:10px"><strong style="font-size:15px">Compact app shell</strong><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">${[1,2,3,4].map(()=>`<div style="height:38px;border-radius:12px;background:#fff;border:1px solid ${border}"></div>`).join('')}</div></div></div></div>`
  } else if (categoryId === 'table') {
    html = `<div class="${className}"><div class="surface" style="padding:10px;display:grid;gap:6px">${[0,1,2,3].map((i)=>`<div style="display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px">${[0,1,2].map((j)=>`<span style="height:18px;border-radius:8px;background:${i===0 ? soft : '#fff'};border:1px solid ${border};display:block"></span>`).join('')}</div>`).join('')}</div></div>`
  } else if (categoryId === 'search') {
    html = layout === 0
      ? `<div class="${className}"><div style="height:42px;border-radius:14px;border:1px solid ${border};display:flex;align-items:center;padding:0 12px;background:#fff;color:#94a3b8;font-size:12px">Search components, templates, and docs</div><div style="display:grid;gap:8px">${[1,2,3].map(()=>`<div class="surface" style="padding:10px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:12px">Result item</span><span class="pill">Open</span></div>`).join('')}</div></div>`
      : layout === 1
        ? `<div class="${className}" style="grid-template-columns:1fr .92fr;gap:10px"><div style="display:grid;gap:8px"><strong style="font-size:16px">Universal search</strong><span class="muted" style="font-size:12px">Command-style search with cleaner result grouping.</span><div style="display:flex;gap:8px"><span class="pill">/</span><span class="ghost">Shortcut</span></div></div><div class="surface" style="padding:10px;display:grid;gap:8px"><div style="height:36px;border-radius:12px;background:#fff;border:1px solid ${border}"></div><div style="display:grid;gap:6px">${[1,2,3].map(()=>`<span style="height:18px;border-radius:8px;background:#fff;border:1px solid ${border}"></span>`).join('')}</div></div></div>`
        : `<div class="${className}"><div class="surface" style="padding:12px;display:grid;gap:10px"><div style="display:flex;justify-content:space-between;align-items:center"><strong style="font-size:13px">Search overlay</strong><span class="pill">3 results</span></div><div style="height:38px;border-radius:12px;background:#fff;border:1px solid ${border}"></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${['UI','Docs','Templates'].map(item=>`<div style="padding:10px;border-radius:12px;background:#fff;border:1px solid ${border};font-size:11px;font-weight:700">${item}</div>`).join('')}</div></div></div>`
  } else if (categoryId === 'filter') {
    html = layout === 0
      ? `<div class="${className}"><div style="display:flex;gap:8px;flex-wrap:wrap">${['All','Popular','New','Free'].map((t,i)=>`<span class="${i===0?'primary':'ghost'}">${t}</span>`).join('')}</div><div class="surface" style="padding:10px;display:grid;gap:8px">${[1,2,3].map(()=>`<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:12px">Filter row</span><span style="width:34px;height:20px;border-radius:999px;background:${soft};display:block;border:1px solid ${border}"></span></div>`).join('')}</div></div>`
      : layout === 1
        ? `<div class="${className}" style="grid-template-columns:.88fr 1.12fr;gap:10px"><div class="surface" style="padding:12px;display:grid;gap:8px">${['Price','Category','Platform'].map(item=>`<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:12px;font-weight:700">${item}</span><span style="width:34px;height:20px;border-radius:999px;background:#fff;border:1px solid ${border};display:block"></span></div>`).join('')}</div><div style="display:grid;gap:8px"><div style="display:flex;gap:8px;flex-wrap:wrap">${['UI','CSS','React'].map((t,i)=>`<span class="${i===1?'primary':'ghost'}">${t}</span>`).join('')}</div><div class="surface" style="padding:12px;height:100%"><div style="height:18px;border-radius:999px;background:${accent};opacity:.16"></div><div style="margin-top:10px;display:grid;gap:6px">${[1,2,3].map(()=>`<span style="height:16px;border-radius:8px;background:#fff;border:1px solid ${border}"></span>`).join('')}</div></div></div></div>`
        : `<div class="${className}"><div class="surface" style="padding:12px;display:grid;gap:10px"><div style="display:flex;justify-content:space-between;align-items:center"><strong style="font-size:13px">Active filters</strong><span class="ghost">Reset</span></div><div style="display:flex;gap:8px;flex-wrap:wrap">${['SaaS','Minimal','Free','Tailwind'].map((t,i)=>`<span class="${i<2?'primary':'ghost'}">${t}</span>`).join('')}</div><div style="height:18px;border-radius:999px;background:${accent};opacity:.1"></div></div></div>`
  } else if (categoryId === 'ecommerce') {
    html = layout === 0
      ? `<div class="${className}"><div class="surface" style="padding:10px;display:grid;grid-template-columns:74px 1fr;gap:10px;align-items:center"><div style="height:72px;border-radius:12px;background:linear-gradient(135deg,color-mix(in srgb, ${accent} 20%, white),color-mix(in srgb, ${primary} 18%, white));border:1px solid ${border}"></div><div><div style="font-weight:800;font-size:14px">Premium Sneakers</div><div class="muted" style="font-size:12px;margin-top:4px">$129.00</div><div style="margin-top:8px;display:flex;gap:8px"><span class="primary">Add</span><span class="ghost">View</span></div></div></div></div>`
      : layout === 1
        ? `<div class="${className}" style="grid-template-columns:.96fr 1.04fr;gap:10px"><div class="surface" style="min-height:144px;display:grid;place-items:center;background:linear-gradient(145deg,color-mix(in srgb, ${accent} 18%, white),#fff)"><div style="width:74px;height:74px;border-radius:24px;background:${primary};opacity:.12"></div></div><div style="display:grid;gap:8px;align-content:center"><span class="pill">New arrival</span><strong style="font-size:16px">Shop-ready product spotlight</strong><span class="muted" style="font-size:12px">A stronger ecommerce snippet with product emphasis and action.</span><div style="display:flex;gap:8px"><span class="primary">Buy now</span><span class="ghost">Wishlist</span></div></div></div>`
        : `<div class="${className}"><div class="surface" style="padding:12px;display:grid;gap:10px"><div style="display:flex;justify-content:space-between;align-items:center"><strong style="font-size:13px">Cart summary</strong><span class="pill">2 items</span></div><div style="display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center"><div style="width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb, ${accent} 18%, white),#fff);border:1px solid ${border}"></div><div><div style="font-size:12px;font-weight:700">Canvas Sneaker</div><div class="muted" style="font-size:11px;margin-top:4px">Qty 1</div></div><div style="font-size:12px;font-weight:800">$96</div></div><div style="display:flex;justify-content:space-between;align-items:center"><span class="ghost">Details</span><span class="primary">Checkout</span></div></div></div>`
  }

  return {
    css,
    html,
    tags: [categoryId, theme[0], `variant-${variant + 1}`, 'modern', 'popular'],
  }
}

function buttonCss(className, pattern, theme) {
  const [, , bg, fg, soft, border, accent] = theme
  const base = `
.${className} {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 118px;
  min-height: 42px;
  padding: 0 18px;
  border-radius: ${pattern === 'Pill' ? '999px' : pattern === 'Soft' ? '14px' : '10px'};
  border: 1px solid ${border};
  background: ${bg};
  color: ${fg};
  font: 700 13px/1 Inter, system-ui, sans-serif;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;
}`
  if (pattern === 'Outline') {
    return `${base}
.${className} { background: transparent; color: ${bg}; border-width: 1.5px; }
.${className}:hover { background: ${soft}; transform: translateY(-1px); }`
  }
  if (pattern === 'Soft') {
    return `${base}
.${className} { background: ${soft}; color: ${bg}; border-color: transparent; }
.${className}:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px ${accent}; }`
  }
  if (pattern === 'Lift') {
    return `${base}
.${className} { box-shadow: 0 10px 24px -16px ${accent}; }
.${className}:hover { transform: translateY(-2px); box-shadow: 0 18px 30px -18px ${accent}; }`
  }
  if (pattern === 'Shine') {
    return `${base}
.${className} { overflow: hidden; }
.${className}::before {
  content: "";
  position: absolute;
  inset: 0;
  left: -140%;
  background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,.34), transparent 65%);
  transition: left .45s ease;
}
.${className}:hover::before { left: 140%; }`
  }
  if (pattern === 'Slide') {
    return `${base}
.${className} { background: transparent; color: ${bg}; overflow: hidden; }
.${className}::before {
  content: "";
  position: absolute;
  inset: 0;
  background: ${bg};
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform .25s ease;
  z-index: -1;
}
.${className}:hover { color: ${fg}; }
.${className}:hover::before { transform: scaleX(1); }`
  }
  if (pattern === 'Glow') {
    return `${base}
.${className} { box-shadow: 0 0 0 0 ${accent}; }
.${className}:hover { box-shadow: 0 0 0 6px color-mix(in srgb, ${accent} 18%, transparent), 0 18px 34px -20px ${accent}; }`
  }
  if (pattern === 'Pill') {
    return `${base}
.${className} { box-shadow: inset 0 -2px 0 rgba(255,255,255,.12), 0 12px 24px -18px ${accent}; }
.${className}:hover { transform: translateY(-1px) scale(1.01); }`
  }
  return `${base}
.${className}:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px ${accent}; }`
}

function checkboxCss(className, pattern, theme) {
  const [, color, border, soft] = theme
  const radius = pattern === 'Chip' ? '999px' : pattern === 'Soft' ? '8px' : pattern === 'Inset' ? '6px' : '5px'
  const size = pattern === 'Chip' ? '32px' : '24px'
  let baseShadow = 'none'
  let checkedShadow = `0 10px 20px -18px ${color}`
  let afterStyle = ''

  if (pattern === 'Soft') {
    baseShadow = `0 8px 18px -20px ${color}`
  }
  if (pattern === 'Inset') {
    baseShadow = 'inset 0 1px 2px rgba(15,23,42,.14)'
  }
  if (pattern === 'Glow') {
    checkedShadow = `0 0 0 6px color-mix(in srgb, ${color} 14%, transparent), 0 10px 20px -18px ${color}`
  }
  if (pattern === 'Chip') {
    afterStyle = `border-radius: 999px; width: 10px; height: 10px; left: 50%; top: 50%; margin-left: -5px; margin-top: -5px; border: 0; background: #fff;`
  }
  return `
.${className} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${size};
  height: ${size};
  position: relative;
}
.${className} input {
  position: absolute;
  opacity: 0;
  inset: 0;
}
.${className} .box {
  position: relative;
  display: block;
  width: ${size};
  height: ${size};
  border-radius: ${radius};
  border: 1.5px solid ${border};
  background: ${pattern === 'Soft' ? soft : '#fff'};
  transition: all .2s ease;
  box-shadow: ${baseShadow};
}
.${className} .box::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 6px;
  height: 12px;
  margin-left: -3px;
  margin-top: -8px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(45deg) scale(0);
  transition: transform .18s ease;
  ${afterStyle}
}
.${className} input:checked + .box {
  background: ${color};
  border-color: ${color};
  box-shadow: ${checkedShadow};
}
.${className} input:checked + .box::after {
  transform: rotate(45deg) scale(1);
}`
}

function radioCss(className, pattern, theme) {
  const [, color, border, soft] = theme
  let baseShadow = 'none'
  let checkedShadow = `0 0 0 4px color-mix(in srgb, ${color} 14%, transparent)`
  if (pattern === 'Soft') baseShadow = `0 8px 18px -20px ${color}`
  if (pattern === 'Ring') checkedShadow = `0 0 0 6px color-mix(in srgb, ${color} 16%, transparent)`
  return `
.${className} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  position: relative;
}
.${className} input {
  position: absolute;
  opacity: 0;
  inset: 0;
}
.${className} .dot {
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  border: 1.5px solid ${border};
  background: ${pattern === 'Soft' ? soft : '#fff'};
  transition: all .2s ease;
  box-shadow: ${baseShadow};
}
.${className} .dot::after {
  content: "";
  position: absolute;
  inset: 5px;
  border-radius: 999px;
  background: ${color};
  transform: scale(0);
  transition: transform .18s ease;
}
.${className} input:checked + .dot {
  border-color: ${color};
  box-shadow: ${checkedShadow};
}
.${className} input:checked + .dot::after {
  transform: scale(1);
}`
}

function shadowCss(className, pattern, theme) {
  const [, accent, shadowColor] = theme
  const config = {
    Soft: { radius: 14, width: 108, height: 82, shadow: `0 18px 30px -24px ${shadowColor}` },
    Lifted: { radius: 18, width: 116, height: 82, shadow: `0 24px 34px -22px ${shadowColor}, 0 8px 12px -10px rgba(15,23,42,0.12)` },
    Layered: { radius: 18, width: 112, height: 84, shadow: `0 1px 0 rgba(255,255,255,0.92) inset, 0 10px 18px -16px ${shadowColor}, 0 28px 38px -32px rgba(15,23,42,0.16)` },
    Inset: { radius: 16, width: 110, height: 84, shadow: `inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -12px 18px -18px ${shadowColor}, 0 12px 22px -22px rgba(15,23,42,0.12)` },
    Glow: { radius: 20, width: 112, height: 84, shadow: `0 0 0 1px color-mix(in srgb, ${accent} 16%, #e2e8f0), 0 24px 38px -28px ${shadowColor}, 0 0 24px -20px ${shadowColor}` },
    'Hard Edge': { radius: 8, width: 102, height: 78, shadow: `10px 10px 0 -5px color-mix(in srgb, ${accent} 28%, transparent)` },
    Floating: { radius: 24, width: 114, height: 74, shadow: `0 30px 44px -26px ${shadowColor}` },
    Ambient: { radius: 18, width: 118, height: 88, shadow: `0 14px 16px -16px rgba(15,23,42,0.12), 0 30px 42px -34px ${shadowColor}` },
  }[pattern]
  return `
.${className} {
  width: ${config.width}px;
  height: ${config.height}px;
  border-radius: ${config.radius}px;
  background: #fff;
  border: 1px solid color-mix(in srgb, ${accent} 12%, #e2e8f0);
  box-shadow: ${config.shadow};
}`
}

function shapeEntry(name, css, html, tags = []) {
  return { name, css, html, tags }
}

const shapes = [
  shapeEntry('Triangle Up', '.shape{width:0;height:0;border-left:34px solid transparent;border-right:34px solid transparent;border-bottom:58px solid #2f3137;}', '<div class="shape"></div>', ['triangle']),
  shapeEntry('Triangle Down', '.shape{width:0;height:0;border-left:34px solid transparent;border-right:34px solid transparent;border-top:58px solid #2f3137;}', '<div class="shape"></div>', ['triangle']),
  shapeEntry('Triangle Left', '.shape{width:0;height:0;border-top:34px solid transparent;border-bottom:34px solid transparent;border-right:58px solid #2f3137;}', '<div class="shape"></div>', ['triangle']),
  shapeEntry('Triangle Right', '.shape{width:0;height:0;border-top:34px solid transparent;border-bottom:34px solid transparent;border-left:58px solid #2f3137;}', '<div class="shape"></div>', ['triangle']),
  shapeEntry('Arrow Up', '.shape{width:28px;height:28px;border-top:2px solid #2f3137;border-left:2px solid #2f3137;transform:rotate(45deg);}', '<div class="shape"></div>', ['arrow']),
  shapeEntry('Arrow Down', '.shape{width:28px;height:28px;border-right:2px solid #2f3137;border-bottom:2px solid #2f3137;transform:rotate(45deg);}', '<div class="shape"></div>', ['arrow']),
  shapeEntry('Arrow Left', '.shape{width:28px;height:28px;border-bottom:2px solid #2f3137;border-left:2px solid #2f3137;transform:rotate(45deg);}', '<div class="shape"></div>', ['arrow']),
  shapeEntry('Arrow Right', '.shape{width:28px;height:28px;border-top:2px solid #2f3137;border-right:2px solid #2f3137;transform:rotate(45deg);}', '<div class="shape"></div>', ['arrow']),
  shapeEntry('Thick Arrow Up', '.shape{width:24px;height:24px;border-top:7px solid #2f3137;border-left:7px solid #2f3137;transform:rotate(45deg);}', '<div class="shape"></div>', ['arrow']),
  shapeEntry('Thick Arrow Down', '.shape{width:24px;height:24px;border-right:7px solid #2f3137;border-bottom:7px solid #2f3137;transform:rotate(45deg);}', '<div class="shape"></div>', ['arrow']),
  shapeEntry('Thick Arrow Left', '.shape{width:24px;height:24px;border-bottom:7px solid #2f3137;border-left:7px solid #2f3137;transform:rotate(45deg);}', '<div class="shape"></div>', ['arrow']),
  shapeEntry('Thick Arrow Right', '.shape{width:24px;height:24px;border-top:7px solid #2f3137;border-right:7px solid #2f3137;transform:rotate(45deg);}', '<div class="shape"></div>', ['arrow']),
  shapeEntry('Bubble Top', '.shape{width:62px;height:42px;background:#2f3137;border-radius:12px;position:relative}.shape::after{content:"";position:absolute;left:18px;top:-10px;border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:12px solid #2f3137;}', '<div class="shape"></div>', ['bubble']),
  shapeEntry('Bubble Bottom', '.shape{width:62px;height:42px;background:#2f3137;border-radius:12px;position:relative}.shape::after{content:"";position:absolute;left:18px;bottom:-10px;border-left:10px solid transparent;border-right:10px solid transparent;border-top:12px solid #2f3137;}', '<div class="shape"></div>', ['bubble']),
  shapeEntry('Bubble Left', '.shape{width:62px;height:42px;background:#2f3137;border-radius:12px;position:relative}.shape::after{content:"";position:absolute;left:-10px;top:12px;border-top:10px solid transparent;border-bottom:10px solid transparent;border-right:12px solid #2f3137;}', '<div class="shape"></div>', ['bubble']),
  shapeEntry('Bubble Right', '.shape{width:62px;height:42px;background:#2f3137;border-radius:12px;position:relative}.shape::after{content:"";position:absolute;right:-10px;top:12px;border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:12px solid #2f3137;}', '<div class="shape"></div>', ['bubble']),
  shapeEntry('5-point Star', '.shape{width:72px;height:72px;background:#2f3137;clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);}', '<div class="shape"></div>', ['star']),
  shapeEntry('Heart', '.shape{position:relative;width:64px;height:56px;transform:rotate(-45deg)}.shape::before,.shape::after{content:"";position:absolute;width:38px;height:60px;background:#2f3137;border-radius:999px 999px 0 0}.shape::before{left:26px}.shape::after{left:0;top:26px;transform:rotate(90deg);transform-origin:0 0}', '<div class="shape"></div>', ['heart']),
  shapeEntry('Heart with clip-path', '.shape{width:72px;height:64px;background:#2f3137;clip-path:polygon(50% 91%,12% 52%,0 28%,15% 7%,35% 6%,50% 22%,65% 6%,85% 7%,100% 28%,88% 52%);}', '<div class="shape"></div>', ['heart','clip-path']),
  shapeEntry('Heart with Gradient', '.shape{width:72px;height:64px;background:linear-gradient(180deg,#ff4d8d,#5b3df5);clip-path:polygon(50% 91%,12% 52%,0 28%,15% 7%,35% 6%,50% 22%,65% 6%,85% 7%,100% 28%,88% 52%);}', '<div class="shape"></div>', ['heart','gradient']),
  shapeEntry('12 Point Burst', '.shape{width:72px;height:72px;background:#2f3137;clip-path:polygon(50% 0,61% 13%,75% 4%,79% 19%,93% 15%,88% 30%,100% 35%,88% 46%,97% 59%,82% 62%,86% 77%,71% 74%,66% 89%,50% 80%,34% 89%,29% 74%,14% 77%,18% 62%,3% 59%,12% 46%,0 35%,12% 30%,7% 15%,21% 19%,25% 4%,39% 13%);}', '<div class="shape"></div>', ['burst']),
  shapeEntry('8 Point Burst', '.shape{width:72px;height:72px;background:#2f3137;clip-path:polygon(50% 0,62% 16%,84% 16%,68% 32%,84% 50%,68% 64%,84% 84%,62% 84%,50% 100%,38% 84%,16% 84%,32% 64%,16% 50%,32% 32%,16% 16%,38% 16%);}', '<div class="shape"></div>', ['burst']),
  shapeEntry('Diamond Square', '.shape{width:52px;height:52px;background:#2f3137;transform:rotate(45deg);}', '<div class="shape"></div>', ['diamond']),
  shapeEntry('Diamond', '.shape{width:60px;height:72px;background:#2f3137;clip-path:polygon(50% 0,100% 40%,50% 100%,0 40%);}', '<div class="shape"></div>', ['diamond']),
  shapeEntry('Check Mark', '.shape{width:18px;height:34px;border-right:3px solid #2f3137;border-bottom:3px solid #2f3137;transform:rotate(45deg);}', '<div class="shape"></div>', ['check']),
  shapeEntry('Thick Check Mark', '.shape{width:20px;height:38px;border-right:7px solid #2f3137;border-bottom:7px solid #2f3137;transform:rotate(45deg);}', '<div class="shape"></div>', ['check']),
  shapeEntry('Triangle with Borders', '.shape{width:0;height:0;border-left:30px solid transparent;border-right:30px solid transparent;border-bottom:54px solid #2f3137;position:relative}.shape::after{content:"";position:absolute;left:-26px;top:6px;border-left:26px solid transparent;border-right:26px solid transparent;border-bottom:46px solid #fff;}', '<div class="shape"></div>', ['triangle']),
  shapeEntry('Cone', '.shape{width:74px;height:48px;background:#2f3137;border-radius:999px 999px 34px 34px;clip-path:polygon(0 0,100% 0,72% 100%,28% 100%);}', '<div class="shape"></div>', ['cone']),
  shapeEntry('Plus', '.shape{width:64px;height:64px;background:#2f3137;clip-path:polygon(38% 0,62% 0,62% 38%,100% 38%,100% 62%,62% 62%,62% 100%,38% 100%,38% 62%,0 62%,0 38%,38% 38%);}', '<div class="shape"></div>', ['plus']),
  shapeEntry('Base', '.shape{width:68px;height:54px;background:#2f3137;clip-path:polygon(50% 0,100% 36%,100% 100%,0 100%,0 36%);}', '<div class="shape"></div>', ['house']),
  shapeEntry('Yin Yang', '.shape{width:68px;height:68px;border-radius:50%;background:linear-gradient(90deg,#2f3137 50%,#fff 50%);border:2px solid #2f3137;position:relative}.shape::before,.shape::after{content:"";position:absolute;width:32px;height:32px;border-radius:50%;left:16px}.shape::before{top:0;background:radial-gradient(circle,#fff 25%,#2f3137 26%)}.shape::after{bottom:0;background:radial-gradient(circle,#2f3137 25%,#fff 26%)}', '<div class="shape"></div>', ['circle']),
  shapeEntry('Octagon', '.shape{width:68px;height:68px;background:#2f3137;clip-path:polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%);}', '<div class="shape"></div>', ['polygon']),
  shapeEntry('Oval', '.shape{width:78px;height:52px;background:#2f3137;border-radius:999px;}', '<div class="shape"></div>', ['oval']),
  shapeEntry('Pac-Man', '.shape{width:72px;height:72px;background:#2f3137;border-radius:50%;clip-path:polygon(0 0,100% 16%,72% 50%,100% 84%,0 100%);}', '<div class="shape"></div>', ['circle']),
  shapeEntry('Space Invader', '.shape{width:70px;height:52px;background:#2f3137;clip-path:polygon(0 26%,13% 26%,13% 0,26% 0,26% 26%,39% 26%,39% 0,61% 0,61% 26%,74% 26%,74% 0,87% 0,87% 26%,100% 26%,100% 52%,87% 52%,87% 65%,74% 65%,74% 78%,61% 78%,61% 100%,39% 100%,39% 78%,26% 78%,26% 65%,13% 65%,13% 52%,0 52%);}', '<div class="shape"></div>', ['pixel']),
  shapeEntry('Moon', '.shape{width:68px;height:68px;border-radius:50%;background:#2f3137;box-shadow:18px -8px 0 8px #fff;}', '<div class="shape"></div>', ['moon']),
  shapeEntry('Flag', '.shape{width:46px;height:68px;background:#2f3137;clip-path:polygon(0 0,100% 0,100% 72%,50% 56%,0 72%);}', '<div class="shape"></div>', ['flag']),
  shapeEntry('Triangle Top Left', '.shape{width:0;height:0;border-top:52px solid #2f3137;border-right:52px solid transparent;}', '<div class="shape"></div>', ['triangle']),
  shapeEntry('Triangle Top Right', '.shape{width:0;height:0;border-top:52px solid #2f3137;border-left:52px solid transparent;}', '<div class="shape"></div>', ['triangle']),
  shapeEntry('Triangle Bottom Left', '.shape{width:0;height:0;border-bottom:52px solid #2f3137;border-right:52px solid transparent;}', '<div class="shape"></div>', ['triangle']),
  shapeEntry('Triangle Bottom Right', '.shape{width:0;height:0;border-bottom:52px solid #2f3137;border-left:52px solid transparent;}', '<div class="shape"></div>', ['triangle']),
  shapeEntry('Trapezoid', '.shape{width:86px;height:54px;background:#2f3137;clip-path:polygon(18% 0,82% 0,100% 100%,0 100%);}', '<div class="shape"></div>', ['polygon']),
  shapeEntry('Parallelogram', '.shape{width:86px;height:52px;background:#2f3137;transform:skew(-18deg);}', '<div class="shape"></div>', ['polygon']),
  shapeEntry('6-points Star', '.shape{width:72px;height:72px;background:#2f3137;clip-path:polygon(50% 0,61% 20%,84% 20%,67% 37%,76% 60%,50% 47%,24% 60%,33% 37%,16% 20%,39% 20%);}', '<div class="shape"></div>', ['star']),
  shapeEntry('Hexagon', '.shape{width:74px;height:66px;background:#2f3137;clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);}', '<div class="shape"></div>', ['polygon']),
  shapeEntry('Pentagon', '.shape{width:74px;height:70px;background:#2f3137;clip-path:polygon(50% 0,100% 38%,82% 100%,18% 100%,0 38%);}', '<div class="shape"></div>', ['polygon']),
  shapeEntry('Infinity', '.shape{width:90px;height:42px;position:relative}.shape::before,.shape::after{content:"";position:absolute;top:0;width:34px;height:34px;border:6px solid #2f3137;border-radius:50% 50% 50% 0;transform:rotate(-45deg)}.shape::before{left:10px}.shape::after{right:10px;transform:rotate(135deg)}', '<div class="shape"></div>', ['infinity']),
  shapeEntry('Egg', '.shape{width:56px;height:78px;background:#2f3137;border-radius:50% 50% 46% 46% / 56% 56% 44% 44%;}', '<div class="shape"></div>', ['oval']),
  shapeEntry('Badge Ribbon', '.shape{width:58px;height:74px;background:#2f3137;clip-path:polygon(50% 0,76% 8%,88% 28%,88% 54%,68% 70%,76% 100%,50% 88%,24% 100%,32% 70%,12% 54%,12% 28%,24% 8%);}', '<div class="shape"></div>', ['badge']),
  shapeEntry('TV Screen', '.shape{width:84px;height:58px;background:#2f3137;border-radius:8px;position:relative}.shape::before{content:"";position:absolute;left:24px;top:-10px;width:36px;height:10px;background:#2f3137;clip-path:polygon(12% 100%,88% 100%,100% 0,0 0)}', '<div class="shape"></div>', ['screen']),
  shapeEntry('Cylinder', '.shape{width:56px;height:78px;background:#2f3137;border-radius:28px/12px;position:relative}.shape::before,.shape::after{content:"";position:absolute;left:0;width:56px;height:14px;border-radius:50%;background:#3d4047}.shape::before{top:0}.shape::after{bottom:0}', '<div class="shape"></div>', ['cylinder']),
  shapeEntry('Price Tag', '.shape{width:82px;height:44px;background:#2f3137;clip-path:polygon(0 0,82% 0,100% 50%,82% 100%,0 100%,12% 50%);position:relative}.shape::after{content:"";position:absolute;left:14px;top:18px;width:7px;height:7px;border-radius:50%;background:#fff}', '<div class="shape"></div>', ['tag']),
  shapeEntry('Tooltip Top', '.shape{width:84px;height:44px;background:#2f3137;border-radius:10px;position:relative}.shape::after{content:"";position:absolute;left:32px;top:-10px;border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:12px solid #2f3137;}', '<div class="shape"></div>', ['tooltip']),
  shapeEntry('Tooltip Bottom', '.shape{width:84px;height:44px;background:#2f3137;border-radius:10px;position:relative}.shape::after{content:"";position:absolute;left:32px;bottom:-10px;border-left:10px solid transparent;border-right:10px solid transparent;border-top:12px solid #2f3137;}', '<div class="shape"></div>', ['tooltip']),
  shapeEntry('Tooltip Left', '.shape{width:84px;height:44px;background:#2f3137;border-radius:10px;position:relative}.shape::after{content:"";position:absolute;left:-10px;top:14px;border-top:10px solid transparent;border-bottom:10px solid transparent;border-right:12px solid #2f3137;}', '<div class="shape"></div>', ['tooltip']),
  shapeEntry('Tooltip Right', '.shape{width:84px;height:44px;background:#2f3137;border-radius:10px;position:relative}.shape::after{content:"";position:absolute;right:-10px;top:14px;border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:12px solid #2f3137;}', '<div class="shape"></div>', ['tooltip']),
  shapeEntry('Triangle with Partial Borders', '.shape{width:64px;height:42px;border:1px solid #cbd5e1;position:relative;background:#fff}.shape::after{content:"";position:absolute;left:22px;top:-8px;width:14px;height:14px;border-top:2px solid #ef4444;border-left:2px solid #ef4444;transform:rotate(45deg);background:#fff}', '<div class="shape"></div>', ['triangle','border']),
]

let buttonIndex = 1
for (const theme of buttonThemes) {
  for (const pattern of buttonPatterns) {
    if (buttonIndex > 92) break
    const className = `button-${pad(buttonIndex)}`
    pushEffect({
      id: className,
      title: `Button ${buttonIndex}`,
      category: 'button',
      description: `${pattern} ${theme[1]} button with a polished UI-friendly hover state.`,
      tags: ['button', 'cta', pattern.toLowerCase().replace(/\s+/g, '-'), theme[0], 'interactive'],
      htmlCode: `<button class="${className}">Button ${buttonIndex}</button>`,
      cssCode: buttonCss(className, pattern, theme),
    })
    buttonIndex += 1
  }
}

let checkboxIndex = 1
for (const theme of checkboxThemes) {
  for (const pattern of checkboxPatterns) {
    const className = `checkbox-${pad(checkboxIndex)}`
    pushEffect({
      id: className,
      title: `Checkbox ${checkboxIndex}`,
      category: 'checkbox',
      description: `${pattern} ${theme[0]} checkbox for settings, lists, and modern form UIs.`,
      tags: ['checkbox', 'form', pattern.toLowerCase(), theme[0], 'selection'],
      htmlCode: `<label class="${className}"><input type="checkbox" checked /><span class="box"></span></label>`,
      cssCode: checkboxCss(className, pattern, theme),
    })
    checkboxIndex += 1
  }
}

let radioIndex = 1
for (const theme of radioThemes) {
  for (const pattern of radioPatterns) {
    const className = `radio-${pad(radioIndex)}`
    pushEffect({
      id: className,
      title: `Radio ${radioIndex}`,
      category: 'radio',
      description: `${pattern} ${theme[0]} radio control for clean option picking flows.`,
      tags: ['radio', 'form', pattern.toLowerCase(), theme[0], 'selection'],
      htmlCode: `<label class="${className}"><input type="radio" checked /><span class="dot"></span></label>`,
      cssCode: radioCss(className, pattern, theme),
    })
    radioIndex += 1
  }
}

let shadowIndex = 0
for (const theme of shadowThemes) {
  for (const pattern of shadowPatterns) {
    const className = `shadow-${pad(shadowIndex)}`
    pushEffect({
      id: className,
      title: `Shadow ${shadowIndex}`,
      category: 'shadow',
      description: `${pattern} box-shadow recipe for cards, popovers, and elevated UI blocks.`,
      tags: ['shadow', 'box-shadow', pattern.toLowerCase().replace(/\s+/g, '-'), theme[0], 'surface'],
      htmlCode: `<div class="${className}"></div>`,
      cssCode: shadowCss(className, pattern, theme),
    })
    shadowIndex += 1
  }
}

shapes.forEach((shape, index) => {
  const number = index + 1
  const className = `shape-${pad(number)}`
  pushEffect({
    id: className,
    title: shape.name,
    category: 'shape',
    description: `${shape.name} built with pure CSS for badges, pointers, icons, and decorative UI foundations.`,
    tags: ['shape', 'css', ...shape.tags, 'foundation'],
    htmlCode: shape.html.replaceAll('class="shape"', `class="${className}"`),
    cssCode: shape.css.replaceAll('.shape', `.${className}`),
  })
})

modernCategories.forEach(([categoryId, label]) => {
  for (let variant = 0; variant < 11; variant += 1) {
    const theme = sectionThemes[variant % sectionThemes.length]
    const className = `${categoryId}-${pad(variant + 1)}`
    const preview = buildModernPreview(className, categoryId, variant, theme)

    pushEffect({
      id: className,
      title: `${label} ${variant + 1}`,
      category: categoryId,
      description: `${label} layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.`,
      tags: preview.tags,
      htmlCode: preview.html,
      cssCode: preview.css,
    })
  }
})

const dedupedEffects = Array.from(
  new Map(
    effects.map(effect => [
      `${effect.category}|${effect.title.toLowerCase()}|${effect.htmlCode.replace(/\s+/g, ' ').trim()}`,
      effect,
    ])
  ).values()
)

if (dedupedEffects.length !== 541) {
  throw new Error(`Expected 541 effects after merge, received ${dedupedEffects.length}`)
}

const output = `export interface CSSEffect {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  cssCode: string
  htmlCode: string
  previewClass: string
}

export const categories = ${JSON.stringify(categories, null, 2)} as const

export const cssEffects: CSSEffect[] = ${JSON.stringify(dedupedEffects, null, 2)}
`

for (const target of [path.join(process.cwd(), 'lib', 'css-effects-data.ts')]) {
  fs.writeFileSync(target, output, 'utf8')
}

console.log(`Generated ${dedupedEffects.length} UI effects`)
