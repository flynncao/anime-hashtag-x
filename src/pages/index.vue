<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import axios from 'axios'
import { useToast } from 'vue-toastification'

defineOptions({
  name: 'IndexPage',
})
const toast = useToast()
const name = ref('')
const content = ref('')
const { t } = useI18n()
const { copy, copied } = useClipboard({ source: content, legacy: true })
watch(copied, (val) => {
  if (val)
    toast.success(t('copied'))
})
function go() {
  if (name.value) {
    axios.get(`https://api.bgm.tv/search/subject/${name.value}?type=2&responseGroup=small`, {
      responseType: 'json',
    }).then((res) => {
      if (!Object.keys(res.data).length)
        toast.error(t('not-found'))
      else
        content.value = `#${purify(res.data.list[0].name_cn)} #${purify(res.data.list[0].name)}`
    }).catch((error) => {
      if (axios.isAxiosError(error))
        handleAxiosError(error)
      else
        handleUnexpectedError(error)
    })
  }
}

function purify(str: string) {
  return str.trim().replace(/\s/g, '')
}
function handleAxiosError(err?: any) {
  if (err)
    toast.error(err)
}
function handleUnexpectedError(err?: any) {
  if (err)
    toast.error(err)
}
function handleCopy() {
  copy(content.value)
}
</script>

<template>
  <div>
    <div text-4xl>
      <div i-icon-park-twitter inline-block />
    </div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        {{ t('intro.desc') }}
      </a>
    </p>

    <div py-4 />

    <TheInput
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      autocomplete="false"
      size="2xl"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        m-3 text-sm btn
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>

    <div class="py-4" />
    <TheTextarea
      v-model="content"
      autocomplete="false"
      size="2xl"
      :row-count="24"
    />
    <div>
      <button
        m-3 text-sm btn
        class="copyBtn"
        :disabled="!content"
        @click="handleCopy"
      >
        {{ t('button.copy') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
