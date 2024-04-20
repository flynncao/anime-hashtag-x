<script setup lang="ts">
import { useHead } from 'unhead'

useHead({
  title: 'Anime Hashtag X',
  link: [
    { rel: 'icon', href: '/favicon.svg' },

  ],
})
</script>

<template>
  <RouterView />
</template>
