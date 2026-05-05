import React, { useState, useRef } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { ResizableBox } from 'react-resizable'
import { useStore } from '../../core/store'
import { PxClose, PxMinus, PxMaximize } from '../ui/PixelIcons'
import 'react-resizable/css/styles.css'

export default function Window({ windowData, appConfig, children }) {
  const { id, title, position, size, minimized, maximized, zIndex } = windowData

  const closeWindow    = useStore(state => state.closeWindow)
  const minimizeWindow = useStore(state => state.minimizeWindow)
  const maximizeWindow = useStore(state => state.maximizeWindow)
  const focusWindow    = useStore(state => state.focusWindow)
  const updateWindowPosition = useStore(state => state.updateWindowPosition)
  const updateWindowSize     = useStore(state => state.updateWindowSize)
  const activeWindowId = useStore(state => state.activeWindowId)
  const setShieldActive = useStore(state => state.setShieldActive)

  const dragControls = useDragControls()
  const [isInteracting, setIsInteracting] = useState(false)
  const currentPos = useRef({ x: position.x, y: position.y })

  if (minimized) return null
  const isActive = activeWindowId === id

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

  return (
    <motion.div
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
          height: '36px', flexShrink: 0, cursor: maximized ? 'default' : 'move',
          background: isActive ? '#000' : '#333',
          borderBottom: '3px solid #000',
          userSelect: 'none',
        }}
        onDoubleClick={() => maximizeWindow(id)}
        onPointerDown={(e) => !maximized && dragControls.start(e)}
      >
        {/* App icon + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px', overflow: 'hidden', flex: 1 }}>
          <appConfig.icon size={14} style={{ color: '#fff', flexShrink: 0 }} />
          <span style={{
            fontFamily: 'var(--font-family-pixel)',
            fontSize: '15px', color: '#fff',
            letterSpacing: '1px',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {title}
          </span>
        </div>

        {/* Window control buttons */}
        <div style={{ display: 'flex', height: '100%', flexShrink: 0 }}>
          {/* Minimize */}
          <button
            style={winBtnStyle('#333', '#fff')}
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id) }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#facc15'; e.currentTarget.style.color = '#000' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#333'; e.currentTarget.style.color = '#fff' }}
            title="Minimize"
          >
            <PxMinus size={12} />
          </button>
          {/* Maximize */}
          <button
            style={winBtnStyle('#333', '#fff')}
            onClick={(e) => { e.stopPropagation(); maximizeWindow(id) }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#facc15'; e.currentTarget.style.color = '#000' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#333'; e.currentTarget.style.color = '#fff' }}
            title="Maximize"
          >
            <PxMaximize size={11} />
          </button>
          {/* Close */}
          <button
            style={winBtnStyle('#000', '#fff')}
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
            height={size.height - 40}
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
    </motion.div>
  )
}

function winBtnStyle(bg, fg) {
  return {
    width: '40px', height: '100%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: bg, color: fg,
    border: 'none', borderLeft: '2px solid #555',
    cursor: 'pointer', transition: 'none', outline: 'none',
  }
}
