<script setup>
import Icon from './Icon.vue'
import { player, play, toggleFav, isFav, fmt } from '../store/player'
defineProps({ track: Object, list: Array, n: Number })
</script>

<template>
  <div class="row" :class="{ active: player.current?.id === track.id }" @click="play(track, list)">
    <span class="n">
      <Icon v-if="player.current?.id === track.id && player.playing" name="bars" :size="16" />
      <template v-else>{{ n }}</template>
    </span>
    <img v-if="track.cover" :src="track.cover" loading="lazy" alt="" />
    <div v-else class="img"><Icon name="note" :size="20" /></div>
    <div class="info">
      <div class="t">{{ track.title }}</div>
      <div class="a">{{ track.artist }}</div>
    </div>
    <span class="d">{{ track.type === 'song' ? '30 s' : fmt(track.duration) }}</span>
    <button class="heart" :class="{ on: isFav(track) }" title="Favori" @click.stop="toggleFav(track)">
      <Icon :name="isFav(track) ? 'heart' : 'heart-o'" :size="20" />
    </button>
  </div>
</template>

<style scoped>
.row { display: grid; grid-template-columns: 32px 46px 1fr 56px 36px; gap: 12px; align-items: center; padding: 8px 10px; border-radius: 12px; cursor: pointer; transition: background .15s; }
.row:hover { background: var(--panel2); }
.row.active { background: #ff4d9418; }
.row.active .t, .row.active .n { color: var(--pink); }
.n { display: grid; place-items: center; color: var(--muted); font-size: 14px; }
img, .img { width: 46px; height: 46px; border-radius: 8px; object-fit: cover; background: #33333d; display: grid; place-items: center; color: var(--pink); }
.info { min-width: 0; }
.t { font-weight: 600; font-size: 14.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.a { font-size: 12.5px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px; }
.d { color: var(--muted); font-size: 13px; text-align: right; }
.heart { color: var(--muted); transition: .15s; display: grid; place-items: center; }
.heart:hover { color: var(--text); transform: scale(1.15); }
.heart.on { color: var(--pink); }
@media (max-width: 760px) { .row { grid-template-columns: 46px 1fr 36px; } .n, .d { display: none; } }
</style>
