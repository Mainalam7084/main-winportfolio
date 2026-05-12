import React, { useState, useEffect } from 'react'

const px = { fontFamily: 'var(--font-family-pixel)' }

const EMPTY_MANIFEST = { photos: [], videos: [] }

export default function Gallery() {
  const [tab, setTab] = useState('photos')
  const [{ manifest, loading }, setGallery] = useState({ manifest: EMPTY_MANIFEST, loading: true })
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    fetch('/media/manifest.json')
      .then((r) => r.json())
      .then((data) => setGallery({ manifest: data, loading: false }))
      .catch(() => setGallery(prev => ({ ...prev, loading: false })))
  }, [])

  const photos = manifest.photos || []
  const videos = manifest.videos || []

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>

      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: '3px solid #000', flexShrink: 0 }}>
        {['photos', 'videos'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              ...px, fontSize: '12px', letterSpacing: '1px',
              padding: '10px 20px',
              border: 'none', borderRight: '2px solid #000',
              background: tab === t ? '#000' : '#fff',
              color: tab === t ? '#facc15' : '#000',
              cursor: 'pointer',
            }}
          >
            {t.toUpperCase()} ({t === 'photos' ? photos.length : videos.length})
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ ...px, fontSize: '10px', color: '#aaa', padding: '12px', alignSelf: 'center' }}>
          /media/{tab}/
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {loading && (
          <div style={{ ...px, fontSize: '12px', color: '#888', padding: '40px', textAlign: 'center' }}>
            LOADING...
          </div>
        )}

        {!loading && tab === 'photos' && (
          photos.length === 0 ? (
            <EmptyState type="photos" />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
              {photos.map((item, i) => (
                <PhotoCard
                  key={i}
                  src={`/media/photos/${item.file}`}
                  caption={item.caption || item.file}
                  onClick={() => setLightbox({ src: `/media/photos/${item.file}`, caption: item.caption || item.file })}
                />
              ))}
            </div>
          )
        )}

        {!loading && tab === 'videos' && (
          videos.length === 0 ? (
            <EmptyState type="videos" />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {videos.map((item, i) => (
                <VideoCard key={i} src={`/media/videos/${item.file}`} caption={item.caption || item.file} />
              ))}
            </div>
          )
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'absolute', inset: 0, zIndex: 999,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '12px', cursor: 'pointer',
          }}
        >
          <img
            src={lightbox.src}
            alt={lightbox.caption}
            style={{ maxWidth: '90%', maxHeight: '80%', border: '3px solid #facc15', imageRendering: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          />
          <div style={{ ...px, fontSize: '12px', color: '#facc15', letterSpacing: '1px' }}>
            {lightbox.caption}
          </div>
          <div style={{ ...px, fontSize: '10px', color: '#666' }}>click anywhere to close</div>
        </div>
      )}
    </div>
  )
}

function PhotoCard({ src, caption, onClick }) {
  const [err, setErr] = useState(false)
  return (
    <div
      onClick={onClick}
      style={{
        border: '2px solid #000', cursor: 'pointer', background: '#f0f0f0',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#facc15'; e.currentTarget.style.boxShadow = '3px 3px 0 #000' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ width: '100%', aspectRatio: '1', overflow: 'hidden', background: '#e0e0e0' }}>
        {err ? (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-family-pixel)', fontSize: '10px', color: '#aaa' }}>
            NO IMG
          </div>
        ) : (
          <img
            src={src}
            alt={caption}
            onError={() => setErr(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
      <div style={{
        fontFamily: 'var(--font-family-pixel)', fontSize: '10px',
        padding: '6px 8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        borderTop: '2px solid #000',
      }}>
        {caption}
      </div>
    </div>
  )
}

function VideoCard({ src, caption }) {
  return (
    <div style={{ border: '2px solid #000' }}>
      <video
        src={src}
        controls
        style={{ width: '100%', display: 'block', background: '#000' }}
      />
      <div style={{
        fontFamily: 'var(--font-family-pixel)', fontSize: '11px',
        padding: '8px 12px', borderTop: '2px solid #000', letterSpacing: '1px',
      }}>
        {caption}
      </div>
    </div>
  )
}

function EmptyState({ type }) {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-family-pixel)', fontSize: '13px', color: '#aaa', lineHeight: '2', letterSpacing: '1px' }}>
        NO {type.toUpperCase()} YET<br/>
        <span style={{ fontSize: '11px', color: '#ccc' }}>
          Drop files into&nbsp;
          <span style={{ color: '#000', background: '#facc15', padding: '1px 6px' }}>
            public/media/{type}/
          </span>
          <br/>then add them to&nbsp;
          <span style={{ color: '#000', background: '#facc15', padding: '1px 6px' }}>
            public/media/manifest.json
          </span>
        </span>
      </div>
    </div>
  )
}
