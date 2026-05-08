import React from 'react'

const px = { fontFamily: 'var(--font-family-pixel)' }

const SKILLS = ['JAVA', 'React', 'Laravel', 'JavaScript', 'PHP', 'HTML', 'CSS', 'MySQL', 'Docker', 'TailwindCSS', 'GitHub']

const STATS = [
  { label: 'YEARS EXP', value: 'N/A' },
  { label: 'PROJECTS', value: 'Enough' },
  { label: 'COMMITS', value: 'Too Many' },
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
          <img src="public/main.png" alt="Main" className="w-full h-full object-cover" />
        </div>

        {/* Name + role */}
        <div style={{ flex: 1, minWidth: '180px' }}>
          <div style={{ ...px, fontSize: '22px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '4px' }}>
            Main Alam
          </div>
          <div style={{
            ...px, fontSize: '12px', letterSpacing: '1px',
            background: '#000', color: '#facc15',
            display: 'inline-block', padding: '3px 10px', marginBottom: '8px',
          }}>
            FULL STACK WEB DEVELOPER
          </div>
          <div style={{ ...px, fontSize: '12px', color: '#555', lineHeight: '1.6' }}>
            📍 Madrid, Spain |  🌐 <a href="mailto:mainalam.tr7@gmail.com">mainalam.tr7@gmail.com</a>
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
          I am characterized by my calm demeanor,
          patience, and constant curiosity that drives me to
          keep learning. My experience living in Bangladesh
          and Spain has given me a multicultural
          perspective, a great capacity for adaptation, and
          an open mind. I work comfortably both as part of
          a team and independently, always with
          responsibility and dedication.
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
              ...px, fontSize: '11px', letterSpacing: '2px',
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
