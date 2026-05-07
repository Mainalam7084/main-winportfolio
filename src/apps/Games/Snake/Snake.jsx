import React, { useRef, useEffect, useState, useCallback } from 'react'

const COLS = 20
const ROWS = 20
const CELL = 20
const W = COLS * CELL
const H = ROWS * CELL
const TICK_MS = 130

function randPos(snake) {
  let p
  do {
    p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
  } while (snake.some(s => s.x === p.x && s.y === p.y))
  return p
}

function initState() {
  const snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]
  return { snake, dir: { x: 1, y: 0 }, nextDir: { x: 1, y: 0 }, food: randPos(snake), score: 0, alive: true }
}

const px = { fontFamily: 'var(--font-family-pixel)' }

export default function Snake() {
  const canvasRef = useRef(null)
  const stRef = useRef(initState())
  const lastTickRef = useRef(0)
  const rafRef = useRef(null)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState('start')

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const st = stRef.current

    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, W, H)

    ctx.strokeStyle = 'rgba(255,255,255,0.05)'
    ctx.lineWidth = 1
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, H); ctx.stroke()
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(W, y * CELL); ctx.stroke()
    }

    // Food
    ctx.fillStyle = '#facc15'
    ctx.fillRect(st.food.x * CELL + 4, st.food.y * CELL + 4, CELL - 8, CELL - 8)
    ctx.fillStyle = 'rgba(255,255,255,0.7)'
    ctx.fillRect(st.food.x * CELL + 5, st.food.y * CELL + 5, 5, 5)

    // Snake body
    st.snake.forEach((seg, i) => {
      if (i === 0) {
        ctx.fillStyle = '#ffffff'
      } else {
        const t = 1 - (i / st.snake.length) * 0.55
        const v = Math.round(200 * t)
        ctx.fillStyle = `rgb(${v},${v},${v})`
      }
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2)
      if (i > 0) {
        ctx.fillStyle = 'rgba(0,0,0,0.25)'
        ctx.fillRect(seg.x * CELL + 5, seg.y * CELL + 5, CELL - 10, CELL - 10)
      }
    })

    // Head eyes
    if (st.snake.length > 0) {
      const h = st.snake[0]
      const dx = st.dir.x, dy = st.dir.y
      ctx.fillStyle = '#111'
      if (dx === 1)       { ctx.fillRect(h.x*CELL+14,h.y*CELL+3,3,3); ctx.fillRect(h.x*CELL+14,h.y*CELL+14,3,3) }
      else if (dx === -1) { ctx.fillRect(h.x*CELL+3,h.y*CELL+3,3,3);  ctx.fillRect(h.x*CELL+3,h.y*CELL+14,3,3) }
      else if (dy === -1) { ctx.fillRect(h.x*CELL+3,h.y*CELL+3,3,3);  ctx.fillRect(h.x*CELL+14,h.y*CELL+3,3,3) }
      else                { ctx.fillRect(h.x*CELL+3,h.y*CELL+14,3,3); ctx.fillRect(h.x*CELL+14,h.y*CELL+14,3,3) }
    }

    // CRT scanlines
    for (let y = 0; y < H; y += 4) {
      ctx.fillStyle = 'rgba(0,0,0,0.08)'
      ctx.fillRect(0, y, W, 1)
    }
  }, [])

  const gameLoop = useCallback((ts) => {
    if (!stRef.current.alive) return
    if (ts - lastTickRef.current >= TICK_MS) {
      lastTickRef.current = ts
      const st = stRef.current
      st.dir = { ...st.nextDir }
      const head = { x: st.snake[0].x + st.dir.x, y: st.snake[0].y + st.dir.y }

      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
          st.snake.some(s => s.x === head.x && s.y === head.y)) {
        st.alive = false
        setPhase('dead')
        draw()
        return
      }

      const ateFood = head.x === st.food.x && head.y === st.food.y
      st.snake = [head, ...st.snake]
      if (ateFood) {
        st.score += 10
        setScore(st.score)
        st.food = randPos(st.snake)
      } else {
        st.snake = st.snake.slice(0, -1)
      }
    }
    draw()
    rafRef.current = requestAnimationFrame(gameLoop)
  }, [draw])

  const start = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    stRef.current = initState()
    setScore(0)
    setPhase('playing')
    lastTickRef.current = 0
    rafRef.current = requestAnimationFrame(gameLoop)
  }, [gameLoop])

  useEffect(() => {
    draw()
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [draw])

  useEffect(() => {
    const onKey = (e) => {
      if (phase !== 'playing' || !stRef.current.alive) return
      const map = {
        ArrowUp:    { x: 0, y: -1 }, w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
        ArrowDown:  { x: 0, y:  1 }, s: { x: 0, y:  1 }, S: { x: 0, y:  1 },
        ArrowLeft:  { x: -1, y: 0 }, a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
        ArrowRight: { x:  1, y: 0 }, d: { x:  1, y: 0 }, D: { x:  1, y: 0 },
      }
      const nd = map[e.key]
      if (!nd) return
      if (e.key.startsWith('Arrow')) e.preventDefault()
      const cur = stRef.current.dir
      if (nd.x !== -cur.x || nd.y !== -cur.y) stRef.current.nextDir = nd
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase])

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', ...px }}>
      <div style={{ background: '#000', borderBottom: '3px solid #000', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#facc15', fontSize: '20px', letterSpacing: '3px' }}>SNAKE</span>
        <span style={{ color: '#fff', fontSize: '18px' }}>SCORE: {score}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', padding: '16px' }}>
        <div style={{ position: 'relative', border: '4px solid #000', boxShadow: '6px 6px 0 #000' }}>
          <canvas ref={canvasRef} width={W} height={H} style={{ display: 'block', imageRendering: 'pixelated' }} />

          {phase !== 'playing' && (
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.88)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px',
            }}>
              {phase === 'dead' ? (
                <>
                  <div style={{ color: '#facc15', fontSize: '32px', letterSpacing: '4px' }}>GAME OVER</div>
                  <div style={{ color: '#fff', fontSize: '22px' }}>SCORE: {score}</div>
                </>
              ) : (
                <>
                  <div style={{ color: '#facc15', fontSize: '36px', letterSpacing: '4px' }}>SNAKE</div>
                  <div style={{ color: '#aaa', fontSize: '13px', textAlign: 'center', lineHeight: 2.2 }}>
                    {'← → ↑ ↓  /  WASD  TO MOVE'}
                  </div>
                </>
              )}
              <button
                onClick={start}
                style={{ background: '#facc15', border: '4px solid #fff', padding: '10px 36px', fontSize: '20px', ...px, cursor: 'pointer', boxShadow: '4px 4px 0 #fff', letterSpacing: '2px', outline: 'none', transition: 'none' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '6px 6px 0 #fff'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '4px 4px 0 #fff'}
              >
                {phase === 'dead' ? 'RESTART' : 'START'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={{ background: '#000', borderTop: '2px solid #333', padding: '4px 16px', display: 'flex', gap: '24px' }}>
        <span style={{ color: '#555', fontSize: '11px', letterSpacing: '1px' }}>ARROWS/WASD: MOVE</span>
        <span style={{ color: '#555', fontSize: '11px', letterSpacing: '1px' }}>EAT FOOD: +10</span>
      </div>
    </div>
  )
}
