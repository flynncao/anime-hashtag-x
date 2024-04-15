<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import axios from 'axios'
import * as vueToastification from 'vue-toastification'

defineOptions({
  name: 'IndexPage',
})
const { useToast } = vueToastification
const toast = useToast()
const name = ref('')
const content = ref('')
const { t } = useI18n()
const { copy, copied } = useClipboard({ source: content, legacy: true })
enum HashtagState {
  Ready,
  Inputing,
  Calculated,
}
const state = ref<HashtagState>(HashtagState.Ready)
const targetLangIcons = reactive([
  {
    icon: 'i-twemoji-flag-for-flag-japan',
    checked: true,
    locale: 'ja',
    value: '',
    placeholder: '#鉄腕アトム',
  },
  {
    icon: 'i-twemoji-flag-for-flag-china',
    checked: false,
    locale: 'zh-CN',
    value: '',
    placeholder: '#铁臂阿童木',
  },
  {
    icon: 'i-twemoji-flag-for-flag-united-kingdom',
    checked: false,
    locale: 'en',
    value: '',
    placeholder: '#TetsuwanAtom',
  },
])
const targetLangs = computed(() => targetLangIcons.filter((item: any) => item.checked).map(item => item.locale))
const targetLangsLength = computed(() => targetLangs.value.length)
const resultText = computed(() => targetLangIcons.filter(item => item.checked).map(item => item.value).join(state.value === HashtagState.Calculated ? ' ' : ''))

const placeholderText = computed(() => targetLangIcons.filter(item => item.checked).map(item => item.placeholder).join(' '))
function isResultTextEmpty() {
  return resultText.value === ''
}
function getResultText() {
  return targetLangIcons.filter(item => item.checked).map(item => item.value).join(' ')
}
watch(copied, (val) => {
  if (val)
    toast.success(t('copied'))
})
function go() {
  if (name.value) {
    state.value = HashtagState.Inputing
    axios.get(`https://api.bgm.tv/search/subject/${name.value}?type=2&responseGroup=small`, {
      responseType: 'json',
    }).then((res) => {
      const list = res.data.list
      if (!list.length) {
        toast.error(t('not-found'))
        return
      }
      targetLangIcons.forEach((item) => {
        if (item.checked && item.locale === 'ja')
          item.value = `#${purify(res.data.list[0].name)} `

        if (item.checked && item.locale === 'zh-CN')
          item.value = `#${purify(res.data.list[0].name_cn)} `
      })
      state.value = HashtagState.Calculated
      content.value = getResultText()
    }).catch((error) => {
      if (axios.isAxiosError(error))
        handleAxiosError(error)
      else
        handleUnexpectedError(error)
    })
  }
}

function reset() {
  name.value = ''
  content.value = ''
  state.value = HashtagState.Ready
  targetLangIcons.forEach((item) => {
    item.value = ''
  })
}

function purify(str: string) {
  return str.trim().replace(/[\s【】!！「」]/g, '')
}
function handleAxiosError(err?: any) {
  if (err)
    toast.error(err instanceof Error ? err.message : err.toString())
}
function handleUnexpectedError(err?: any) {
  if (err)
    toast.error(err)
}
function handleCopy() {
  copy(resultText.value)
}
</script>

<template>
  <div class="mt-4">
    <p>
      <a rel="noreferrer" href="https://github.com/flynncao/twitter-anime-hashtag" target="_blank">
        <div class="mx-auto my-2 h-20 w-20">
          <img src="/twitterhashtagx.svg" alt="" srcset="">
        </div>
        <p text-lg transition-all class="hover:text-[#0F766E]">
          {{ t('intro.desc') }}
        </p>

      </a>
    </p>

    <div py-4 />
    <p class="text-sm text-red-500">
      {{ `*${t('intro.not-supported')}` }}
    </p>
    <TheInput
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      autocomplete="false"
      size="2xl"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div class="py-2" />
    <div>
      <div>
        <div class="flex items-center justify-center text-lg">
          <div v-for="(item, index) in targetLangIcons" :key="index" class="mr-2 flex items-center">
            <span class="mr-[2px] inline-block" :class="[item.icon]" />
            <input v-model="item.checked" class="h-4 w-4" type="checkbox" :true-value="true" :disabled="item.checked && targetLangsLength <= 1" :false-value="false">
            <span v-if="index !== targetLangIcons.length - 1" bold class="px-2">+</span>
          </div>
        </div>
      </div>
      <button
        mx-2 my-3 text-sm btn
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
      <button

        :disabled="true"
        mx-2 my-3 text-sm btn
      >
        {{ t('button.manually-select') }}
      </button>
      <button
        mx-2 my-3 text-sm btn
        @click="reset"
      >
        {{ t('button.reset') }}
      </button>
    </div>

    <div class="py-2" />

    <TheTextarea
      v-model="content"
      autocomplete="false"
      :placeholder="placeholderText"
      size="2xl"
      :row-count="24"
      :close-t-w-binding="true"
    />
    <div>
      <button
        m-3 text-sm btn
        class="copyBtn"
        :disabled="isResultTextEmpty()"
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
