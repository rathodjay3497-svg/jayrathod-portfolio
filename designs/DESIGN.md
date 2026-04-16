# Design System Specification: The Synthetic Architect

## 1. Overview & Creative North Star
**Creative North Star: "The Neural Monolith"**

This design system is built to reflect the intersection of high-level artificial intelligence and architectural precision. Rather than a standard "tech" template, it treats the portfolio as a high-end digital gallery. It prioritizes depth, luminous accents, and a sense of "ambient intelligence." We move away from the rigid, boxed-in web of the past toward a fluid, layered experience where content emerges from a deep-space background.

The system breaks the "template" look through:
*   **Intentional Asymmetry:** Strategic use of whitespace and off-center alignments to create a custom, editorial feel.
*   **Luminous Depth:** Replacing flat surfaces with "luminous glass" that catches light from neon accents.
*   **Data-Driven Texture:** Integrating neural network patterns and grid systems as low-contrast environmental elements rather than foreground clutter.

## 2. Colors & Surface Philosophy
The palette is rooted in a deep "Midnight Ink" base, punctuated by high-frequency neons that mimic the glow of a server rack in a dark room.

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for sectioning. Structural definition must be achieved through:
*   **Tonal Transitions:** A shift from `surface` (#10131a) to `surface_container_low` (#191c22) signals a new content block.
*   **Atmospheric Gradients:** Use a subtle linear gradient (0% opacity to 5% opacity of `primary`) to "wash" over a section.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, semi-transparent layers:
*   **Level 0 (Foundation):** `surface` or `surface_dim` for the global background.
*   **Level 1 (Sectioning):** `surface_container_low` for large content blocks.
*   **Level 2 (Interaction):** `surface_container_highest` for cards or hovering elements.

### The Glass & Gradient Rule
To achieve a "premium AI" feel, floating elements (modals, navigation bars) must use **Glassmorphism**:
*   **Fill:** `surface_container_high` at 60% opacity.
*   **Backdrop Filter:** `blur(20px) saturate(150%)`.
*   **The Signature Stroke:** A 1px top-edge-only gradient stroke from `primary` to `secondary` at 30% opacity to mimic light catching the edge of a glass pane.

## 3. Typography: Editorial Logic
We pair the geometric, slightly "glitchy" nature of **Space Grotesk** with the invisible functionality of **Inter**.

*   **Display (Space Grotesk):** Large, bold, and expressive. Use `display-lg` (3.5rem) for hero statements. Apply a subtle `0.02em` letter-spacing to enhance the "futuristic" aesthetic.
*   **Headlines (Space Grotesk):** Use `headline-md` (1.75rem) for project titles. These should feel like headers in a technical blueprint.
*   **Body (Inter):** All long-form text uses Inter. Keep `body-lg` (1rem) for descriptions to ensure maximum readability against dark backgrounds. Use a generous `line-height` of 1.6.
*   **Labels (Inter):** `label-md` (0.75rem) in `on_surface_variant` (#bbc9cf) should be used for technical metadata (e.g., "Latent Space Optimization").

## 4. Elevation & Depth
Depth is not a shadow; it is a **Light State**.

*   **Tonal Layering:** Instead of a shadow, place a `surface_container_highest` card on a `surface` background. The color contrast alone provides the "lift."
*   **Ambient Shadows:** For high-priority floating elements, use a "Cyan Glow" shadow: `0px 20px 40px rgba(0, 209, 255, 0.08)`. This mimics the ambient light emitted by the screen’s "neon" elements.
*   **The Ghost Border:** If a boundary is needed for a form input, use `outline_variant` at 15% opacity. Never use 100% opacity for lines.

## 5. Components

### The Hero Section
*   **Layout:** Asymmetric. Headline aligned to the left, with a background "Neural Pattern" (using `primary` at 5% opacity) bleeding off the right edge.
*   **Signature Element:** A "Pulse" indicator using `primary_container` (#00d1ff) with a CSS ripple animation to signify an "Active AI Model."

### Project Cards
*   **Base:** `surface_container_low`. 
*   **Interaction:** On hover, the background shifts to `surface_container_high`, and a 2px "Neon Glow" line appears on the left edge using a gradient of `primary` to `secondary`.
*   **No Dividers:** Separate card metadata with 16px of horizontal whitespace, not vertical pipes.

### Vertical Timelines (AI Development Trace)
*   **The Track:** A 1px wide line using `outline_variant` at 20% opacity.
*   **The Node:** A 12px circle using `primary_fixed_dim`. When "Current," the node should have a `secondary` outer glow.
*   **Typography:** Date stamps use `label-sm` in `tertiary`.

### Forms & Inputs
*   **Input Field:** `surface_container_lowest` fill. No border, only a bottom-weighted `outline_variant` stroke (2px).
*   **Focus State:** The bottom stroke animates to a `primary` to `secondary` gradient.
*   **Primary CTA:** A "Monolith" button. Solid `primary` background with `on_primary` text. No rounded corners (`rounded-none` or `sm`).

### Background Patterns
*   **The Grid:** 40px square grid using `outline_variant` at 5% opacity, visible only in the "Hero" and "Contact" sections.
*   **Neural Network:** SVG paths using `surface_variant` with 0.5px stroke width. Points (neurons) should subtly "flicker" using opacity keyframes.

## 6. Do’s and Don’ts

### Do
*   **Use Breathing Room:** Ensure at least 120px of vertical space between major sections to maintain a "minimal/innovative" feel.
*   **Use Gradient Text:** For "Innovation" keywords, apply a linear gradient from `primary` (#a4e6ff) to `secondary` (#d1bcff).
*   **Layer with Purpose:** Always ensure `on_surface` text sits on a surface at least two steps removed (e.g., `on_surface` on `surface_container_low`) for accessibility.

### Don't
*   **No Solid Borders:** Never use `#859399` at 100% opacity to box in content. It breaks the "monolith" illusion.
*   **No Pure Black:** Never use `#000000`. Use the `surface` token (#10131a) to keep the dark theme feeling "expensive" and deep rather than empty.
*   **No Standard Shadows:** Avoid the default browser drop-shadow. If it’s not a tinted "Glow Shadow," don't use it.