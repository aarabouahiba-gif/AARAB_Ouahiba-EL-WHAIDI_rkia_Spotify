<script setup>
import { ref, computed, onMounted } from 'vue'
import { searchEpisodes, searchShows, showEpisodes } from '../api'
import TrackRow from '../components/TrackRow.vue'
import Card from '../components/Card.vue'

const NOM = 'Yasser Lhzimi'
const VARIANTES = ['yasser lhzimi', 'yasser el hzimi', 'yassir lhzimi', 'ياسر الهزيمي']

// Épisodes ajoutés à la main (liens mp3), gardés sur l'appareil
const lire = () => { try { return JSON.parse(localStorage.getItem('dima_custom') || '[]') } catch { return [] } }
const perso = ref(lire())
const trouves = ref([])
const chargement = ref(true)
const principal = computed(() => [...perso.value, ...trouves.value])

const titre = ref('')
const lien = ref('')
const erreur = ref('')

const q = ref('')
const shows = ref([])
const chargementShows = ref(false)
const choisi = ref(null)
const episodes = ref([])
const chargementEps = ref(false)

const suggestions = ['podcast darija', 'podcast maroc', 'hespress', 'développement personnel maroc', 'histoire du maroc']

onMounted(async () => {
  for (const v of VARIANTES) {
    try {
      let r = await searchEpisodes(v, 40)
      if (!r.length) {
        const s = await searchShows(v, 3)
        if (s.length) r = await showEpisodes(s[0].id)
      }
      if (r.length) { trouves.value = r; break }
    } catch { /* on essaie la variante suivante */ }
  }
  chargement.value = false
  chercher('podcast darija')
})

function ajouter() {
  erreur.value = ''
  if (!titre.value.trim() || !/^https?:\/\//i.test(lien.value.trim())) {
    erreur.value = 'Indique un titre et un lien audio complet (https://…).'
    return
  }
  perso.value.unshift({
    id: 'c' + Date.now(), type: 'podcast', title: titre.value.trim(), artist: NOM,
    cover: '', audio: lien.value.trim(), duration: 0,
  })
  localStorage.setItem('dima_custom', JSON.stringify(perso.value))
  titre.value = ''
  lien.value = ''
}

function retirer(id) {
  perso.value = perso.value.filter((t) => t.id !== id)
  localStorage.setItem('dima_custom', JSON.stringify(perso.value))
}

async function chercher(terme) {
  if (terme) q.value = terme
  if (!q.value.trim()) return
  choisi.value = null
  chargementShows.value = true
  try { shows.value = await searchShows(q.value, 18) } catch { shows.value = [] }
  chargementShows.value = false
}

async function ouvrir(show) {
  choisi.value = show
  chargementEps.value = true
  try { episodes.value = await showEpisodes(show.id) } catch { episodes.value = [] }
  chargementEps.value = false
}
</script>

<template>
  <section>
    <h1>Podcasts</h1>
    <p class="muted sub">Écoute les épisodes en streaming.</p>

    <h2>{{ NOM }}</h2>
    <div v-if="chargement" class="spinner"></div>
    <template v-else>
      <TrackRow v-for="(t, i) in principal" :key="t.id" :track="t" :list="principal" :n="i + 1" />
      <p v-if="!principal.length" class="empty">
        Aucun épisode de {{ NOM }} n'a été trouvé dans l'annuaire.<br />
        Tu peux ajouter tes propres épisodes avec un lien audio ci-dessous.
      </p>
    </template>

    <details class="ajout" :open="!principal.length">
      <summary>Ajouter un épisode de {{ NOM }}</summary>
      <form @submit.prevent="ajouter">
        <input v-model="titre" placeholder="Titre de l'épisode" />
        <input v-model="lien" placeholder="Lien audio direct (https://…mp3)" />
        <button type="submit">Ajouter</button>
      </form>
      <p v-if="erreur" class="err">{{ erreur }}</p>
      <div v-if="perso.length" class="liste">
        <div v-for="t in perso" :key="t.id" class="ligne">
          <span>{{ t.title }}</span>
          <button @click="retirer(t.id)">Supprimer</button>
        </div>
      </div>
    </details>

    <h2 class="gap">Explorer d'autres podcasts</h2>
    <form class="box" @submit.prevent="chercher()">
      <input v-model="q" placeholder="Nom d'un podcast" />
      <button type="submit">Chercher</button>
    </form>
    <div class="chips">
      <button v-for="s in suggestions" :key="s" @click="chercher(s)">{{ s }}</button>
    </div>

    <template v-if="choisi">
      <button class="back" @click="choisi = null">Retour aux résultats</button>
      <h2>{{ choisi.title }}</h2>
      <div v-if="chargementEps" class="spinner"></div>
      <TrackRow v-for="(t, i) in episodes" :key="t.id" :track="t" :list="episodes" :n="i + 1" />
      <p v-if="!chargementEps && !episodes.length" class="empty">Aucun épisode disponible.</p>
    </template>
    <template v-else>
      <div v-if="chargementShows" class="spinner"></div>
      <div class="grid">
        <Card v-for="s in shows" :key="s.id" :title="s.title" :sub="s.artist" :cover="s.cover" @click="ouvrir(s)" />
      </div>
    </template>
  </section>
</template>

<style scoped>
.sub { margin: 4px 0 24px; }
.gap { margin-top: 40px; }
.ajout { margin-top: 18px; background: var(--panel2); border-radius: 14px; padding: 14px 16px; max-width: 640px; }
.ajout summary { cursor: pointer; font-weight: 700; color: var(--pink); }
.ajout form { display: flex; flex-direction: column; gap: 10px; margin-top: 14px; }
.ajout input { background: var(--bg); border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; outline: 0; color: var(--text); }
.ajout input:focus { border-color: var(--pink); }
.ajout form button { align-self: flex-start; background: var(--grad); padding: 9px 22px; border-radius: 30px; font-weight: 700; color: #fff; }
.err { color: #ff8a8a; font-size: 13px; margin-top: 8px; }
.liste { margin-top: 14px; display: flex; flex-direction: column; gap: 6px; }
.ligne { display: flex; justify-content: space-between; gap: 10px; font-size: 13.5px; }
.ligne span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ligne button { color: var(--muted); font-size: 12.5px; text-decoration: underline; }
.box { display: flex; gap: 8px; max-width: 460px; background: var(--panel2); border: 1px solid var(--line); border-radius: 40px; padding: 5px 5px 5px 18px; }
.box:focus-within { border-color: var(--pink); }
.box input { flex: 1; background: none; border: 0; outline: 0; min-width: 0; color: var(--text); }
.box button { background: var(--grad); padding: 8px 20px; border-radius: 30px; font-weight: 700; color: #fff; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0 20px; }
.chips button { padding: 6px 14px; border-radius: 30px; background: var(--panel2); color: var(--muted); font-size: 13px; }
.chips button:hover { color: #fff; background: #ff4d9444; }
.back { color: var(--pink); font-weight: 700; margin-bottom: 10px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 14px; }
.grid :deep(.card) { width: auto; }
</style>
