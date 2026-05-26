<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const eventos = [
  {
    id: 1,
    titulo: "ARN Edición I",
    descripcion: "Primera edición del encuentro. Un espacio de conexión espiritual y activación de propósito para líderes de distintas áreas.",
    fecha: "2024",
    imagen_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80",
    estado: "pasado",
    tagline: "Conexión · Propósito · Activación",
    asistentes: 120,
    ubicacion: null,
    highlights: '["Líderes de 8 ciudades reunidos","Talleres de activación de propósito","Primera red de vectores de cambio"]',
  },
  {
    id: 2,
    titulo: "ARN Edición II",
    descripcion: "Segunda edición con mayor alcance. Comunidades de múltiples ciudades conectadas por una misma visión de transformación.",
    fecha: "2025",
    imagen_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80",
    estado: "pasado",
    tagline: "Expansión · Comunidad · Visión",
    asistentes: 350,
    ubicacion: null,
    highlights: '["15 ciudades conectadas en simultáneo","Paneles con referentes nacionales","Lanzamiento del programa de mentorías"]',
  },
  {
    id: 3,
    titulo: "ARN Edición III",
    descripcion: "La edición más ambiciosa. Expandiendo el mensaje a nuevas regiones y consolidando la red de vectores de esperanza.",
    fecha: "2026",
    imagen_url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=80",
    estado: "activo",
    tagline: "Consolidación · Regiones · Esperanza",
    asistentes: 600,
    ubicacion: null,
    highlights: '["Alcance en 4 nuevas regiones","Alianzas estratégicas con fundaciones","Formación de 50 vectores comunitarios"]',
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const currentSlide = ref(1);
const isMobile = ref(false);

function parseHighlights(raw: string | null): string[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

onMounted(() => {
  isMobile.value = window.innerWidth < 768;

  if (isMobile.value) return;

  gsap.registerPlugin(ScrollTrigger);

  nextTick(() => {
    if (!sectionRef.value || !trackRef.value || !eventos.value.length) return;

    const totalSlides = eventos.value.length;
    const xPercent = -((totalSlides - 1) / totalSlides) * 100;

    gsap.to(trackRef.value, {
      xPercent,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        pin: true,
        scrub: 0.8,
        snap: {
          snapTo: 1 / (totalSlides - 1),
          duration: { min: 0.2, max: 0.4 },
          ease: "power1.inOut",
        },
        end: () => `+=${window.innerHeight * totalSlides}`,
        onUpdate: (self) => {
          const progress = self.progress;
          currentSlide.value = Math.min(
            totalSlides,
            Math.floor(progress * totalSlides) + 1
          );
        },
      },
    });
  });
});
</script>

<template>
  <section
    v-if="eventos.length"
    id="eventos"
    ref="sectionRef"
    :class="[
      'relative bg-arn-dark',
      isMobile ? '' : 'h-screen overflow-hidden'
    ]"
  >
    <!-- Fixed header overlay -->
    <div
      :class="[
        'px-6 lg:px-8',
        isMobile
          ? 'pb-10 pt-20'
          : 'pointer-events-none absolute inset-x-0 top-0 z-10 pt-24 md:pt-28'
      ]"
    >
      <div class="mx-auto max-w-(--container-site)">
        <div class="flex items-center gap-4">
          <div class="h-px w-10 bg-arn-blue md:w-16" />
          <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-white">Experiencias</span>
        </div>
      </div>
    </div>

    <!-- Slide counter (desktop) -->
    <div
      v-if="!isMobile"
      class="pointer-events-none absolute bottom-8 right-8 z-10 flex items-baseline gap-1 font-agency text-white"
    >
      <span class="text-[clamp(2rem,5vw,3.5rem)] leading-none">
        {{ String(currentSlide).padStart(2, '0') }}
      </span>
      <span class="text-base text-white/10">/</span>
      <span class="text-base text-white/10">
        {{ String(eventos.length).padStart(2, '0') }}
      </span>
    </div>

    <!-- Horizontal track (desktop) -->
    <div
      v-if="!isMobile"
      ref="trackRef"
      class="flex h-full"
      :style="{ width: `${eventos.length * 100}vw` }"
    >
      <div
        v-for="(evento, index) in eventos"
        :key="evento.id"
        class="relative h-full w-screen shrink-0"
      >
        <!-- Background image -->
        <img
          :src="evento.imagen_url || ''"
          :alt="evento.titulo"
          class="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-arn-dark/95 via-arn-dark/75 to-arn-dark/30" />

        <!-- Content — two-column layout -->
        <div class="relative flex h-full items-center px-6 lg:px-8">
          <div class="mx-auto w-full max-w-(--container-site)">
            <div class="grid gap-12 md:grid-cols-[1fr_auto] md:items-center lg:gap-20">

              <!-- Left: main info -->
              <div>
                <!-- Edition number — editorial, clearly visible -->
                <!-- <div class="flex items-baseline gap-4">
                  <span class="font-agency text-[clamp(5rem,12vw,10rem)] leading-none tracking-[-0.04em] text-white/15">
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                  <div class="mb-2 h-px flex-1 max-w-24 bg-white/10" />
                </div> -->

                <div class="-mt-4 md:-mt-6">
                  <!-- Date + tagline row -->
                  <div class="flex flex-wrap items-center gap-3">
                    <span class="inline-block border border-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
                      {{ evento.fecha }}
                    </span>
                    <span v-if="evento.tagline" class="text-[11px] uppercase tracking-[0.15em] text-arn-blue">
                      {{ evento.tagline }}
                    </span>
                  </div>

                  <!-- Title -->
                  <h3 class="mt-5 font-agency text-[clamp(2rem,5vw,4rem)] uppercase leading-[0.92] tracking-[-0.02em] text-white">
                    {{ evento.titulo }}
                  </h3>

                  <!-- Description -->
                  <p class="mt-5 max-w-[52ch] text-[15px] leading-[1.8] text-white md:text-base">
                    {{ evento.descripcion }}
                  </p>

                  <!-- Highlights -->
                  <ul v-if="evento.highlights" class="mt-6 space-y-2.5">
                    <li
                      v-for="(highlight, i) in parseHighlights(evento.highlights)"
                      :key="i"
                      class="flex items-start gap-3 text-sm text-white"
                    >
                      <span class="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-arn-blue/60" />
                      {{ highlight }}
                    </li>
                  </ul>

                  <!-- Location -->
                  <div v-if="evento.ubicacion" class="mt-5 flex items-center gap-2 text-xs text-white/30">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ evento.ubicacion }}
                  </div>

                  <!-- Link to detail page -->
                  <NuxtLink
                    :to="`/eventos/${evento.id}`"
                    class="pointer-events-auto mt-7 inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.15em] text-white transition-all hover:border-arn-blue hover:bg-arn-blue/10"
                  >
                    Ver evento
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </NuxtLink>
                </div>
              </div>

              <!-- Right: stats column -->
              <div v-if="evento.asistentes" class="flex flex-col items-end gap-1 text-right">
                <span class="font-agency text-[clamp(3rem,7vw,5.5rem)] leading-none tracking-[-0.03em] text-white">
                  {{ evento.asistentes }}+
                </span>
                <span class="text-[11px] uppercase tracking-[0.2em] text-white">
                  Asistentes
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile: vertical stack -->
    <div v-if="isMobile" class="space-y-6 px-4 pb-16">
      <div
        v-for="(evento, index) in eventos"
        :key="evento.id"
        class="relative overflow-hidden rounded-sm"
      >
        <div class="aspect-[3/4] w-full">
          <img
            :src="evento.imagen_url || ''"
            :alt="evento.titulo"
            class="h-full w-full object-cover"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-arn-dark via-arn-dark/70 to-transparent" />
        </div>

        <div class="absolute inset-x-0 bottom-0 p-5">
          <!-- Number -->
          <span class="font-agency text-5xl leading-none text-white/12">
            {{ String(index + 1).padStart(2, '0') }}
          </span>

          <div class="-mt-2">
            <div class="flex flex-wrap items-center gap-2">
              <span class="inline-block border border-white/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
                {{ evento.fecha }}
              </span>
              <span v-if="evento.tagline" class="text-[10px] uppercase tracking-[0.1em] text-arn-blue/60">
                {{ evento.tagline }}
              </span>
            </div>

            <h3 class="mt-2 font-agency text-2xl uppercase leading-[0.95] text-white">
              {{ evento.titulo }}
            </h3>

            <p class="mt-2 text-[13px] leading-relaxed text-white/45">
              {{ evento.descripcion }}
            </p>

            <!-- Mobile highlights -->
            <ul v-if="evento.highlights" class="mt-3 space-y-1.5">
              <li
                v-for="(highlight, i) in parseHighlights(evento.highlights)"
                :key="i"
                class="flex items-start gap-2 text-[12px] text-white/35"
              >
                <span class="mt-1.5 block h-0.5 w-0.5 shrink-0 rounded-full bg-arn-blue/50" />
                {{ highlight }}
              </li>
            </ul>

            <!-- Attendees badge -->
            <div v-if="evento.asistentes" class="mt-3 flex items-baseline gap-1.5">
              <span class="font-agency text-xl leading-none text-white/70">{{ evento.asistentes }}+</span>
              <span class="text-[10px] uppercase tracking-[0.15em] text-white/25">asistentes</span>
            </div>

            <!-- Link -->
            <NuxtLink
              :to="`/eventos/${evento.id}`"
              class="mt-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] text-arn-blue transition-colors hover:text-white"
            >
              Ver evento
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll hint (desktop only) -->
    <div
      v-if="!isMobile"
      class="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-500"
      :class="currentSlide > 1 ? 'opacity-0' : 'opacity-100'"
    >
      <div class="flex flex-col items-center gap-2">
        <span class="text-[10px] uppercase tracking-[0.3em] text-white/20">Scroll</span>
        <div class="h-6 w-px bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </div>
  </section>
</template>
