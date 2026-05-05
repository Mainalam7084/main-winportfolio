import React, { useState } from 'react'
import { PxGrid4, PxGlobe, PxDocument } from '../../components/ui/PixelIcons'

const PROJECTS = [
  {
    id: 1,
    name: 'Web OS Portfolio',
    tech: ['React', 'Vite', 'TailwindCSS', 'Zustand'],
    desc: 'This very OS you\'re using. Draggable windows, pixel brutalism, simulated filesystem.',
    status: 'LIVE',
    type: 'app',
  },
  {
    id: 2,
    name: 'Project Alpha',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    desc: 'Full-stack web application with server-side rendering and type-safe database ORM.',
    status: 'WIP',
    type: 'web',
  },
  {
    id: 3,
    name: 'Pixel Engine',
    tech: ['Canvas API', 'JavaScript', 'WebGL'],
    desc: 'Retro game engine built in pure JS. Sprite rendering, tilemap, input handling.',
    status: 'DONE',
    type: 'tool',
  },
  {
    id: 4,
    name: 'CLI Toolkit',
    tech: ['Node.js', 'Commander.js', 'Ink'],
    desc: 'Developer CLI utilities. File scaffolding, git helpers, project templates.',
    status: 'WIP',
    type: 'tool',
  },
]

const STATUS_COLORS = {
  LIVE: { bg: '#000', fg: '#fff' },
  WIP:  { bg: '#facc15', fg: '#000' },
  DONE: { bg: '#fff', fg: '#000', border: '2px solid #000' },
}

const TYPE_ICONS = {
  app:  PxGrid4,
  web:  PxGlobe,
  tool: PxDocument,
}

export default function Projects() {
  const [hovered, setHovered] = useState(null)

  return (
    <div
      className="w-full h-full overflow-y-auto"
      style={{ background: '#fff', fontFamily: 'var(--font-family-sans)' }}
    >
      {/* Header */}
      <div style={{ background: '#000', borderBottom: '3px solid #000', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <PxGrid4 size={20} style={{ color: '#fff' }} />
        <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '22px', color: '#fff', letterSpacing: '2px' }}>
          PROJECTS_
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-family-pixel)', fontSize: '14px', color: '#999', opacity: 0.9 }}>
          {PROJECTS.length} items
        </span>
      </div>

      {/* Grid */}
      <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
        {PROJECTS.map((proj) => {
          const Icon = TYPE_ICONS[proj.type] || PxGrid4
          const sc = STATUS_COLORS[proj.status]
          const isHovered = hovered === proj.id
          return (
            <div
              key={proj.id}
              onMouseEnter={() => setHovered(proj.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                border: '2px solid #000',
                background: isHovered ? '#facc15' : '#fff',
                boxShadow: isHovered ? '6px 6px 0px #000' : '4px 4px 0px #000',
                padding: '20px',
                cursor: 'pointer',
                color: '#000',
                transition: 'box-shadow 0.05s, background 0.05s',
              }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={18} className="text-black" />
                  <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '15px' }}>
                    {proj.name}
                  </span>
                </div>
                <span style={{
                  background: sc.bg,
                  color: sc.fg,
                  fontSize: '10px',
                  fontWeight: 'bold',
                  padding: '2px 8px',
                  border: sc.border ?? '2px solid #000',
                  flexShrink: 0,
                  marginLeft: '8px',
                }}>
                  {proj.status}
                </span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '12px', color: '#333', marginBottom: '12px', lineHeight: '1.6' }}>
                {proj.desc}
              </p>

              {/* Tech stack */}
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {proj.tech.map(t => (
                  <span key={t} style={{
                    background: '#000',
                    color: '#facc15',
                    fontSize: '10px',
                    padding: '2px 6px',
                    letterSpacing: '0.5px',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '2px solid #000', padding: '12px 20px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '12px', color: '#777' }}>
          &gt; MORE COMING SOON_
        </span>
      </div>
    </div>
  )
}
