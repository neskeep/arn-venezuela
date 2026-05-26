<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Aliado, ApiListResponse } from "~~/shared/types";

const { data: response } = await useFetch<ApiListResponse<Aliado>>("/api/aliados");
const aliados = computed(() => response.value?.data ?? []);

const row1 = computed(() => aliados.value.filter((_, i) => i % 2 === 0));
const row2 = computed(() => aliados.value.filter((_, i) => i % 2 === 1));

const sectionRef = ref<HTMLElement | null>(null);
const track1Ref = ref<HTMLElement | null>(null);
const track2Ref = ref<HTMLElement | null>(null);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  nextTick(() => {
    if (!sectionRef.value || !track1Ref.value || !track2Ref.value) return;

    // Row 1: slides left on scroll
    gsap.to(track1Ref.value, {
      x: -200,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    // Row 2: slides right on scroll (counter-direction)
    gsap.to(track2Ref.value, {
      x: 200,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    });
  });
});
</script>

<template>
  <section v-if="aliados.length" id="aliados" ref="sectionRef" class="overflow-hidden bg-white py-10 md:py-14">

    <!-- Scroll-driven logo tracks -->
    <div class="space-y-8 md:space-y-10">
      <!-- Row 1 — slides left on scroll -->
      <div ref="track1Ref" class="flex items-center gap-10 md:gap-14">
        <a
          v-for="aliado in row1"
          :key="aliado.id"
          :href="aliado.website_url || '#'"
          :target="aliado.website_url ? '_blank' : '_self'"
          :rel="aliado.website_url ? 'noopener' : ''"
          class="group shrink-0"
        >
          <img
            :src="aliado.logo_url"
            :alt="aliado.nombre"
            class="h-10 w-auto object-contain opacity-70 transition-opacity duration-500 group-hover:opacity-100 md:h-14"
          />
        </a>
        <!-- Duplicate for visual continuity -->
        <div v-for="aliado in row1" :key="`dup-${aliado.id}`" class="shrink-0" aria-hidden="true">
          <img
            :src="aliado.logo_url"
            alt=""
            class="h-10 w-auto object-contain opacity-70 md:h-14"
          />
        </div>
      </div>

      <!-- Row 2 — slides right on scroll (counter-direction) -->
      <div ref="track2Ref" class="-ml-32 flex items-center gap-10 md:gap-14">
        <a
          v-for="aliado in row2"
          :key="aliado.id"
          :href="aliado.website_url || '#'"
          :target="aliado.website_url ? '_blank' : '_self'"
          :rel="aliado.website_url ? 'noopener' : ''"
          class="group shrink-0"
        >
          <img
            :src="aliado.logo_url"
            :alt="aliado.nombre"
            class="h-10 w-auto object-contain opacity-70 transition-opacity duration-500 group-hover:opacity-100 md:h-14"
          />
        </a>
        <!-- Duplicate for visual continuity -->
        <div v-for="aliado in row2" :key="`dup-${aliado.id}`" class="shrink-0" aria-hidden="true">
          <img
            :src="aliado.logo_url"
            alt=""
            class="h-10 w-auto object-contain opacity-70 md:h-14"
          />
        </div>
      </div>
    </div>
  </section>
</template>
