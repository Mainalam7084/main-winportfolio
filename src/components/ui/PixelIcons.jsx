// Pixel art SVG icon components — 16x16 grid, imageRendering: pixelated
// All accept { size, className } to match lucide-react interface.

const S = { imageRendering: 'pixelated', display: 'block' }

export const PxMonitor = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} {...rest}>
    <rect x="1" y="1" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="5" y="11" width="6" height="1" fill="currentColor"/>
    <rect x="3" y="12" width="10" height="1" fill="currentColor"/>
    <rect x="4" y="3" width="8" height="5" fill="currentColor" opacity="0.3"/>
  </svg>
)

export const PxDownload = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="1" y="13" width="14" height="2"/>
    <rect x="7" y="1" width="2" height="8"/>
    <rect x="5" y="7" width="2" height="2"/>
    <rect x="9" y="7" width="2" height="2"/>
    <rect x="6" y="9" width="4" height="2"/>
    <rect x="7" y="11" width="2" height="1"/>
  </svg>
)

export const PxFolder = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="1" y="5" width="14" height="9"/>
    <rect x="1" y="4" width="6" height="2"/>
  </svg>
)

export const PxDocument = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="3" y="1" width="7" height="1"/>
    <rect x="3" y="1" width="1" height="14"/>
    <rect x="3" y="14" width="10" height="1"/>
    <rect x="12" y="4" width="1" height="11"/>
    <rect x="10" y="1" width="3" height="1"/>
    <rect x="10" y="2" width="2" height="2"/>
    <rect x="10" y="3" width="3" height="1"/>
    <rect x="5" y="5" width="6" height="1" opacity="0.5"/>
    <rect x="5" y="7" width="6" height="1" opacity="0.5"/>
    <rect x="5" y="9" width="6" height="1" opacity="0.5"/>
    <rect x="5" y="11" width="4" height="1" opacity="0.5"/>
  </svg>
)

export const PxImage = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} {...rest}>
    <rect x="1" y="2" width="14" height="12" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="3" y="4" width="2" height="2" fill="currentColor"/>
    <polygon points="1,14 5,9 8,12 11,8 15,14" fill="currentColor"/>
  </svg>
)

export const PxVideo = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} {...rest}>
    <rect x="1" y="3" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <polygon points="11,6 15,8 11,10" fill="currentColor"/>
    <rect x="3" y="5" width="2" height="1" fill="currentColor"/>
    <rect x="3" y="7" width="2" height="1" fill="currentColor"/>
    <rect x="3" y="9" width="2" height="1" fill="currentColor"/>
  </svg>
)

export const PxGlobe = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="2" y="1" width="12" height="1"/>
    <rect x="1" y="2" width="1" height="12"/>
    <rect x="14" y="2" width="1" height="12"/>
    <rect x="2" y="14" width="12" height="1"/>
    <rect x="7" y="1" width="2" height="14" opacity="0.5"/>
    <rect x="1" y="7" width="14" height="2" opacity="0.5"/>
    <rect x="3" y="3" width="2" height="1" opacity="0.4"/>
    <rect x="11" y="3" width="2" height="1" opacity="0.4"/>
    <rect x="3" y="12" width="2" height="1" opacity="0.4"/>
    <rect x="11" y="12" width="2" height="1" opacity="0.4"/>
  </svg>
)

export const PxHardDrive = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} {...rest}>
    <rect x="1" y="3" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="1" y="9" width="14" height="1" fill="currentColor"/>
    <rect x="11" y="11" width="2" height="1" fill="currentColor"/>
    <rect x="3" y="5" width="3" height="1" fill="currentColor"/>
    <rect x="7" y="5" width="2" height="1" fill="currentColor"/>
  </svg>
)

export const PxGrid4 = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="1" y="1" width="6" height="6"/>
    <rect x="9" y="1" width="6" height="6"/>
    <rect x="1" y="9" width="6" height="6"/>
    <rect x="9" y="9" width="6" height="6"/>
  </svg>
)

export const PxWindows = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="1" y="1" width="7" height="7"/>
    <rect x="9" y="1" width="6" height="7"/>
    <rect x="1" y="9" width="7" height="6"/>
    <rect x="9" y="9" width="6" height="6"/>
  </svg>
)

export const PxSearch = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="2" y="2" width="8" height="1"/>
    <rect x="1" y="3" width="1" height="6"/>
    <rect x="10" y="3" width="1" height="6"/>
    <rect x="2" y="9" width="8" height="1"/>
    <rect x="9" y="9" width="1" height="1"/>
    <rect x="10" y="10" width="1" height="1"/>
    <rect x="11" y="11" width="2" height="2"/>
    <rect x="12" y="12" width="2" height="3"/>
  </svg>
)

