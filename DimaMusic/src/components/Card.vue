<script setup>
import Icon from './Icon.vue'
defineProps({ track: Object, title: String, sub: String, cover: String })
</script>

<template>
  <div class="card">
    <div class="art">
      <img v-if="cover || track?.cover" :src="cover || track.cover" loading="lazy" alt="" />
      <div v-else class="ph"><Icon name="note" :size="40" /></div>
      <span class="play"><Icon name="play" :size="16" /></span>
    </div>
    <div class="t">{{ title || track?.title }}</div>
    <div class="s">{{ sub || track?.artist }}</div>
  </div>
</template>

<style scoped>
.card { width: 160px; flex: 0 0 auto; padding: 12px; border-radius: 14px; background: var(--panel2); cursor: pointer; transition: .2s; }
.card:hover { background: #2d2d37; transform: translateY(-3px); }
.art { position: relative; aspect-ratio: 1; border-radius: 10px; overflow: hidden; background: #33333d; margin-bottom: 10px; }
.art img { width: 100%; height: 100%; object-fit: cover; display: block; }
.ph { height: 100%; display: grid; place-items: center; color: var(--pink); }
.play { position: absolute; right: 8px; bottom: 8px; width: 38px; height: 38px; border-radius: 50%; background: var(--grad); display: grid; place-items: center; opacity: 0; transform: translateY(8px); transition: .2s; box-shadow: 0 6px 16px #0008; }
.card:hover .play { opacity: 1; transform: none; }
.t { font-weight: 700; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.s { font-size: 12.5px; color: var(--muted); margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
