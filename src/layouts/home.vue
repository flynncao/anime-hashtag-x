<script lang="ts" setup>
import { useAnimeStore } from '~/composables/store'

const store = useAnimeStore()
const src = ref<string>(store.animeUrl)
const showRainbow = ref<boolean>(true)
store.$subscribe((mutation, state) => {
  console.log('mutation', mutation)
  console.log('state', state)
  src.value = state.animeUrl
  if (src.value.trim() !== '')
    showRainbow.value = false
})
</script>

<template>
  <img :src="src" alt="" class="fixed left-0 top-0 h-full w-full blur-xl -z-10">

  <RainBow v-if="showRainbow" class="h-full w-full -z-50" :is-static="true" />
  <main

    class="overflow-hidden" h-full w-full
    text="center gray-700 dark:gray-200"
  >
    <RouterView />
    <TheFooter />
  </main>
</template>
