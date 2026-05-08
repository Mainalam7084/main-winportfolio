import { useState, useRef, useCallback, useEffect } from 'react'
import { useStore } from '../../core/store'
import { useFileSystem } from '../../core/fileSystemStore'
import {
  PxDocument, PxGlobe, PxGrid4, PxFolder, PxUser, PxMail, PxGamepad, PxCalculator, PxCloud,
} from '../ui/PixelIcons'

const SYSTEM_SHORTCUTS = [
  { id: 'sc_projects', name: 'Projects', Icon: PxGrid4, color: '#000', app: 'projects', path: null },
  { id: 'sc_chrome', name: 'Chrome', Icon: PxGlobe, color: '#000', app: 'chrome', path: null },
  { id: 'sc_about', name: 'About', Icon: PxUser, color: '#000', app: 'about', path: null },
  { id: 'sc_contact', name: 'Contact', Icon: PxMail, color: '#000', app: 'contact', path: null },
  { id: 'sc_games', name: 'Games', Icon: PxGamepad, color: '#000', app: 'games', path: null },
  { id: 'sc_calculator', name: 'Calculator', Icon: PxCalculator, color: '#000', app: 'calculator', path: null },
  { id: 'sc_weather', name: 'Weather', Icon: PxCloud, color: '#000', app: 'weather', path: null },
]

const labelStyle = {
  fontFamily: 'var(--font-family-pixel)',
  fontSize: '14px',
  color: '#000',
  textShadow: 'none',
  textAlign: 'center',
  lineHeight: '1.2',
  maxWidth: '72px',
  wordBreak: 'break-word',
}

function DesktopIcon({ id, name, Icon, color, selected, onSingleClick, onDoubleClick, onGlitchEnter, onGlitchLeave }) {
  const isSel = selected === id
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onSingleClick(id) }}
      onDoubleClick={(e) => { e.stopPropagation(); onDoubleClick() }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 8px',
        width: '84px',
        background: isSel ? '#facc15' : 'transparent',
        border: `2px solid ${isSel ? '#000' : 'transparent'}`,
        cursor: 'pointer',
        outline: 'none',
        transition: 'none',
      }}
      onMouseEnter={(e) => { if (!isSel) { e.currentTarget.style.border = '2px solid #000'; e.currentTarget.style.background = 'rgba(250,204,21,0.25)' }; onGlitchEnter?.() }}
      onMouseLeave={(e) => { if (!isSel) { e.currentTarget.style.border = '2px solid transparent'; e.currentTarget.style.background = 'transparent' }; onGlitchLeave?.() }}
    >
      <div style={{ width: '40px', height: '40px', color }}>
        <Icon size={40} />
      </div>
      <span style={labelStyle}>{name}</span>
    </button>
  )
}

