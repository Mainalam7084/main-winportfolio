import React, { useEffect } from 'react'
import { useRadioStore, MOCK_STATIONS } from '../../core/radioStore'
import { PxPlay, PxPause, PxSkipBack, PxSkipForward, PxRadio, PxMusic } from '../../components/ui/PixelIcons'

export default function Radio() {
  const { isPlaying, isBuffering, error, currentStation, initAudio, togglePlay, playNext, playPrev, setStation } = useRadioStore()

  useEffect(() => { initAudio() }, [])

  return (
    <div className="w-full h-full flex flex-col" style={{ background: '#fff', fontFamily: 'var(--font-family-sans)', color: '#000' }}>

      {/* ── Header ── */}
      <div style={{ background: '#000', borderBottom: '3px solid #000', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <PxRadio size={18} style={{ color: '#fff' }} />
        <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '20px', color: '#fff', letterSpacing: '2px' }}>RADIO_</span>
      </div>

      {/* ── Now Playing ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', gap: '20px' }}>

        {/* Album art box */}
        <div style={{
          width: 120, height: 120,
          border: '3px solid #000', boxShadow: isPlaying || isBuffering ? '0 0 0 3px #facc15, 6px 6px 0 #000' : '6px 6px 0 #000',
          background: '#f5f5f5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          transition: 'box-shadow 0.1s',
        }}>
          <PxMusic size={56} style={{ color: '#000' }} />
          {(isPlaying || isBuffering) && (
            <div style={{
              position: 'absolute', inset: -8,
              border: '3px solid #facc15',
              animation: 'ping 1s cubic-bezier(0,0,.2,1) infinite',
            }} />
          )}
        </div>

        <style>{`@keyframes ping { 75%,100% { transform: scale(1.15); opacity: 0; } }`}</style>

        {/* Station info */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '20px', color: '#000', marginBottom: '6px' }}>
            {currentStation.name}
          </div>
          <div style={{ fontSize: '11px', color: '#555', letterSpacing: '2px' }}>
            {isBuffering ? '...BUFFERING...' : isPlaying ? '◉ LIVE' : 'STOPPED'}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: '#f5f5f5', border: '2px solid #000', padding: '6px 14px', fontSize: '11px', color: '#000' }}>
            ⚠ {error}
          </div>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <CtrlBtn onClick={playPrev} title="Previous">
            <PxSkipBack size={22} />
          </CtrlBtn>

          <CtrlBtn
            onClick={togglePlay}
            primary
            title={isPlaying ? 'Pause' : 'Play'}
            style={{ width: 64, height: 64 }}
          >
            {isBuffering ? (
              <div style={{ width: 24, height: 24, border: '3px solid #000', borderTop: '3px solid transparent', borderRadius: 999, animation: 'spin 0.6s linear infinite' }} />
            ) : isPlaying ? (
              <PxPause size={28} style={{ color: '#000' }} />
            ) : (
              <PxPlay size={28} style={{ color: '#000' }} />
            )}
          </CtrlBtn>

          <CtrlBtn onClick={playNext} title="Next">
            <PxSkipForward size={22} />
          </CtrlBtn>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>

      {/* ── Station list ── */}
      <div style={{ borderTop: '4px solid #000', maxHeight: '38%', overflowY: 'auto', background: '#f5f5f5' }}>
        <div style={{ padding: '6px 12px', fontFamily: 'var(--font-family-pixel)', fontSize: '12px', color: '#000', letterSpacing: '1px', borderBottom: '2px solid #e5e5e5' }}>
          STATIONS
        </div>
        {MOCK_STATIONS.map(station => {
          const active = currentStation.id === station.id
          return (
            <button
              key={station.id}
              onClick={() => { setStation(station); if (!isPlaying) togglePlay() }}
              style={{
                width: '100%', padding: '10px 14px', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: '10px',
                background: active ? 'rgba(250,204,21,0.35)' : 'transparent',
                borderLeft: active ? '4px solid #000' : '4px solid transparent',
                border: 'none', borderBottom: '2px solid #e5e5e5',
                cursor: 'pointer', color: '#000',
                fontFamily: 'var(--font-family-sans)', fontSize: '12px',
                transition: 'none', outline: 'none',
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(250,204,21,0.15)' }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent' }}
            >
              <PxRadio size={16} style={{ color: active ? '#000' : '#777', flexShrink: 0 }} />
              <span>{station.name}</span>
              {active && isPlaying && (
                <span style={{ marginLeft: 'auto', color: '#000', fontSize: '10px', letterSpacing: '1px' }}>▶ LIVE</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function CtrlBtn({ children, onClick, primary, title, style = {} }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 48, height: 48,
        background: primary ? '#facc15' : '#000',
        border: '4px solid #000',
        boxShadow: primary ? '4px 4px 0 #000' : '4px 4px 0 #555',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', outline: 'none', color: primary ? '#000' : '#fff',
        transition: 'none',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '6px 6px 0 #facc15' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = primary ? '4px 4px 0 #000' : '4px 4px 0 #555' }}
    >
      {children}
    </button>
  )
}
