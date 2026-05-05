import { create } from 'zustand'

const LS_KEY = 'brutaos_fs_v1'

const DEFAULTS = {
  desktop: [],
  downloads: [],
  documents: [],
  images: [],
  videos: [],
}

const load = () => {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return DEFAULTS
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    return DEFAULTS
  }
}

const persist = (fs) => {
  try { localStorage.setItem(LS_KEY, JSON.stringify(fs)) } catch {}
}

export const useFileSystem = create((set, get) => ({
  fs: load(),

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

  uploadToFolder: (folder, rawFile) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      get().addFile(folder, {
        id: `f_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        type: 'file',
        name: rawFile.name,
        url: e.target.result,
        mimeType: rawFile.type,
        size: rawFile.size,
        createdAt: Date.now(),
      })
    }
    reader.readAsDataURL(rawFile)
  },
}))
