<script setup>
import { ref, computed } from 'vue'
import { searchSongs, searchEpisodes } from '../api'
import TrackRow from '../components/TrackRow.vue'
import Icon from '../components/Icon.vue'

const q = ref('')
const tab = ref('songs')
const songs = ref([])
const eps = ref([])
const loading = ref(false)
const done = ref(false)
const list = computed(() => (tab.value === 'songs' ? songs.value : eps.value))

async function go() {
  if (!q.value.trim()) return
  loading.value = true
  done.value = false
  try {
    const [a, b] = await Promise.all([searchSongs(q.value, 30), searchEpisodes(q.value, 30)])
    songs.value = a
    eps.value = b
  } catch { songs.value = []; eps.value = [] }
  loading.value = false
  done.value = true
}
</script>

<template>
  <section>
    <h1>Recherche</h1>
    <form class="box" @submit.prevent="go">
      <Icon name="search" :size="20" />
      <input v-model="q" placeholder="Artiste, chanson ou podcast" autofocus />
      <button type="submit">Chercher</button>
    </form>
    <div class="tabs">
      <button :class="{ on: tab === 'songs' }" @click="tab = 'songs'">Chansons ({{ songs.length }})</button>
      <button :class="{ on: tab === 'eps' }" @click="tab = 'eps'">Épisodes ({{ eps.length }})</button>
    </div>
    <div v-if="loading" class="spinner"></div>
    <template v-else>
      <TrackRow v-for="(t, i) in list" :key="t.id" :track="t" :list="list" :n="i + 1" />
      <p v-if="done && !list.length" class="empty">Aucun résultat.</p>
      <p v-if="!done" class="empty">Tape un nom puis appuie sur Entrée.</p>
    </template>
  </section>
</template>

<style scoped>
.box { display: flex; align-items: center; gap: 10px; margin: 18px 0; background: var(--panel2); border: 1px solid var(--line); border-radius: 40px; padding: 6px 6px 6px 18px; max-width: 560px; color: var(--muted); }
.box:focus-within { border-color: var(--pink); box-shadow: 0 0 0 3px #ff4d9433; }
.box input { flex: 1; background: none; border: 0; outline: 0; padding: 8px 0; min-width: 0; color: var(--text); }
.box button { background: var(--grad); padding: 9px 20px; border-radius: 30px; font-weight: 700; color: #fff; }
.tabs { display: flex; gap: 8px; margin-bottom: 14px; }
.tabs button { padding: 8px 16px; border-radius: 30px; background: var(--panel2); color: var(--muted); font-weight: 600; font-size: 13.5px; }
.tabs button.on { background: var(--pink); color: #fff; }
</style>
