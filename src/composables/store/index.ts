import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAnimeStore = defineStore('anime', {
  state: () => ({
    animeUrl: '',
  }),
  actions: {
    changeAnimeUrl(url: string) {
      this.animeUrl = url
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAnimeStore, import.meta.hot))
