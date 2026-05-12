import { useState } from 'react'
import { PxGrid4, PxGlobe, PxDocument } from '../../components/ui/PixelIcons'

const PROJECTS = [
  {
    id: 1,
    name: 'Main Reviews',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'TailwindCSS', 'Framer Motion', 'NextAuth', 'GitHub', 'Vercel'],
    desc: 'A modern movie review application built with Next.js, featuring dual-mode operation for both local and cloud-based review management.',
    status: 'LIVE',
    type: 'Web',
    url: 'https://main-reviews.vercel.app',
  },
  {
    id: 2,
    name: 'Main Win Portfolio',
    tech: ['React', 'TailwindCSS', 'Framer Motion', 'Zustand', 'Vite', 'GitHub', 'Vercel'],
    desc: 'A modern portfolio website built with Next.js, This very OS you\'re using. Draggable windows, pixel brutalism, simulated filesystem.',
    status: 'LIVE',
    type: 'Web',
    url: 'https://main-winportfolio.vercel.app',
  },
  {
    id: 3,
    name: 'SteamWish',
    tech: ['Laravel', 'MySql', 'Blade', 'JS', 'TailwindCSS', 'GitHub', 'Render'],
    desc: 'A modern game store built with Laravel, featuring a sleek interface and robust backend. Explore trending titles, manage your library, and discover game price, descounts, favorite games, etc.',
    status: 'LIVE',
    type: 'Web',
    url: 'https://steamwish.onrender.com',
  },
]

const STATUS_COLORS = {
  LIVE: { bg: '#000', fg: '#fff' },
  WIP: { bg: '#facc15', fg: '#000' },
  DONE: { bg: '#fff', fg: '#000', border: '2px solid #000' },
}

const TYPE_ICONS = {
  app: PxGrid4,
  web: PxGlobe,
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
              role={proj.url ? 'button' : undefined}
              tabIndex={proj.url ? 0 : undefined}
              onMouseEnter={() => setHovered(proj.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => proj.url && window.open(proj.url, '_blank', 'noopener,noreferrer')}
              onKeyDown={(e) => e.key === 'Enter' && proj.url && window.open(proj.url, '_blank', 'noopener,noreferrer')}
              style={{
                border: '2px solid #000',
                background: isHovered ? '#facc15' : '#fff',
                boxShadow: isHovered ? '6px 6px 0px #000' : '4px 4px 0px #000',
                padding: '20px',
                cursor: proj.url ? 'pointer' : 'default',
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
                  {isHovered && proj.url && (
                    <span style={{ fontSize: '10px', opacity: 0.7 }}>↗</span>
                  )}
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
