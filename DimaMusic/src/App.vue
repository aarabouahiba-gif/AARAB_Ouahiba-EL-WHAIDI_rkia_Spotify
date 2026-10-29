<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import PlayerBar from './components/PlayerBar.vue'
import HomeView from './views/HomeView.vue'
import PodcastsView from './views/PodcastsView.vue'
import SearchView from './views/SearchView.vue'
import FavoritesView from './views/FavoritesView.vue'

const view = ref('home')
const views = { home: HomeView, podcasts: PodcastsView, search: SearchView, favs: FavoritesView }
</script>

<template>
  <div class="shell">
    <Sidebar :view="view" @go="view = $event" />
    <main class="main">
      <KeepAlive>
        <component :is="views[view]" />
      </KeepAlive>
    </main>
    <PlayerBar />
  </div>
</template>

<style>
.shell {
  height: 100%; display: grid;
  grid-template-columns: 240px 1fr; grid-template-rows: 1fr 92px;
  grid-template-areas: 'side main' 'player player';
  gap: 8px; padding: 8px;
}
.main {
  grid-area: main; overflow-y: auto; border-radius: 16px; padding: 28px 30px 40px;
  background: linear-gradient(180deg, #3a1530 0%, var(--panel) 260px);
}
@media (max-width: 760px) {
  .shell { grid-template-columns: 1fr; grid-template-rows: 1fr 84px 62px;
    grid-template-areas: 'main' 'player' 'side'; padding: 0; gap: 0; }
  .main { border-radius: 0; padding: 20px 16px 30px; }
}
</style>
