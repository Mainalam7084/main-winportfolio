import React from 'react'
import Desktop from './components/Desktop/Desktop'
import Taskbar from './components/Taskbar/Taskbar'
import WindowManager from './core/WindowManager'
import MiniRadioPlayer from './apps/Radio/MiniRadioPlayer'
import { useStore } from './core/store'

function App() {
  const isShieldActive = useStore(state => state.isShieldActive)

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col relative select-none">
      {/* Global dragging shield to block iframe pointer event swallowing */}
      {isShieldActive && <div className="absolute inset-0 z-[9999] cursor-move" />}

      <div className="flex-1 relative z-0 overflow-hidden">
        <Desktop />
        <WindowManager />
        {/* Global Widgets */}
        <MiniRadioPlayer />
      </div>

      {/*
        Taskbar wrapper: reserves space at the bottom of the flex layout.
        h-16 (64px) on mobile matches MOBILE_DOCK_H.
        md:h-12 (48px) on tablet+ matches DESKTOP_TASKBAR_H.
        The Taskbar component positions itself absolutely within this space on desktop,
        and as position:fixed on mobile (dock overlays the viewport).
      */}
      <div className="h-16 md:h-12 relative z-50 flex-shrink-0">
        <Taskbar />
      </div>
    </div>
  )
}

export default App
