# Design System: The Curated Void

## 1. Overview & Creative North Star
The "Creative North Star" for this design system is **The Curated Void**. In a marketplace saturated with visual noise, this system acts as a high-end gallery space—a silent, sophisticated backdrop that recedes to let the digital assets take center stage. 

We are moving away from "template" design. Instead of rigid boxes and heavy dividers, we use **Architectural Asymmetry** and **Tonal Depth**. By leveraging expansive white space (or "dark space" in this context) and intentional overlapping of elements, we create a layout that feels editorial and bespoke. The goal is not just to show a product, but to frame it as an object of desire.

---

## 2. Colors & Surface Philosophy
This system is built on a foundation of neutral sophistication. We avoid the "tech-bro" purple-and-neon aesthetic in favor of a palette that feels like high-end stationery or a luxury automotive interior.

### The "No-Line" Rule
Standard UI relies on 1px solid borders to separate sections. **We prohibit this.** Boundaries must be defined through:
*   **Background Shifts:** Moving from `surface` (#0e0e0e) to `surface_container_low` (#131313).
*   **Tonal Transitions:** Using subtle variations in the container tiers to imply edge without drawing a line.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials. 
*   **Background:** `surface` (#0e0e0e) is your floor.
*   **Sectioning:** Use `surface_container` (#191a1a) for broad layout blocks.
*   **Interaction/Cards:** Use `surface_container_high` (#1f2020) or `highest` (#252626) to bring items closer to the user.
*   **Nesting:** An inner container should always be one tier higher or lower than its parent to create "nested" depth.

### The "Glass & Gradient" Rule
To add soul to the interface:
*   **Glassmorphism:** For floating navigation or modal overlays, use `surface_container` with a 20-30px backdrop-blur and 60% opacity. This prevents the UI from feeling "pasted on" and integrates it with the content beneath.
*   **Signature Textures:** For main CTAs, do not use flat colors. Use a subtle linear gradient from `primary` (#c6c6c7) to `primary_dim` (#b8b9b9) at a 45-degree angle. It adds a metallic, premium sheen that feels tactile.

---

## 3. Typography: The Editorial Voice
We use a dual-font strategy to balance character with readability.

*   **Display & Headlines (Manrope):** This is our "Editorial" voice. Use `display-lg` to `headline-sm` for high-impact areas. These should be set with tighter letter-spacing (-0.02em) to feel authoritative and dense.
*   **Body & Labels (Inter):** This is our "Utility" voice. `body-md` and `label-sm` are optimized for high legibility. 

**Hierarchy Tip:** Contrast is key. Pair a `display-md` headline with a `label-md` (All Caps, +0.05em tracking) for a "luxury magazine" look.

---

## 4. Elevation & Depth
In this design system, shadows are an atmospheric choice, not a structural one.

*   **Tonal Layering:** 90% of your hierarchy should be achieved by stacking `surface-container` tiers. A `surface_container_highest` card on a `surface` background provides all the "lift" needed.
*   **Ambient Shadows:** If a floating element (like a dropdown) requires a shadow, use a large blur (30px+) and low opacity (6% of `on_surface`). The shadow should feel like a soft glow of light being blocked, not a black smudge.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use the `outline_variant` (#484848) at **20% opacity**. This creates a "Ghost Border" that is felt rather than seen.

---

## 5. Components

### Marketplace Cards (The Hero Component)
*   **Structure:** No borders. No dividers.
*   **Image:** Use the `md` (0.375rem) or `lg` (0.5rem) corner radius.
*   **Metadata:** Use `label-sm` for categories. Badges should use `surface_container_highest` with `on_surface_variant` text—never high-contrast "pills."
*   **Spacing:** Use `3` (1rem) for internal padding and `6` (2rem) for grid gaps to allow the assets to "breathe."

### Buttons
*   **Primary:** Gradient from `primary` to `primary_dim`. Text color: `on_primary`. Radius: `md`.
*   **Secondary:** `surface_container_highest` background with a "Ghost Border."
*   **Tertiary:** No background. `label-md` weight. Underline only on hover.

### Input Fields
*   **State:** Default state is `surface_container_low`. 
*   **Focus:** Transition background to `surface_container_high` and add a `primary` "Ghost Border" at 40% opacity.
*   **Layout:** Labels should be `label-sm` and positioned 0.5rem above the input, never inside.

### Visual-First Lists
*   Forbid the use of divider lines. 
*   Separate list items using `spacing.2` (0.7rem) of vertical whitespace. 
*   On hover, change the background of the item to `surface_container_low` with a soft transition (200ms ease-out).

---

## 6. Do’s and Don'ts

### Do:
*   **Embrace Negative Space:** If a section feels "empty," it’s likely working. Don't fill it with lines or boxes.
*   **Use Asymmetric Grids:** Shift a headline slightly to the left of the main content column to create an editorial feel.
*   **Prioritize Imagery:** The system is a frame. Ensure images are high-resolution and color-graded to match the neutral palette.

### Don’t:
*   **Don't use pure black (#000) for backgrounds:** Use `surface` (#0e0e0e) to maintain a soft, premium "ink" look.
*   **Don't use 100% opaque borders:** It shatters the "Curated Void" illusion and makes the UI look like a bootstrap template.
*   **Don't use purple or neons:** Even for success states, use subtle greens or the `primary` neutral palette to maintain the sophisticated tone.
*   **Don't over-round:** Avoid `full` pill shapes for buttons; stick to the `md` (0.375rem) scale for a more architectural, structured appearance.