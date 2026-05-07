import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWeatherStore, getWMO } from '../../core/weatherStore'
import { PxRefresh, PxCloud } from '../../components/ui/PixelIcons'

const px = { fontFamily: 'var(--font-family-pixel)' }
const S = { imageRendering: 'pixelated', display: 'block' }

function WeatherIcon({ type, size = 72 }) {
  if (type === 'sunny') return (
    <svg viewBox="0 0 32 32" width={size} height={size} style={S} fill="#facc15">
      <rect x="14" y="0"  width="4" height="5"/>
      <rect x="14" y="27" width="4" height="5"/>
      <rect x="0"  y="14" width="5" height="4"/>
      <rect x="27" y="14" width="5" height="4"/>
      <rect x="4"  y="4"  width="4" height="4"/>
      <rect x="24" y="4"  width="4" height="4"/>
      <rect x="4"  y="24" width="4" height="4"/>
      <rect x="24" y="24" width="4" height="4"/>
      <rect x="9"  y="9"  width="14" height="14"/>
      <rect x="11" y="7"  width="10" height="18"/>
      <rect x="7"  y="11" width="18" height="10"/>
    </svg>
  )

  if (type === 'partlyCloudy') return (
    <svg viewBox="0 0 36 32" width={size * 1.1} height={size} style={S}>
      <rect x="20" y="0"  width="6" height="4"  fill="#facc15"/>
      <rect x="28" y="4"  width="4" height="8"  fill="#facc15"/>
      <rect x="22" y="2"  width="8" height="12" fill="#facc15"/>
      <rect x="18" y="4"  width="6" height="8"  fill="#facc15"/>
      <rect x="8"  y="14" width="20" height="14" fill="#ccc"/>
      <rect x="12" y="10" width="12" height="6"  fill="#ccc"/>
      <rect x="10" y="12" width="16" height="6"  fill="#ccc"/>
      <rect x="4"  y="16" width="8"  height="10" fill="#ccc"/>
      <rect x="2"  y="18" width="30" height="8"  fill="#ccc"/>
      <rect x="4"  y="26" width="26" height="2"  fill="#bbb"/>
    </svg>
  )

  if (type === 'cloudy') return (
    <svg viewBox="0 0 32 24" width={size} height={size * 0.75} style={S} fill="#999">
      <rect x="8"  y="8"  width="16" height="12"/>
      <rect x="12" y="4"  width="8"  height="6"/>
      <rect x="10" y="6"  width="12" height="6"/>
      <rect x="4"  y="10" width="8"  height="9"/>
      <rect x="2"  y="12" width="28" height="8"/>
      <rect x="4"  y="20" width="24" height="2" fill="#888"/>
    </svg>
  )

  if (type === 'rain') return (
    <svg viewBox="0 0 32 36" width={size} height={size * 1.12} style={S}>
      <rect x="8"  y="2"  width="16" height="12" fill="#888"/>
      <rect x="12" y="0"  width="8"  height="4"  fill="#888"/>
      <rect x="10" y="2"  width="12" height="8"  fill="#888"/>
      <rect x="4"  y="6"  width="8"  height="10" fill="#888"/>
      <rect x="2"  y="8"  width="28" height="8"  fill="#888"/>
      <rect x="4"  y="16" width="24" height="2"  fill="#777"/>
      <rect x="6"  y="20" width="3"  height="8"  fill="#60a5fa"/>
      <rect x="14" y="22" width="3"  height="8"  fill="#60a5fa"/>
      <rect x="22" y="20" width="3"  height="8"  fill="#60a5fa"/>
      <rect x="10" y="24" width="3"  height="8"  fill="#60a5fa"/>
      <rect x="18" y="24" width="3"  height="8"  fill="#60a5fa"/>
    </svg>
  )

  if (type === 'snow') return (
    <svg viewBox="0 0 32 36" width={size} height={size * 1.12} style={S}>
      <rect x="8"  y="2"  width="16" height="12" fill="#bbb"/>
      <rect x="12" y="0"  width="8"  height="4"  fill="#bbb"/>
      <rect x="10" y="2"  width="12" height="8"  fill="#bbb"/>
      <rect x="4"  y="6"  width="8"  height="10" fill="#bbb"/>
      <rect x="2"  y="8"  width="28" height="8"  fill="#bbb"/>
      <rect x="4"  y="16" width="24" height="2"  fill="#aaa"/>
      <rect x="6"  y="21" width="4"  height="4"  fill="#fff"/>
      <rect x="14" y="23" width="4"  height="4"  fill="#fff"/>
      <rect x="22" y="21" width="4"  height="4"  fill="#fff"/>
      <rect x="10" y="27" width="4"  height="4"  fill="#fff"/>
      <rect x="18" y="27" width="4"  height="4"  fill="#fff"/>
    </svg>
  )

  // storm
  return (
    <svg viewBox="0 0 32 40" width={size} height={size * 1.25} style={S}>
      <rect x="8"  y="2"  width="16" height="12" fill="#666"/>
      <rect x="12" y="0"  width="8"  height="4"  fill="#666"/>
      <rect x="4"  y="6"  width="8"  height="10" fill="#666"/>
      <rect x="2"  y="8"  width="28" height="8"  fill="#666"/>
      <rect x="4"  y="16" width="24" height="2"  fill="#555"/>
      <rect x="14" y="18" width="6"  height="8"  fill="#facc15"/>
      <rect x="10" y="26" width="6"  height="6"  fill="#facc15"/>
      <rect x="16" y="32" width="4"  height="6"  fill="#facc15"/>
      <rect x="20" y="24" width="4"  height="4"  fill="#facc15"/>
    </svg>
  )
}

