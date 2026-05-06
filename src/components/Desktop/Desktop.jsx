import { useState, useRef, useCallback, useEffect } from 'react'
import { useStore } from '../../core/store'
import { useFileSystem } from '../../core/fileSystemStore'
import {
  PxDocument, PxGlobe, PxGrid4, PxFolder, PxUser, PxMail,
} from '../ui/PixelIcons'

const SYSTEM_SHORTCUTS = [
  { id: 'sc_projects', name: 'Projects', Icon: PxGrid4, color: '#000', app: 'projects', path: null },
  { id: 'sc_chrome',   name: 'Chrome',   Icon: PxGlobe, color: '#000', app: 'chrome',   path: null },
  { id: 'sc_about',    name: 'About',    Icon: PxUser,  color: '#000', app: 'about',    path: null },
  { id: 'sc_contact',  name: 'Contact',  Icon: PxMail,  color: '#000', app: 'contact',  path: null },
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
        const x   = (Math.random() - 0.5) * 30
        const y   = (Math.random() - 0.5) * 12
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

  const onTriggerEnter = useCallback(() => runGlitch(true),  [runGlitch])
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
        {SYSTEM_SHORTCUTS.map((s) => (
          <DesktopIcon
            key={s.id}
            id={s.id}
            name={s.name}
            Icon={s.Icon}
            color={s.color}
            selected={selected}
            onSingleClick={handleSingleClick}
            onDoubleClick={() => openApp(s.app, s.name, s.path ? { initialPath: s.path } : {})}
            onGlitchEnter={s.id === 'sc_projects' ? onTriggerEnter : undefined}
            onGlitchLeave={s.id === 'sc_projects' ? onTriggerLeave : undefined}
          />
        ))}

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
