# PawConnect Branding Guide

## 🎨 Brand Identity

**PawConnect** is a modern, warm, and friendly platform for animal welfare. Our branding reflects trust, compassion, and community connection.

---

## 🎨 Color Palette

### Primary Colors

- **Primary Green** (`#2D5F3F`)
  - Main brand color for primary actions, buttons, and key elements
  - Light variant: `#4A8F6A` (hover states)
  - Dark variant: `#1E3F2A` (pressed states, dark sections)
  - Background: `#E8F5ED` (very light green backgrounds)

- **Accent Orange** (`#FF7B47`)
  - Warm orange for highlights, CTAs, and connection elements
  - Light variant: `#FF9D73` (hover states)
  - Dark variant: `#E55A2B` (pressed states)
  - Background: `#FFF4F0` (very light orange backgrounds)

### Neutral Colors

- **Gray Scale**
  - `#1A1A1A` - Darkest (headings, important text)
  - `#2D2D2D` - Dark (body text)
  - `#4A4A4A` - Medium dark (secondary text)
  - `#6B6B6B` - Medium (muted text)
  - `#8E8E8E` - Light medium (placeholders)
  - `#B0B0B0` - Light (borders, dividers)
  - `#D1D1D1` - Very light (subtle borders)
  - `#E8E8E8` - Lighter (input backgrounds)
  - `#F5F5F5` - Lightest (card backgrounds)
  - `#FAFAFA` - Almost white (page backgrounds)

### Semantic Colors

- **Success**: `#2CDF53` (green) - Success messages, positive actions
- **Error**: `#E63946` (red) - Errors, warnings
- **Warning**: `#FFB84D` (amber) - Warnings
- **Info**: `#4A90E2` (blue) - Informational messages

---

## 🔤 Typography

### Font Family

**Primary**: `Inter`, `Poppins`, system fonts

- **Inter**: Modern, clean, professional
- **Poppins**: Rounded, friendly, approachable
- **Fallback**: System fonts for performance

### Font Weights

- Normal: `400`
- Medium: `500`
- Semibold: `600`
- Bold: `700`
- Extrabold: `800`

### Usage

- **Headings**: Bold (700-800), larger sizes
- **Body Text**: Normal (400), readable sizes
- **Buttons**: Semibold (600)
- **Labels**: Medium (500)

---

## 🐾 Logo

### Logo Components

1. **Horizontal Logo** (`PawConnectLogo.js`)
   - Paw icon + "PawConnect" text
   - Available in dark and light variants
   - Usage: Navbar, headers, main branding

2. **Icon Logo** (`PawConnectIcon.js`)
   - Square icon with paw symbol
   - Available in dark and light variants
   - Usage: Favicon, app icons, social media

### Logo Files

- `/public/assets/logo-pawconnect.svg` - Dark variant (for light backgrounds)
- `/public/assets/logo-pawconnect-light.svg` - Light variant (for dark backgrounds)
- `/public/assets/logo-icon.svg` - Square icon version
- `/public/favicon.svg` - Favicon

### Logo Usage Guidelines

- **Minimum Size**: 120px width for horizontal logo
- **Spacing**: Maintain clear space around logo (at least 20% of logo height)
- **Colors**: Use dark variant on light backgrounds, light variant on dark backgrounds
- **Don't**: Stretch, rotate, or modify the logo

---

## 🎯 Design Principles

### Style Characteristics

1. **Warm & Friendly**
   - Use warm colors (greens and oranges)
   - Rounded corners and soft shadows
   - Approachable typography

2. **Safe & Trustworthy**
   - Consistent color usage
   - Clear hierarchy
   - Professional appearance

3. **Modern & Tech-Ready**
   - Clean layouts
   - Ample white space
   - Modern UI patterns

4. **Animal-Welfare Oriented**
   - Natural, organic colors
   - Compassionate imagery
   - Community-focused messaging

---

## 📐 Spacing & Layout

### Border Radius

- Small: `6px` - Buttons, small elements
- Medium: `8px` - Cards, inputs
- Large: `12px` - Large cards, sections
- Extra Large: `16px` - Hero sections
- Full: `9999px` - Pills, avatars

### Shadows

- Small: `0 1px 2px rgba(0, 0, 0, 0.05)` - Subtle elevation
- Medium: `0 4px 6px rgba(0, 0, 0, 0.1)` - Cards
- Large: `0 10px 15px rgba(0, 0, 0, 0.1)` - Modals
- Extra Large: `0 20px 25px rgba(0, 0, 0, 0.15)` - Hero sections

---

## 🚀 Implementation

### CSS Variables

All brand colors are available as CSS variables in `/src/styles/brand.css`:

```css
--paw-primary: #2D5F3F;
--paw-accent: #FF7B47;
/* ... and more */
```

### Tailwind Config

Brand colors are configured in `tailwind.config.js`:

```js
brand: '#2D5F3F',
accent: '#FF7B47',
```

### Material-UI Theme

The theme is configured in `/src/theme/theme.js` with:
- Primary: Green (`#2D5F3F`)
- Secondary: Orange (`#FF7B47`)
- Typography: Inter/Poppins
- Custom component styles

---

## 📱 Usage Examples

### Buttons

- **Primary**: Green background (`bg-brand` or `primary.main`)
- **Secondary**: Orange background (`bg-accent` or `secondary.main`)
- **Outline**: Border with transparent background

### Hero Banners

- **Gradient**: `linear-gradient(135deg, #2D5F3F 0%, #FF7B47 100%)`
- White text on gradient backgrounds
- Clear call-to-action buttons

### Cards

- White or light gray backgrounds
- Subtle shadows
- Rounded corners (12-16px)

---

## ✅ Brand Consistency Checklist

- [x] Logo updated in navbar
- [x] Logo updated in footer
- [x] Color palette applied across all pages
- [x] Typography updated (Inter/Poppins)
- [x] Hero banners use new gradient
- [x] Buttons use new brand colors
- [x] Material-UI theme configured
- [x] Tailwind config updated
- [x] CSS variables defined
- [x] Favicon updated

---

## 📝 Notes

- The old brand colors (`#FF540B`, `#451E0E`) have been replaced with the new palette
- All user-facing text now says "PawConnect" instead of "Adoptapaw"
- Logo files are SVG for scalability
- Colors are accessible and meet WCAG contrast guidelines

---

**Last Updated**: 2025-01-26
**Brand Version**: 1.0

