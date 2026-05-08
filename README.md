# BRUTA/OS — Windows-Style Web Portfolio

An interactive web portfolio that runs as a fully functional desktop OS in your browser. Built with a **Neo Brutalism + Pixel Art** aesthetic inspired by Windows 10, it features draggable/resizable windows, a working taskbar, a virtual filesystem, and a suite of real applications.

**Live demo:** [main-winportfolio.vercel.app](https://main-winportfolio.vercel.app/)

---

## Preview

> Double-click desktop icons to launch apps. Drag, resize, minimize, and maximize windows just like a real OS.

---

## Tech Stack

| Category | Library / Tool |
|---|---|
| Framework | React 19 + Vite 8 |
| State Management | Zustand 5 |
| Animations | Framer Motion 12 |
| Styling | TailwindCSS 4 |
| Window Dragging | React Draggable |
| Window Resizing | React Resizable |
| Email | EmailJS Browser |
| Icons | Heroicons, Lucide React |
| Fonts | VT323, Share Tech Mono |

---

## Features

### OS Shell

- **Draggable & resizable windows** — drag by title bar, resize from any edge/corner, with min/max constraints
- **Window management** — minimize, maximize, close, focus, z-index stacking
- **Start menu** — pinned app grid, opens with the Windows button
- **Taskbar** — shows running apps, click to focus or restore minimized windows
- **Search bar** — real-time app search with dropdown results
- **System tray** — battery level, WiFi status, live clock
- **Desktop shortcuts** — double-click to launch apps or open folders
- **Wallpaper glitch effect** — hover over the Projects desktop icon to trigger an animated glitch transition

### Applications

| App | Description |
|---|---|
| **File Explorer** | Virtual filesystem browser with navigation history, breadcrumb paths, and file preview (PDF, images, video) |
| **Chrome** | In-browser iframe browser with URL bar, back/forward/home/reload, Wikipedia default, Bing search fallback |
| **Projects** | Portfolio showcase — live projects with tech stack tags, status badges, and external links |
| **About** | Developer bio, skill list (Java, React, Laravel, PHP, MySQL, TailwindCSS…), and fun stats |
| **Contact** | EmailJS-powered contact form with validation and a success screen |
| **Gallery** | Photo and video viewer loaded from a JSON manifest, with a lightbox |
| **Radio** | Mock radio player with multiple stations, play/pause/skip, and a buffering animation |
| **Weather** | Current conditions display with pixel-art weather icons (sunny, cloudy, rainy, snowy) |
| **Calculator** | Full scientific calculator with %, ±, and standard operators |
| **Games** | Hub launcher for two playable canvas games |
| ↳ **Snake** | Classic snake on a 20×20 grid with score tracking and CRT scanline overlay |
| ↳ **Floppy Bird** | Flappy-bird clone with gravity physics, parallax stars, and pipe obstacles |

### Virtual Filesystem

- Folders: Desktop, Downloads, Documents, Photos, Videos
- User files persisted in `localStorage` under `brutaos_fs_v2`
- Static files (CVs, videos) loaded from `/public/files/manifest.json`
- Gallery media loaded from `/public/media/manifest.json`

---

## Project Structure

```
src/
├── App.jsx                  # Root — Desktop + Taskbar
├── core/
│   ├── AppRegistry.js       # Centralized app metadata (title, icon, size)
│   ├── store.js             # Main Zustand store (windows, start menu, system state)
│   ├── fileSystemStore.js   # Virtual filesystem store
│   ├── radioStore.js        # Radio player state
│   └── weatherStore.js      # Weather widget state
├── components/
│   ├── Window/              # Draggable + resizable window wrapper
│   ├── Desktop/             # Desktop shortcuts + wallpaper
│   ├── Taskbar/             # Start menu, search, app buttons
│   ├── SystemTray/          # Clock, battery, WiFi
│   └── ui/PixelIcons.jsx    # Custom SVG pixel-art icons
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
