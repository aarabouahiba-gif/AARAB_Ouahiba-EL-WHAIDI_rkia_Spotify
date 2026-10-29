// API iTunes Search : gratuite, sans clé, CORS OK, extraits audio jouables.
const BASE = 'https://itunes.apple.com'

async function get(path, params) {
  const url = new URL(BASE + path)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  const res = await fetch(url)
  if (!res.ok) throw new Error('Erreur réseau')
  return (await res.json()).results || []
}

const big = (u) => (u ? u.replace(/\/\d+x\d+bb/, '/400x400bb') : '')

const mapSong = (r) => ({
  id: 's' + r.trackId,
  type: 'song',
  title: r.trackName,
  artist: r.artistName,
  album: r.collectionName,
  cover: big(r.artworkUrl100),
  audio: r.previewUrl,
  duration: 30,
})

const mapEpisode = (r) => ({
  id: 'e' + r.trackId,
  type: 'podcast',
  title: r.trackName,
  artist: r.collectionName || r.artistName,
  album: r.collectionName,
  cover: r.artworkUrl600 || r.artworkUrl160 || r.artworkUrl100 || '',
  audio: r.episodeUrl,
  duration: r.trackTimeMillis ? Math.round(r.trackTimeMillis / 1000) : 0,
  date: r.releaseDate,
})

export async function searchSongs(term, limit = 20) {
  const r = await get('/search', { term, media: 'music', entity: 'song', limit, country: 'FR' })
  return r.filter((x) => x.previewUrl).map(mapSong)
}

export async function searchEpisodes(term, limit = 30) {
  const r = await get('/search', { term, media: 'podcast', entity: 'podcastEpisode', limit, country: 'FR' })
  return r.filter((x) => x.episodeUrl).map(mapEpisode)
}

export async function searchShows(term, limit = 20) {
  const r = await get('/search', { term, media: 'podcast', entity: 'podcast', limit, country: 'FR' })
  return r.map((x) => ({
    id: x.collectionId,
    title: x.collectionName,
    artist: x.artistName,
    cover: x.artworkUrl600 || x.artworkUrl100,
  }))
}

export async function showEpisodes(collectionId, limit = 50) {
  const r = await get('/lookup', { id: collectionId, media: 'podcast', entity: 'podcastEpisode', limit, country: 'FR' })
  return r.filter((x) => x.episodeUrl).map(mapEpisode)
}
