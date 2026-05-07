import React from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../../core/store'
import { PxGamepad } from '../../components/ui/PixelIcons'

const GAMES = [
  {
    id: 'snake',
    title: 'SNAKE',
    desc: 'Classic arcade snake. Eat, grow, survive.',
    controls: 'WASD / ARROWS',
    accent: '#facc15',
    preview: (
      <svg viewBox="0 0 64 64" width={64} height={64} style={{ imageRendering: 'pixelated' }} fill="#facc15">
        <rect x="4"  y="28" width="8" height="8"/>
        <rect x="12" y="28" width="8" height="8"/>
        <rect x="20" y="28" width="8" height="8"/>
        <rect x="28" y="28" width="8" height="8"/>
        <rect x="28" y="20" width="8" height="8"/>
        <rect x="36" y="20" width="8" height="8"/>
        <rect x="36" y="28" width="8" height="8"/>
        <rect x="36" y="36" width="8" height="8"/>
        <rect x="44" y="36" width="8" height="8"/>
        <rect x="44" y="44" width="8" height="8"/>
        <rect x="52" y="44" width="4" height="4" fill="#fff"/>
      </svg>
    ),
  },
  {
    id: 'floppybird',
    title: 'FLOPPY BIRD',
    desc: 'Tap to flap through pipes. How far can you go?',
    controls: 'CLICK / SPACE',
    accent: '#facc15',
    preview: (
      <svg viewBox="0 0 64 64" width={64} height={64} style={{ imageRendering: 'pixelated' }}>
        <rect x="4"  y="20" width="4" height="40" fill="#3a3a3a"/>
        <rect x="0"  y="36" width="12" height="8" fill="#2a2a2a"/>
        <rect x="52" y="0"  width="4" height="28" fill="#3a3a3a"/>
        <rect x="48" y="24" width="12" height="8" fill="#2a2a2a"/>
        <rect x="28" y="26" width="20" height="14" fill="#facc15"/>
        <rect x="30" y="28" width="8" height="4" fill="#fde68a"/>
        <rect x="42" y="30" width="8" height="4" fill="#f97316"/>
        <rect x="43" y="27" width="6" height="6" fill="#fff"/>
        <rect x="45" y="29" width="3" height="3" fill="#000"/>
      </svg>
    ),
  },
]

const px = { fontFamily: 'var(--font-family-pixel)' }

export default function Games() {
  const { openWindow } = useStore()

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', ...px }}>
      {/* Header */}
      <div style={{ background: '#000', borderBottom: '3px solid #000', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <PxGamepad size={18} style={{ color: '#facc15' }} />
        <span style={{ color: '#fff', fontSize: '20px', letterSpacing: '2px' }}>GAMES_</span>
        <span style={{ marginLeft: 'auto', color: '#555', fontSize: '12px', letterSpacing: '1px' }}>SELECT A GAME</span>
      </div>

      {/* Game grid */}
      <div style={{ flex: 1, padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', alignContent: 'start', background: '#f5f5f5', overflowY: 'auto' }}>
        {GAMES.map(game => (
          <motion.button
            key={game.id}
            onClick={() => openWindow({ app: game.id, title: game.title })}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            style={{
              background: '#fff',
              border: '3px solid #000',
              boxShadow: '5px 5px 0 #000',
              padding: '20px',
              cursor: 'pointer',
              outline: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '12px',
              textAlign: 'left',
              transition: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '5px 5px 0 #facc15'; e.currentTarget.style.borderColor = '#000' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '5px 5px 0 #000'; e.currentTarget.style.borderColor = '#000' }}
          >
            {/* Preview icon */}
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', border: '2px solid #333', padding: '16px', minHeight: '100px' }}>
              {game.preview}
            </div>

            {/* Info */}
            <div style={{ width: '100%' }}>
              <div style={{ fontSize: '18px', color: '#000', letterSpacing: '2px', marginBottom: '6px' }}>
                {game.title}
              </div>
              <div style={{ fontFamily: 'var(--font-family-sans)', fontSize: '11px', color: '#555', lineHeight: 1.5, marginBottom: '10px' }}>
                {game.desc}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px' }}>
                  {game.controls}
                </span>
                <div style={{ background: '#facc15', border: '2px solid #000', padding: '4px 12px', fontSize: '12px', letterSpacing: '1px', color: '#000', boxShadow: '2px 2px 0 #000' }}>
                  PLAY ▶
                </div>
              </div>
            </div>
          </motion.button>
        ))}

        {/* Coming soon card */}
        <div style={{
          background: '#f0f0f0', border: '3px dashed #ccc',
          padding: '20px', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '220px',
        }}>
          <div style={{ fontSize: '28px', color: '#ccc' }}>▓▓▓</div>
          <div style={{ fontSize: '14px', color: '#aaa', letterSpacing: '2px' }}>MORE COMING</div>
          <div style={{ fontSize: '12px', color: '#bbb', letterSpacing: '1px' }}>SOON...</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#000', borderTop: '2px solid #222', padding: '5px 16px' }}>
        <span style={{ color: '#555', fontSize: '11px', letterSpacing: '1px' }}>BRUTA/OS ARCADE — {GAMES.length} GAMES INSTALLED</span>
      </div>
    </div>
  )
}
