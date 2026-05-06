import React from 'react'

const px = { fontFamily: 'var(--font-family-pixel)' }

const SKILLS = ['React', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'Docker', 'TailwindCSS', 'GraphQL']

const STATS = [
  { label: 'YEARS EXP', value: '5+' },
  { label: 'PROJECTS', value: '32' },
  { label: 'COMMITS', value: '4.1K' },
  { label: 'COFFEE', value: '∞' },
]

export default function About() {
  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', background: '#fff', padding: '24px' }}>

      {/* Header row */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap' }}>

        {/* Avatar block */}
        <div style={{
          width: '96px', height: '96px', flexShrink: 0,
          border: '3px solid #000', background: '#facc15',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          {/* Pixel avatar (inline SVG) */}
          <svg viewBox="0 0 16 16" width="64" height="64" style={{ imageRendering: 'pixelated' }} fill="#000">
            <rect x="4" y="1" width="8" height="7"/>
            <rect x="2" y="8" width="12" height="6"/>
            <rect x="3" y="14" width="4" height="2"/>
            <rect x="9" y="14" width="4" height="2"/>
            <rect x="5" y="3" width="2" height="1" fill="#facc15"/>
            <rect x="9" y="3" width="2" height="1" fill="#facc15"/>
            <rect x="5" y="6" width="6" height="1" fill="#facc15"/>
          </svg>
        </div>

        {/* Name + role */}
        <div style={{ flex: 1, minWidth: '180px' }}>
          <div style={{ ...px, fontSize: '22px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '4px' }}>
            ALEX MONROE
          </div>
          <div style={{
            ...px, fontSize: '12px', letterSpacing: '1px',
            background: '#000', color: '#facc15',
            display: 'inline-block', padding: '3px 10px', marginBottom: '8px',
          }}>
            FULL STACK DEVELOPER
          </div>
          <div style={{ ...px, fontSize: '12px', color: '#555', lineHeight: '1.6' }}>
            📍 San Francisco, CA &nbsp;|&nbsp; 🌐 alexmonroe.dev
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '3px solid #000', marginBottom: '20px' }} />

      {/* Bio */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ ...px, fontSize: '13px', letterSpacing: '1px', marginBottom: '8px', fontWeight: 'bold' }}>
          // BIO
        </div>
        <p style={{ ...px, fontSize: '12px', color: '#333', lineHeight: '1.8', margin: 0 }}>
          Passionate developer with 5+ years of experience building modern web applications.
          I thrive at the intersection of design and engineering — crafting products that are
          both beautiful and performant. When I'm not shipping code, I'm tinkering with pixel
          art, retro game engines, or over-engineering my dev setup.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '20px', border: '3px solid #000' }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            flex: 1, textAlign: 'center', padding: '12px 4px',
            borderRight: i < STATS.length - 1 ? '2px solid #000' : 'none',
          }}>
            <div style={{ ...px, fontSize: '20px', fontWeight: 'bold' }}>{s.value}</div>
            <div style={{ ...px, fontSize: '10px', color: '#666', marginTop: '2px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ ...px, fontSize: '13px', letterSpacing: '1px', marginBottom: '10px', fontWeight: 'bold' }}>
          // SKILLS
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {SKILLS.map((skill) => (
            <span key={skill} style={{
              ...px, fontSize: '11px', letterSpacing: '1px',
              padding: '4px 10px',
              border: '2px solid #000',
              background: 'transparent',
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '2px solid #000', marginBottom: '16px' }} />

      {/* Footer */}
      <div style={{ ...px, fontSize: '10px', color: '#aaa', letterSpacing: '1px' }}>
        BRUTA/OS — about.exe v1.0.0
      </div>
    </div>
  )
}
