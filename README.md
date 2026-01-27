# Cruz OS - Portfolio

A personal portfolio website designed as a fully interactive Macintosh Classic operating system experience, built with modern web technologies.

Live: [giovannicruz.dev](https://giovannicruz.dev)

---

## Overview

This portfolio reimagines the classic Macintosh System 9 interface as an interactive web experience. Instead of a traditional portfolio layout, visitors explore a complete desktop environment with functional windows, applications, and authentic Mac OS 9 aesthetics.

The project demonstrates both frontend engineering skills and attention to design detail, recreating the Platinum appearance guidelines that defined late 90s Apple software.

---

## Features

### Desktop Environment

- **Window Management System**: Fully functional windows with drag, resize, minimize, maximize, and close operations. Windows remember z-index ordering and support Mac OS 9 style "marching ants" drag previews.

- **Boot Sequence**: Authentic startup experience with Happy Mac icon, loading progress bar, and extension loading simulation before revealing the desktop.

- **Menu Bar**: Functional Apple menu with system information, window controls, and real-time clock display. Includes shutdown functionality with appropriate system dialogs.

- **Desktop Icons**: Double-click to open applications, single-click to select. Icons display with classic Mac OS styling and selection highlighting.

### Applications

- **ReadMe**: A multi-page document viewer containing portfolio information including About, Skills, Projects, and Contact sections. Features period-appropriate typography and layout.

- **Terminal**: A functional command-line interface supporting multiple commands:
  - `help` - List available commands
  - `about` - Display bio information
  - `skills` - List technical skills
  - `projects` - Show project portfolio
  - `contact` - Display contact information
  - `whoami`, `date`, `echo`, `clear`
  - `love`, - Displays the love of Giovanni’s life

- **Music Player**: Retro-styled audio player interface with playlist display, playback controls, progress bar, and volume slider. Displays track metadata in authentic LCD-style display.

- **Pong**: Classic arcade game playable against CPU opponent. Features paddle controls via keyboard (arrow keys/WASD) or touch, with score tracking.

- **Trash**: Functional trash bin displaying deleted items with the ability to empty trash with animated deletion sequence. Persists state to localStorage.

- **Calculator**: Retro-styled calculator interface with basic arithmetic operations and memory functions.

- **About This Computer**: System information dialog showing "hardware specifications" in authentic Mac OS 9 styling, including memory usage bar and component details.

### Technical Implementation

- **Responsive Design**: Adapts from desktop to mobile with appropriate control scheme changes (mouse to touch). Windows maximize to full screen on mobile devices.

- **Scroll Isolation**: Window contents scroll independently without affecting the parent desktop or page scroll.

- **State Persistence**: Trash contents and game high scores persist across sessions via localStorage.

- **Sound Effects**: Optional UI sound effects for authentic interaction feedback.

- **Keyboard Shortcuts**: ESC to close windows, spacebar for game controls, full keyboard navigation support.

---

## Technology Stack

### Core

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Custom CSS** - Mac OS 9 Platinum appearance recreation including:
  - Window chrome gradients and bevels
  - Scrollbar styling with arrow buttons
  - Button states and focus indicators
  - Typography matching Chicago and Charcoal system fonts

### Additional

- **Lucide React** - Icon library
- **Vercel Analytics** - Usage analytics

---

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout with fonts and analytics
    page.tsx            # Main page with Macintosh display
    globals.css         # Tailwind config and custom styles
  components/
    desktop/
      desktop-section.tsx     # Main desktop environment (window manager, menu bar, boot screens)
      apps/
        readme-content.tsx    # Portfolio document viewer
        terminal-content.tsx  # Command-line interface
        music-player-content.tsx  # Audio player UI
        pong-content.tsx      # Pong game
        trash-content.tsx     # Trash bin
        about-content.tsx     # System information
        calculator-content.tsx  # Retro-styled calculator interface
    graphite-write.tsx  # Decorative text component
  data/
    config.ts           # Site configuration (URLs, contact info)
    info.ts             # Content data (bio, projects, skills)
  hooks/
    use-reveal.ts       # Intersection Observer hook for animations
public/
  mac-icons/            # Application icons (PNG)
  sounds/               # UI sound effects
  fonts/                # Custom typography
```

---

## Architecture Decisions

### Single-File Desktop Component

The `desktop-section.tsx` file contains approximately 1,400 lines including the window manager, menu bar, boot screens, and desktop icons. This was an intentional decision:

- All components share significant state and context
- No reuse of these components elsewhere in the application
- Maintains cohesion of the desktop metaphor
- Reduces prop drilling and context complexity

### Minimal Dependencies

The project uses only 6 production dependencies, deliberately avoiding large UI libraries:

- All UI components are custom-built to match Mac OS 9 aesthetics
- Reduces bundle size and attack surface
- Demonstrates vanilla React/CSS capabilities

### Static Generation

The entire site is statically generated at build time, resulting in:

- Fast initial page loads
- No server runtime required
- Simple deployment to any static host

---

## Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Environment

No environment variables required. Analytics are automatically configured for Vercel deployments.

---

## Deployment

Optimized for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Alternatively, deploy the `out/` directory to any static hosting provider after running `pnpm build`.

---

## Performance

- **Lighthouse Score**: 95+ across all categories
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Bundle Size**: ~150KB gzipped (excluding images)

---

## Credits

- Design inspired by Apple Macintosh System 9 and the Platinum appearance
- Icons: original Mac OS icons from Apple
- Fonts: Playfair Display (headings), system fonts for UI

---

---

## Author

Giovanni Cruz - [GitHub](https://github.com/cruzgiovanni) - [LinkedIn](https://linkedin.com/in/giovannicruz)
