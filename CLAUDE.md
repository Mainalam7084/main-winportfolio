# BRUTA/OS — Claude Agent Context

> Neo Brutalism + Pixel Art OS-style web portfolio. Draggable/resizable windows,
> virtual filesystem, 12 functional apps, fully responsive (mobile sheet windows on <768px).

**Live:** https://main-winportfolio.vercel.app  
**Stack:** React 19.2.6 · Vite 8 · Zustand 5 · Framer Motion 12 · TailwindCSS 4 · EmailJS

---

## Project Structure

```
src/
├── App.jsx                        # Root — LazyMotion(domMax) wrapper, shield overlay
├── main.jsx
├── index.css                      # Tailwind v4 + CSS vars + scrollbar styles
├── hooks/
│   └── useMobile.js               # isMobile(<768) / isTablet(<1024) / isDesktop(≥1024)
├── core/
│   ├── store.js                   # Main Zustand store (windows, UI, shields)
│   ├── WindowManager.jsx          # AnimatePresence → maps windows[] → <Window>
│   ├── AppRegistry.js             # 12 app configs: id, title, icon, component, defaultSize/Pos
│   ├── fileSystemStore.js         # Virtual FS (localStorage + /public/files/manifest.json)
│   ├── radioStore.js              # HTML5 Audio + 3 streaming stations
│   └── weatherStore.js            # Open-Meteo API + Nominatim reverse geocode
├── components/
│   ├── Desktop/Desktop.jsx        # Icon grid, wallpaper glitch, scanline CRT overlay
│   ├── Window/Window.jsx          # Draggable+resizable (desktop) / fullscreen sheet (mobile)
│   ├── Taskbar/Taskbar.jsx        # Taskbar (desktop) / bottom dock (mobile)
│   ├── SystemTray/SystemTray.jsx  # Clock, battery, WiFi, weather, radio tray
│   └── ui/PixelIcons.jsx          # 40+ SVG pixel icons (16×16 grid, currentColor)
└── apps/
    ├── Explorer/Explorer.jsx
    ├── Chrome/Chrome.jsx           # iframe browser (Bing search fallback)
    ├── Radio/{Radio,MiniRadioPlayer}.jsx
    ├── Weather/Weather.jsx
    ├── Projects/Projects.jsx
    ├── About/About.jsx
    ├── Contact/Contact.jsx         # EmailJS (VITE_EMAILJS_* env vars)
    ├── Gallery/Gallery.jsx         # Photo/video lightbox (/public/media/manifest.json)
    ├── Calculator/Calculator.jsx
    └── Games/{Games,Snake,FloppyBird}/
```

---

## Core State (`store.js`)

```ts
// Window object shape
{
  id: "win_${ts}_${rand}",
  app: string,           // key in AppRegistry
  title: string,
  props: object,         // passed to app component
  position: { x, y },
  size: { width, height },
  minimized: boolean,
  maximized: boolean,
  zIndex: number
}

// Store state
{
  windows: WindowObject[],
  activeWindowId: string | null,
  maxZIndex: number,
  isStartMenuOpen: boolean,
  isShieldActive: boolean,   // blocks iframe pointer swallowing during drag
  systemState: { battery: { level, charging }, wifi }
}
```

**Key actions:**
- `openWindow(appData)` — singleton per app type (focuses/restores if already open)
- `closeWindow(id)` / `minimizeWindow(id)` / `maximizeWindow(id)`
- `focusWindow(id)` — bumps zIndex
- `toggleWindowConfig(id)` — minimize if active, restore if not
- `updateWindowPosition(id, {x,y})` / `updateWindowSize(id, {w,h})`
- `setShieldActive(bool)` — activated during window drag
- `toggleStartMenu()` / `closeStartMenu()`

---

## File System Store (`fileSystemStore.js`)

```ts
// Folders: desktop, downloads, documents, photos, videos
fs[folder]: Array<{ id, name, type: 'folder'|'file', static?: boolean }>
```

- Reads `localStorage['brutaos_fs_v2']` on init (user files only)
- Fetches `/public/files/manifest.json` and prepends static files
- `addFile(folder, item)` / `removeFile(folder, id)` — persists only non-static entries

