import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PxChevronUp, PxWifi, PxShield, PxUsb, PxBluetooth, PxRadio, PxPlay, PxPause, PxSkipBack, PxSkipForward, PxCloud, PxRefresh } from '../ui/PixelIcons'
import { useRadioStore, MOCK_STATIONS } from '../../core/radioStore'
import { useWeatherStore, getWMO } from '../../core/weatherStore'

const MONTHS = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']
const DAYS   = ['SUN','MON','TUE','WED','THU','FRI','SAT']

export default function SystemTray() {
  const [time, setTime]             = useState(new Date())
  const [batteryLevel, setBattery]  = useState(100)
  const [isCharging, setIsCharging] = useState(false)
  const [showIcons, setShowIcons]     = useState(false)
  const [showPanel, setShowPanel]     = useState(false)
  const [showRadio, setShowRadio]     = useState(false)
  const [showWeather, setShowWeather] = useState(false)
  const [showClock, setShowClock]     = useState(false)
  const [wifi, setWifi]             = useState(true)
  const [bluetooth, setBluetooth]   = useState(false)
  const [calDate, setCalDate]       = useState(new Date())

  const { isPlaying, isBuffering, currentStation, error, togglePlay, playNext, playPrev, setStation, initAudio } = useRadioStore()
  const { data: wData, loading: wLoading, fetchWeather, refresh: wRefresh } = useWeatherStore()

  useEffect(() => { initAudio() }, [initAudio])
  useEffect(() => { fetchWeather() }, [fetchWeather])

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (showClock) setCalDate(new Date())
  }, [showClock])

  useEffect(() => {
    if (!('getBattery' in navigator)) return
    let bat = null
    const onLevel    = () => setBattery(Math.floor(bat.level * 100))
    const onCharging = () => setIsCharging(bat.charging)
    navigator.getBattery().then(b => {
      bat = b
      setBattery(Math.floor(b.level * 100))
      setIsCharging(b.charging)
      b.addEventListener('levelchange', onLevel)
      b.addEventListener('chargingchange', onCharging)
    })
    return () => {
      if (bat) {
        bat.removeEventListener('levelchange', onLevel)
        bat.removeEventListener('chargingchange', onCharging)
      }
    }
  }, [])

  const HH = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const SS = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const DD = time.toLocaleDateString()

  const closeAll = () => { setShowPanel(false); setShowIcons(false); setShowRadio(false); setShowWeather(false) }

  const calYear    = calDate.getFullYear()
  const calMonth   = calDate.getMonth()
  const firstDay   = new Date(calYear, calMonth, 1).getDay()
  const daysInMo   = new Date(calYear, calMonth + 1, 0).getDate()
  const isToday    = (d) => d === time.getDate() && calMonth === time.getMonth() && calYear === time.getFullYear()

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMo; d++) cells.push(d)

  const prevMonth = (e) => { e.stopPropagation(); setCalDate(new Date(calYear, calMonth - 1, 1)) }
  const nextMonth = (e) => { e.stopPropagation(); setCalDate(new Date(calYear, calMonth + 1, 1)) }

  return (
    <>
      {(showIcons || showPanel || showRadio) && (
        <div className="fixed inset-0 z-40" onPointerDown={closeAll} />
      )}

      <div style={{ display: 'flex', height: '100%', alignItems: 'center', zIndex: 50 }}>

        {/* ── Hidden icons toggle ── */}
        <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
          <TrayBtn onClick={() => { setShowIcons(v => !v); setShowPanel(false) }} active={showIcons}>
            <PxChevronUp
              size={14}
              style={{ color: '#000', transform: showIcons ? 'rotate(180deg)' : 'none', transition: 'none' }}
            />
          </TrayBtn>

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
        </div>

        {/* ── Network + Battery (Quick Settings) ── */}
        <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
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

          <AnimatePresence>
            {showPanel && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.08 }}
                style={{
                  position: 'absolute', bottom: 52, right: 0,
                  width: 300,
                  background: '#fff', border: '3px solid #000',
                  boxShadow: '4px -4px 0 #000', zIndex: 60,
                }}
              >
                <div style={{ background: '#000', padding: '9px 14px', borderBottom: '2px solid #000' }}>
                  <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '13px', color: '#fff', letterSpacing: '1px' }}>
                    QUICK SETTINGS
                  </span>
                </div>

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

                <div style={{ borderTop: '2px solid #e5e5e5', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '11px', color: '#777', letterSpacing: '1px', flexShrink: 0 }}>
                    BATTERY
                  </span>
                  <div style={{ flex: 1, height: 8, border: '2px solid #000', padding: '1px', display: 'flex', overflow: 'hidden' }}>
                    <div style={{ width: `${batteryLevel}%`, background: batteryLevel < 20 && !isCharging ? '#ff003c' : '#000', transition: 'none' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '11px', color: '#000', flexShrink: 0 }}>
                    {isCharging ? '⚡ ' : ''}{batteryLevel}%
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Radio ── */}
        <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
          <TrayBtn
            onClick={() => { setShowRadio(v => !v); setShowPanel(false); setShowIcons(false) }}
            title="Radio"
            active={showRadio}
          >
            <PxRadio size={16} style={{ color: isPlaying ? '#000' : '#888' }} />
          </TrayBtn>

          <AnimatePresence>
            {showRadio && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.08 }}
                style={{
                  position: 'absolute', bottom: 52, right: 0,
                  width: 260,
                  background: '#fff', border: '3px solid #000',
                  boxShadow: '4px -4px 0 #000', zIndex: 60,
                  overflow: 'hidden',
                }}
              >
                {/* Header */}
                <div style={{ background: '#000', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PxRadio size={14} style={{ color: '#facc15', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '13px', color: '#fff', letterSpacing: '1px', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    RADIO
                  </span>
                  {/* Live indicator */}
                  <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '9px', color: isPlaying ? '#facc15' : '#555', letterSpacing: '1px' }}>
                    {isBuffering ? 'LOADING' : isPlaying ? '◉ LIVE' : 'OFF'}
                  </span>
                </div>

                {/* Current station */}
                <div style={{ padding: '10px 14px 6px', borderBottom: '2px solid #e5e5e5' }}>
                  <div style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '10px', color: '#777', letterSpacing: '1px', marginBottom: '3px' }}>
                    NOW PLAYING
                  </div>
                  <div style={{ fontFamily: 'var(--font-family-sans)', fontSize: '12px', color: '#000', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {currentStation.name}
                  </div>
                  {error && (
                    <div style={{ fontFamily: 'var(--font-family-sans)', fontSize: '10px', color: '#ff003c', marginTop: '3px' }}>
                      {error}
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 14px', borderBottom: '2px solid #e5e5e5' }}>
                  <RadioBtn onClick={playPrev}><PxSkipBack size={13} style={{ color: '#000' }} /></RadioBtn>
                  <RadioBtn onClick={togglePlay} primary>
                    {isPlaying
                      ? <PxPause size={15} style={{ color: '#000' }} />
                      : <PxPlay  size={15} style={{ color: '#000' }} />}
                  </RadioBtn>
                  <RadioBtn onClick={playNext}><PxSkipForward size={13} style={{ color: '#000' }} /></RadioBtn>
                </div>

                {/* Station list */}
                <div style={{ padding: '6px 0' }}>
                  {MOCK_STATIONS.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setStation(s)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        width: '100%', padding: '7px 14px',
                        background: currentStation.id === s.id ? '#facc15' : 'transparent',
                        border: 'none', cursor: 'pointer', outline: 'none',
                        borderLeft: currentStation.id === s.id ? '3px solid #000' : '3px solid transparent',
                        transition: 'none',
                      }}
                      onMouseEnter={(e) => { if (currentStation.id !== s.id) e.currentTarget.style.background = 'rgba(250,204,21,0.2)' }}
                      onMouseLeave={(e) => { if (currentStation.id !== s.id) e.currentTarget.style.background = 'transparent' }}
                    >
                      <div style={{
                        width: 8, height: 8, flexShrink: 0,
                        background: currentStation.id === s.id && isPlaying ? '#000' : 'transparent',
                        border: '2px solid #000',
                      }} />
                      <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: '11px', color: '#000', textAlign: 'left' }}>
                        {s.name}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Weather ── */}
        <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
          <TrayBtn
            onClick={() => { setShowWeather(v => !v); setShowPanel(false); setShowIcons(false); setShowRadio(false) }}
            title="Weather"
            active={showWeather}
          >
            <PxCloud size={16} style={{ color: wData ? '#000' : '#888' }} />
            {wData && (
              <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '12px', color: '#000' }}>
                {wData.temp}°
              </span>
            )}
          </TrayBtn>

          <AnimatePresence>
            {showWeather && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.08 }}
                style={{
                  position: 'absolute', bottom: 52, right: 0,
                  width: 240,
                  background: '#fff', border: '3px solid #000',
                  boxShadow: '4px -4px 0 #000', zIndex: 60,
                  overflow: 'hidden',
                }}
              >
                <div style={{ background: '#000', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PxCloud size={14} style={{ color: '#facc15', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '13px', color: '#fff', letterSpacing: '1px', flex: 1 }}>
                    WEATHER
                  </span>
                  <button
                    onClick={wRefresh}
                    disabled={wLoading}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', outline: 'none', opacity: wLoading ? 0.4 : 1, transition: 'none' }}
                    title="Refresh"
                  >
                    <PxRefresh size={12} style={{ color: '#facc15' }} />
                  </button>
                </div>

                {wLoading && !wData && (
                  <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'var(--font-family-pixel)', fontSize: '11px', color: '#888', letterSpacing: '1px' }}>
                    FETCHING...
                  </div>
                )}

                {!wLoading && !wData && (
                  <div style={{ padding: '16px 14px', textAlign: 'center', fontFamily: 'var(--font-family-pixel)', fontSize: '11px', color: '#888', letterSpacing: '1px', lineHeight: 1.6 }}>
                    NO DATA<br/>CHECK LOCATION ACCESS
                  </div>
                )}

                {wData && (
                  <>
                    <div style={{ padding: '12px 14px', borderBottom: '2px solid #e5e5e5' }}>
                      <div style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '10px', color: '#777', letterSpacing: '1px', marginBottom: '6px' }}>
                        📍 {wData.location}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '36px', color: '#000', lineHeight: 1 }}>
                          {wData.temp}°<span style={{ fontSize: '18px', color: '#777' }}>C</span>
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '11px', color: '#000', letterSpacing: '1px' }}>
                            {getWMO(wData.weatherCode).desc}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: '8px 14px', display: 'flex', gap: '8px' }}>
                      <div style={{ flex: 1, fontFamily: 'var(--font-family-pixel)', fontSize: '10px', color: '#555', letterSpacing: '0.5px' }}>
                        <div style={{ color: '#888', marginBottom: '2px' }}>HUMIDITY</div>
                        <div style={{ color: '#000', fontSize: '13px' }}>{wData.humidity}%</div>
                      </div>
                      <div style={{ width: '1px', background: '#e5e5e5' }} />
                      <div style={{ flex: 1, fontFamily: 'var(--font-family-pixel)', fontSize: '10px', color: '#555', letterSpacing: '0.5px' }}>
                        <div style={{ color: '#888', marginBottom: '2px' }}>WIND</div>
                        <div style={{ color: '#000', fontSize: '13px' }}>{wData.windSpeed} km/h</div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Clock + Calendar (hover) ── */}
        <div
          style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
          onMouseEnter={() => setShowClock(true)}
          onMouseLeave={() => setShowClock(false)}
        >
          <TrayBtn style={{ flexDirection: 'column', gap: '1px', minWidth: 80, padding: '0 10px' }}>
            <span style={{
              fontFamily: 'var(--font-family-pixel)', fontSize: '15px', color: '#000',
              lineHeight: 1, textAlign: 'center', width: '100%', display: 'block',
            }}>
              {HH}
            </span>
            <span style={{
              fontFamily: 'var(--font-family-sans)', fontSize: '10px', color: '#555',
              lineHeight: 1, textAlign: 'center', width: '100%', display: 'block',
            }}>
              {DD}
            </span>
          </TrayBtn>

          <AnimatePresence>
            {showClock && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.08 }}
                style={{
                  position: 'absolute', bottom: 52, right: 0,
                  width: 280,
                  background: '#fff', border: '3px solid #000',
                  boxShadow: '4px -4px 0 #000', zIndex: 60,
                  overflow: 'hidden',
                }}
              >
                {/* Live time */}
                <div style={{ background: '#000', padding: '16px 12px', textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'var(--font-family-pixel)', fontSize: '32px',
                    color: '#facc15', letterSpacing: '2px', lineHeight: 1,
                  }}>
                    {SS}
                  </div>
                  <div style={{ fontFamily: 'var(--font-family-sans)', fontSize: '11px', color: '#aaa', marginTop: '6px' }}>
                    {time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>

                {/* Month nav */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px 6px', borderBottom: '2px solid #000',
                }}>
                  <NavBtn onClick={prevMonth}>◀</NavBtn>
                  <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '11px', color: '#000', letterSpacing: '1px' }}>
                    {MONTHS[calMonth]} {calYear}
                  </span>
                  <NavBtn onClick={nextMonth}>▶</NavBtn>
                </div>

                {/* Day-of-week headers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '6px 10px 2px', gap: 2 }}>
                  {DAYS.map(d => (
                    <div key={d} style={{
                      textAlign: 'center',
                      fontFamily: 'var(--font-family-pixel)', fontSize: '7px',
                      color: '#888', letterSpacing: '0.3px',
                    }}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '2px 10px 12px', gap: 2 }}>
                  {cells.map((d, i) => (
                    <CalDay key={i} day={d} today={d && isToday(d)} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Show-desktop sliver ── */}
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

