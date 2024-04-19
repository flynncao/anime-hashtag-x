<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { useToast } from 'vue-toastification'
import { searchMALAnimeListAsync } from '~/api/MyAnilist'
import { searchBangumiSubjectAsyncPost } from '~/api/index'

defineOptions({
  name: 'IndexPage',
})
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
const cachedBangumiList = ref([])
const cachedMALList = ref([])
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
const extremeSimplified = (str: string) => str.replace(/[\s【】!！・「」]/g, '')

const nameMatching = (str: string, str2?: string) => (extremeSimplified(str).includes(extremeSimplified(str2 || name.value)))

function go() {
  if (name.value) {
    const bangumiPromise = () => new Promise((resolve, reject) => {
      searchBangumiSubjectAsyncPost({ limit: 100, offset: 0 }, {
        keyword: name.value,
        sort: 'rank',
        filter: {
          type: [2],
        },
      }).then((res: any) => {
        if (res.data.data.length === 0) {
          toast.error(t('toast.no-result'))
          return
        }

        const list = res.data.data.filter((item: any) => item.rank !== 0 && (nameMatching(item.name) || nameMatching(item.name_cn))).sort((a: any, b: any) => a.rank - b.rank, res.data)
        cachedBangumiList.value = list
        if (!list.length) {
          toast.info(t('toast.no-valid-result'))
          return
        }
        let jpName = ''
        targetLangIcons.forEach((item) => {
          if (item.checked && item.locale === 'ja') {
            jpName = `${purify(list[0].name)} `
            item.value = `#${jpName} `
          }

          if (item.checked && item.locale === 'zh-CN')
            item.value = `#${purify(list[0].name_cn)} `
        })
        resolve(jpName)
      }).catch((error: Error) => {
        console.log(error)
        reject(error)
      })
    })

    const MALPromise = (JPName: string) => new Promise((resolve, reject) => {
      if (!JPName) {
        reject(new Error('prev step failed'))
        return
      }
      searchMALAnimeListAsync({
        q: JPName,
      }).then((res) => {
        const list = res.data.data
        cachedMALList.value = list
        targetLangIcons.forEach((item) => {
          if (item.checked && item.locale === 'en')
            item.value = `#${purify(list[0].node.title)} `
        })
        resolve(true)
      }).catch((error: Error) => {
        console.log(error)
        reject(error)
      })
    })

    function runSequentially(promises: any[]) {
      return promises.reduce((accum, p) => accum.then((res: any) => {
        return p(res)
      }), Promise.resolve())
    }

    runSequentially([bangumiPromise, MALPromise]).then(() => {
      state.value = HashtagState.Calculated
      content.value = getResultText()
    }).catch((err: Error) => {
      console.log(err)
    })
  }
}

function reset() {
  name.value = ''
  content.value = ''
  state.value = HashtagState.Ready
  cachedBangumiList.value = []
  cachedMALList.value = []
  targetLangIcons.forEach((item) => {
    item.value = ''
  })
}

function purify(str: string) {
  return str.trim().replace(/[\s【】!！「」]/g, '')
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
    <p class="hidden text-sm text-red-500">
      {{ `*${t('intro.not-supported')}` }}
    </p>
    <div class="flex items-center justify-center">
      <span>{{ t('label.input') }}</span>
      <div class="i-twemoji-flag-for-flag-china text-lg" />
      <span mx-2>/</span>
      <div class="i-twemoji-flag-for-flag-japan text-lg" />
    </div>
    <div py-2 />
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
        <div class="flex items-center justify-center">
          <span>{{ t('label.output') }}</span>
          <div v-for="(item, index) in targetLangIcons" :key="index" class="mr-2 flex items-center text-lg">
            <span class="mr-[2px] inline-block" :class="[item.icon]" />
            <input v-model="item.checked" class="h-4 w-4" type="checkbox" :true-value="true" :disabled="(item.checked && targetLangsLength <= 1) || item.locale === 'ja'" :false-value="false">
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