---

## Radio Store (`radioStore.js`)

3 hardcoded stations (NPO Radio 1, Classical FM, Synthwave).  
Native `Audio` object managed in store. Key actions: `initAudio()`, `togglePlay()`,
`stopAudio()`, `playNext()`, `playPrev()`, `setStation(station)`.

---

## Weather Store (`weatherStore.js`)

- `fetchWeather()` — `navigator.geolocation` → Open-Meteo → Nominatim reverse geocode
- 10-minute cache (`lastFetched`). `refresh()` forces refetch.
- `getWMO(code)` util maps WMO weather codes → `{ desc, icon }` (icon: sunny/rain/snow/storm…)

---

## Window Component (`Window.jsx`)

**Desktop/Tablet:**
- `m.div` with Framer Motion `drag`, `useDragControls`, spring `{ stiffness:300, damping:24 }`
- Wrapped in `<ResizableBox>` (react-resizable) with SE/E/S handles
- Min 300×200, max 2000×2000
- Active shadow: `6px 6px 0px #000`; inactive: `3px 3px 0px rgba(0,0,0,0.25)`
- Title bar: 36px (desktop) / 44px (tablet). Double-click title → maximize toggle
- Dragging sets `isShieldActive(true)` to block iframe pointer events

**Mobile (<768px):**
- Fixed fullscreen sheet, slides up from bottom
- `drag="y"`, swipe-down threshold: offset > 90px or velocity > 500 → minimize
- `dragElastic: { top: 0, bottom: 0.55 }`
- No resize handles; content uses `-webkit-overflow-scrolling: touch`

---

## Desktop Component (`Desktop.jsx`)

- Desktop: column-flow icon grid, single-click = select, double-click = open
- Mobile: 4-column CSS grid, single tap = open, `whileTap={{ scale: 0.82 }}`
- Wallpaper glitch on Projects hover: dual canvas layers + RAF + `clip-path` keyframes
- `repeating-linear-gradient` scanline overlay (CRT effect)
- Shows `AppRegistry` shortcuts + `fs.desktop` file shortcuts

---

## Taskbar Component (`Taskbar.jsx`)

**Desktop (≥768px):** `[Start][Search][Running apps]...[SystemTray]`  
**Mobile (<768px):** Fixed bottom dock `h-16` (64px) + fullscreen launcher overlay

- Running apps show grouped by type; click to focus/restore
- Start menu: all apps from AppRegistry + live search filter
- `EMPTY_STYLE = {}` extracted to module scope (avoids new ref per render)

---

## SystemTray (`SystemTray.jsx`)

- Clock: `setInterval` every 1s with cleanup  
- Calendar: month navigation, today highlight  
- Battery: `navigator.getBattery()` with `levelchange`/`chargingchange` listeners + cleanup  
- Quick Settings: WiFi/Bluetooth toggles, battery bar  
- Radio tray: station list + play controls  
- Weather panel: temp, humidity, wind, refresh button

---

## Pixel Icon System (`ui/PixelIcons.jsx`)

```jsx
// Pattern — all icons follow this shape:
export const PxIconName = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size}
       style={{ imageRendering: 'pixelated', display: 'block', ...xStyle }}
       className={className} {...rest}>
    <rect ... fill="currentColor" />
  </svg>
)
```

Inherits color via `currentColor` — set color with `style={{ color: '#facc15' }}`.

---

## AppRegistry (`core/AppRegistry.js`)

| id | title | defaultSize |
|----|-------|-------------|
| explorer | File Explorer | 820×580 |
| chrome | Browser | 1024×768 |
| radio | Radio Player | 400×560 |
| projects | Projects | 860×580 |
| about | About Me | 520×560 |
| contact | Contact | 520×540 |
| gallery | Gallery | 860×600 |
| games | Games | 640×440 |
| snake | Snake | 480×560 |
| floppybird | Floppy Bird | 460×640 |
| calculator | Calculator | 360×560 |
| weather | Weather | 400×520 |

