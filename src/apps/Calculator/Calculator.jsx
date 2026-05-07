import React, { useState, useEffect, useCallback } from 'react'
import { PxCalculator } from '../../components/ui/PixelIcons'

const ROWS = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['⌫', '0', '.', '='],
]

function fmt(n) {
  if (!isFinite(n)) return 'ERR'
  const s = parseFloat(parseFloat(n).toFixed(8)).toString()
  return s.length > 12 ? parseFloat(n).toExponential(4) : s
}

function calc(a, b, op) {
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '×': return a * b
    case '÷': return b !== 0 ? a / b : Infinity
    default: return b
  }
}

const px = { fontFamily: 'var(--font-family-pixel)' }
const OPS = ['+', '-', '×', '÷', '=']

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prevVal, setPrevVal] = useState(null)
  const [op, setOp] = useState(null)
  const [waitOp, setWaitOp] = useState(false)
  const [expr, setExpr] = useState('')

  const input = useCallback((key) => {
    setDisplay(prev => {
      if ('0123456789'.includes(key)) {
        if (waitOp) { setWaitOp(false); return key }
        return prev === '0' ? key : prev.length < 12 ? prev + key : prev
      }

      if (key === '.') {
        if (waitOp) { setWaitOp(false); return '0.' }
        return prev.includes('.') ? prev : prev + '.'
      }

      if (key === '⌫') {
        if (waitOp) return prev
        return prev.length > 1 ? prev.slice(0, -1) : '0'
      }

      if (key === 'C') {
        setPrevVal(null); setOp(null); setWaitOp(false); setExpr('')
        return '0'
      }

      if (key === '±') return fmt(-parseFloat(prev))
      if (key === '%') return fmt(parseFloat(prev) / 100)

      if (OPS.includes(key) && key !== '=') {
        const cur = parseFloat(prev)
        if (prevVal !== null && !waitOp) {
          const result = calc(prevVal, cur, op)
          const rs = fmt(result)
          setPrevVal(result)
          setOp(key)
          setWaitOp(true)
          setExpr(rs + ' ' + key)
          return rs
        }
        setPrevVal(cur)
        setOp(key)
        setWaitOp(true)
        setExpr(prev + ' ' + key)
        return prev
      }

      if (key === '=') {
        if (op && prevVal !== null) {
          const result = calc(prevVal, parseFloat(prev), op)
          const rs = fmt(result)
          setPrevVal(null); setOp(null); setWaitOp(true); setExpr('')
          return rs
        }
        return prev
      }

      return prev
    })
  }, [waitOp, prevVal, op])

  useEffect(() => {
    const map = {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      '.': '.', 'Backspace': '⌫', 'Escape': 'C', 'Delete': 'C',
      'Enter': '=', '=': '=', '+': '+', '-': '-', '*': '×', '/': '÷', '%': '%',
    }
    const onKey = (e) => {
      const k = map[e.key]
      if (k) { e.preventDefault(); input(k) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [input])

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', ...px }}>
      {/* Header */}
      <div style={{ background: '#000', borderBottom: '3px solid #000', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <PxCalculator size={16} style={{ color: '#facc15' }} />
        <span style={{ color: '#fff', fontSize: '20px', letterSpacing: '2px' }}>Main's Calculator</span>
      </div>

      {/* Display */}
      <div style={{ background: '#111', margin: '16px 16px 12px', border: '3px solid #000', boxShadow: '4px 4px 0 #000', padding: '14px 16px 10px' }}>
        <div style={{ color: '#555', fontSize: '13px', minHeight: '18px', textAlign: 'right', letterSpacing: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {expr || ' '}
        </div>
        <div style={{ color: '#facc15', fontSize: '40px', textAlign: 'right', letterSpacing: '2px', lineHeight: 1.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {display}
        </div>
      </div>

      {/* Button grid */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 16px 16px', gap: '8px' }}>
        {ROWS.map((row, ri) => (
          <div key={ri} style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {row.map(btn => {
              const isOp = OPS.includes(btn)
              const isEq = btn === '='
              const isActive = btn === op
              const isClear = btn === 'C'

              let bg = '#f5f5f5', fg = '#000', shadow = '3px 3px 0 #000'
              if (isEq) { bg = '#facc15'; fg = '#000'; shadow = '3px 3px 0 #000' }
              else if (isOp) { bg = '#000'; fg = '#facc15' }
              else if (isClear) { bg = '#e5e5e5'; fg = '#000' }
              if (isActive && !isEq) { bg = '#facc15'; fg = '#000' }

              return (
                <button
                  key={btn}
                  onClick={() => input(btn)}
                  style={{ background: bg, color: fg, border: '3px solid #000', boxShadow: shadow, fontSize: '20px', fontFamily: 'var(--font-family-pixel)', cursor: 'pointer', outline: 'none', transition: 'none', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#facc15'; e.currentTarget.style.color = '#000'; e.currentTarget.style.boxShadow = '4px 4px 0 #000' }}
                  onMouseLeave={e => { e.currentTarget.style.background = bg; e.currentTarget.style.color = fg; e.currentTarget.style.boxShadow = shadow }}
                  onMouseDown={e => { e.currentTarget.style.boxShadow = '1px 1px 0 #000'; e.currentTarget.style.transform = 'translate(2px,2px)' }}
                  onMouseUp={e => { e.currentTarget.style.boxShadow = shadow; e.currentTarget.style.transform = 'none' }}
                >
                  {btn}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
