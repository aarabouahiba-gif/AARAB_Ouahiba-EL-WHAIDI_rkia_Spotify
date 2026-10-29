import { reactive } from 'vue'

const audio = new Audio()
audio.preload = 'metadata'

const saved = (() => {
  try { return JSON.parse(localStorage.getItem('dima_favs') || '[]') } catch { return [] }
})()

export const player = reactive({
  queue: [],
  index: -1,
  current: null,
  playing: false,
  loading: false,
  time: 0,
  duration: 0,
  volume: Number(localStorage.getItem('dima_vol') ?? 0.8),
  favs: saved,
})

audio.volume = player.volume

audio.addEventListener('timeupdate', () => (player.time = audio.currentTime))
audio.addEventListener('loadedmetadata', () => (player.duration = audio.duration || 0))
audio.addEventListener('play', () => (player.playing = true))
audio.addEventListener('pause', () => (player.playing = false))
audio.addEventListener('waiting', () => (player.loading = true))
audio.addEventListener('canplay', () => (player.loading = false))
audio.addEventListener('ended', () => next())
audio.addEventListener('error', () => { player.loading = false; player.playing = false })

export function play(track, list = [track]) {
  player.queue = list
  player.index = Math.max(0, list.findIndex((t) => t.id === track.id))
  load(track)
}

function load(track) {
  player.current = track
  player.time = 0
  player.duration = track.duration || 0
  audio.src = track.audio
  audio.play().catch(() => {})
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title, artist: track.artist,
      artwork: track.cover ? [{ src: track.cover, sizes: '400x400' }] : [],
    })
    navigator.mediaSession.setActionHandler('nexttrack', next)
    navigator.mediaSession.setActionHandler('previoustrack', prev)
  }
}

export function toggle() {
  if (!player.current) return
  audio.paused ? audio.play().catch(() => {}) : audio.pause()
}

export function next() {
  if (!player.queue.length) return
  if (player.index < player.queue.length - 1) {
    player.index++
    load(player.queue[player.index])
  } else {
    audio.pause()
  }
}

export function prev() {
  if (audio.currentTime > 3 || player.index <= 0) { audio.currentTime = 0; return }
  player.index--
  load(player.queue[player.index])
}

export function seek(t) {
  audio.currentTime = t
}

export function setVolume(v) {
  player.volume = v
  audio.volume = v
  localStorage.setItem('dima_vol', v)
}

export const isFav = (t) => player.favs.some((f) => f.id === t.id)

export function toggleFav(t) {
  const i = player.favs.findIndex((f) => f.id === t.id)
  if (i >= 0) player.favs.splice(i, 1)
  else player.favs.push(t)
  localStorage.setItem('dima_favs', JSON.stringify(player.favs))
}

export function fmt(s) {
  if (!s || !isFinite(s)) return '0:00'
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = String(Math.floor(s % 60)).padStart(2, '0')
  return h ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`
}