export const PxClose = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 14 14" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="0" y="0" width="2" height="2"/>
    <rect x="2" y="2" width="2" height="2"/>
    <rect x="4" y="4" width="2" height="2"/>
    <rect x="6" y="6" width="2" height="2"/>
    <rect x="8" y="8" width="2" height="2"/>
    <rect x="10" y="10" width="2" height="2"/>
    <rect x="12" y="12" width="2" height="2"/>
    <rect x="12" y="0" width="2" height="2"/>
    <rect x="10" y="2" width="2" height="2"/>
    <rect x="8" y="4" width="2" height="2"/>
    <rect x="4" y="8" width="2" height="2"/>
    <rect x="2" y="10" width="2" height="2"/>
    <rect x="0" y="12" width="2" height="2"/>
  </svg>
)

export const PxMinus = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 14 14" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="2" y="6" width="10" height="2"/>
  </svg>
)

export const PxMaximize = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 14 14" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="1" y="1" width="12" height="2"/>
    <rect x="1" y="1" width="2" height="12"/>
    <rect x="1" y="11" width="12" height="2"/>
    <rect x="11" y="1" width="2" height="12"/>
  </svg>
)

export const PxChevronUp = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="7" y="3" width="2" height="2"/>
    <rect x="5" y="5" width="2" height="2"/>
    <rect x="9" y="5" width="2" height="2"/>
    <rect x="3" y="7" width="2" height="2"/>
    <rect x="11" y="7" width="2" height="2"/>
    <rect x="1" y="9" width="2" height="2"/>
    <rect x="13" y="9" width="2" height="2"/>
  </svg>
)

export const PxChevronDown = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="1" y="5" width="2" height="2"/>
    <rect x="13" y="5" width="2" height="2"/>
    <rect x="3" y="7" width="2" height="2"/>
    <rect x="11" y="7" width="2" height="2"/>
    <rect x="5" y="9" width="2" height="2"/>
    <rect x="9" y="9" width="2" height="2"/>
    <rect x="7" y="11" width="2" height="2"/>
  </svg>
)

export const PxChevronRight = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="5" y="1" width="2" height="2"/>
    <rect x="7" y="3" width="2" height="2"/>
    <rect x="9" y="5" width="2" height="2"/>
    <rect x="11" y="7" width="2" height="2"/>
    <rect x="9" y="9" width="2" height="2"/>
    <rect x="7" y="11" width="2" height="2"/>
    <rect x="5" y="13" width="2" height="2"/>
  </svg>
)

export const PxArrowLeft = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="1" y="7" width="10" height="2"/>
    <rect x="3" y="5" width="2" height="2"/>
    <rect x="1" y="7" width="2" height="2"/>
    <rect x="3" y="9" width="2" height="2"/>
  </svg>
)

export const PxArrowRight = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="5" y="7" width="10" height="2"/>
    <rect x="11" y="5" width="2" height="2"/>
    <rect x="13" y="7" width="2" height="2"/>
    <rect x="11" y="9" width="2" height="2"/>
  </svg>
)

export const PxHome = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="7" y="1" width="2" height="2"/>
    <rect x="5" y="3" width="2" height="2"/>
    <rect x="9" y="3" width="2" height="2"/>
    <rect x="3" y="5" width="2" height="2"/>
    <rect x="11" y="5" width="2" height="2"/>
    <rect x="1" y="7" width="14" height="1"/>
    <rect x="3" y="8" width="10" height="7"/>
    <rect x="6" y="10" width="4" height="5" fill="#111"/>
  </svg>
)

export const PxPlay = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="3" y="2" width="2" height="12"/>
    <rect x="5" y="3" width="2" height="10"/>
    <rect x="7" y="4" width="2" height="8"/>
    <rect x="9" y="5" width="2" height="6"/>
    <rect x="11" y="6" width="2" height="4"/>
    <rect x="13" y="7" width="1" height="2"/>
  </svg>
)

export const PxPause = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="3" y="2" width="4" height="12"/>
    <rect x="9" y="2" width="4" height="12"/>
  </svg>
)

export const PxSkipBack = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="2" y="2" width="2" height="12"/>
    <rect x="4" y="3" width="2" height="10"/>
    <rect x="6" y="4" width="2" height="8"/>
    <rect x="8" y="5" width="2" height="6"/>
    <rect x="10" y="6" width="2" height="4"/>
    <rect x="12" y="7" width="1" height="2"/>
    <rect x="12" y="2" width="2" height="12"/>
  </svg>
)

