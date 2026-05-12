import React, { useRef, useEffect, useState, useCallback } from 'react'

const W = 400
const H = 500
const GROUND_H = 24
const BIRD_X = 80
const BIRD_W = 28
const BIRD_H = 22
const GRAVITY = 0.26
const JUMP_VEL = -6.0
const PIPE_W = 50
const PIPE_GAP = 152
const PIPE_SPEED = 1.3
const PIPE_INTERVAL = 125

function initState() {
  return {
    birdY: H / 2 - BIRD_H / 2,
    birdVel: 0,
    pipes: [],
    score: 0,
    frame: 0,
    alive: true,
  }
}

function makePipe() {
  const minTop = 50
  const maxTop = H - GROUND_H - PIPE_GAP - 50
  const topH = minTop + Math.floor(Math.random() * (maxTop - minTop))
  return { x: W + 10, topH, scored: false }
}

const px = { fontFamily: 'var(--font-family-pixel)' }

export default function FloppyBird() {
  const canvasRef = useRef(null)
  const stRef = useRef(initState())
  const rafRef = useRef(null)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState('start')
  const phaseRef = useRef('start')

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const st = stRef.current

    // Sky
    ctx.fillStyle = '#0d1117'
    ctx.fillRect(0, 0, W, H)

    // Pixel star pattern
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    const stars = [[30,20],[80,60],[150,15],[220,45],[310,25],[360,70],[60,120],[190,90],[340,110]]
    stars.forEach(([sx,sy]) => ctx.fillRect(sx, sy, 2, 2))

    // Pipes
    st.pipes.forEach(pipe => {
      // Top pipe body
      ctx.fillStyle = '#3a3a3a'
      ctx.fillRect(pipe.x, 0, PIPE_W, pipe.topH - 14)
      // Top pipe cap
      ctx.fillStyle = '#2a2a2a'
      ctx.fillRect(pipe.x - 5, pipe.topH - 14, PIPE_W + 10, 14)
      // Highlight
      ctx.fillStyle = '#555'
      ctx.fillRect(pipe.x + 4, 0, 10, pipe.topH - 14)

      // Bottom pipe
      const botY = pipe.topH + PIPE_GAP
      // Bottom pipe cap
      ctx.fillStyle = '#2a2a2a'
      ctx.fillRect(pipe.x - 5, botY, PIPE_W + 10, 14)
      // Bottom pipe body
      ctx.fillStyle = '#3a3a3a'
      ctx.fillRect(pipe.x, botY + 14, PIPE_W, H - botY - 14 - GROUND_H)
      // Highlight
      ctx.fillStyle = '#555'
      ctx.fillRect(pipe.x + 4, botY + 14, 10, H - botY - 14 - GROUND_H)
    })

    // Ground
    ctx.fillStyle = '#2a2a2a'
    ctx.fillRect(0, H - GROUND_H, W, GROUND_H)
    ctx.fillStyle = '#facc15'
    ctx.fillRect(0, H - GROUND_H, W, 3)
    // Ground pattern
    ctx.fillStyle = '#333'
    for (let gx = 0; gx < W; gx += 20) {
      ctx.fillRect(gx, H - GROUND_H + 6, 12, 6)
    }

    // Bird
    const by = Math.round(st.birdY)
    const tilt = Math.max(-0.4, Math.min(0.5, st.birdVel * 0.04))

    ctx.save()
    ctx.translate(BIRD_X + BIRD_W / 2, by + BIRD_H / 2)
    ctx.rotate(tilt)
    ctx.translate(-(BIRD_X + BIRD_W / 2), -(by + BIRD_H / 2))

    // Body
    ctx.fillStyle = '#facc15'
    ctx.fillRect(BIRD_X, by, BIRD_W, BIRD_H)
    // Wing shadow
    ctx.fillStyle = '#d97706'
    ctx.fillRect(BIRD_X + 2, by + 10, BIRD_W - 6, 10)
    // Wing highlight
    ctx.fillStyle = '#fde68a'
    ctx.fillRect(BIRD_X + 3, by + 2, 10, 6)
    // Eye white
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(BIRD_X + 16, by + 3, 9, 9)
    // Eye pupil
    ctx.fillStyle = '#000'
    ctx.fillRect(BIRD_X + 20, by + 5, 4, 4)
    // Beak
    ctx.fillStyle = '#f97316'
    ctx.fillRect(BIRD_X + BIRD_W - 2, by + 8, 10, 5)
    ctx.fillStyle = '#ea580c'
    ctx.fillRect(BIRD_X + BIRD_W - 2, by + 11, 10, 2)

    ctx.restore()

    // CRT scanlines
    for (let y = 0; y < H; y += 4) {
      ctx.fillStyle = 'rgba(0,0,0,0.07)'
      ctx.fillRect(0, y, W, 1)
    }

    // Score overlay
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.font = '28px VT323, monospace'
    ctx.textAlign = 'center'
    ctx.fillText(String(st.score), W / 2, 44)
  }, [])

  const flap = useCallback(() => {
    if (!stRef.current.alive) return
    stRef.current.birdVel = JUMP_VEL
  }, [])

  const gameLoop = useCallback(() => {
    const st = stRef.current
    if (!st.alive) return

    st.birdVel += GRAVITY
    st.birdY += st.birdVel
    st.frame++

    if (st.frame % PIPE_INTERVAL === 40) st.pipes.push(makePipe())

    st.pipes.forEach(p => { p.x -= PIPE_SPEED })
    st.pipes = st.pipes.filter(p => p.x + PIPE_W + 10 > 0)

    // Score
    st.pipes.forEach(p => {
      if (!p.scored && p.x + PIPE_W < BIRD_X) {
        p.scored = true
        st.score++
        setScore(st.score)
      }
    })

    // Ground/ceiling collision
    if (st.birdY + BIRD_H >= H - GROUND_H || st.birdY <= 0) {
      st.alive = false
      setPhase('dead')
      draw()
      return
    }

    // Pipe collision (with 3px forgiveness)
    const margin = 3
    const bL = BIRD_X + margin
    const bR = BIRD_X + BIRD_W - margin
    const bT = st.birdY + margin
    const bB = st.birdY + BIRD_H - margin

    const hit = st.pipes.some(p => {
      const pL = p.x - 5
      const pR = p.x + PIPE_W + 5
      if (bR <= pL || bL >= pR) return false
      return bT < p.topH || bB > p.topH + PIPE_GAP
    })
    if (hit) {
      st.alive = false
      setPhase('dead')
      draw()
      return
    }

    draw()
    rafRef.current = requestAnimationFrame(gameLoop)
  }, [draw])

  const start = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    stRef.current = initState()
    setScore(0)
    setPhase('playing')
    rafRef.current = requestAnimationFrame(gameLoop)
  }, [gameLoop])

  useEffect(() => {
    draw()
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [draw])

  useEffect(() => { phaseRef.current = phase }, [phase])

  useEffect(() => {
    const onKey = (e) => {
      if (e.code !== 'Space') return
      e.preventDefault()
      if (phaseRef.current === 'playing') flap()
      else start()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flap, start])

  const handleCanvasClick = useCallback(() => {
    if (phase === 'playing') flap()
  }, [phase, flap])

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', ...px }}>
      <div style={{ background: '#000', borderBottom: '3px solid #000', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#facc15', fontSize: '20px', letterSpacing: '3px' }}>FLOPPY BIRD</span>
        <span style={{ color: '#fff', fontSize: '18px' }}>SCORE: {score}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', padding: '16px' }}>
        <div style={{ position: 'relative', border: '4px solid #000', boxShadow: '6px 6px 0 #000' }}>
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            style={{ display: 'block', imageRendering: 'pixelated', cursor: 'pointer' }}
            onClick={handleCanvasClick}
          />

          {phase !== 'playing' && (
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.88)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px',
            }}>
              {phase === 'dead' ? (
                <>
                  <div style={{ color: '#e11d48', fontSize: '32px', letterSpacing: '4px' }}>GAME OVER</div>
                  <div style={{ color: '#fff', fontSize: '22px' }}>SCORE: {score}</div>
                </>
              ) : (
                <>
                  <div style={{ color: '#facc15', fontSize: '32px', letterSpacing: '3px' }}>FLOPPY BIRD</div>
                  <div style={{ color: '#aaa', fontSize: '13px', textAlign: 'center', lineHeight: 2.2 }}>
                    SPACE  TO  FLAP  &amp;  AVOID  PIPES
                  </div>
                </>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{ color: '#facc15', fontSize: '20px', letterSpacing: '4px', border: '3px solid #facc15', padding: '10px 32px', boxShadow: '4px 4px 0 #facc15' }}>
                  PRESS  SPACE
                </div>
                <button
                  onClick={start}
                  style={{ background: 'transparent', border: 'none', color: '#555', fontSize: '11px', ...px, cursor: 'pointer', letterSpacing: '2px', outline: 'none', padding: '4px' }}
                >
                  {phase === 'dead' ? 'or click to restart' : 'or click to start'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ background: '#000', borderTop: '2px solid #333', padding: '4px 16px', display: 'flex', gap: '24px' }}>
        <span style={{ color: '#555', fontSize: '11px', letterSpacing: '1px' }}>SPACE: START / FLAP</span>
        <span style={{ color: '#555', fontSize: '11px', letterSpacing: '1px' }}>AVOID PIPES</span>
      </div>
    </div>
  )
}
