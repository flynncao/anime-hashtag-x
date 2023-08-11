<script setup lang="ts">
type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
const props = defineProps<{
  size?: Size
}>()
const { modelValue } = defineModels<{
  modelValue: string
}>()
const calculatedWidth = computed(() => {
  const size = props.size || 'md'
  const sizes: Record<Size, string> = {
    'sm': 'w-32',
    'md': 'w-48',
    'lg': 'w-64',
    'xl': 'w-80',
    '2xl': 'w-96',
    '3xl': 'w-112',
    '4xl': 'w-128',
    '5xl': 'w-144',
    '6xl': 'w-160',
    '7xl': 'w-176',
    '8xl': 'w-192',
    '9xl': 'w-208',
  }
  return `${sizes[size]}`
})
</script>

<template>
  <textarea
    id="textarea"
    v-model="modelValue"
    type="text"
    v-bind="$attrs"
    p="x-4 y-2"
    text="center"
    rows="5"
    bg="transparent"
    :class="calculatedWidth"
    border="~ rounded gray-200 dark:gray-700"
    outline="none active:none"
  />
</template>
