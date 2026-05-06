import React, { useState, useRef } from 'react'
import { useFileSystem } from '../../core/fileSystemStore'
import { useStore } from '../../core/store'
import {
  PxFolder, PxDocument, PxImage, PxVideo, PxHardDrive,
  PxMonitor, PxDownload, PxArrowLeft, PxArrowRight,
} from '../../components/ui/PixelIcons'

// Maps display path name → filesystem store key
const FS_KEY = {
  Desktop:    'desktop',
  Downloads:  'downloads',
  Documents:  'documents',
  Photos:     'photos',
  Videos:     'videos',
}

const SIDEBAR = [
  { label: 'QUICK ACCESS', isLabel: true },
  { label: 'Desktop',   key: 'Desktop',   Icon: PxMonitor,   color: '#000' },
  { label: 'Downloads', key: 'Downloads', Icon: PxDownload,  color: '#000' },
  { label: 'Documents', key: 'Documents', Icon: PxDocument,  color: '#000' },
  { label: 'Photos',    key: 'Photos',    Icon: PxImage,     color: '#000' },
  { label: 'Videos',    key: 'Videos',    Icon: PxVideo,     color: '#000' },
  { label: 'THIS PC',   isLabel: true },
  { label: 'Local Disk (C:)', key: 'This PC', Icon: PxHardDrive, color: '#000' },
]

function getIconInfo(item) {
  if (item.type === 'folder') return { Icon: PxFolder,   color: '#000' }
  const mime = item.mimeType || ''
  if (mime.startsWith('image/'))        return { Icon: PxImage,    color: '#555' }
  if (mime.startsWith('video/'))        return { Icon: PxVideo,    color: '#555' }
  if (mime === 'application/pdf')       return { Icon: PxDocument, color: '#000' }
  // Derive from file extension as fallback
  const ext = item.name?.split('.').pop()?.toLowerCase()
  if (['jpg','jpeg','png','gif','webp','avif'].includes(ext)) return { Icon: PxImage,    color: '#555' }
  if (['mp4','webm','mov','avi','mkv'].includes(ext))         return { Icon: PxVideo,    color: '#555' }
  return { Icon: PxDocument, color: '#555' }
}

// Consistent button style for toolbar
const toolBtn = {
  background: '#fff',
  color: '#000',
  border: '2px solid #000',
  padding: '4px 12px',
  cursor: 'pointer',
  fontSize: '12px',
  fontFamily: 'var(--font-family-sans)',
  boxShadow: '2px 2px 0px #000',
  transition: 'none',
  lineHeight: '1.4',
}