function RadioBtn({ onClick, children, primary }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 32, height: 32,
        background: primary ? '#facc15' : '#f0f0f0',
        border: '2px solid #000',
        boxShadow: '2px 2px 0 #000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', outline: 'none', transition: 'none',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '3px 3px 0 #facc15' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '2px 2px 0 #000' }}
    >
      {children}
    </button>
  )
}

function NavBtn({ onClick, children }) {
  const [hov, setHov] = useState(false)
  const [pressed, setPressed] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        background: hov ? '#facc15' : 'transparent',
        border: `2px solid ${hov ? '#000' : 'transparent'}`,
        boxShadow: pressed ? 'none' : hov ? '2px 2px 0 #000' : 'none',
        transform: pressed ? 'translate(2px, 2px)' : 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-family-pixel)', fontSize: '12px',
        color: '#000', padding: '3px 8px',
        lineHeight: 1, outline: 'none',
        transition: 'none',
      }}
    >
      {children}
    </button>
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
      <span style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '11px', color: '#000', letterSpacing: '0.5px', marginTop: '4px' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: '10px', color: '#666' }}>
        {sub}
      </span>
    </button>
  )
}

function CalDay({ day, today }) {
  const [hov, setHov] = useState(false)
  const [pressed, setPressed] = useState(false)
  if (!day) return <div />
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        textAlign: 'center',
        fontFamily: 'var(--font-family-pixel)', fontSize: '10px',
        padding: '3px 0', lineHeight: 1, cursor: 'default',
        background: today ? '#facc15' : hov ? 'rgba(250,204,21,0.35)' : 'transparent',
        border: today || hov ? '2px solid #000' : '2px solid transparent',
        boxShadow: pressed && !today ? 'inset 1px 1px 0 #000' : today ? '2px 2px 0 #000' : 'none',
        transform: pressed && !today ? 'translate(1px,1px)' : 'none',
        color: '#000',
      }}
    >
      {day}
    </div>
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
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
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
