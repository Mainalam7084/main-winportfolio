import { useState, useEffect } from 'react'

const MOBILE_BP = 768
const TABLET_BP = 1024

export const MOBILE_DOCK_H = 64
export const DESKTOP_TASKBAR_H = 48

function snap() {
  return { w: window.innerWidth, h: window.innerHeight }
}

export function useMobile() {
  const [dims, setDims] = useState(snap)

  useEffect(() => {
    let pending = false
    const update = () => {
      if (pending) return
      pending = true
      requestAnimationFrame(() => { setDims(snap()); pending = false })
    }
    window.addEventListener('resize', update, { passive: true })
    window.addEventListener('orientationchange', update, { passive: true })
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  const isMobile = dims.w < MOBILE_BP
  const isTablet = dims.w >= MOBILE_BP && dims.w < TABLET_BP

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    isLandscape: dims.w > dims.h,
    vw: dims.w,
    vh: dims.h,
  }
}
