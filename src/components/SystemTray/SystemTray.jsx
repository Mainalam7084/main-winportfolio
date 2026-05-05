import React, { useEffect, useState } from 'react'
import { useStore } from '../../core/store'
import { AnimatePresence, motion } from 'framer-motion'
import { PxChevronUp, PxWifi, PxShield, PxUsb } from '../ui/PixelIcons'

export default function SystemTray() {
  const [time, setTime]               = useState(new Date())
  const [batteryLevel, setBattery]    = useState(100)
  const [isCharging, setIsCharging]   = useState(false)
  const [showIcons, setShowIcons]     = useState(false)
  const openWindow                    = useStore(state => state.openWindow)

  // Clock
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // Battery
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

  const openRadio = () => openWindow({
    app: 'radio', title: 'Radio',
    defaultSize: { width: 400, height: 560 },
    defaultPosition: { x: window.innerWidth - 420, y: window.innerHeight - 620 },
  })

  return (
    <>
      {showIcons && <div className="fixed inset-0 z-40" onPointerDown={() => setShowIcons(false)} />}

      <div style={{ display: 'flex', height: '100%', alignItems: 'center', position: 'relative', zIndex: 50 }}>

        {/* Hidden icons button */}
        <TrayBtn onClick={() => setShowIcons(!showIcons)} active={showIcons}>
          <PxChevronUp size={14} style={{ color: '#000', transform: showIcons ? 'rotate(180deg)' : 'none', transition: 'none' }} />
        </TrayBtn>

        {/* Hidden icons popup */}
        <AnimatePresence>
          {showIcons && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
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

        {/* Network + Battery (click opens radio) */}
        <TrayBtn onClick={openRadio} title="Radio">
          <PxWifi size={16} style={{ color: '#000' }} />
          {/* Battery bar */}
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

        {/* Clock */}
        <TrayBtn style={{ flexDirection: 'column', gap: '1px', minWidth: 76, padding: '0 12px' }}>
          <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '15px', color: '#000', lineHeight: 1 }}>{HH}</span>
          <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: '10px', color: '#555', lineHeight: 1 }}>{DD}</span>
        </TrayBtn>

        {/* Show desktop sliver */}
        <div
          style={{
            width: 6, height: '100%',
            borderLeft: '2px solid #000',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(250,204,21,0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          title="Show Desktop"
        />
      </div>
    </>
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
