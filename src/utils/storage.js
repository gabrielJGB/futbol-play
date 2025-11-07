// utils/storage.js
export const save = (key, value) => localStorage.setItem(key, JSON.stringify(value))
export const load = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch {
    return fallback
  }
}
