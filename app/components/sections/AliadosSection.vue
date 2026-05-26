<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const aliados = [
  { id: 1, nombre: "Fundación Avanzar", logo_url: "/images/aliados/logo-1.svg", website_url: null },
  { id: 2, nombre: "Centro Bienestar", logo_url: "/images/aliados/logo-2.svg", website_url: null },
  { id: 3, nombre: "Nexus Group", logo_url: "/images/aliados/logo-3.svg", website_url: null },
  { id: 4, nombre: "Impulsa Venezuela", logo_url: "/images/aliados/logo-4.svg", website_url: null },
  { id: 5, nombre: "Vértice Consulting", logo_url: "/images/aliados/logo-5.svg", website_url: null },
  { id: 6, nombre: "Altum Partners", logo_url: "/images/aliados/logo-6.svg", website_url: null },
  { id: 7, nombre: "Red Vital Foundation", logo_url: "/images/aliados/logo-7.svg", website_url: null },
  { id: 8, nombre: "Tercer Sector", logo_url: "/images/aliados/logo-8.svg", website_url: null },
];

const row1 = aliados.filter((_, i) => i % 2 === 0);
const row2 = aliados.filter((_, i) => i % 2 === 1);

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
