<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Props {
  delay?: number
  duration?: number
  yOffset?: number
  blur?: string
  inView?: boolean
}

const { delay = 0, duration = 0.6, yOffset = 20, blur = '6px', inView = true } = defineProps<Props>()

const elRef = ref<HTMLElement>()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  if (!elRef.value) return

  gsap.set(elRef.value, { opacity: 0, y: yOffset, filter: `blur(${blur})` })

  if (inView) {
    gsap.to(elRef.value, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration, delay, ease: 'power2.out',
      scrollTrigger: { trigger: elRef.value, start: 'top 90%', once: true },
    })
  } else {
    gsap.to(elRef.value, { opacity: 1, y: 0, filter: 'blur(0px)', duration, delay, ease: 'power2.out' })
  }
})
</script>

<template>
  <div ref="elRef">
    <slot />
  </div>
</template>
