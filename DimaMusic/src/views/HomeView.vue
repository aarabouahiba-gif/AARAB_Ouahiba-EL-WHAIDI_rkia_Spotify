<script setup>
import { ref, onMounted } from 'vue'
import { searchSongs } from '../api'
import { play } from '../store/player'
import Card from '../components/Card.vue'

const sections = ref([
  { title: 'Hits marocains', term: 'Saad Lamjarred', items: [] },
  { title: 'Chaabi et Daqqa', term: 'chaabi maroc', items: [] },
  { title: 'Pop marocaine', term: 'Douzi', items: [] },
  { title: 'Hatim Ammor', term: 'Hatim Ammor', items: [] },
  { title: 'Asma Lmnawar', term: 'Asma Lmnawar', items: [] },
  { title: 'Gnawa et fusion', term: 'Gnawa Maroc', items: [] },
])
const loading = ref(true)

onMounted(async () => {
  await Promise.all(
    sections.value.map(async (s) => {
      try { s.items = await searchSongs(s.term, 14) } catch { s.items = [] }
    })
  )
  loading.value = false
})

const greet = () => {
  const h = new Date().getHours()
  return h < 12 ? 'Bonjour' : h < 18 ? 'Bon après-midi' : 'Bonsoir'
}
</script>

<template>
  <section>
    <h1>{{ greet() }}</h1>Ecoute sans limite 
    <p class="muted sub"></p>
    <div v-if="loading" class="spinner"></div>
    <div v-for="s in sections" :key="s.title" v-show="s.items.length" class="sec">
      <h2>{{ s.title }}</h2>
      <div class="scroll">
        <Card v-for="t in s.items" :key="t.id" :track="t" @click="play(t, s.items)" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.sub { margin: 4px 0 26px; }
.sec { margin-bottom: 30px; }
.scroll { display: flex; gap: 14px; overflow-x: auto; padding-bottom: 10px; }
</style>
