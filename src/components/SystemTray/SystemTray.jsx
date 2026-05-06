import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PxChevronUp, PxWifi, PxShield, PxUsb, PxBluetooth } from '../ui/PixelIcons'

export default function SystemTray() {
  const [time, setTime]             = useState(new Date())
  const [batteryLevel, setBattery]  = useState(100)
  const [isCharging, setIsCharging] = useState(false)
  const [showIcons, setShowIcons]   = useState(false)
  const [showPanel, setShowPanel]   = useState(false)
  const [wifi, setWifi]             = useState(true)
  const [bluetooth, setBluetooth]   = useState(false)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!('getBattery' in navigator)) return
    navigator.getBattery().then(b => {
      setBattery(Math.floor(b.level * 100))
      setIsCharging(b.charging)
      b.addEventListener('levelchange', () => setBattery(Math.floor(b.level * 100)))
      b.addEventListener('chargingchange', () => setIsCharging(b.charging))
    })
  }, [])

  const HH = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const DD = time.toLocaleDateString()

  const closeAll = () => { setShowPanel(false); setShowIcons(false) }

  return (
    <>
      {(showIcons || showPanel) && (
        <div className="fixed inset-0 z-40" onPointerDown={closeAll} />
      )}

      <div style={{ display: 'flex', height: '100%', alignItems: 'center', position: 'relative', zIndex: 50 }}>

        {/* Hidden icons toggle */}
        <TrayBtn onClick={() => { setShowIcons(v => !v); setShowPanel(false) }} active={showIcons}>
          <PxChevronUp
            size={14}
            style={{ color: '#000', transform: showIcons ? 'rotate(180deg)' : 'none', transition: 'none' }}
          />
        </TrayBtn>

        {/* Hidden icons popup */}
        <AnimatePresence>
          {showIcons && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.06 }}
              style={{
                position: 'absolute', bottom: 52, right: 0,
                background: '#fff', border: '3px solid #000',
                boxShadow: '4px -4px 0 #000',
                display: 'flex', gap: '4px', padding: '8px', zIndex: 60,
              }}
            >
              <TrayBtn title="Safely Remove Hardware"><PxUsb size={16} style={{ color: '#000' }} /></TrayBtn>
              <TrayBtn title="Security"><PxShield size={16} style={{ color: '#000' }} /></TrayBtn>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Network + Battery — opens quick settings panel */}
        <TrayBtn
          onClick={() => { setShowPanel(v => !v); setShowIcons(false) }}
          title="Quick Settings"
          active={showPanel}
        >
          <PxWifi size={16} style={{ color: wifi ? '#000' : '#aaa' }} />
          <div style={{ width: 18, height: 8, border: '2px solid #000', padding: '1px', display: 'flex', position: 'relative' }}>
            <div style={{
              flex: batteryLevel / 100,
              background: batteryLevel < 20 && !isCharging ? '#ff003c' : '#000',
            }} />
            {isCharging && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6px', color: '#facc15' }}>⚡</div>
            )}
          </div>
        </TrayBtn>

        {/* Quick Settings Panel */}
        <AnimatePresence>
          {showPanel && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.08 }}
              style={{
                position: 'absolute',
                bottom: 52,
                right: 0,
                width: 300,
                background: '#fff',
                border: '3px solid #000',
                boxShadow: '4px -4px 0 #000',
                zIndex: 60,
              }}
            >
              {/* Header */}
              <div style={{
                background: '#000',
                padding: '9px 14px',
                borderBottom: '2px solid #000',
              }}>
                <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '13px', color: '#fff', letterSpacing: '1px' }}>
                  QUICK SETTINGS
                </span>
              </div>

              {/* Toggle tiles */}
              <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <ToggleTile
                  icon={<PxWifi size={22} style={{ color: wifi ? '#000' : '#aaa' }} />}
                  label="WI-FI"
                  sub={wifi ? 'Connected' : 'Off'}
                  active={wifi}
                  onClick={() => setWifi(v => !v)}
                />
                <ToggleTile
                  icon={<PxBluetooth size={22} style={{ color: bluetooth ? '#000' : '#aaa' }} />}
                  label="BLUETOOTH"
                  sub={bluetooth ? 'On' : 'Off'}
                  active={bluetooth}
                  onClick={() => setBluetooth(v => !v)}
                />
              </div>

              {/* Battery row */}
              <div style={{
                borderTop: '2px solid #e5e5e5',
                padding: '10px 14px',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-family-pixel)', fontSize: '11px',
                  color: '#777', letterSpacing: '1px', flexShrink: 0,
                }}>
                  BATTERY
                </span>
                <div style={{
                  flex: 1, height: 8,
                  border: '2px solid #000', padding: '1px',
                  display: 'flex', overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${batteryLevel}%`,
                    background: batteryLevel < 20 && !isCharging ? '#ff003c' : '#000',
                    transition: 'none',
                  }} />
                </div>
                <span style={{
                  fontFamily: 'var(--font-family-pixel)', fontSize: '11px',
                  color: '#000', flexShrink: 0,
                }}>
                  {isCharging ? '⚡ ' : ''}{batteryLevel}%
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clock */}
        <TrayBtn style={{ flexDirection: 'column', gap: '1px', minWidth: 76, padding: '0 12px' }}>
          <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '15px', color: '#000', lineHeight: 1 }}>{HH}</span>
          <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: '10px', color: '#555', lineHeight: 1 }}>{DD}</span>
        </TrayBtn>

        {/* Show-desktop sliver */}
        <div
          style={{ width: 6, height: '100%', borderLeft: '2px solid #000', cursor: 'pointer' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(250,204,21,0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          title="Show Desktop"
        />
      </div>
    </>
  )
}

function ToggleTile({ icon, label, sub, active, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px',
        padding: '10px 12px',
        border: '2px solid #000',
        background: active ? '#facc15' : hov ? 'rgba(250,204,21,0.25)' : '#f5f5f5',
        boxShadow: active ? '3px 3px 0 #000' : 'none',
        cursor: 'pointer', outline: 'none', transition: 'none',
      }}
    >
      {icon}
      <span style={{
        fontFamily: 'var(--font-family-pixel)', fontSize: '11px',
        color: '#000', letterSpacing: '0.5px', marginTop: '4px',
      }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: '10px', color: '#666' }}>
        {sub}
      </span>
    </button>
  )
}

function TrayBtn({ children, onClick, title, active, style = {} }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height: '100%', padding: '0 8px',
        display: 'flex', alignItems: 'center', gap: '5px',
        background: hov || active ? 'rgba(250,204,21,0.4)' : 'transparent',
        border: 'none', cursor: 'pointer', outline: 'none',
        transition: 'none', color: '#000',
        ...style,
      }}
    >
      {children}
    </button>
  )
}
