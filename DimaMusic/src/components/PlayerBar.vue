<script setup>
import Icon from './Icon.vue'
import { player, toggle, next, prev, seek, setVolume, toggleFav, isFav, fmt } from '../store/player'
</script>

<template>
  <footer class="bar">
    <div class="now">
      <template v-if="player.current">
        <img v-if="player.current.cover" :src="player.current.cover" alt="" />
        <div v-else class="img"><Icon name="note" :size="24" /></div>
        <div class="meta">
          <div class="t">{{ player.current.title }}</div>
          <div class="a">{{ player.current.artist }}</div>
        </div>
        <button class="heart" :class="{ on: isFav(player.current) }" title="Favori" @click="toggleFav(player.current)">
          <Icon :name="isFav(player.current) ? 'heart' : 'heart-o'" :size="20" />
        </button>
      </template>
      <div v-else class="muted idle">Choisis un titre pour commencer</div>
    </div>

    <div class="center">
      <div class="ctrl">
        <button class="sm" title="Précédent" @click="prev"><Icon name="prev" :size="22" /></button>
        <button class="big" :title="player.playing ? 'Pause' : 'Lecture'" @click="toggle">
          <span v-if="player.loading" class="mini"></span>
          <Icon v-else :name="player.playing ? 'pause' : 'play'" :size="20" />
        </button>
        <button class="sm" title="Suivant" @click="next"><Icon name="next" :size="22" /></button>
      </div>
      <div class="prog">
        <span>{{ fmt(player.time) }}</span>
        <input type="range" min="0" :max="player.duration || 0" step="0.1" :value="player.time"
          :style="{ '--p': (player.duration ? (player.time / player.duration) * 100 : 0) + '%' }"
          @input="seek(+$event.target.value)" />
        <span>{{ fmt(player.duration) }}</span>
      </div>
    </div>

    <div class="vol">
      <Icon name="volume" :size="20" />
      <input type="range" min="0" max="1" step="0.01" :value="player.volume"
        :style="{ '--p': player.volume * 100 + '%' }" @input="setVolume(+$event.target.value)" />
    </div>
  </footer>
</template>

<style scoped>
.bar { grid-area: player; background: var(--panel); border-radius: 16px; display: grid; grid-template-columns: 1fr 1.6fr 1fr; align-items: center; gap: 16px; padding: 0 20px; border-top: 1px solid #ff4d9422; }
.now { display: flex; align-items: center; gap: 12px; min-width: 0; }
.now img, .img { width: 56px; height: 56px; border-radius: 10px; object-fit: cover; flex: none; background: #33333d; display: grid; place-items: center; color: var(--pink); }
.meta { min-width: 0; }
.t { font-weight: 700; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.a { font-size: 12.5px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.idle { font-size: 13px; }
.heart { color: var(--muted); display: grid; place-items: center; }
.heart.on { color: var(--pink); }
.center { display: flex; flex-direction: column; gap: 6px; align-items: center; }
.ctrl { display: flex; align-items: center; gap: 18px; }
.sm { color: var(--muted); transition: .15s; display: grid; place-items: center; }
.sm:hover { color: var(--text); }
.big { width: 42px; height: 42px; border-radius: 50%; background: var(--grad); display: grid; place-items: center; box-shadow: 0 6px 18px #ff4d9455; transition: .15s; }
.big:hover { transform: scale(1.08); }
.mini { width: 16px; height: 16px; border: 2px solid #fff6; border-top-color: #fff; border-radius: 50%; animation: sp .8s linear infinite; }
.prog { display: flex; align-items: center; gap: 10px; width: 100%; font-size: 11.5px; color: var(--muted); }
.prog input { flex: 1; }
.vol { display: flex; align-items: center; gap: 10px; justify-content: flex-end; color: var(--muted); }
.vol input { width: 110px; }
input[type=range] { -webkit-appearance: none; appearance: none; height: 5px; border-radius: 5px; cursor: pointer;
  background: linear-gradient(90deg, var(--pink) var(--p, 0%), #3a3a45 var(--p, 0%)); }
input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 13px; height: 13px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 3px #ff4d9455; }
input[type=range]::-moz-range-thumb { width: 13px; height: 13px; border: 0; border-radius: 50%; background: #fff; }
@media (max-width: 760px) {
  .bar { grid-template-columns: 1fr auto; border-radius: 0; padding: 0 12px; gap: 8px; }
  .vol, .prog { display: none; }
  .ctrl { gap: 10px; }
}
</style>
