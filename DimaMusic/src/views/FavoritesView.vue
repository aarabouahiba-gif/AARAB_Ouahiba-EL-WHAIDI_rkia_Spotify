<script setup>
import { player } from '../store/player'
import TrackRow from '../components/TrackRow.vue'
</script>

<template>
  <section>
    <h1>Mes favoris</h1>
    <p class="muted sub">{{ player.favs.length }} titre(s) enregistré(s) sur cet appareil.</p>
    <TrackRow v-for="(t, i) in player.favs" :key="t.id" :track="t" :list="player.favs" :n="i + 1" />
    <p v-if="!player.favs.length" class="empty">Appuie sur le cœur d'un titre pour l'ajouter ici.</p>
  </section>
</template>

<style scoped>.sub { margin: 4px 0 20px; }</style>
