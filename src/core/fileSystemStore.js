import { create } from 'zustand'

const LS_KEY = 'brutaos_fs_v2'

const DEFAULTS = {
  desktop: [],
  downloads: [],
  documents: [],
  photos: [],
  videos: [],
}

const loadLS = () => {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return DEFAULTS
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    return DEFAULTS
  }
}

const persist = (fs) => {
  try {
    // Only persist user-added items (those without a 'static' flag)
    const toSave = {}
    for (const [k, v] of Object.entries(fs)) {
      toSave[k] = v.filter(f => !f.static)
    }
    localStorage.setItem(LS_KEY, JSON.stringify(toSave))
  } catch {}
}

export const useFileSystem = create((set, get) => {
  // Fetch manifest and merge static files into store on startup
  fetch('/files/manifest.json')
    .then(r => r.json())
    .then(manifest => {
      const cur = get().fs
      const next = { ...cur }
      for (const folder of ['documents', 'photos', 'videos', 'downloads']) {
        const staticFiles = (manifest[folder] || []).map(f => ({ ...f, static: true }))
        // Prepend static files, keep user files after
        const userFiles = (cur[folder] || []).filter(f => !f.static)
        next[folder] = [...staticFiles, ...userFiles]
      }
      set({ fs: next })
    })
    .catch(() => {})

  return {
    fs: loadLS(),

    addFile: (folder, item) => {
      const next = { ...get().fs, [folder]: [...(get().fs[folder] ?? []), item] }
      persist(next)
      set({ fs: next })
    },

    removeFile: (folder, id) => {
      const next = { ...get().fs, [folder]: get().fs[folder].filter(f => f.id !== id) }
      persist(next)
      set({ fs: next })
    },
  }
})
