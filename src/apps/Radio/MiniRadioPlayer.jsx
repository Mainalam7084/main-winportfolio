import React from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { useRadioStore } from '../../core/radioStore'
import { useStore } from '../../core/store'
import { PxPlay, PxPause, PxSkipBack, PxSkipForward, PxClose, PxRadio } from '../../components/ui/PixelIcons'

export default function MiniRadioPlayer() {
  const { isPlaying, currentStation, togglePlay, playNext, playPrev, stopAudio } = useRadioStore()
  const windows       = useStore(state => state.windows)
  const restoreWindow = useStore(state => state.restoreWindow)
  const closeWindow   = useStore(state => state.closeWindow)

  const radioWindow    = windows.find(w => w.app === 'radio')
  const shouldShow     = radioWindow?.minimized

  return (
    <AnimatePresence>
      {shouldShow && (
        <m.div
          initial={{ opacity: 0, x: 40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          style={{
            position: 'fixed', top: 16, right: 16, zIndex: 999,
            width: 240,
            background: '#fff', border: '3px solid #000',
            boxShadow: '6px 6px 0 #000',
            display: 'flex', flexDirection: 'column',
            fontFamily: 'var(--font-family-sans)',
          }}
        >
          {/* Header */}
          <div style={{ background: '#000', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '3px solid #000' }}>
            <PxRadio size={14} style={{ color: '#fff', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '13px', color: '#fff', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentStation.name}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); stopAudio(); closeWindow(radioWindow.id) }}
              style={{
                background: '#333', border: '2px solid #555', width: 22, height: 22,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', outline: 'none', flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#facc15'; e.currentTarget.style.border = '2px solid #000' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#333'; e.currentTarget.style.border = '2px solid #555' }}
              title="Close"
            >
              <PxClose size={10} style={{ color: '#fff' }} />
            </button>
          </div>

          {/* Status + click to restore */}
          <div
            onClick={() => restoreWindow(radioWindow.id)}
            style={{ padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #e5e5e5' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(250,204,21,0.15)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            <div style={{
              width: 10, height: 10, background: isPlaying ? '#000' : '#ccc',
              border: '2px solid #000', flexShrink: 0,
              animation: isPlaying ? 'blink 1s steps(1) infinite' : 'none',
            }} />
            <span style={{ fontSize: '10px', color: '#000', letterSpacing: '1px' }}>
              {isPlaying ? '◉ LIVE' : 'STOPPED'}
            </span>
            <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', gap: '8px' }}>
            <MiniBtn onClick={playPrev}><PxSkipBack size={14} /></MiniBtn>
            <MiniBtn onClick={togglePlay} primary>
              {isPlaying ? <PxPause size={16} style={{ color: '#000' }} /> : <PxPlay size={16} style={{ color: '#000' }} />}
            </MiniBtn>
            <MiniBtn onClick={playNext}><PxSkipForward size={14} /></MiniBtn>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

function MiniBtn({ children, onClick, primary }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 34, height: 34,
        background: primary ? '#facc15' : '#000',
        border: '3px solid #000',
        boxShadow: '3px 3px 0 #555',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', outline: 'none', color: primary ? '#000' : '#fff',
        transition: 'none',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 #facc15' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '3px 3px 0 #555' }}
    >
      {children}
    </button>
  )
}
