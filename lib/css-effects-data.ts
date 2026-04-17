export interface CSSEffect {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  cssCode: string
  htmlCode: string
  previewClass: string
}

export const categories = [
  {
    "id": "all",
    "label": "All UI",
    "icon": "Sparkles"
  },
  {
    "id": "button",
    "label": "Buttons",
    "icon": "RectangleHorizontal"
  },
  {
    "id": "checkbox",
    "label": "Checkboxes",
    "icon": "CheckSquare"
  },
  {
    "id": "radio",
    "label": "Radios",
    "icon": "CircleDot"
  },
  {
    "id": "shadow",
    "label": "Shadows",
    "icon": "SquareDashedBottom"
  },
  {
    "id": "shape",
    "label": "Shapes",
    "icon": "Shapes"
  },
  {
    "id": "navbar",
    "label": "Navbars",
    "icon": "Menu"
  },
  {
    "id": "hero",
    "label": "Hero Sections",
    "icon": "PanelsTopLeft"
  },
  {
    "id": "feature",
    "label": "Feature Sections",
    "icon": "LayoutPanelTop"
  },
  {
    "id": "testimonial",
    "label": "Testimonials",
    "icon": "MessageSquareQuote"
  },
  {
    "id": "pricing",
    "label": "Pricing Sections",
    "icon": "BadgeDollarSign"
  },
  {
    "id": "faq",
    "label": "FAQ Sections",
    "icon": "MessagesSquare"
  },
  {
    "id": "cta",
    "label": "CTA Sections",
    "icon": "Megaphone"
  },
  {
    "id": "stats",
    "label": "Stats Blocks",
    "icon": "BarChart3"
  },
  {
    "id": "footer",
    "label": "Footers",
    "icon": "Rows3"
  },
  {
    "id": "card",
    "label": "Cards",
    "icon": "PanelsTopLeft"
  },
  {
    "id": "form",
    "label": "Forms",
    "icon": "FileText"
  },
  {
    "id": "auth",
    "label": "Auth UI",
    "icon": "ShieldCheck"
  },
  {
    "id": "dashboard",
    "label": "Dashboards",
    "icon": "LayoutDashboard"
  },
  {
    "id": "sidebar",
    "label": "Sidebars",
    "icon": "PanelLeftClose"
  },
  {
    "id": "table",
    "label": "Tables",
    "icon": "Table2"
  },
  {
    "id": "search",
    "label": "Search UI",
    "icon": "Search"
  },
  {
    "id": "filter",
    "label": "Filter UI",
    "icon": "ListFilter"
  },
  {
    "id": "ecommerce",
    "label": "Commerce UI",
    "icon": "ShoppingBag"
  }
] as const

export const cssEffects: CSSEffect[] = [
  {
    "id": "button-001",
    "title": "Button 1",
    "category": "button",
    "description": "Solid Indigo button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "solid",
      "indigo",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-001\">Button 1</button>",
    "cssCode": "\n.button-001 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #4f46e5;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-001:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #818cf8; }",
    "previewClass": "button-001"
  },
  {
    "id": "button-002",
    "title": "Button 2",
    "category": "button",
    "description": "Outline Indigo button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "outline",
      "indigo",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-002\">Button 2</button>",
    "cssCode": "\n.button-002 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #4f46e5;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-002 { background: transparent; color: #4f46e5; border-width: 1.5px; }\n.button-002:hover { background: #eef2ff; transform: translateY(-1px); }",
    "previewClass": "button-002"
  },
  {
    "id": "button-003",
    "title": "Button 3",
    "category": "button",
    "description": "Soft Indigo button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "soft",
      "indigo",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-003\">Button 3</button>",
    "cssCode": "\n.button-003 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 14px;\n  border: 1px solid #c7d2fe;\n  background: #4f46e5;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-003 { background: #eef2ff; color: #4f46e5; border-color: transparent; }\n.button-003:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #818cf8; }",
    "previewClass": "button-003"
  },
  {
    "id": "button-004",
    "title": "Button 4",
    "category": "button",
    "description": "Lift Indigo button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "lift",
      "indigo",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-004\">Button 4</button>",
    "cssCode": "\n.button-004 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #4f46e5;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-004 { box-shadow: 0 10px 24px -16px #818cf8; }\n.button-004:hover { transform: translateY(-2px); box-shadow: 0 18px 30px -18px #818cf8; }",
    "previewClass": "button-004"
  },
  {
    "id": "button-005",
    "title": "Button 5",
    "category": "button",
    "description": "Shine Indigo button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "shine",
      "indigo",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-005\">Button 5</button>",
    "cssCode": "\n.button-005 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #4f46e5;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-005 { overflow: hidden; }\n.button-005::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  left: -140%;\n  background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,.34), transparent 65%);\n  transition: left .45s ease;\n}\n.button-005:hover::before { left: 140%; }",
    "previewClass": "button-005"
  },
  {
    "id": "button-006",
    "title": "Button 6",
    "category": "button",
    "description": "Slide Indigo button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "slide",
      "indigo",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-006\">Button 6</button>",
    "cssCode": "\n.button-006 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #4f46e5;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-006 { background: transparent; color: #4f46e5; overflow: hidden; }\n.button-006::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background: #4f46e5;\n  transform: scaleX(0);\n  transform-origin: left center;\n  transition: transform .25s ease;\n  z-index: -1;\n}\n.button-006:hover { color: #ffffff; }\n.button-006:hover::before { transform: scaleX(1); }",
    "previewClass": "button-006"
  },
  {
    "id": "button-007",
    "title": "Button 7",
    "category": "button",
    "description": "Glow Indigo button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "glow",
      "indigo",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-007\">Button 7</button>",
    "cssCode": "\n.button-007 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #4f46e5;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-007 { box-shadow: 0 0 0 0 #818cf8; }\n.button-007:hover { box-shadow: 0 0 0 6px color-mix(in srgb, #818cf8 18%, transparent), 0 18px 34px -20px #818cf8; }",
    "previewClass": "button-007"
  },
  {
    "id": "button-008",
    "title": "Button 8",
    "category": "button",
    "description": "Pill Indigo button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "pill",
      "indigo",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-008\">Button 8</button>",
    "cssCode": "\n.button-008 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #4f46e5;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-008 { box-shadow: inset 0 -2px 0 rgba(255,255,255,.12), 0 12px 24px -18px #818cf8; }\n.button-008:hover { transform: translateY(-1px) scale(1.01); }",
    "previewClass": "button-008"
  },
  {
    "id": "button-009",
    "title": "Button 9",
    "category": "button",
    "description": "Solid Cyan button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "solid",
      "cyan",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-009\">Button 9</button>",
    "cssCode": "\n.button-009 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #a5f3fc;\n  background: #0891b2;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-009:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #22d3ee; }",
    "previewClass": "button-009"
  },
  {
    "id": "button-010",
    "title": "Button 10",
    "category": "button",
    "description": "Outline Cyan button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "outline",
      "cyan",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-010\">Button 10</button>",
    "cssCode": "\n.button-010 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #a5f3fc;\n  background: #0891b2;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-010 { background: transparent; color: #0891b2; border-width: 1.5px; }\n.button-010:hover { background: #ecfeff; transform: translateY(-1px); }",
    "previewClass": "button-010"
  },
  {
    "id": "button-011",
    "title": "Button 11",
    "category": "button",
    "description": "Soft Cyan button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "soft",
      "cyan",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-011\">Button 11</button>",
    "cssCode": "\n.button-011 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 14px;\n  border: 1px solid #a5f3fc;\n  background: #0891b2;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-011 { background: #ecfeff; color: #0891b2; border-color: transparent; }\n.button-011:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #22d3ee; }",
    "previewClass": "button-011"
  },
  {
    "id": "button-012",
    "title": "Button 12",
    "category": "button",
    "description": "Lift Cyan button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "lift",
      "cyan",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-012\">Button 12</button>",
    "cssCode": "\n.button-012 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #a5f3fc;\n  background: #0891b2;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-012 { box-shadow: 0 10px 24px -16px #22d3ee; }\n.button-012:hover { transform: translateY(-2px); box-shadow: 0 18px 30px -18px #22d3ee; }",
    "previewClass": "button-012"
  },
  {
    "id": "button-013",
    "title": "Button 13",
    "category": "button",
    "description": "Shine Cyan button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "shine",
      "cyan",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-013\">Button 13</button>",
    "cssCode": "\n.button-013 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #a5f3fc;\n  background: #0891b2;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-013 { overflow: hidden; }\n.button-013::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  left: -140%;\n  background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,.34), transparent 65%);\n  transition: left .45s ease;\n}\n.button-013:hover::before { left: 140%; }",
    "previewClass": "button-013"
  },
  {
    "id": "button-014",
    "title": "Button 14",
    "category": "button",
    "description": "Slide Cyan button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "slide",
      "cyan",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-014\">Button 14</button>",
    "cssCode": "\n.button-014 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #a5f3fc;\n  background: #0891b2;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-014 { background: transparent; color: #0891b2; overflow: hidden; }\n.button-014::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background: #0891b2;\n  transform: scaleX(0);\n  transform-origin: left center;\n  transition: transform .25s ease;\n  z-index: -1;\n}\n.button-014:hover { color: #ffffff; }\n.button-014:hover::before { transform: scaleX(1); }",
    "previewClass": "button-014"
  },
  {
    "id": "button-015",
    "title": "Button 15",
    "category": "button",
    "description": "Glow Cyan button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "glow",
      "cyan",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-015\">Button 15</button>",
    "cssCode": "\n.button-015 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #a5f3fc;\n  background: #0891b2;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-015 { box-shadow: 0 0 0 0 #22d3ee; }\n.button-015:hover { box-shadow: 0 0 0 6px color-mix(in srgb, #22d3ee 18%, transparent), 0 18px 34px -20px #22d3ee; }",
    "previewClass": "button-015"
  },
  {
    "id": "button-016",
    "title": "Button 16",
    "category": "button",
    "description": "Pill Cyan button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "pill",
      "cyan",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-016\">Button 16</button>",
    "cssCode": "\n.button-016 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 999px;\n  border: 1px solid #a5f3fc;\n  background: #0891b2;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-016 { box-shadow: inset 0 -2px 0 rgba(255,255,255,.12), 0 12px 24px -18px #22d3ee; }\n.button-016:hover { transform: translateY(-1px) scale(1.01); }",
    "previewClass": "button-016"
  },
  {
    "id": "button-017",
    "title": "Button 17",
    "category": "button",
    "description": "Solid Emerald button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "solid",
      "emerald",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-017\">Button 17</button>",
    "cssCode": "\n.button-017 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #059669;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-017:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #34d399; }",
    "previewClass": "button-017"
  },
  {
    "id": "button-018",
    "title": "Button 18",
    "category": "button",
    "description": "Outline Emerald button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "outline",
      "emerald",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-018\">Button 18</button>",
    "cssCode": "\n.button-018 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #059669;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-018 { background: transparent; color: #059669; border-width: 1.5px; }\n.button-018:hover { background: #ecfdf5; transform: translateY(-1px); }",
    "previewClass": "button-018"
  },
  {
    "id": "button-019",
    "title": "Button 19",
    "category": "button",
    "description": "Soft Emerald button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "soft",
      "emerald",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-019\">Button 19</button>",
    "cssCode": "\n.button-019 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 14px;\n  border: 1px solid #a7f3d0;\n  background: #059669;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-019 { background: #ecfdf5; color: #059669; border-color: transparent; }\n.button-019:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #34d399; }",
    "previewClass": "button-019"
  },
  {
    "id": "button-020",
    "title": "Button 20",
    "category": "button",
    "description": "Lift Emerald button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "lift",
      "emerald",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-020\">Button 20</button>",
    "cssCode": "\n.button-020 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #059669;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-020 { box-shadow: 0 10px 24px -16px #34d399; }\n.button-020:hover { transform: translateY(-2px); box-shadow: 0 18px 30px -18px #34d399; }",
    "previewClass": "button-020"
  },
  {
    "id": "button-021",
    "title": "Button 21",
    "category": "button",
    "description": "Shine Emerald button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "shine",
      "emerald",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-021\">Button 21</button>",
    "cssCode": "\n.button-021 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #059669;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-021 { overflow: hidden; }\n.button-021::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  left: -140%;\n  background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,.34), transparent 65%);\n  transition: left .45s ease;\n}\n.button-021:hover::before { left: 140%; }",
    "previewClass": "button-021"
  },
  {
    "id": "button-022",
    "title": "Button 22",
    "category": "button",
    "description": "Slide Emerald button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "slide",
      "emerald",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-022\">Button 22</button>",
    "cssCode": "\n.button-022 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #059669;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-022 { background: transparent; color: #059669; overflow: hidden; }\n.button-022::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background: #059669;\n  transform: scaleX(0);\n  transform-origin: left center;\n  transition: transform .25s ease;\n  z-index: -1;\n}\n.button-022:hover { color: #ffffff; }\n.button-022:hover::before { transform: scaleX(1); }",
    "previewClass": "button-022"
  },
  {
    "id": "button-023",
    "title": "Button 23",
    "category": "button",
    "description": "Glow Emerald button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "glow",
      "emerald",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-023\">Button 23</button>",
    "cssCode": "\n.button-023 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #059669;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-023 { box-shadow: 0 0 0 0 #34d399; }\n.button-023:hover { box-shadow: 0 0 0 6px color-mix(in srgb, #34d399 18%, transparent), 0 18px 34px -20px #34d399; }",
    "previewClass": "button-023"
  },
  {
    "id": "button-024",
    "title": "Button 24",
    "category": "button",
    "description": "Pill Emerald button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "pill",
      "emerald",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-024\">Button 24</button>",
    "cssCode": "\n.button-024 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #059669;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-024 { box-shadow: inset 0 -2px 0 rgba(255,255,255,.12), 0 12px 24px -18px #34d399; }\n.button-024:hover { transform: translateY(-1px) scale(1.01); }",
    "previewClass": "button-024"
  },
  {
    "id": "button-025",
    "title": "Button 25",
    "category": "button",
    "description": "Solid Rose button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "solid",
      "rose",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-025\">Button 25</button>",
    "cssCode": "\n.button-025 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #e11d48;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-025:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #fb7185; }",
    "previewClass": "button-025"
  },
  {
    "id": "button-026",
    "title": "Button 26",
    "category": "button",
    "description": "Outline Rose button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "outline",
      "rose",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-026\">Button 26</button>",
    "cssCode": "\n.button-026 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #e11d48;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-026 { background: transparent; color: #e11d48; border-width: 1.5px; }\n.button-026:hover { background: #fff1f2; transform: translateY(-1px); }",
    "previewClass": "button-026"
  },
  {
    "id": "button-027",
    "title": "Button 27",
    "category": "button",
    "description": "Soft Rose button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "soft",
      "rose",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-027\">Button 27</button>",
    "cssCode": "\n.button-027 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 14px;\n  border: 1px solid #fecdd3;\n  background: #e11d48;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-027 { background: #fff1f2; color: #e11d48; border-color: transparent; }\n.button-027:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #fb7185; }",
    "previewClass": "button-027"
  },
  {
    "id": "button-028",
    "title": "Button 28",
    "category": "button",
    "description": "Lift Rose button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "lift",
      "rose",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-028\">Button 28</button>",
    "cssCode": "\n.button-028 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #e11d48;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-028 { box-shadow: 0 10px 24px -16px #fb7185; }\n.button-028:hover { transform: translateY(-2px); box-shadow: 0 18px 30px -18px #fb7185; }",
    "previewClass": "button-028"
  },
  {
    "id": "button-029",
    "title": "Button 29",
    "category": "button",
    "description": "Shine Rose button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "shine",
      "rose",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-029\">Button 29</button>",
    "cssCode": "\n.button-029 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #e11d48;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-029 { overflow: hidden; }\n.button-029::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  left: -140%;\n  background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,.34), transparent 65%);\n  transition: left .45s ease;\n}\n.button-029:hover::before { left: 140%; }",
    "previewClass": "button-029"
  },
  {
    "id": "button-030",
    "title": "Button 30",
    "category": "button",
    "description": "Slide Rose button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "slide",
      "rose",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-030\">Button 30</button>",
    "cssCode": "\n.button-030 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #e11d48;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-030 { background: transparent; color: #e11d48; overflow: hidden; }\n.button-030::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background: #e11d48;\n  transform: scaleX(0);\n  transform-origin: left center;\n  transition: transform .25s ease;\n  z-index: -1;\n}\n.button-030:hover { color: #ffffff; }\n.button-030:hover::before { transform: scaleX(1); }",
    "previewClass": "button-030"
  },
  {
    "id": "button-031",
    "title": "Button 31",
    "category": "button",
    "description": "Glow Rose button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "glow",
      "rose",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-031\">Button 31</button>",
    "cssCode": "\n.button-031 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #e11d48;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-031 { box-shadow: 0 0 0 0 #fb7185; }\n.button-031:hover { box-shadow: 0 0 0 6px color-mix(in srgb, #fb7185 18%, transparent), 0 18px 34px -20px #fb7185; }",
    "previewClass": "button-031"
  },
  {
    "id": "button-032",
    "title": "Button 32",
    "category": "button",
    "description": "Pill Rose button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "pill",
      "rose",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-032\">Button 32</button>",
    "cssCode": "\n.button-032 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #e11d48;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-032 { box-shadow: inset 0 -2px 0 rgba(255,255,255,.12), 0 12px 24px -18px #fb7185; }\n.button-032:hover { transform: translateY(-1px) scale(1.01); }",
    "previewClass": "button-032"
  },
  {
    "id": "button-033",
    "title": "Button 33",
    "category": "button",
    "description": "Solid Amber button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "solid",
      "amber",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-033\">Button 33</button>",
    "cssCode": "\n.button-033 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #d97706;\n  color: #111827;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-033:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #f59e0b; }",
    "previewClass": "button-033"
  },
  {
    "id": "button-034",
    "title": "Button 34",
    "category": "button",
    "description": "Outline Amber button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "outline",
      "amber",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-034\">Button 34</button>",
    "cssCode": "\n.button-034 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #d97706;\n  color: #111827;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-034 { background: transparent; color: #d97706; border-width: 1.5px; }\n.button-034:hover { background: #fffbeb; transform: translateY(-1px); }",
    "previewClass": "button-034"
  },
  {
    "id": "button-035",
    "title": "Button 35",
    "category": "button",
    "description": "Soft Amber button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "soft",
      "amber",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-035\">Button 35</button>",
    "cssCode": "\n.button-035 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 14px;\n  border: 1px solid #fde68a;\n  background: #d97706;\n  color: #111827;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-035 { background: #fffbeb; color: #d97706; border-color: transparent; }\n.button-035:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #f59e0b; }",
    "previewClass": "button-035"
  },
  {
    "id": "button-036",
    "title": "Button 36",
    "category": "button",
    "description": "Lift Amber button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "lift",
      "amber",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-036\">Button 36</button>",
    "cssCode": "\n.button-036 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #d97706;\n  color: #111827;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-036 { box-shadow: 0 10px 24px -16px #f59e0b; }\n.button-036:hover { transform: translateY(-2px); box-shadow: 0 18px 30px -18px #f59e0b; }",
    "previewClass": "button-036"
  },
  {
    "id": "button-037",
    "title": "Button 37",
    "category": "button",
    "description": "Shine Amber button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "shine",
      "amber",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-037\">Button 37</button>",
    "cssCode": "\n.button-037 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #d97706;\n  color: #111827;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-037 { overflow: hidden; }\n.button-037::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  left: -140%;\n  background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,.34), transparent 65%);\n  transition: left .45s ease;\n}\n.button-037:hover::before { left: 140%; }",
    "previewClass": "button-037"
  },
  {
    "id": "button-038",
    "title": "Button 38",
    "category": "button",
    "description": "Slide Amber button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "slide",
      "amber",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-038\">Button 38</button>",
    "cssCode": "\n.button-038 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #d97706;\n  color: #111827;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-038 { background: transparent; color: #d97706; overflow: hidden; }\n.button-038::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background: #d97706;\n  transform: scaleX(0);\n  transform-origin: left center;\n  transition: transform .25s ease;\n  z-index: -1;\n}\n.button-038:hover { color: #111827; }\n.button-038:hover::before { transform: scaleX(1); }",
    "previewClass": "button-038"
  },
  {
    "id": "button-039",
    "title": "Button 39",
    "category": "button",
    "description": "Glow Amber button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "glow",
      "amber",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-039\">Button 39</button>",
    "cssCode": "\n.button-039 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #d97706;\n  color: #111827;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-039 { box-shadow: 0 0 0 0 #f59e0b; }\n.button-039:hover { box-shadow: 0 0 0 6px color-mix(in srgb, #f59e0b 18%, transparent), 0 18px 34px -20px #f59e0b; }",
    "previewClass": "button-039"
  },
  {
    "id": "button-040",
    "title": "Button 40",
    "category": "button",
    "description": "Pill Amber button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "pill",
      "amber",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-040\">Button 40</button>",
    "cssCode": "\n.button-040 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #d97706;\n  color: #111827;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-040 { box-shadow: inset 0 -2px 0 rgba(255,255,255,.12), 0 12px 24px -18px #f59e0b; }\n.button-040:hover { transform: translateY(-1px) scale(1.01); }",
    "previewClass": "button-040"
  },
  {
    "id": "button-041",
    "title": "Button 41",
    "category": "button",
    "description": "Solid Violet button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "solid",
      "violet",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-041\">Button 41</button>",
    "cssCode": "\n.button-041 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #ddd6fe;\n  background: #7c3aed;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-041:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #a78bfa; }",
    "previewClass": "button-041"
  },
  {
    "id": "button-042",
    "title": "Button 42",
    "category": "button",
    "description": "Outline Violet button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "outline",
      "violet",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-042\">Button 42</button>",
    "cssCode": "\n.button-042 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #ddd6fe;\n  background: #7c3aed;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-042 { background: transparent; color: #7c3aed; border-width: 1.5px; }\n.button-042:hover { background: #f5f3ff; transform: translateY(-1px); }",
    "previewClass": "button-042"
  },
  {
    "id": "button-043",
    "title": "Button 43",
    "category": "button",
    "description": "Soft Violet button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "soft",
      "violet",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-043\">Button 43</button>",
    "cssCode": "\n.button-043 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 14px;\n  border: 1px solid #ddd6fe;\n  background: #7c3aed;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-043 { background: #f5f3ff; color: #7c3aed; border-color: transparent; }\n.button-043:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #a78bfa; }",
    "previewClass": "button-043"
  },
  {
    "id": "button-044",
    "title": "Button 44",
    "category": "button",
    "description": "Lift Violet button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "lift",
      "violet",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-044\">Button 44</button>",
    "cssCode": "\n.button-044 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #ddd6fe;\n  background: #7c3aed;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-044 { box-shadow: 0 10px 24px -16px #a78bfa; }\n.button-044:hover { transform: translateY(-2px); box-shadow: 0 18px 30px -18px #a78bfa; }",
    "previewClass": "button-044"
  },
  {
    "id": "button-045",
    "title": "Button 45",
    "category": "button",
    "description": "Shine Violet button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "shine",
      "violet",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-045\">Button 45</button>",
    "cssCode": "\n.button-045 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #ddd6fe;\n  background: #7c3aed;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-045 { overflow: hidden; }\n.button-045::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  left: -140%;\n  background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,.34), transparent 65%);\n  transition: left .45s ease;\n}\n.button-045:hover::before { left: 140%; }",
    "previewClass": "button-045"
  },
  {
    "id": "button-046",
    "title": "Button 46",
    "category": "button",
    "description": "Slide Violet button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "slide",
      "violet",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-046\">Button 46</button>",
    "cssCode": "\n.button-046 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #ddd6fe;\n  background: #7c3aed;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-046 { background: transparent; color: #7c3aed; overflow: hidden; }\n.button-046::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background: #7c3aed;\n  transform: scaleX(0);\n  transform-origin: left center;\n  transition: transform .25s ease;\n  z-index: -1;\n}\n.button-046:hover { color: #ffffff; }\n.button-046:hover::before { transform: scaleX(1); }",
    "previewClass": "button-046"
  },
  {
    "id": "button-047",
    "title": "Button 47",
    "category": "button",
    "description": "Glow Violet button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "glow",
      "violet",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-047\">Button 47</button>",
    "cssCode": "\n.button-047 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #ddd6fe;\n  background: #7c3aed;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-047 { box-shadow: 0 0 0 0 #a78bfa; }\n.button-047:hover { box-shadow: 0 0 0 6px color-mix(in srgb, #a78bfa 18%, transparent), 0 18px 34px -20px #a78bfa; }",
    "previewClass": "button-047"
  },
  {
    "id": "button-048",
    "title": "Button 48",
    "category": "button",
    "description": "Pill Violet button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "pill",
      "violet",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-048\">Button 48</button>",
    "cssCode": "\n.button-048 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 999px;\n  border: 1px solid #ddd6fe;\n  background: #7c3aed;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-048 { box-shadow: inset 0 -2px 0 rgba(255,255,255,.12), 0 12px 24px -18px #a78bfa; }\n.button-048:hover { transform: translateY(-1px) scale(1.01); }",
    "previewClass": "button-048"
  },
  {
    "id": "button-049",
    "title": "Button 49",
    "category": "button",
    "description": "Solid Sky button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "solid",
      "sky",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-049\">Button 49</button>",
    "cssCode": "\n.button-049 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #0284c7;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-049:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #38bdf8; }",
    "previewClass": "button-049"
  },
  {
    "id": "button-050",
    "title": "Button 50",
    "category": "button",
    "description": "Outline Sky button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "outline",
      "sky",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-050\">Button 50</button>",
    "cssCode": "\n.button-050 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #0284c7;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-050 { background: transparent; color: #0284c7; border-width: 1.5px; }\n.button-050:hover { background: #f0f9ff; transform: translateY(-1px); }",
    "previewClass": "button-050"
  },
  {
    "id": "button-051",
    "title": "Button 51",
    "category": "button",
    "description": "Soft Sky button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "soft",
      "sky",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-051\">Button 51</button>",
    "cssCode": "\n.button-051 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 14px;\n  border: 1px solid #bae6fd;\n  background: #0284c7;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-051 { background: #f0f9ff; color: #0284c7; border-color: transparent; }\n.button-051:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #38bdf8; }",
    "previewClass": "button-051"
  },
  {
    "id": "button-052",
    "title": "Button 52",
    "category": "button",
    "description": "Lift Sky button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "lift",
      "sky",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-052\">Button 52</button>",
    "cssCode": "\n.button-052 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #0284c7;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-052 { box-shadow: 0 10px 24px -16px #38bdf8; }\n.button-052:hover { transform: translateY(-2px); box-shadow: 0 18px 30px -18px #38bdf8; }",
    "previewClass": "button-052"
  },
  {
    "id": "button-053",
    "title": "Button 53",
    "category": "button",
    "description": "Shine Sky button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "shine",
      "sky",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-053\">Button 53</button>",
    "cssCode": "\n.button-053 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #0284c7;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-053 { overflow: hidden; }\n.button-053::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  left: -140%;\n  background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,.34), transparent 65%);\n  transition: left .45s ease;\n}\n.button-053:hover::before { left: 140%; }",
    "previewClass": "button-053"
  },
  {
    "id": "button-054",
    "title": "Button 54",
    "category": "button",
    "description": "Slide Sky button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "slide",
      "sky",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-054\">Button 54</button>",
    "cssCode": "\n.button-054 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #0284c7;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-054 { background: transparent; color: #0284c7; overflow: hidden; }\n.button-054::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background: #0284c7;\n  transform: scaleX(0);\n  transform-origin: left center;\n  transition: transform .25s ease;\n  z-index: -1;\n}\n.button-054:hover { color: #ffffff; }\n.button-054:hover::before { transform: scaleX(1); }",
    "previewClass": "button-054"
  },
  {
    "id": "button-055",
    "title": "Button 55",
    "category": "button",
    "description": "Glow Sky button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "glow",
      "sky",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-055\">Button 55</button>",
    "cssCode": "\n.button-055 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #0284c7;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-055 { box-shadow: 0 0 0 0 #38bdf8; }\n.button-055:hover { box-shadow: 0 0 0 6px color-mix(in srgb, #38bdf8 18%, transparent), 0 18px 34px -20px #38bdf8; }",
    "previewClass": "button-055"
  },
  {
    "id": "button-056",
    "title": "Button 56",
    "category": "button",
    "description": "Pill Sky button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "pill",
      "sky",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-056\">Button 56</button>",
    "cssCode": "\n.button-056 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #0284c7;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-056 { box-shadow: inset 0 -2px 0 rgba(255,255,255,.12), 0 12px 24px -18px #38bdf8; }\n.button-056:hover { transform: translateY(-1px) scale(1.01); }",
    "previewClass": "button-056"
  },
  {
    "id": "button-057",
    "title": "Button 57",
    "category": "button",
    "description": "Solid Slate button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "solid",
      "slate",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-057\">Button 57</button>",
    "cssCode": "\n.button-057 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-057:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #64748b; }",
    "previewClass": "button-057"
  },
  {
    "id": "button-058",
    "title": "Button 58",
    "category": "button",
    "description": "Outline Slate button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "outline",
      "slate",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-058\">Button 58</button>",
    "cssCode": "\n.button-058 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-058 { background: transparent; color: #0f172a; border-width: 1.5px; }\n.button-058:hover { background: #f8fafc; transform: translateY(-1px); }",
    "previewClass": "button-058"
  },
  {
    "id": "button-059",
    "title": "Button 59",
    "category": "button",
    "description": "Soft Slate button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "soft",
      "slate",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-059\">Button 59</button>",
    "cssCode": "\n.button-059 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 14px;\n  border: 1px solid #cbd5e1;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-059 { background: #f8fafc; color: #0f172a; border-color: transparent; }\n.button-059:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #64748b; }",
    "previewClass": "button-059"
  },
  {
    "id": "button-060",
    "title": "Button 60",
    "category": "button",
    "description": "Lift Slate button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "lift",
      "slate",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-060\">Button 60</button>",
    "cssCode": "\n.button-060 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-060 { box-shadow: 0 10px 24px -16px #64748b; }\n.button-060:hover { transform: translateY(-2px); box-shadow: 0 18px 30px -18px #64748b; }",
    "previewClass": "button-060"
  },
  {
    "id": "button-061",
    "title": "Button 61",
    "category": "button",
    "description": "Shine Slate button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "shine",
      "slate",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-061\">Button 61</button>",
    "cssCode": "\n.button-061 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-061 { overflow: hidden; }\n.button-061::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  left: -140%;\n  background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,.34), transparent 65%);\n  transition: left .45s ease;\n}\n.button-061:hover::before { left: 140%; }",
    "previewClass": "button-061"
  },
  {
    "id": "button-062",
    "title": "Button 62",
    "category": "button",
    "description": "Slide Slate button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "slide",
      "slate",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-062\">Button 62</button>",
    "cssCode": "\n.button-062 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-062 { background: transparent; color: #0f172a; overflow: hidden; }\n.button-062::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background: #0f172a;\n  transform: scaleX(0);\n  transform-origin: left center;\n  transition: transform .25s ease;\n  z-index: -1;\n}\n.button-062:hover { color: #ffffff; }\n.button-062:hover::before { transform: scaleX(1); }",
    "previewClass": "button-062"
  },
  {
    "id": "button-063",
    "title": "Button 63",
    "category": "button",
    "description": "Glow Slate button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "glow",
      "slate",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-063\">Button 63</button>",
    "cssCode": "\n.button-063 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-063 { box-shadow: 0 0 0 0 #64748b; }\n.button-063:hover { box-shadow: 0 0 0 6px color-mix(in srgb, #64748b 18%, transparent), 0 18px 34px -20px #64748b; }",
    "previewClass": "button-063"
  },
  {
    "id": "button-064",
    "title": "Button 64",
    "category": "button",
    "description": "Pill Slate button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "pill",
      "slate",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-064\">Button 64</button>",
    "cssCode": "\n.button-064 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-064 { box-shadow: inset 0 -2px 0 rgba(255,255,255,.12), 0 12px 24px -18px #64748b; }\n.button-064:hover { transform: translateY(-1px) scale(1.01); }",
    "previewClass": "button-064"
  },
  {
    "id": "button-065",
    "title": "Button 65",
    "category": "button",
    "description": "Solid Lime button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "solid",
      "lime",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-065\">Button 65</button>",
    "cssCode": "\n.button-065 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #d9f99d;\n  background: #65a30d;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-065:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #a3e635; }",
    "previewClass": "button-065"
  },
  {
    "id": "button-066",
    "title": "Button 66",
    "category": "button",
    "description": "Outline Lime button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "outline",
      "lime",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-066\">Button 66</button>",
    "cssCode": "\n.button-066 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #d9f99d;\n  background: #65a30d;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-066 { background: transparent; color: #65a30d; border-width: 1.5px; }\n.button-066:hover { background: #f7fee7; transform: translateY(-1px); }",
    "previewClass": "button-066"
  },
  {
    "id": "button-067",
    "title": "Button 67",
    "category": "button",
    "description": "Soft Lime button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "soft",
      "lime",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-067\">Button 67</button>",
    "cssCode": "\n.button-067 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 14px;\n  border: 1px solid #d9f99d;\n  background: #65a30d;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-067 { background: #f7fee7; color: #65a30d; border-color: transparent; }\n.button-067:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #a3e635; }",
    "previewClass": "button-067"
  },
  {
    "id": "button-068",
    "title": "Button 68",
    "category": "button",
    "description": "Lift Lime button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "lift",
      "lime",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-068\">Button 68</button>",
    "cssCode": "\n.button-068 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #d9f99d;\n  background: #65a30d;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-068 { box-shadow: 0 10px 24px -16px #a3e635; }\n.button-068:hover { transform: translateY(-2px); box-shadow: 0 18px 30px -18px #a3e635; }",
    "previewClass": "button-068"
  },
  {
    "id": "button-069",
    "title": "Button 69",
    "category": "button",
    "description": "Shine Lime button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "shine",
      "lime",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-069\">Button 69</button>",
    "cssCode": "\n.button-069 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #d9f99d;\n  background: #65a30d;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-069 { overflow: hidden; }\n.button-069::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  left: -140%;\n  background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,.34), transparent 65%);\n  transition: left .45s ease;\n}\n.button-069:hover::before { left: 140%; }",
    "previewClass": "button-069"
  },
  {
    "id": "button-070",
    "title": "Button 70",
    "category": "button",
    "description": "Slide Lime button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "slide",
      "lime",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-070\">Button 70</button>",
    "cssCode": "\n.button-070 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #d9f99d;\n  background: #65a30d;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-070 { background: transparent; color: #65a30d; overflow: hidden; }\n.button-070::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background: #65a30d;\n  transform: scaleX(0);\n  transform-origin: left center;\n  transition: transform .25s ease;\n  z-index: -1;\n}\n.button-070:hover { color: #ffffff; }\n.button-070:hover::before { transform: scaleX(1); }",
    "previewClass": "button-070"
  },
  {
    "id": "button-071",
    "title": "Button 71",
    "category": "button",
    "description": "Glow Lime button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "glow",
      "lime",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-071\">Button 71</button>",
    "cssCode": "\n.button-071 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #d9f99d;\n  background: #65a30d;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-071 { box-shadow: 0 0 0 0 #a3e635; }\n.button-071:hover { box-shadow: 0 0 0 6px color-mix(in srgb, #a3e635 18%, transparent), 0 18px 34px -20px #a3e635; }",
    "previewClass": "button-071"
  },
  {
    "id": "button-072",
    "title": "Button 72",
    "category": "button",
    "description": "Pill Lime button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "pill",
      "lime",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-072\">Button 72</button>",
    "cssCode": "\n.button-072 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 999px;\n  border: 1px solid #d9f99d;\n  background: #65a30d;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-072 { box-shadow: inset 0 -2px 0 rgba(255,255,255,.12), 0 12px 24px -18px #a3e635; }\n.button-072:hover { transform: translateY(-1px) scale(1.01); }",
    "previewClass": "button-072"
  },
  {
    "id": "button-073",
    "title": "Button 73",
    "category": "button",
    "description": "Solid Orange button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "solid",
      "orange",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-073\">Button 73</button>",
    "cssCode": "\n.button-073 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fdba74;\n  background: #ea580c;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-073:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #fb923c; }",
    "previewClass": "button-073"
  },
  {
    "id": "button-074",
    "title": "Button 74",
    "category": "button",
    "description": "Outline Orange button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "outline",
      "orange",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-074\">Button 74</button>",
    "cssCode": "\n.button-074 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fdba74;\n  background: #ea580c;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-074 { background: transparent; color: #ea580c; border-width: 1.5px; }\n.button-074:hover { background: #fff7ed; transform: translateY(-1px); }",
    "previewClass": "button-074"
  },
  {
    "id": "button-075",
    "title": "Button 75",
    "category": "button",
    "description": "Soft Orange button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "soft",
      "orange",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-075\">Button 75</button>",
    "cssCode": "\n.button-075 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 14px;\n  border: 1px solid #fdba74;\n  background: #ea580c;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-075 { background: #fff7ed; color: #ea580c; border-color: transparent; }\n.button-075:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #fb923c; }",
    "previewClass": "button-075"
  },
  {
    "id": "button-076",
    "title": "Button 76",
    "category": "button",
    "description": "Lift Orange button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "lift",
      "orange",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-076\">Button 76</button>",
    "cssCode": "\n.button-076 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fdba74;\n  background: #ea580c;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-076 { box-shadow: 0 10px 24px -16px #fb923c; }\n.button-076:hover { transform: translateY(-2px); box-shadow: 0 18px 30px -18px #fb923c; }",
    "previewClass": "button-076"
  },
  {
    "id": "button-077",
    "title": "Button 77",
    "category": "button",
    "description": "Shine Orange button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "shine",
      "orange",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-077\">Button 77</button>",
    "cssCode": "\n.button-077 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fdba74;\n  background: #ea580c;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-077 { overflow: hidden; }\n.button-077::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  left: -140%;\n  background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,.34), transparent 65%);\n  transition: left .45s ease;\n}\n.button-077:hover::before { left: 140%; }",
    "previewClass": "button-077"
  },
  {
    "id": "button-078",
    "title": "Button 78",
    "category": "button",
    "description": "Slide Orange button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "slide",
      "orange",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-078\">Button 78</button>",
    "cssCode": "\n.button-078 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fdba74;\n  background: #ea580c;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-078 { background: transparent; color: #ea580c; overflow: hidden; }\n.button-078::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background: #ea580c;\n  transform: scaleX(0);\n  transform-origin: left center;\n  transition: transform .25s ease;\n  z-index: -1;\n}\n.button-078:hover { color: #ffffff; }\n.button-078:hover::before { transform: scaleX(1); }",
    "previewClass": "button-078"
  },
  {
    "id": "button-079",
    "title": "Button 79",
    "category": "button",
    "description": "Glow Orange button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "glow",
      "orange",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-079\">Button 79</button>",
    "cssCode": "\n.button-079 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fdba74;\n  background: #ea580c;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-079 { box-shadow: 0 0 0 0 #fb923c; }\n.button-079:hover { box-shadow: 0 0 0 6px color-mix(in srgb, #fb923c 18%, transparent), 0 18px 34px -20px #fb923c; }",
    "previewClass": "button-079"
  },
  {
    "id": "button-080",
    "title": "Button 80",
    "category": "button",
    "description": "Pill Orange button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "pill",
      "orange",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-080\">Button 80</button>",
    "cssCode": "\n.button-080 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 999px;\n  border: 1px solid #fdba74;\n  background: #ea580c;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-080 { box-shadow: inset 0 -2px 0 rgba(255,255,255,.12), 0 12px 24px -18px #fb923c; }\n.button-080:hover { transform: translateY(-1px) scale(1.01); }",
    "previewClass": "button-080"
  },
  {
    "id": "button-081",
    "title": "Button 81",
    "category": "button",
    "description": "Solid Pink button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "solid",
      "pink",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-081\">Button 81</button>",
    "cssCode": "\n.button-081 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fbcfe8;\n  background: #db2777;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-081:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #f472b6; }",
    "previewClass": "button-081"
  },
  {
    "id": "button-082",
    "title": "Button 82",
    "category": "button",
    "description": "Outline Pink button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "outline",
      "pink",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-082\">Button 82</button>",
    "cssCode": "\n.button-082 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fbcfe8;\n  background: #db2777;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-082 { background: transparent; color: #db2777; border-width: 1.5px; }\n.button-082:hover { background: #fdf2f8; transform: translateY(-1px); }",
    "previewClass": "button-082"
  },
  {
    "id": "button-083",
    "title": "Button 83",
    "category": "button",
    "description": "Soft Pink button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "soft",
      "pink",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-083\">Button 83</button>",
    "cssCode": "\n.button-083 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 14px;\n  border: 1px solid #fbcfe8;\n  background: #db2777;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-083 { background: #fdf2f8; color: #db2777; border-color: transparent; }\n.button-083:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #f472b6; }",
    "previewClass": "button-083"
  },
  {
    "id": "button-084",
    "title": "Button 84",
    "category": "button",
    "description": "Lift Pink button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "lift",
      "pink",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-084\">Button 84</button>",
    "cssCode": "\n.button-084 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fbcfe8;\n  background: #db2777;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-084 { box-shadow: 0 10px 24px -16px #f472b6; }\n.button-084:hover { transform: translateY(-2px); box-shadow: 0 18px 30px -18px #f472b6; }",
    "previewClass": "button-084"
  },
  {
    "id": "button-085",
    "title": "Button 85",
    "category": "button",
    "description": "Shine Pink button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "shine",
      "pink",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-085\">Button 85</button>",
    "cssCode": "\n.button-085 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fbcfe8;\n  background: #db2777;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-085 { overflow: hidden; }\n.button-085::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  left: -140%;\n  background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,.34), transparent 65%);\n  transition: left .45s ease;\n}\n.button-085:hover::before { left: 140%; }",
    "previewClass": "button-085"
  },
  {
    "id": "button-086",
    "title": "Button 86",
    "category": "button",
    "description": "Slide Pink button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "slide",
      "pink",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-086\">Button 86</button>",
    "cssCode": "\n.button-086 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fbcfe8;\n  background: #db2777;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-086 { background: transparent; color: #db2777; overflow: hidden; }\n.button-086::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background: #db2777;\n  transform: scaleX(0);\n  transform-origin: left center;\n  transition: transform .25s ease;\n  z-index: -1;\n}\n.button-086:hover { color: #ffffff; }\n.button-086:hover::before { transform: scaleX(1); }",
    "previewClass": "button-086"
  },
  {
    "id": "button-087",
    "title": "Button 87",
    "category": "button",
    "description": "Glow Pink button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "glow",
      "pink",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-087\">Button 87</button>",
    "cssCode": "\n.button-087 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #fbcfe8;\n  background: #db2777;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-087 { box-shadow: 0 0 0 0 #f472b6; }\n.button-087:hover { box-shadow: 0 0 0 6px color-mix(in srgb, #f472b6 18%, transparent), 0 18px 34px -20px #f472b6; }",
    "previewClass": "button-087"
  },
  {
    "id": "button-088",
    "title": "Button 88",
    "category": "button",
    "description": "Pill Pink button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "pill",
      "pink",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-088\">Button 88</button>",
    "cssCode": "\n.button-088 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 999px;\n  border: 1px solid #fbcfe8;\n  background: #db2777;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-088 { box-shadow: inset 0 -2px 0 rgba(255,255,255,.12), 0 12px 24px -18px #f472b6; }\n.button-088:hover { transform: translateY(-1px) scale(1.01); }",
    "previewClass": "button-088"
  },
  {
    "id": "button-089",
    "title": "Button 89",
    "category": "button",
    "description": "Solid Teal button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "solid",
      "teal",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-089\">Button 89</button>",
    "cssCode": "\n.button-089 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #99f6e4;\n  background: #0f766e;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-089:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #2dd4bf; }",
    "previewClass": "button-089"
  },
  {
    "id": "button-090",
    "title": "Button 90",
    "category": "button",
    "description": "Outline Teal button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "outline",
      "teal",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-090\">Button 90</button>",
    "cssCode": "\n.button-090 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #99f6e4;\n  background: #0f766e;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-090 { background: transparent; color: #0f766e; border-width: 1.5px; }\n.button-090:hover { background: #f0fdfa; transform: translateY(-1px); }",
    "previewClass": "button-090"
  },
  {
    "id": "button-091",
    "title": "Button 91",
    "category": "button",
    "description": "Soft Teal button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "soft",
      "teal",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-091\">Button 91</button>",
    "cssCode": "\n.button-091 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 14px;\n  border: 1px solid #99f6e4;\n  background: #0f766e;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-091 { background: #f0fdfa; color: #0f766e; border-color: transparent; }\n.button-091:hover { transform: translateY(-1px); box-shadow: 0 12px 26px -18px #2dd4bf; }",
    "previewClass": "button-091"
  },
  {
    "id": "button-092",
    "title": "Button 92",
    "category": "button",
    "description": "Lift Teal button with a polished UI-friendly hover state.",
    "tags": [
      "button",
      "cta",
      "lift",
      "teal",
      "interactive"
    ],
    "htmlCode": "<button class=\"button-092\">Button 92</button>",
    "cssCode": "\n.button-092 {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 0 18px;\n  border-radius: 10px;\n  border: 1px solid #99f6e4;\n  background: #0f766e;\n  color: #ffffff;\n  font: 700 13px/1 Inter, system-ui, sans-serif;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease, border-color .2s ease;\n}\n.button-092 { box-shadow: 0 10px 24px -16px #2dd4bf; }\n.button-092:hover { transform: translateY(-2px); box-shadow: 0 18px 30px -18px #2dd4bf; }",
    "previewClass": "button-092"
  },
  {
    "id": "checkbox-001",
    "title": "Checkbox 1",
    "category": "checkbox",
    "description": "Classic indigo checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "classic",
      "indigo",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-001\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-001 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-001 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-001 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #c7d2fe;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-001 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-001 input:checked + .box {\n  background: #4f46e5;\n  border-color: #4f46e5;\n  box-shadow: 0 10px 20px -18px #4f46e5;\n}\n.checkbox-001 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-001"
  },
  {
    "id": "checkbox-002",
    "title": "Checkbox 2",
    "category": "checkbox",
    "description": "Soft indigo checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "soft",
      "indigo",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-002\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-002 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-002 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-002 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n  border: 1.5px solid #c7d2fe;\n  background: #eef2ff;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #4f46e5;\n}\n.checkbox-002 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-002 input:checked + .box {\n  background: #4f46e5;\n  border-color: #4f46e5;\n  box-shadow: 0 10px 20px -18px #4f46e5;\n}\n.checkbox-002 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-002"
  },
  {
    "id": "checkbox-003",
    "title": "Checkbox 3",
    "category": "checkbox",
    "description": "Inset indigo checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "inset",
      "indigo",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-003\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-003 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-003 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-003 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  border: 1.5px solid #c7d2fe;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: inset 0 1px 2px rgba(15,23,42,.14);\n}\n.checkbox-003 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-003 input:checked + .box {\n  background: #4f46e5;\n  border-color: #4f46e5;\n  box-shadow: 0 10px 20px -18px #4f46e5;\n}\n.checkbox-003 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-003"
  },
  {
    "id": "checkbox-004",
    "title": "Checkbox 4",
    "category": "checkbox",
    "description": "Glow indigo checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "glow",
      "indigo",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-004\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-004 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-004 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-004 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #c7d2fe;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-004 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-004 input:checked + .box {\n  background: #4f46e5;\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #4f46e5 14%, transparent), 0 10px 20px -18px #4f46e5;\n}\n.checkbox-004 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-004"
  },
  {
    "id": "checkbox-005",
    "title": "Checkbox 5",
    "category": "checkbox",
    "description": "Chip indigo checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "chip",
      "indigo",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-005\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-005 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  position: relative;\n}\n.checkbox-005 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-005 .box {\n  position: relative;\n  display: block;\n  width: 32px;\n  height: 32px;\n  border-radius: 999px;\n  border: 1.5px solid #c7d2fe;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-005 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  border-radius: 999px; width: 10px; height: 10px; left: 50%; top: 50%; margin-left: -5px; margin-top: -5px; border: 0; background: #fff;\n}\n.checkbox-005 input:checked + .box {\n  background: #4f46e5;\n  border-color: #4f46e5;\n  box-shadow: 0 10px 20px -18px #4f46e5;\n}\n.checkbox-005 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-005"
  },
  {
    "id": "checkbox-006",
    "title": "Checkbox 6",
    "category": "checkbox",
    "description": "Classic cyan checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "classic",
      "cyan",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-006\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-006 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-006 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-006 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #a5f3fc;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-006 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-006 input:checked + .box {\n  background: #0891b2;\n  border-color: #0891b2;\n  box-shadow: 0 10px 20px -18px #0891b2;\n}\n.checkbox-006 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-006"
  },
  {
    "id": "checkbox-007",
    "title": "Checkbox 7",
    "category": "checkbox",
    "description": "Soft cyan checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "soft",
      "cyan",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-007\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-007 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-007 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-007 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n  border: 1.5px solid #a5f3fc;\n  background: #ecfeff;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #0891b2;\n}\n.checkbox-007 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-007 input:checked + .box {\n  background: #0891b2;\n  border-color: #0891b2;\n  box-shadow: 0 10px 20px -18px #0891b2;\n}\n.checkbox-007 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-007"
  },
  {
    "id": "checkbox-008",
    "title": "Checkbox 8",
    "category": "checkbox",
    "description": "Inset cyan checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "inset",
      "cyan",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-008\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-008 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-008 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-008 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  border: 1.5px solid #a5f3fc;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: inset 0 1px 2px rgba(15,23,42,.14);\n}\n.checkbox-008 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-008 input:checked + .box {\n  background: #0891b2;\n  border-color: #0891b2;\n  box-shadow: 0 10px 20px -18px #0891b2;\n}\n.checkbox-008 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-008"
  },
  {
    "id": "checkbox-009",
    "title": "Checkbox 9",
    "category": "checkbox",
    "description": "Glow cyan checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "glow",
      "cyan",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-009\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-009 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-009 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-009 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #a5f3fc;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-009 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-009 input:checked + .box {\n  background: #0891b2;\n  border-color: #0891b2;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #0891b2 14%, transparent), 0 10px 20px -18px #0891b2;\n}\n.checkbox-009 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-009"
  },
  {
    "id": "checkbox-010",
    "title": "Checkbox 10",
    "category": "checkbox",
    "description": "Chip cyan checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "chip",
      "cyan",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-010\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-010 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  position: relative;\n}\n.checkbox-010 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-010 .box {\n  position: relative;\n  display: block;\n  width: 32px;\n  height: 32px;\n  border-radius: 999px;\n  border: 1.5px solid #a5f3fc;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-010 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  border-radius: 999px; width: 10px; height: 10px; left: 50%; top: 50%; margin-left: -5px; margin-top: -5px; border: 0; background: #fff;\n}\n.checkbox-010 input:checked + .box {\n  background: #0891b2;\n  border-color: #0891b2;\n  box-shadow: 0 10px 20px -18px #0891b2;\n}\n.checkbox-010 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-010"
  },
  {
    "id": "checkbox-011",
    "title": "Checkbox 11",
    "category": "checkbox",
    "description": "Classic emerald checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "classic",
      "emerald",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-011\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-011 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-011 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-011 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #a7f3d0;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-011 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-011 input:checked + .box {\n  background: #059669;\n  border-color: #059669;\n  box-shadow: 0 10px 20px -18px #059669;\n}\n.checkbox-011 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-011"
  },
  {
    "id": "checkbox-012",
    "title": "Checkbox 12",
    "category": "checkbox",
    "description": "Soft emerald checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "soft",
      "emerald",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-012\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-012 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-012 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-012 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n  border: 1.5px solid #a7f3d0;\n  background: #ecfdf5;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #059669;\n}\n.checkbox-012 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-012 input:checked + .box {\n  background: #059669;\n  border-color: #059669;\n  box-shadow: 0 10px 20px -18px #059669;\n}\n.checkbox-012 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-012"
  },
  {
    "id": "checkbox-013",
    "title": "Checkbox 13",
    "category": "checkbox",
    "description": "Inset emerald checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "inset",
      "emerald",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-013\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-013 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-013 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-013 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  border: 1.5px solid #a7f3d0;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: inset 0 1px 2px rgba(15,23,42,.14);\n}\n.checkbox-013 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-013 input:checked + .box {\n  background: #059669;\n  border-color: #059669;\n  box-shadow: 0 10px 20px -18px #059669;\n}\n.checkbox-013 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-013"
  },
  {
    "id": "checkbox-014",
    "title": "Checkbox 14",
    "category": "checkbox",
    "description": "Glow emerald checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "glow",
      "emerald",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-014\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-014 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-014 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-014 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #a7f3d0;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-014 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-014 input:checked + .box {\n  background: #059669;\n  border-color: #059669;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #059669 14%, transparent), 0 10px 20px -18px #059669;\n}\n.checkbox-014 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-014"
  },
  {
    "id": "checkbox-015",
    "title": "Checkbox 15",
    "category": "checkbox",
    "description": "Chip emerald checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "chip",
      "emerald",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-015\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-015 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  position: relative;\n}\n.checkbox-015 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-015 .box {\n  position: relative;\n  display: block;\n  width: 32px;\n  height: 32px;\n  border-radius: 999px;\n  border: 1.5px solid #a7f3d0;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-015 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  border-radius: 999px; width: 10px; height: 10px; left: 50%; top: 50%; margin-left: -5px; margin-top: -5px; border: 0; background: #fff;\n}\n.checkbox-015 input:checked + .box {\n  background: #059669;\n  border-color: #059669;\n  box-shadow: 0 10px 20px -18px #059669;\n}\n.checkbox-015 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-015"
  },
  {
    "id": "checkbox-016",
    "title": "Checkbox 16",
    "category": "checkbox",
    "description": "Classic rose checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "classic",
      "rose",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-016\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-016 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-016 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-016 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #fecdd3;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-016 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-016 input:checked + .box {\n  background: #e11d48;\n  border-color: #e11d48;\n  box-shadow: 0 10px 20px -18px #e11d48;\n}\n.checkbox-016 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-016"
  },
  {
    "id": "checkbox-017",
    "title": "Checkbox 17",
    "category": "checkbox",
    "description": "Soft rose checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "soft",
      "rose",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-017\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-017 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-017 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-017 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n  border: 1.5px solid #fecdd3;\n  background: #fff1f2;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #e11d48;\n}\n.checkbox-017 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-017 input:checked + .box {\n  background: #e11d48;\n  border-color: #e11d48;\n  box-shadow: 0 10px 20px -18px #e11d48;\n}\n.checkbox-017 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-017"
  },
  {
    "id": "checkbox-018",
    "title": "Checkbox 18",
    "category": "checkbox",
    "description": "Inset rose checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "inset",
      "rose",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-018\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-018 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-018 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-018 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  border: 1.5px solid #fecdd3;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: inset 0 1px 2px rgba(15,23,42,.14);\n}\n.checkbox-018 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-018 input:checked + .box {\n  background: #e11d48;\n  border-color: #e11d48;\n  box-shadow: 0 10px 20px -18px #e11d48;\n}\n.checkbox-018 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-018"
  },
  {
    "id": "checkbox-019",
    "title": "Checkbox 19",
    "category": "checkbox",
    "description": "Glow rose checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "glow",
      "rose",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-019\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-019 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-019 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-019 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #fecdd3;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-019 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-019 input:checked + .box {\n  background: #e11d48;\n  border-color: #e11d48;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #e11d48 14%, transparent), 0 10px 20px -18px #e11d48;\n}\n.checkbox-019 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-019"
  },
  {
    "id": "checkbox-020",
    "title": "Checkbox 20",
    "category": "checkbox",
    "description": "Chip rose checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "chip",
      "rose",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-020\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-020 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  position: relative;\n}\n.checkbox-020 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-020 .box {\n  position: relative;\n  display: block;\n  width: 32px;\n  height: 32px;\n  border-radius: 999px;\n  border: 1.5px solid #fecdd3;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-020 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  border-radius: 999px; width: 10px; height: 10px; left: 50%; top: 50%; margin-left: -5px; margin-top: -5px; border: 0; background: #fff;\n}\n.checkbox-020 input:checked + .box {\n  background: #e11d48;\n  border-color: #e11d48;\n  box-shadow: 0 10px 20px -18px #e11d48;\n}\n.checkbox-020 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-020"
  },
  {
    "id": "checkbox-021",
    "title": "Checkbox 21",
    "category": "checkbox",
    "description": "Classic amber checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "classic",
      "amber",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-021\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-021 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-021 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-021 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #fde68a;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-021 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-021 input:checked + .box {\n  background: #d97706;\n  border-color: #d97706;\n  box-shadow: 0 10px 20px -18px #d97706;\n}\n.checkbox-021 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-021"
  },
  {
    "id": "checkbox-022",
    "title": "Checkbox 22",
    "category": "checkbox",
    "description": "Soft amber checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "soft",
      "amber",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-022\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-022 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-022 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-022 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n  border: 1.5px solid #fde68a;\n  background: #fffbeb;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #d97706;\n}\n.checkbox-022 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-022 input:checked + .box {\n  background: #d97706;\n  border-color: #d97706;\n  box-shadow: 0 10px 20px -18px #d97706;\n}\n.checkbox-022 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-022"
  },
  {
    "id": "checkbox-023",
    "title": "Checkbox 23",
    "category": "checkbox",
    "description": "Inset amber checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "inset",
      "amber",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-023\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-023 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-023 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-023 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  border: 1.5px solid #fde68a;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: inset 0 1px 2px rgba(15,23,42,.14);\n}\n.checkbox-023 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-023 input:checked + .box {\n  background: #d97706;\n  border-color: #d97706;\n  box-shadow: 0 10px 20px -18px #d97706;\n}\n.checkbox-023 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-023"
  },
  {
    "id": "checkbox-024",
    "title": "Checkbox 24",
    "category": "checkbox",
    "description": "Glow amber checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "glow",
      "amber",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-024\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-024 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-024 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-024 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #fde68a;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-024 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-024 input:checked + .box {\n  background: #d97706;\n  border-color: #d97706;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #d97706 14%, transparent), 0 10px 20px -18px #d97706;\n}\n.checkbox-024 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-024"
  },
  {
    "id": "checkbox-025",
    "title": "Checkbox 25",
    "category": "checkbox",
    "description": "Chip amber checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "chip",
      "amber",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-025\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-025 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  position: relative;\n}\n.checkbox-025 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-025 .box {\n  position: relative;\n  display: block;\n  width: 32px;\n  height: 32px;\n  border-radius: 999px;\n  border: 1.5px solid #fde68a;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-025 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  border-radius: 999px; width: 10px; height: 10px; left: 50%; top: 50%; margin-left: -5px; margin-top: -5px; border: 0; background: #fff;\n}\n.checkbox-025 input:checked + .box {\n  background: #d97706;\n  border-color: #d97706;\n  box-shadow: 0 10px 20px -18px #d97706;\n}\n.checkbox-025 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-025"
  },
  {
    "id": "checkbox-026",
    "title": "Checkbox 26",
    "category": "checkbox",
    "description": "Classic violet checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "classic",
      "violet",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-026\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-026 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-026 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-026 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #ddd6fe;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-026 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-026 input:checked + .box {\n  background: #7c3aed;\n  border-color: #7c3aed;\n  box-shadow: 0 10px 20px -18px #7c3aed;\n}\n.checkbox-026 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-026"
  },
  {
    "id": "checkbox-027",
    "title": "Checkbox 27",
    "category": "checkbox",
    "description": "Soft violet checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "soft",
      "violet",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-027\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-027 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-027 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-027 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n  border: 1.5px solid #ddd6fe;\n  background: #f5f3ff;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #7c3aed;\n}\n.checkbox-027 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-027 input:checked + .box {\n  background: #7c3aed;\n  border-color: #7c3aed;\n  box-shadow: 0 10px 20px -18px #7c3aed;\n}\n.checkbox-027 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-027"
  },
  {
    "id": "checkbox-028",
    "title": "Checkbox 28",
    "category": "checkbox",
    "description": "Inset violet checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "inset",
      "violet",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-028\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-028 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-028 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-028 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  border: 1.5px solid #ddd6fe;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: inset 0 1px 2px rgba(15,23,42,.14);\n}\n.checkbox-028 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-028 input:checked + .box {\n  background: #7c3aed;\n  border-color: #7c3aed;\n  box-shadow: 0 10px 20px -18px #7c3aed;\n}\n.checkbox-028 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-028"
  },
  {
    "id": "checkbox-029",
    "title": "Checkbox 29",
    "category": "checkbox",
    "description": "Glow violet checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "glow",
      "violet",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-029\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-029 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-029 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-029 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #ddd6fe;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-029 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-029 input:checked + .box {\n  background: #7c3aed;\n  border-color: #7c3aed;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #7c3aed 14%, transparent), 0 10px 20px -18px #7c3aed;\n}\n.checkbox-029 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-029"
  },
  {
    "id": "checkbox-030",
    "title": "Checkbox 30",
    "category": "checkbox",
    "description": "Chip violet checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "chip",
      "violet",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-030\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-030 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  position: relative;\n}\n.checkbox-030 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-030 .box {\n  position: relative;\n  display: block;\n  width: 32px;\n  height: 32px;\n  border-radius: 999px;\n  border: 1.5px solid #ddd6fe;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-030 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  border-radius: 999px; width: 10px; height: 10px; left: 50%; top: 50%; margin-left: -5px; margin-top: -5px; border: 0; background: #fff;\n}\n.checkbox-030 input:checked + .box {\n  background: #7c3aed;\n  border-color: #7c3aed;\n  box-shadow: 0 10px 20px -18px #7c3aed;\n}\n.checkbox-030 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-030"
  },
  {
    "id": "checkbox-031",
    "title": "Checkbox 31",
    "category": "checkbox",
    "description": "Classic sky checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "classic",
      "sky",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-031\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-031 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-031 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-031 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #bae6fd;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-031 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-031 input:checked + .box {\n  background: #0284c7;\n  border-color: #0284c7;\n  box-shadow: 0 10px 20px -18px #0284c7;\n}\n.checkbox-031 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-031"
  },
  {
    "id": "checkbox-032",
    "title": "Checkbox 32",
    "category": "checkbox",
    "description": "Soft sky checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "soft",
      "sky",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-032\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-032 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-032 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-032 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n  border: 1.5px solid #bae6fd;\n  background: #f0f9ff;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #0284c7;\n}\n.checkbox-032 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-032 input:checked + .box {\n  background: #0284c7;\n  border-color: #0284c7;\n  box-shadow: 0 10px 20px -18px #0284c7;\n}\n.checkbox-032 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-032"
  },
  {
    "id": "checkbox-033",
    "title": "Checkbox 33",
    "category": "checkbox",
    "description": "Inset sky checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "inset",
      "sky",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-033\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-033 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-033 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-033 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  border: 1.5px solid #bae6fd;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: inset 0 1px 2px rgba(15,23,42,.14);\n}\n.checkbox-033 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-033 input:checked + .box {\n  background: #0284c7;\n  border-color: #0284c7;\n  box-shadow: 0 10px 20px -18px #0284c7;\n}\n.checkbox-033 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-033"
  },
  {
    "id": "checkbox-034",
    "title": "Checkbox 34",
    "category": "checkbox",
    "description": "Glow sky checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "glow",
      "sky",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-034\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-034 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-034 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-034 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #bae6fd;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-034 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-034 input:checked + .box {\n  background: #0284c7;\n  border-color: #0284c7;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #0284c7 14%, transparent), 0 10px 20px -18px #0284c7;\n}\n.checkbox-034 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-034"
  },
  {
    "id": "checkbox-035",
    "title": "Checkbox 35",
    "category": "checkbox",
    "description": "Chip sky checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "chip",
      "sky",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-035\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-035 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  position: relative;\n}\n.checkbox-035 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-035 .box {\n  position: relative;\n  display: block;\n  width: 32px;\n  height: 32px;\n  border-radius: 999px;\n  border: 1.5px solid #bae6fd;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-035 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  border-radius: 999px; width: 10px; height: 10px; left: 50%; top: 50%; margin-left: -5px; margin-top: -5px; border: 0; background: #fff;\n}\n.checkbox-035 input:checked + .box {\n  background: #0284c7;\n  border-color: #0284c7;\n  box-shadow: 0 10px 20px -18px #0284c7;\n}\n.checkbox-035 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-035"
  },
  {
    "id": "checkbox-036",
    "title": "Checkbox 36",
    "category": "checkbox",
    "description": "Classic slate checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "classic",
      "slate",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-036\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-036 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-036 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-036 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #cbd5e1;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-036 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-036 input:checked + .box {\n  background: #334155;\n  border-color: #334155;\n  box-shadow: 0 10px 20px -18px #334155;\n}\n.checkbox-036 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-036"
  },
  {
    "id": "checkbox-037",
    "title": "Checkbox 37",
    "category": "checkbox",
    "description": "Soft slate checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "soft",
      "slate",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-037\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-037 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-037 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-037 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n  border: 1.5px solid #cbd5e1;\n  background: #f8fafc;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #334155;\n}\n.checkbox-037 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-037 input:checked + .box {\n  background: #334155;\n  border-color: #334155;\n  box-shadow: 0 10px 20px -18px #334155;\n}\n.checkbox-037 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-037"
  },
  {
    "id": "checkbox-038",
    "title": "Checkbox 38",
    "category": "checkbox",
    "description": "Inset slate checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "inset",
      "slate",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-038\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-038 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-038 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-038 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  border: 1.5px solid #cbd5e1;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: inset 0 1px 2px rgba(15,23,42,.14);\n}\n.checkbox-038 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-038 input:checked + .box {\n  background: #334155;\n  border-color: #334155;\n  box-shadow: 0 10px 20px -18px #334155;\n}\n.checkbox-038 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-038"
  },
  {
    "id": "checkbox-039",
    "title": "Checkbox 39",
    "category": "checkbox",
    "description": "Glow slate checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "glow",
      "slate",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-039\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-039 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-039 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-039 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #cbd5e1;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-039 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-039 input:checked + .box {\n  background: #334155;\n  border-color: #334155;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #334155 14%, transparent), 0 10px 20px -18px #334155;\n}\n.checkbox-039 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-039"
  },
  {
    "id": "checkbox-040",
    "title": "Checkbox 40",
    "category": "checkbox",
    "description": "Chip slate checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "chip",
      "slate",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-040\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-040 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  position: relative;\n}\n.checkbox-040 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-040 .box {\n  position: relative;\n  display: block;\n  width: 32px;\n  height: 32px;\n  border-radius: 999px;\n  border: 1.5px solid #cbd5e1;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-040 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  border-radius: 999px; width: 10px; height: 10px; left: 50%; top: 50%; margin-left: -5px; margin-top: -5px; border: 0; background: #fff;\n}\n.checkbox-040 input:checked + .box {\n  background: #334155;\n  border-color: #334155;\n  box-shadow: 0 10px 20px -18px #334155;\n}\n.checkbox-040 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-040"
  },
  {
    "id": "checkbox-041",
    "title": "Checkbox 41",
    "category": "checkbox",
    "description": "Classic lime checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "classic",
      "lime",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-041\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-041 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-041 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-041 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #d9f99d;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-041 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-041 input:checked + .box {\n  background: #65a30d;\n  border-color: #65a30d;\n  box-shadow: 0 10px 20px -18px #65a30d;\n}\n.checkbox-041 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-041"
  },
  {
    "id": "checkbox-042",
    "title": "Checkbox 42",
    "category": "checkbox",
    "description": "Soft lime checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "soft",
      "lime",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-042\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-042 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-042 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-042 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n  border: 1.5px solid #d9f99d;\n  background: #f7fee7;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #65a30d;\n}\n.checkbox-042 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-042 input:checked + .box {\n  background: #65a30d;\n  border-color: #65a30d;\n  box-shadow: 0 10px 20px -18px #65a30d;\n}\n.checkbox-042 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-042"
  },
  {
    "id": "checkbox-043",
    "title": "Checkbox 43",
    "category": "checkbox",
    "description": "Inset lime checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "inset",
      "lime",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-043\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-043 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-043 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-043 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  border: 1.5px solid #d9f99d;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: inset 0 1px 2px rgba(15,23,42,.14);\n}\n.checkbox-043 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-043 input:checked + .box {\n  background: #65a30d;\n  border-color: #65a30d;\n  box-shadow: 0 10px 20px -18px #65a30d;\n}\n.checkbox-043 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-043"
  },
  {
    "id": "checkbox-044",
    "title": "Checkbox 44",
    "category": "checkbox",
    "description": "Glow lime checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "glow",
      "lime",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-044\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-044 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-044 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-044 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #d9f99d;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-044 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-044 input:checked + .box {\n  background: #65a30d;\n  border-color: #65a30d;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #65a30d 14%, transparent), 0 10px 20px -18px #65a30d;\n}\n.checkbox-044 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-044"
  },
  {
    "id": "checkbox-045",
    "title": "Checkbox 45",
    "category": "checkbox",
    "description": "Chip lime checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "chip",
      "lime",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-045\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-045 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  position: relative;\n}\n.checkbox-045 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-045 .box {\n  position: relative;\n  display: block;\n  width: 32px;\n  height: 32px;\n  border-radius: 999px;\n  border: 1.5px solid #d9f99d;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-045 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  border-radius: 999px; width: 10px; height: 10px; left: 50%; top: 50%; margin-left: -5px; margin-top: -5px; border: 0; background: #fff;\n}\n.checkbox-045 input:checked + .box {\n  background: #65a30d;\n  border-color: #65a30d;\n  box-shadow: 0 10px 20px -18px #65a30d;\n}\n.checkbox-045 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-045"
  },
  {
    "id": "checkbox-046",
    "title": "Checkbox 46",
    "category": "checkbox",
    "description": "Classic orange checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "classic",
      "orange",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-046\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-046 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-046 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-046 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #fdba74;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-046 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-046 input:checked + .box {\n  background: #ea580c;\n  border-color: #ea580c;\n  box-shadow: 0 10px 20px -18px #ea580c;\n}\n.checkbox-046 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-046"
  },
  {
    "id": "checkbox-047",
    "title": "Checkbox 47",
    "category": "checkbox",
    "description": "Soft orange checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "soft",
      "orange",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-047\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-047 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-047 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-047 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n  border: 1.5px solid #fdba74;\n  background: #fff7ed;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #ea580c;\n}\n.checkbox-047 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-047 input:checked + .box {\n  background: #ea580c;\n  border-color: #ea580c;\n  box-shadow: 0 10px 20px -18px #ea580c;\n}\n.checkbox-047 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-047"
  },
  {
    "id": "checkbox-048",
    "title": "Checkbox 48",
    "category": "checkbox",
    "description": "Inset orange checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "inset",
      "orange",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-048\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-048 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-048 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-048 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  border: 1.5px solid #fdba74;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: inset 0 1px 2px rgba(15,23,42,.14);\n}\n.checkbox-048 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-048 input:checked + .box {\n  background: #ea580c;\n  border-color: #ea580c;\n  box-shadow: 0 10px 20px -18px #ea580c;\n}\n.checkbox-048 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-048"
  },
  {
    "id": "checkbox-049",
    "title": "Checkbox 49",
    "category": "checkbox",
    "description": "Glow orange checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "glow",
      "orange",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-049\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-049 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-049 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-049 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #fdba74;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-049 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-049 input:checked + .box {\n  background: #ea580c;\n  border-color: #ea580c;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #ea580c 14%, transparent), 0 10px 20px -18px #ea580c;\n}\n.checkbox-049 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-049"
  },
  {
    "id": "checkbox-050",
    "title": "Checkbox 50",
    "category": "checkbox",
    "description": "Chip orange checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "chip",
      "orange",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-050\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-050 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  position: relative;\n}\n.checkbox-050 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-050 .box {\n  position: relative;\n  display: block;\n  width: 32px;\n  height: 32px;\n  border-radius: 999px;\n  border: 1.5px solid #fdba74;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-050 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  border-radius: 999px; width: 10px; height: 10px; left: 50%; top: 50%; margin-left: -5px; margin-top: -5px; border: 0; background: #fff;\n}\n.checkbox-050 input:checked + .box {\n  background: #ea580c;\n  border-color: #ea580c;\n  box-shadow: 0 10px 20px -18px #ea580c;\n}\n.checkbox-050 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-050"
  },
  {
    "id": "checkbox-051",
    "title": "Checkbox 51",
    "category": "checkbox",
    "description": "Classic pink checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "classic",
      "pink",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-051\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-051 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-051 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-051 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #fbcfe8;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-051 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-051 input:checked + .box {\n  background: #db2777;\n  border-color: #db2777;\n  box-shadow: 0 10px 20px -18px #db2777;\n}\n.checkbox-051 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-051"
  },
  {
    "id": "checkbox-052",
    "title": "Checkbox 52",
    "category": "checkbox",
    "description": "Soft pink checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "soft",
      "pink",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-052\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-052 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-052 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-052 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n  border: 1.5px solid #fbcfe8;\n  background: #fdf2f8;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #db2777;\n}\n.checkbox-052 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-052 input:checked + .box {\n  background: #db2777;\n  border-color: #db2777;\n  box-shadow: 0 10px 20px -18px #db2777;\n}\n.checkbox-052 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-052"
  },
  {
    "id": "checkbox-053",
    "title": "Checkbox 53",
    "category": "checkbox",
    "description": "Inset pink checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "inset",
      "pink",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-053\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-053 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-053 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-053 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  border: 1.5px solid #fbcfe8;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: inset 0 1px 2px rgba(15,23,42,.14);\n}\n.checkbox-053 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-053 input:checked + .box {\n  background: #db2777;\n  border-color: #db2777;\n  box-shadow: 0 10px 20px -18px #db2777;\n}\n.checkbox-053 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-053"
  },
  {
    "id": "checkbox-054",
    "title": "Checkbox 54",
    "category": "checkbox",
    "description": "Glow pink checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "glow",
      "pink",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-054\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-054 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-054 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-054 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #fbcfe8;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-054 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-054 input:checked + .box {\n  background: #db2777;\n  border-color: #db2777;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #db2777 14%, transparent), 0 10px 20px -18px #db2777;\n}\n.checkbox-054 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-054"
  },
  {
    "id": "checkbox-055",
    "title": "Checkbox 55",
    "category": "checkbox",
    "description": "Chip pink checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "chip",
      "pink",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-055\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-055 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  position: relative;\n}\n.checkbox-055 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-055 .box {\n  position: relative;\n  display: block;\n  width: 32px;\n  height: 32px;\n  border-radius: 999px;\n  border: 1.5px solid #fbcfe8;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-055 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  border-radius: 999px; width: 10px; height: 10px; left: 50%; top: 50%; margin-left: -5px; margin-top: -5px; border: 0; background: #fff;\n}\n.checkbox-055 input:checked + .box {\n  background: #db2777;\n  border-color: #db2777;\n  box-shadow: 0 10px 20px -18px #db2777;\n}\n.checkbox-055 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-055"
  },
  {
    "id": "checkbox-056",
    "title": "Checkbox 56",
    "category": "checkbox",
    "description": "Classic teal checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "classic",
      "teal",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-056\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-056 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-056 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-056 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #99f6e4;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-056 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-056 input:checked + .box {\n  background: #0f766e;\n  border-color: #0f766e;\n  box-shadow: 0 10px 20px -18px #0f766e;\n}\n.checkbox-056 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-056"
  },
  {
    "id": "checkbox-057",
    "title": "Checkbox 57",
    "category": "checkbox",
    "description": "Soft teal checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "soft",
      "teal",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-057\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-057 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-057 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-057 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n  border: 1.5px solid #99f6e4;\n  background: #f0fdfa;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #0f766e;\n}\n.checkbox-057 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-057 input:checked + .box {\n  background: #0f766e;\n  border-color: #0f766e;\n  box-shadow: 0 10px 20px -18px #0f766e;\n}\n.checkbox-057 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-057"
  },
  {
    "id": "checkbox-058",
    "title": "Checkbox 58",
    "category": "checkbox",
    "description": "Inset teal checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "inset",
      "teal",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-058\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-058 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-058 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-058 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  border: 1.5px solid #99f6e4;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: inset 0 1px 2px rgba(15,23,42,.14);\n}\n.checkbox-058 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-058 input:checked + .box {\n  background: #0f766e;\n  border-color: #0f766e;\n  box-shadow: 0 10px 20px -18px #0f766e;\n}\n.checkbox-058 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-058"
  },
  {
    "id": "checkbox-059",
    "title": "Checkbox 59",
    "category": "checkbox",
    "description": "Glow teal checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "glow",
      "teal",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-059\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-059 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-059 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-059 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #99f6e4;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-059 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-059 input:checked + .box {\n  background: #0f766e;\n  border-color: #0f766e;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #0f766e 14%, transparent), 0 10px 20px -18px #0f766e;\n}\n.checkbox-059 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-059"
  },
  {
    "id": "checkbox-060",
    "title": "Checkbox 60",
    "category": "checkbox",
    "description": "Chip teal checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "chip",
      "teal",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-060\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-060 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  position: relative;\n}\n.checkbox-060 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-060 .box {\n  position: relative;\n  display: block;\n  width: 32px;\n  height: 32px;\n  border-radius: 999px;\n  border: 1.5px solid #99f6e4;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-060 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  border-radius: 999px; width: 10px; height: 10px; left: 50%; top: 50%; margin-left: -5px; margin-top: -5px; border: 0; background: #fff;\n}\n.checkbox-060 input:checked + .box {\n  background: #0f766e;\n  border-color: #0f766e;\n  box-shadow: 0 10px 20px -18px #0f766e;\n}\n.checkbox-060 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-060"
  },
  {
    "id": "checkbox-061",
    "title": "Checkbox 61",
    "category": "checkbox",
    "description": "Classic red checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "classic",
      "red",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-061\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-061 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-061 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-061 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #fecaca;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-061 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-061 input:checked + .box {\n  background: #dc2626;\n  border-color: #dc2626;\n  box-shadow: 0 10px 20px -18px #dc2626;\n}\n.checkbox-061 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-061"
  },
  {
    "id": "checkbox-062",
    "title": "Checkbox 62",
    "category": "checkbox",
    "description": "Soft red checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "soft",
      "red",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-062\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-062 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-062 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-062 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n  border: 1.5px solid #fecaca;\n  background: #fef2f2;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #dc2626;\n}\n.checkbox-062 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-062 input:checked + .box {\n  background: #dc2626;\n  border-color: #dc2626;\n  box-shadow: 0 10px 20px -18px #dc2626;\n}\n.checkbox-062 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-062"
  },
  {
    "id": "checkbox-063",
    "title": "Checkbox 63",
    "category": "checkbox",
    "description": "Inset red checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "inset",
      "red",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-063\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-063 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-063 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-063 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  border: 1.5px solid #fecaca;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: inset 0 1px 2px rgba(15,23,42,.14);\n}\n.checkbox-063 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-063 input:checked + .box {\n  background: #dc2626;\n  border-color: #dc2626;\n  box-shadow: 0 10px 20px -18px #dc2626;\n}\n.checkbox-063 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-063"
  },
  {
    "id": "checkbox-064",
    "title": "Checkbox 64",
    "category": "checkbox",
    "description": "Glow red checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "glow",
      "red",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-064\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-064 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  position: relative;\n}\n.checkbox-064 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-064 .box {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n  border: 1.5px solid #fecaca;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-064 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  \n}\n.checkbox-064 input:checked + .box {\n  background: #dc2626;\n  border-color: #dc2626;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #dc2626 14%, transparent), 0 10px 20px -18px #dc2626;\n}\n.checkbox-064 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-064"
  },
  {
    "id": "checkbox-065",
    "title": "Checkbox 65",
    "category": "checkbox",
    "description": "Chip red checkbox for settings, lists, and modern form UIs.",
    "tags": [
      "checkbox",
      "form",
      "chip",
      "red",
      "selection"
    ],
    "htmlCode": "<label class=\"checkbox-065\"><input type=\"checkbox\" checked /><span class=\"box\"></span></label>",
    "cssCode": "\n.checkbox-065 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  position: relative;\n}\n.checkbox-065 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.checkbox-065 .box {\n  position: relative;\n  display: block;\n  width: 32px;\n  height: 32px;\n  border-radius: 999px;\n  border: 1.5px solid #fecaca;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.checkbox-065 .box::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 6px;\n  height: 12px;\n  margin-left: -3px;\n  margin-top: -8px;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotate(45deg) scale(0);\n  transition: transform .18s ease;\n  border-radius: 999px; width: 10px; height: 10px; left: 50%; top: 50%; margin-left: -5px; margin-top: -5px; border: 0; background: #fff;\n}\n.checkbox-065 input:checked + .box {\n  background: #dc2626;\n  border-color: #dc2626;\n  box-shadow: 0 10px 20px -18px #dc2626;\n}\n.checkbox-065 input:checked + .box::after {\n  transform: rotate(45deg) scale(1);\n}",
    "previewClass": "checkbox-065"
  },
  {
    "id": "radio-001",
    "title": "Radio 1",
    "category": "radio",
    "description": "Classic indigo radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "classic",
      "indigo",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-001\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-001 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-001 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-001 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #c7d2fe;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-001 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #4f46e5;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-001 input:checked + .dot {\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #4f46e5 14%, transparent);\n}\n.radio-001 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-001"
  },
  {
    "id": "radio-002",
    "title": "Radio 2",
    "category": "radio",
    "description": "Soft indigo radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "soft",
      "indigo",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-002\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-002 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-002 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-002 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #c7d2fe;\n  background: #eef2ff;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #4f46e5;\n}\n.radio-002 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #4f46e5;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-002 input:checked + .dot {\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #4f46e5 14%, transparent);\n}\n.radio-002 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-002"
  },
  {
    "id": "radio-003",
    "title": "Radio 3",
    "category": "radio",
    "description": "Ring indigo radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "ring",
      "indigo",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-003\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-003 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-003 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-003 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #c7d2fe;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-003 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #4f46e5;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-003 input:checked + .dot {\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #4f46e5 16%, transparent);\n}\n.radio-003 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-003"
  },
  {
    "id": "radio-004",
    "title": "Radio 4",
    "category": "radio",
    "description": "Classic cyan radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "classic",
      "cyan",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-004\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-004 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-004 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-004 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #a5f3fc;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-004 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #0891b2;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-004 input:checked + .dot {\n  border-color: #0891b2;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #0891b2 14%, transparent);\n}\n.radio-004 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-004"
  },
  {
    "id": "radio-005",
    "title": "Radio 5",
    "category": "radio",
    "description": "Soft cyan radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "soft",
      "cyan",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-005\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-005 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-005 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-005 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #a5f3fc;\n  background: #ecfeff;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #0891b2;\n}\n.radio-005 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #0891b2;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-005 input:checked + .dot {\n  border-color: #0891b2;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #0891b2 14%, transparent);\n}\n.radio-005 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-005"
  },
  {
    "id": "radio-006",
    "title": "Radio 6",
    "category": "radio",
    "description": "Ring cyan radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "ring",
      "cyan",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-006\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-006 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-006 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-006 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #a5f3fc;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-006 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #0891b2;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-006 input:checked + .dot {\n  border-color: #0891b2;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #0891b2 16%, transparent);\n}\n.radio-006 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-006"
  },
  {
    "id": "radio-007",
    "title": "Radio 7",
    "category": "radio",
    "description": "Classic emerald radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "classic",
      "emerald",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-007\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-007 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-007 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-007 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #a7f3d0;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-007 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #059669;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-007 input:checked + .dot {\n  border-color: #059669;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #059669 14%, transparent);\n}\n.radio-007 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-007"
  },
  {
    "id": "radio-008",
    "title": "Radio 8",
    "category": "radio",
    "description": "Soft emerald radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "soft",
      "emerald",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-008\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-008 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-008 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-008 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #a7f3d0;\n  background: #ecfdf5;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #059669;\n}\n.radio-008 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #059669;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-008 input:checked + .dot {\n  border-color: #059669;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #059669 14%, transparent);\n}\n.radio-008 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-008"
  },
  {
    "id": "radio-009",
    "title": "Radio 9",
    "category": "radio",
    "description": "Ring emerald radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "ring",
      "emerald",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-009\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-009 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-009 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-009 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #a7f3d0;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-009 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #059669;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-009 input:checked + .dot {\n  border-color: #059669;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #059669 16%, transparent);\n}\n.radio-009 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-009"
  },
  {
    "id": "radio-010",
    "title": "Radio 10",
    "category": "radio",
    "description": "Classic rose radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "classic",
      "rose",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-010\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-010 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-010 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-010 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #fecdd3;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-010 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #e11d48;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-010 input:checked + .dot {\n  border-color: #e11d48;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #e11d48 14%, transparent);\n}\n.radio-010 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-010"
  },
  {
    "id": "radio-011",
    "title": "Radio 11",
    "category": "radio",
    "description": "Soft rose radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "soft",
      "rose",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-011\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-011 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-011 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-011 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #fecdd3;\n  background: #fff1f2;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #e11d48;\n}\n.radio-011 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #e11d48;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-011 input:checked + .dot {\n  border-color: #e11d48;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #e11d48 14%, transparent);\n}\n.radio-011 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-011"
  },
  {
    "id": "radio-012",
    "title": "Radio 12",
    "category": "radio",
    "description": "Ring rose radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "ring",
      "rose",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-012\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-012 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-012 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-012 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #fecdd3;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-012 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #e11d48;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-012 input:checked + .dot {\n  border-color: #e11d48;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #e11d48 16%, transparent);\n}\n.radio-012 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-012"
  },
  {
    "id": "radio-013",
    "title": "Radio 13",
    "category": "radio",
    "description": "Classic amber radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "classic",
      "amber",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-013\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-013 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-013 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-013 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #fde68a;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-013 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #d97706;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-013 input:checked + .dot {\n  border-color: #d97706;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #d97706 14%, transparent);\n}\n.radio-013 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-013"
  },
  {
    "id": "radio-014",
    "title": "Radio 14",
    "category": "radio",
    "description": "Soft amber radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "soft",
      "amber",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-014\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-014 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-014 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-014 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #fde68a;\n  background: #fffbeb;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #d97706;\n}\n.radio-014 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #d97706;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-014 input:checked + .dot {\n  border-color: #d97706;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #d97706 14%, transparent);\n}\n.radio-014 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-014"
  },
  {
    "id": "radio-015",
    "title": "Radio 15",
    "category": "radio",
    "description": "Ring amber radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "ring",
      "amber",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-015\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-015 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-015 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-015 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #fde68a;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-015 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #d97706;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-015 input:checked + .dot {\n  border-color: #d97706;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #d97706 16%, transparent);\n}\n.radio-015 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-015"
  },
  {
    "id": "radio-016",
    "title": "Radio 16",
    "category": "radio",
    "description": "Classic violet radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "classic",
      "violet",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-016\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-016 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-016 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-016 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #ddd6fe;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-016 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #7c3aed;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-016 input:checked + .dot {\n  border-color: #7c3aed;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #7c3aed 14%, transparent);\n}\n.radio-016 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-016"
  },
  {
    "id": "radio-017",
    "title": "Radio 17",
    "category": "radio",
    "description": "Soft violet radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "soft",
      "violet",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-017\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-017 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-017 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-017 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #ddd6fe;\n  background: #f5f3ff;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #7c3aed;\n}\n.radio-017 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #7c3aed;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-017 input:checked + .dot {\n  border-color: #7c3aed;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #7c3aed 14%, transparent);\n}\n.radio-017 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-017"
  },
  {
    "id": "radio-018",
    "title": "Radio 18",
    "category": "radio",
    "description": "Ring violet radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "ring",
      "violet",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-018\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-018 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-018 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-018 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #ddd6fe;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-018 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #7c3aed;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-018 input:checked + .dot {\n  border-color: #7c3aed;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #7c3aed 16%, transparent);\n}\n.radio-018 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-018"
  },
  {
    "id": "radio-019",
    "title": "Radio 19",
    "category": "radio",
    "description": "Classic sky radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "classic",
      "sky",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-019\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-019 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-019 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-019 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #bae6fd;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-019 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #0284c7;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-019 input:checked + .dot {\n  border-color: #0284c7;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #0284c7 14%, transparent);\n}\n.radio-019 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-019"
  },
  {
    "id": "radio-020",
    "title": "Radio 20",
    "category": "radio",
    "description": "Soft sky radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "soft",
      "sky",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-020\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-020 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-020 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-020 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #bae6fd;\n  background: #f0f9ff;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #0284c7;\n}\n.radio-020 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #0284c7;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-020 input:checked + .dot {\n  border-color: #0284c7;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #0284c7 14%, transparent);\n}\n.radio-020 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-020"
  },
  {
    "id": "radio-021",
    "title": "Radio 21",
    "category": "radio",
    "description": "Ring sky radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "ring",
      "sky",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-021\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-021 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-021 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-021 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #bae6fd;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-021 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #0284c7;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-021 input:checked + .dot {\n  border-color: #0284c7;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #0284c7 16%, transparent);\n}\n.radio-021 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-021"
  },
  {
    "id": "radio-022",
    "title": "Radio 22",
    "category": "radio",
    "description": "Classic slate radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "classic",
      "slate",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-022\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-022 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-022 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-022 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #cbd5e1;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-022 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #334155;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-022 input:checked + .dot {\n  border-color: #334155;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #334155 14%, transparent);\n}\n.radio-022 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-022"
  },
  {
    "id": "radio-023",
    "title": "Radio 23",
    "category": "radio",
    "description": "Soft slate radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "soft",
      "slate",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-023\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-023 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-023 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-023 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #cbd5e1;\n  background: #f8fafc;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #334155;\n}\n.radio-023 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #334155;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-023 input:checked + .dot {\n  border-color: #334155;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #334155 14%, transparent);\n}\n.radio-023 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-023"
  },
  {
    "id": "radio-024",
    "title": "Radio 24",
    "category": "radio",
    "description": "Ring slate radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "ring",
      "slate",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-024\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-024 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-024 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-024 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #cbd5e1;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-024 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #334155;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-024 input:checked + .dot {\n  border-color: #334155;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #334155 16%, transparent);\n}\n.radio-024 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-024"
  },
  {
    "id": "radio-025",
    "title": "Radio 25",
    "category": "radio",
    "description": "Classic lime radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "classic",
      "lime",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-025\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-025 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-025 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-025 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #d9f99d;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-025 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #65a30d;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-025 input:checked + .dot {\n  border-color: #65a30d;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #65a30d 14%, transparent);\n}\n.radio-025 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-025"
  },
  {
    "id": "radio-026",
    "title": "Radio 26",
    "category": "radio",
    "description": "Soft lime radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "soft",
      "lime",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-026\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-026 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-026 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-026 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #d9f99d;\n  background: #f7fee7;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #65a30d;\n}\n.radio-026 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #65a30d;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-026 input:checked + .dot {\n  border-color: #65a30d;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #65a30d 14%, transparent);\n}\n.radio-026 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-026"
  },
  {
    "id": "radio-027",
    "title": "Radio 27",
    "category": "radio",
    "description": "Ring lime radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "ring",
      "lime",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-027\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-027 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-027 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-027 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #d9f99d;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-027 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #65a30d;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-027 input:checked + .dot {\n  border-color: #65a30d;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #65a30d 16%, transparent);\n}\n.radio-027 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-027"
  },
  {
    "id": "radio-028",
    "title": "Radio 28",
    "category": "radio",
    "description": "Classic pink radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "classic",
      "pink",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-028\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-028 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-028 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-028 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #fbcfe8;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-028 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #db2777;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-028 input:checked + .dot {\n  border-color: #db2777;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #db2777 14%, transparent);\n}\n.radio-028 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-028"
  },
  {
    "id": "radio-029",
    "title": "Radio 29",
    "category": "radio",
    "description": "Soft pink radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "soft",
      "pink",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-029\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-029 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-029 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-029 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #fbcfe8;\n  background: #fdf2f8;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #db2777;\n}\n.radio-029 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #db2777;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-029 input:checked + .dot {\n  border-color: #db2777;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #db2777 14%, transparent);\n}\n.radio-029 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-029"
  },
  {
    "id": "radio-030",
    "title": "Radio 30",
    "category": "radio",
    "description": "Ring pink radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "ring",
      "pink",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-030\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-030 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-030 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-030 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #fbcfe8;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-030 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #db2777;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-030 input:checked + .dot {\n  border-color: #db2777;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #db2777 16%, transparent);\n}\n.radio-030 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-030"
  },
  {
    "id": "radio-031",
    "title": "Radio 31",
    "category": "radio",
    "description": "Classic teal radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "classic",
      "teal",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-031\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-031 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-031 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-031 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #99f6e4;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-031 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #0f766e;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-031 input:checked + .dot {\n  border-color: #0f766e;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #0f766e 14%, transparent);\n}\n.radio-031 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-031"
  },
  {
    "id": "radio-032",
    "title": "Radio 32",
    "category": "radio",
    "description": "Soft teal radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "soft",
      "teal",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-032\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-032 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-032 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-032 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #99f6e4;\n  background: #f0fdfa;\n  transition: all .2s ease;\n  box-shadow: 0 8px 18px -20px #0f766e;\n}\n.radio-032 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #0f766e;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-032 input:checked + .dot {\n  border-color: #0f766e;\n  box-shadow: 0 0 0 4px color-mix(in srgb, #0f766e 14%, transparent);\n}\n.radio-032 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-032"
  },
  {
    "id": "radio-033",
    "title": "Radio 33",
    "category": "radio",
    "description": "Ring teal radio control for clean option picking flows.",
    "tags": [
      "radio",
      "form",
      "ring",
      "teal",
      "selection"
    ],
    "htmlCode": "<label class=\"radio-033\"><input type=\"radio\" checked /><span class=\"dot\"></span></label>",
    "cssCode": "\n.radio-033 {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  position: relative;\n}\n.radio-033 input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n}\n.radio-033 .dot {\n  position: relative;\n  display: block;\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1.5px solid #99f6e4;\n  background: #fff;\n  transition: all .2s ease;\n  box-shadow: none;\n}\n.radio-033 .dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 5px;\n  border-radius: 999px;\n  background: #0f766e;\n  transform: scale(0);\n  transition: transform .18s ease;\n}\n.radio-033 input:checked + .dot {\n  border-color: #0f766e;\n  box-shadow: 0 0 0 6px color-mix(in srgb, #0f766e 16%, transparent);\n}\n.radio-033 input:checked + .dot::after {\n  transform: scale(1);\n}",
    "previewClass": "radio-033"
  },
  {
    "id": "shadow-000",
    "title": "Shadow 0",
    "category": "shadow",
    "description": "Soft box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "soft",
      "slate",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-000\"></div>",
    "cssCode": "\n.shadow-000 {\n  width: 108px;\n  height: 82px;\n  border-radius: 14px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f172a 12%, #e2e8f0);\n  box-shadow: 0 18px 30px -24px rgba(15,23,42,0.18);\n}",
    "previewClass": "shadow-000"
  },
  {
    "id": "shadow-001",
    "title": "Shadow 1",
    "category": "shadow",
    "description": "Lifted box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "lifted",
      "slate",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-001\"></div>",
    "cssCode": "\n.shadow-001 {\n  width: 116px;\n  height: 82px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f172a 12%, #e2e8f0);\n  box-shadow: 0 24px 34px -22px rgba(15,23,42,0.18), 0 8px 12px -10px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-001"
  },
  {
    "id": "shadow-002",
    "title": "Shadow 2",
    "category": "shadow",
    "description": "Layered box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "layered",
      "slate",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-002\"></div>",
    "cssCode": "\n.shadow-002 {\n  width: 112px;\n  height: 84px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f172a 12%, #e2e8f0);\n  box-shadow: 0 1px 0 rgba(255,255,255,0.92) inset, 0 10px 18px -16px rgba(15,23,42,0.18), 0 28px 38px -32px rgba(15,23,42,0.16);\n}",
    "previewClass": "shadow-002"
  },
  {
    "id": "shadow-003",
    "title": "Shadow 3",
    "category": "shadow",
    "description": "Inset box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "inset",
      "slate",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-003\"></div>",
    "cssCode": "\n.shadow-003 {\n  width: 110px;\n  height: 84px;\n  border-radius: 16px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f172a 12%, #e2e8f0);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -12px 18px -18px rgba(15,23,42,0.18), 0 12px 22px -22px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-003"
  },
  {
    "id": "shadow-004",
    "title": "Shadow 4",
    "category": "shadow",
    "description": "Glow box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "glow",
      "slate",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-004\"></div>",
    "cssCode": "\n.shadow-004 {\n  width: 112px;\n  height: 84px;\n  border-radius: 20px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f172a 12%, #e2e8f0);\n  box-shadow: 0 0 0 1px color-mix(in srgb, #0f172a 16%, #e2e8f0), 0 24px 38px -28px rgba(15,23,42,0.18), 0 0 24px -20px rgba(15,23,42,0.18);\n}",
    "previewClass": "shadow-004"
  },
  {
    "id": "shadow-005",
    "title": "Shadow 5",
    "category": "shadow",
    "description": "Hard Edge box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "hard-edge",
      "slate",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-005\"></div>",
    "cssCode": "\n.shadow-005 {\n  width: 102px;\n  height: 78px;\n  border-radius: 8px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f172a 12%, #e2e8f0);\n  box-shadow: 10px 10px 0 -5px color-mix(in srgb, #0f172a 28%, transparent);\n}",
    "previewClass": "shadow-005"
  },
  {
    "id": "shadow-006",
    "title": "Shadow 6",
    "category": "shadow",
    "description": "Floating box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "floating",
      "slate",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-006\"></div>",
    "cssCode": "\n.shadow-006 {\n  width: 114px;\n  height: 74px;\n  border-radius: 24px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f172a 12%, #e2e8f0);\n  box-shadow: 0 30px 44px -26px rgba(15,23,42,0.18);\n}",
    "previewClass": "shadow-006"
  },
  {
    "id": "shadow-007",
    "title": "Shadow 7",
    "category": "shadow",
    "description": "Ambient box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "ambient",
      "slate",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-007\"></div>",
    "cssCode": "\n.shadow-007 {\n  width: 118px;\n  height: 88px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f172a 12%, #e2e8f0);\n  box-shadow: 0 14px 16px -16px rgba(15,23,42,0.12), 0 30px 42px -34px rgba(15,23,42,0.18);\n}",
    "previewClass": "shadow-007"
  },
  {
    "id": "shadow-008",
    "title": "Shadow 8",
    "category": "shadow",
    "description": "Soft box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "soft",
      "indigo",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-008\"></div>",
    "cssCode": "\n.shadow-008 {\n  width: 108px;\n  height: 82px;\n  border-radius: 14px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #4f46e5 12%, #e2e8f0);\n  box-shadow: 0 18px 30px -24px rgba(79,70,229,0.22);\n}",
    "previewClass": "shadow-008"
  },
  {
    "id": "shadow-009",
    "title": "Shadow 9",
    "category": "shadow",
    "description": "Lifted box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "lifted",
      "indigo",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-009\"></div>",
    "cssCode": "\n.shadow-009 {\n  width: 116px;\n  height: 82px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #4f46e5 12%, #e2e8f0);\n  box-shadow: 0 24px 34px -22px rgba(79,70,229,0.22), 0 8px 12px -10px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-009"
  },
  {
    "id": "shadow-010",
    "title": "Shadow 10",
    "category": "shadow",
    "description": "Layered box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "layered",
      "indigo",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-010\"></div>",
    "cssCode": "\n.shadow-010 {\n  width: 112px;\n  height: 84px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #4f46e5 12%, #e2e8f0);\n  box-shadow: 0 1px 0 rgba(255,255,255,0.92) inset, 0 10px 18px -16px rgba(79,70,229,0.22), 0 28px 38px -32px rgba(15,23,42,0.16);\n}",
    "previewClass": "shadow-010"
  },
  {
    "id": "shadow-011",
    "title": "Shadow 11",
    "category": "shadow",
    "description": "Inset box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "inset",
      "indigo",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-011\"></div>",
    "cssCode": "\n.shadow-011 {\n  width: 110px;\n  height: 84px;\n  border-radius: 16px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #4f46e5 12%, #e2e8f0);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -12px 18px -18px rgba(79,70,229,0.22), 0 12px 22px -22px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-011"
  },
  {
    "id": "shadow-012",
    "title": "Shadow 12",
    "category": "shadow",
    "description": "Glow box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "glow",
      "indigo",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-012\"></div>",
    "cssCode": "\n.shadow-012 {\n  width: 112px;\n  height: 84px;\n  border-radius: 20px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #4f46e5 12%, #e2e8f0);\n  box-shadow: 0 0 0 1px color-mix(in srgb, #4f46e5 16%, #e2e8f0), 0 24px 38px -28px rgba(79,70,229,0.22), 0 0 24px -20px rgba(79,70,229,0.22);\n}",
    "previewClass": "shadow-012"
  },
  {
    "id": "shadow-013",
    "title": "Shadow 13",
    "category": "shadow",
    "description": "Hard Edge box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "hard-edge",
      "indigo",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-013\"></div>",
    "cssCode": "\n.shadow-013 {\n  width: 102px;\n  height: 78px;\n  border-radius: 8px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #4f46e5 12%, #e2e8f0);\n  box-shadow: 10px 10px 0 -5px color-mix(in srgb, #4f46e5 28%, transparent);\n}",
    "previewClass": "shadow-013"
  },
  {
    "id": "shadow-014",
    "title": "Shadow 14",
    "category": "shadow",
    "description": "Floating box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "floating",
      "indigo",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-014\"></div>",
    "cssCode": "\n.shadow-014 {\n  width: 114px;\n  height: 74px;\n  border-radius: 24px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #4f46e5 12%, #e2e8f0);\n  box-shadow: 0 30px 44px -26px rgba(79,70,229,0.22);\n}",
    "previewClass": "shadow-014"
  },
  {
    "id": "shadow-015",
    "title": "Shadow 15",
    "category": "shadow",
    "description": "Ambient box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "ambient",
      "indigo",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-015\"></div>",
    "cssCode": "\n.shadow-015 {\n  width: 118px;\n  height: 88px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #4f46e5 12%, #e2e8f0);\n  box-shadow: 0 14px 16px -16px rgba(15,23,42,0.12), 0 30px 42px -34px rgba(79,70,229,0.22);\n}",
    "previewClass": "shadow-015"
  },
  {
    "id": "shadow-016",
    "title": "Shadow 16",
    "category": "shadow",
    "description": "Soft box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "soft",
      "cyan",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-016\"></div>",
    "cssCode": "\n.shadow-016 {\n  width: 108px;\n  height: 82px;\n  border-radius: 14px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0891b2 12%, #e2e8f0);\n  box-shadow: 0 18px 30px -24px rgba(8,145,178,0.22);\n}",
    "previewClass": "shadow-016"
  },
  {
    "id": "shadow-017",
    "title": "Shadow 17",
    "category": "shadow",
    "description": "Lifted box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "lifted",
      "cyan",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-017\"></div>",
    "cssCode": "\n.shadow-017 {\n  width: 116px;\n  height: 82px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0891b2 12%, #e2e8f0);\n  box-shadow: 0 24px 34px -22px rgba(8,145,178,0.22), 0 8px 12px -10px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-017"
  },
  {
    "id": "shadow-018",
    "title": "Shadow 18",
    "category": "shadow",
    "description": "Layered box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "layered",
      "cyan",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-018\"></div>",
    "cssCode": "\n.shadow-018 {\n  width: 112px;\n  height: 84px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0891b2 12%, #e2e8f0);\n  box-shadow: 0 1px 0 rgba(255,255,255,0.92) inset, 0 10px 18px -16px rgba(8,145,178,0.22), 0 28px 38px -32px rgba(15,23,42,0.16);\n}",
    "previewClass": "shadow-018"
  },
  {
    "id": "shadow-019",
    "title": "Shadow 19",
    "category": "shadow",
    "description": "Inset box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "inset",
      "cyan",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-019\"></div>",
    "cssCode": "\n.shadow-019 {\n  width: 110px;\n  height: 84px;\n  border-radius: 16px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0891b2 12%, #e2e8f0);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -12px 18px -18px rgba(8,145,178,0.22), 0 12px 22px -22px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-019"
  },
  {
    "id": "shadow-020",
    "title": "Shadow 20",
    "category": "shadow",
    "description": "Glow box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "glow",
      "cyan",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-020\"></div>",
    "cssCode": "\n.shadow-020 {\n  width: 112px;\n  height: 84px;\n  border-radius: 20px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0891b2 12%, #e2e8f0);\n  box-shadow: 0 0 0 1px color-mix(in srgb, #0891b2 16%, #e2e8f0), 0 24px 38px -28px rgba(8,145,178,0.22), 0 0 24px -20px rgba(8,145,178,0.22);\n}",
    "previewClass": "shadow-020"
  },
  {
    "id": "shadow-021",
    "title": "Shadow 21",
    "category": "shadow",
    "description": "Hard Edge box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "hard-edge",
      "cyan",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-021\"></div>",
    "cssCode": "\n.shadow-021 {\n  width: 102px;\n  height: 78px;\n  border-radius: 8px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0891b2 12%, #e2e8f0);\n  box-shadow: 10px 10px 0 -5px color-mix(in srgb, #0891b2 28%, transparent);\n}",
    "previewClass": "shadow-021"
  },
  {
    "id": "shadow-022",
    "title": "Shadow 22",
    "category": "shadow",
    "description": "Floating box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "floating",
      "cyan",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-022\"></div>",
    "cssCode": "\n.shadow-022 {\n  width: 114px;\n  height: 74px;\n  border-radius: 24px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0891b2 12%, #e2e8f0);\n  box-shadow: 0 30px 44px -26px rgba(8,145,178,0.22);\n}",
    "previewClass": "shadow-022"
  },
  {
    "id": "shadow-023",
    "title": "Shadow 23",
    "category": "shadow",
    "description": "Ambient box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "ambient",
      "cyan",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-023\"></div>",
    "cssCode": "\n.shadow-023 {\n  width: 118px;\n  height: 88px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0891b2 12%, #e2e8f0);\n  box-shadow: 0 14px 16px -16px rgba(15,23,42,0.12), 0 30px 42px -34px rgba(8,145,178,0.22);\n}",
    "previewClass": "shadow-023"
  },
  {
    "id": "shadow-024",
    "title": "Shadow 24",
    "category": "shadow",
    "description": "Soft box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "soft",
      "emerald",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-024\"></div>",
    "cssCode": "\n.shadow-024 {\n  width: 108px;\n  height: 82px;\n  border-radius: 14px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #059669 12%, #e2e8f0);\n  box-shadow: 0 18px 30px -24px rgba(5,150,105,0.22);\n}",
    "previewClass": "shadow-024"
  },
  {
    "id": "shadow-025",
    "title": "Shadow 25",
    "category": "shadow",
    "description": "Lifted box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "lifted",
      "emerald",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-025\"></div>",
    "cssCode": "\n.shadow-025 {\n  width: 116px;\n  height: 82px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #059669 12%, #e2e8f0);\n  box-shadow: 0 24px 34px -22px rgba(5,150,105,0.22), 0 8px 12px -10px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-025"
  },
  {
    "id": "shadow-026",
    "title": "Shadow 26",
    "category": "shadow",
    "description": "Layered box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "layered",
      "emerald",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-026\"></div>",
    "cssCode": "\n.shadow-026 {\n  width: 112px;\n  height: 84px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #059669 12%, #e2e8f0);\n  box-shadow: 0 1px 0 rgba(255,255,255,0.92) inset, 0 10px 18px -16px rgba(5,150,105,0.22), 0 28px 38px -32px rgba(15,23,42,0.16);\n}",
    "previewClass": "shadow-026"
  },
  {
    "id": "shadow-027",
    "title": "Shadow 27",
    "category": "shadow",
    "description": "Inset box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "inset",
      "emerald",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-027\"></div>",
    "cssCode": "\n.shadow-027 {\n  width: 110px;\n  height: 84px;\n  border-radius: 16px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #059669 12%, #e2e8f0);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -12px 18px -18px rgba(5,150,105,0.22), 0 12px 22px -22px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-027"
  },
  {
    "id": "shadow-028",
    "title": "Shadow 28",
    "category": "shadow",
    "description": "Glow box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "glow",
      "emerald",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-028\"></div>",
    "cssCode": "\n.shadow-028 {\n  width: 112px;\n  height: 84px;\n  border-radius: 20px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #059669 12%, #e2e8f0);\n  box-shadow: 0 0 0 1px color-mix(in srgb, #059669 16%, #e2e8f0), 0 24px 38px -28px rgba(5,150,105,0.22), 0 0 24px -20px rgba(5,150,105,0.22);\n}",
    "previewClass": "shadow-028"
  },
  {
    "id": "shadow-029",
    "title": "Shadow 29",
    "category": "shadow",
    "description": "Hard Edge box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "hard-edge",
      "emerald",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-029\"></div>",
    "cssCode": "\n.shadow-029 {\n  width: 102px;\n  height: 78px;\n  border-radius: 8px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #059669 12%, #e2e8f0);\n  box-shadow: 10px 10px 0 -5px color-mix(in srgb, #059669 28%, transparent);\n}",
    "previewClass": "shadow-029"
  },
  {
    "id": "shadow-030",
    "title": "Shadow 30",
    "category": "shadow",
    "description": "Floating box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "floating",
      "emerald",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-030\"></div>",
    "cssCode": "\n.shadow-030 {\n  width: 114px;\n  height: 74px;\n  border-radius: 24px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #059669 12%, #e2e8f0);\n  box-shadow: 0 30px 44px -26px rgba(5,150,105,0.22);\n}",
    "previewClass": "shadow-030"
  },
  {
    "id": "shadow-031",
    "title": "Shadow 31",
    "category": "shadow",
    "description": "Ambient box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "ambient",
      "emerald",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-031\"></div>",
    "cssCode": "\n.shadow-031 {\n  width: 118px;\n  height: 88px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #059669 12%, #e2e8f0);\n  box-shadow: 0 14px 16px -16px rgba(15,23,42,0.12), 0 30px 42px -34px rgba(5,150,105,0.22);\n}",
    "previewClass": "shadow-031"
  },
  {
    "id": "shadow-032",
    "title": "Shadow 32",
    "category": "shadow",
    "description": "Soft box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "soft",
      "rose",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-032\"></div>",
    "cssCode": "\n.shadow-032 {\n  width: 108px;\n  height: 82px;\n  border-radius: 14px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #e11d48 12%, #e2e8f0);\n  box-shadow: 0 18px 30px -24px rgba(225,29,72,0.18);\n}",
    "previewClass": "shadow-032"
  },
  {
    "id": "shadow-033",
    "title": "Shadow 33",
    "category": "shadow",
    "description": "Lifted box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "lifted",
      "rose",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-033\"></div>",
    "cssCode": "\n.shadow-033 {\n  width: 116px;\n  height: 82px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #e11d48 12%, #e2e8f0);\n  box-shadow: 0 24px 34px -22px rgba(225,29,72,0.18), 0 8px 12px -10px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-033"
  },
  {
    "id": "shadow-034",
    "title": "Shadow 34",
    "category": "shadow",
    "description": "Layered box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "layered",
      "rose",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-034\"></div>",
    "cssCode": "\n.shadow-034 {\n  width: 112px;\n  height: 84px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #e11d48 12%, #e2e8f0);\n  box-shadow: 0 1px 0 rgba(255,255,255,0.92) inset, 0 10px 18px -16px rgba(225,29,72,0.18), 0 28px 38px -32px rgba(15,23,42,0.16);\n}",
    "previewClass": "shadow-034"
  },
  {
    "id": "shadow-035",
    "title": "Shadow 35",
    "category": "shadow",
    "description": "Inset box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "inset",
      "rose",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-035\"></div>",
    "cssCode": "\n.shadow-035 {\n  width: 110px;\n  height: 84px;\n  border-radius: 16px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #e11d48 12%, #e2e8f0);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -12px 18px -18px rgba(225,29,72,0.18), 0 12px 22px -22px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-035"
  },
  {
    "id": "shadow-036",
    "title": "Shadow 36",
    "category": "shadow",
    "description": "Glow box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "glow",
      "rose",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-036\"></div>",
    "cssCode": "\n.shadow-036 {\n  width: 112px;\n  height: 84px;\n  border-radius: 20px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #e11d48 12%, #e2e8f0);\n  box-shadow: 0 0 0 1px color-mix(in srgb, #e11d48 16%, #e2e8f0), 0 24px 38px -28px rgba(225,29,72,0.18), 0 0 24px -20px rgba(225,29,72,0.18);\n}",
    "previewClass": "shadow-036"
  },
  {
    "id": "shadow-037",
    "title": "Shadow 37",
    "category": "shadow",
    "description": "Hard Edge box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "hard-edge",
      "rose",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-037\"></div>",
    "cssCode": "\n.shadow-037 {\n  width: 102px;\n  height: 78px;\n  border-radius: 8px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #e11d48 12%, #e2e8f0);\n  box-shadow: 10px 10px 0 -5px color-mix(in srgb, #e11d48 28%, transparent);\n}",
    "previewClass": "shadow-037"
  },
  {
    "id": "shadow-038",
    "title": "Shadow 38",
    "category": "shadow",
    "description": "Floating box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "floating",
      "rose",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-038\"></div>",
    "cssCode": "\n.shadow-038 {\n  width: 114px;\n  height: 74px;\n  border-radius: 24px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #e11d48 12%, #e2e8f0);\n  box-shadow: 0 30px 44px -26px rgba(225,29,72,0.18);\n}",
    "previewClass": "shadow-038"
  },
  {
    "id": "shadow-039",
    "title": "Shadow 39",
    "category": "shadow",
    "description": "Ambient box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "ambient",
      "rose",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-039\"></div>",
    "cssCode": "\n.shadow-039 {\n  width: 118px;\n  height: 88px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #e11d48 12%, #e2e8f0);\n  box-shadow: 0 14px 16px -16px rgba(15,23,42,0.12), 0 30px 42px -34px rgba(225,29,72,0.18);\n}",
    "previewClass": "shadow-039"
  },
  {
    "id": "shadow-040",
    "title": "Shadow 40",
    "category": "shadow",
    "description": "Soft box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "soft",
      "amber",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-040\"></div>",
    "cssCode": "\n.shadow-040 {\n  width: 108px;\n  height: 82px;\n  border-radius: 14px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #d97706 12%, #e2e8f0);\n  box-shadow: 0 18px 30px -24px rgba(217,119,6,0.18);\n}",
    "previewClass": "shadow-040"
  },
  {
    "id": "shadow-041",
    "title": "Shadow 41",
    "category": "shadow",
    "description": "Lifted box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "lifted",
      "amber",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-041\"></div>",
    "cssCode": "\n.shadow-041 {\n  width: 116px;\n  height: 82px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #d97706 12%, #e2e8f0);\n  box-shadow: 0 24px 34px -22px rgba(217,119,6,0.18), 0 8px 12px -10px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-041"
  },
  {
    "id": "shadow-042",
    "title": "Shadow 42",
    "category": "shadow",
    "description": "Layered box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "layered",
      "amber",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-042\"></div>",
    "cssCode": "\n.shadow-042 {\n  width: 112px;\n  height: 84px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #d97706 12%, #e2e8f0);\n  box-shadow: 0 1px 0 rgba(255,255,255,0.92) inset, 0 10px 18px -16px rgba(217,119,6,0.18), 0 28px 38px -32px rgba(15,23,42,0.16);\n}",
    "previewClass": "shadow-042"
  },
  {
    "id": "shadow-043",
    "title": "Shadow 43",
    "category": "shadow",
    "description": "Inset box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "inset",
      "amber",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-043\"></div>",
    "cssCode": "\n.shadow-043 {\n  width: 110px;\n  height: 84px;\n  border-radius: 16px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #d97706 12%, #e2e8f0);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -12px 18px -18px rgba(217,119,6,0.18), 0 12px 22px -22px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-043"
  },
  {
    "id": "shadow-044",
    "title": "Shadow 44",
    "category": "shadow",
    "description": "Glow box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "glow",
      "amber",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-044\"></div>",
    "cssCode": "\n.shadow-044 {\n  width: 112px;\n  height: 84px;\n  border-radius: 20px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #d97706 12%, #e2e8f0);\n  box-shadow: 0 0 0 1px color-mix(in srgb, #d97706 16%, #e2e8f0), 0 24px 38px -28px rgba(217,119,6,0.18), 0 0 24px -20px rgba(217,119,6,0.18);\n}",
    "previewClass": "shadow-044"
  },
  {
    "id": "shadow-045",
    "title": "Shadow 45",
    "category": "shadow",
    "description": "Hard Edge box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "hard-edge",
      "amber",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-045\"></div>",
    "cssCode": "\n.shadow-045 {\n  width: 102px;\n  height: 78px;\n  border-radius: 8px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #d97706 12%, #e2e8f0);\n  box-shadow: 10px 10px 0 -5px color-mix(in srgb, #d97706 28%, transparent);\n}",
    "previewClass": "shadow-045"
  },
  {
    "id": "shadow-046",
    "title": "Shadow 46",
    "category": "shadow",
    "description": "Floating box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "floating",
      "amber",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-046\"></div>",
    "cssCode": "\n.shadow-046 {\n  width: 114px;\n  height: 74px;\n  border-radius: 24px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #d97706 12%, #e2e8f0);\n  box-shadow: 0 30px 44px -26px rgba(217,119,6,0.18);\n}",
    "previewClass": "shadow-046"
  },
  {
    "id": "shadow-047",
    "title": "Shadow 47",
    "category": "shadow",
    "description": "Ambient box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "ambient",
      "amber",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-047\"></div>",
    "cssCode": "\n.shadow-047 {\n  width: 118px;\n  height: 88px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #d97706 12%, #e2e8f0);\n  box-shadow: 0 14px 16px -16px rgba(15,23,42,0.12), 0 30px 42px -34px rgba(217,119,6,0.18);\n}",
    "previewClass": "shadow-047"
  },
  {
    "id": "shadow-048",
    "title": "Shadow 48",
    "category": "shadow",
    "description": "Soft box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "soft",
      "violet",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-048\"></div>",
    "cssCode": "\n.shadow-048 {\n  width: 108px;\n  height: 82px;\n  border-radius: 14px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #7c3aed 12%, #e2e8f0);\n  box-shadow: 0 18px 30px -24px rgba(124,58,237,0.2);\n}",
    "previewClass": "shadow-048"
  },
  {
    "id": "shadow-049",
    "title": "Shadow 49",
    "category": "shadow",
    "description": "Lifted box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "lifted",
      "violet",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-049\"></div>",
    "cssCode": "\n.shadow-049 {\n  width: 116px;\n  height: 82px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #7c3aed 12%, #e2e8f0);\n  box-shadow: 0 24px 34px -22px rgba(124,58,237,0.2), 0 8px 12px -10px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-049"
  },
  {
    "id": "shadow-050",
    "title": "Shadow 50",
    "category": "shadow",
    "description": "Layered box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "layered",
      "violet",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-050\"></div>",
    "cssCode": "\n.shadow-050 {\n  width: 112px;\n  height: 84px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #7c3aed 12%, #e2e8f0);\n  box-shadow: 0 1px 0 rgba(255,255,255,0.92) inset, 0 10px 18px -16px rgba(124,58,237,0.2), 0 28px 38px -32px rgba(15,23,42,0.16);\n}",
    "previewClass": "shadow-050"
  },
  {
    "id": "shadow-051",
    "title": "Shadow 51",
    "category": "shadow",
    "description": "Inset box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "inset",
      "violet",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-051\"></div>",
    "cssCode": "\n.shadow-051 {\n  width: 110px;\n  height: 84px;\n  border-radius: 16px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #7c3aed 12%, #e2e8f0);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -12px 18px -18px rgba(124,58,237,0.2), 0 12px 22px -22px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-051"
  },
  {
    "id": "shadow-052",
    "title": "Shadow 52",
    "category": "shadow",
    "description": "Glow box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "glow",
      "violet",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-052\"></div>",
    "cssCode": "\n.shadow-052 {\n  width: 112px;\n  height: 84px;\n  border-radius: 20px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #7c3aed 12%, #e2e8f0);\n  box-shadow: 0 0 0 1px color-mix(in srgb, #7c3aed 16%, #e2e8f0), 0 24px 38px -28px rgba(124,58,237,0.2), 0 0 24px -20px rgba(124,58,237,0.2);\n}",
    "previewClass": "shadow-052"
  },
  {
    "id": "shadow-053",
    "title": "Shadow 53",
    "category": "shadow",
    "description": "Hard Edge box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "hard-edge",
      "violet",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-053\"></div>",
    "cssCode": "\n.shadow-053 {\n  width: 102px;\n  height: 78px;\n  border-radius: 8px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #7c3aed 12%, #e2e8f0);\n  box-shadow: 10px 10px 0 -5px color-mix(in srgb, #7c3aed 28%, transparent);\n}",
    "previewClass": "shadow-053"
  },
  {
    "id": "shadow-054",
    "title": "Shadow 54",
    "category": "shadow",
    "description": "Floating box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "floating",
      "violet",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-054\"></div>",
    "cssCode": "\n.shadow-054 {\n  width: 114px;\n  height: 74px;\n  border-radius: 24px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #7c3aed 12%, #e2e8f0);\n  box-shadow: 0 30px 44px -26px rgba(124,58,237,0.2);\n}",
    "previewClass": "shadow-054"
  },
  {
    "id": "shadow-055",
    "title": "Shadow 55",
    "category": "shadow",
    "description": "Ambient box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "ambient",
      "violet",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-055\"></div>",
    "cssCode": "\n.shadow-055 {\n  width: 118px;\n  height: 88px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #7c3aed 12%, #e2e8f0);\n  box-shadow: 0 14px 16px -16px rgba(15,23,42,0.12), 0 30px 42px -34px rgba(124,58,237,0.2);\n}",
    "previewClass": "shadow-055"
  },
  {
    "id": "shadow-056",
    "title": "Shadow 56",
    "category": "shadow",
    "description": "Soft box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "soft",
      "sky",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-056\"></div>",
    "cssCode": "\n.shadow-056 {\n  width: 108px;\n  height: 82px;\n  border-radius: 14px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0284c7 12%, #e2e8f0);\n  box-shadow: 0 18px 30px -24px rgba(2,132,199,0.2);\n}",
    "previewClass": "shadow-056"
  },
  {
    "id": "shadow-057",
    "title": "Shadow 57",
    "category": "shadow",
    "description": "Lifted box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "lifted",
      "sky",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-057\"></div>",
    "cssCode": "\n.shadow-057 {\n  width: 116px;\n  height: 82px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0284c7 12%, #e2e8f0);\n  box-shadow: 0 24px 34px -22px rgba(2,132,199,0.2), 0 8px 12px -10px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-057"
  },
  {
    "id": "shadow-058",
    "title": "Shadow 58",
    "category": "shadow",
    "description": "Layered box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "layered",
      "sky",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-058\"></div>",
    "cssCode": "\n.shadow-058 {\n  width: 112px;\n  height: 84px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0284c7 12%, #e2e8f0);\n  box-shadow: 0 1px 0 rgba(255,255,255,0.92) inset, 0 10px 18px -16px rgba(2,132,199,0.2), 0 28px 38px -32px rgba(15,23,42,0.16);\n}",
    "previewClass": "shadow-058"
  },
  {
    "id": "shadow-059",
    "title": "Shadow 59",
    "category": "shadow",
    "description": "Inset box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "inset",
      "sky",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-059\"></div>",
    "cssCode": "\n.shadow-059 {\n  width: 110px;\n  height: 84px;\n  border-radius: 16px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0284c7 12%, #e2e8f0);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -12px 18px -18px rgba(2,132,199,0.2), 0 12px 22px -22px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-059"
  },
  {
    "id": "shadow-060",
    "title": "Shadow 60",
    "category": "shadow",
    "description": "Glow box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "glow",
      "sky",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-060\"></div>",
    "cssCode": "\n.shadow-060 {\n  width: 112px;\n  height: 84px;\n  border-radius: 20px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0284c7 12%, #e2e8f0);\n  box-shadow: 0 0 0 1px color-mix(in srgb, #0284c7 16%, #e2e8f0), 0 24px 38px -28px rgba(2,132,199,0.2), 0 0 24px -20px rgba(2,132,199,0.2);\n}",
    "previewClass": "shadow-060"
  },
  {
    "id": "shadow-061",
    "title": "Shadow 61",
    "category": "shadow",
    "description": "Hard Edge box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "hard-edge",
      "sky",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-061\"></div>",
    "cssCode": "\n.shadow-061 {\n  width: 102px;\n  height: 78px;\n  border-radius: 8px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0284c7 12%, #e2e8f0);\n  box-shadow: 10px 10px 0 -5px color-mix(in srgb, #0284c7 28%, transparent);\n}",
    "previewClass": "shadow-061"
  },
  {
    "id": "shadow-062",
    "title": "Shadow 62",
    "category": "shadow",
    "description": "Floating box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "floating",
      "sky",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-062\"></div>",
    "cssCode": "\n.shadow-062 {\n  width: 114px;\n  height: 74px;\n  border-radius: 24px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0284c7 12%, #e2e8f0);\n  box-shadow: 0 30px 44px -26px rgba(2,132,199,0.2);\n}",
    "previewClass": "shadow-062"
  },
  {
    "id": "shadow-063",
    "title": "Shadow 63",
    "category": "shadow",
    "description": "Ambient box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "ambient",
      "sky",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-063\"></div>",
    "cssCode": "\n.shadow-063 {\n  width: 118px;\n  height: 88px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0284c7 12%, #e2e8f0);\n  box-shadow: 0 14px 16px -16px rgba(15,23,42,0.12), 0 30px 42px -34px rgba(2,132,199,0.2);\n}",
    "previewClass": "shadow-063"
  },
  {
    "id": "shadow-064",
    "title": "Shadow 64",
    "category": "shadow",
    "description": "Soft box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "soft",
      "lime",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-064\"></div>",
    "cssCode": "\n.shadow-064 {\n  width: 108px;\n  height: 82px;\n  border-radius: 14px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #65a30d 12%, #e2e8f0);\n  box-shadow: 0 18px 30px -24px rgba(101,163,13,0.2);\n}",
    "previewClass": "shadow-064"
  },
  {
    "id": "shadow-065",
    "title": "Shadow 65",
    "category": "shadow",
    "description": "Lifted box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "lifted",
      "lime",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-065\"></div>",
    "cssCode": "\n.shadow-065 {\n  width: 116px;\n  height: 82px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #65a30d 12%, #e2e8f0);\n  box-shadow: 0 24px 34px -22px rgba(101,163,13,0.2), 0 8px 12px -10px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-065"
  },
  {
    "id": "shadow-066",
    "title": "Shadow 66",
    "category": "shadow",
    "description": "Layered box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "layered",
      "lime",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-066\"></div>",
    "cssCode": "\n.shadow-066 {\n  width: 112px;\n  height: 84px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #65a30d 12%, #e2e8f0);\n  box-shadow: 0 1px 0 rgba(255,255,255,0.92) inset, 0 10px 18px -16px rgba(101,163,13,0.2), 0 28px 38px -32px rgba(15,23,42,0.16);\n}",
    "previewClass": "shadow-066"
  },
  {
    "id": "shadow-067",
    "title": "Shadow 67",
    "category": "shadow",
    "description": "Inset box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "inset",
      "lime",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-067\"></div>",
    "cssCode": "\n.shadow-067 {\n  width: 110px;\n  height: 84px;\n  border-radius: 16px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #65a30d 12%, #e2e8f0);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -12px 18px -18px rgba(101,163,13,0.2), 0 12px 22px -22px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-067"
  },
  {
    "id": "shadow-068",
    "title": "Shadow 68",
    "category": "shadow",
    "description": "Glow box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "glow",
      "lime",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-068\"></div>",
    "cssCode": "\n.shadow-068 {\n  width: 112px;\n  height: 84px;\n  border-radius: 20px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #65a30d 12%, #e2e8f0);\n  box-shadow: 0 0 0 1px color-mix(in srgb, #65a30d 16%, #e2e8f0), 0 24px 38px -28px rgba(101,163,13,0.2), 0 0 24px -20px rgba(101,163,13,0.2);\n}",
    "previewClass": "shadow-068"
  },
  {
    "id": "shadow-069",
    "title": "Shadow 69",
    "category": "shadow",
    "description": "Hard Edge box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "hard-edge",
      "lime",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-069\"></div>",
    "cssCode": "\n.shadow-069 {\n  width: 102px;\n  height: 78px;\n  border-radius: 8px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #65a30d 12%, #e2e8f0);\n  box-shadow: 10px 10px 0 -5px color-mix(in srgb, #65a30d 28%, transparent);\n}",
    "previewClass": "shadow-069"
  },
  {
    "id": "shadow-070",
    "title": "Shadow 70",
    "category": "shadow",
    "description": "Floating box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "floating",
      "lime",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-070\"></div>",
    "cssCode": "\n.shadow-070 {\n  width: 114px;\n  height: 74px;\n  border-radius: 24px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #65a30d 12%, #e2e8f0);\n  box-shadow: 0 30px 44px -26px rgba(101,163,13,0.2);\n}",
    "previewClass": "shadow-070"
  },
  {
    "id": "shadow-071",
    "title": "Shadow 71",
    "category": "shadow",
    "description": "Ambient box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "ambient",
      "lime",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-071\"></div>",
    "cssCode": "\n.shadow-071 {\n  width: 118px;\n  height: 88px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #65a30d 12%, #e2e8f0);\n  box-shadow: 0 14px 16px -16px rgba(15,23,42,0.12), 0 30px 42px -34px rgba(101,163,13,0.2);\n}",
    "previewClass": "shadow-071"
  },
  {
    "id": "shadow-072",
    "title": "Shadow 72",
    "category": "shadow",
    "description": "Soft box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "soft",
      "orange",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-072\"></div>",
    "cssCode": "\n.shadow-072 {\n  width: 108px;\n  height: 82px;\n  border-radius: 14px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #ea580c 12%, #e2e8f0);\n  box-shadow: 0 18px 30px -24px rgba(234,88,12,0.18);\n}",
    "previewClass": "shadow-072"
  },
  {
    "id": "shadow-073",
    "title": "Shadow 73",
    "category": "shadow",
    "description": "Lifted box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "lifted",
      "orange",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-073\"></div>",
    "cssCode": "\n.shadow-073 {\n  width: 116px;\n  height: 82px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #ea580c 12%, #e2e8f0);\n  box-shadow: 0 24px 34px -22px rgba(234,88,12,0.18), 0 8px 12px -10px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-073"
  },
  {
    "id": "shadow-074",
    "title": "Shadow 74",
    "category": "shadow",
    "description": "Layered box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "layered",
      "orange",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-074\"></div>",
    "cssCode": "\n.shadow-074 {\n  width: 112px;\n  height: 84px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #ea580c 12%, #e2e8f0);\n  box-shadow: 0 1px 0 rgba(255,255,255,0.92) inset, 0 10px 18px -16px rgba(234,88,12,0.18), 0 28px 38px -32px rgba(15,23,42,0.16);\n}",
    "previewClass": "shadow-074"
  },
  {
    "id": "shadow-075",
    "title": "Shadow 75",
    "category": "shadow",
    "description": "Inset box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "inset",
      "orange",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-075\"></div>",
    "cssCode": "\n.shadow-075 {\n  width: 110px;\n  height: 84px;\n  border-radius: 16px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #ea580c 12%, #e2e8f0);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -12px 18px -18px rgba(234,88,12,0.18), 0 12px 22px -22px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-075"
  },
  {
    "id": "shadow-076",
    "title": "Shadow 76",
    "category": "shadow",
    "description": "Glow box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "glow",
      "orange",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-076\"></div>",
    "cssCode": "\n.shadow-076 {\n  width: 112px;\n  height: 84px;\n  border-radius: 20px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #ea580c 12%, #e2e8f0);\n  box-shadow: 0 0 0 1px color-mix(in srgb, #ea580c 16%, #e2e8f0), 0 24px 38px -28px rgba(234,88,12,0.18), 0 0 24px -20px rgba(234,88,12,0.18);\n}",
    "previewClass": "shadow-076"
  },
  {
    "id": "shadow-077",
    "title": "Shadow 77",
    "category": "shadow",
    "description": "Hard Edge box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "hard-edge",
      "orange",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-077\"></div>",
    "cssCode": "\n.shadow-077 {\n  width: 102px;\n  height: 78px;\n  border-radius: 8px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #ea580c 12%, #e2e8f0);\n  box-shadow: 10px 10px 0 -5px color-mix(in srgb, #ea580c 28%, transparent);\n}",
    "previewClass": "shadow-077"
  },
  {
    "id": "shadow-078",
    "title": "Shadow 78",
    "category": "shadow",
    "description": "Floating box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "floating",
      "orange",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-078\"></div>",
    "cssCode": "\n.shadow-078 {\n  width: 114px;\n  height: 74px;\n  border-radius: 24px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #ea580c 12%, #e2e8f0);\n  box-shadow: 0 30px 44px -26px rgba(234,88,12,0.18);\n}",
    "previewClass": "shadow-078"
  },
  {
    "id": "shadow-079",
    "title": "Shadow 79",
    "category": "shadow",
    "description": "Ambient box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "ambient",
      "orange",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-079\"></div>",
    "cssCode": "\n.shadow-079 {\n  width: 118px;\n  height: 88px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #ea580c 12%, #e2e8f0);\n  box-shadow: 0 14px 16px -16px rgba(15,23,42,0.12), 0 30px 42px -34px rgba(234,88,12,0.18);\n}",
    "previewClass": "shadow-079"
  },
  {
    "id": "shadow-080",
    "title": "Shadow 80",
    "category": "shadow",
    "description": "Soft box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "soft",
      "pink",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-080\"></div>",
    "cssCode": "\n.shadow-080 {\n  width: 108px;\n  height: 82px;\n  border-radius: 14px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #db2777 12%, #e2e8f0);\n  box-shadow: 0 18px 30px -24px rgba(219,39,119,0.18);\n}",
    "previewClass": "shadow-080"
  },
  {
    "id": "shadow-081",
    "title": "Shadow 81",
    "category": "shadow",
    "description": "Lifted box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "lifted",
      "pink",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-081\"></div>",
    "cssCode": "\n.shadow-081 {\n  width: 116px;\n  height: 82px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #db2777 12%, #e2e8f0);\n  box-shadow: 0 24px 34px -22px rgba(219,39,119,0.18), 0 8px 12px -10px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-081"
  },
  {
    "id": "shadow-082",
    "title": "Shadow 82",
    "category": "shadow",
    "description": "Layered box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "layered",
      "pink",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-082\"></div>",
    "cssCode": "\n.shadow-082 {\n  width: 112px;\n  height: 84px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #db2777 12%, #e2e8f0);\n  box-shadow: 0 1px 0 rgba(255,255,255,0.92) inset, 0 10px 18px -16px rgba(219,39,119,0.18), 0 28px 38px -32px rgba(15,23,42,0.16);\n}",
    "previewClass": "shadow-082"
  },
  {
    "id": "shadow-083",
    "title": "Shadow 83",
    "category": "shadow",
    "description": "Inset box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "inset",
      "pink",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-083\"></div>",
    "cssCode": "\n.shadow-083 {\n  width: 110px;\n  height: 84px;\n  border-radius: 16px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #db2777 12%, #e2e8f0);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -12px 18px -18px rgba(219,39,119,0.18), 0 12px 22px -22px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-083"
  },
  {
    "id": "shadow-084",
    "title": "Shadow 84",
    "category": "shadow",
    "description": "Glow box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "glow",
      "pink",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-084\"></div>",
    "cssCode": "\n.shadow-084 {\n  width: 112px;\n  height: 84px;\n  border-radius: 20px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #db2777 12%, #e2e8f0);\n  box-shadow: 0 0 0 1px color-mix(in srgb, #db2777 16%, #e2e8f0), 0 24px 38px -28px rgba(219,39,119,0.18), 0 0 24px -20px rgba(219,39,119,0.18);\n}",
    "previewClass": "shadow-084"
  },
  {
    "id": "shadow-085",
    "title": "Shadow 85",
    "category": "shadow",
    "description": "Hard Edge box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "hard-edge",
      "pink",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-085\"></div>",
    "cssCode": "\n.shadow-085 {\n  width: 102px;\n  height: 78px;\n  border-radius: 8px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #db2777 12%, #e2e8f0);\n  box-shadow: 10px 10px 0 -5px color-mix(in srgb, #db2777 28%, transparent);\n}",
    "previewClass": "shadow-085"
  },
  {
    "id": "shadow-086",
    "title": "Shadow 86",
    "category": "shadow",
    "description": "Floating box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "floating",
      "pink",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-086\"></div>",
    "cssCode": "\n.shadow-086 {\n  width: 114px;\n  height: 74px;\n  border-radius: 24px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #db2777 12%, #e2e8f0);\n  box-shadow: 0 30px 44px -26px rgba(219,39,119,0.18);\n}",
    "previewClass": "shadow-086"
  },
  {
    "id": "shadow-087",
    "title": "Shadow 87",
    "category": "shadow",
    "description": "Ambient box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "ambient",
      "pink",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-087\"></div>",
    "cssCode": "\n.shadow-087 {\n  width: 118px;\n  height: 88px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #db2777 12%, #e2e8f0);\n  box-shadow: 0 14px 16px -16px rgba(15,23,42,0.12), 0 30px 42px -34px rgba(219,39,119,0.18);\n}",
    "previewClass": "shadow-087"
  },
  {
    "id": "shadow-088",
    "title": "Shadow 88",
    "category": "shadow",
    "description": "Soft box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "soft",
      "teal",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-088\"></div>",
    "cssCode": "\n.shadow-088 {\n  width: 108px;\n  height: 82px;\n  border-radius: 14px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f766e 12%, #e2e8f0);\n  box-shadow: 0 18px 30px -24px rgba(15,118,110,0.2);\n}",
    "previewClass": "shadow-088"
  },
  {
    "id": "shadow-089",
    "title": "Shadow 89",
    "category": "shadow",
    "description": "Lifted box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "lifted",
      "teal",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-089\"></div>",
    "cssCode": "\n.shadow-089 {\n  width: 116px;\n  height: 82px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f766e 12%, #e2e8f0);\n  box-shadow: 0 24px 34px -22px rgba(15,118,110,0.2), 0 8px 12px -10px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-089"
  },
  {
    "id": "shadow-090",
    "title": "Shadow 90",
    "category": "shadow",
    "description": "Layered box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "layered",
      "teal",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-090\"></div>",
    "cssCode": "\n.shadow-090 {\n  width: 112px;\n  height: 84px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f766e 12%, #e2e8f0);\n  box-shadow: 0 1px 0 rgba(255,255,255,0.92) inset, 0 10px 18px -16px rgba(15,118,110,0.2), 0 28px 38px -32px rgba(15,23,42,0.16);\n}",
    "previewClass": "shadow-090"
  },
  {
    "id": "shadow-091",
    "title": "Shadow 91",
    "category": "shadow",
    "description": "Inset box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "inset",
      "teal",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-091\"></div>",
    "cssCode": "\n.shadow-091 {\n  width: 110px;\n  height: 84px;\n  border-radius: 16px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f766e 12%, #e2e8f0);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -12px 18px -18px rgba(15,118,110,0.2), 0 12px 22px -22px rgba(15,23,42,0.12);\n}",
    "previewClass": "shadow-091"
  },
  {
    "id": "shadow-092",
    "title": "Shadow 92",
    "category": "shadow",
    "description": "Glow box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "glow",
      "teal",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-092\"></div>",
    "cssCode": "\n.shadow-092 {\n  width: 112px;\n  height: 84px;\n  border-radius: 20px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f766e 12%, #e2e8f0);\n  box-shadow: 0 0 0 1px color-mix(in srgb, #0f766e 16%, #e2e8f0), 0 24px 38px -28px rgba(15,118,110,0.2), 0 0 24px -20px rgba(15,118,110,0.2);\n}",
    "previewClass": "shadow-092"
  },
  {
    "id": "shadow-093",
    "title": "Shadow 93",
    "category": "shadow",
    "description": "Hard Edge box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "hard-edge",
      "teal",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-093\"></div>",
    "cssCode": "\n.shadow-093 {\n  width: 102px;\n  height: 78px;\n  border-radius: 8px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f766e 12%, #e2e8f0);\n  box-shadow: 10px 10px 0 -5px color-mix(in srgb, #0f766e 28%, transparent);\n}",
    "previewClass": "shadow-093"
  },
  {
    "id": "shadow-094",
    "title": "Shadow 94",
    "category": "shadow",
    "description": "Floating box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "floating",
      "teal",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-094\"></div>",
    "cssCode": "\n.shadow-094 {\n  width: 114px;\n  height: 74px;\n  border-radius: 24px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f766e 12%, #e2e8f0);\n  box-shadow: 0 30px 44px -26px rgba(15,118,110,0.2);\n}",
    "previewClass": "shadow-094"
  },
  {
    "id": "shadow-095",
    "title": "Shadow 95",
    "category": "shadow",
    "description": "Ambient box-shadow recipe for cards, popovers, and elevated UI blocks.",
    "tags": [
      "shadow",
      "box-shadow",
      "ambient",
      "teal",
      "surface"
    ],
    "htmlCode": "<div class=\"shadow-095\"></div>",
    "cssCode": "\n.shadow-095 {\n  width: 118px;\n  height: 88px;\n  border-radius: 18px;\n  background: #fff;\n  border: 1px solid color-mix(in srgb, #0f766e 12%, #e2e8f0);\n  box-shadow: 0 14px 16px -16px rgba(15,23,42,0.12), 0 30px 42px -34px rgba(15,118,110,0.2);\n}",
    "previewClass": "shadow-095"
  },
  {
    "id": "shape-001",
    "title": "Triangle Up",
    "category": "shape",
    "description": "Triangle Up built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "triangle",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-001\"></div>",
    "cssCode": ".shape-001{width:0;height:0;border-left:34px solid transparent;border-right:34px solid transparent;border-bottom:58px solid #2f3137;}",
    "previewClass": "shape-001"
  },
  {
    "id": "shape-002",
    "title": "Triangle Down",
    "category": "shape",
    "description": "Triangle Down built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "triangle",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-002\"></div>",
    "cssCode": ".shape-002{width:0;height:0;border-left:34px solid transparent;border-right:34px solid transparent;border-top:58px solid #2f3137;}",
    "previewClass": "shape-002"
  },
  {
    "id": "shape-003",
    "title": "Triangle Left",
    "category": "shape",
    "description": "Triangle Left built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "triangle",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-003\"></div>",
    "cssCode": ".shape-003{width:0;height:0;border-top:34px solid transparent;border-bottom:34px solid transparent;border-right:58px solid #2f3137;}",
    "previewClass": "shape-003"
  },
  {
    "id": "shape-004",
    "title": "Triangle Right",
    "category": "shape",
    "description": "Triangle Right built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "triangle",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-004\"></div>",
    "cssCode": ".shape-004{width:0;height:0;border-top:34px solid transparent;border-bottom:34px solid transparent;border-left:58px solid #2f3137;}",
    "previewClass": "shape-004"
  },
  {
    "id": "shape-005",
    "title": "Arrow Up",
    "category": "shape",
    "description": "Arrow Up built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "arrow",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-005\"></div>",
    "cssCode": ".shape-005{width:28px;height:28px;border-top:2px solid #2f3137;border-left:2px solid #2f3137;transform:rotate(45deg);}",
    "previewClass": "shape-005"
  },
  {
    "id": "shape-006",
    "title": "Arrow Down",
    "category": "shape",
    "description": "Arrow Down built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "arrow",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-006\"></div>",
    "cssCode": ".shape-006{width:28px;height:28px;border-right:2px solid #2f3137;border-bottom:2px solid #2f3137;transform:rotate(45deg);}",
    "previewClass": "shape-006"
  },
  {
    "id": "shape-007",
    "title": "Arrow Left",
    "category": "shape",
    "description": "Arrow Left built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "arrow",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-007\"></div>",
    "cssCode": ".shape-007{width:28px;height:28px;border-bottom:2px solid #2f3137;border-left:2px solid #2f3137;transform:rotate(45deg);}",
    "previewClass": "shape-007"
  },
  {
    "id": "shape-008",
    "title": "Arrow Right",
    "category": "shape",
    "description": "Arrow Right built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "arrow",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-008\"></div>",
    "cssCode": ".shape-008{width:28px;height:28px;border-top:2px solid #2f3137;border-right:2px solid #2f3137;transform:rotate(45deg);}",
    "previewClass": "shape-008"
  },
  {
    "id": "shape-009",
    "title": "Thick Arrow Up",
    "category": "shape",
    "description": "Thick Arrow Up built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "arrow",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-009\"></div>",
    "cssCode": ".shape-009{width:24px;height:24px;border-top:7px solid #2f3137;border-left:7px solid #2f3137;transform:rotate(45deg);}",
    "previewClass": "shape-009"
  },
  {
    "id": "shape-010",
    "title": "Thick Arrow Down",
    "category": "shape",
    "description": "Thick Arrow Down built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "arrow",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-010\"></div>",
    "cssCode": ".shape-010{width:24px;height:24px;border-right:7px solid #2f3137;border-bottom:7px solid #2f3137;transform:rotate(45deg);}",
    "previewClass": "shape-010"
  },
  {
    "id": "shape-011",
    "title": "Thick Arrow Left",
    "category": "shape",
    "description": "Thick Arrow Left built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "arrow",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-011\"></div>",
    "cssCode": ".shape-011{width:24px;height:24px;border-bottom:7px solid #2f3137;border-left:7px solid #2f3137;transform:rotate(45deg);}",
    "previewClass": "shape-011"
  },
  {
    "id": "shape-012",
    "title": "Thick Arrow Right",
    "category": "shape",
    "description": "Thick Arrow Right built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "arrow",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-012\"></div>",
    "cssCode": ".shape-012{width:24px;height:24px;border-top:7px solid #2f3137;border-right:7px solid #2f3137;transform:rotate(45deg);}",
    "previewClass": "shape-012"
  },
  {
    "id": "shape-013",
    "title": "Bubble Top",
    "category": "shape",
    "description": "Bubble Top built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "bubble",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-013\"></div>",
    "cssCode": ".shape-013{width:62px;height:42px;background:#2f3137;border-radius:12px;position:relative}.shape-013::after{content:\"\";position:absolute;left:18px;top:-10px;border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:12px solid #2f3137;}",
    "previewClass": "shape-013"
  },
  {
    "id": "shape-014",
    "title": "Bubble Bottom",
    "category": "shape",
    "description": "Bubble Bottom built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "bubble",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-014\"></div>",
    "cssCode": ".shape-014{width:62px;height:42px;background:#2f3137;border-radius:12px;position:relative}.shape-014::after{content:\"\";position:absolute;left:18px;bottom:-10px;border-left:10px solid transparent;border-right:10px solid transparent;border-top:12px solid #2f3137;}",
    "previewClass": "shape-014"
  },
  {
    "id": "shape-015",
    "title": "Bubble Left",
    "category": "shape",
    "description": "Bubble Left built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "bubble",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-015\"></div>",
    "cssCode": ".shape-015{width:62px;height:42px;background:#2f3137;border-radius:12px;position:relative}.shape-015::after{content:\"\";position:absolute;left:-10px;top:12px;border-top:10px solid transparent;border-bottom:10px solid transparent;border-right:12px solid #2f3137;}",
    "previewClass": "shape-015"
  },
  {
    "id": "shape-016",
    "title": "Bubble Right",
    "category": "shape",
    "description": "Bubble Right built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "bubble",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-016\"></div>",
    "cssCode": ".shape-016{width:62px;height:42px;background:#2f3137;border-radius:12px;position:relative}.shape-016::after{content:\"\";position:absolute;right:-10px;top:12px;border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:12px solid #2f3137;}",
    "previewClass": "shape-016"
  },
  {
    "id": "shape-017",
    "title": "5-point Star",
    "category": "shape",
    "description": "5-point Star built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "star",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-017\"></div>",
    "cssCode": ".shape-017{width:72px;height:72px;background:#2f3137;clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);}",
    "previewClass": "shape-017"
  },
  {
    "id": "shape-018",
    "title": "Heart",
    "category": "shape",
    "description": "Heart built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "heart",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-018\"></div>",
    "cssCode": ".shape-018{position:relative;width:64px;height:56px;transform:rotate(-45deg)}.shape-018::before,.shape-018::after{content:\"\";position:absolute;width:38px;height:60px;background:#2f3137;border-radius:999px 999px 0 0}.shape-018::before{left:26px}.shape-018::after{left:0;top:26px;transform:rotate(90deg);transform-origin:0 0}",
    "previewClass": "shape-018"
  },
  {
    "id": "shape-019",
    "title": "Heart with clip-path",
    "category": "shape",
    "description": "Heart with clip-path built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "heart",
      "clip-path",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-019\"></div>",
    "cssCode": ".shape-019{width:72px;height:64px;background:#2f3137;clip-path:polygon(50% 91%,12% 52%,0 28%,15% 7%,35% 6%,50% 22%,65% 6%,85% 7%,100% 28%,88% 52%);}",
    "previewClass": "shape-019"
  },
  {
    "id": "shape-020",
    "title": "Heart with Gradient",
    "category": "shape",
    "description": "Heart with Gradient built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "heart",
      "gradient",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-020\"></div>",
    "cssCode": ".shape-020{width:72px;height:64px;background:linear-gradient(180deg,#ff4d8d,#5b3df5);clip-path:polygon(50% 91%,12% 52%,0 28%,15% 7%,35% 6%,50% 22%,65% 6%,85% 7%,100% 28%,88% 52%);}",
    "previewClass": "shape-020"
  },
  {
    "id": "shape-021",
    "title": "12 Point Burst",
    "category": "shape",
    "description": "12 Point Burst built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "burst",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-021\"></div>",
    "cssCode": ".shape-021{width:72px;height:72px;background:#2f3137;clip-path:polygon(50% 0,61% 13%,75% 4%,79% 19%,93% 15%,88% 30%,100% 35%,88% 46%,97% 59%,82% 62%,86% 77%,71% 74%,66% 89%,50% 80%,34% 89%,29% 74%,14% 77%,18% 62%,3% 59%,12% 46%,0 35%,12% 30%,7% 15%,21% 19%,25% 4%,39% 13%);}",
    "previewClass": "shape-021"
  },
  {
    "id": "shape-022",
    "title": "8 Point Burst",
    "category": "shape",
    "description": "8 Point Burst built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "burst",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-022\"></div>",
    "cssCode": ".shape-022{width:72px;height:72px;background:#2f3137;clip-path:polygon(50% 0,62% 16%,84% 16%,68% 32%,84% 50%,68% 64%,84% 84%,62% 84%,50% 100%,38% 84%,16% 84%,32% 64%,16% 50%,32% 32%,16% 16%,38% 16%);}",
    "previewClass": "shape-022"
  },
  {
    "id": "shape-023",
    "title": "Diamond Square",
    "category": "shape",
    "description": "Diamond Square built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "diamond",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-023\"></div>",
    "cssCode": ".shape-023{width:52px;height:52px;background:#2f3137;transform:rotate(45deg);}",
    "previewClass": "shape-023"
  },
  {
    "id": "shape-024",
    "title": "Diamond",
    "category": "shape",
    "description": "Diamond built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "diamond",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-024\"></div>",
    "cssCode": ".shape-024{width:60px;height:72px;background:#2f3137;clip-path:polygon(50% 0,100% 40%,50% 100%,0 40%);}",
    "previewClass": "shape-024"
  },
  {
    "id": "shape-025",
    "title": "Check Mark",
    "category": "shape",
    "description": "Check Mark built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "check",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-025\"></div>",
    "cssCode": ".shape-025{width:18px;height:34px;border-right:3px solid #2f3137;border-bottom:3px solid #2f3137;transform:rotate(45deg);}",
    "previewClass": "shape-025"
  },
  {
    "id": "shape-026",
    "title": "Thick Check Mark",
    "category": "shape",
    "description": "Thick Check Mark built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "check",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-026\"></div>",
    "cssCode": ".shape-026{width:20px;height:38px;border-right:7px solid #2f3137;border-bottom:7px solid #2f3137;transform:rotate(45deg);}",
    "previewClass": "shape-026"
  },
  {
    "id": "shape-027",
    "title": "Triangle with Borders",
    "category": "shape",
    "description": "Triangle with Borders built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "triangle",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-027\"></div>",
    "cssCode": ".shape-027{width:0;height:0;border-left:30px solid transparent;border-right:30px solid transparent;border-bottom:54px solid #2f3137;position:relative}.shape-027::after{content:\"\";position:absolute;left:-26px;top:6px;border-left:26px solid transparent;border-right:26px solid transparent;border-bottom:46px solid #fff;}",
    "previewClass": "shape-027"
  },
  {
    "id": "shape-028",
    "title": "Cone",
    "category": "shape",
    "description": "Cone built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "cone",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-028\"></div>",
    "cssCode": ".shape-028{width:74px;height:48px;background:#2f3137;border-radius:999px 999px 34px 34px;clip-path:polygon(0 0,100% 0,72% 100%,28% 100%);}",
    "previewClass": "shape-028"
  },
  {
    "id": "shape-029",
    "title": "Plus",
    "category": "shape",
    "description": "Plus built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "plus",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-029\"></div>",
    "cssCode": ".shape-029{width:64px;height:64px;background:#2f3137;clip-path:polygon(38% 0,62% 0,62% 38%,100% 38%,100% 62%,62% 62%,62% 100%,38% 100%,38% 62%,0 62%,0 38%,38% 38%);}",
    "previewClass": "shape-029"
  },
  {
    "id": "shape-030",
    "title": "Base",
    "category": "shape",
    "description": "Base built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "house",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-030\"></div>",
    "cssCode": ".shape-030{width:68px;height:54px;background:#2f3137;clip-path:polygon(50% 0,100% 36%,100% 100%,0 100%,0 36%);}",
    "previewClass": "shape-030"
  },
  {
    "id": "shape-031",
    "title": "Yin Yang",
    "category": "shape",
    "description": "Yin Yang built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "circle",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-031\"></div>",
    "cssCode": ".shape-031{width:68px;height:68px;border-radius:50%;background:linear-gradient(90deg,#2f3137 50%,#fff 50%);border:2px solid #2f3137;position:relative}.shape-031::before,.shape-031::after{content:\"\";position:absolute;width:32px;height:32px;border-radius:50%;left:16px}.shape-031::before{top:0;background:radial-gradient(circle,#fff 25%,#2f3137 26%)}.shape-031::after{bottom:0;background:radial-gradient(circle,#2f3137 25%,#fff 26%)}",
    "previewClass": "shape-031"
  },
  {
    "id": "shape-032",
    "title": "Octagon",
    "category": "shape",
    "description": "Octagon built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "polygon",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-032\"></div>",
    "cssCode": ".shape-032{width:68px;height:68px;background:#2f3137;clip-path:polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%);}",
    "previewClass": "shape-032"
  },
  {
    "id": "shape-033",
    "title": "Oval",
    "category": "shape",
    "description": "Oval built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "oval",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-033\"></div>",
    "cssCode": ".shape-033{width:78px;height:52px;background:#2f3137;border-radius:999px;}",
    "previewClass": "shape-033"
  },
  {
    "id": "shape-034",
    "title": "Pac-Man",
    "category": "shape",
    "description": "Pac-Man built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "circle",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-034\"></div>",
    "cssCode": ".shape-034{width:72px;height:72px;background:#2f3137;border-radius:50%;clip-path:polygon(0 0,100% 16%,72% 50%,100% 84%,0 100%);}",
    "previewClass": "shape-034"
  },
  {
    "id": "shape-035",
    "title": "Space Invader",
    "category": "shape",
    "description": "Space Invader built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "pixel",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-035\"></div>",
    "cssCode": ".shape-035{width:70px;height:52px;background:#2f3137;clip-path:polygon(0 26%,13% 26%,13% 0,26% 0,26% 26%,39% 26%,39% 0,61% 0,61% 26%,74% 26%,74% 0,87% 0,87% 26%,100% 26%,100% 52%,87% 52%,87% 65%,74% 65%,74% 78%,61% 78%,61% 100%,39% 100%,39% 78%,26% 78%,26% 65%,13% 65%,13% 52%,0 52%);}",
    "previewClass": "shape-035"
  },
  {
    "id": "shape-036",
    "title": "Moon",
    "category": "shape",
    "description": "Moon built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "moon",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-036\"></div>",
    "cssCode": ".shape-036{width:68px;height:68px;border-radius:50%;background:#2f3137;box-shadow:18px -8px 0 8px #fff;}",
    "previewClass": "shape-036"
  },
  {
    "id": "shape-037",
    "title": "Flag",
    "category": "shape",
    "description": "Flag built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "flag",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-037\"></div>",
    "cssCode": ".shape-037{width:46px;height:68px;background:#2f3137;clip-path:polygon(0 0,100% 0,100% 72%,50% 56%,0 72%);}",
    "previewClass": "shape-037"
  },
  {
    "id": "shape-038",
    "title": "Triangle Top Left",
    "category": "shape",
    "description": "Triangle Top Left built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "triangle",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-038\"></div>",
    "cssCode": ".shape-038{width:0;height:0;border-top:52px solid #2f3137;border-right:52px solid transparent;}",
    "previewClass": "shape-038"
  },
  {
    "id": "shape-039",
    "title": "Triangle Top Right",
    "category": "shape",
    "description": "Triangle Top Right built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "triangle",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-039\"></div>",
    "cssCode": ".shape-039{width:0;height:0;border-top:52px solid #2f3137;border-left:52px solid transparent;}",
    "previewClass": "shape-039"
  },
  {
    "id": "shape-040",
    "title": "Triangle Bottom Left",
    "category": "shape",
    "description": "Triangle Bottom Left built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "triangle",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-040\"></div>",
    "cssCode": ".shape-040{width:0;height:0;border-bottom:52px solid #2f3137;border-right:52px solid transparent;}",
    "previewClass": "shape-040"
  },
  {
    "id": "shape-041",
    "title": "Triangle Bottom Right",
    "category": "shape",
    "description": "Triangle Bottom Right built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "triangle",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-041\"></div>",
    "cssCode": ".shape-041{width:0;height:0;border-bottom:52px solid #2f3137;border-left:52px solid transparent;}",
    "previewClass": "shape-041"
  },
  {
    "id": "shape-042",
    "title": "Trapezoid",
    "category": "shape",
    "description": "Trapezoid built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "polygon",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-042\"></div>",
    "cssCode": ".shape-042{width:86px;height:54px;background:#2f3137;clip-path:polygon(18% 0,82% 0,100% 100%,0 100%);}",
    "previewClass": "shape-042"
  },
  {
    "id": "shape-043",
    "title": "Parallelogram",
    "category": "shape",
    "description": "Parallelogram built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "polygon",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-043\"></div>",
    "cssCode": ".shape-043{width:86px;height:52px;background:#2f3137;transform:skew(-18deg);}",
    "previewClass": "shape-043"
  },
  {
    "id": "shape-044",
    "title": "6-points Star",
    "category": "shape",
    "description": "6-points Star built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "star",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-044\"></div>",
    "cssCode": ".shape-044{width:72px;height:72px;background:#2f3137;clip-path:polygon(50% 0,61% 20%,84% 20%,67% 37%,76% 60%,50% 47%,24% 60%,33% 37%,16% 20%,39% 20%);}",
    "previewClass": "shape-044"
  },
  {
    "id": "shape-045",
    "title": "Hexagon",
    "category": "shape",
    "description": "Hexagon built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "polygon",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-045\"></div>",
    "cssCode": ".shape-045{width:74px;height:66px;background:#2f3137;clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);}",
    "previewClass": "shape-045"
  },
  {
    "id": "shape-046",
    "title": "Pentagon",
    "category": "shape",
    "description": "Pentagon built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "polygon",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-046\"></div>",
    "cssCode": ".shape-046{width:74px;height:70px;background:#2f3137;clip-path:polygon(50% 0,100% 38%,82% 100%,18% 100%,0 38%);}",
    "previewClass": "shape-046"
  },
  {
    "id": "shape-047",
    "title": "Infinity",
    "category": "shape",
    "description": "Infinity built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "infinity",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-047\"></div>",
    "cssCode": ".shape-047{width:90px;height:42px;position:relative}.shape-047::before,.shape-047::after{content:\"\";position:absolute;top:0;width:34px;height:34px;border:6px solid #2f3137;border-radius:50% 50% 50% 0;transform:rotate(-45deg)}.shape-047::before{left:10px}.shape-047::after{right:10px;transform:rotate(135deg)}",
    "previewClass": "shape-047"
  },
  {
    "id": "shape-048",
    "title": "Egg",
    "category": "shape",
    "description": "Egg built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "oval",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-048\"></div>",
    "cssCode": ".shape-048{width:56px;height:78px;background:#2f3137;border-radius:50% 50% 46% 46% / 56% 56% 44% 44%;}",
    "previewClass": "shape-048"
  },
  {
    "id": "shape-049",
    "title": "Badge Ribbon",
    "category": "shape",
    "description": "Badge Ribbon built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "badge",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-049\"></div>",
    "cssCode": ".shape-049{width:58px;height:74px;background:#2f3137;clip-path:polygon(50% 0,76% 8%,88% 28%,88% 54%,68% 70%,76% 100%,50% 88%,24% 100%,32% 70%,12% 54%,12% 28%,24% 8%);}",
    "previewClass": "shape-049"
  },
  {
    "id": "shape-050",
    "title": "TV Screen",
    "category": "shape",
    "description": "TV Screen built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "screen",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-050\"></div>",
    "cssCode": ".shape-050{width:84px;height:58px;background:#2f3137;border-radius:8px;position:relative}.shape-050::before{content:\"\";position:absolute;left:24px;top:-10px;width:36px;height:10px;background:#2f3137;clip-path:polygon(12% 100%,88% 100%,100% 0,0 0)}",
    "previewClass": "shape-050"
  },
  {
    "id": "shape-051",
    "title": "Cylinder",
    "category": "shape",
    "description": "Cylinder built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "cylinder",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-051\"></div>",
    "cssCode": ".shape-051{width:56px;height:78px;background:#2f3137;border-radius:28px/12px;position:relative}.shape-051::before,.shape-051::after{content:\"\";position:absolute;left:0;width:56px;height:14px;border-radius:50%;background:#3d4047}.shape-051::before{top:0}.shape-051::after{bottom:0}",
    "previewClass": "shape-051"
  },
  {
    "id": "shape-052",
    "title": "Price Tag",
    "category": "shape",
    "description": "Price Tag built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "tag",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-052\"></div>",
    "cssCode": ".shape-052{width:82px;height:44px;background:#2f3137;clip-path:polygon(0 0,82% 0,100% 50%,82% 100%,0 100%,12% 50%);position:relative}.shape-052::after{content:\"\";position:absolute;left:14px;top:18px;width:7px;height:7px;border-radius:50%;background:#fff}",
    "previewClass": "shape-052"
  },
  {
    "id": "shape-053",
    "title": "Tooltip Top",
    "category": "shape",
    "description": "Tooltip Top built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "tooltip",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-053\"></div>",
    "cssCode": ".shape-053{width:84px;height:44px;background:#2f3137;border-radius:10px;position:relative}.shape-053::after{content:\"\";position:absolute;left:32px;top:-10px;border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:12px solid #2f3137;}",
    "previewClass": "shape-053"
  },
  {
    "id": "shape-054",
    "title": "Tooltip Bottom",
    "category": "shape",
    "description": "Tooltip Bottom built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "tooltip",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-054\"></div>",
    "cssCode": ".shape-054{width:84px;height:44px;background:#2f3137;border-radius:10px;position:relative}.shape-054::after{content:\"\";position:absolute;left:32px;bottom:-10px;border-left:10px solid transparent;border-right:10px solid transparent;border-top:12px solid #2f3137;}",
    "previewClass": "shape-054"
  },
  {
    "id": "shape-055",
    "title": "Tooltip Left",
    "category": "shape",
    "description": "Tooltip Left built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "tooltip",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-055\"></div>",
    "cssCode": ".shape-055{width:84px;height:44px;background:#2f3137;border-radius:10px;position:relative}.shape-055::after{content:\"\";position:absolute;left:-10px;top:14px;border-top:10px solid transparent;border-bottom:10px solid transparent;border-right:12px solid #2f3137;}",
    "previewClass": "shape-055"
  },
  {
    "id": "shape-056",
    "title": "Tooltip Right",
    "category": "shape",
    "description": "Tooltip Right built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "tooltip",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-056\"></div>",
    "cssCode": ".shape-056{width:84px;height:44px;background:#2f3137;border-radius:10px;position:relative}.shape-056::after{content:\"\";position:absolute;right:-10px;top:14px;border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:12px solid #2f3137;}",
    "previewClass": "shape-056"
  },
  {
    "id": "shape-057",
    "title": "Triangle with Partial Borders",
    "category": "shape",
    "description": "Triangle with Partial Borders built with pure CSS for badges, pointers, icons, and decorative UI foundations.",
    "tags": [
      "shape",
      "css",
      "triangle",
      "border",
      "foundation"
    ],
    "htmlCode": "<div class=\"shape-057\"></div>",
    "cssCode": ".shape-057{width:64px;height:42px;border:1px solid #cbd5e1;position:relative;background:#fff}.shape-057::after{content:\"\";position:absolute;left:22px;top:-8px;width:14px;height:14px;border-top:2px solid #ef4444;border-left:2px solid #ef4444;transform:rotate(45deg);background:#fff}",
    "previewClass": "shape-057"
  },
  {
    "id": "navbar-001",
    "title": "Navbar 1",
    "category": "navbar",
    "description": "Navbar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "navbar",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"navbar-001\"><div style=\"display:flex;align-items:center;justify-content:space-between;gap:10px\"><div style=\"display:flex;align-items:center;gap:10px\"><span style=\"width:30px;height:30px;border-radius:10px;background:#0f172a;display:block\"></span><strong>Acme UI</strong></div><div style=\"display:flex;gap:8px\"><span class=\"pill\">Docs</span><span class=\"ghost\">Login</span><span class=\"primary\">Start</span></div></div><div style=\"display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px\"><div class=\"chip\"></div><div class=\"chip\" style=\"opacity:.7\"></div><div class=\"chip\" style=\"opacity:.45\"></div></div></div>",
    "cssCode": "\n.navbar-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.navbar-001 * { box-sizing: border-box; }\n.navbar-001 .muted { color: #64748b; }\n.navbar-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.navbar-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "navbar-001"
  },
  {
    "id": "navbar-002",
    "title": "Navbar 2",
    "category": "navbar",
    "description": "Navbar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "navbar",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"navbar-002\"><div style=\"display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px\"><strong style=\"font-size:15px\">Northstar</strong><div style=\"display:flex;justify-content:center;gap:10px\" class=\"muted\"><span>Home</span><span>Work</span><span>Pricing</span></div><span class=\"primary\">Book demo</span></div><div class=\"surface\" style=\"height:36px;display:flex;align-items:center;padding:0 12px\" class=\"muted\">Trusted by 9,400+ teams</div></div>",
    "cssCode": "\n.navbar-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.navbar-002 * { box-sizing: border-box; }\n.navbar-002 .muted { color: #64748b; }\n.navbar-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.navbar-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "navbar-002"
  },
  {
    "id": "navbar-003",
    "title": "Navbar 3",
    "category": "navbar",
    "description": "Navbar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "navbar",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"navbar-003\"><div style=\"display:flex;align-items:center;justify-content:space-between\"><div style=\"display:flex;gap:8px\"><span class=\"pill\">Studio</span><span class=\"pill\">Docs</span></div><span class=\"ghost\">Contact</span></div><div class=\"surface\" style=\"display:grid;grid-template-columns:1fr auto;gap:10px;padding:10px 12px\"><strong style=\"font-size:14px\">Premium navigation shell</strong><span style=\"width:26px;height:26px;border-radius:9px;background:#065f46;display:block\"></span></div></div>",
    "cssCode": "\n.navbar-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.navbar-003 * { box-sizing: border-box; }\n.navbar-003 .muted { color: #64748b; }\n.navbar-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.navbar-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "navbar-003"
  },
  {
    "id": "navbar-004",
    "title": "Navbar 4",
    "category": "navbar",
    "description": "Navbar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "navbar",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"navbar-004\"><div style=\"display:flex;align-items:center;justify-content:space-between;gap:10px\"><div style=\"display:flex;align-items:center;gap:10px\"><span style=\"width:30px;height:30px;border-radius:10px;background:#9f1239;display:block\"></span><strong>Acme UI</strong></div><div style=\"display:flex;gap:8px\"><span class=\"pill\">Docs</span><span class=\"ghost\">Login</span><span class=\"primary\">Start</span></div></div><div style=\"display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px\"><div class=\"chip\"></div><div class=\"chip\" style=\"opacity:.7\"></div><div class=\"chip\" style=\"opacity:.45\"></div></div></div>",
    "cssCode": "\n.navbar-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.navbar-004 * { box-sizing: border-box; }\n.navbar-004 .muted { color: #64748b; }\n.navbar-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.navbar-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "navbar-004"
  },
  {
    "id": "navbar-005",
    "title": "Navbar 5",
    "category": "navbar",
    "description": "Navbar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "navbar",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"navbar-005\"><div style=\"display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px\"><strong style=\"font-size:15px\">Northstar</strong><div style=\"display:flex;justify-content:center;gap:10px\" class=\"muted\"><span>Home</span><span>Work</span><span>Pricing</span></div><span class=\"primary\">Book demo</span></div><div class=\"surface\" style=\"height:36px;display:flex;align-items:center;padding:0 12px\" class=\"muted\">Trusted by 9,400+ teams</div></div>",
    "cssCode": "\n.navbar-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.navbar-005 * { box-sizing: border-box; }\n.navbar-005 .muted { color: #64748b; }\n.navbar-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.navbar-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "navbar-005"
  },
  {
    "id": "navbar-006",
    "title": "Navbar 6",
    "category": "navbar",
    "description": "Navbar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "navbar",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"navbar-006\"><div style=\"display:flex;align-items:center;justify-content:space-between\"><div style=\"display:flex;gap:8px\"><span class=\"pill\">Studio</span><span class=\"pill\">Docs</span></div><span class=\"ghost\">Contact</span></div><div class=\"surface\" style=\"display:grid;grid-template-columns:1fr auto;gap:10px;padding:10px 12px\"><strong style=\"font-size:14px\">Premium navigation shell</strong><span style=\"width:26px;height:26px;border-radius:9px;background:#075985;display:block\"></span></div></div>",
    "cssCode": "\n.navbar-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.navbar-006 * { box-sizing: border-box; }\n.navbar-006 .muted { color: #64748b; }\n.navbar-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.navbar-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "navbar-006"
  },
  {
    "id": "navbar-007",
    "title": "Navbar 7",
    "category": "navbar",
    "description": "Navbar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "navbar",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"navbar-007\"><div style=\"display:flex;align-items:center;justify-content:space-between;gap:10px\"><div style=\"display:flex;align-items:center;gap:10px\"><span style=\"width:30px;height:30px;border-radius:10px;background:#0f172a;display:block\"></span><strong>Acme UI</strong></div><div style=\"display:flex;gap:8px\"><span class=\"pill\">Docs</span><span class=\"ghost\">Login</span><span class=\"primary\">Start</span></div></div><div style=\"display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px\"><div class=\"chip\"></div><div class=\"chip\" style=\"opacity:.7\"></div><div class=\"chip\" style=\"opacity:.45\"></div></div></div>",
    "cssCode": "\n.navbar-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.navbar-007 * { box-sizing: border-box; }\n.navbar-007 .muted { color: #64748b; }\n.navbar-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.navbar-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "navbar-007"
  },
  {
    "id": "navbar-008",
    "title": "Navbar 8",
    "category": "navbar",
    "description": "Navbar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "navbar",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"navbar-008\"><div style=\"display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px\"><strong style=\"font-size:15px\">Northstar</strong><div style=\"display:flex;justify-content:center;gap:10px\" class=\"muted\"><span>Home</span><span>Work</span><span>Pricing</span></div><span class=\"primary\">Book demo</span></div><div class=\"surface\" style=\"height:36px;display:flex;align-items:center;padding:0 12px\" class=\"muted\">Trusted by 9,400+ teams</div></div>",
    "cssCode": "\n.navbar-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.navbar-008 * { box-sizing: border-box; }\n.navbar-008 .muted { color: #64748b; }\n.navbar-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.navbar-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "navbar-008"
  },
  {
    "id": "navbar-009",
    "title": "Navbar 9",
    "category": "navbar",
    "description": "Navbar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "navbar",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"navbar-009\"><div style=\"display:flex;align-items:center;justify-content:space-between\"><div style=\"display:flex;gap:8px\"><span class=\"pill\">Studio</span><span class=\"pill\">Docs</span></div><span class=\"ghost\">Contact</span></div><div class=\"surface\" style=\"display:grid;grid-template-columns:1fr auto;gap:10px;padding:10px 12px\"><strong style=\"font-size:14px\">Premium navigation shell</strong><span style=\"width:26px;height:26px;border-radius:9px;background:#065f46;display:block\"></span></div></div>",
    "cssCode": "\n.navbar-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.navbar-009 * { box-sizing: border-box; }\n.navbar-009 .muted { color: #64748b; }\n.navbar-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.navbar-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "navbar-009"
  },
  {
    "id": "navbar-010",
    "title": "Navbar 10",
    "category": "navbar",
    "description": "Navbar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "navbar",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"navbar-010\"><div style=\"display:flex;align-items:center;justify-content:space-between;gap:10px\"><div style=\"display:flex;align-items:center;gap:10px\"><span style=\"width:30px;height:30px;border-radius:10px;background:#9f1239;display:block\"></span><strong>Acme UI</strong></div><div style=\"display:flex;gap:8px\"><span class=\"pill\">Docs</span><span class=\"ghost\">Login</span><span class=\"primary\">Start</span></div></div><div style=\"display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px\"><div class=\"chip\"></div><div class=\"chip\" style=\"opacity:.7\"></div><div class=\"chip\" style=\"opacity:.45\"></div></div></div>",
    "cssCode": "\n.navbar-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.navbar-010 * { box-sizing: border-box; }\n.navbar-010 .muted { color: #64748b; }\n.navbar-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.navbar-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "navbar-010"
  },
  {
    "id": "navbar-011",
    "title": "Navbar 11",
    "category": "navbar",
    "description": "Navbar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "navbar",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"navbar-011\"><div style=\"display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px\"><strong style=\"font-size:15px\">Northstar</strong><div style=\"display:flex;justify-content:center;gap:10px\" class=\"muted\"><span>Home</span><span>Work</span><span>Pricing</span></div><span class=\"primary\">Book demo</span></div><div class=\"surface\" style=\"height:36px;display:flex;align-items:center;padding:0 12px\" class=\"muted\">Trusted by 9,400+ teams</div></div>",
    "cssCode": "\n.navbar-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.navbar-011 * { box-sizing: border-box; }\n.navbar-011 .muted { color: #64748b; }\n.navbar-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.navbar-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.navbar-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "navbar-011"
  },
  {
    "id": "hero-001",
    "title": "Hero 1",
    "category": "hero",
    "description": "Hero layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "hero",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"hero-001\"><span class=\"pill\">New</span><div style=\"display:grid;gap:6px\"><strong style=\"font-size:20px;line-height:1.05\">Launch faster with modern UI</strong><span class=\"muted\" style=\"font-size:12px\">Clean hero composition with strong CTA and proof.</span></div><div style=\"display:flex;gap:8px\"><span class=\"primary\">Get started</span><span class=\"ghost\">Preview</span></div><div class=\"surface\" style=\"height:42px;display:grid;grid-template-columns:1.4fr .8fr;gap:8px;padding:8px\"><div style=\"border-radius:8px;background:#fff\"></div><div style=\"border-radius:8px;background:#4f46e5;opacity:.18\"></div></div></div>",
    "cssCode": "\n.hero-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.hero-001 * { box-sizing: border-box; }\n.hero-001 .muted { color: #64748b; }\n.hero-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.hero-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "hero-001"
  },
  {
    "id": "hero-002",
    "title": "Hero 2",
    "category": "hero",
    "description": "Hero layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "hero",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"hero-002\" style=\"grid-template-columns:1.2fr .8fr;align-items:stretch\"><div style=\"display:grid;gap:8px\"><span class=\"pill\">Benchmark</span><strong style=\"font-size:22px;line-height:1.02\">Sharper launches for product teams</strong><span class=\"muted\" style=\"font-size:12px\">Poster-style hero with compact proof and focused action.</span><div style=\"display:flex;gap:8px\"><span class=\"primary\">Start free</span><span class=\"ghost\">View stack</span></div></div><div class=\"surface\" style=\"min-height:116px;background:linear-gradient(145deg, color-mix(in srgb, #6366f1 16%, white), #fff);display:grid;place-items:center\"><div style=\"width:70%;height:58%;border-radius:16px;background:#3730a3;opacity:.12\"></div></div></div>",
    "cssCode": "\n.hero-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.hero-002 * { box-sizing: border-box; }\n.hero-002 .muted { color: #64748b; }\n.hero-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.hero-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "hero-002"
  },
  {
    "id": "hero-003",
    "title": "Hero 3",
    "category": "hero",
    "description": "Hero layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "hero",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"hero-003\"><div style=\"display:flex;justify-content:space-between;align-items:flex-start;gap:12px\"><div style=\"display:grid;gap:6px\"><strong style=\"font-size:20px;line-height:1.04\">Build calm, premium websites</strong><span class=\"muted\" style=\"font-size:12px\">High-conversion hero with visual balance.</span></div><span class=\"pill\">2026</span></div><div class=\"surface\" style=\"padding:10px;display:grid;grid-template-columns:1fr 1fr;gap:10px\"><div style=\"height:52px;border-radius:12px;background:#fff;border:1px solid #a7f3d0\"></div><div style=\"display:grid;gap:8px\"><div style=\"height:10px;border-radius:999px;background:#10b981;opacity:.22\"></div><div style=\"height:10px;border-radius:999px;background:#10b981;opacity:.14\"></div><span class=\"primary\" style=\"width:max-content\">Launch</span></div></div></div>",
    "cssCode": "\n.hero-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.hero-003 * { box-sizing: border-box; }\n.hero-003 .muted { color: #64748b; }\n.hero-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.hero-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "hero-003"
  },
  {
    "id": "hero-004",
    "title": "Hero 4",
    "category": "hero",
    "description": "Hero layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "hero",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"hero-004\"><span class=\"pill\">New</span><div style=\"display:grid;gap:6px\"><strong style=\"font-size:20px;line-height:1.05\">Launch faster with modern UI</strong><span class=\"muted\" style=\"font-size:12px\">Clean hero composition with strong CTA and proof.</span></div><div style=\"display:flex;gap:8px\"><span class=\"primary\">Get started</span><span class=\"ghost\">Preview</span></div><div class=\"surface\" style=\"height:42px;display:grid;grid-template-columns:1.4fr .8fr;gap:8px;padding:8px\"><div style=\"border-radius:8px;background:#fff\"></div><div style=\"border-radius:8px;background:#f43f5e;opacity:.18\"></div></div></div>",
    "cssCode": "\n.hero-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.hero-004 * { box-sizing: border-box; }\n.hero-004 .muted { color: #64748b; }\n.hero-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.hero-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "hero-004"
  },
  {
    "id": "hero-005",
    "title": "Hero 5",
    "category": "hero",
    "description": "Hero layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "hero",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"hero-005\" style=\"grid-template-columns:1.2fr .8fr;align-items:stretch\"><div style=\"display:grid;gap:8px\"><span class=\"pill\">Benchmark</span><strong style=\"font-size:22px;line-height:1.02\">Sharper launches for product teams</strong><span class=\"muted\" style=\"font-size:12px\">Poster-style hero with compact proof and focused action.</span><div style=\"display:flex;gap:8px\"><span class=\"primary\">Start free</span><span class=\"ghost\">View stack</span></div></div><div class=\"surface\" style=\"min-height:116px;background:linear-gradient(145deg, color-mix(in srgb, #f59e0b 16%, white), #fff);display:grid;place-items:center\"><div style=\"width:70%;height:58%;border-radius:16px;background:#92400e;opacity:.12\"></div></div></div>",
    "cssCode": "\n.hero-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.hero-005 * { box-sizing: border-box; }\n.hero-005 .muted { color: #64748b; }\n.hero-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.hero-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "hero-005"
  },
  {
    "id": "hero-006",
    "title": "Hero 6",
    "category": "hero",
    "description": "Hero layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "hero",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"hero-006\"><div style=\"display:flex;justify-content:space-between;align-items:flex-start;gap:12px\"><div style=\"display:grid;gap:6px\"><strong style=\"font-size:20px;line-height:1.04\">Build calm, premium websites</strong><span class=\"muted\" style=\"font-size:12px\">High-conversion hero with visual balance.</span></div><span class=\"pill\">2026</span></div><div class=\"surface\" style=\"padding:10px;display:grid;grid-template-columns:1fr 1fr;gap:10px\"><div style=\"height:52px;border-radius:12px;background:#fff;border:1px solid #bae6fd\"></div><div style=\"display:grid;gap:8px\"><div style=\"height:10px;border-radius:999px;background:#0ea5e9;opacity:.22\"></div><div style=\"height:10px;border-radius:999px;background:#0ea5e9;opacity:.14\"></div><span class=\"primary\" style=\"width:max-content\">Launch</span></div></div></div>",
    "cssCode": "\n.hero-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.hero-006 * { box-sizing: border-box; }\n.hero-006 .muted { color: #64748b; }\n.hero-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.hero-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "hero-006"
  },
  {
    "id": "hero-007",
    "title": "Hero 7",
    "category": "hero",
    "description": "Hero layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "hero",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"hero-007\"><span class=\"pill\">New</span><div style=\"display:grid;gap:6px\"><strong style=\"font-size:20px;line-height:1.05\">Launch faster with modern UI</strong><span class=\"muted\" style=\"font-size:12px\">Clean hero composition with strong CTA and proof.</span></div><div style=\"display:flex;gap:8px\"><span class=\"primary\">Get started</span><span class=\"ghost\">Preview</span></div><div class=\"surface\" style=\"height:42px;display:grid;grid-template-columns:1.4fr .8fr;gap:8px;padding:8px\"><div style=\"border-radius:8px;background:#fff\"></div><div style=\"border-radius:8px;background:#4f46e5;opacity:.18\"></div></div></div>",
    "cssCode": "\n.hero-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.hero-007 * { box-sizing: border-box; }\n.hero-007 .muted { color: #64748b; }\n.hero-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.hero-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "hero-007"
  },
  {
    "id": "hero-008",
    "title": "Hero 8",
    "category": "hero",
    "description": "Hero layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "hero",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"hero-008\" style=\"grid-template-columns:1.2fr .8fr;align-items:stretch\"><div style=\"display:grid;gap:8px\"><span class=\"pill\">Benchmark</span><strong style=\"font-size:22px;line-height:1.02\">Sharper launches for product teams</strong><span class=\"muted\" style=\"font-size:12px\">Poster-style hero with compact proof and focused action.</span><div style=\"display:flex;gap:8px\"><span class=\"primary\">Start free</span><span class=\"ghost\">View stack</span></div></div><div class=\"surface\" style=\"min-height:116px;background:linear-gradient(145deg, color-mix(in srgb, #6366f1 16%, white), #fff);display:grid;place-items:center\"><div style=\"width:70%;height:58%;border-radius:16px;background:#3730a3;opacity:.12\"></div></div></div>",
    "cssCode": "\n.hero-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.hero-008 * { box-sizing: border-box; }\n.hero-008 .muted { color: #64748b; }\n.hero-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.hero-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "hero-008"
  },
  {
    "id": "hero-009",
    "title": "Hero 9",
    "category": "hero",
    "description": "Hero layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "hero",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"hero-009\"><div style=\"display:flex;justify-content:space-between;align-items:flex-start;gap:12px\"><div style=\"display:grid;gap:6px\"><strong style=\"font-size:20px;line-height:1.04\">Build calm, premium websites</strong><span class=\"muted\" style=\"font-size:12px\">High-conversion hero with visual balance.</span></div><span class=\"pill\">2026</span></div><div class=\"surface\" style=\"padding:10px;display:grid;grid-template-columns:1fr 1fr;gap:10px\"><div style=\"height:52px;border-radius:12px;background:#fff;border:1px solid #a7f3d0\"></div><div style=\"display:grid;gap:8px\"><div style=\"height:10px;border-radius:999px;background:#10b981;opacity:.22\"></div><div style=\"height:10px;border-radius:999px;background:#10b981;opacity:.14\"></div><span class=\"primary\" style=\"width:max-content\">Launch</span></div></div></div>",
    "cssCode": "\n.hero-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.hero-009 * { box-sizing: border-box; }\n.hero-009 .muted { color: #64748b; }\n.hero-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.hero-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "hero-009"
  },
  {
    "id": "hero-010",
    "title": "Hero 10",
    "category": "hero",
    "description": "Hero layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "hero",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"hero-010\"><span class=\"pill\">New</span><div style=\"display:grid;gap:6px\"><strong style=\"font-size:20px;line-height:1.05\">Launch faster with modern UI</strong><span class=\"muted\" style=\"font-size:12px\">Clean hero composition with strong CTA and proof.</span></div><div style=\"display:flex;gap:8px\"><span class=\"primary\">Get started</span><span class=\"ghost\">Preview</span></div><div class=\"surface\" style=\"height:42px;display:grid;grid-template-columns:1.4fr .8fr;gap:8px;padding:8px\"><div style=\"border-radius:8px;background:#fff\"></div><div style=\"border-radius:8px;background:#f43f5e;opacity:.18\"></div></div></div>",
    "cssCode": "\n.hero-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.hero-010 * { box-sizing: border-box; }\n.hero-010 .muted { color: #64748b; }\n.hero-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.hero-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "hero-010"
  },
  {
    "id": "hero-011",
    "title": "Hero 11",
    "category": "hero",
    "description": "Hero layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "hero",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"hero-011\" style=\"grid-template-columns:1.2fr .8fr;align-items:stretch\"><div style=\"display:grid;gap:8px\"><span class=\"pill\">Benchmark</span><strong style=\"font-size:22px;line-height:1.02\">Sharper launches for product teams</strong><span class=\"muted\" style=\"font-size:12px\">Poster-style hero with compact proof and focused action.</span><div style=\"display:flex;gap:8px\"><span class=\"primary\">Start free</span><span class=\"ghost\">View stack</span></div></div><div class=\"surface\" style=\"min-height:116px;background:linear-gradient(145deg, color-mix(in srgb, #f59e0b 16%, white), #fff);display:grid;place-items:center\"><div style=\"width:70%;height:58%;border-radius:16px;background:#92400e;opacity:.12\"></div></div></div>",
    "cssCode": "\n.hero-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.hero-011 * { box-sizing: border-box; }\n.hero-011 .muted { color: #64748b; }\n.hero-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.hero-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.hero-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "hero-011"
  },
  {
    "id": "feature-001",
    "title": "Feature 1",
    "category": "feature",
    "description": "Feature layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "feature",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"feature-001\"><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:8px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"width:28px;height:28px;border-radius:10px;background:#4f46e5;opacity:.18\"></div><div style=\"margin-top:10px;font-weight:700;font-size:12px\">Fast</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"width:28px;height:28px;border-radius:10px;background:#4f46e5;opacity:.28\"></div><div style=\"margin-top:10px;font-weight:700;font-size:12px\">Secure</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"width:28px;height:28px;border-radius:10px;background:#4f46e5;opacity:.38\"></div><div style=\"margin-top:10px;font-weight:700;font-size:12px\">Scalable</div></div></div><span class=\"muted\" style=\"font-size:12px\">Feature grid for SaaS and service sites.</span></div>",
    "cssCode": "\n.feature-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.feature-001 * { box-sizing: border-box; }\n.feature-001 .muted { color: #64748b; }\n.feature-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.feature-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "feature-001"
  },
  {
    "id": "feature-002",
    "title": "Feature 2",
    "category": "feature",
    "description": "Feature layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "feature",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"feature-002\"><div class=\"surface\" style=\"padding:12px;display:grid;grid-template-columns:.8fr 1.2fr;gap:12px\"><div style=\"display:grid;gap:8px\"><span style=\"height:30px;border-radius:10px;background:#6366f1;opacity:.18\"></span><span style=\"height:30px;border-radius:10px;background:#6366f1;opacity:.28\"></span></div><div style=\"display:grid;gap:8px\"><strong style=\"font-size:14px\">Feature stack</strong><span class=\"muted\" style=\"font-size:12px\">One highlighted capability with two supporting rows.</span><span class=\"primary\" style=\"width:max-content\">Explore</span></div></div></div>",
    "cssCode": "\n.feature-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.feature-002 * { box-sizing: border-box; }\n.feature-002 .muted { color: #64748b; }\n.feature-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.feature-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "feature-002"
  },
  {
    "id": "feature-003",
    "title": "Feature 3",
    "category": "feature",
    "description": "Feature layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "feature",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"feature-003\"><div style=\"display:grid;gap:8px\"><div class=\"surface\" style=\"padding:10px 12px;display:flex;align-items:center;justify-content:space-between\"><strong style=\"font-size:12px\">Workflow</strong><span style=\"width:22px;height:22px;border-radius:8px;background:#10b981;opacity:0.18;display:block\"></span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;align-items:center;justify-content:space-between\"><strong style=\"font-size:12px\">Automation</strong><span style=\"width:22px;height:22px;border-radius:8px;background:#10b981;opacity:0.28;display:block\"></span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;align-items:center;justify-content:space-between\"><strong style=\"font-size:12px\">Security</strong><span style=\"width:22px;height:22px;border-radius:8px;background:#10b981;opacity:0.38;display:block\"></span></div></div></div>",
    "cssCode": "\n.feature-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.feature-003 * { box-sizing: border-box; }\n.feature-003 .muted { color: #64748b; }\n.feature-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.feature-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "feature-003"
  },
  {
    "id": "feature-004",
    "title": "Feature 4",
    "category": "feature",
    "description": "Feature layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "feature",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"feature-004\"><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:8px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"width:28px;height:28px;border-radius:10px;background:#f43f5e;opacity:.18\"></div><div style=\"margin-top:10px;font-weight:700;font-size:12px\">Fast</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"width:28px;height:28px;border-radius:10px;background:#f43f5e;opacity:.28\"></div><div style=\"margin-top:10px;font-weight:700;font-size:12px\">Secure</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"width:28px;height:28px;border-radius:10px;background:#f43f5e;opacity:.38\"></div><div style=\"margin-top:10px;font-weight:700;font-size:12px\">Scalable</div></div></div><span class=\"muted\" style=\"font-size:12px\">Feature grid for SaaS and service sites.</span></div>",
    "cssCode": "\n.feature-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.feature-004 * { box-sizing: border-box; }\n.feature-004 .muted { color: #64748b; }\n.feature-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.feature-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "feature-004"
  },
  {
    "id": "feature-005",
    "title": "Feature 5",
    "category": "feature",
    "description": "Feature layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "feature",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"feature-005\"><div class=\"surface\" style=\"padding:12px;display:grid;grid-template-columns:.8fr 1.2fr;gap:12px\"><div style=\"display:grid;gap:8px\"><span style=\"height:30px;border-radius:10px;background:#f59e0b;opacity:.18\"></span><span style=\"height:30px;border-radius:10px;background:#f59e0b;opacity:.28\"></span></div><div style=\"display:grid;gap:8px\"><strong style=\"font-size:14px\">Feature stack</strong><span class=\"muted\" style=\"font-size:12px\">One highlighted capability with two supporting rows.</span><span class=\"primary\" style=\"width:max-content\">Explore</span></div></div></div>",
    "cssCode": "\n.feature-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.feature-005 * { box-sizing: border-box; }\n.feature-005 .muted { color: #64748b; }\n.feature-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.feature-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "feature-005"
  },
  {
    "id": "feature-006",
    "title": "Feature 6",
    "category": "feature",
    "description": "Feature layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "feature",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"feature-006\"><div style=\"display:grid;gap:8px\"><div class=\"surface\" style=\"padding:10px 12px;display:flex;align-items:center;justify-content:space-between\"><strong style=\"font-size:12px\">Workflow</strong><span style=\"width:22px;height:22px;border-radius:8px;background:#0ea5e9;opacity:0.18;display:block\"></span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;align-items:center;justify-content:space-between\"><strong style=\"font-size:12px\">Automation</strong><span style=\"width:22px;height:22px;border-radius:8px;background:#0ea5e9;opacity:0.28;display:block\"></span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;align-items:center;justify-content:space-between\"><strong style=\"font-size:12px\">Security</strong><span style=\"width:22px;height:22px;border-radius:8px;background:#0ea5e9;opacity:0.38;display:block\"></span></div></div></div>",
    "cssCode": "\n.feature-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.feature-006 * { box-sizing: border-box; }\n.feature-006 .muted { color: #64748b; }\n.feature-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.feature-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "feature-006"
  },
  {
    "id": "feature-007",
    "title": "Feature 7",
    "category": "feature",
    "description": "Feature layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "feature",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"feature-007\"><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:8px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"width:28px;height:28px;border-radius:10px;background:#4f46e5;opacity:.18\"></div><div style=\"margin-top:10px;font-weight:700;font-size:12px\">Fast</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"width:28px;height:28px;border-radius:10px;background:#4f46e5;opacity:.28\"></div><div style=\"margin-top:10px;font-weight:700;font-size:12px\">Secure</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"width:28px;height:28px;border-radius:10px;background:#4f46e5;opacity:.38\"></div><div style=\"margin-top:10px;font-weight:700;font-size:12px\">Scalable</div></div></div><span class=\"muted\" style=\"font-size:12px\">Feature grid for SaaS and service sites.</span></div>",
    "cssCode": "\n.feature-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.feature-007 * { box-sizing: border-box; }\n.feature-007 .muted { color: #64748b; }\n.feature-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.feature-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "feature-007"
  },
  {
    "id": "feature-008",
    "title": "Feature 8",
    "category": "feature",
    "description": "Feature layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "feature",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"feature-008\"><div class=\"surface\" style=\"padding:12px;display:grid;grid-template-columns:.8fr 1.2fr;gap:12px\"><div style=\"display:grid;gap:8px\"><span style=\"height:30px;border-radius:10px;background:#6366f1;opacity:.18\"></span><span style=\"height:30px;border-radius:10px;background:#6366f1;opacity:.28\"></span></div><div style=\"display:grid;gap:8px\"><strong style=\"font-size:14px\">Feature stack</strong><span class=\"muted\" style=\"font-size:12px\">One highlighted capability with two supporting rows.</span><span class=\"primary\" style=\"width:max-content\">Explore</span></div></div></div>",
    "cssCode": "\n.feature-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.feature-008 * { box-sizing: border-box; }\n.feature-008 .muted { color: #64748b; }\n.feature-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.feature-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "feature-008"
  },
  {
    "id": "feature-009",
    "title": "Feature 9",
    "category": "feature",
    "description": "Feature layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "feature",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"feature-009\"><div style=\"display:grid;gap:8px\"><div class=\"surface\" style=\"padding:10px 12px;display:flex;align-items:center;justify-content:space-between\"><strong style=\"font-size:12px\">Workflow</strong><span style=\"width:22px;height:22px;border-radius:8px;background:#10b981;opacity:0.18;display:block\"></span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;align-items:center;justify-content:space-between\"><strong style=\"font-size:12px\">Automation</strong><span style=\"width:22px;height:22px;border-radius:8px;background:#10b981;opacity:0.28;display:block\"></span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;align-items:center;justify-content:space-between\"><strong style=\"font-size:12px\">Security</strong><span style=\"width:22px;height:22px;border-radius:8px;background:#10b981;opacity:0.38;display:block\"></span></div></div></div>",
    "cssCode": "\n.feature-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.feature-009 * { box-sizing: border-box; }\n.feature-009 .muted { color: #64748b; }\n.feature-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.feature-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "feature-009"
  },
  {
    "id": "feature-010",
    "title": "Feature 10",
    "category": "feature",
    "description": "Feature layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "feature",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"feature-010\"><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:8px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"width:28px;height:28px;border-radius:10px;background:#f43f5e;opacity:.18\"></div><div style=\"margin-top:10px;font-weight:700;font-size:12px\">Fast</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"width:28px;height:28px;border-radius:10px;background:#f43f5e;opacity:.28\"></div><div style=\"margin-top:10px;font-weight:700;font-size:12px\">Secure</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"width:28px;height:28px;border-radius:10px;background:#f43f5e;opacity:.38\"></div><div style=\"margin-top:10px;font-weight:700;font-size:12px\">Scalable</div></div></div><span class=\"muted\" style=\"font-size:12px\">Feature grid for SaaS and service sites.</span></div>",
    "cssCode": "\n.feature-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.feature-010 * { box-sizing: border-box; }\n.feature-010 .muted { color: #64748b; }\n.feature-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.feature-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "feature-010"
  },
  {
    "id": "feature-011",
    "title": "Feature 11",
    "category": "feature",
    "description": "Feature layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "feature",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"feature-011\"><div class=\"surface\" style=\"padding:12px;display:grid;grid-template-columns:.8fr 1.2fr;gap:12px\"><div style=\"display:grid;gap:8px\"><span style=\"height:30px;border-radius:10px;background:#f59e0b;opacity:.18\"></span><span style=\"height:30px;border-radius:10px;background:#f59e0b;opacity:.28\"></span></div><div style=\"display:grid;gap:8px\"><strong style=\"font-size:14px\">Feature stack</strong><span class=\"muted\" style=\"font-size:12px\">One highlighted capability with two supporting rows.</span><span class=\"primary\" style=\"width:max-content\">Explore</span></div></div></div>",
    "cssCode": "\n.feature-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.feature-011 * { box-sizing: border-box; }\n.feature-011 .muted { color: #64748b; }\n.feature-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.feature-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.feature-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "feature-011"
  },
  {
    "id": "testimonial-001",
    "title": "Testimonial 1",
    "category": "testimonial",
    "description": "Testimonial layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "testimonial",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"testimonial-001\"><div class=\"surface\" style=\"padding:12px\"><div style=\"display:flex;gap:10px;align-items:center\"><span style=\"width:34px;height:34px;border-radius:999px;background:#4f46e5;opacity:.25;display:block\"></span><div><div style=\"font-weight:700;font-size:12px\">Maya Rao</div><div class=\"muted\" style=\"font-size:11px\">Product Designer</div></div></div><p style=\"margin:10px 0 0;font-size:12px;line-height:1.5\">“This layout feels premium without becoming noisy.”</p></div><div style=\"display:flex;gap:5px\"><span style=\"width:10px;height:10px;border-radius:999px;background:#4f46e5;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span></div></div>",
    "cssCode": "\n.testimonial-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.testimonial-001 * { box-sizing: border-box; }\n.testimonial-001 .muted { color: #64748b; }\n.testimonial-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.testimonial-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "testimonial-001"
  },
  {
    "id": "testimonial-002",
    "title": "Testimonial 2",
    "category": "testimonial",
    "description": "Testimonial layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "testimonial",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"testimonial-002\"><div class=\"surface\" style=\"padding:12px\"><div style=\"display:flex;gap:10px;align-items:center\"><span style=\"width:34px;height:34px;border-radius:999px;background:#6366f1;opacity:.25;display:block\"></span><div><div style=\"font-weight:700;font-size:12px\">Maya Rao</div><div class=\"muted\" style=\"font-size:11px\">Product Designer</div></div></div><p style=\"margin:10px 0 0;font-size:12px;line-height:1.5\">“This layout feels premium without becoming noisy.”</p></div><div style=\"display:flex;gap:5px\"><span style=\"width:10px;height:10px;border-radius:999px;background:#6366f1;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span></div></div>",
    "cssCode": "\n.testimonial-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.testimonial-002 * { box-sizing: border-box; }\n.testimonial-002 .muted { color: #64748b; }\n.testimonial-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.testimonial-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "testimonial-002"
  },
  {
    "id": "testimonial-003",
    "title": "Testimonial 3",
    "category": "testimonial",
    "description": "Testimonial layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "testimonial",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"testimonial-003\"><div class=\"surface\" style=\"padding:12px\"><div style=\"display:flex;gap:10px;align-items:center\"><span style=\"width:34px;height:34px;border-radius:999px;background:#10b981;opacity:.25;display:block\"></span><div><div style=\"font-weight:700;font-size:12px\">Maya Rao</div><div class=\"muted\" style=\"font-size:11px\">Product Designer</div></div></div><p style=\"margin:10px 0 0;font-size:12px;line-height:1.5\">“This layout feels premium without becoming noisy.”</p></div><div style=\"display:flex;gap:5px\"><span style=\"width:10px;height:10px;border-radius:999px;background:#10b981;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span></div></div>",
    "cssCode": "\n.testimonial-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.testimonial-003 * { box-sizing: border-box; }\n.testimonial-003 .muted { color: #64748b; }\n.testimonial-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.testimonial-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "testimonial-003"
  },
  {
    "id": "testimonial-004",
    "title": "Testimonial 4",
    "category": "testimonial",
    "description": "Testimonial layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "testimonial",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"testimonial-004\"><div class=\"surface\" style=\"padding:12px\"><div style=\"display:flex;gap:10px;align-items:center\"><span style=\"width:34px;height:34px;border-radius:999px;background:#f43f5e;opacity:.25;display:block\"></span><div><div style=\"font-weight:700;font-size:12px\">Maya Rao</div><div class=\"muted\" style=\"font-size:11px\">Product Designer</div></div></div><p style=\"margin:10px 0 0;font-size:12px;line-height:1.5\">“This layout feels premium without becoming noisy.”</p></div><div style=\"display:flex;gap:5px\"><span style=\"width:10px;height:10px;border-radius:999px;background:#f43f5e;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span></div></div>",
    "cssCode": "\n.testimonial-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.testimonial-004 * { box-sizing: border-box; }\n.testimonial-004 .muted { color: #64748b; }\n.testimonial-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.testimonial-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "testimonial-004"
  },
  {
    "id": "testimonial-005",
    "title": "Testimonial 5",
    "category": "testimonial",
    "description": "Testimonial layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "testimonial",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"testimonial-005\"><div class=\"surface\" style=\"padding:12px\"><div style=\"display:flex;gap:10px;align-items:center\"><span style=\"width:34px;height:34px;border-radius:999px;background:#f59e0b;opacity:.25;display:block\"></span><div><div style=\"font-weight:700;font-size:12px\">Maya Rao</div><div class=\"muted\" style=\"font-size:11px\">Product Designer</div></div></div><p style=\"margin:10px 0 0;font-size:12px;line-height:1.5\">“This layout feels premium without becoming noisy.”</p></div><div style=\"display:flex;gap:5px\"><span style=\"width:10px;height:10px;border-radius:999px;background:#f59e0b;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span></div></div>",
    "cssCode": "\n.testimonial-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.testimonial-005 * { box-sizing: border-box; }\n.testimonial-005 .muted { color: #64748b; }\n.testimonial-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.testimonial-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "testimonial-005"
  },
  {
    "id": "testimonial-006",
    "title": "Testimonial 6",
    "category": "testimonial",
    "description": "Testimonial layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "testimonial",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"testimonial-006\"><div class=\"surface\" style=\"padding:12px\"><div style=\"display:flex;gap:10px;align-items:center\"><span style=\"width:34px;height:34px;border-radius:999px;background:#0ea5e9;opacity:.25;display:block\"></span><div><div style=\"font-weight:700;font-size:12px\">Maya Rao</div><div class=\"muted\" style=\"font-size:11px\">Product Designer</div></div></div><p style=\"margin:10px 0 0;font-size:12px;line-height:1.5\">“This layout feels premium without becoming noisy.”</p></div><div style=\"display:flex;gap:5px\"><span style=\"width:10px;height:10px;border-radius:999px;background:#0ea5e9;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span></div></div>",
    "cssCode": "\n.testimonial-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.testimonial-006 * { box-sizing: border-box; }\n.testimonial-006 .muted { color: #64748b; }\n.testimonial-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.testimonial-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "testimonial-006"
  },
  {
    "id": "testimonial-007",
    "title": "Testimonial 7",
    "category": "testimonial",
    "description": "Testimonial layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "testimonial",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"testimonial-007\"><div class=\"surface\" style=\"padding:12px\"><div style=\"display:flex;gap:10px;align-items:center\"><span style=\"width:34px;height:34px;border-radius:999px;background:#4f46e5;opacity:.25;display:block\"></span><div><div style=\"font-weight:700;font-size:12px\">Maya Rao</div><div class=\"muted\" style=\"font-size:11px\">Product Designer</div></div></div><p style=\"margin:10px 0 0;font-size:12px;line-height:1.5\">“This layout feels premium without becoming noisy.”</p></div><div style=\"display:flex;gap:5px\"><span style=\"width:10px;height:10px;border-radius:999px;background:#4f46e5;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span></div></div>",
    "cssCode": "\n.testimonial-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.testimonial-007 * { box-sizing: border-box; }\n.testimonial-007 .muted { color: #64748b; }\n.testimonial-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.testimonial-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "testimonial-007"
  },
  {
    "id": "testimonial-008",
    "title": "Testimonial 8",
    "category": "testimonial",
    "description": "Testimonial layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "testimonial",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"testimonial-008\"><div class=\"surface\" style=\"padding:12px\"><div style=\"display:flex;gap:10px;align-items:center\"><span style=\"width:34px;height:34px;border-radius:999px;background:#6366f1;opacity:.25;display:block\"></span><div><div style=\"font-weight:700;font-size:12px\">Maya Rao</div><div class=\"muted\" style=\"font-size:11px\">Product Designer</div></div></div><p style=\"margin:10px 0 0;font-size:12px;line-height:1.5\">“This layout feels premium without becoming noisy.”</p></div><div style=\"display:flex;gap:5px\"><span style=\"width:10px;height:10px;border-radius:999px;background:#6366f1;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span></div></div>",
    "cssCode": "\n.testimonial-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.testimonial-008 * { box-sizing: border-box; }\n.testimonial-008 .muted { color: #64748b; }\n.testimonial-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.testimonial-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "testimonial-008"
  },
  {
    "id": "testimonial-009",
    "title": "Testimonial 9",
    "category": "testimonial",
    "description": "Testimonial layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "testimonial",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"testimonial-009\"><div class=\"surface\" style=\"padding:12px\"><div style=\"display:flex;gap:10px;align-items:center\"><span style=\"width:34px;height:34px;border-radius:999px;background:#10b981;opacity:.25;display:block\"></span><div><div style=\"font-weight:700;font-size:12px\">Maya Rao</div><div class=\"muted\" style=\"font-size:11px\">Product Designer</div></div></div><p style=\"margin:10px 0 0;font-size:12px;line-height:1.5\">“This layout feels premium without becoming noisy.”</p></div><div style=\"display:flex;gap:5px\"><span style=\"width:10px;height:10px;border-radius:999px;background:#10b981;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span></div></div>",
    "cssCode": "\n.testimonial-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.testimonial-009 * { box-sizing: border-box; }\n.testimonial-009 .muted { color: #64748b; }\n.testimonial-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.testimonial-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "testimonial-009"
  },
  {
    "id": "testimonial-010",
    "title": "Testimonial 10",
    "category": "testimonial",
    "description": "Testimonial layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "testimonial",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"testimonial-010\"><div class=\"surface\" style=\"padding:12px\"><div style=\"display:flex;gap:10px;align-items:center\"><span style=\"width:34px;height:34px;border-radius:999px;background:#f43f5e;opacity:.25;display:block\"></span><div><div style=\"font-weight:700;font-size:12px\">Maya Rao</div><div class=\"muted\" style=\"font-size:11px\">Product Designer</div></div></div><p style=\"margin:10px 0 0;font-size:12px;line-height:1.5\">“This layout feels premium without becoming noisy.”</p></div><div style=\"display:flex;gap:5px\"><span style=\"width:10px;height:10px;border-radius:999px;background:#f43f5e;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span></div></div>",
    "cssCode": "\n.testimonial-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.testimonial-010 * { box-sizing: border-box; }\n.testimonial-010 .muted { color: #64748b; }\n.testimonial-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.testimonial-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "testimonial-010"
  },
  {
    "id": "testimonial-011",
    "title": "Testimonial 11",
    "category": "testimonial",
    "description": "Testimonial layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "testimonial",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"testimonial-011\"><div class=\"surface\" style=\"padding:12px\"><div style=\"display:flex;gap:10px;align-items:center\"><span style=\"width:34px;height:34px;border-radius:999px;background:#f59e0b;opacity:.25;display:block\"></span><div><div style=\"font-weight:700;font-size:12px\">Maya Rao</div><div class=\"muted\" style=\"font-size:11px\">Product Designer</div></div></div><p style=\"margin:10px 0 0;font-size:12px;line-height:1.5\">“This layout feels premium without becoming noisy.”</p></div><div style=\"display:flex;gap:5px\"><span style=\"width:10px;height:10px;border-radius:999px;background:#f59e0b;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span>;opacity:.75;display:block\"></span></div></div>",
    "cssCode": "\n.testimonial-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.testimonial-011 * { box-sizing: border-box; }\n.testimonial-011 .muted { color: #64748b; }\n.testimonial-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.testimonial-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.testimonial-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "testimonial-011"
  },
  {
    "id": "pricing-001",
    "title": "Pricing 1",
    "category": "pricing",
    "description": "Pricing layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "pricing",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"pricing-001\"><div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px\"><div class=\"surface\" style=\"padding:12px\"><div style=\"font-weight:700;font-size:12px\">Starter</div><div style=\"margin-top:8px;font-size:22px;font-weight:800\">$19</div><div class=\"muted\" style=\"font-size:11px\">per month</div><div style=\"margin-top:12px;display:grid;gap:6px\"><span style=\"height:8px;border-radius:999px;background:#4f46e5;opacity:.14;display:block\"></span><span style=\"height:8px;border-radius:999px;background:#4f46e5;opacity:.14;display:block\"></span><span style=\"height:8px;border-radius:999px;background:#4f46e5;opacity:.14;display:block\"></span></div></div><div style=\"padding:12px;border-radius:16px;background:#0f172a;color:#ffffff;box-shadow:0 20px 28px -24px color-mix(in srgb, #0f172a 60%, transparent)\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><div style=\"font-weight:700;font-size:12px\">Pro</div><span style=\"font-size:10px;opacity:.78\">Popular</span></div><div style=\"margin-top:8px;font-size:22px;font-weight:800\">$49</div><div style=\"font-size:11px;opacity:.82\">best value</div></div></div></div>",
    "cssCode": "\n.pricing-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.pricing-001 * { box-sizing: border-box; }\n.pricing-001 .muted { color: #64748b; }\n.pricing-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.pricing-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "pricing-001"
  },
  {
    "id": "pricing-002",
    "title": "Pricing 2",
    "category": "pricing",
    "description": "Pricing layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "pricing",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"pricing-002\"><div class=\"surface\" style=\"padding:14px;display:grid;gap:12px\"><div style=\"display:flex;justify-content:space-between;align-items:flex-start\"><div><div style=\"font-size:12px;font-weight:700\">Scale plan</div><div style=\"margin-top:6px;font-size:24px;font-weight:800\">$89</div></div><span class=\"pill\">Annual</span></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:8px\"><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #c7d2fe\"><div class=\"muted\" style=\"font-size:10px\">Seats</div><div style=\"margin-top:6px;font-size:12px;font-weight:700\">Included</div></div><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #c7d2fe\"><div class=\"muted\" style=\"font-size:10px\">API</div><div style=\"margin-top:6px;font-size:12px;font-weight:700\">Included</div></div><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #c7d2fe\"><div class=\"muted\" style=\"font-size:10px\">Support</div><div style=\"margin-top:6px;font-size:12px;font-weight:700\">Included</div></div></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span class=\"ghost\">Compare</span><span class=\"primary\">Choose</span></div></div></div>",
    "cssCode": "\n.pricing-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.pricing-002 * { box-sizing: border-box; }\n.pricing-002 .muted { color: #64748b; }\n.pricing-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.pricing-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "pricing-002"
  },
  {
    "id": "pricing-003",
    "title": "Pricing 3",
    "category": "pricing",
    "description": "Pricing layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "pricing",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"pricing-003\" style=\"grid-template-columns:.95fr 1.05fr;gap:10px\"><div style=\"display:grid;gap:8px\"><strong style=\"font-size:18px;line-height:1.08\">Pricing that grows with your product</strong><span class=\"muted\" style=\"font-size:12px\">Simple tiers, sharp emphasis, easy scanning.</span><div style=\"display:flex;gap:8px\"><span class=\"primary\">Start free</span><span class=\"ghost\">Talk sales</span></div></div><div class=\"surface\" style=\"padding:12px;display:grid;gap:8px\"><div style=\"display:flex;justify-content:space-between\"><strong style=\"font-size:12px\">Enterprise</strong><span class=\"pill\">Custom</span></div><div style=\"height:10px;border-radius:999px;background:#10b981;opacity:.18\"></div><div style=\"height:10px;border-radius:999px;background:#10b981;opacity:.12\"></div><div style=\"height:10px;border-radius:999px;background:#10b981;opacity:.09\"></div></div></div>",
    "cssCode": "\n.pricing-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.pricing-003 * { box-sizing: border-box; }\n.pricing-003 .muted { color: #64748b; }\n.pricing-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.pricing-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "pricing-003"
  },
  {
    "id": "pricing-004",
    "title": "Pricing 4",
    "category": "pricing",
    "description": "Pricing layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "pricing",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"pricing-004\"><div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px\"><div class=\"surface\" style=\"padding:12px\"><div style=\"font-weight:700;font-size:12px\">Starter</div><div style=\"margin-top:8px;font-size:22px;font-weight:800\">$19</div><div class=\"muted\" style=\"font-size:11px\">per month</div><div style=\"margin-top:12px;display:grid;gap:6px\"><span style=\"height:8px;border-radius:999px;background:#f43f5e;opacity:.14;display:block\"></span><span style=\"height:8px;border-radius:999px;background:#f43f5e;opacity:.14;display:block\"></span><span style=\"height:8px;border-radius:999px;background:#f43f5e;opacity:.14;display:block\"></span></div></div><div style=\"padding:12px;border-radius:16px;background:#9f1239;color:#ffffff;box-shadow:0 20px 28px -24px color-mix(in srgb, #9f1239 60%, transparent)\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><div style=\"font-weight:700;font-size:12px\">Pro</div><span style=\"font-size:10px;opacity:.78\">Popular</span></div><div style=\"margin-top:8px;font-size:22px;font-weight:800\">$49</div><div style=\"font-size:11px;opacity:.82\">best value</div></div></div></div>",
    "cssCode": "\n.pricing-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.pricing-004 * { box-sizing: border-box; }\n.pricing-004 .muted { color: #64748b; }\n.pricing-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.pricing-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "pricing-004"
  },
  {
    "id": "pricing-005",
    "title": "Pricing 5",
    "category": "pricing",
    "description": "Pricing layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "pricing",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"pricing-005\"><div class=\"surface\" style=\"padding:14px;display:grid;gap:12px\"><div style=\"display:flex;justify-content:space-between;align-items:flex-start\"><div><div style=\"font-size:12px;font-weight:700\">Scale plan</div><div style=\"margin-top:6px;font-size:24px;font-weight:800\">$89</div></div><span class=\"pill\">Annual</span></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:8px\"><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #fde68a\"><div class=\"muted\" style=\"font-size:10px\">Seats</div><div style=\"margin-top:6px;font-size:12px;font-weight:700\">Included</div></div><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #fde68a\"><div class=\"muted\" style=\"font-size:10px\">API</div><div style=\"margin-top:6px;font-size:12px;font-weight:700\">Included</div></div><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #fde68a\"><div class=\"muted\" style=\"font-size:10px\">Support</div><div style=\"margin-top:6px;font-size:12px;font-weight:700\">Included</div></div></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span class=\"ghost\">Compare</span><span class=\"primary\">Choose</span></div></div></div>",
    "cssCode": "\n.pricing-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.pricing-005 * { box-sizing: border-box; }\n.pricing-005 .muted { color: #64748b; }\n.pricing-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.pricing-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "pricing-005"
  },
  {
    "id": "pricing-006",
    "title": "Pricing 6",
    "category": "pricing",
    "description": "Pricing layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "pricing",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"pricing-006\" style=\"grid-template-columns:.95fr 1.05fr;gap:10px\"><div style=\"display:grid;gap:8px\"><strong style=\"font-size:18px;line-height:1.08\">Pricing that grows with your product</strong><span class=\"muted\" style=\"font-size:12px\">Simple tiers, sharp emphasis, easy scanning.</span><div style=\"display:flex;gap:8px\"><span class=\"primary\">Start free</span><span class=\"ghost\">Talk sales</span></div></div><div class=\"surface\" style=\"padding:12px;display:grid;gap:8px\"><div style=\"display:flex;justify-content:space-between\"><strong style=\"font-size:12px\">Enterprise</strong><span class=\"pill\">Custom</span></div><div style=\"height:10px;border-radius:999px;background:#0ea5e9;opacity:.18\"></div><div style=\"height:10px;border-radius:999px;background:#0ea5e9;opacity:.12\"></div><div style=\"height:10px;border-radius:999px;background:#0ea5e9;opacity:.09\"></div></div></div>",
    "cssCode": "\n.pricing-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.pricing-006 * { box-sizing: border-box; }\n.pricing-006 .muted { color: #64748b; }\n.pricing-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.pricing-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "pricing-006"
  },
  {
    "id": "pricing-007",
    "title": "Pricing 7",
    "category": "pricing",
    "description": "Pricing layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "pricing",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"pricing-007\"><div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px\"><div class=\"surface\" style=\"padding:12px\"><div style=\"font-weight:700;font-size:12px\">Starter</div><div style=\"margin-top:8px;font-size:22px;font-weight:800\">$19</div><div class=\"muted\" style=\"font-size:11px\">per month</div><div style=\"margin-top:12px;display:grid;gap:6px\"><span style=\"height:8px;border-radius:999px;background:#4f46e5;opacity:.14;display:block\"></span><span style=\"height:8px;border-radius:999px;background:#4f46e5;opacity:.14;display:block\"></span><span style=\"height:8px;border-radius:999px;background:#4f46e5;opacity:.14;display:block\"></span></div></div><div style=\"padding:12px;border-radius:16px;background:#0f172a;color:#ffffff;box-shadow:0 20px 28px -24px color-mix(in srgb, #0f172a 60%, transparent)\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><div style=\"font-weight:700;font-size:12px\">Pro</div><span style=\"font-size:10px;opacity:.78\">Popular</span></div><div style=\"margin-top:8px;font-size:22px;font-weight:800\">$49</div><div style=\"font-size:11px;opacity:.82\">best value</div></div></div></div>",
    "cssCode": "\n.pricing-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.pricing-007 * { box-sizing: border-box; }\n.pricing-007 .muted { color: #64748b; }\n.pricing-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.pricing-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "pricing-007"
  },
  {
    "id": "pricing-008",
    "title": "Pricing 8",
    "category": "pricing",
    "description": "Pricing layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "pricing",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"pricing-008\"><div class=\"surface\" style=\"padding:14px;display:grid;gap:12px\"><div style=\"display:flex;justify-content:space-between;align-items:flex-start\"><div><div style=\"font-size:12px;font-weight:700\">Scale plan</div><div style=\"margin-top:6px;font-size:24px;font-weight:800\">$89</div></div><span class=\"pill\">Annual</span></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:8px\"><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #c7d2fe\"><div class=\"muted\" style=\"font-size:10px\">Seats</div><div style=\"margin-top:6px;font-size:12px;font-weight:700\">Included</div></div><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #c7d2fe\"><div class=\"muted\" style=\"font-size:10px\">API</div><div style=\"margin-top:6px;font-size:12px;font-weight:700\">Included</div></div><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #c7d2fe\"><div class=\"muted\" style=\"font-size:10px\">Support</div><div style=\"margin-top:6px;font-size:12px;font-weight:700\">Included</div></div></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span class=\"ghost\">Compare</span><span class=\"primary\">Choose</span></div></div></div>",
    "cssCode": "\n.pricing-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.pricing-008 * { box-sizing: border-box; }\n.pricing-008 .muted { color: #64748b; }\n.pricing-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.pricing-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "pricing-008"
  },
  {
    "id": "pricing-009",
    "title": "Pricing 9",
    "category": "pricing",
    "description": "Pricing layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "pricing",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"pricing-009\" style=\"grid-template-columns:.95fr 1.05fr;gap:10px\"><div style=\"display:grid;gap:8px\"><strong style=\"font-size:18px;line-height:1.08\">Pricing that grows with your product</strong><span class=\"muted\" style=\"font-size:12px\">Simple tiers, sharp emphasis, easy scanning.</span><div style=\"display:flex;gap:8px\"><span class=\"primary\">Start free</span><span class=\"ghost\">Talk sales</span></div></div><div class=\"surface\" style=\"padding:12px;display:grid;gap:8px\"><div style=\"display:flex;justify-content:space-between\"><strong style=\"font-size:12px\">Enterprise</strong><span class=\"pill\">Custom</span></div><div style=\"height:10px;border-radius:999px;background:#10b981;opacity:.18\"></div><div style=\"height:10px;border-radius:999px;background:#10b981;opacity:.12\"></div><div style=\"height:10px;border-radius:999px;background:#10b981;opacity:.09\"></div></div></div>",
    "cssCode": "\n.pricing-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.pricing-009 * { box-sizing: border-box; }\n.pricing-009 .muted { color: #64748b; }\n.pricing-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.pricing-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "pricing-009"
  },
  {
    "id": "pricing-010",
    "title": "Pricing 10",
    "category": "pricing",
    "description": "Pricing layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "pricing",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"pricing-010\"><div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px\"><div class=\"surface\" style=\"padding:12px\"><div style=\"font-weight:700;font-size:12px\">Starter</div><div style=\"margin-top:8px;font-size:22px;font-weight:800\">$19</div><div class=\"muted\" style=\"font-size:11px\">per month</div><div style=\"margin-top:12px;display:grid;gap:6px\"><span style=\"height:8px;border-radius:999px;background:#f43f5e;opacity:.14;display:block\"></span><span style=\"height:8px;border-radius:999px;background:#f43f5e;opacity:.14;display:block\"></span><span style=\"height:8px;border-radius:999px;background:#f43f5e;opacity:.14;display:block\"></span></div></div><div style=\"padding:12px;border-radius:16px;background:#9f1239;color:#ffffff;box-shadow:0 20px 28px -24px color-mix(in srgb, #9f1239 60%, transparent)\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><div style=\"font-weight:700;font-size:12px\">Pro</div><span style=\"font-size:10px;opacity:.78\">Popular</span></div><div style=\"margin-top:8px;font-size:22px;font-weight:800\">$49</div><div style=\"font-size:11px;opacity:.82\">best value</div></div></div></div>",
    "cssCode": "\n.pricing-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.pricing-010 * { box-sizing: border-box; }\n.pricing-010 .muted { color: #64748b; }\n.pricing-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.pricing-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "pricing-010"
  },
  {
    "id": "pricing-011",
    "title": "Pricing 11",
    "category": "pricing",
    "description": "Pricing layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "pricing",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"pricing-011\"><div class=\"surface\" style=\"padding:14px;display:grid;gap:12px\"><div style=\"display:flex;justify-content:space-between;align-items:flex-start\"><div><div style=\"font-size:12px;font-weight:700\">Scale plan</div><div style=\"margin-top:6px;font-size:24px;font-weight:800\">$89</div></div><span class=\"pill\">Annual</span></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:8px\"><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #fde68a\"><div class=\"muted\" style=\"font-size:10px\">Seats</div><div style=\"margin-top:6px;font-size:12px;font-weight:700\">Included</div></div><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #fde68a\"><div class=\"muted\" style=\"font-size:10px\">API</div><div style=\"margin-top:6px;font-size:12px;font-weight:700\">Included</div></div><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #fde68a\"><div class=\"muted\" style=\"font-size:10px\">Support</div><div style=\"margin-top:6px;font-size:12px;font-weight:700\">Included</div></div></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span class=\"ghost\">Compare</span><span class=\"primary\">Choose</span></div></div></div>",
    "cssCode": "\n.pricing-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.pricing-011 * { box-sizing: border-box; }\n.pricing-011 .muted { color: #64748b; }\n.pricing-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.pricing-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.pricing-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "pricing-011"
  },
  {
    "id": "faq-001",
    "title": "FAQ 1",
    "category": "faq",
    "description": "FAQ layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "faq",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"faq-001\"><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">How does billing work?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Can I cancel anytime?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Is there team access?</strong><span class=\"pill\">+</span></div></div>",
    "cssCode": "\n.faq-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.faq-001 * { box-sizing: border-box; }\n.faq-001 .muted { color: #64748b; }\n.faq-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.faq-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "faq-001"
  },
  {
    "id": "faq-002",
    "title": "FAQ 2",
    "category": "faq",
    "description": "FAQ layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "faq",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"faq-002\"><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">How does billing work?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Can I cancel anytime?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Is there team access?</strong><span class=\"pill\">+</span></div></div>",
    "cssCode": "\n.faq-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.faq-002 * { box-sizing: border-box; }\n.faq-002 .muted { color: #64748b; }\n.faq-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.faq-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "faq-002"
  },
  {
    "id": "faq-003",
    "title": "FAQ 3",
    "category": "faq",
    "description": "FAQ layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "faq",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"faq-003\"><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">How does billing work?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Can I cancel anytime?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Is there team access?</strong><span class=\"pill\">+</span></div></div>",
    "cssCode": "\n.faq-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.faq-003 * { box-sizing: border-box; }\n.faq-003 .muted { color: #64748b; }\n.faq-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.faq-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "faq-003"
  },
  {
    "id": "faq-004",
    "title": "FAQ 4",
    "category": "faq",
    "description": "FAQ layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "faq",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"faq-004\"><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">How does billing work?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Can I cancel anytime?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Is there team access?</strong><span class=\"pill\">+</span></div></div>",
    "cssCode": "\n.faq-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.faq-004 * { box-sizing: border-box; }\n.faq-004 .muted { color: #64748b; }\n.faq-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.faq-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "faq-004"
  },
  {
    "id": "faq-005",
    "title": "FAQ 5",
    "category": "faq",
    "description": "FAQ layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "faq",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"faq-005\"><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">How does billing work?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Can I cancel anytime?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Is there team access?</strong><span class=\"pill\">+</span></div></div>",
    "cssCode": "\n.faq-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.faq-005 * { box-sizing: border-box; }\n.faq-005 .muted { color: #64748b; }\n.faq-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.faq-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "faq-005"
  },
  {
    "id": "faq-006",
    "title": "FAQ 6",
    "category": "faq",
    "description": "FAQ layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "faq",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"faq-006\"><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">How does billing work?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Can I cancel anytime?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Is there team access?</strong><span class=\"pill\">+</span></div></div>",
    "cssCode": "\n.faq-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.faq-006 * { box-sizing: border-box; }\n.faq-006 .muted { color: #64748b; }\n.faq-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.faq-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "faq-006"
  },
  {
    "id": "faq-007",
    "title": "FAQ 7",
    "category": "faq",
    "description": "FAQ layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "faq",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"faq-007\"><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">How does billing work?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Can I cancel anytime?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Is there team access?</strong><span class=\"pill\">+</span></div></div>",
    "cssCode": "\n.faq-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.faq-007 * { box-sizing: border-box; }\n.faq-007 .muted { color: #64748b; }\n.faq-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.faq-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "faq-007"
  },
  {
    "id": "faq-008",
    "title": "FAQ 8",
    "category": "faq",
    "description": "FAQ layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "faq",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"faq-008\"><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">How does billing work?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Can I cancel anytime?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Is there team access?</strong><span class=\"pill\">+</span></div></div>",
    "cssCode": "\n.faq-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.faq-008 * { box-sizing: border-box; }\n.faq-008 .muted { color: #64748b; }\n.faq-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.faq-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "faq-008"
  },
  {
    "id": "faq-009",
    "title": "FAQ 9",
    "category": "faq",
    "description": "FAQ layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "faq",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"faq-009\"><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">How does billing work?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Can I cancel anytime?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Is there team access?</strong><span class=\"pill\">+</span></div></div>",
    "cssCode": "\n.faq-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.faq-009 * { box-sizing: border-box; }\n.faq-009 .muted { color: #64748b; }\n.faq-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.faq-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "faq-009"
  },
  {
    "id": "faq-010",
    "title": "FAQ 10",
    "category": "faq",
    "description": "FAQ layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "faq",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"faq-010\"><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">How does billing work?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Can I cancel anytime?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Is there team access?</strong><span class=\"pill\">+</span></div></div>",
    "cssCode": "\n.faq-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.faq-010 * { box-sizing: border-box; }\n.faq-010 .muted { color: #64748b; }\n.faq-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.faq-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "faq-010"
  },
  {
    "id": "faq-011",
    "title": "FAQ 11",
    "category": "faq",
    "description": "FAQ layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "faq",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"faq-011\"><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">How does billing work?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Can I cancel anytime?</strong><span class=\"pill\">+</span></div><div class=\"surface\" style=\"padding:10px 12px;display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:12px\">Is there team access?</strong><span class=\"pill\">+</span></div></div>",
    "cssCode": "\n.faq-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.faq-011 * { box-sizing: border-box; }\n.faq-011 .muted { color: #64748b; }\n.faq-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.faq-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.faq-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "faq-011"
  },
  {
    "id": "cta-001",
    "title": "CTA 1",
    "category": "cta",
    "description": "CTA layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "cta",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"cta-001\" style=\"background:#f8fafc\"><div style=\"display:flex;justify-content:space-between;align-items:center;gap:10px\"><div><div style=\"font-weight:800;font-size:18px\">Ready to launch?</div><div class=\"muted\" style=\"font-size:12px;margin-top:4px\">Turn traffic into signups with a focused CTA.</div></div><span class=\"primary\">Start free</span></div></div>",
    "cssCode": "\n.cta-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.cta-001 * { box-sizing: border-box; }\n.cta-001 .muted { color: #64748b; }\n.cta-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.cta-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "cta-001"
  },
  {
    "id": "cta-002",
    "title": "CTA 2",
    "category": "cta",
    "description": "CTA layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "cta",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"cta-002\" style=\"background:#eef2ff\"><div style=\"display:flex;justify-content:space-between;align-items:center;gap:10px\"><div><div style=\"font-weight:800;font-size:18px\">Ready to launch?</div><div class=\"muted\" style=\"font-size:12px;margin-top:4px\">Turn traffic into signups with a focused CTA.</div></div><span class=\"primary\">Start free</span></div></div>",
    "cssCode": "\n.cta-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.cta-002 * { box-sizing: border-box; }\n.cta-002 .muted { color: #64748b; }\n.cta-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.cta-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "cta-002"
  },
  {
    "id": "cta-003",
    "title": "CTA 3",
    "category": "cta",
    "description": "CTA layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "cta",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"cta-003\" style=\"background:#ecfdf5\"><div style=\"display:flex;justify-content:space-between;align-items:center;gap:10px\"><div><div style=\"font-weight:800;font-size:18px\">Ready to launch?</div><div class=\"muted\" style=\"font-size:12px;margin-top:4px\">Turn traffic into signups with a focused CTA.</div></div><span class=\"primary\">Start free</span></div></div>",
    "cssCode": "\n.cta-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.cta-003 * { box-sizing: border-box; }\n.cta-003 .muted { color: #64748b; }\n.cta-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.cta-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "cta-003"
  },
  {
    "id": "cta-004",
    "title": "CTA 4",
    "category": "cta",
    "description": "CTA layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "cta",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"cta-004\" style=\"background:#fff1f2\"><div style=\"display:flex;justify-content:space-between;align-items:center;gap:10px\"><div><div style=\"font-weight:800;font-size:18px\">Ready to launch?</div><div class=\"muted\" style=\"font-size:12px;margin-top:4px\">Turn traffic into signups with a focused CTA.</div></div><span class=\"primary\">Start free</span></div></div>",
    "cssCode": "\n.cta-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.cta-004 * { box-sizing: border-box; }\n.cta-004 .muted { color: #64748b; }\n.cta-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.cta-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "cta-004"
  },
  {
    "id": "cta-005",
    "title": "CTA 5",
    "category": "cta",
    "description": "CTA layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "cta",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"cta-005\" style=\"background:#fffbeb\"><div style=\"display:flex;justify-content:space-between;align-items:center;gap:10px\"><div><div style=\"font-weight:800;font-size:18px\">Ready to launch?</div><div class=\"muted\" style=\"font-size:12px;margin-top:4px\">Turn traffic into signups with a focused CTA.</div></div><span class=\"primary\">Start free</span></div></div>",
    "cssCode": "\n.cta-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.cta-005 * { box-sizing: border-box; }\n.cta-005 .muted { color: #64748b; }\n.cta-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.cta-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "cta-005"
  },
  {
    "id": "cta-006",
    "title": "CTA 6",
    "category": "cta",
    "description": "CTA layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "cta",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"cta-006\" style=\"background:#f0f9ff\"><div style=\"display:flex;justify-content:space-between;align-items:center;gap:10px\"><div><div style=\"font-weight:800;font-size:18px\">Ready to launch?</div><div class=\"muted\" style=\"font-size:12px;margin-top:4px\">Turn traffic into signups with a focused CTA.</div></div><span class=\"primary\">Start free</span></div></div>",
    "cssCode": "\n.cta-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.cta-006 * { box-sizing: border-box; }\n.cta-006 .muted { color: #64748b; }\n.cta-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.cta-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "cta-006"
  },
  {
    "id": "cta-007",
    "title": "CTA 7",
    "category": "cta",
    "description": "CTA layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "cta",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"cta-007\" style=\"background:#f8fafc\"><div style=\"display:flex;justify-content:space-between;align-items:center;gap:10px\"><div><div style=\"font-weight:800;font-size:18px\">Ready to launch?</div><div class=\"muted\" style=\"font-size:12px;margin-top:4px\">Turn traffic into signups with a focused CTA.</div></div><span class=\"primary\">Start free</span></div></div>",
    "cssCode": "\n.cta-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.cta-007 * { box-sizing: border-box; }\n.cta-007 .muted { color: #64748b; }\n.cta-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.cta-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "cta-007"
  },
  {
    "id": "cta-008",
    "title": "CTA 8",
    "category": "cta",
    "description": "CTA layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "cta",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"cta-008\" style=\"background:#eef2ff\"><div style=\"display:flex;justify-content:space-between;align-items:center;gap:10px\"><div><div style=\"font-weight:800;font-size:18px\">Ready to launch?</div><div class=\"muted\" style=\"font-size:12px;margin-top:4px\">Turn traffic into signups with a focused CTA.</div></div><span class=\"primary\">Start free</span></div></div>",
    "cssCode": "\n.cta-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.cta-008 * { box-sizing: border-box; }\n.cta-008 .muted { color: #64748b; }\n.cta-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.cta-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "cta-008"
  },
  {
    "id": "cta-009",
    "title": "CTA 9",
    "category": "cta",
    "description": "CTA layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "cta",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"cta-009\" style=\"background:#ecfdf5\"><div style=\"display:flex;justify-content:space-between;align-items:center;gap:10px\"><div><div style=\"font-weight:800;font-size:18px\">Ready to launch?</div><div class=\"muted\" style=\"font-size:12px;margin-top:4px\">Turn traffic into signups with a focused CTA.</div></div><span class=\"primary\">Start free</span></div></div>",
    "cssCode": "\n.cta-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.cta-009 * { box-sizing: border-box; }\n.cta-009 .muted { color: #64748b; }\n.cta-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.cta-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "cta-009"
  },
  {
    "id": "cta-010",
    "title": "CTA 10",
    "category": "cta",
    "description": "CTA layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "cta",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"cta-010\" style=\"background:#fff1f2\"><div style=\"display:flex;justify-content:space-between;align-items:center;gap:10px\"><div><div style=\"font-weight:800;font-size:18px\">Ready to launch?</div><div class=\"muted\" style=\"font-size:12px;margin-top:4px\">Turn traffic into signups with a focused CTA.</div></div><span class=\"primary\">Start free</span></div></div>",
    "cssCode": "\n.cta-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.cta-010 * { box-sizing: border-box; }\n.cta-010 .muted { color: #64748b; }\n.cta-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.cta-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "cta-010"
  },
  {
    "id": "cta-011",
    "title": "CTA 11",
    "category": "cta",
    "description": "CTA layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "cta",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"cta-011\" style=\"background:#fffbeb\"><div style=\"display:flex;justify-content:space-between;align-items:center;gap:10px\"><div><div style=\"font-weight:800;font-size:18px\">Ready to launch?</div><div class=\"muted\" style=\"font-size:12px;margin-top:4px\">Turn traffic into signups with a focused CTA.</div></div><span class=\"primary\">Start free</span></div></div>",
    "cssCode": "\n.cta-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.cta-011 * { box-sizing: border-box; }\n.cta-011 .muted { color: #64748b; }\n.cta-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.cta-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.cta-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "cta-011"
  },
  {
    "id": "stats-001",
    "title": "Stats 1",
    "category": "stats",
    "description": "Stats layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "stats",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"stats-001\"><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">42K</div><div class=\"muted\" style=\"font-size:11px\">Visits</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">12%</div><div class=\"muted\" style=\"font-size:11px\">CVR</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">4.9</div><div class=\"muted\" style=\"font-size:11px\">Rating</div></div></div></div>",
    "cssCode": "\n.stats-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.stats-001 * { box-sizing: border-box; }\n.stats-001 .muted { color: #64748b; }\n.stats-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.stats-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "stats-001"
  },
  {
    "id": "stats-002",
    "title": "Stats 2",
    "category": "stats",
    "description": "Stats layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "stats",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"stats-002\"><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">42K</div><div class=\"muted\" style=\"font-size:11px\">Visits</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">12%</div><div class=\"muted\" style=\"font-size:11px\">CVR</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">4.9</div><div class=\"muted\" style=\"font-size:11px\">Rating</div></div></div></div>",
    "cssCode": "\n.stats-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.stats-002 * { box-sizing: border-box; }\n.stats-002 .muted { color: #64748b; }\n.stats-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.stats-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "stats-002"
  },
  {
    "id": "stats-003",
    "title": "Stats 3",
    "category": "stats",
    "description": "Stats layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "stats",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"stats-003\"><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">42K</div><div class=\"muted\" style=\"font-size:11px\">Visits</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">12%</div><div class=\"muted\" style=\"font-size:11px\">CVR</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">4.9</div><div class=\"muted\" style=\"font-size:11px\">Rating</div></div></div></div>",
    "cssCode": "\n.stats-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.stats-003 * { box-sizing: border-box; }\n.stats-003 .muted { color: #64748b; }\n.stats-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.stats-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "stats-003"
  },
  {
    "id": "stats-004",
    "title": "Stats 4",
    "category": "stats",
    "description": "Stats layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "stats",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"stats-004\"><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">42K</div><div class=\"muted\" style=\"font-size:11px\">Visits</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">12%</div><div class=\"muted\" style=\"font-size:11px\">CVR</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">4.9</div><div class=\"muted\" style=\"font-size:11px\">Rating</div></div></div></div>",
    "cssCode": "\n.stats-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.stats-004 * { box-sizing: border-box; }\n.stats-004 .muted { color: #64748b; }\n.stats-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.stats-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "stats-004"
  },
  {
    "id": "stats-005",
    "title": "Stats 5",
    "category": "stats",
    "description": "Stats layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "stats",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"stats-005\"><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">42K</div><div class=\"muted\" style=\"font-size:11px\">Visits</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">12%</div><div class=\"muted\" style=\"font-size:11px\">CVR</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">4.9</div><div class=\"muted\" style=\"font-size:11px\">Rating</div></div></div></div>",
    "cssCode": "\n.stats-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.stats-005 * { box-sizing: border-box; }\n.stats-005 .muted { color: #64748b; }\n.stats-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.stats-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "stats-005"
  },
  {
    "id": "stats-006",
    "title": "Stats 6",
    "category": "stats",
    "description": "Stats layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "stats",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"stats-006\"><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">42K</div><div class=\"muted\" style=\"font-size:11px\">Visits</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">12%</div><div class=\"muted\" style=\"font-size:11px\">CVR</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">4.9</div><div class=\"muted\" style=\"font-size:11px\">Rating</div></div></div></div>",
    "cssCode": "\n.stats-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.stats-006 * { box-sizing: border-box; }\n.stats-006 .muted { color: #64748b; }\n.stats-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.stats-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "stats-006"
  },
  {
    "id": "stats-007",
    "title": "Stats 7",
    "category": "stats",
    "description": "Stats layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "stats",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"stats-007\"><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">42K</div><div class=\"muted\" style=\"font-size:11px\">Visits</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">12%</div><div class=\"muted\" style=\"font-size:11px\">CVR</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">4.9</div><div class=\"muted\" style=\"font-size:11px\">Rating</div></div></div></div>",
    "cssCode": "\n.stats-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.stats-007 * { box-sizing: border-box; }\n.stats-007 .muted { color: #64748b; }\n.stats-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.stats-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "stats-007"
  },
  {
    "id": "stats-008",
    "title": "Stats 8",
    "category": "stats",
    "description": "Stats layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "stats",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"stats-008\"><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">42K</div><div class=\"muted\" style=\"font-size:11px\">Visits</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">12%</div><div class=\"muted\" style=\"font-size:11px\">CVR</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">4.9</div><div class=\"muted\" style=\"font-size:11px\">Rating</div></div></div></div>",
    "cssCode": "\n.stats-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.stats-008 * { box-sizing: border-box; }\n.stats-008 .muted { color: #64748b; }\n.stats-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.stats-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "stats-008"
  },
  {
    "id": "stats-009",
    "title": "Stats 9",
    "category": "stats",
    "description": "Stats layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "stats",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"stats-009\"><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">42K</div><div class=\"muted\" style=\"font-size:11px\">Visits</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">12%</div><div class=\"muted\" style=\"font-size:11px\">CVR</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">4.9</div><div class=\"muted\" style=\"font-size:11px\">Rating</div></div></div></div>",
    "cssCode": "\n.stats-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.stats-009 * { box-sizing: border-box; }\n.stats-009 .muted { color: #64748b; }\n.stats-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.stats-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "stats-009"
  },
  {
    "id": "stats-010",
    "title": "Stats 10",
    "category": "stats",
    "description": "Stats layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "stats",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"stats-010\"><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">42K</div><div class=\"muted\" style=\"font-size:11px\">Visits</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">12%</div><div class=\"muted\" style=\"font-size:11px\">CVR</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">4.9</div><div class=\"muted\" style=\"font-size:11px\">Rating</div></div></div></div>",
    "cssCode": "\n.stats-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.stats-010 * { box-sizing: border-box; }\n.stats-010 .muted { color: #64748b; }\n.stats-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.stats-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "stats-010"
  },
  {
    "id": "stats-011",
    "title": "Stats 11",
    "category": "stats",
    "description": "Stats layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "stats",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"stats-011\"><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">42K</div><div class=\"muted\" style=\"font-size:11px\">Visits</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">12%</div><div class=\"muted\" style=\"font-size:11px\">CVR</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:20px;font-weight:800\">4.9</div><div class=\"muted\" style=\"font-size:11px\">Rating</div></div></div></div>",
    "cssCode": "\n.stats-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.stats-011 * { box-sizing: border-box; }\n.stats-011 .muted { color: #64748b; }\n.stats-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.stats-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.stats-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "stats-011"
  },
  {
    "id": "footer-001",
    "title": "Footer 1",
    "category": "footer",
    "description": "Footer layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "footer",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"footer-001\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong>Brandverse</strong><span class=\"muted\" style=\"font-size:12px\">Built for modern products</span></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:12px\"><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Product</span><span>Pricing</span><span>Docs</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Company</span><span>About</span><span>Careers</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Social</span><span>X</span><span>GitHub</span></div></div></div>",
    "cssCode": "\n.footer-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.footer-001 * { box-sizing: border-box; }\n.footer-001 .muted { color: #64748b; }\n.footer-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.footer-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "footer-001"
  },
  {
    "id": "footer-002",
    "title": "Footer 2",
    "category": "footer",
    "description": "Footer layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "footer",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"footer-002\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong>Brandverse</strong><span class=\"muted\" style=\"font-size:12px\">Built for modern products</span></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:12px\"><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Product</span><span>Pricing</span><span>Docs</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Company</span><span>About</span><span>Careers</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Social</span><span>X</span><span>GitHub</span></div></div></div>",
    "cssCode": "\n.footer-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.footer-002 * { box-sizing: border-box; }\n.footer-002 .muted { color: #64748b; }\n.footer-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.footer-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "footer-002"
  },
  {
    "id": "footer-003",
    "title": "Footer 3",
    "category": "footer",
    "description": "Footer layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "footer",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"footer-003\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong>Brandverse</strong><span class=\"muted\" style=\"font-size:12px\">Built for modern products</span></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:12px\"><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Product</span><span>Pricing</span><span>Docs</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Company</span><span>About</span><span>Careers</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Social</span><span>X</span><span>GitHub</span></div></div></div>",
    "cssCode": "\n.footer-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.footer-003 * { box-sizing: border-box; }\n.footer-003 .muted { color: #64748b; }\n.footer-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.footer-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "footer-003"
  },
  {
    "id": "footer-004",
    "title": "Footer 4",
    "category": "footer",
    "description": "Footer layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "footer",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"footer-004\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong>Brandverse</strong><span class=\"muted\" style=\"font-size:12px\">Built for modern products</span></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:12px\"><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Product</span><span>Pricing</span><span>Docs</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Company</span><span>About</span><span>Careers</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Social</span><span>X</span><span>GitHub</span></div></div></div>",
    "cssCode": "\n.footer-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.footer-004 * { box-sizing: border-box; }\n.footer-004 .muted { color: #64748b; }\n.footer-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.footer-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "footer-004"
  },
  {
    "id": "footer-005",
    "title": "Footer 5",
    "category": "footer",
    "description": "Footer layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "footer",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"footer-005\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong>Brandverse</strong><span class=\"muted\" style=\"font-size:12px\">Built for modern products</span></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:12px\"><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Product</span><span>Pricing</span><span>Docs</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Company</span><span>About</span><span>Careers</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Social</span><span>X</span><span>GitHub</span></div></div></div>",
    "cssCode": "\n.footer-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.footer-005 * { box-sizing: border-box; }\n.footer-005 .muted { color: #64748b; }\n.footer-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.footer-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "footer-005"
  },
  {
    "id": "footer-006",
    "title": "Footer 6",
    "category": "footer",
    "description": "Footer layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "footer",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"footer-006\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong>Brandverse</strong><span class=\"muted\" style=\"font-size:12px\">Built for modern products</span></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:12px\"><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Product</span><span>Pricing</span><span>Docs</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Company</span><span>About</span><span>Careers</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Social</span><span>X</span><span>GitHub</span></div></div></div>",
    "cssCode": "\n.footer-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.footer-006 * { box-sizing: border-box; }\n.footer-006 .muted { color: #64748b; }\n.footer-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.footer-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "footer-006"
  },
  {
    "id": "footer-007",
    "title": "Footer 7",
    "category": "footer",
    "description": "Footer layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "footer",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"footer-007\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong>Brandverse</strong><span class=\"muted\" style=\"font-size:12px\">Built for modern products</span></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:12px\"><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Product</span><span>Pricing</span><span>Docs</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Company</span><span>About</span><span>Careers</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Social</span><span>X</span><span>GitHub</span></div></div></div>",
    "cssCode": "\n.footer-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.footer-007 * { box-sizing: border-box; }\n.footer-007 .muted { color: #64748b; }\n.footer-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.footer-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "footer-007"
  },
  {
    "id": "footer-008",
    "title": "Footer 8",
    "category": "footer",
    "description": "Footer layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "footer",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"footer-008\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong>Brandverse</strong><span class=\"muted\" style=\"font-size:12px\">Built for modern products</span></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:12px\"><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Product</span><span>Pricing</span><span>Docs</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Company</span><span>About</span><span>Careers</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Social</span><span>X</span><span>GitHub</span></div></div></div>",
    "cssCode": "\n.footer-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.footer-008 * { box-sizing: border-box; }\n.footer-008 .muted { color: #64748b; }\n.footer-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.footer-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "footer-008"
  },
  {
    "id": "footer-009",
    "title": "Footer 9",
    "category": "footer",
    "description": "Footer layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "footer",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"footer-009\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong>Brandverse</strong><span class=\"muted\" style=\"font-size:12px\">Built for modern products</span></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:12px\"><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Product</span><span>Pricing</span><span>Docs</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Company</span><span>About</span><span>Careers</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Social</span><span>X</span><span>GitHub</span></div></div></div>",
    "cssCode": "\n.footer-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.footer-009 * { box-sizing: border-box; }\n.footer-009 .muted { color: #64748b; }\n.footer-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.footer-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "footer-009"
  },
  {
    "id": "footer-010",
    "title": "Footer 10",
    "category": "footer",
    "description": "Footer layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "footer",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"footer-010\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong>Brandverse</strong><span class=\"muted\" style=\"font-size:12px\">Built for modern products</span></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:12px\"><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Product</span><span>Pricing</span><span>Docs</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Company</span><span>About</span><span>Careers</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Social</span><span>X</span><span>GitHub</span></div></div></div>",
    "cssCode": "\n.footer-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.footer-010 * { box-sizing: border-box; }\n.footer-010 .muted { color: #64748b; }\n.footer-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.footer-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "footer-010"
  },
  {
    "id": "footer-011",
    "title": "Footer 11",
    "category": "footer",
    "description": "Footer layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "footer",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"footer-011\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong>Brandverse</strong><span class=\"muted\" style=\"font-size:12px\">Built for modern products</span></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:12px\"><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Product</span><span>Pricing</span><span>Docs</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Company</span><span>About</span><span>Careers</span></div><div class=\"muted\" style=\"font-size:12px;display:grid;gap:6px\"><span>Social</span><span>X</span><span>GitHub</span></div></div></div>",
    "cssCode": "\n.footer-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.footer-011 * { box-sizing: border-box; }\n.footer-011 .muted { color: #64748b; }\n.footer-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.footer-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.footer-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "footer-011"
  },
  {
    "id": "card-001",
    "title": "Card 1",
    "category": "card",
    "description": "Card layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "card",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"card-001\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"height:60px;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb, #4f46e5 20%, white),color-mix(in srgb, #0f172a 16%, white));border:1px solid #cbd5e1\"></div><div style=\"font-weight:800;font-size:14px\">Modern content card</div><div class=\"muted\" style=\"font-size:12px\">Balanced media, copy and action.</div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span class=\"pill\">Featured</span><span class=\"primary\">Open</span></div></div></div>",
    "cssCode": "\n.card-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.card-001 * { box-sizing: border-box; }\n.card-001 .muted { color: #64748b; }\n.card-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.card-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "card-001"
  },
  {
    "id": "card-002",
    "title": "Card 2",
    "category": "card",
    "description": "Card layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "card",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"card-002\" style=\"grid-template-columns:.92fr 1.08fr;gap:10px\"><div class=\"surface\" style=\"min-height:138px;background:linear-gradient(160deg,color-mix(in srgb, #6366f1 22%, white),#fff);display:grid;place-items:end;padding:12px\"><span class=\"pill\">New</span></div><div style=\"display:grid;gap:8px;align-content:center\"><strong style=\"font-size:16px\">Editorial product card</strong><span class=\"muted\" style=\"font-size:12px\">Image-led layout with clear hierarchy and action.</span><div style=\"display:flex;gap:8px\"><span class=\"primary\">Read more</span><span class=\"ghost\">Save</span></div></div></div>",
    "cssCode": "\n.card-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.card-002 * { box-sizing: border-box; }\n.card-002 .muted { color: #64748b; }\n.card-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.card-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "card-002"
  },
  {
    "id": "card-003",
    "title": "Card 3",
    "category": "card",
    "description": "Card layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "card",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"card-003\"><div class=\"surface\" style=\"padding:14px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><span class=\"pill\">Collection</span><span style=\"width:28px;height:28px;border-radius:10px;background:#10b981;opacity:.2\"></span></div><strong style=\"font-size:15px;line-height:1.2\">Compact profile card with premium spacing</strong><div class=\"muted\" style=\"font-size:12px;line-height:1.55\">Useful for content, product highlights, and saved items.</div></div></div>",
    "cssCode": "\n.card-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.card-003 * { box-sizing: border-box; }\n.card-003 .muted { color: #64748b; }\n.card-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.card-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "card-003"
  },
  {
    "id": "card-004",
    "title": "Card 4",
    "category": "card",
    "description": "Card layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "card",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"card-004\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"height:60px;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb, #f43f5e 20%, white),color-mix(in srgb, #9f1239 16%, white));border:1px solid #fecdd3\"></div><div style=\"font-weight:800;font-size:14px\">Modern content card</div><div class=\"muted\" style=\"font-size:12px\">Balanced media, copy and action.</div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span class=\"pill\">Featured</span><span class=\"primary\">Open</span></div></div></div>",
    "cssCode": "\n.card-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.card-004 * { box-sizing: border-box; }\n.card-004 .muted { color: #64748b; }\n.card-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.card-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "card-004"
  },
  {
    "id": "card-005",
    "title": "Card 5",
    "category": "card",
    "description": "Card layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "card",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"card-005\" style=\"grid-template-columns:.92fr 1.08fr;gap:10px\"><div class=\"surface\" style=\"min-height:138px;background:linear-gradient(160deg,color-mix(in srgb, #f59e0b 22%, white),#fff);display:grid;place-items:end;padding:12px\"><span class=\"pill\">New</span></div><div style=\"display:grid;gap:8px;align-content:center\"><strong style=\"font-size:16px\">Editorial product card</strong><span class=\"muted\" style=\"font-size:12px\">Image-led layout with clear hierarchy and action.</span><div style=\"display:flex;gap:8px\"><span class=\"primary\">Read more</span><span class=\"ghost\">Save</span></div></div></div>",
    "cssCode": "\n.card-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.card-005 * { box-sizing: border-box; }\n.card-005 .muted { color: #64748b; }\n.card-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.card-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "card-005"
  },
  {
    "id": "card-006",
    "title": "Card 6",
    "category": "card",
    "description": "Card layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "card",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"card-006\"><div class=\"surface\" style=\"padding:14px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><span class=\"pill\">Collection</span><span style=\"width:28px;height:28px;border-radius:10px;background:#0ea5e9;opacity:.2\"></span></div><strong style=\"font-size:15px;line-height:1.2\">Compact profile card with premium spacing</strong><div class=\"muted\" style=\"font-size:12px;line-height:1.55\">Useful for content, product highlights, and saved items.</div></div></div>",
    "cssCode": "\n.card-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.card-006 * { box-sizing: border-box; }\n.card-006 .muted { color: #64748b; }\n.card-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.card-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "card-006"
  },
  {
    "id": "card-007",
    "title": "Card 7",
    "category": "card",
    "description": "Card layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "card",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"card-007\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"height:60px;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb, #4f46e5 20%, white),color-mix(in srgb, #0f172a 16%, white));border:1px solid #cbd5e1\"></div><div style=\"font-weight:800;font-size:14px\">Modern content card</div><div class=\"muted\" style=\"font-size:12px\">Balanced media, copy and action.</div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span class=\"pill\">Featured</span><span class=\"primary\">Open</span></div></div></div>",
    "cssCode": "\n.card-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.card-007 * { box-sizing: border-box; }\n.card-007 .muted { color: #64748b; }\n.card-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.card-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "card-007"
  },
  {
    "id": "card-008",
    "title": "Card 8",
    "category": "card",
    "description": "Card layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "card",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"card-008\" style=\"grid-template-columns:.92fr 1.08fr;gap:10px\"><div class=\"surface\" style=\"min-height:138px;background:linear-gradient(160deg,color-mix(in srgb, #6366f1 22%, white),#fff);display:grid;place-items:end;padding:12px\"><span class=\"pill\">New</span></div><div style=\"display:grid;gap:8px;align-content:center\"><strong style=\"font-size:16px\">Editorial product card</strong><span class=\"muted\" style=\"font-size:12px\">Image-led layout with clear hierarchy and action.</span><div style=\"display:flex;gap:8px\"><span class=\"primary\">Read more</span><span class=\"ghost\">Save</span></div></div></div>",
    "cssCode": "\n.card-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.card-008 * { box-sizing: border-box; }\n.card-008 .muted { color: #64748b; }\n.card-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.card-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "card-008"
  },
  {
    "id": "card-009",
    "title": "Card 9",
    "category": "card",
    "description": "Card layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "card",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"card-009\"><div class=\"surface\" style=\"padding:14px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><span class=\"pill\">Collection</span><span style=\"width:28px;height:28px;border-radius:10px;background:#10b981;opacity:.2\"></span></div><strong style=\"font-size:15px;line-height:1.2\">Compact profile card with premium spacing</strong><div class=\"muted\" style=\"font-size:12px;line-height:1.55\">Useful for content, product highlights, and saved items.</div></div></div>",
    "cssCode": "\n.card-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.card-009 * { box-sizing: border-box; }\n.card-009 .muted { color: #64748b; }\n.card-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.card-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "card-009"
  },
  {
    "id": "card-010",
    "title": "Card 10",
    "category": "card",
    "description": "Card layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "card",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"card-010\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"height:60px;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb, #f43f5e 20%, white),color-mix(in srgb, #9f1239 16%, white));border:1px solid #fecdd3\"></div><div style=\"font-weight:800;font-size:14px\">Modern content card</div><div class=\"muted\" style=\"font-size:12px\">Balanced media, copy and action.</div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span class=\"pill\">Featured</span><span class=\"primary\">Open</span></div></div></div>",
    "cssCode": "\n.card-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.card-010 * { box-sizing: border-box; }\n.card-010 .muted { color: #64748b; }\n.card-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.card-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "card-010"
  },
  {
    "id": "card-011",
    "title": "Card 11",
    "category": "card",
    "description": "Card layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "card",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"card-011\" style=\"grid-template-columns:.92fr 1.08fr;gap:10px\"><div class=\"surface\" style=\"min-height:138px;background:linear-gradient(160deg,color-mix(in srgb, #f59e0b 22%, white),#fff);display:grid;place-items:end;padding:12px\"><span class=\"pill\">New</span></div><div style=\"display:grid;gap:8px;align-content:center\"><strong style=\"font-size:16px\">Editorial product card</strong><span class=\"muted\" style=\"font-size:12px\">Image-led layout with clear hierarchy and action.</span><div style=\"display:flex;gap:8px\"><span class=\"primary\">Read more</span><span class=\"ghost\">Save</span></div></div></div>",
    "cssCode": "\n.card-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.card-011 * { box-sizing: border-box; }\n.card-011 .muted { color: #64748b; }\n.card-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.card-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.card-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "card-011"
  },
  {
    "id": "form-001",
    "title": "Form 1",
    "category": "form",
    "description": "Form layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "form",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"form-001\"><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Email</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #cbd5e1;display:flex;align-items:center;padding:0 10px;font-size:12px;color:#94a3b8\">hello@brand.com</div></div><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Password</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #cbd5e1;display:flex;align-items:center;padding:0 10px;font-size:12px;color:#94a3b8\">••••••••</div></div><div style=\"display:flex;justify-content:flex-end\"><span class=\"primary\">Submit</span></div></div>",
    "cssCode": "\n.form-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.form-001 * { box-sizing: border-box; }\n.form-001 .muted { color: #64748b; }\n.form-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.form-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "form-001"
  },
  {
    "id": "form-002",
    "title": "Form 2",
    "category": "form",
    "description": "Form layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "form",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"form-002\"><div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">First name</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #c7d2fe;display:flex;align-items:center;padding:0 10px;font-size:12px\">Maya</div></div><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Team size</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #c7d2fe;display:flex;align-items:center;padding:0 10px;font-size:12px\">11-50</div></div></div><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Message</div><div style=\"margin-top:6px;height:48px;border-radius:10px;background:#fff;border:1px solid #c7d2fe;padding:10px;font-size:12px;color:#94a3b8\">Tell us about your project</div></div></div>",
    "cssCode": "\n.form-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.form-002 * { box-sizing: border-box; }\n.form-002 .muted { color: #64748b; }\n.form-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.form-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "form-002"
  },
  {
    "id": "form-003",
    "title": "Form 3",
    "category": "form",
    "description": "Form layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "form",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"form-003\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><strong style=\"font-size:14px\">Join the beta</strong><div style=\"height:36px;border-radius:12px;background:#fff;border:1px solid #a7f3d0;display:flex;align-items:center;padding:0 12px;font-size:12px;color:#94a3b8\">Work email</div><div style=\"display:flex;gap:8px\"><span class=\"primary\">Request invite</span><span class=\"ghost\">Privacy</span></div></div></div>",
    "cssCode": "\n.form-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.form-003 * { box-sizing: border-box; }\n.form-003 .muted { color: #64748b; }\n.form-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.form-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "form-003"
  },
  {
    "id": "form-004",
    "title": "Form 4",
    "category": "form",
    "description": "Form layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "form",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"form-004\"><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Email</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #fecdd3;display:flex;align-items:center;padding:0 10px;font-size:12px;color:#94a3b8\">hello@brand.com</div></div><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Password</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #fecdd3;display:flex;align-items:center;padding:0 10px;font-size:12px;color:#94a3b8\">••••••••</div></div><div style=\"display:flex;justify-content:flex-end\"><span class=\"primary\">Submit</span></div></div>",
    "cssCode": "\n.form-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.form-004 * { box-sizing: border-box; }\n.form-004 .muted { color: #64748b; }\n.form-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.form-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "form-004"
  },
  {
    "id": "form-005",
    "title": "Form 5",
    "category": "form",
    "description": "Form layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "form",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"form-005\"><div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">First name</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #fde68a;display:flex;align-items:center;padding:0 10px;font-size:12px\">Maya</div></div><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Team size</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #fde68a;display:flex;align-items:center;padding:0 10px;font-size:12px\">11-50</div></div></div><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Message</div><div style=\"margin-top:6px;height:48px;border-radius:10px;background:#fff;border:1px solid #fde68a;padding:10px;font-size:12px;color:#94a3b8\">Tell us about your project</div></div></div>",
    "cssCode": "\n.form-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.form-005 * { box-sizing: border-box; }\n.form-005 .muted { color: #64748b; }\n.form-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.form-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "form-005"
  },
  {
    "id": "form-006",
    "title": "Form 6",
    "category": "form",
    "description": "Form layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "form",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"form-006\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><strong style=\"font-size:14px\">Join the beta</strong><div style=\"height:36px;border-radius:12px;background:#fff;border:1px solid #bae6fd;display:flex;align-items:center;padding:0 12px;font-size:12px;color:#94a3b8\">Work email</div><div style=\"display:flex;gap:8px\"><span class=\"primary\">Request invite</span><span class=\"ghost\">Privacy</span></div></div></div>",
    "cssCode": "\n.form-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.form-006 * { box-sizing: border-box; }\n.form-006 .muted { color: #64748b; }\n.form-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.form-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "form-006"
  },
  {
    "id": "form-007",
    "title": "Form 7",
    "category": "form",
    "description": "Form layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "form",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"form-007\"><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Email</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #cbd5e1;display:flex;align-items:center;padding:0 10px;font-size:12px;color:#94a3b8\">hello@brand.com</div></div><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Password</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #cbd5e1;display:flex;align-items:center;padding:0 10px;font-size:12px;color:#94a3b8\">••••••••</div></div><div style=\"display:flex;justify-content:flex-end\"><span class=\"primary\">Submit</span></div></div>",
    "cssCode": "\n.form-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.form-007 * { box-sizing: border-box; }\n.form-007 .muted { color: #64748b; }\n.form-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.form-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "form-007"
  },
  {
    "id": "form-008",
    "title": "Form 8",
    "category": "form",
    "description": "Form layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "form",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"form-008\"><div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">First name</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #c7d2fe;display:flex;align-items:center;padding:0 10px;font-size:12px\">Maya</div></div><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Team size</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #c7d2fe;display:flex;align-items:center;padding:0 10px;font-size:12px\">11-50</div></div></div><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Message</div><div style=\"margin-top:6px;height:48px;border-radius:10px;background:#fff;border:1px solid #c7d2fe;padding:10px;font-size:12px;color:#94a3b8\">Tell us about your project</div></div></div>",
    "cssCode": "\n.form-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.form-008 * { box-sizing: border-box; }\n.form-008 .muted { color: #64748b; }\n.form-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.form-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "form-008"
  },
  {
    "id": "form-009",
    "title": "Form 9",
    "category": "form",
    "description": "Form layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "form",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"form-009\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><strong style=\"font-size:14px\">Join the beta</strong><div style=\"height:36px;border-radius:12px;background:#fff;border:1px solid #a7f3d0;display:flex;align-items:center;padding:0 12px;font-size:12px;color:#94a3b8\">Work email</div><div style=\"display:flex;gap:8px\"><span class=\"primary\">Request invite</span><span class=\"ghost\">Privacy</span></div></div></div>",
    "cssCode": "\n.form-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.form-009 * { box-sizing: border-box; }\n.form-009 .muted { color: #64748b; }\n.form-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.form-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "form-009"
  },
  {
    "id": "form-010",
    "title": "Form 10",
    "category": "form",
    "description": "Form layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "form",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"form-010\"><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Email</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #fecdd3;display:flex;align-items:center;padding:0 10px;font-size:12px;color:#94a3b8\">hello@brand.com</div></div><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Password</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #fecdd3;display:flex;align-items:center;padding:0 10px;font-size:12px;color:#94a3b8\">••••••••</div></div><div style=\"display:flex;justify-content:flex-end\"><span class=\"primary\">Submit</span></div></div>",
    "cssCode": "\n.form-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.form-010 * { box-sizing: border-box; }\n.form-010 .muted { color: #64748b; }\n.form-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.form-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "form-010"
  },
  {
    "id": "form-011",
    "title": "Form 11",
    "category": "form",
    "description": "Form layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "form",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"form-011\"><div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">First name</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #fde68a;display:flex;align-items:center;padding:0 10px;font-size:12px\">Maya</div></div><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Team size</div><div style=\"margin-top:6px;height:34px;border-radius:10px;background:#fff;border:1px solid #fde68a;display:flex;align-items:center;padding:0 10px;font-size:12px\">11-50</div></div></div><div class=\"surface\" style=\"padding:10px\"><div class=\"muted\" style=\"font-size:11px\">Message</div><div style=\"margin-top:6px;height:48px;border-radius:10px;background:#fff;border:1px solid #fde68a;padding:10px;font-size:12px;color:#94a3b8\">Tell us about your project</div></div></div>",
    "cssCode": "\n.form-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.form-011 * { box-sizing: border-box; }\n.form-011 .muted { color: #64748b; }\n.form-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.form-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.form-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "form-011"
  },
  {
    "id": "auth-001",
    "title": "Auth 1",
    "category": "auth",
    "description": "Auth layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "auth",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"auth-001\"><div style=\"display:grid;place-items:center;gap:8px\"><span style=\"width:36px;height:36px;border-radius:12px;background:#0f172a;display:block\"></span><strong style=\"font-size:16px\">Welcome back</strong><span class=\"muted\" style=\"font-size:12px\">Sign in to access your workspace.</span></div><div style=\"display:grid;grid-template-columns:1fr 1fr;gap:8px\"><span class=\"ghost\">Google</span><span class=\"primary\">Email</span></div></div>",
    "cssCode": "\n.auth-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.auth-001 * { box-sizing: border-box; }\n.auth-001 .muted { color: #64748b; }\n.auth-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.auth-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "auth-001"
  },
  {
    "id": "auth-002",
    "title": "Auth 2",
    "category": "auth",
    "description": "Auth layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "auth",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"auth-002\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:15px\">Admin access</strong><span class=\"pill\">Secure</span></div><div style=\"height:34px;border-radius:10px;background:#fff;border:1px solid #c7d2fe;display:flex;align-items:center;padding:0 10px;font-size:12px;color:#94a3b8\">name@company.com</div><div style=\"display:flex;gap:8px\"><span class=\"primary\">Continue</span><span class=\"ghost\">SSO</span></div></div></div>",
    "cssCode": "\n.auth-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.auth-002 * { box-sizing: border-box; }\n.auth-002 .muted { color: #64748b; }\n.auth-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.auth-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "auth-002"
  },
  {
    "id": "auth-003",
    "title": "Auth 3",
    "category": "auth",
    "description": "Auth layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "auth",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"auth-003\" style=\"grid-template-columns:.95fr 1.05fr;gap:12px\"><div style=\"border-radius:14px;background:linear-gradient(145deg, color-mix(in srgb, #10b981 16%, white), #fff);min-height:120px\"></div><div style=\"display:grid;gap:8px;align-content:center\"><strong style=\"font-size:16px\">Create your account</strong><span class=\"muted\" style=\"font-size:12px\">Fast auth shell for premium products.</span><span class=\"primary\" style=\"width:max-content\">Join now</span></div></div>",
    "cssCode": "\n.auth-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.auth-003 * { box-sizing: border-box; }\n.auth-003 .muted { color: #64748b; }\n.auth-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.auth-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "auth-003"
  },
  {
    "id": "auth-004",
    "title": "Auth 4",
    "category": "auth",
    "description": "Auth layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "auth",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"auth-004\"><div style=\"display:grid;place-items:center;gap:8px\"><span style=\"width:36px;height:36px;border-radius:12px;background:#9f1239;display:block\"></span><strong style=\"font-size:16px\">Welcome back</strong><span class=\"muted\" style=\"font-size:12px\">Sign in to access your workspace.</span></div><div style=\"display:grid;grid-template-columns:1fr 1fr;gap:8px\"><span class=\"ghost\">Google</span><span class=\"primary\">Email</span></div></div>",
    "cssCode": "\n.auth-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.auth-004 * { box-sizing: border-box; }\n.auth-004 .muted { color: #64748b; }\n.auth-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.auth-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "auth-004"
  },
  {
    "id": "auth-005",
    "title": "Auth 5",
    "category": "auth",
    "description": "Auth layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "auth",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"auth-005\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:15px\">Admin access</strong><span class=\"pill\">Secure</span></div><div style=\"height:34px;border-radius:10px;background:#fff;border:1px solid #fde68a;display:flex;align-items:center;padding:0 10px;font-size:12px;color:#94a3b8\">name@company.com</div><div style=\"display:flex;gap:8px\"><span class=\"primary\">Continue</span><span class=\"ghost\">SSO</span></div></div></div>",
    "cssCode": "\n.auth-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.auth-005 * { box-sizing: border-box; }\n.auth-005 .muted { color: #64748b; }\n.auth-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.auth-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "auth-005"
  },
  {
    "id": "auth-006",
    "title": "Auth 6",
    "category": "auth",
    "description": "Auth layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "auth",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"auth-006\" style=\"grid-template-columns:.95fr 1.05fr;gap:12px\"><div style=\"border-radius:14px;background:linear-gradient(145deg, color-mix(in srgb, #0ea5e9 16%, white), #fff);min-height:120px\"></div><div style=\"display:grid;gap:8px;align-content:center\"><strong style=\"font-size:16px\">Create your account</strong><span class=\"muted\" style=\"font-size:12px\">Fast auth shell for premium products.</span><span class=\"primary\" style=\"width:max-content\">Join now</span></div></div>",
    "cssCode": "\n.auth-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.auth-006 * { box-sizing: border-box; }\n.auth-006 .muted { color: #64748b; }\n.auth-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.auth-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "auth-006"
  },
  {
    "id": "auth-007",
    "title": "Auth 7",
    "category": "auth",
    "description": "Auth layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "auth",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"auth-007\"><div style=\"display:grid;place-items:center;gap:8px\"><span style=\"width:36px;height:36px;border-radius:12px;background:#0f172a;display:block\"></span><strong style=\"font-size:16px\">Welcome back</strong><span class=\"muted\" style=\"font-size:12px\">Sign in to access your workspace.</span></div><div style=\"display:grid;grid-template-columns:1fr 1fr;gap:8px\"><span class=\"ghost\">Google</span><span class=\"primary\">Email</span></div></div>",
    "cssCode": "\n.auth-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.auth-007 * { box-sizing: border-box; }\n.auth-007 .muted { color: #64748b; }\n.auth-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.auth-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "auth-007"
  },
  {
    "id": "auth-008",
    "title": "Auth 8",
    "category": "auth",
    "description": "Auth layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "auth",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"auth-008\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:15px\">Admin access</strong><span class=\"pill\">Secure</span></div><div style=\"height:34px;border-radius:10px;background:#fff;border:1px solid #c7d2fe;display:flex;align-items:center;padding:0 10px;font-size:12px;color:#94a3b8\">name@company.com</div><div style=\"display:flex;gap:8px\"><span class=\"primary\">Continue</span><span class=\"ghost\">SSO</span></div></div></div>",
    "cssCode": "\n.auth-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.auth-008 * { box-sizing: border-box; }\n.auth-008 .muted { color: #64748b; }\n.auth-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.auth-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "auth-008"
  },
  {
    "id": "auth-009",
    "title": "Auth 9",
    "category": "auth",
    "description": "Auth layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "auth",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"auth-009\" style=\"grid-template-columns:.95fr 1.05fr;gap:12px\"><div style=\"border-radius:14px;background:linear-gradient(145deg, color-mix(in srgb, #10b981 16%, white), #fff);min-height:120px\"></div><div style=\"display:grid;gap:8px;align-content:center\"><strong style=\"font-size:16px\">Create your account</strong><span class=\"muted\" style=\"font-size:12px\">Fast auth shell for premium products.</span><span class=\"primary\" style=\"width:max-content\">Join now</span></div></div>",
    "cssCode": "\n.auth-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.auth-009 * { box-sizing: border-box; }\n.auth-009 .muted { color: #64748b; }\n.auth-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.auth-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "auth-009"
  },
  {
    "id": "auth-010",
    "title": "Auth 10",
    "category": "auth",
    "description": "Auth layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "auth",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"auth-010\"><div style=\"display:grid;place-items:center;gap:8px\"><span style=\"width:36px;height:36px;border-radius:12px;background:#9f1239;display:block\"></span><strong style=\"font-size:16px\">Welcome back</strong><span class=\"muted\" style=\"font-size:12px\">Sign in to access your workspace.</span></div><div style=\"display:grid;grid-template-columns:1fr 1fr;gap:8px\"><span class=\"ghost\">Google</span><span class=\"primary\">Email</span></div></div>",
    "cssCode": "\n.auth-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.auth-010 * { box-sizing: border-box; }\n.auth-010 .muted { color: #64748b; }\n.auth-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.auth-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "auth-010"
  },
  {
    "id": "auth-011",
    "title": "Auth 11",
    "category": "auth",
    "description": "Auth layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "auth",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"auth-011\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:15px\">Admin access</strong><span class=\"pill\">Secure</span></div><div style=\"height:34px;border-radius:10px;background:#fff;border:1px solid #fde68a;display:flex;align-items:center;padding:0 10px;font-size:12px;color:#94a3b8\">name@company.com</div><div style=\"display:flex;gap:8px\"><span class=\"primary\">Continue</span><span class=\"ghost\">SSO</span></div></div></div>",
    "cssCode": "\n.auth-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.auth-011 * { box-sizing: border-box; }\n.auth-011 .muted { color: #64748b; }\n.auth-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.auth-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.auth-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "auth-011"
  },
  {
    "id": "dashboard-001",
    "title": "Dashboard 1",
    "category": "dashboard",
    "description": "Dashboard layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "dashboard",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"dashboard-001\"><div style=\"display:grid;grid-template-columns:1.15fr .85fr;gap:10px\"><div class=\"surface\" style=\"padding:12px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><div style=\"font-weight:700;font-size:12px\">Revenue</div><span class=\"pill\">+18%</span></div><div style=\"margin-top:12px;height:60px;display:grid;grid-template-columns:repeat(6,1fr);gap:6px;align-items:end\"><span style=\"display:block;border-radius:8px 8px 0 0;background:#4f46e5;height:18px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#4f46e5;height:34px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#4f46e5;height:22px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#4f46e5;height:45px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#4f46e5;height:30px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#4f46e5;height:52px;opacity:.74\"></span></div></div><div style=\"display:grid;gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:18px;font-weight:800\">18.4%</div><div class=\"muted\" style=\"font-size:11px\">Growth</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:18px;font-weight:800\">124</div><div class=\"muted\" style=\"font-size:11px\">Orders</div></div></div></div></div>",
    "cssCode": "\n.dashboard-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.dashboard-001 * { box-sizing: border-box; }\n.dashboard-001 .muted { color: #64748b; }\n.dashboard-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.dashboard-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "dashboard-001"
  },
  {
    "id": "dashboard-002",
    "title": "Dashboard 2",
    "category": "dashboard",
    "description": "Dashboard layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "dashboard",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"dashboard-002\" style=\"grid-template-columns:74px 1fr;align-items:stretch\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><span style=\"height:28px;border-radius:10px;background:#6366f1;opacity:.18;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #c7d2fe;display:block\"></span></div><div style=\"display:grid;gap:10px\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:8px\"><div style=\"display:flex;justify-content:space-between\"><strong style=\"font-size:12px\">Overview</strong><span class=\"pill\">Today</span></div><div style=\"height:44px;border-radius:12px;background:linear-gradient(145deg,color-mix(in srgb, #6366f1 16%, white),#fff)\"></div></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:15px;font-weight:800\">128</div><div class=\"muted\" style=\"font-size:10px\">MRR</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:15px;font-weight:800\">128</div><div class=\"muted\" style=\"font-size:10px\">Users</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:15px;font-weight:800\">2</div><div class=\"muted\" style=\"font-size:10px\">Refunds</div></div></div></div></div>",
    "cssCode": "\n.dashboard-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.dashboard-002 * { box-sizing: border-box; }\n.dashboard-002 .muted { color: #64748b; }\n.dashboard-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.dashboard-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "dashboard-002"
  },
  {
    "id": "dashboard-003",
    "title": "Dashboard 3",
    "category": "dashboard",
    "description": "Dashboard layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "dashboard",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"dashboard-003\"><div class=\"surface\" style=\"padding:14px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:14px\">Analytics board</strong><span style=\"width:32px;height:32px;border-radius:10px;background:#10b981;opacity:.18\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .9fr;gap:10px\"><div style=\"height:74px;border-radius:14px;background:#fff;border:1px solid #a7f3d0;display:grid;grid-template-columns:repeat(7,1fr);gap:6px;align-items:end;padding:10px\"><span style=\"display:block;height:16px;border-radius:999px;background:#10b981;opacity:.75\"></span><span style=\"display:block;height:24px;border-radius:999px;background:#10b981;opacity:.75\"></span><span style=\"display:block;height:18px;border-radius:999px;background:#10b981;opacity:.75\"></span><span style=\"display:block;height:32px;border-radius:999px;background:#10b981;opacity:.75\"></span><span style=\"display:block;height:28px;border-radius:999px;background:#10b981;opacity:.75\"></span><span style=\"display:block;height:40px;border-radius:999px;background:#10b981;opacity:.75\"></span><span style=\"display:block;height:36px;border-radius:999px;background:#10b981;opacity:.75\"></span></div><div style=\"display:grid;gap:8px\"><div style=\"height:18px;border-radius:999px;background:#10b981;opacity:0.16999999999999998\"></div><div style=\"height:18px;border-radius:999px;background:#10b981;opacity:0.22\"></div><div style=\"height:18px;border-radius:999px;background:#10b981;opacity:0.27\"></div></div></div></div></div>",
    "cssCode": "\n.dashboard-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.dashboard-003 * { box-sizing: border-box; }\n.dashboard-003 .muted { color: #64748b; }\n.dashboard-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.dashboard-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "dashboard-003"
  },
  {
    "id": "dashboard-004",
    "title": "Dashboard 4",
    "category": "dashboard",
    "description": "Dashboard layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "dashboard",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"dashboard-004\"><div style=\"display:grid;grid-template-columns:1.15fr .85fr;gap:10px\"><div class=\"surface\" style=\"padding:12px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><div style=\"font-weight:700;font-size:12px\">Revenue</div><span class=\"pill\">+18%</span></div><div style=\"margin-top:12px;height:60px;display:grid;grid-template-columns:repeat(6,1fr);gap:6px;align-items:end\"><span style=\"display:block;border-radius:8px 8px 0 0;background:#f43f5e;height:18px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#f43f5e;height:34px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#f43f5e;height:22px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#f43f5e;height:45px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#f43f5e;height:30px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#f43f5e;height:52px;opacity:.74\"></span></div></div><div style=\"display:grid;gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:18px;font-weight:800\">18.4%</div><div class=\"muted\" style=\"font-size:11px\">Growth</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:18px;font-weight:800\">124</div><div class=\"muted\" style=\"font-size:11px\">Orders</div></div></div></div></div>",
    "cssCode": "\n.dashboard-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.dashboard-004 * { box-sizing: border-box; }\n.dashboard-004 .muted { color: #64748b; }\n.dashboard-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.dashboard-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "dashboard-004"
  },
  {
    "id": "dashboard-005",
    "title": "Dashboard 5",
    "category": "dashboard",
    "description": "Dashboard layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "dashboard",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"dashboard-005\" style=\"grid-template-columns:74px 1fr;align-items:stretch\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><span style=\"height:28px;border-radius:10px;background:#f59e0b;opacity:.18;border:1px solid #fde68a;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fde68a;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fde68a;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fde68a;display:block\"></span></div><div style=\"display:grid;gap:10px\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:8px\"><div style=\"display:flex;justify-content:space-between\"><strong style=\"font-size:12px\">Overview</strong><span class=\"pill\">Today</span></div><div style=\"height:44px;border-radius:12px;background:linear-gradient(145deg,color-mix(in srgb, #f59e0b 16%, white),#fff)\"></div></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:15px;font-weight:800\">128</div><div class=\"muted\" style=\"font-size:10px\">MRR</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:15px;font-weight:800\">128</div><div class=\"muted\" style=\"font-size:10px\">Users</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:15px;font-weight:800\">2</div><div class=\"muted\" style=\"font-size:10px\">Refunds</div></div></div></div></div>",
    "cssCode": "\n.dashboard-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.dashboard-005 * { box-sizing: border-box; }\n.dashboard-005 .muted { color: #64748b; }\n.dashboard-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.dashboard-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "dashboard-005"
  },
  {
    "id": "dashboard-006",
    "title": "Dashboard 6",
    "category": "dashboard",
    "description": "Dashboard layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "dashboard",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"dashboard-006\"><div class=\"surface\" style=\"padding:14px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:14px\">Analytics board</strong><span style=\"width:32px;height:32px;border-radius:10px;background:#0ea5e9;opacity:.18\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .9fr;gap:10px\"><div style=\"height:74px;border-radius:14px;background:#fff;border:1px solid #bae6fd;display:grid;grid-template-columns:repeat(7,1fr);gap:6px;align-items:end;padding:10px\"><span style=\"display:block;height:16px;border-radius:999px;background:#0ea5e9;opacity:.75\"></span><span style=\"display:block;height:24px;border-radius:999px;background:#0ea5e9;opacity:.75\"></span><span style=\"display:block;height:18px;border-radius:999px;background:#0ea5e9;opacity:.75\"></span><span style=\"display:block;height:32px;border-radius:999px;background:#0ea5e9;opacity:.75\"></span><span style=\"display:block;height:28px;border-radius:999px;background:#0ea5e9;opacity:.75\"></span><span style=\"display:block;height:40px;border-radius:999px;background:#0ea5e9;opacity:.75\"></span><span style=\"display:block;height:36px;border-radius:999px;background:#0ea5e9;opacity:.75\"></span></div><div style=\"display:grid;gap:8px\"><div style=\"height:18px;border-radius:999px;background:#0ea5e9;opacity:0.16999999999999998\"></div><div style=\"height:18px;border-radius:999px;background:#0ea5e9;opacity:0.22\"></div><div style=\"height:18px;border-radius:999px;background:#0ea5e9;opacity:0.27\"></div></div></div></div></div>",
    "cssCode": "\n.dashboard-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.dashboard-006 * { box-sizing: border-box; }\n.dashboard-006 .muted { color: #64748b; }\n.dashboard-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.dashboard-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "dashboard-006"
  },
  {
    "id": "dashboard-007",
    "title": "Dashboard 7",
    "category": "dashboard",
    "description": "Dashboard layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "dashboard",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"dashboard-007\"><div style=\"display:grid;grid-template-columns:1.15fr .85fr;gap:10px\"><div class=\"surface\" style=\"padding:12px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><div style=\"font-weight:700;font-size:12px\">Revenue</div><span class=\"pill\">+18%</span></div><div style=\"margin-top:12px;height:60px;display:grid;grid-template-columns:repeat(6,1fr);gap:6px;align-items:end\"><span style=\"display:block;border-radius:8px 8px 0 0;background:#4f46e5;height:18px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#4f46e5;height:34px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#4f46e5;height:22px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#4f46e5;height:45px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#4f46e5;height:30px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#4f46e5;height:52px;opacity:.74\"></span></div></div><div style=\"display:grid;gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:18px;font-weight:800\">18.4%</div><div class=\"muted\" style=\"font-size:11px\">Growth</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:18px;font-weight:800\">124</div><div class=\"muted\" style=\"font-size:11px\">Orders</div></div></div></div></div>",
    "cssCode": "\n.dashboard-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.dashboard-007 * { box-sizing: border-box; }\n.dashboard-007 .muted { color: #64748b; }\n.dashboard-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.dashboard-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "dashboard-007"
  },
  {
    "id": "dashboard-008",
    "title": "Dashboard 8",
    "category": "dashboard",
    "description": "Dashboard layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "dashboard",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"dashboard-008\" style=\"grid-template-columns:74px 1fr;align-items:stretch\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><span style=\"height:28px;border-radius:10px;background:#6366f1;opacity:.18;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #c7d2fe;display:block\"></span></div><div style=\"display:grid;gap:10px\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:8px\"><div style=\"display:flex;justify-content:space-between\"><strong style=\"font-size:12px\">Overview</strong><span class=\"pill\">Today</span></div><div style=\"height:44px;border-radius:12px;background:linear-gradient(145deg,color-mix(in srgb, #6366f1 16%, white),#fff)\"></div></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:15px;font-weight:800\">128</div><div class=\"muted\" style=\"font-size:10px\">MRR</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:15px;font-weight:800\">128</div><div class=\"muted\" style=\"font-size:10px\">Users</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:15px;font-weight:800\">2</div><div class=\"muted\" style=\"font-size:10px\">Refunds</div></div></div></div></div>",
    "cssCode": "\n.dashboard-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.dashboard-008 * { box-sizing: border-box; }\n.dashboard-008 .muted { color: #64748b; }\n.dashboard-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.dashboard-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "dashboard-008"
  },
  {
    "id": "dashboard-009",
    "title": "Dashboard 9",
    "category": "dashboard",
    "description": "Dashboard layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "dashboard",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"dashboard-009\"><div class=\"surface\" style=\"padding:14px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:14px\">Analytics board</strong><span style=\"width:32px;height:32px;border-radius:10px;background:#10b981;opacity:.18\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .9fr;gap:10px\"><div style=\"height:74px;border-radius:14px;background:#fff;border:1px solid #a7f3d0;display:grid;grid-template-columns:repeat(7,1fr);gap:6px;align-items:end;padding:10px\"><span style=\"display:block;height:16px;border-radius:999px;background:#10b981;opacity:.75\"></span><span style=\"display:block;height:24px;border-radius:999px;background:#10b981;opacity:.75\"></span><span style=\"display:block;height:18px;border-radius:999px;background:#10b981;opacity:.75\"></span><span style=\"display:block;height:32px;border-radius:999px;background:#10b981;opacity:.75\"></span><span style=\"display:block;height:28px;border-radius:999px;background:#10b981;opacity:.75\"></span><span style=\"display:block;height:40px;border-radius:999px;background:#10b981;opacity:.75\"></span><span style=\"display:block;height:36px;border-radius:999px;background:#10b981;opacity:.75\"></span></div><div style=\"display:grid;gap:8px\"><div style=\"height:18px;border-radius:999px;background:#10b981;opacity:0.16999999999999998\"></div><div style=\"height:18px;border-radius:999px;background:#10b981;opacity:0.22\"></div><div style=\"height:18px;border-radius:999px;background:#10b981;opacity:0.27\"></div></div></div></div></div>",
    "cssCode": "\n.dashboard-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.dashboard-009 * { box-sizing: border-box; }\n.dashboard-009 .muted { color: #64748b; }\n.dashboard-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.dashboard-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "dashboard-009"
  },
  {
    "id": "dashboard-010",
    "title": "Dashboard 10",
    "category": "dashboard",
    "description": "Dashboard layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "dashboard",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"dashboard-010\"><div style=\"display:grid;grid-template-columns:1.15fr .85fr;gap:10px\"><div class=\"surface\" style=\"padding:12px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><div style=\"font-weight:700;font-size:12px\">Revenue</div><span class=\"pill\">+18%</span></div><div style=\"margin-top:12px;height:60px;display:grid;grid-template-columns:repeat(6,1fr);gap:6px;align-items:end\"><span style=\"display:block;border-radius:8px 8px 0 0;background:#f43f5e;height:18px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#f43f5e;height:34px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#f43f5e;height:22px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#f43f5e;height:45px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#f43f5e;height:30px;opacity:.74\"></span><span style=\"display:block;border-radius:8px 8px 0 0;background:#f43f5e;height:52px;opacity:.74\"></span></div></div><div style=\"display:grid;gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:18px;font-weight:800\">18.4%</div><div class=\"muted\" style=\"font-size:11px\">Growth</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:18px;font-weight:800\">124</div><div class=\"muted\" style=\"font-size:11px\">Orders</div></div></div></div></div>",
    "cssCode": "\n.dashboard-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.dashboard-010 * { box-sizing: border-box; }\n.dashboard-010 .muted { color: #64748b; }\n.dashboard-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.dashboard-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "dashboard-010"
  },
  {
    "id": "dashboard-011",
    "title": "Dashboard 11",
    "category": "dashboard",
    "description": "Dashboard layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "dashboard",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"dashboard-011\" style=\"grid-template-columns:74px 1fr;align-items:stretch\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><span style=\"height:28px;border-radius:10px;background:#f59e0b;opacity:.18;border:1px solid #fde68a;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fde68a;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fde68a;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fde68a;display:block\"></span></div><div style=\"display:grid;gap:10px\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:8px\"><div style=\"display:flex;justify-content:space-between\"><strong style=\"font-size:12px\">Overview</strong><span class=\"pill\">Today</span></div><div style=\"height:44px;border-radius:12px;background:linear-gradient(145deg,color-mix(in srgb, #f59e0b 16%, white),#fff)\"></div></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\"><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:15px;font-weight:800\">128</div><div class=\"muted\" style=\"font-size:10px\">MRR</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:15px;font-weight:800\">128</div><div class=\"muted\" style=\"font-size:10px\">Users</div></div><div class=\"surface\" style=\"padding:10px\"><div style=\"font-size:15px;font-weight:800\">2</div><div class=\"muted\" style=\"font-size:10px\">Refunds</div></div></div></div></div>",
    "cssCode": "\n.dashboard-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.dashboard-011 * { box-sizing: border-box; }\n.dashboard-011 .muted { color: #64748b; }\n.dashboard-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.dashboard-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.dashboard-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "dashboard-011"
  },
  {
    "id": "sidebar-001",
    "title": "Sidebar 1",
    "category": "sidebar",
    "description": "Sidebar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "sidebar",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"sidebar-001\" style=\"grid-template-columns:74px 1fr;align-items:stretch\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><span style=\"height:28px;border-radius:10px;background:#4f46e5;opacity:.18;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #cbd5e1;display:block\"></span></div><div class=\"surface\" style=\"padding:12px\"><div style=\"height:16px;width:60%;border-radius:999px;background:#4f46e5;opacity:.2\"></div><div style=\"margin-top:10px;display:grid;gap:8px\"><span style=\"height:26px;border-radius:10px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;border:1px solid #cbd5e1;display:block\"></span></div></div></div>",
    "cssCode": "\n.sidebar-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.sidebar-001 * { box-sizing: border-box; }\n.sidebar-001 .muted { color: #64748b; }\n.sidebar-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.sidebar-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "sidebar-001"
  },
  {
    "id": "sidebar-002",
    "title": "Sidebar 2",
    "category": "sidebar",
    "description": "Sidebar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "sidebar",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"sidebar-002\"><div class=\"surface\" style=\"padding:12px;display:grid;grid-template-columns:.78fr 1.22fr;gap:12px\"><div style=\"display:grid;gap:8px\"><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#6366f1;opacity:.18;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #c7d2fe;display:block\"></span></div><div style=\"display:grid;gap:8px\"><strong style=\"font-size:14px\">Workspace</strong><div style=\"height:52px;border-radius:12px;background:linear-gradient(145deg,color-mix(in srgb, #6366f1 14%, white),#fff);border:1px solid #c7d2fe\"></div><div style=\"height:22px;border-radius:999px;background:#6366f1;opacity:.12\"></div><div style=\"height:22px;border-radius:999px;background:#6366f1;opacity:.08\"></div></div></div></div>",
    "cssCode": "\n.sidebar-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.sidebar-002 * { box-sizing: border-box; }\n.sidebar-002 .muted { color: #64748b; }\n.sidebar-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.sidebar-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "sidebar-002"
  },
  {
    "id": "sidebar-003",
    "title": "Sidebar 3",
    "category": "sidebar",
    "description": "Sidebar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "sidebar",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"sidebar-003\" style=\"padding:0;overflow:hidden\"><div style=\"display:grid;grid-template-columns:82px 1fr;min-height:150px\"><div style=\"background:#065f46;padding:12px;display:grid;align-content:start;gap:8px\"><span style=\"height:28px;border-radius:10px;background:rgba(255,255,255,.14);display:block\"></span><span style=\"height:28px;border-radius:10px;background:rgba(255,255,255,.14);display:block\"></span><span style=\"height:28px;border-radius:10px;background:rgba(255,255,255,.14);display:block\"></span><span style=\"height:28px;border-radius:10px;background:rgba(255,255,255,.14);display:block\"></span></div><div style=\"padding:14px;display:grid;gap:10px\"><strong style=\"font-size:15px\">Compact app shell</strong><div style=\"display:grid;grid-template-columns:repeat(2,1fr);gap:8px\"><div style=\"height:38px;border-radius:12px;background:#fff;border:1px solid #a7f3d0\"></div><div style=\"height:38px;border-radius:12px;background:#fff;border:1px solid #a7f3d0\"></div><div style=\"height:38px;border-radius:12px;background:#fff;border:1px solid #a7f3d0\"></div><div style=\"height:38px;border-radius:12px;background:#fff;border:1px solid #a7f3d0\"></div></div></div></div></div>",
    "cssCode": "\n.sidebar-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.sidebar-003 * { box-sizing: border-box; }\n.sidebar-003 .muted { color: #64748b; }\n.sidebar-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.sidebar-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "sidebar-003"
  },
  {
    "id": "sidebar-004",
    "title": "Sidebar 4",
    "category": "sidebar",
    "description": "Sidebar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "sidebar",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"sidebar-004\" style=\"grid-template-columns:74px 1fr;align-items:stretch\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><span style=\"height:28px;border-radius:10px;background:#f43f5e;opacity:.18;border:1px solid #fecdd3;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fecdd3;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fecdd3;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fecdd3;display:block\"></span></div><div class=\"surface\" style=\"padding:12px\"><div style=\"height:16px;width:60%;border-radius:999px;background:#f43f5e;opacity:.2\"></div><div style=\"margin-top:10px;display:grid;gap:8px\"><span style=\"height:26px;border-radius:10px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;border:1px solid #fecdd3;display:block\"></span></div></div></div>",
    "cssCode": "\n.sidebar-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.sidebar-004 * { box-sizing: border-box; }\n.sidebar-004 .muted { color: #64748b; }\n.sidebar-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.sidebar-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "sidebar-004"
  },
  {
    "id": "sidebar-005",
    "title": "Sidebar 5",
    "category": "sidebar",
    "description": "Sidebar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "sidebar",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"sidebar-005\"><div class=\"surface\" style=\"padding:12px;display:grid;grid-template-columns:.78fr 1.22fr;gap:12px\"><div style=\"display:grid;gap:8px\"><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fde68a;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fde68a;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#f59e0b;opacity:.18;border:1px solid #fde68a;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fde68a;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fde68a;display:block\"></span></div><div style=\"display:grid;gap:8px\"><strong style=\"font-size:14px\">Workspace</strong><div style=\"height:52px;border-radius:12px;background:linear-gradient(145deg,color-mix(in srgb, #f59e0b 14%, white),#fff);border:1px solid #fde68a\"></div><div style=\"height:22px;border-radius:999px;background:#f59e0b;opacity:.12\"></div><div style=\"height:22px;border-radius:999px;background:#f59e0b;opacity:.08\"></div></div></div></div>",
    "cssCode": "\n.sidebar-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.sidebar-005 * { box-sizing: border-box; }\n.sidebar-005 .muted { color: #64748b; }\n.sidebar-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.sidebar-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "sidebar-005"
  },
  {
    "id": "sidebar-006",
    "title": "Sidebar 6",
    "category": "sidebar",
    "description": "Sidebar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "sidebar",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"sidebar-006\" style=\"padding:0;overflow:hidden\"><div style=\"display:grid;grid-template-columns:82px 1fr;min-height:150px\"><div style=\"background:#075985;padding:12px;display:grid;align-content:start;gap:8px\"><span style=\"height:28px;border-radius:10px;background:rgba(255,255,255,.14);display:block\"></span><span style=\"height:28px;border-radius:10px;background:rgba(255,255,255,.14);display:block\"></span><span style=\"height:28px;border-radius:10px;background:rgba(255,255,255,.14);display:block\"></span><span style=\"height:28px;border-radius:10px;background:rgba(255,255,255,.14);display:block\"></span></div><div style=\"padding:14px;display:grid;gap:10px\"><strong style=\"font-size:15px\">Compact app shell</strong><div style=\"display:grid;grid-template-columns:repeat(2,1fr);gap:8px\"><div style=\"height:38px;border-radius:12px;background:#fff;border:1px solid #bae6fd\"></div><div style=\"height:38px;border-radius:12px;background:#fff;border:1px solid #bae6fd\"></div><div style=\"height:38px;border-radius:12px;background:#fff;border:1px solid #bae6fd\"></div><div style=\"height:38px;border-radius:12px;background:#fff;border:1px solid #bae6fd\"></div></div></div></div></div>",
    "cssCode": "\n.sidebar-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.sidebar-006 * { box-sizing: border-box; }\n.sidebar-006 .muted { color: #64748b; }\n.sidebar-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.sidebar-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "sidebar-006"
  },
  {
    "id": "sidebar-007",
    "title": "Sidebar 7",
    "category": "sidebar",
    "description": "Sidebar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "sidebar",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"sidebar-007\" style=\"grid-template-columns:74px 1fr;align-items:stretch\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><span style=\"height:28px;border-radius:10px;background:#4f46e5;opacity:.18;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #cbd5e1;display:block\"></span></div><div class=\"surface\" style=\"padding:12px\"><div style=\"height:16px;width:60%;border-radius:999px;background:#4f46e5;opacity:.2\"></div><div style=\"margin-top:10px;display:grid;gap:8px\"><span style=\"height:26px;border-radius:10px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;border:1px solid #cbd5e1;display:block\"></span></div></div></div>",
    "cssCode": "\n.sidebar-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.sidebar-007 * { box-sizing: border-box; }\n.sidebar-007 .muted { color: #64748b; }\n.sidebar-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.sidebar-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "sidebar-007"
  },
  {
    "id": "sidebar-008",
    "title": "Sidebar 8",
    "category": "sidebar",
    "description": "Sidebar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "sidebar",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"sidebar-008\"><div class=\"surface\" style=\"padding:12px;display:grid;grid-template-columns:.78fr 1.22fr;gap:12px\"><div style=\"display:grid;gap:8px\"><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#6366f1;opacity:.18;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #c7d2fe;display:block\"></span></div><div style=\"display:grid;gap:8px\"><strong style=\"font-size:14px\">Workspace</strong><div style=\"height:52px;border-radius:12px;background:linear-gradient(145deg,color-mix(in srgb, #6366f1 14%, white),#fff);border:1px solid #c7d2fe\"></div><div style=\"height:22px;border-radius:999px;background:#6366f1;opacity:.12\"></div><div style=\"height:22px;border-radius:999px;background:#6366f1;opacity:.08\"></div></div></div></div>",
    "cssCode": "\n.sidebar-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.sidebar-008 * { box-sizing: border-box; }\n.sidebar-008 .muted { color: #64748b; }\n.sidebar-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.sidebar-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "sidebar-008"
  },
  {
    "id": "sidebar-009",
    "title": "Sidebar 9",
    "category": "sidebar",
    "description": "Sidebar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "sidebar",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"sidebar-009\" style=\"padding:0;overflow:hidden\"><div style=\"display:grid;grid-template-columns:82px 1fr;min-height:150px\"><div style=\"background:#065f46;padding:12px;display:grid;align-content:start;gap:8px\"><span style=\"height:28px;border-radius:10px;background:rgba(255,255,255,.14);display:block\"></span><span style=\"height:28px;border-radius:10px;background:rgba(255,255,255,.14);display:block\"></span><span style=\"height:28px;border-radius:10px;background:rgba(255,255,255,.14);display:block\"></span><span style=\"height:28px;border-radius:10px;background:rgba(255,255,255,.14);display:block\"></span></div><div style=\"padding:14px;display:grid;gap:10px\"><strong style=\"font-size:15px\">Compact app shell</strong><div style=\"display:grid;grid-template-columns:repeat(2,1fr);gap:8px\"><div style=\"height:38px;border-radius:12px;background:#fff;border:1px solid #a7f3d0\"></div><div style=\"height:38px;border-radius:12px;background:#fff;border:1px solid #a7f3d0\"></div><div style=\"height:38px;border-radius:12px;background:#fff;border:1px solid #a7f3d0\"></div><div style=\"height:38px;border-radius:12px;background:#fff;border:1px solid #a7f3d0\"></div></div></div></div></div>",
    "cssCode": "\n.sidebar-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.sidebar-009 * { box-sizing: border-box; }\n.sidebar-009 .muted { color: #64748b; }\n.sidebar-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.sidebar-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "sidebar-009"
  },
  {
    "id": "sidebar-010",
    "title": "Sidebar 10",
    "category": "sidebar",
    "description": "Sidebar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "sidebar",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"sidebar-010\" style=\"grid-template-columns:74px 1fr;align-items:stretch\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><span style=\"height:28px;border-radius:10px;background:#f43f5e;opacity:.18;border:1px solid #fecdd3;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fecdd3;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fecdd3;display:block\"></span><span style=\"height:28px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fecdd3;display:block\"></span></div><div class=\"surface\" style=\"padding:12px\"><div style=\"height:16px;width:60%;border-radius:999px;background:#f43f5e;opacity:.2\"></div><div style=\"margin-top:10px;display:grid;gap:8px\"><span style=\"height:26px;border-radius:10px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;border:1px solid #fecdd3;display:block\"></span></div></div></div>",
    "cssCode": "\n.sidebar-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.sidebar-010 * { box-sizing: border-box; }\n.sidebar-010 .muted { color: #64748b; }\n.sidebar-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.sidebar-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "sidebar-010"
  },
  {
    "id": "sidebar-011",
    "title": "Sidebar 11",
    "category": "sidebar",
    "description": "Sidebar layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "sidebar",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"sidebar-011\"><div class=\"surface\" style=\"padding:12px;display:grid;grid-template-columns:.78fr 1.22fr;gap:12px\"><div style=\"display:grid;gap:8px\"><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fde68a;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fde68a;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#f59e0b;opacity:.18;border:1px solid #fde68a;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fde68a;display:block\"></span><span style=\"height:26px;border-radius:10px;background:#fff;opacity:1;border:1px solid #fde68a;display:block\"></span></div><div style=\"display:grid;gap:8px\"><strong style=\"font-size:14px\">Workspace</strong><div style=\"height:52px;border-radius:12px;background:linear-gradient(145deg,color-mix(in srgb, #f59e0b 14%, white),#fff);border:1px solid #fde68a\"></div><div style=\"height:22px;border-radius:999px;background:#f59e0b;opacity:.12\"></div><div style=\"height:22px;border-radius:999px;background:#f59e0b;opacity:.08\"></div></div></div></div>",
    "cssCode": "\n.sidebar-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.sidebar-011 * { box-sizing: border-box; }\n.sidebar-011 .muted { color: #64748b; }\n.sidebar-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.sidebar-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.sidebar-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "sidebar-011"
  },
  {
    "id": "table-001",
    "title": "Table 1",
    "category": "table",
    "description": "Table layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "table",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"table-001\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:6px\"><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#f8fafc;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#f8fafc;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#f8fafc;border:1px solid #cbd5e1;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span></div></div></div>",
    "cssCode": "\n.table-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.table-001 * { box-sizing: border-box; }\n.table-001 .muted { color: #64748b; }\n.table-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.table-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "table-001"
  },
  {
    "id": "table-002",
    "title": "Table 2",
    "category": "table",
    "description": "Table layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "table",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"table-002\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:6px\"><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#eef2ff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#eef2ff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#eef2ff;border:1px solid #c7d2fe;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span></div></div></div>",
    "cssCode": "\n.table-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.table-002 * { box-sizing: border-box; }\n.table-002 .muted { color: #64748b; }\n.table-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.table-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "table-002"
  },
  {
    "id": "table-003",
    "title": "Table 3",
    "category": "table",
    "description": "Table layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "table",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"table-003\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:6px\"><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#ecfdf5;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#ecfdf5;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#ecfdf5;border:1px solid #a7f3d0;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span></div></div></div>",
    "cssCode": "\n.table-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.table-003 * { box-sizing: border-box; }\n.table-003 .muted { color: #64748b; }\n.table-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.table-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "table-003"
  },
  {
    "id": "table-004",
    "title": "Table 4",
    "category": "table",
    "description": "Table layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "table",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"table-004\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:6px\"><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff1f2;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff1f2;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff1f2;border:1px solid #fecdd3;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span></div></div></div>",
    "cssCode": "\n.table-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.table-004 * { box-sizing: border-box; }\n.table-004 .muted { color: #64748b; }\n.table-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.table-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "table-004"
  },
  {
    "id": "table-005",
    "title": "Table 5",
    "category": "table",
    "description": "Table layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "table",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"table-005\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:6px\"><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fffbeb;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fffbeb;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fffbeb;border:1px solid #fde68a;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span></div></div></div>",
    "cssCode": "\n.table-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.table-005 * { box-sizing: border-box; }\n.table-005 .muted { color: #64748b; }\n.table-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.table-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "table-005"
  },
  {
    "id": "table-006",
    "title": "Table 6",
    "category": "table",
    "description": "Table layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "table",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"table-006\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:6px\"><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#f0f9ff;border:1px solid #bae6fd;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#f0f9ff;border:1px solid #bae6fd;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#f0f9ff;border:1px solid #bae6fd;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #bae6fd;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #bae6fd;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #bae6fd;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #bae6fd;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #bae6fd;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #bae6fd;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #bae6fd;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #bae6fd;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #bae6fd;display:block\"></span></div></div></div>",
    "cssCode": "\n.table-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.table-006 * { box-sizing: border-box; }\n.table-006 .muted { color: #64748b; }\n.table-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.table-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "table-006"
  },
  {
    "id": "table-007",
    "title": "Table 7",
    "category": "table",
    "description": "Table layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "table",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"table-007\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:6px\"><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#f8fafc;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#f8fafc;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#f8fafc;border:1px solid #cbd5e1;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #cbd5e1;display:block\"></span></div></div></div>",
    "cssCode": "\n.table-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.table-007 * { box-sizing: border-box; }\n.table-007 .muted { color: #64748b; }\n.table-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.table-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "table-007"
  },
  {
    "id": "table-008",
    "title": "Table 8",
    "category": "table",
    "description": "Table layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "table",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"table-008\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:6px\"><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#eef2ff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#eef2ff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#eef2ff;border:1px solid #c7d2fe;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe;display:block\"></span></div></div></div>",
    "cssCode": "\n.table-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.table-008 * { box-sizing: border-box; }\n.table-008 .muted { color: #64748b; }\n.table-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.table-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "table-008"
  },
  {
    "id": "table-009",
    "title": "Table 9",
    "category": "table",
    "description": "Table layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "table",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"table-009\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:6px\"><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#ecfdf5;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#ecfdf5;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#ecfdf5;border:1px solid #a7f3d0;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #a7f3d0;display:block\"></span></div></div></div>",
    "cssCode": "\n.table-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.table-009 * { box-sizing: border-box; }\n.table-009 .muted { color: #64748b; }\n.table-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.table-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "table-009"
  },
  {
    "id": "table-010",
    "title": "Table 10",
    "category": "table",
    "description": "Table layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "table",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"table-010\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:6px\"><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff1f2;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff1f2;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff1f2;border:1px solid #fecdd3;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fecdd3;display:block\"></span></div></div></div>",
    "cssCode": "\n.table-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.table-010 * { box-sizing: border-box; }\n.table-010 .muted { color: #64748b; }\n.table-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.table-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "table-010"
  },
  {
    "id": "table-011",
    "title": "Table 11",
    "category": "table",
    "description": "Table layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "table",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"table-011\"><div class=\"surface\" style=\"padding:10px;display:grid;gap:6px\"><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fffbeb;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fffbeb;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fffbeb;border:1px solid #fde68a;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span></div><div style=\"display:grid;grid-template-columns:1.1fr .7fr .5fr;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a;display:block\"></span></div></div></div>",
    "cssCode": "\n.table-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.table-011 * { box-sizing: border-box; }\n.table-011 .muted { color: #64748b; }\n.table-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.table-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.table-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "table-011"
  },
  {
    "id": "search-001",
    "title": "Search 1",
    "category": "search",
    "description": "Search layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "search",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"search-001\"><div style=\"height:42px;border-radius:14px;border:1px solid #cbd5e1;display:flex;align-items:center;padding:0 12px;background:#fff;color:#94a3b8;font-size:12px\">Search components, templates, and docs</div><div style=\"display:grid;gap:8px\"><div class=\"surface\" style=\"padding:10px;display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Result item</span><span class=\"pill\">Open</span></div><div class=\"surface\" style=\"padding:10px;display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Result item</span><span class=\"pill\">Open</span></div><div class=\"surface\" style=\"padding:10px;display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Result item</span><span class=\"pill\">Open</span></div></div></div>",
    "cssCode": "\n.search-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.search-001 * { box-sizing: border-box; }\n.search-001 .muted { color: #64748b; }\n.search-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.search-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "search-001"
  },
  {
    "id": "search-002",
    "title": "Search 2",
    "category": "search",
    "description": "Search layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "search",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"search-002\" style=\"grid-template-columns:1fr .92fr;gap:10px\"><div style=\"display:grid;gap:8px\"><strong style=\"font-size:16px\">Universal search</strong><span class=\"muted\" style=\"font-size:12px\">Command-style search with cleaner result grouping.</span><div style=\"display:flex;gap:8px\"><span class=\"pill\">/</span><span class=\"ghost\">Shortcut</span></div></div><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><div style=\"height:36px;border-radius:12px;background:#fff;border:1px solid #c7d2fe\"></div><div style=\"display:grid;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe\"></span></div></div></div>",
    "cssCode": "\n.search-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.search-002 * { box-sizing: border-box; }\n.search-002 .muted { color: #64748b; }\n.search-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.search-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "search-002"
  },
  {
    "id": "search-003",
    "title": "Search 3",
    "category": "search",
    "description": "Search layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "search",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"search-003\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:13px\">Search overlay</strong><span class=\"pill\">3 results</span></div><div style=\"height:38px;border-radius:12px;background:#fff;border:1px solid #a7f3d0\"></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:8px\"><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #a7f3d0;font-size:11px;font-weight:700\">UI</div><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #a7f3d0;font-size:11px;font-weight:700\">Docs</div><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #a7f3d0;font-size:11px;font-weight:700\">Templates</div></div></div></div>",
    "cssCode": "\n.search-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.search-003 * { box-sizing: border-box; }\n.search-003 .muted { color: #64748b; }\n.search-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.search-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "search-003"
  },
  {
    "id": "search-004",
    "title": "Search 4",
    "category": "search",
    "description": "Search layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "search",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"search-004\"><div style=\"height:42px;border-radius:14px;border:1px solid #fecdd3;display:flex;align-items:center;padding:0 12px;background:#fff;color:#94a3b8;font-size:12px\">Search components, templates, and docs</div><div style=\"display:grid;gap:8px\"><div class=\"surface\" style=\"padding:10px;display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Result item</span><span class=\"pill\">Open</span></div><div class=\"surface\" style=\"padding:10px;display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Result item</span><span class=\"pill\">Open</span></div><div class=\"surface\" style=\"padding:10px;display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Result item</span><span class=\"pill\">Open</span></div></div></div>",
    "cssCode": "\n.search-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.search-004 * { box-sizing: border-box; }\n.search-004 .muted { color: #64748b; }\n.search-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.search-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "search-004"
  },
  {
    "id": "search-005",
    "title": "Search 5",
    "category": "search",
    "description": "Search layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "search",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"search-005\" style=\"grid-template-columns:1fr .92fr;gap:10px\"><div style=\"display:grid;gap:8px\"><strong style=\"font-size:16px\">Universal search</strong><span class=\"muted\" style=\"font-size:12px\">Command-style search with cleaner result grouping.</span><div style=\"display:flex;gap:8px\"><span class=\"pill\">/</span><span class=\"ghost\">Shortcut</span></div></div><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><div style=\"height:36px;border-radius:12px;background:#fff;border:1px solid #fde68a\"></div><div style=\"display:grid;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a\"></span></div></div></div>",
    "cssCode": "\n.search-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.search-005 * { box-sizing: border-box; }\n.search-005 .muted { color: #64748b; }\n.search-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.search-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "search-005"
  },
  {
    "id": "search-006",
    "title": "Search 6",
    "category": "search",
    "description": "Search layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "search",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"search-006\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:13px\">Search overlay</strong><span class=\"pill\">3 results</span></div><div style=\"height:38px;border-radius:12px;background:#fff;border:1px solid #bae6fd\"></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:8px\"><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #bae6fd;font-size:11px;font-weight:700\">UI</div><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #bae6fd;font-size:11px;font-weight:700\">Docs</div><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #bae6fd;font-size:11px;font-weight:700\">Templates</div></div></div></div>",
    "cssCode": "\n.search-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.search-006 * { box-sizing: border-box; }\n.search-006 .muted { color: #64748b; }\n.search-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.search-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "search-006"
  },
  {
    "id": "search-007",
    "title": "Search 7",
    "category": "search",
    "description": "Search layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "search",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"search-007\"><div style=\"height:42px;border-radius:14px;border:1px solid #cbd5e1;display:flex;align-items:center;padding:0 12px;background:#fff;color:#94a3b8;font-size:12px\">Search components, templates, and docs</div><div style=\"display:grid;gap:8px\"><div class=\"surface\" style=\"padding:10px;display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Result item</span><span class=\"pill\">Open</span></div><div class=\"surface\" style=\"padding:10px;display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Result item</span><span class=\"pill\">Open</span></div><div class=\"surface\" style=\"padding:10px;display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Result item</span><span class=\"pill\">Open</span></div></div></div>",
    "cssCode": "\n.search-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.search-007 * { box-sizing: border-box; }\n.search-007 .muted { color: #64748b; }\n.search-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.search-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "search-007"
  },
  {
    "id": "search-008",
    "title": "Search 8",
    "category": "search",
    "description": "Search layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "search",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"search-008\" style=\"grid-template-columns:1fr .92fr;gap:10px\"><div style=\"display:grid;gap:8px\"><strong style=\"font-size:16px\">Universal search</strong><span class=\"muted\" style=\"font-size:12px\">Command-style search with cleaner result grouping.</span><div style=\"display:flex;gap:8px\"><span class=\"pill\">/</span><span class=\"ghost\">Shortcut</span></div></div><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><div style=\"height:36px;border-radius:12px;background:#fff;border:1px solid #c7d2fe\"></div><div style=\"display:grid;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #c7d2fe\"></span></div></div></div>",
    "cssCode": "\n.search-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.search-008 * { box-sizing: border-box; }\n.search-008 .muted { color: #64748b; }\n.search-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.search-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "search-008"
  },
  {
    "id": "search-009",
    "title": "Search 9",
    "category": "search",
    "description": "Search layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "search",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"search-009\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:13px\">Search overlay</strong><span class=\"pill\">3 results</span></div><div style=\"height:38px;border-radius:12px;background:#fff;border:1px solid #a7f3d0\"></div><div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:8px\"><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #a7f3d0;font-size:11px;font-weight:700\">UI</div><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #a7f3d0;font-size:11px;font-weight:700\">Docs</div><div style=\"padding:10px;border-radius:12px;background:#fff;border:1px solid #a7f3d0;font-size:11px;font-weight:700\">Templates</div></div></div></div>",
    "cssCode": "\n.search-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.search-009 * { box-sizing: border-box; }\n.search-009 .muted { color: #64748b; }\n.search-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.search-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "search-009"
  },
  {
    "id": "search-010",
    "title": "Search 10",
    "category": "search",
    "description": "Search layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "search",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"search-010\"><div style=\"height:42px;border-radius:14px;border:1px solid #fecdd3;display:flex;align-items:center;padding:0 12px;background:#fff;color:#94a3b8;font-size:12px\">Search components, templates, and docs</div><div style=\"display:grid;gap:8px\"><div class=\"surface\" style=\"padding:10px;display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Result item</span><span class=\"pill\">Open</span></div><div class=\"surface\" style=\"padding:10px;display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Result item</span><span class=\"pill\">Open</span></div><div class=\"surface\" style=\"padding:10px;display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Result item</span><span class=\"pill\">Open</span></div></div></div>",
    "cssCode": "\n.search-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.search-010 * { box-sizing: border-box; }\n.search-010 .muted { color: #64748b; }\n.search-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.search-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "search-010"
  },
  {
    "id": "search-011",
    "title": "Search 11",
    "category": "search",
    "description": "Search layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "search",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"search-011\" style=\"grid-template-columns:1fr .92fr;gap:10px\"><div style=\"display:grid;gap:8px\"><strong style=\"font-size:16px\">Universal search</strong><span class=\"muted\" style=\"font-size:12px\">Command-style search with cleaner result grouping.</span><div style=\"display:flex;gap:8px\"><span class=\"pill\">/</span><span class=\"ghost\">Shortcut</span></div></div><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><div style=\"height:36px;border-radius:12px;background:#fff;border:1px solid #fde68a\"></div><div style=\"display:grid;gap:6px\"><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a\"></span><span style=\"height:18px;border-radius:8px;background:#fff;border:1px solid #fde68a\"></span></div></div></div>",
    "cssCode": "\n.search-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.search-011 * { box-sizing: border-box; }\n.search-011 .muted { color: #64748b; }\n.search-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.search-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.search-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "search-011"
  },
  {
    "id": "filter-001",
    "title": "Filter 1",
    "category": "filter",
    "description": "Filter layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "filter",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"filter-001\"><div style=\"display:flex;gap:8px;flex-wrap:wrap\"><span class=\"primary\">All</span><span class=\"ghost\">Popular</span><span class=\"ghost\">New</span><span class=\"ghost\">Free</span></div><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Filter row</span><span style=\"width:34px;height:20px;border-radius:999px;background:#f8fafc;display:block;border:1px solid #cbd5e1\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Filter row</span><span style=\"width:34px;height:20px;border-radius:999px;background:#f8fafc;display:block;border:1px solid #cbd5e1\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Filter row</span><span style=\"width:34px;height:20px;border-radius:999px;background:#f8fafc;display:block;border:1px solid #cbd5e1\"></span></div></div></div>",
    "cssCode": "\n.filter-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.filter-001 * { box-sizing: border-box; }\n.filter-001 .muted { color: #64748b; }\n.filter-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.filter-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "filter-001"
  },
  {
    "id": "filter-002",
    "title": "Filter 2",
    "category": "filter",
    "description": "Filter layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "filter",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"filter-002\" style=\"grid-template-columns:.88fr 1.12fr;gap:10px\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:8px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px;font-weight:700\">Price</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff;border:1px solid #c7d2fe;display:block\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px;font-weight:700\">Category</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff;border:1px solid #c7d2fe;display:block\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px;font-weight:700\">Platform</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff;border:1px solid #c7d2fe;display:block\"></span></div></div><div style=\"display:grid;gap:8px\"><div style=\"display:flex;gap:8px;flex-wrap:wrap\"><span class=\"ghost\">UI</span><span class=\"primary\">CSS</span><span class=\"ghost\">React</span></div><div class=\"surface\" style=\"padding:12px;height:100%\"><div style=\"height:18px;border-radius:999px;background:#6366f1;opacity:.16\"></div><div style=\"margin-top:10px;display:grid;gap:6px\"><span style=\"height:16px;border-radius:8px;background:#fff;border:1px solid #c7d2fe\"></span><span style=\"height:16px;border-radius:8px;background:#fff;border:1px solid #c7d2fe\"></span><span style=\"height:16px;border-radius:8px;background:#fff;border:1px solid #c7d2fe\"></span></div></div></div></div>",
    "cssCode": "\n.filter-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.filter-002 * { box-sizing: border-box; }\n.filter-002 .muted { color: #64748b; }\n.filter-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.filter-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "filter-002"
  },
  {
    "id": "filter-003",
    "title": "Filter 3",
    "category": "filter",
    "description": "Filter layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "filter",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"filter-003\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:13px\">Active filters</strong><span class=\"ghost\">Reset</span></div><div style=\"display:flex;gap:8px;flex-wrap:wrap\"><span class=\"primary\">SaaS</span><span class=\"primary\">Minimal</span><span class=\"ghost\">Free</span><span class=\"ghost\">Tailwind</span></div><div style=\"height:18px;border-radius:999px;background:#10b981;opacity:.1\"></div></div></div>",
    "cssCode": "\n.filter-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.filter-003 * { box-sizing: border-box; }\n.filter-003 .muted { color: #64748b; }\n.filter-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.filter-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "filter-003"
  },
  {
    "id": "filter-004",
    "title": "Filter 4",
    "category": "filter",
    "description": "Filter layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "filter",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"filter-004\"><div style=\"display:flex;gap:8px;flex-wrap:wrap\"><span class=\"primary\">All</span><span class=\"ghost\">Popular</span><span class=\"ghost\">New</span><span class=\"ghost\">Free</span></div><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Filter row</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff1f2;display:block;border:1px solid #fecdd3\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Filter row</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff1f2;display:block;border:1px solid #fecdd3\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Filter row</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff1f2;display:block;border:1px solid #fecdd3\"></span></div></div></div>",
    "cssCode": "\n.filter-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.filter-004 * { box-sizing: border-box; }\n.filter-004 .muted { color: #64748b; }\n.filter-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.filter-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "filter-004"
  },
  {
    "id": "filter-005",
    "title": "Filter 5",
    "category": "filter",
    "description": "Filter layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "filter",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"filter-005\" style=\"grid-template-columns:.88fr 1.12fr;gap:10px\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:8px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px;font-weight:700\">Price</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff;border:1px solid #fde68a;display:block\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px;font-weight:700\">Category</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff;border:1px solid #fde68a;display:block\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px;font-weight:700\">Platform</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff;border:1px solid #fde68a;display:block\"></span></div></div><div style=\"display:grid;gap:8px\"><div style=\"display:flex;gap:8px;flex-wrap:wrap\"><span class=\"ghost\">UI</span><span class=\"primary\">CSS</span><span class=\"ghost\">React</span></div><div class=\"surface\" style=\"padding:12px;height:100%\"><div style=\"height:18px;border-radius:999px;background:#f59e0b;opacity:.16\"></div><div style=\"margin-top:10px;display:grid;gap:6px\"><span style=\"height:16px;border-radius:8px;background:#fff;border:1px solid #fde68a\"></span><span style=\"height:16px;border-radius:8px;background:#fff;border:1px solid #fde68a\"></span><span style=\"height:16px;border-radius:8px;background:#fff;border:1px solid #fde68a\"></span></div></div></div></div>",
    "cssCode": "\n.filter-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.filter-005 * { box-sizing: border-box; }\n.filter-005 .muted { color: #64748b; }\n.filter-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.filter-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "filter-005"
  },
  {
    "id": "filter-006",
    "title": "Filter 6",
    "category": "filter",
    "description": "Filter layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "filter",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"filter-006\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:13px\">Active filters</strong><span class=\"ghost\">Reset</span></div><div style=\"display:flex;gap:8px;flex-wrap:wrap\"><span class=\"primary\">SaaS</span><span class=\"primary\">Minimal</span><span class=\"ghost\">Free</span><span class=\"ghost\">Tailwind</span></div><div style=\"height:18px;border-radius:999px;background:#0ea5e9;opacity:.1\"></div></div></div>",
    "cssCode": "\n.filter-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.filter-006 * { box-sizing: border-box; }\n.filter-006 .muted { color: #64748b; }\n.filter-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.filter-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "filter-006"
  },
  {
    "id": "filter-007",
    "title": "Filter 7",
    "category": "filter",
    "description": "Filter layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "filter",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"filter-007\"><div style=\"display:flex;gap:8px;flex-wrap:wrap\"><span class=\"primary\">All</span><span class=\"ghost\">Popular</span><span class=\"ghost\">New</span><span class=\"ghost\">Free</span></div><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Filter row</span><span style=\"width:34px;height:20px;border-radius:999px;background:#f8fafc;display:block;border:1px solid #cbd5e1\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Filter row</span><span style=\"width:34px;height:20px;border-radius:999px;background:#f8fafc;display:block;border:1px solid #cbd5e1\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Filter row</span><span style=\"width:34px;height:20px;border-radius:999px;background:#f8fafc;display:block;border:1px solid #cbd5e1\"></span></div></div></div>",
    "cssCode": "\n.filter-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.filter-007 * { box-sizing: border-box; }\n.filter-007 .muted { color: #64748b; }\n.filter-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.filter-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "filter-007"
  },
  {
    "id": "filter-008",
    "title": "Filter 8",
    "category": "filter",
    "description": "Filter layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "filter",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"filter-008\" style=\"grid-template-columns:.88fr 1.12fr;gap:10px\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:8px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px;font-weight:700\">Price</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff;border:1px solid #c7d2fe;display:block\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px;font-weight:700\">Category</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff;border:1px solid #c7d2fe;display:block\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px;font-weight:700\">Platform</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff;border:1px solid #c7d2fe;display:block\"></span></div></div><div style=\"display:grid;gap:8px\"><div style=\"display:flex;gap:8px;flex-wrap:wrap\"><span class=\"ghost\">UI</span><span class=\"primary\">CSS</span><span class=\"ghost\">React</span></div><div class=\"surface\" style=\"padding:12px;height:100%\"><div style=\"height:18px;border-radius:999px;background:#6366f1;opacity:.16\"></div><div style=\"margin-top:10px;display:grid;gap:6px\"><span style=\"height:16px;border-radius:8px;background:#fff;border:1px solid #c7d2fe\"></span><span style=\"height:16px;border-radius:8px;background:#fff;border:1px solid #c7d2fe\"></span><span style=\"height:16px;border-radius:8px;background:#fff;border:1px solid #c7d2fe\"></span></div></div></div></div>",
    "cssCode": "\n.filter-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.filter-008 * { box-sizing: border-box; }\n.filter-008 .muted { color: #64748b; }\n.filter-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.filter-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "filter-008"
  },
  {
    "id": "filter-009",
    "title": "Filter 9",
    "category": "filter",
    "description": "Filter layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "filter",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"filter-009\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:13px\">Active filters</strong><span class=\"ghost\">Reset</span></div><div style=\"display:flex;gap:8px;flex-wrap:wrap\"><span class=\"primary\">SaaS</span><span class=\"primary\">Minimal</span><span class=\"ghost\">Free</span><span class=\"ghost\">Tailwind</span></div><div style=\"height:18px;border-radius:999px;background:#10b981;opacity:.1\"></div></div></div>",
    "cssCode": "\n.filter-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.filter-009 * { box-sizing: border-box; }\n.filter-009 .muted { color: #64748b; }\n.filter-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.filter-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "filter-009"
  },
  {
    "id": "filter-010",
    "title": "Filter 10",
    "category": "filter",
    "description": "Filter layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "filter",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"filter-010\"><div style=\"display:flex;gap:8px;flex-wrap:wrap\"><span class=\"primary\">All</span><span class=\"ghost\">Popular</span><span class=\"ghost\">New</span><span class=\"ghost\">Free</span></div><div class=\"surface\" style=\"padding:10px;display:grid;gap:8px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Filter row</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff1f2;display:block;border:1px solid #fecdd3\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Filter row</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff1f2;display:block;border:1px solid #fecdd3\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px\">Filter row</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff1f2;display:block;border:1px solid #fecdd3\"></span></div></div></div>",
    "cssCode": "\n.filter-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.filter-010 * { box-sizing: border-box; }\n.filter-010 .muted { color: #64748b; }\n.filter-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.filter-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "filter-010"
  },
  {
    "id": "filter-011",
    "title": "Filter 11",
    "category": "filter",
    "description": "Filter layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "filter",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"filter-011\" style=\"grid-template-columns:.88fr 1.12fr;gap:10px\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:8px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px;font-weight:700\">Price</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff;border:1px solid #fde68a;display:block\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px;font-weight:700\">Category</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff;border:1px solid #fde68a;display:block\"></span></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span style=\"font-size:12px;font-weight:700\">Platform</span><span style=\"width:34px;height:20px;border-radius:999px;background:#fff;border:1px solid #fde68a;display:block\"></span></div></div><div style=\"display:grid;gap:8px\"><div style=\"display:flex;gap:8px;flex-wrap:wrap\"><span class=\"ghost\">UI</span><span class=\"primary\">CSS</span><span class=\"ghost\">React</span></div><div class=\"surface\" style=\"padding:12px;height:100%\"><div style=\"height:18px;border-radius:999px;background:#f59e0b;opacity:.16\"></div><div style=\"margin-top:10px;display:grid;gap:6px\"><span style=\"height:16px;border-radius:8px;background:#fff;border:1px solid #fde68a\"></span><span style=\"height:16px;border-radius:8px;background:#fff;border:1px solid #fde68a\"></span><span style=\"height:16px;border-radius:8px;background:#fff;border:1px solid #fde68a\"></span></div></div></div></div>",
    "cssCode": "\n.filter-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.filter-011 * { box-sizing: border-box; }\n.filter-011 .muted { color: #64748b; }\n.filter-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.filter-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.filter-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "filter-011"
  },
  {
    "id": "ecommerce-001",
    "title": "Commerce 1",
    "category": "ecommerce",
    "description": "Commerce layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "ecommerce",
      "slate",
      "variant-1",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"ecommerce-001\"><div class=\"surface\" style=\"padding:10px;display:grid;grid-template-columns:74px 1fr;gap:10px;align-items:center\"><div style=\"height:72px;border-radius:12px;background:linear-gradient(135deg,color-mix(in srgb, #4f46e5 20%, white),color-mix(in srgb, #0f172a 18%, white));border:1px solid #cbd5e1\"></div><div><div style=\"font-weight:800;font-size:14px\">Premium Sneakers</div><div class=\"muted\" style=\"font-size:12px;margin-top:4px\">$129.00</div><div style=\"margin-top:8px;display:flex;gap:8px\"><span class=\"primary\">Add</span><span class=\"ghost\">View</span></div></div></div></div>",
    "cssCode": "\n.ecommerce-001 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.ecommerce-001 * { box-sizing: border-box; }\n.ecommerce-001 .muted { color: #64748b; }\n.ecommerce-001 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-001 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-001 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-001 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.ecommerce-001 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "ecommerce-001"
  },
  {
    "id": "ecommerce-002",
    "title": "Commerce 2",
    "category": "ecommerce",
    "description": "Commerce layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "ecommerce",
      "indigo",
      "variant-2",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"ecommerce-002\" style=\"grid-template-columns:.96fr 1.04fr;gap:10px\"><div class=\"surface\" style=\"min-height:144px;display:grid;place-items:center;background:linear-gradient(145deg,color-mix(in srgb, #6366f1 18%, white),#fff)\"><div style=\"width:74px;height:74px;border-radius:24px;background:#3730a3;opacity:.12\"></div></div><div style=\"display:grid;gap:8px;align-content:center\"><span class=\"pill\">New arrival</span><strong style=\"font-size:16px\">Shop-ready product spotlight</strong><span class=\"muted\" style=\"font-size:12px\">A stronger ecommerce snippet with product emphasis and action.</span><div style=\"display:flex;gap:8px\"><span class=\"primary\">Buy now</span><span class=\"ghost\">Wishlist</span></div></div></div>",
    "cssCode": "\n.ecommerce-002 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.ecommerce-002 * { box-sizing: border-box; }\n.ecommerce-002 .muted { color: #64748b; }\n.ecommerce-002 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-002 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-002 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-002 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.ecommerce-002 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "ecommerce-002"
  },
  {
    "id": "ecommerce-003",
    "title": "Commerce 3",
    "category": "ecommerce",
    "description": "Commerce layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "ecommerce",
      "emerald",
      "variant-3",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"ecommerce-003\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:13px\">Cart summary</strong><span class=\"pill\">2 items</span></div><div style=\"display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center\"><div style=\"width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb, #10b981 18%, white),#fff);border:1px solid #a7f3d0\"></div><div><div style=\"font-size:12px;font-weight:700\">Canvas Sneaker</div><div class=\"muted\" style=\"font-size:11px;margin-top:4px\">Qty 1</div></div><div style=\"font-size:12px;font-weight:800\">$96</div></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span class=\"ghost\">Details</span><span class=\"primary\">Checkout</span></div></div></div>",
    "cssCode": "\n.ecommerce-003 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.ecommerce-003 * { box-sizing: border-box; }\n.ecommerce-003 .muted { color: #64748b; }\n.ecommerce-003 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-003 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-003 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-003 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.ecommerce-003 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "ecommerce-003"
  },
  {
    "id": "ecommerce-004",
    "title": "Commerce 4",
    "category": "ecommerce",
    "description": "Commerce layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "ecommerce",
      "rose",
      "variant-4",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"ecommerce-004\"><div class=\"surface\" style=\"padding:10px;display:grid;grid-template-columns:74px 1fr;gap:10px;align-items:center\"><div style=\"height:72px;border-radius:12px;background:linear-gradient(135deg,color-mix(in srgb, #f43f5e 20%, white),color-mix(in srgb, #9f1239 18%, white));border:1px solid #fecdd3\"></div><div><div style=\"font-weight:800;font-size:14px\">Premium Sneakers</div><div class=\"muted\" style=\"font-size:12px;margin-top:4px\">$129.00</div><div style=\"margin-top:8px;display:flex;gap:8px\"><span class=\"primary\">Add</span><span class=\"ghost\">View</span></div></div></div></div>",
    "cssCode": "\n.ecommerce-004 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.ecommerce-004 * { box-sizing: border-box; }\n.ecommerce-004 .muted { color: #64748b; }\n.ecommerce-004 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-004 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-004 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-004 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.ecommerce-004 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "ecommerce-004"
  },
  {
    "id": "ecommerce-005",
    "title": "Commerce 5",
    "category": "ecommerce",
    "description": "Commerce layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "ecommerce",
      "amber",
      "variant-5",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"ecommerce-005\" style=\"grid-template-columns:.96fr 1.04fr;gap:10px\"><div class=\"surface\" style=\"min-height:144px;display:grid;place-items:center;background:linear-gradient(145deg,color-mix(in srgb, #f59e0b 18%, white),#fff)\"><div style=\"width:74px;height:74px;border-radius:24px;background:#92400e;opacity:.12\"></div></div><div style=\"display:grid;gap:8px;align-content:center\"><span class=\"pill\">New arrival</span><strong style=\"font-size:16px\">Shop-ready product spotlight</strong><span class=\"muted\" style=\"font-size:12px\">A stronger ecommerce snippet with product emphasis and action.</span><div style=\"display:flex;gap:8px\"><span class=\"primary\">Buy now</span><span class=\"ghost\">Wishlist</span></div></div></div>",
    "cssCode": "\n.ecommerce-005 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.ecommerce-005 * { box-sizing: border-box; }\n.ecommerce-005 .muted { color: #64748b; }\n.ecommerce-005 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-005 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-005 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-005 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.ecommerce-005 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "ecommerce-005"
  },
  {
    "id": "ecommerce-006",
    "title": "Commerce 6",
    "category": "ecommerce",
    "description": "Commerce layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "ecommerce",
      "sky",
      "variant-6",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"ecommerce-006\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:13px\">Cart summary</strong><span class=\"pill\">2 items</span></div><div style=\"display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center\"><div style=\"width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb, #0ea5e9 18%, white),#fff);border:1px solid #bae6fd\"></div><div><div style=\"font-size:12px;font-weight:700\">Canvas Sneaker</div><div class=\"muted\" style=\"font-size:11px;margin-top:4px\">Qty 1</div></div><div style=\"font-size:12px;font-weight:800\">$96</div></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span class=\"ghost\">Details</span><span class=\"primary\">Checkout</span></div></div></div>",
    "cssCode": "\n.ecommerce-006 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #bae6fd;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.ecommerce-006 * { box-sizing: border-box; }\n.ecommerce-006 .muted { color: #64748b; }\n.ecommerce-006 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-006 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #075985;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-006 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #bae6fd;\n  background: #fff;\n  color: #075985;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-006 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #0ea5e9;\n}\n.ecommerce-006 .surface {\n  border: 1px solid #bae6fd;\n  background: #f0f9ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "ecommerce-006"
  },
  {
    "id": "ecommerce-007",
    "title": "Commerce 7",
    "category": "ecommerce",
    "description": "Commerce layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "ecommerce",
      "slate",
      "variant-7",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"ecommerce-007\"><div class=\"surface\" style=\"padding:10px;display:grid;grid-template-columns:74px 1fr;gap:10px;align-items:center\"><div style=\"height:72px;border-radius:12px;background:linear-gradient(135deg,color-mix(in srgb, #4f46e5 20%, white),color-mix(in srgb, #0f172a 18%, white));border:1px solid #cbd5e1\"></div><div><div style=\"font-weight:800;font-size:14px\">Premium Sneakers</div><div class=\"muted\" style=\"font-size:12px;margin-top:4px\">$129.00</div><div style=\"margin-top:8px;display:flex;gap:8px\"><span class=\"primary\">Add</span><span class=\"ghost\">View</span></div></div></div></div>",
    "cssCode": "\n.ecommerce-007 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.ecommerce-007 * { box-sizing: border-box; }\n.ecommerce-007 .muted { color: #64748b; }\n.ecommerce-007 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-007 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-007 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #cbd5e1;\n  background: #fff;\n  color: #0f172a;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-007 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #4f46e5;\n}\n.ecommerce-007 .surface {\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  border-radius: 14px;\n}\n",
    "previewClass": "ecommerce-007"
  },
  {
    "id": "ecommerce-008",
    "title": "Commerce 8",
    "category": "ecommerce",
    "description": "Commerce layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "ecommerce",
      "indigo",
      "variant-8",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"ecommerce-008\" style=\"grid-template-columns:.96fr 1.04fr;gap:10px\"><div class=\"surface\" style=\"min-height:144px;display:grid;place-items:center;background:linear-gradient(145deg,color-mix(in srgb, #6366f1 18%, white),#fff)\"><div style=\"width:74px;height:74px;border-radius:24px;background:#3730a3;opacity:.12\"></div></div><div style=\"display:grid;gap:8px;align-content:center\"><span class=\"pill\">New arrival</span><strong style=\"font-size:16px\">Shop-ready product spotlight</strong><span class=\"muted\" style=\"font-size:12px\">A stronger ecommerce snippet with product emphasis and action.</span><div style=\"display:flex;gap:8px\"><span class=\"primary\">Buy now</span><span class=\"ghost\">Wishlist</span></div></div></div>",
    "cssCode": "\n.ecommerce-008 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #c7d2fe;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.ecommerce-008 * { box-sizing: border-box; }\n.ecommerce-008 .muted { color: #64748b; }\n.ecommerce-008 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-008 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #3730a3;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-008 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #c7d2fe;\n  background: #fff;\n  color: #3730a3;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-008 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #6366f1;\n}\n.ecommerce-008 .surface {\n  border: 1px solid #c7d2fe;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n",
    "previewClass": "ecommerce-008"
  },
  {
    "id": "ecommerce-009",
    "title": "Commerce 9",
    "category": "ecommerce",
    "description": "Commerce layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "ecommerce",
      "emerald",
      "variant-9",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"ecommerce-009\"><div class=\"surface\" style=\"padding:12px;display:grid;gap:10px\"><div style=\"display:flex;justify-content:space-between;align-items:center\"><strong style=\"font-size:13px\">Cart summary</strong><span class=\"pill\">2 items</span></div><div style=\"display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center\"><div style=\"width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb, #10b981 18%, white),#fff);border:1px solid #a7f3d0\"></div><div><div style=\"font-size:12px;font-weight:700\">Canvas Sneaker</div><div class=\"muted\" style=\"font-size:11px;margin-top:4px\">Qty 1</div></div><div style=\"font-size:12px;font-weight:800\">$96</div></div><div style=\"display:flex;justify-content:space-between;align-items:center\"><span class=\"ghost\">Details</span><span class=\"primary\">Checkout</span></div></div></div>",
    "cssCode": "\n.ecommerce-009 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #a7f3d0;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.ecommerce-009 * { box-sizing: border-box; }\n.ecommerce-009 .muted { color: #64748b; }\n.ecommerce-009 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-009 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #065f46;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-009 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #a7f3d0;\n  background: #fff;\n  color: #065f46;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-009 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #10b981;\n}\n.ecommerce-009 .surface {\n  border: 1px solid #a7f3d0;\n  background: #ecfdf5;\n  border-radius: 14px;\n}\n",
    "previewClass": "ecommerce-009"
  },
  {
    "id": "ecommerce-010",
    "title": "Commerce 10",
    "category": "ecommerce",
    "description": "Commerce layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "ecommerce",
      "rose",
      "variant-10",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"ecommerce-010\"><div class=\"surface\" style=\"padding:10px;display:grid;grid-template-columns:74px 1fr;gap:10px;align-items:center\"><div style=\"height:72px;border-radius:12px;background:linear-gradient(135deg,color-mix(in srgb, #f43f5e 20%, white),color-mix(in srgb, #9f1239 18%, white));border:1px solid #fecdd3\"></div><div><div style=\"font-weight:800;font-size:14px\">Premium Sneakers</div><div class=\"muted\" style=\"font-size:12px;margin-top:4px\">$129.00</div><div style=\"margin-top:8px;display:flex;gap:8px\"><span class=\"primary\">Add</span><span class=\"ghost\">View</span></div></div></div></div>",
    "cssCode": "\n.ecommerce-010 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fecdd3;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.ecommerce-010 * { box-sizing: border-box; }\n.ecommerce-010 .muted { color: #64748b; }\n.ecommerce-010 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-010 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #9f1239;\n  color: #ffffff;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-010 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fecdd3;\n  background: #fff;\n  color: #9f1239;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-010 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f43f5e;\n}\n.ecommerce-010 .surface {\n  border: 1px solid #fecdd3;\n  background: #fff1f2;\n  border-radius: 14px;\n}\n",
    "previewClass": "ecommerce-010"
  },
  {
    "id": "ecommerce-011",
    "title": "Commerce 11",
    "category": "ecommerce",
    "description": "Commerce layout for modern websites, SaaS products, ecommerce flows, and high-conversion landing pages.",
    "tags": [
      "ecommerce",
      "amber",
      "variant-11",
      "modern",
      "popular"
    ],
    "htmlCode": "<div class=\"ecommerce-011\" style=\"grid-template-columns:.96fr 1.04fr;gap:10px\"><div class=\"surface\" style=\"min-height:144px;display:grid;place-items:center;background:linear-gradient(145deg,color-mix(in srgb, #f59e0b 18%, white),#fff)\"><div style=\"width:74px;height:74px;border-radius:24px;background:#92400e;opacity:.12\"></div></div><div style=\"display:grid;gap:8px;align-content:center\"><span class=\"pill\">New arrival</span><strong style=\"font-size:16px\">Shop-ready product spotlight</strong><span class=\"muted\" style=\"font-size:12px\">A stronger ecommerce snippet with product emphasis and action.</span><div style=\"display:flex;gap:8px\"><span class=\"primary\">Buy now</span><span class=\"ghost\">Wishlist</span></div></div></div>",
    "cssCode": "\n.ecommerce-011 {\n  width: 100%;\n  max-width: 380px;\n  min-height: 150px;\n  padding: 14px;\n  border-radius: 16px;\n  border: 1px solid #fde68a;\n  background: #ffffff;\n  color: #0f172a;\n  font-family: Inter, system-ui, sans-serif;\n  display: grid;\n  gap: 10px;\n}\n.ecommerce-011 * { box-sizing: border-box; }\n.ecommerce-011 .muted { color: #64748b; }\n.ecommerce-011 .pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-011 .primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  background: #92400e;\n  color: #111827;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-011 .ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 10px;\n  border: 1px solid #fde68a;\n  background: #fff;\n  color: #92400e;\n  font: 700 12px/1 Inter, system-ui, sans-serif;\n}\n.ecommerce-011 .chip {\n  height: 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n}\n.ecommerce-011 .surface {\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 14px;\n}\n",
    "previewClass": "ecommerce-011"
  }
]
