---
name: Cosmic Joy Pop
colors:
  surface: '#1a0b2e'
  surface-dim: '#1a0b2e'
  surface-bright: '#413257'
  surface-container-lowest: '#150629'
  surface-container-low: '#231437'
  surface-container: '#27183b'
  surface-container-high: '#322346'
  surface-container-highest: '#3d2e52'
  on-surface: '#eddcff'
  on-surface-variant: '#debdd0'
  inverse-surface: '#eddcff'
  inverse-on-surface: '#38294d'
  outline: '#a68899'
  outline-variant: '#58404f'
  surface-tint: '#ffade2'
  primary: '#ffade2'
  on-primary: '#5f004e'
  primary-container: '#ff2fd6'
  on-primary-container: '#530044'
  inverse-primary: '#af0092'
  secondary: '#d1bcff'
  on-secondary: '#3c0090'
  secondary-container: '#7000ff'
  on-secondary-container: '#ddcdff'
  tertiary: '#d7ca00'
  on-tertiary: '#353100'
  tertiary-container: '#baae00'
  on-tertiary-container: '#464100'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd8ee'
  primary-fixed-dim: '#ffade2'
  on-primary-fixed: '#3b002f'
  on-primary-fixed-variant: '#86006f'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d1bcff'
  on-secondary-fixed: '#23005b'
  on-secondary-fixed-variant: '#5700c9'
  tertiary-fixed: '#f6e600'
  tertiary-fixed-dim: '#d7ca00'
  on-tertiary-fixed: '#1f1c00'
  on-tertiary-fixed-variant: '#4d4800'
  background: '#1a0b2e'
  on-background: '#eddcff'
  surface-variant: '#3d2e52'
typography:
  headline-xl:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 32px
  body-lg:
    fontFamily: Rubik
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Rubik
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Rubik
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 20px
  margin-mobile: 20px
  margin-desktop: 80px
---

## Brand & Style

The design system is built on a "Joyful Pop" aesthetic with a cosmic twist, specifically tailored for a vibrant, astrology-focused experience. The brand personality is expressive, energetic, and optimistic, moving away from traditional "mystical" tropes toward a funkier, high-energy interpretation of the stars.

The UI utilizes a mix of **High-Contrast Bold** and **Retro-Futuristic** elements. It prioritizes high-saturation visuals, fluid movement, and an "electrified" atmosphere. The emotional goal is to make users feel that the universe is not just mysterious, but a playful and welcoming playground of possibilities. Expect heavy use of bubbly gradients, neon accents, and thick, expressive lines.

## Colors

The palette is anchored in a deep, nocturnal violet (`#1A0B2E`) to provide a high-contrast stage for neon elements. 

- **Primary (Hyper Pink):** Used for main actions, active states, and "star" highlights.
- **Secondary (Electric Violet):** Used for depth, secondary actions, and cosmic gradients.
- **Tertiary (Solar Yellow):** Reserved for emphasis, notifications, and "spark" details to create visual tension and energy.
- **Gradients:** Use "Bubbly Gradients" that transition from Secondary to Primary with a 45-degree angle. Incorporate a subtle "inner glow" of Primary on top of darker containers to simulate a neon aura.

## Typography

This design system uses a dual-font strategy to balance quirkiness with readability. 

**Bricolage Grotesque** serves as the display face. Its expressive, slightly irregular, and funky letterforms capture the "Joyful Pop" energy. It should always be used at heavy weights (ExtraBold/Black) for headlines.

**Rubik** is the workhorse for body text and labels. Its rounded corners echo the pill-shaped UI elements, maintaining a friendly and soft feel even in dense information blocks. Use slightly wider letter spacing for labels to maintain legibility against vibrant backgrounds.

## Layout & Spacing

The layout philosophy is "Energetic Fluidity." While it follows a standard 12-column grid on desktop and a 4-column grid on mobile, elements should frequently "break" the grid using slight rotations (1–2 degrees) or overlapping positions to create a sense of movement.

- **Spacing Rhythm:** Based on an 8px scale.
- **Safe Zones:** Use generous outer margins (`20px` on mobile) to ensure the vibrant content doesn't feel cramped.
- **Dynamic Padding:** Containers and cards should use `24px` internal padding as a standard to allow the "pill" shapes to breathe.
- **Reflow:** On mobile, stack cards vertically but allow for horizontal "peek-a-boo" scrolling for astrological carousels (e.g., daily signs).

## Elevation & Depth

In this design system, depth is conveyed through **Neon Light** and **Tonal Layering** rather than traditional gray shadows.

1.  **Backlit Surfaces:** Higher elevation elements do not cast dark shadows; they cast colored "glows" (outer glows) using the Primary or Secondary colors with high blur and low opacity (20–30%).
2.  **Glassmorphism:** Use semi-transparent backgrounds (`rgba(26, 11, 46, 0.7)`) with a `20px` backdrop blur for modals and floating navigation bars to keep the cosmic background visible.
3.  **Neon Outlines:** Use 2px solid borders in the Primary color for high-priority interactive elements to make them "pop" off the dark background.

## Shapes

The shape language is strictly **Pill-Shaped**. This reinforces the "Joyful Pop" aesthetic and makes the UI feel approachable and soft.

- **Primary Radius:** All buttons, input fields, and tags must use the maximum radius to create full pill shapes.
- **Card Radius:** Large containers use a `2rem` (32px) radius to maintain the "bubbly" feel without losing too much content space in the corners.
- **Icons:** Use thick-stroke (2pt), rounded-cap icons that match the weight and softness of the Rubik typeface.

## Components

### Buttons
Buttons are always pill-shaped. The **Primary Button** uses a vibrant gradient (Secondary to Primary) with white text and a subtle outer glow. **Secondary Buttons** use a thick 2px neon border with transparent centers.

### Chips & Tags
Used for zodiac signs or planetary traits. These are small pill-shaped elements with high-saturation backgrounds and dark text (for Tertiary Yellow) or white text (for Pink/Purple).

### Input Fields
Inputs are fully rounded with a dark violet background and a 1px border that turns into a 2px Neon Pink border on focus. Placeholders should be in a lowered-opacity version of the Secondary color.

### Cards
Cards should feel like "portals." Use the dark neutral background with a thin, semi-transparent white border (10% opacity) or a vibrant gradient border. 

### Cosmic Extras
- **Star Toggle:** Replace standard switches with a "Star Toggle" where the knob is a 4-pointed star icon.
- **Progress Bars:** Use thick, rounded tracks with a gradient fill that "pulses" slightly to indicate loading or energy levels.