export default function Desktop() {
  const { openWindow, closeStartMenu } = useStore()
  const { fs } = useFileSystem()
  const [selected, setSelected] = useState(null)
  const [showHint, setShowHint] = useState(true)

  // ── Wallpaper glitch ──
  const [wallpaper, setWallpaper] = useState('normal')
  const [glitching, setGlitching] = useState(false)
  const normalLayerRef = useRef(null)
  const helmetLayerRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  const runGlitch = useCallback((toHelmet) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setGlitching(true)
    const duration = 300
    const start = performance.now()
    const tick = (now) => {
      const elapsed = now - start
      if (elapsed < duration) {
        const x = (Math.random() - 0.5) * 30
        const y = (Math.random() - 0.5) * 12
        const skw = (Math.random() - 0.5) * 5
        const show = Math.random() > 0.45
        if (helmetLayerRef.current) {
          helmetLayerRef.current.style.transform = `translateX(${x}px) translateY(${y}px) skewX(${skw}deg)`
          helmetLayerRef.current.style.opacity = show ? '1' : '0'
        }
        if (normalLayerRef.current) {
          normalLayerRef.current.style.opacity = show ? '0' : '1'
        }
        rafRef.current = requestAnimationFrame(tick)
      } else {
        if (helmetLayerRef.current) { helmetLayerRef.current.style.transform = 'none'; helmetLayerRef.current.style.opacity = toHelmet ? '1' : '0' }
        if (normalLayerRef.current) { normalLayerRef.current.style.opacity = toHelmet ? '0' : '1' }
        setGlitching(false)
        setWallpaper(toHelmet ? 'helmet' : 'normal')
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const onTriggerEnter = useCallback(() => { runGlitch(true); setShowHint(false) }, [runGlitch])
  const onTriggerLeave = useCallback(() => runGlitch(false), [runGlitch])

  const handleSingleClick = useCallback((id) => {
    setSelected(id)
  }, [])

  const openApp = useCallback((app, title, props = {}) => {
    openWindow({ app, title, props })
  }, [openWindow])

  return (
    <div
      className="absolute inset-0"
      style={{ background: '#f0f0f0', zIndex: 0 }}
      onClick={() => { setSelected(null); closeStartMenu() }}
    >

      {/* ── Glitch keyframes ── */}
      <style>{`
        @keyframes px-slice {
          0%   { clip-path: inset(0 0 97% 0); }
          13%  { clip-path: inset(42% 0 50% 0); }
          27%  { clip-path: inset(73% 0 14% 0); }
          40%  { clip-path: inset(8%  0 86% 0); }
          54%  { clip-path: inset(58% 0 30% 0); }
          67%  { clip-path: inset(85% 0 4%  0); }
          81%  { clip-path: inset(20% 0 68% 0); }
          100% { clip-path: inset(0   0 0   0); }
        }
        @keyframes float-hint {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes glitch-hint {
          0%, 75%, 100% { transform: translate(0,0); fill: #000; }
          77%  { transform: translate(-3px, 0); fill: #e11d48; }
          79%  { transform: translate(3px, 0);  fill: #1d4ed8; }
          81%  { transform: translate(-1px, 1px); fill: #000; }
          83%  { transform: translate(1px, -1px); fill: #e11d48; }
          85%  { transform: translate(0,0); fill: #000; }
        }
      `}</style>

      {/* Normal wallpaper */}
      <div
        ref={normalLayerRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(/image1.png)',
          backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          opacity: wallpaper === 'normal' ? 1 : 0,
        }}
      />

      {/* Helmet wallpaper */}
      <div
        ref={helmetLayerRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundImage: 'url(/image2.png)',
          backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          opacity: wallpaper === 'helmet' ? 1 : 0,
          animation: glitching ? 'px-slice 0.3s steps(1) forwards' : 'none',
        }}
      />

      {/* Scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 3px)',
        pointerEvents: 'none',
      }} />

      {/* Icon grid */}
      <div
        style={{
          position: 'relative', zIndex: 3,
          display: 'flex', flexDirection: 'column', flexWrap: 'wrap',
          height: 'calc(100vh - 48px)',
          alignContent: 'flex-start',
          padding: '16px 12px',
          gap: '8px',
        }}
      >
        {/* System shortcuts */}
        {SYSTEM_SHORTCUTS.map((s) => {
          const isProjects = s.id === 'sc_projects'
          const icon = (
            <DesktopIcon
              id={s.id}
              name={s.name}
              Icon={s.Icon}
              color={s.color}
              selected={selected}
              onSingleClick={handleSingleClick}
              onDoubleClick={() => openApp(s.app, s.name, s.path ? { initialPath: s.path } : {})}
              onGlitchEnter={isProjects ? onTriggerEnter : undefined}
              onGlitchLeave={isProjects ? onTriggerLeave : undefined}
            />
          )
          if (!isProjects) return <div key={s.id}>{icon}</div>
          return (
            <div key={s.id} style={{ position: 'relative' }}>
              {showHint && (
                <div style={{
                  position: 'absolute',
                  left: '80%',
                  top: '10%',
                  transform: 'translateY(-50%)',
                  marginLeft: '2px',
                  pointerEvents: 'none',
                  zIndex: 20,
                  animation: 'float-hint 2.2s ease-in-out infinite',
                }}>
                  {/*
                    Pixel-art speech-bubble cloud.
                    Path breakdown (8 px grid):
                      - tail tip at (0,36) points left toward the icon
                      - 3 blocky bumps across the top
                      - flat rectangular base holds the text
                      - black shadow layer offset (+3,+3) for neo-brutalist depth
                  */}
                  <svg width="170" height="70" viewBox="0 0 170 70" style={{ display: 'block', overflow: 'visible' }}>
                    {/* shadow */}
                    <path
                      d="M 3,39 L 19,31 L 19,27 L 39,27 L 39,15 L 47,15 L 47,3 L 63,3 L 63,15 L 71,15 L 71,3 L 107,3 L 107,15 L 115,15 L 115,3 L 127,3 L 127,15 L 135,15 L 135,27 L 163,27 L 163,63 L 19,63 L 19,47 Z"
                      fill="#000"
                    />
                    {/* cloud body */}
                    <path
                      d="M 0,36 L 16,28 L 16,24 L 36,24 L 36,12 L 44,12 L 44,0 L 60,0 L 60,12 L 68,12 L 68,0 L 104,0 L 104,12 L 112,12 L 112,0 L 124,0 L 124,12 L 132,12 L 132,24 L 160,24 L 160,60 L 16,60 L 16,44 Z"
                      fill="#ffffff"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinejoin="miter"
                    />
                    {/* text */}
                    <text
                      x="88"
                      y="42"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontFamily="var(--font-family-pixel)"
                      fontSize="11"
                      fill="#000"
                      style={{ animation: 'glitch-hint 3.5s linear infinite', transformBox: 'fill-box', transformOrigin: 'center' }}
                    >
                      hover over me!
                    </text>
                  </svg>
                </div>
              )}
              {icon}
            </div>
          )
        })}

        {/* User files on desktop (from filesystem store) */}
        {fs.desktop.map((item) => (
          <DesktopIcon
            key={item.id}
            id={item.id}
            name={item.name}
            Icon={item.type === 'folder' ? PxFolder : PxDocument}
            color={item.type === 'folder' ? '#facc15' : '#60a5fa'}
            selected={selected}
            onSingleClick={handleSingleClick}
            onDoubleClick={() => {
              if (item.type === 'folder') {
                openApp('explorer', item.name, { initialPath: item.name })
              } else {
                openApp('explorer', 'Desktop', { initialPath: 'Desktop' })
              }
            }}
          />
        ))}
      </div>

      {/* OS label watermark */}
      <div style={{
        position: 'absolute', bottom: '56px', right: '12px', zIndex: 3,
        fontFamily: 'var(--font-family-pixel)', fontSize: '13px',
        color: 'rgba(0,0,0,0.15)', pointerEvents: 'none', letterSpacing: '2px',
      }}>
        BRUTA/OS v1.0
      </div>
    </div>
  )
}