export const PxSkipForward = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="12" y="2" width="2" height="12"/>
    <rect x="10" y="3" width="2" height="10"/>
    <rect x="8" y="4" width="2" height="8"/>
    <rect x="6" y="5" width="2" height="6"/>
    <rect x="4" y="6" width="2" height="4"/>
    <rect x="3" y="7" width="1" height="2"/>
    <rect x="2" y="2" width="2" height="12"/>
  </svg>
)

export const PxRadio = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="2" y="7" width="12" height="7"/>
    <rect x="4" y="9" width="4" height="3" fill="#111"/>
    <rect x="5" y="9" width="2" height="3" fill="currentColor" opacity="0.5"/>
    <rect x="10" y="10" width="2" height="2"/>
    <rect x="5" y="4" width="2" height="3"/>
    <rect x="7" y="3" width="4" height="1"/>
    <rect x="11" y="4" width="2" height="1"/>
    <rect x="3" y="5" width="2" height="2"/>
  </svg>
)

export const PxMusic = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="6" y="1" width="8" height="1"/>
    <rect x="6" y="2" width="8" height="1" opacity="0.7"/>
    <rect x="6" y="3" width="8" height="1" opacity="0.5"/>
    <rect x="12" y="4" width="2" height="5"/>
    <rect x="6" y="4" width="2" height="8"/>
    <rect x="2" y="10" width="6" height="4"/>
    <rect x="10" y="9" width="6" height="4"/>
  </svg>
)

export const PxWifi = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="7" y="13" width="2" height="2"/>
    <rect x="5" y="10" width="6" height="2" opacity="0.65"/>
    <rect x="3" y="7" width="10" height="2" opacity="0.45"/>
    <rect x="1" y="4" width="14" height="2" opacity="0.25"/>
  </svg>
)

export const PxActivity = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="1" y="8" width="2" height="1"/>
    <rect x="3" y="7" width="2" height="2"/>
    <rect x="5" y="5" width="2" height="6"/>
    <rect x="7" y="3" width="2" height="10"/>
    <rect x="9" y="5" width="2" height="6"/>
    <rect x="11" y="7" width="2" height="2"/>
    <rect x="13" y="8" width="2" height="1"/>
  </svg>
)

export const PxShield = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="3" y="1" width="10" height="1"/>
    <rect x="1" y="2" width="2" height="6"/>
    <rect x="13" y="2" width="2" height="6"/>
    <rect x="3" y="8" width="2" height="2"/>
    <rect x="11" y="8" width="2" height="2"/>
    <rect x="5" y="10" width="2" height="2"/>
    <rect x="9" y="10" width="2" height="2"/>
    <rect x="7" y="12" width="2" height="2"/>
    <rect x="3" y="1" width="10" height="8"/>
    <rect x="6" y="5" width="4" height="1" fill="#111"/>
    <rect x="7" y="4" width="2" height="3" fill="#111"/>
  </svg>
)

export const PxUsb = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="7" y="1" width="2" height="10"/>
    <rect x="3" y="4" width="4" height="1"/>
    <rect x="9" y="6" width="4" height="1"/>
    <rect x="3" y="4" width="1" height="3"/>
    <rect x="9" y="6" width="1" height="3"/>
    <rect x="2" y="7" width="3" height="2"/>
    <rect x="11" y="9" width="3" height="2"/>
    <rect x="5" y="11" width="6" height="4"/>
  </svg>
)

export const PxLock = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="4" y="1" width="8" height="1"/>
    <rect x="3" y="2" width="1" height="5"/>
    <rect x="12" y="2" width="1" height="5"/>
    <rect x="4" y="6" width="8" height="1"/>
    <rect x="2" y="7" width="12" height="8"/>
    <rect x="6" y="10" width="4" height="1" fill="#111"/>
    <rect x="7" y="9" width="2" height="3" fill="#111"/>
  </svg>
)

export const PxStar = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="7" y="1" width="2" height="3"/>
    <rect x="5" y="4" width="6" height="2"/>
    <rect x="1" y="6" width="14" height="2"/>
    <rect x="3" y="8" width="4" height="2"/>
    <rect x="9" y="8" width="4" height="2"/>
    <rect x="1" y="10" width="3" height="2"/>
    <rect x="12" y="10" width="3" height="2"/>
    <rect x="2" y="12" width="3" height="2"/>
    <rect x="11" y="12" width="3" height="2"/>
  </svg>
)

