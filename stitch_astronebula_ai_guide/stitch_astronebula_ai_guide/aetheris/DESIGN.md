---
name: Aetheris
colors:
  surface: '#0e141a'
  surface-dim: '#0e141a'
  surface-bright: '#333a40'
  surface-container-lowest: '#080f14'
  surface-container-low: '#161c22'
  surface-container: '#1a2026'
  surface-container-high: '#242b31'
  surface-container-highest: '#2f353c'
  on-surface: '#dde3eb'
  on-surface-variant: '#c9c5ce'
  inverse-surface: '#dde3eb'
  inverse-on-surface: '#2b3137'
  outline: '#928f98'
  outline-variant: '#47464d'
  surface-tint: '#c7c2e8'
  primary: '#c7c2e8'
  on-primary: '#302d4b'
  primary-container: '#0f0c29'
  on-primary-container: '#7c789b'
  inverse-primary: '#5e5b7c'
  secondary: '#d0bcff'
  on-secondary: '#3b0191'
  secondary-container: '#552daa'
  on-secondary-container: '#c3abff'
  tertiary: '#e9c349'
  on-tertiary: '#3c2f00'
  tertiary-container: '#160f00'
  on-tertiary-container: '#977900'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e4dfff'
  primary-fixed-dim: '#c7c2e8'
  on-primary-fixed: '#1b1835'
  on-primary-fixed-variant: '#464363'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#522aa7'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#0e141a'
  on-background: '#dde3eb'
  surface-variant: '#2f353c'
typography:
  display-lg:
    fontFamily: DM Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: DM Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: DM Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: DM Sans
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-margin: 24px
  gutter: 16px
  section-gap: 48px
---

## Brand & Style

The design system is anchored in the concept of "Celestial Sophistication." It targets an audience seeking intuitive guidance through a lens of premium, modern mysticism. The UI should evoke a sense of calm, wonder, and cosmic order.

We utilize a **Glassmorphic-Modern** hybrid style. This combines the clean, functional layouts of modern SaaS with the ethereal depth of frosted surfaces and subtle background blurs. The aesthetic avoids "New Age" clichés by favoring sharp execution, expansive whitespace (dark space), and refined gold accents over cluttered esoteric imagery. Every interaction should feel like looking through a high-end telescope: precise, deep, and luminous.

## Colors

The palette is strictly nocturnal. The primary **Midnight Navy** (#0F0C29) serves as the infinite canvas, providing depth and reducing eye strain. The secondary **Amethyst Purple** (#6B46C1) is used for active states and spiritual highlights, creating a "nebula" effect when paired with blurs.

**Astral Gold** (#D4AF37) is reserved for high-importance elements: CTA borders, Sun signs, and premium tier features. It should be used sparingly to maintain its prestige. Neutral tones are kept cool-toned (starlight greys) to ensure they don't clash with the gold accents. Use gradients sparingly, primarily moving from Deep Navy to Amethyst to simulate the transition of the night sky.

## Typography

This design system exclusively uses **DM Sans** to maintain a contemporary, geometric clarity that balances the mystical theme. 

- **Headlines:** Use tighter letter spacing and medium to bold weights to anchor the page. 
- **Labels:** Small labels (Sun/Moon/Rising indicators) should use increased letter spacing and uppercase styling to feel like architectural notations on a star map.
- **Hierarchy:** Reserve the "Display" size for astronomical events or daily horoscopes. Body text must maintain a high contrast ratio against the dark background; use the neutral starlight grey rather than pure white to prevent "vibration" on OLED screens.

## Layout & Spacing

The layout philosophy is **Atmospheric**. We utilize generous vertical spacing (Section Gaps) to allow the "cosmic" background textures to breathe. 

- **Grid:** A standard 12-column fluid grid for desktop, collapsing to 4 columns on mobile. 
- **Margins:** 24px side margins on mobile to provide a premium "padded" feel, moving to 40px+ on tablet.
- **Rhythm:** All spacing must be multiples of 8px. Use larger gaps between distinct content blocks to simulate the vastness of space, while keeping related data points (like planetary aspects) tightly grouped within cards.

## Elevation & Depth

In this design system, depth is not achieved through heavy drop shadows, but through **Tonal Luminosity** and **Glassmorphism**.

1.  **Level 0 (Background):** The deep midnight canvas. May contain subtle, fixed cosmic dust textures or grain.
2.  **Level 1 (Surface):** Slightly lighter navy with a 1px inner border (10% opacity white) to define edges.
3.  **Level 2 (Floating):** Glassmorphic panels using `backdrop-filter: blur(12px)` and a semi-transparent background. These represent the primary content containers.
4.  **Level 3 (Interactive):** Elements that "glow." When a user interacts with a card or button, an outer amethyst glow (bloom) is applied, suggesting energy.

Avoid harsh black shadows. Instead, use soft, deep indigo shadows if necessary to separate layers.

## Shapes

The shape language is **Rounded and Organic**. We avoid sharp corners to maintain a "soft" and welcoming psychological profile. 

- **Standard Elements:** Use a 0.5rem (8px) radius for most UI components.
- **Featured Cards:** Use 1rem (16px) for larger birth chart containers.
- **Iconography:** Celestial tokens (Sun, Moon, Rising) should be enclosed in circular frames. The symbols themselves are minimalist line art. The Rising sign is represented by a stylized horizon triangle, the Sun by a ring with a central point, and the Moon by a slender crescent.

## Components

### Buttons
Primary buttons are pill-shaped with an Amethyst-to-Midnight gradient and a subtle 1px Gold border for high-priority actions. Secondary buttons are "Ghost" style with white semi-transparent text and a blur background.

### Cards
Cards are the heart of the system. They should use the Level 2 Elevation (Glassmorphism). For zodiac-specific cards, a subtle "constellation" watermark can be placed in the bottom right corner at 5% opacity.

### Chips / Tags
Used for displaying "Aspects" (e.g., Conjunction, Square). These are small, pill-shaped, and use the Neutral color with Amethyst text.

### Input Fields
Inputs should have a dark, semi-transparent fill. The focus state is defined by a 1px Astral Gold border and a very soft outer glow.

### Celestial Indicators
Small, persistent badges used throughout the app to denote a user's "Big Three." 
- **Sun Sign:** Gold glyph.
- **Moon Sign:** Silver/Pale Blue glyph.
- **Rising Sign:** Amethyst glyph.
Each badge should be a perfect circle with a background blur.