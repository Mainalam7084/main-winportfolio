import React, { useState, useEffect } from 'react'
import SystemTray from '../SystemTray/SystemTray'
import { useStore } from '../../core/store'
import { AppRegistry } from '../../core/AppRegistry'
import { AnimatePresence, motion } from 'framer-motion'
import {
  PxWindows, PxSearch, PxFolder, PxActivity, PxChevronRight, PxClose,
} from '../ui/PixelIcons'
import { useMobile, MOBILE_DOCK_H, DESKTOP_TASKBAR_H } from '../../hooks/useMobile'

const TASKBAR_H = DESKTOP_TASKBAR_H

export default function Taskbar() {
  // ── Store ──────────────────────────────────────────────────────────
  const windows            = useStore(state => state.windows)
  const activeWindowId     = useStore(state => state.activeWindowId)
  const toggleWindowConfig = useStore(state => state.toggleWindowConfig)
  const isStartMenuOpen    = useStore(state => state.isStartMenuOpen)
  const toggleStartMenu    = useStore(state => state.toggleStartMenu)
  const closeStartMenu     = useStore(state => state.closeStartMenu)
  const clearAllWindows    = useStore(state => state.clearAllWindows)
  const openWindow         = useStore(state => state.openWindow)

  // ── Local state (all hooks unconditionally at top) ─────────────────
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileClock, setMobileClock] = useState(() => new Date())
  const { isMobile } = useMobile()

  useEffect(() => {
    if (!isMobile) return
    const t = setInterval(() => setMobileClock(new Date()), 1000)
    return () => clearInterval(t)
  }, [isMobile])

  // ── Shared computed ────────────────────────────────────────────────
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

  // ── MOBILE DOCK ────────────────────────────────────────────────────
  if (isMobile) {
    const timeStr = mobileClock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    return (
      <>
        {/* Overlay to close start menu */}
        {isStartMenuOpen && (
          <div
            className="fixed inset-0"
            style={{ zIndex: 52 }}
            onPointerDown={closeStartMenu}
          />
        )}

        {/* ── Mobile Fullscreen App Launcher ── */}
        <AnimatePresence>
          {isStartMenuOpen && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 36 }}
              style={{
                position: 'fixed',
                left: 0, right: 0, top: 0,
                bottom: MOBILE_DOCK_H,
                background: '#fff',
                border: '3px solid #000',
                borderBottom: 'none',
                zIndex: 53,
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div style={{
                background: '#000',
                padding: '14px 16px',
                borderBottom: '3px solid #000',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <PxWindows size={20} style={{ color: '#facc15' }} />
                  <span style={{
                    fontFamily: 'var(--font-family-pixel)',
                    fontSize: '20px', color: '#fff', letterSpacing: '3px',
                  }}>
                    BRUTA/OS
                  </span>
                </div>
                <button
                  onClick={closeStartMenu}
                  style={{
                    width: 40, height: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'transparent', border: '2px solid #555',
                    color: '#fff', cursor: 'pointer', outline: 'none',
                    touchAction: 'manipulation',
                  }}
                >
                  <PxClose size={14} />
                </button>
              </div>

              {/* Search bar */}
              <div style={{ padding: '10px 12px', borderBottom: '2px solid #e5e5e5', flexShrink: 0 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: '#f5f5f5', border: '2px solid #000',
                  padding: '10px 14px',
                }}>
                  <PxSearch size={16} style={{ color: '#000', flexShrink: 0 }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="SEARCH APPS..."
                    style={{
                      background: 'transparent', border: 'none', outline: 'none',
                      color: '#000', fontSize: '14px', width: '100%',
                      fontFamily: 'var(--font-family-sans)',
                    }}
                  />
                  {isSearching && (
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}
                    >
                      <PxClose size={12} style={{ color: '#999' }} />
                    </button>
                  )}
                </div>
              </div>

              {/* App grid */}
              <div style={{
                flex: 1, overflowY: 'auto',
                padding: '12px 8px',
                WebkitOverflowScrolling: 'touch',
              }}>
                {(!isSearching || searchResults.length > 0) && (
                  <div style={{
                    fontFamily: 'var(--font-family-pixel)',
                    fontSize: '11px', color: '#777',
                    marginBottom: 12, letterSpacing: '1px',
                    paddingLeft: 4,
                  }}>
                    {isSearching ? `RESULTS FOR "${searchQuery.toUpperCase()}"` : 'ALL APPS'}
                  </div>
                )}

                {isSearching && searchResults.length === 0 ? (
                  <div style={{
                    textAlign: 'center', padding: '40px 20px',
                    fontFamily: 'var(--font-family-pixel)', fontSize: '14px', color: '#555',
                  }}>
                    [NO RESULTS]
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 4,
                  }}>
                    {(isSearching ? searchResults : Object.values(AppRegistry)).map(app => (
                      <motion.div
                        key={app.id}
                        whileTap={{ scale: 0.84 }}
                        onClick={() => {
                          setSearchQuery('')
                          closeStartMenu()
                          openWindow({ app: app.id, title: app.title })
                        }}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center',
                          padding: '10px 4px', cursor: 'pointer', gap: 8,
                          touchAction: 'manipulation',
                        }}
                      >
                        <div style={{
                          width: 52, height: 52,
                          background: '#f5f5f5', border: '2px solid #000',
                          boxShadow: '3px 3px 0 #000',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <app.icon size={26} style={{ color: '#000' }} />
                        </div>
                        <span style={{
                          fontFamily: 'var(--font-family-pixel)',
                          fontSize: '11px', color: '#000',
                          textAlign: 'center', lineHeight: '1.2',
                          width: '100%', wordBreak: 'break-word',
                        }}>
                          {app.title}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div style={{
                borderTop: '2px solid #e5e5e5', padding: '10px 14px',
                background: '#fafafa', display: 'flex', alignItems: 'center', gap: 10,
                flexShrink: 0,
              }}>
                <div style={{
                  width: 32, height: 32,
                  border: '2px solid #000', background: '#f5f5f5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <PxWindows size={16} style={{ color: '#000' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '13px', color: '#000' }}>
                  MAIN_USER
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom Dock ── */}
        <div
          style={{
            position: 'fixed',
            bottom: 0, left: 0, right: 0,
            height: MOBILE_DOCK_H,
            background: '#fff',
            borderTop: '3px solid #000',
            display: 'flex', alignItems: 'center',
            padding: '0 4px',
            zIndex: 54,
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          {/* Start / launcher */}
          <MobileDockBtn
            active={isStartMenuOpen}
            onClick={toggleStartMenu}
            style={{ background: isStartMenuOpen ? '#000' : 'transparent' }}
          >
            <PxWindows size={22} style={{ color: isStartMenuOpen ? '#fff' : '#000' }} />
          </MobileDockBtn>

          {/* File explorer */}
          <MobileDockBtn active={!!appGroups['explorer']} onClick={openExplorer} title="Explorer">
            <PxFolder size={22} style={{ color: '#000' }} />
            {appGroups['explorer'] && <MobileActiveDot />}
          </MobileDockBtn>

          {/* Open app groups */}
          {Object.entries(appGroups).map(([appId, groupWins]) => {
            if (appId === 'explorer') return null
            const cfg = AppRegistry[appId]
            if (!cfg) return null
            const isActiveGroup = groupWins.some(w => w.id === activeWindowId)
            return (
              <MobileDockBtn
                key={appId}
                active={isActiveGroup}
                onClick={() => toggleWindowConfig(groupWins[0].id)}
                title={cfg.title}
              >
                <cfg.icon size={22} style={{ color: '#000' }} />
                <MobileActiveDot highlight={isActiveGroup} />
              </MobileDockBtn>
            )
          })}

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Clock */}
          <div style={{
            fontFamily: 'var(--font-family-pixel)',
            fontSize: '16px', color: '#000',
            padding: '0 14px',
            borderLeft: '2px solid #e5e5e5',
            lineHeight: 1,
            flexShrink: 0,
          }}>
            {timeStr}
          </div>
        </div>
      </>
    )
  }

  // ── DESKTOP TASKBAR (UNCHANGED) ────────────────────────────────────
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
            <div style={{ background: '#000', padding: '12px 16px', borderBottom: '3px solid #000', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <PxWindows size={18} style={{ color: '#fff' }} />
              <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '18px', color: '#fff', letterSpacing: '2px' }}>
                START
              </span>
            </div>

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
        <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
          <TaskBtn
            active={isStartMenuOpen}
            onClick={toggleStartMenu}
            style={{ width: 52, background: isStartMenuOpen ? '#000' : '#fff', borderRight: '2px solid #000' }}
          >
            <PxWindows size={20} style={{ color: isStartMenuOpen ? '#fff' : '#000' }} />
          </TaskBtn>

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

          <TaskBtn title="Clear all windows" onClick={clearAllWindows}>
            <PxActivity size={18} style={{ color: '#000' }} />
          </TaskBtn>

          <TaskBtn
            active={!!appGroups['explorer']}
            onClick={openExplorer}
            title="File Explorer"
          >
            <PxFolder size={20} style={{ color: '#000' }} />
            {appGroups['explorer'] && <ActiveDot />}
          </TaskBtn>

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

        <SystemTray />
      </div>
    </>
  )
}

// ── Mobile components ───────────────────────────────────────────────

function MobileDockBtn({ children, active, onClick, title, style: extraStyle = {} }) {
  return (
    <motion.button
      onClick={onClick}
      title={title}
      whileTap={{ scale: 0.82 }}
      style={{
        position: 'relative',
        height: '100%', minWidth: 56,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: active ? 'rgba(250,204,21,0.2)' : 'transparent',
        border: 'none',
        borderBottom: active ? '3px solid #000' : '3px solid transparent',
        cursor: 'pointer', outline: 'none', gap: 2,
        touchAction: 'manipulation',
        ...extraStyle,
      }}
    >
      {children}
    </motion.button>
  )
}

function MobileActiveDot() {
  return (
    <div style={{
      position: 'absolute', bottom: 6,
      width: 4, height: 4, background: '#000',
      borderRadius: '50%',
    }} />
  )
}

// ── Desktop components ──────────────────────────────────────────────

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

function ActiveDot() {
  return (
    <div style={{
      position: 'absolute', bottom: 6,
      width: 4, height: 4,
      background: '#000',
    }} />
  )
}