---

## Responsive Breakpoints

| Constant | Value | Context |
|----------|-------|---------|
| `MOBILE_BP` | 768px | Mobile sheet windows, dock nav |
| `TABLET_BP` | 1024px | Tablet: larger targets, draggable windows |
| `MOBILE_DOCK_H` | 64px | Bottom dock height |
| `DESKTOP_TASKBAR_H` | 48px | Top/bottom taskbar height |

`useMobile()` returns `{ isMobile, isTablet, isDesktop, isTouch, isLandscape, vw, vh }`.  
Resize listener is RAF-debounced with `passive: true`.

---

## Styling Conventions

**CSS Variables:**
```css
--color-primary: #000000
--color-accent:  #facc15   /* yellow — primary interactive color */
--color-os-bg:   #ffffff
--font-family-sans:  "Share Tech Mono", monospace
--font-family-pixel: "VT323", monospace
```

**Neo Brutalism patterns:**
- Solid `3px solid #000` borders everywhere
- Offset box-shadows: `4px 4px 0 #000` (normal), `6px 6px 0 #000` (active/hover)
- Hover = yellow (`#facc15`) background
- Active press = shadow collapses + `translate(2px, 2px)`
- NO border-radius anywhere
- `transition: none` on interactive elements (instant feedback)
- Pure black headers with yellow or white text

**Pixel font usage:**
- `var(--font-family-pixel)` for labels, headings, UI chrome
- `var(--font-family-sans)` for body text, descriptions

---

## Animation Architecture

All Framer Motion usage goes through the `LazyMotion` wrapper in `App.jsx` using `domMax`
(required for drag support). **Never import `motion` — always import and use `m`.**

```jsx
// CORRECT
import { m, AnimatePresence } from 'framer-motion'
<m.div animate={{ opacity: 1 }} />

// WRONG — breaks LazyMotion tree
import { motion } from 'framer-motion'
```

`AnimatePresence` is still imported from `'framer-motion'` as normal.

---

## Calculator (`Calculator.jsx`)

Uses `useReducer` (refactored from 5× useState). Reducer key is the button character.
Keyboard handler registered once (stable `dispatch` → stable `input` → `[]` deps).

---

## Contact Form (`Contact.jsx`)

```env
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

Uses `emailjs.sendForm()` with a `formRef`. `handleChange` uses functional setState:
```js
setForm(prev => ({ ...prev, [name]: value }))
```

---

## Gallery (`Gallery.jsx`)

Fetches `/public/media/manifest.json`. Combined state:
```js
const [{ manifest, loading }, setGallery] = useState({ manifest: EMPTY_MANIFEST, loading: true })
```
Static files: `public/media/photos/` and `public/media/videos/`.

---

## FloppyBird (`FloppyBird.jsx`)

- Game state in `stRef` (mutable ref, not React state) for RAF loop performance
- `phaseRef` mirrors `phase` state — used in keydown listener so effect deps are `[flap, start]`
  (not `[phase, flap, start]`), preventing re-subscription on every phase change
- Canvas: 400×500px, `imageRendering: pixelated`
- Physics: GRAVITY=0.26, JUMP_VEL=-6.0, PIPE_SPEED=1.3

---

## Known Issues / Patterns to Preserve

- `outline: none` is used intentionally on most buttons (pixel brutalism style) — this is a
  design choice; don't "fix" it without checking context
- Inline styles are the primary styling method for dynamic values — this is intentional
- `transition: none` on buttons is intentional for instant pixel feel
- `imageRendering: pixelated` on SVG icons must be preserved
- Battery API (`navigator.getBattery()`) is only available in Chromium browsers

---

## Development

```bash
npm run dev      # Vite dev server
npm run build    # Production → /dist
npm run lint     # ESLint
```

No backend. Hosted on Vercel. Uses:
- `localStorage['brutaos_fs_v2']` for user filesystem persistence
- `public/files/manifest.json` for static file shortcuts
- `public/media/manifest.json` for gallery media
- Open-Meteo + Nominatim APIs (no key required)
- EmailJS for contact form
