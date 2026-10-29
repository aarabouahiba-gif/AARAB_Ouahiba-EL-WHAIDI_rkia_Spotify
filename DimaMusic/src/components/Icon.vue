<script setup>
defineProps({ name: String, size: { type: Number, default: 20 } })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path v-if="name === 'home'" d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z" />
    <path v-else-if="name === 'search'" d="M10 2a8 8 0 1 0 4.9 14.3l5.4 5.4 1.4-1.4-5.4-5.4A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
    <path v-else-if="name === 'mic'" d="M12 14a4 4 0 0 0 4-4V5a4 4 0 0 0-8 0v5a4 4 0 0 0 4 4zm6-4a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.9V21h2v-3.1A8 8 0 0 0 20 10z" />
    <path v-else-if="name === 'heart'" d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.800-8 11-8 11z" />
    <path v-else-if="name === 'heart-o'" d="M12 20.500 10.800 19.500C6 15.300 3 12.600 3 9.300A4.500 4.500 0 0 1 7.500 5c1.600 0 3.100.8 4.500 2.300C13.400 5.800 14.900 5 16.500 5A4.500 4.500 0 0 1 21 9.300c0 3.300-3 6-7.800 10.200zM7.500 7A2.500 2.500 0 0 0 5 9.300c0 2.300 2.400 4.600 7 8.700 4.600-4.100 7-6.400 7-8.700A2.500 2.500 0 0 0 16.500 7c-1.200 0-2.400.8-3.400 2.400h-2.200C9.900 7.800 8.700 7 7.500 7z" />
    <path v-else-if="name === 'play'" d="M7 4v16l13-8z" />
    <path v-else-if="name === 'pause'" d="M6 4h4v16H6zm8 0h4v16h-4z" />
    <path v-else-if="name === 'prev'" d="M6 5h2v14H6zm13 0v14L9 12z" />
    <path v-else-if="name === 'next'" d="M16 5h2v14h-2zM5 5l10 7L5 19z" />
    <path v-else-if="name === 'volume'" d="M3 9v6h4l5 4V5L7 9zm13.500 3a4.500 4.500 0 0 0-2.500-4v8a4.500 4.500 0 0 0 2.500-4zM14 3.200v2.100a7 7 0 0 1 0 13.400v2.100a9 9 0 0 0 0-17.600z" />
    <path v-else-if="name === 'note'" d="M12 3v10.600A4 4 0 1 0 14 17V7h5V3z" />
    <path v-else-if="name === 'back'" d="m15 5-7 7 7 7 1.400-1.400L10.800 12l5.600-5.600z" />
    <path v-else-if="name === 'bars'" d="M5 10h3v10H5zm5.500-6h3v16h-3zM16 13h3v7h-3z" />
  </svg>
</template>