function StatBox({ label, value }) {
  return (
    <div style={{ flex: 1, border: '2px solid #000', padding: '10px 12px', background: '#f5f5f5', boxShadow: '2px 2px 0 #000' }}>
      <div style={{ fontSize: '10px', color: '#777', letterSpacing: '1px', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontSize: '18px', color: '#000', letterSpacing: '1px' }}>{value}</div>
    </div>
  )
}

export default function Weather() {
  const { data, loading, error, fetchWeather, refresh } = useWeatherStore()

  useEffect(() => { fetchWeather() }, [fetchWeather])

  const wmo = data ? getWMO(data.weatherCode) : null

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', ...px }}>
      {/* Header */}
      <div style={{ background: '#000', borderBottom: '3px solid #000', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <PxCloud size={16} style={{ color: '#facc15' }} />
        <span style={{ color: '#fff', fontSize: '20px', letterSpacing: '2px' }}>WEATHER_</span>
        <button
          onClick={refresh}
          disabled={loading}
          style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: loading ? 'default' : 'pointer', color: '#facc15', outline: 'none', padding: '2px', opacity: loading ? 0.5 : 1, transition: 'none' }}
          title="Refresh"
        >
          <PxRefresh size={16} style={{ color: '#facc15', animation: loading ? 'spin 1s linear infinite' : 'none' }} />
        </button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          {loading && !data && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '40px' }}
            >
              <div style={{ width: 32, height: 32, border: '4px solid #000', borderTop: '4px solid #facc15', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <div style={{ fontSize: '14px', color: '#555', letterSpacing: '2px' }}>FETCHING LOCATION...</div>
            </motion.div>
          )}

          {error && !data && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '40px' }}
            >
              <div style={{ fontSize: '36px', color: '#ccc' }}>⚠</div>
              <div style={{ fontSize: '14px', color: '#000', letterSpacing: '2px', textAlign: 'center' }}>{error}</div>
              <button
                onClick={refresh}
                style={{ background: '#facc15', border: '3px solid #000', boxShadow: '3px 3px 0 #000', padding: '8px 24px', fontSize: '14px', ...px, cursor: 'pointer', outline: 'none', letterSpacing: '1px', transition: 'none' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '5px 5px 0 #000'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '3px 3px 0 #000'}
              >
                RETRY
              </button>
            </motion.div>
          )}

          {data && (
            <motion.div
              key="data"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {/* Location bar */}
              <div style={{ background: '#f5f5f5', borderBottom: '2px solid #e5e5e5', padding: '8px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#000', letterSpacing: '1px' }}>📍 {data.location}</span>
                {loading && <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px' }}>UPDATING...</span>}
              </div>

              {/* Main weather display */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 24px', gap: '16px' }}>
                {/* Weather icon */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <WeatherIcon type={wmo.type} size={80} />
                </motion.div>

                {/* Temperature */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '72px', color: '#000', lineHeight: 1, letterSpacing: '-2px' }}>
                    {data.temp}<span style={{ fontSize: '36px', color: '#555' }}>°C</span>
                  </div>
                  <div style={{ fontSize: '16px', color: '#000', letterSpacing: '3px', marginTop: '8px' }}>
                    {wmo.desc}
                  </div>
                </div>

                {/* Stats row */}
                <div style={{ width: '100%', display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <StatBox label="HUMIDITY" value={`${data.humidity}%`} />
                  <StatBox label="WIND" value={`${data.windSpeed} km/h`} />
                </div>

                {/* Last updated */}
                <div style={{ fontSize: '10px', color: '#bbb', letterSpacing: '1px' }}>
                  BRUTA/OS WEATHER — OPEN-METEO API
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
