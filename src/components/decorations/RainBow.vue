<!-- 彩虹带效果 -->
<script setup lang="ts">
const props = defineProps({
  isStatic: Boolean,
})
const rainbowStreamer = ref()
onMounted(() => {
  const c = rainbowStreamer.value
  const x = c.getContext('2d')
  const pr = window.devicePixelRatio || 1
  const w = window.innerWidth
  const h = window.innerHeight
  const f = 90
  let q
  const m = Math
  let r = 0
  const u = m.PI * 2
  const v = m.cos
  const z = m.random
  c.width = w * pr
  c.height = h * pr
  x.scale(pr, pr)
  x.globalAlpha = 0.6

  function evanyou() {
    x.clearRect(0, 0, w, h)
    q = [
      {
        x: 0,
        y: h * 0.7 + f,
      },
      {
        x: 0,
        y: h * 0.7 - f,
      },
    ]
    while (q[1].x < w + f) d(q[0], q[1])
  }

  function d(i, j) {
    x.beginPath()
    x.moveTo(i.x, i.y)
    x.lineTo(j.x, j.y)
    const k = j.x + (z() * 2 - 0.25) * f
    const n = y(j.y)
    x.lineTo(k, n)
    x.closePath()
    r -= u / -50
    x.fillStyle
      = `#${
       (
        ((v(r) * 127 + 128) << 16)
        | ((v(r + u / 3) * 127 + 128) << 8)
        | (v(r + (u / 3) * 2) * 127 + 128)
      ).toString(16)}`
    x.fill()
    q[0] = q[1]
    q[1] = {
      x: k,
      y: n,
    }
  }

  function y(p) {
    const t = p + (z() * 2 - 1.1) * f
    return t > h || t < 0 ? y(p) : t
  }
  if (!props.isStatic)
    document.onclick = evanyou

  document.ontouchstart = evanyou
  evanyou()
})
</script>

<template>
  <canvas id="rainbow-streamer" ref="rainbowStreamer" />
</template>

<style lang="scss" scoped>
#rainbow-streamer {
  position: absolute;
  max-width: 100%;
  max-height: calc(100% - 100px);
  left: 0;
  top: 100px;
  z-index: -10;
}
</style>
