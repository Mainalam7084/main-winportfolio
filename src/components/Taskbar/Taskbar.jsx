import React, { useState } from 'react'
import SystemTray from '../SystemTray/SystemTray'
import { useStore } from '../../core/store'
import { AppRegistry } from '../../core/AppRegistry'
import { AnimatePresence, motion } from 'framer-motion'
import {
  PxWindows, PxSearch, PxFolder, PxActivity, PxChevronRight,
} from '../ui/PixelIcons'

const TASKBAR_H = 48  // px

export default function Taskbar() {
  const windows = useStore(state => state.windows)
  const activeWindowId = useStore(state => state.activeWindowId)
  const toggleWindowConfig = useStore(state => state.toggleWindowConfig)
  const isStartMenuOpen = useStore(state => state.isStartMenuOpen)
  const toggleStartMenu = useStore(state => state.toggleStartMenu)
  const closeStartMenu = useStore(state => state.closeStartMenu)
  const clearAllWindows = useStore(state => state.clearAllWindows)
  const openWindow = useStore(state => state.openWindow)

  const [searchQuery, setSearchQuery] = useState('')
  const isSearching = searchQuery.trim().length > 0

  const openExplorer = () => openWindow({
    app: 'explorer', title: 'File Explorer',
    defaultSize: AppRegistry.explorer.defaultSize,
    defaultPosition: AppRegistry.explorer.defaultPosition,
    props: { initialPath: 'This PC' },
  })

  const searchResults = Object.values(AppRegistry).filter(app =>
    app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const appGroups = windows.reduce((acc, win) => {
    if (!acc[win.app]) acc[win.app] = []
    acc[win.app].push(win)
    return acc
  }, {})

  return (
    <>
      {/* Overlay to close menus */}
      {isStartMenuOpen && <div className="fixed inset-0 z-40" onPointerDown={closeStartMenu} />}
      {isSearching && !isStartMenuOpen && <div className="fixed inset-0 z-40" onPointerDown={() => setSearchQuery('')} />}

      {/* ── Search Results Popup ── */}
      <AnimatePresence>
        {isSearching && !isStartMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.08 }}
            style={{
              position: 'absolute', bottom: TASKBAR_H, left: 60,
              width: 320, maxHeight: 380,
              background: '#fff', border: '3px solid #000',
              boxShadow: '6px 6px 0px #000',
              display: 'flex', flexDirection: 'column', zIndex: 60,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '8px 14px', borderBottom: '2px solid #000', fontFamily: 'var(--font-family-pixel)', fontSize: '13px', color: '#000' }}>
              &gt; SEARCH: {searchQuery}
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {searchResults.length > 0 ? searchResults.map(app => (
                <div
                  key={app.id}
                  onClick={() => { setSearchQuery(''); openWindow({ app: app.id, title: app.title }) }}
                  style={{
                    display: 'flex', alignItems: 'center', padding: '10px 14px',
                    cursor: 'pointer', gap: '12px', borderBottom: '1px solid #e5e5e5',
                    transition: 'none',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(250,204,21,0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ width: 32, height: 32, border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: '#f5f5f5' }}>
                    <app.icon size={16} style={{ color: '#000' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '14px', color: '#000' }}>{app.title}</div>
                    <div style={{ fontSize: '10px', color: '#777' }}>Desktop App</div>
                  </div>
                  <PxChevronRight size={12} style={{ color: '#999' }} />
                </div>
              )) : (
                <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'var(--font-family-pixel)', fontSize: '14px', color: '#555' }}>
                  [NO RESULTS]
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Start Menu ── */}
      <AnimatePresence>
        {isStartMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.08 }}
            style={{
              position: 'absolute', bottom: TASKBAR_H, left: 0,
              width: 380, height: 500,
              background: '#fff', border: '3px solid #000', borderBottom: 'none',
              boxShadow: '6px -6px 0px #000',
              display: 'flex', flexDirection: 'column', zIndex: 60,
            }}
          >
            {/* Start header */}
            <div style={{ background: '#000', padding: '12px 16px', borderBottom: '3px solid #000', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <PxWindows size={18} style={{ color: '#fff' }} />
              <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '18px', color: '#fff', letterSpacing: '2px' }}>
                START
              </span>
            </div>

            {/* Pinned apps grid */}
            <div style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
              <div style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '11px', color: '#777', marginBottom: '12px', letterSpacing: '1px' }}>
                PINNED APPS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {Object.values(AppRegistry).map(app => (
                  <div
                    key={app.id}
                    onClick={() => { closeStartMenu(); openWindow({ app: app.id, title: app.title }) }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      padding: '10px 4px', cursor: 'pointer', gap: '8px',
                      border: '2px solid transparent', transition: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(250,204,21,0.3)'
                      e.currentTarget.style.borderColor = '#000'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'transparent'
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, background: '#f5f5f5', border: '2px solid #000',
                      boxShadow: '3px 3px 0 #000',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <app.icon size={20} style={{ color: '#000' }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '11px', color: '#000', textAlign: 'center', lineHeight: '1.2', width: '100%' }}>
                      {app.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer / user */}
            <div style={{ borderTop: '2px solid #e5e5e5', padding: '10px 14px', background: '#fafafa', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ProfileAvatar />
              <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '13px', color: '#000' }}>MAIN_USER</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Taskbar Bar ── */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: TASKBAR_H,
          background: '#fff',
          borderTop: '3px solid #000',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          color: '#000', zIndex: 50,
        }}
      >
        {/* Left section */}
        <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>

          {/* Start button */}
          <TaskBtn
            active={isStartMenuOpen}
            onClick={toggleStartMenu}
            style={{ width: 52, background: isStartMenuOpen ? '#000' : '#fff', borderRight: '2px solid #000' }}
          >
            <PxWindows size={20} style={{ color: isStartMenuOpen ? '#fff' : '#000' }} />
          </TaskBtn>

          {/* Search */}
          <div style={{
            height: '28px', width: 220, margin: '0 6px',
            background: '#f5f5f5', border: '2px solid #000',
            display: 'flex', alignItems: 'center', gap: '6px', padding: '0 10px',
          }}>
            <PxSearch size={14} style={{ color: '#000', flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { if (isStartMenuOpen) closeStartMenu(); setSearchQuery(e.target.value) }}
              placeholder="SEARCH..."
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                color: '#000', fontSize: '12px', width: '100%',
                fontFamily: 'var(--font-family-sans)',
              }}
            />
          </div>

          {/* Task view / clear */}
          <TaskBtn title="Clear all windows" onClick={clearAllWindows}>
            <PxActivity size={18} style={{ color: '#000' }} />
          </TaskBtn>

          {/* File Explorer pinned */}
          <TaskBtn
            active={!!appGroups['explorer']}
            onClick={openExplorer}
            title="File Explorer"
          >
            <PxFolder size={20} style={{ color: '#000' }} />
            {appGroups['explorer'] && <ActiveDot />}
          </TaskBtn>

          {/* Open app groups */}
          {Object.entries(appGroups).map(([appId, groupWindows]) => {
            if (appId === 'explorer') return null
            const cfg = AppRegistry[appId]
            if (!cfg) return null
            const isActiveGroup = groupWindows.some(w => w.id === activeWindowId)
            return (
              <TaskBtn
                key={appId}
                active={isActiveGroup}
                onClick={() => toggleWindowConfig(groupWindows[0].id)}
                title={cfg.title}
              >
                <cfg.icon size={20} style={{ color: '#000' }} />
                {groupWindows.length > 0 && <ActiveDot highlight={isActiveGroup} />}
              </TaskBtn>
            )
          })}
        </div>

        {/* Right: System Tray */}
        <SystemTray />
      </div>
    </>
  )
}

function TaskBtn({ children, active, onClick, title, style = {} }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        height: '100%', minWidth: 48,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: hovered ? 'rgba(250,204,21,0.4)' : active ? 'rgba(250,204,21,0.2)' : 'transparent',
        border: 'none',
        borderBottom: active ? '3px solid #000' : '3px solid transparent',
        cursor: 'pointer', outline: 'none', gap: '2px',
        transition: 'none',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

function ProfileAvatar() {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ position: 'relative', width: 96, height: 54, flexShrink: 0, border: '2px solid #000' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src="/image1.png"
        alt="profile"
        draggable={false}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'contain',
          imageRendering: 'pixelated',
          opacity: hovered ? 0 : 1,
          transition: 'opacity 300ms',
          pointerEvents: 'none', userSelect: 'none',
        }}
      />
      <img
        src="/image2.png"
        alt="profile helmet"
        draggable={false}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'contain',
          imageRendering: 'pixelated',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 300ms',
          pointerEvents: 'none', userSelect: 'none',
        }}
      />
    </div>
  )
}

function ActiveDot({ highlight }) {
  return (
    <div style={{
      position: 'absolute', bottom: 6,
      width: 4, height: 4,
      background: '#000',
    }} />
  )
}