export default function Explorer({ initialPath = 'This PC' }) {
  const [currentPath, setCurrentPath] = useState(initialPath)
  const [history, setHistory] = useState([initialPath])
  const [histIdx, setHistIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [preview, setPreview] = useState(null)
  const { fs } = useFileSystem()
  const openWindow = useStore(state => state.openWindow)
  const lastClick = useRef({ id: null, time: 0 })

  const navigate = (path) => {
    const next = history.slice(0, histIdx + 1)
    next.push(path)
    setHistory(next)
    setHistIdx(next.length - 1)
    setCurrentPath(path)
    setSelected(null)
  }

  const goBack = () => {
    if (histIdx > 0) { setHistIdx(histIdx - 1); setCurrentPath(history[histIdx - 1]); setSelected(null) }
  }
  const goForward = () => {
    if (histIdx < history.length - 1) { setHistIdx(histIdx + 1); setCurrentPath(history[histIdx + 1]); setSelected(null) }
  }

  const fsKey = FS_KEY[currentPath]
  const files = fsKey ? (fs[fsKey] ?? []) : []

  const handleItemClick = (item) => {
    const itemId = item.id || item.name
    const now = Date.now()
    setSelected(itemId)

    if (lastClick.current.id === itemId && now - lastClick.current.time < 400) {
      lastClick.current = { id: null, time: 0 }
      if (item.type === 'folder') {
        if (item.path === '/projects') {
          openWindow({ app: 'projects', title: 'Projects', props: {} })
        } else {
          navigate(item.name)
        }
      } else if (item.url) {
        setPreview(item)
      }
    } else {
      lastClick.current = { id: itemId, time: now }
    }
  }

  return (
    <div className="w-full h-full flex flex-col" style={{ background: '#fff', fontFamily: 'var(--font-family-sans)' }}>

      {/* ── Toolbar ── */}
      <div style={{ background: '#fafafa', borderBottom: '2px solid #000', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button style={{ ...toolBtn, opacity: histIdx > 0 ? 1 : 0.3 }} onClick={goBack}>
          <PxArrowLeft size={12} className="inline" /> BACK
        </button>
        <button style={{ ...toolBtn, opacity: histIdx < history.length - 1 ? 1 : 0.3 }} onClick={goForward}>
          FWD <PxArrowRight size={12} className="inline" />
        </button>

        {/* Address bar */}
        <div style={{
          flex: 1, background: '#fff', border: '2px solid #000',
          padding: '4px 12px', color: '#000', fontSize: '13px',
          display: 'flex', alignItems: 'center', gap: '8px',
          fontFamily: 'var(--font-family-sans)',
        }}>
          <PxFolder size={14} className="shrink-0" style={{ color: '#000' }} />
          <span>{currentPath}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── Sidebar ── */}
        <div style={{ width: '160px', background: '#fafafa', borderRight: '2px solid #000', overflowY: 'auto', padding: '8px 0', flexShrink: 0 }}>
          {SIDEBAR.map((item, i) =>
            item.isLabel ? (
              <div key={i} style={{ padding: '10px 14px 4px', fontSize: '10px', color: '#777', letterSpacing: '1px', fontWeight: 'bold' }}>
                {item.label}
              </div>
            ) : (
              <button
                key={i}
                onClick={() => navigate(item.key)}
                style={{
                  width: '100%', padding: '8px 14px',
                  cursor: 'pointer', textAlign: 'left',
                  color: '#000',
                  background: currentPath === item.key ? '#facc15' : 'transparent',
                  borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                  borderLeft: `3px solid ${currentPath === item.key ? '#000' : 'transparent'}`,
                  fontSize: '12px', outline: 'none',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  transition: 'none',
                }}
                onMouseEnter={(e) => { if (currentPath !== item.key) e.currentTarget.style.background = 'rgba(250,204,21,0.3)' }}
                onMouseLeave={(e) => { if (currentPath !== item.key) e.currentTarget.style.background = 'transparent' }}
              >
                <item.Icon size={14} style={{ color: item.color, flexShrink: 0 }} />
                {item.label}
              </button>
            )
          )}
        </div>

        {/* ── Main content ── */}
        <div style={{ flex: 1, background: '#fff', overflowY: 'auto', padding: '20px', position: 'relative' }}>

          {/* Path header */}
          <div style={{ borderBottom: '2px solid #000', marginBottom: '18px', paddingBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '20px', color: '#000' }}>{currentPath}</span>
            <span style={{ fontSize: '11px', color: '#777' }}>{files.length} item(s)</span>
          </div>

          {/* File preview overlay */}
          {preview && (
            <div
              onClick={() => setPreview(null)}
              style={{
                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 20,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px',
              }}
            >
              {preview.mimeType?.startsWith('image/') && (
                <img
                  src={preview.url} alt={preview.name}
                  onClick={e => e.stopPropagation()}
                  style={{ maxWidth: '90%', maxHeight: '75%', border: '4px solid #fff', boxShadow: '8px 8px 0 #000' }}
                />
              )}
              {preview.mimeType?.startsWith('video/') && (
                <video
                  src={preview.url} controls
                  onClick={e => e.stopPropagation()}
                  style={{ maxWidth: '90%', maxHeight: '75%', border: '4px solid #fff' }}
                />
              )}
              <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '14px', color: '#fff' }}>{preview.name}</span>
              <button
                onClick={() => setPreview(null)}
                style={{ ...toolBtn, background: '#facc15', border: '2px solid #000', boxShadow: '3px 3px 0 #000' }}
              >
                [CLOSE]
              </button>
            </div>
          )}

          {/* Files grid */}
          {files.length === 0 ? (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              height: '120px', color: '#aaa', border: '2px dashed #ccc',
              fontFamily: 'var(--font-family-pixel)', fontSize: '16px',
            }}>
              [EMPTY FOLDER]
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {files.map((file) => {
                const { Icon, color } = getIconInfo(file)
                const itemId = file.id || file.name
                const isSel = selected === itemId
                return (
                  <div
                    key={itemId}
                    onClick={() => handleItemClick(file)}
                    style={{
                      width: '88px', display: 'flex', flexDirection: 'column', alignItems: 'center',
                      padding: '10px 6px', cursor: 'pointer', gap: '6px',
                      background: isSel ? '#facc15' : 'transparent',
                      border: `2px solid ${isSel ? '#000' : 'transparent'}`,
                      boxShadow: isSel ? '3px 3px 0 #000' : 'none',
                      transition: 'none',
                    }}
                    onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.background = 'rgba(250,204,21,0.25)' }}
                    onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.background = 'transparent' }}
                  >
                    <Icon size={40} style={{ color }} />
                    <span style={{ fontSize: '11px', textAlign: 'center', wordBreak: 'break-word', color: '#000', lineHeight: '1.2', maxWidth: '80px' }}>
                      {file.name}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
