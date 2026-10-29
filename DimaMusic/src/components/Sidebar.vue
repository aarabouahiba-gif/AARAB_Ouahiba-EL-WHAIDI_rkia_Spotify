<script setup>
import Icon from './Icon.vue'
defineProps({ view: String })
defineEmits(['go'])
const items = [
  { id: 'home', label: 'Accueil', icon: 'home' },
  { id: 'search', label: 'Recherche', icon: 'search' },
  { id: 'podcasts', label: 'Podcasts', icon: 'mic' },
  { id: 'favs', label: 'Favoris', icon: 'heart' },
]
</script>

<template>
  <aside class="side">
    <div class="logo">
      <span class="badge"><Icon name="note" :size="22" /></span>
      <span class="name">Dima<b>Music</b></span>
    </div>
    <nav>
      <button v-for="i in items" :key="i.id" :class="{ on: view === i.id }" @click="$emit('go', i.id)">
        <Icon :name="i.icon" :size="20" /><span class="lb">{{ i.label }}</span>
      </button>
    </nav>
    <p class="foot">Musique et podcasts marocains,<br />toujours avec toi.</p>
  </aside>
</template>

<style scoped>
.side { grid-area: side; background: var(--panel); border-radius: 16px; padding: 22px 14px; display: flex; flex-direction: column; gap: 26px; }
.logo { display: flex; align-items: center; gap: 10px; padding: 0 8px; }
.badge { width: 38px; height: 38px; border-radius: 12px; background: var(--grad); display: grid; place-items: center; box-shadow: 0 6px 18px #ff4d9455; }
.name { font-size: 22px; font-weight: 700; letter-spacing: -.5px; }
.name b { color: var(--pink); font-weight: 800; }
nav { display: flex; flex-direction: column; gap: 4px; }
nav button { display: flex; align-items: center; gap: 14px; padding: 12px 14px; border-radius: 12px; color: var(--muted); font-weight: 600; transition: .15s; text-align: left; }
nav button:hover { color: var(--text); background: var(--panel2); }
nav button.on { color: #fff; background: linear-gradient(90deg, #ff4d9433, transparent); box-shadow: inset 3px 0 0 var(--pink); }
.foot { margin-top: auto; font-size: 12px; color: var(--muted); line-height: 1.6; padding: 0 8px; }
@media (max-width: 760px) {
  .side { border-radius: 0; flex-direction: row; padding: 0; gap: 0; border-top: 1px solid var(--line); }
  .logo, .foot { display: none; }
  nav { flex-direction: row; width: 100%; gap: 0; }
  nav button { flex: 1; flex-direction: column; gap: 2px; padding: 8px 0; justify-content: center; align-items: center; border-radius: 0; font-size: 11px; }
  nav button.on { box-shadow: inset 0 3px 0 var(--pink); background: transparent; color: var(--pink); }
}
</style>
