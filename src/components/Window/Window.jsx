import React, { useState, useRef } from 'react'
import { m, useDragControls } from 'framer-motion'
import { ResizableBox } from 'react-resizable'
import { useStore } from '../../core/store'
import { PxClose, PxMinus, PxMaximize } from '../ui/PixelIcons'
import { useMobile, MOBILE_DOCK_H } from '../../hooks/useMobile'
import 'react-resizable/css/styles.css'

export default function Window({ windowData, appConfig, children }) {
  const { id, title, position, size, minimized, maximized, zIndex } = windowData

  const closeWindow         = useStore(state => state.closeWindow)
  const minimizeWindow      = useStore(state => state.minimizeWindow)
  const maximizeWindow      = useStore(state => state.maximizeWindow)
  const focusWindow         = useStore(state => state.focusWindow)
  const updateWindowPosition = useStore(state => state.updateWindowPosition)
  const updateWindowSize     = useStore(state => state.updateWindowSize)
  const activeWindowId       = useStore(state => state.activeWindowId)
  const setShieldActive      = useStore(state => state.setShieldActive)

  const dragControls = useDragControls()
  const [isInteracting, setIsInteracting] = useState(false)
  const currentPos = useRef({ x: position.x, y: position.y })

  const { isMobile, isTablet } = useMobile()

  if (minimized) return null
  const isActive = activeWindowId === id

  // ── MOBILE FULLSCREEN SHEET ──────────────────────────────────────
  if (isMobile) {
    return (
      <m.div
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.55 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 90 || info.velocity.y > 500) minimizeWindow(id)
        }}
        initial={{ y: '100vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100vh', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 36 }}
        onPointerDownCapture={() => !isActive && focusWindow(id)}
        style={{
          position: 'fixed',
          left: 0, right: 0, top: 0,
          bottom: MOBILE_DOCK_H,
          zIndex,
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          border: '3px solid #000',
          boxShadow: '0 -4px 0 #000',
          overflow: 'hidden',
        }}
      >
        {/* Title bar — drag zone */}
        <div
          style={{
            display: 'flex', alignItems: 'center',
            height: 48, flexShrink: 0,
            background: isActive ? '#000' : '#333',
            borderBottom: '3px solid #000',
            userSelect: 'none',
            cursor: 'grab',
            touchAction: 'none',
            position: 'relative',
          }}
          onPointerDown={(e) => dragControls.start(e)}
        >
          {/* Pill handle */}
          <div style={{
            position: 'absolute', top: 7, left: '50%',
            transform: 'translateX(-50%)',
            width: 36, height: 3,
            background: 'rgba(255,255,255,0.35)',
            borderRadius: 2,
            pointerEvents: 'none',
          }} />

          {/* Close */}
          <button
            style={mobileBtnStyle(isActive ? '#000' : '#333', '#fff', 'left')}
            onClick={(e) => { e.stopPropagation(); closeWindow(id) }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Close"
          >
            <PxClose size={14} />
          </button>

          {/* Icon + title */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, overflow: 'hidden', padding: '0 4px',
          }}>
            <appConfig.icon size={14} style={{ color: '#fff', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--font-family-pixel)',
              fontSize: '16px', color: '#fff', letterSpacing: '1px',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{title}</span>
          </div>

          {/* Minimize */}
          <button
            style={mobileBtnStyle(isActive ? '#000' : '#333', '#fff', 'right')}
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id) }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Minimize"
          >
            <PxMinus size={14} />
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{
          flex: 1, overflow: 'auto', position: 'relative',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
        }}>
          {children}
        </div>
      </m.div>
    )
  }

  // ── DESKTOP / TABLET ─────────────────────────────────────────────
  const handleDragStart = () => { setIsInteracting(true); setShieldActive(true); focusWindow(id) }
  const handleDragStop  = () => {
    setIsInteracting(false)
    setShieldActive(false)
    const maxX = window.innerWidth - 80
    const minX = -size.width + 80
    updateWindowPosition(id, {
      x: Math.max(minX, Math.min(currentPos.current.x, maxX)),
      y: Math.max(0, currentPos.current.y),
    })
  }
  const handleResizeStart = () => { setIsInteracting(true); setShieldActive(true); focusWindow(id) }
  const handleResizeStop  = (e, { size: ns }) => {
    setIsInteracting(false)
    setShieldActive(false)
    updateWindowSize(id, { width: ns.width, height: ns.height })
  }

  const titleBarH = isTablet ? 44 : 36

  return (
    <m.div
      drag={!maximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={true}
      dragElastic={0.08}
      dragConstraints={{ left: -10000, top: -10000, right: 10000, bottom: 10000 }}
      initial={{ x: position.x, y: position.y + 20, opacity: 0, scale: 0.94, width: size.width, height: size.height }}
      animate={{
        x: maximized ? 0 : position.x,
        y: maximized ? 0 : position.y,
        width:  maximized ? '100vw' : size.width,
        height: maximized ? 'calc(100vh - 48px)' : size.height,
        opacity: isActive ? 1 : 0.88,
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0.92, y: currentPos.current.y + 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onUpdate={(latest) => {
        if (latest.x !== undefined) currentPos.current.x = latest.x
        if (latest.y !== undefined) currentPos.current.y = latest.y
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragStop}
      onPointerDownCapture={() => !isActive && focusWindow(id)}
      style={{
        position: 'absolute', top: 0, left: 0, zIndex,
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        border: '3px solid #000',
        boxShadow: isActive ? '6px 6px 0px #000' : '3px 3px 0px rgba(0,0,0,0.25)',
        background: '#fff',
      }}
    >
      {/* ── Title Bar ── */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: titleBarH, flexShrink: 0,
          cursor: maximized ? 'default' : 'move',
          background: isActive ? '#000' : '#333',
          borderBottom: '3px solid #000',
          userSelect: 'none',
        }}
        onDoubleClick={() => maximizeWindow(id)}
        onPointerDown={(e) => !maximized && dragControls.start(e)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px', overflow: 'hidden', flex: 1 }}>
          <appConfig.icon size={14} style={{ color: '#fff', flexShrink: 0 }} />
          <span style={{
            fontFamily: 'var(--font-family-pixel)',
            fontSize: isTablet ? '16px' : '15px', color: '#fff',
            letterSpacing: '1px',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {title}
          </span>
        </div>

        <div style={{ display: 'flex', height: '100%', flexShrink: 0 }}>
          <button
            style={winBtnStyle('#333', '#fff', isTablet)}
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id) }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#facc15'; e.currentTarget.style.color = '#000' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#333'; e.currentTarget.style.color = '#fff' }}
            title="Minimize"
          >
            <PxMinus size={12} />
          </button>
          <button
            style={winBtnStyle('#333', '#fff', isTablet)}
            onClick={(e) => { e.stopPropagation(); maximizeWindow(id) }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#facc15'; e.currentTarget.style.color = '#000' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#333'; e.currentTarget.style.color = '#fff' }}
            title="Maximize"
          >
            <PxMaximize size={11} />
          </button>
          <button
            style={winBtnStyle('#000', '#fff', isTablet)}
            onClick={(e) => { e.stopPropagation(); closeWindow(id) }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#facc15'; e.currentTarget.style.color = '#000' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff' }}
            title="Close"
          >
            <PxClose size={12} />
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {maximized ? (
          children
        ) : (
          <ResizableBox
            width={size.width}
            height={size.height - titleBarH - 3}
            onResizeStart={handleResizeStart}
            onResizeStop={handleResizeStop}
            resizeHandles={['se', 'e', 's']}
            minConstraints={[300, 200]}
            maxConstraints={[2000, 2000]}
          >
            <div className="w-full h-full relative">
              {children}
            </div>
          </ResizableBox>
        )}
      </div>
    </m.div>
  )
}

function mobileBtnStyle(bg, fg, side) {
  return {
    width: 48, height: '100%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: bg, color: fg,
    border: 'none',
    borderRight: side === 'left'  ? '2px solid #555' : 'none',
    borderLeft:  side === 'right' ? '2px solid #555' : 'none',
    cursor: 'pointer', outline: 'none',
    flexShrink: 0, touchAction: 'manipulation',
  }
}

function winBtnStyle(bg, fg, isTablet) {
  return {
    width: isTablet ? '48px' : '40px', height: '100%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: bg, color: fg,
    border: 'none', borderLeft: '2px solid #555',
    cursor: 'pointer', transition: 'none', outline: 'none',
    touchAction: 'manipulation',
  }
}
