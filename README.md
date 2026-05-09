# BRUTA/OS — Web Portfolio OS

An interactive web portfolio that runs as a fully functional desktop OS in your browser. Built with a **Neo Brutalism + Pixel Art** aesthetic, it features draggable/resizable windows, a working taskbar, a virtual filesystem, and a suite of real applications — fully usable on desktop, tablet, and mobile.

**Live demo:** [main-winportfolio.vercel.app](https://main-winportfolio.vercel.app/)

---

## Preview

> **Desktop:** Double-click icons to launch apps. Drag, resize, minimize, and maximize windows just like a real OS.
>
> **Mobile / Tablet:** Tap icons to open apps. Windows become fullscreen sheets — swipe the title bar down to minimize. A bottom dock replaces the taskbar, and the Start menu becomes a fullscreen app launcher.

---

## Tech Stack

| Category | Library / Tool |
|---|---|
| Framework | React 19 + Vite 8 |
| State Management | Zustand 5 |
| Animations | Framer Motion 12 |
| Styling | TailwindCSS 4 |
| Window Dragging | Framer Motion drag + useDragControls |
| Window Resizing | React Resizable |
| Email | EmailJS Browser |
| Icons | Custom SVG Pixel Icons |
| Fonts | VT323, Share Tech Mono |

---

## Features

### OS Shell

- **Draggable & resizable windows** — drag by title bar, resize from any edge/corner, with min/max constraints
- **Window management** — minimize, maximize, close, focus, z-index stacking
- **Start menu** — pinned app grid, opens with the Windows button
- **Taskbar** — shows running apps, click to focus or restore minimized windows
- **Search bar** — real-time app search with dropdown results
- **System tray** — live clock, battery level, WiFi toggle, weather widget, radio player
- **Desktop shortcuts** — double-click (desktop) or tap (mobile) to launch apps
- **Wallpaper glitch effect** — hover the Projects icon to trigger an animated glitch transition

### Responsive / Mobile OS Mode

The entire shell adapts to the device without removing any desktop functionality:

| Feature | Desktop | Tablet | Mobile |
|---|---|---|---|
| Windows | Draggable, resizable, overlapping | Draggable, larger hit targets | Fullscreen sheets, no overlap |
| Open gesture | Double-click | Double-click / tap | Single tap |
| Close gesture | × button | × button | × button or swipe title bar down |
| Navigation | Taskbar | Taskbar (larger) | Bottom dock |
| Start menu | 380px popup | 380px popup | Fullscreen slide-up launcher |
| Icon grid | Column flow | Column flow | 4-column CSS grid |
| Animations | Spring physics | Spring physics | Lighter spring, slide transitions |
| Touch targets | 40px | 44–48px | 52–56px |

**Implementation details:**
- `useMobile` hook: RAF-debounced resize listener, breakpoints at 768px (mobile) and 1024px (tablet)
- Mobile windows: `position: fixed`, slide up from bottom, title bar is the drag handle, `dragElastic` swipe-to-minimize
- Safe area insets (`env(safe-area-inset-bottom)`) for notched phones
- `touch-action: manipulation` eliminates the 300ms tap delay on all buttons
- `viewport-fit=cover` in the meta tag for edge-to-edge display on notched devices
- `overscroll-behavior: none` prevents iOS rubber-band bounce

### Applications

| App | Description |
|---|---|
| **File Explorer** | Virtual filesystem browser with navigation history, breadcrumb paths, and file preview |
| **Chrome** | In-browser iframe browser with URL bar, back/forward/home/reload, and Bing search fallback |
| **Projects** | Portfolio showcase with live projects, tech stack tags, status badges, and external links |
| **About** | Developer bio, skill list, and fun stats |
| **Contact** | EmailJS-powered contact form with validation and success screen |
| **Gallery** | Photo and video viewer loaded from a JSON manifest, with a lightbox |
| **Radio** | Mock radio player with multiple stations, play/pause/skip, and buffering animation |
| **Weather** | Current conditions via Open-Meteo API + geolocation, with pixel-art weather icons |
| **Calculator** | Full calculator with %, ±, and standard operators |
| **Games** | Hub launcher for two playable canvas games |
| ↳ **Snake** | Classic snake on a 20×20 grid with score tracking and CRT scanline overlay |
| ↳ **Floppy Bird** | Flappy-bird clone with gravity physics, parallax stars, and pipe obstacles |

### Virtual Filesystem

- Folders: Desktop, Downloads, Documents, Photos, Videos
- User files persisted in `localStorage` under `brutaos_fs_v2`
- Static files loaded from `/public/files/manifest.json`
- Gallery media loaded from `/public/media/manifest.json`

---

## Project Structure

```
src/
├── App.jsx                  # Root — Desktop + Taskbar (responsive wrapper)
├── hooks/
│   └── useMobile.js         # Device detection hook (isMobile / isTablet / isDesktop)
├── core/
│   ├── AppRegistry.js       # Centralized app metadata (title, icon, default size)
│   ├── store.js             # Main Zustand store (windows, start menu, system state)
│   ├── WindowManager.jsx    # Renders open windows via AnimatePresence
│   ├── fileSystemStore.js   # Virtual filesystem store
│   ├── radioStore.js        # Radio player state
│   └── weatherStore.js      # Weather widget state
├── components/
│   ├── Window/              # Desktop: draggable + resizable; Mobile: fullscreen sheet
│   ├── Desktop/             # Desktop: column icon grid; Mobile: 4-col tap grid
│   ├── Taskbar/             # Desktop: taskbar + start menu; Mobile: dock + launcher
│   ├── SystemTray/          # Clock, battery, WiFi, weather, radio
│   └── ui/PixelIcons.jsx    # Custom 16×16 SVG pixel-art icons
└── apps/
    ├── Explorer/
    ├── Chrome/
    ├── Projects/
    ├── About/
    ├── Contact/
    ├── Gallery/
    ├── Radio/
    ├── Weather/
    ├── Calculator/
    └── Games/
        ├── Snake/
        └── FloppyBird/
```

---

## Scripts

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build → /dist
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

---

## License

MIT — see [LICENSE](LICENSE) for details.