export const PxBluetooth = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="7" y="1" width="2" height="14"/>
    <rect x="11" y="1" width="2" height="2"/>
    <rect x="9" y="3" width="2" height="2"/>
    <rect x="5" y="5" width="2" height="2"/>
    <rect x="9" y="7" width="4" height="2"/>
    <rect x="5" y="9" width="2" height="2"/>
    <rect x="9" y="11" width="2" height="2"/>
    <rect x="11" y="13" width="2" height="2"/>
  </svg>
)

export const PxRefresh = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="6" y="1" width="4" height="2"/>
    <rect x="10" y="3" width="2" height="2"/>
    <rect x="12" y="5" width="2" height="4"/>
    <rect x="11" y="9" width="2" height="2"/>
    <rect x="9" y="11" width="2" height="2"/>
    <rect x="5" y="12" width="4" height="2"/>
    <rect x="3" y="10" width="2" height="2"/>
    <rect x="2" y="6" width="2" height="4"/>
    <rect x="3" y="4" width="2" height="2"/>
    <rect x="5" y="3" width="2" height="2"/>
    <rect x="1" y="3" width="4" height="2"/>
    <rect x="3" y="1" width="2" height="4"/>
  </svg>
)

export const PxCamera = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="1" y="5" width="14" height="9"/>
    <rect x="5" y="3" width="6" height="2"/>
    <rect x="12" y="6" width="2" height="2" fill="#fff" opacity="0.5"/>
    <rect x="5" y="6" width="6" height="6" fill="#fff" opacity="0.15"/>
    <rect x="6" y="7" width="4" height="4" fill="#fff" opacity="0.15"/>
  </svg>
)

export const PxUser = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="5" y="1" width="6" height="5"/>
    <rect x="3" y="7" width="10" height="5"/>
    <rect x="4" y="12" width="3" height="3"/>
    <rect x="9" y="12" width="3" height="3"/>
  </svg>
)

export const PxMail = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="1" y="3" width="14" height="1"/>
    <rect x="1" y="13" width="14" height="1"/>
    <rect x="1" y="4" width="1" height="9"/>
    <rect x="14" y="4" width="1" height="9"/>
    <rect x="1" y="4" width="4" height="1"/>
    <rect x="11" y="4" width="4" height="1"/>
    <rect x="4" y="5" width="3" height="1"/>
    <rect x="9" y="5" width="3" height="1"/>
    <rect x="6" y="6" width="2" height="1"/>
    <rect x="8" y="6" width="2" height="1"/>
    <rect x="7" y="7" width="2" height="1"/>
  </svg>
)

export const PxGamepad = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="1" y="4" width="14" height="7"/>
    <rect x="1" y="9" width="5" height="5"/>
    <rect x="10" y="9" width="5" height="5"/>
    <rect x="4" y="5" width="2" height="5" fill="#fff"/>
    <rect x="3" y="7" width="4" height="1" fill="#fff"/>
    <rect x="10" y="5" width="2" height="2" fill="#fff"/>
    <rect x="13" y="5" width="2" height="2" fill="#fff"/>
    <rect x="10" y="8" width="2" height="2" fill="#fff"/>
    <rect x="11" y="6" width="2" height="2" fill="#fff"/>
  </svg>
)

export const PxCalculator = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="2" y="1" width="12" height="14"/>
    <rect x="3" y="2" width="10" height="4" fill="#fff"/>
    <rect x="3" y="7" width="2" height="2" fill="#fff"/>
    <rect x="7" y="7" width="2" height="2" fill="#fff"/>
    <rect x="11" y="7" width="2" height="2" fill="#fff"/>
    <rect x="3" y="10" width="2" height="2" fill="#fff"/>
    <rect x="7" y="10" width="2" height="2" fill="#fff"/>
    <rect x="11" y="10" width="2" height="2" fill="#fff"/>
    <rect x="3" y="13" width="2" height="2" fill="#fff"/>
    <rect x="7" y="13" width="2" height="2" fill="#fff"/>
    <rect x="11" y="13" width="2" height="2" fill="#fff"/>
  </svg>
)

export const PxCloud = ({ size = 24, className = '', style: xStyle, ...rest }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={{ ...S, ...xStyle }} fill="currentColor" {...rest}>
    <rect x="5" y="3" width="5" height="2"/>
    <rect x="3" y="5" width="9" height="1"/>
    <rect x="2" y="6" width="12" height="4"/>
    <rect x="3" y="10" width="10" height="1"/>
    <rect x="8" y="2" width="4" height="2"/>
    <rect x="11" y="4" width="3" height="3"/>
  </svg>
)
