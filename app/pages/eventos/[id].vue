<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Evento, ProgramaItem, ApiResponse } from "~~/shared/types";

const route = useRoute();

const { data: response, error } = await useFetch<ApiResponse<Evento>>(
  `/api/eventos/${route.params.id}`
);

if (error.value) {
  throw createError({ statusCode: 404, message: "Evento no encontrado" });
}

const evento = computed(() => response.value!.data);

const { data: relatedResponse } = await useFetch<{ data: Evento[] }>(
  `/api/eventos/${route.params.id}/related`
);
const allEvents = computed(() => {
  const related = relatedResponse.value?.data ?? [];
  // Build the full timeline including current event
  const all = [...related, evento.value].sort((a, b) => a.orden - b.orden);
  return all;
});

// — Parsers
function parseJSON<T>(raw: string | null): T[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

const highlights = computed(() => parseJSON<string>(evento.value.highlights));
const galeria = computed(() => parseJSON<string>(evento.value.galeria));
const programa = computed(() => parseJSON<ProgramaItem>(evento.value.programa));

// Only show top 4 program items as editorial highlights, not the full schedule
const programaHighlights = computed(() => programa.value.slice(0, 4));

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] ?? null : null;
}

const videoId = computed(() =>
  evento.value.video_url ? getYouTubeId(evento.value.video_url) : null
);

const isPast = computed(() => evento.value.estado === "pasado");
const isLive = computed(() => evento.value.estado === "activo" || evento.value.estado === "proximo");

// — SEO
useHead({
  title: () => `${evento.value.titulo} — ARN Venezuela`,
  meta: [
    {
      name: "description",
      content: () => evento.value.descripcion || `${evento.value.titulo} — ARN Venezuela`,
    },
  ],
});

// — Refs
const hookRef = ref<HTMLElement | null>(null);
const impactRef = ref<HTMLElement | null>(null);

// — Lightbox
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);

function openLightbox(index: number) {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightboxOpen.value = false;
  document.body.style.overflow = "";
}

function nextImage() {
  lightboxIndex.value = (lightboxIndex.value + 1) % galeria.value.length;
}

function prevImage() {
  lightboxIndex.value =
    (lightboxIndex.value - 1 + galeria.value.length) % galeria.value.length;
}

function handleKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
}

// — Animations
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  window.addEventListener("keydown", handleKeydown);

  nextTick(() => {
    // ZONE 1: Hook — dramatic delayed reveal
    if (hookRef.value) {
      const img = hookRef.value.querySelector("[data-hook-img]");
      if (img) {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: hookRef.value,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Staggered text reveal — slower, more dramatic than before
      const reveals = hookRef.value.querySelectorAll("[data-hook-reveal]");
      gsap.fromTo(
        reveals,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.4,
        }
      );
    }

    // ZONE 2: Experience pillars — stagger from left
    const pillars = document.querySelectorAll("[data-pillar]");
    if (pillars.length) {
      gsap.fromTo(
        pillars,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: pillars[0],
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    // ZONE 3: Proof — mosaic images scale in
    const mosaicItems = document.querySelectorAll("[data-mosaic]");
    if (mosaicItems.length) {
      gsap.fromTo(
        mosaicItems,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: mosaicItems[0],
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    // ZONE 4: Impact — counter for the ONE key stat
    if (impactRef.value) {
      const counter = impactRef.value.querySelector("[data-impact-count]");
      if (counter) {
        const target = parseInt(
          (counter as HTMLElement).dataset.impactCount || "0",
          10
        );
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: "power2.out",
          snap: { val: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            (counter as HTMLElement).textContent = obj.val.toLocaleString();
          },
        });
      }
    }

    // ZONE 6: Timeline ribbon — horizontal reveal
    const timelineNodes = document.querySelectorAll("[data-timeline-node]");
    if (timelineNodes.length) {
      gsap.fromTo(
        timelineNodes,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: timelineNodes[0],
            start: "top 90%",
            once: true,
          },
        }
      );
    }

    // Generic zone reveals — each zone gets ONE reveal, not per-element
    document.querySelectorAll("[data-zone-reveal]").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        }
      );
    });
  });
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div v-if="evento">

    <!-- ═══════════════════════════════════════════════════
         ZONE 1: THE HOOK — fullscreen, immersive, minimal
         Two personalities: upcoming = manifesto / past = memory
         ═══════════════════════════════════════════════════ -->
    <section
      ref="hookRef"
      class="relative flex min-h-screen items-center overflow-hidden bg-arn-dark"
    >
      <!-- Background image with parallax -->
      <img
        v-if="evento.imagen_url"
        data-hook-img
        :src="evento.imagen_url"
        :alt="evento.titulo"
        class="absolute inset-0 h-[120%] w-full object-cover"
        :class="isPast ? 'opacity-50' : 'opacity-30'"
      />
      <!-- Gradient: heavier for upcoming (text readability), lighter for past (show the memory) -->
      <div
        :class="[
          'absolute inset-0',
          isPast
            ? 'bg-gradient-to-t from-arn-dark via-arn-dark/40 to-arn-dark/60'
            : 'bg-gradient-to-b from-arn-dark/80 via-arn-dark/70 to-arn-dark/90'
        ]"
      />

      <div class="relative w-full px-6 lg:px-8">
        <div class="mx-auto max-w-5xl">

          <!-- UPCOMING/ACTIVE: The tagline IS the hero — philosophical, bold -->
          <template v-if="isLive">
            <p
              data-hook-reveal
              class="text-[11px] uppercase tracking-[0.35em] text-arn-blue"
            >
              {{ evento.fecha }} <span v-if="evento.ubicacion" class="text-white/25">&mdash; {{ evento.ubicacion }}</span>
            </p>

            <!-- Tagline as massive spatial element -->
            <h1
              v-if="evento.tagline"
              data-hook-reveal
              class="mt-6 font-agency text-[clamp(2.5rem,8vw,6.5rem)] uppercase leading-[0.88] tracking-[-0.03em] text-white"
            >
              {{ evento.tagline.replace(/·/g, '\n') }}
            </h1>
            <h1
              v-else
              data-hook-reveal
              class="mt-6 font-agency text-[clamp(2.5rem,8vw,6.5rem)] uppercase leading-[0.88] tracking-[-0.03em] text-white"
            >
              {{ evento.titulo }}
            </h1>

            <!-- Subtitle — the event name (secondary to the idea) -->
            <p
              data-hook-reveal
              class="mt-8 text-[13px] font-light tracking-[0.05em] text-white/40"
            >
              {{ evento.titulo }}
              <span v-if="evento.hora" class="ml-3 text-white/20">{{ evento.hora }}</span>
            </p>

            <!-- Single CTA -->
            <a
              v-if="evento.cta_url"
              data-hook-reveal
              :href="evento.cta_url"
              target="_blank"
              rel="noopener"
              class="mt-10 inline-flex items-center gap-3 bg-arn-blue px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-arn-blue/85 hover:shadow-lg hover:shadow-arn-blue/25"
            >
              {{ evento.cta_texto || 'Reserva tu lugar' }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </template>

          <!-- PAST: The memory IS the hero — title large, reflective -->
          <template v-else>
            <p
              data-hook-reveal
              class="text-[11px] uppercase tracking-[0.35em] text-white/30"
            >
              {{ evento.fecha }} <span v-if="evento.ubicacion">&mdash; {{ evento.ubicacion }}</span>
            </p>

            <h1
              data-hook-reveal
              class="mt-6 font-agency text-[clamp(3rem,10vw,8rem)] uppercase leading-[0.85] tracking-[-0.04em] text-white"
            >
              {{ evento.titulo }}
            </h1>

            <p
              v-if="evento.tagline"
              data-hook-reveal
              class="mt-6 text-[13px] uppercase tracking-[0.2em] text-arn-blue/70"
            >
              {{ evento.tagline }}
            </p>
          </template>

        </div>
      </div>

      <!-- Scroll indicator — minimal -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div class="h-10 w-px bg-gradient-to-b from-white/15 to-transparent" />
      </div>
    </section>


    <!-- ═══════════════════════════════════════════════════
         ZONE 2: THE EXPERIENCE — what makes this event unique
         Pillars, not paragraphs. Interweaved with imagery.
         ═══════════════════════════════════════════════════ -->
    <section class="bg-white py-24 md:py-32">
      <div class="mx-auto max-w-5xl px-6 lg:px-8">

        <!-- Editorial lead-in — the description as a pull quote, not a paragraph -->
        <div data-zone-reveal class="mx-auto max-w-3xl text-center">
          <p class="text-[clamp(1.15rem,2.2vw,1.5rem)] leading-[1.8] text-arn-gray-700">
            {{ evento.descripcion }}
          </p>
        </div>

        <!-- Experience pillars — highlight items become the story structure -->
        <div v-if="highlights.length" class="mt-20 md:mt-28">
          <div class="grid gap-px bg-arn-gray-100 md:grid-cols-3">
            <div
              v-for="(highlight, i) in highlights"
              :key="i"
              data-pillar
              class="group relative bg-white p-8 md:p-10"
            >
              <!-- Big number as spatial element -->
              <span class="font-agency text-[4rem] leading-none tracking-[-0.04em] text-arn-gray-50 transition-colors duration-500 group-hover:text-arn-blue/10 md:text-[5rem]">
                {{ String(i + 1).padStart(2, '0') }}
              </span>

              <p class="-mt-4 text-[15px] leading-[1.7] text-arn-gray-700 md:-mt-6">
                {{ highlight }}
              </p>

              <!-- Accent line on hover -->
              <div class="absolute bottom-0 left-0 h-0.5 w-0 bg-arn-blue transition-all duration-500 group-hover:w-full" />
            </div>
          </div>
        </div>

        <!-- Interwoven image — ONE editorial image breaks the text flow -->
        <div
          v-if="galeria.length"
          data-zone-reveal
          class="-mx-6 mt-20 md:-mx-0 md:mt-28"
        >
          <button
            class="group relative block w-full overflow-hidden"
            @click="openLightbox(0)"
          >
            <img
              :src="galeria[0]"
              :alt="evento.titulo"
              class="aspect-[21/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div class="absolute inset-0 bg-arn-dark/0 transition-colors duration-500 group-hover:bg-arn-dark/10" />
          </button>
        </div>
      </div>
    </section>


    <!-- ═══════════════════════════════════════════════════
         ZONE 3: THE PROOF — schedule highlights + media mosaic
         Content type depends on event state
         ═══════════════════════════════════════════════════ -->

    <!-- 3A: Schedule highlights for upcoming/active (editorial cards, not timeline) -->
    <section
      v-if="isLive && programaHighlights.length"
      class="bg-arn-gray-50 py-24 md:py-32"
    >
      <div class="mx-auto max-w-5xl px-6 lg:px-8">
        <div data-zone-reveal>
          <p class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">
            Lo que te espera
          </p>
          <h2 class="mt-4 font-agency text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.92] tracking-[-0.02em] text-arn-dark">
            Programa
          </h2>
        </div>

        <!-- Horizontal scrolling cards on mobile, grid on desktop -->
        <div class="mt-12 flex gap-4 overflow-x-auto pb-4 md:mt-16 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-4">
          <div
            v-for="(item, i) in programaHighlights"
            :key="i"
            data-pillar
            class="group min-w-[260px] flex-shrink-0 border-t-2 border-arn-gray-200 bg-white p-6 transition-colors hover:border-arn-blue md:min-w-0"
          >
            <span class="font-agency text-sm uppercase tracking-[0.05em] text-arn-blue">
              {{ item.hora }}
            </span>
            <h3 class="mt-3 text-base font-semibold leading-tight text-arn-dark">
              {{ item.titulo }}
            </h3>
            <p class="mt-2 text-[13px] leading-relaxed text-arn-gray-500">
              {{ item.descripcion }}
            </p>
          </div>
        </div>

        <!-- "Full program" hint if more items exist -->
        <p
          v-if="programa.length > 4"
          class="mt-8 text-center text-[12px] text-arn-gray-500"
        >
          Y {{ programa.length - 4 }} actividades mas durante el dia
        </p>
      </div>
    </section>

    <!-- 3B: Documentary mosaic for past events (gallery + video merged) -->
    <section
      v-if="isPast && (galeria.length > 1 || videoId)"
      class="bg-arn-gray-50 py-24 md:py-32"
    >
      <div class="mx-auto max-w-6xl px-6 lg:px-8">
        <div data-zone-reveal>
          <p class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">
            Momentos
          </p>
          <h2 class="mt-4 font-agency text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.92] tracking-[-0.02em] text-arn-dark">
            Lo que vivimos
          </h2>
        </div>

        <!-- Mosaic: video + photos interwoven -->
        <div class="mt-12 grid gap-3 md:mt-16 md:grid-cols-12 md:grid-rows-2">
          <!-- Video takes hero position if it exists -->
          <div
            v-if="videoId"
            data-mosaic
            class="overflow-hidden bg-arn-dark md:col-span-7 md:row-span-2"
          >
            <div class="relative aspect-video w-full">
              <iframe
                :src="`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`"
                title="Video del evento"
                class="absolute inset-0 h-full w-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy"
              />
            </div>
          </div>

          <!-- Photos fill the remaining space -->
          <button
            v-for="(img, i) in galeria.slice(1, videoId ? 5 : 7)"
            :key="i"
            data-mosaic
            class="group relative overflow-hidden bg-arn-gray-100"
            :class="[
              videoId ? 'md:col-span-5' : (i === 0 ? 'md:col-span-8 md:row-span-2' : 'md:col-span-4'),
              !videoId && i === 0 ? 'aspect-[4/3] md:aspect-auto' : 'aspect-[4/3]'
            ]"
            @click="openLightbox(i + 1)"
          >
            <img
              :src="img"
              :alt="`${evento.titulo} — foto ${i + 2}`"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-arn-dark/0 transition-colors duration-300 group-hover:bg-arn-dark/15" />
          </button>
        </div>

        <!-- View all photos (if many) -->
        <button
          v-if="galeria.length > 5"
          class="mx-auto mt-6 flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-arn-gray-500 transition-colors hover:text-arn-dark"
          @click="openLightbox(0)"
        >
          Ver las {{ galeria.length }} fotos
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </section>

    <!-- Also show schedule for past events, but as compact reference -->
    <section
      v-if="isPast && programa.length"
      class="border-t border-arn-gray-100 bg-white py-20 md:py-24"
    >
      <div class="mx-auto max-w-5xl px-6 lg:px-8">
        <div data-zone-reveal>
          <p class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">
            Programa
          </p>
          <h2 class="mt-4 font-agency text-[clamp(1.75rem,3vw,2.5rem)] uppercase leading-[0.92] tracking-[-0.02em] text-arn-dark">
            Agenda del evento
          </h2>
        </div>

        <div class="mt-10 grid gap-px bg-arn-gray-100 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(item, i) in programa"
            :key="i"
            class="bg-white p-5"
          >
            <span class="font-agency text-sm text-arn-blue">{{ item.hora }}</span>
            <h3 class="mt-1 text-sm font-semibold text-arn-dark">{{ item.titulo }}</h3>
            <p class="mt-1 text-[12px] leading-relaxed text-arn-gray-500">{{ item.descripcion }}</p>
          </div>
        </div>
      </div>
    </section>


    <!-- ═══════════════════════════════════════════════════
         ZONE 4: THE IMPACT — one powerful number with narrative
         Small, breathing room. Not a full section.
         ═══════════════════════════════════════════════════ -->
    <section
      v-if="evento.asistentes"
      ref="impactRef"
      class="relative overflow-hidden bg-arn-dark"
    >
      <!-- Faded event image as texture -->
      <img
        v-if="evento.imagen_url"
        :src="evento.imagen_url"
        :alt="evento.titulo"
        class="absolute inset-0 h-full w-full object-cover opacity-[0.07]"
      />

      <div class="relative px-6 py-24 md:py-32 lg:px-8">
        <div class="mx-auto max-w-4xl text-center">
          <div data-zone-reveal>
            <!-- ONE number. ONE sentence. That's it. -->
            <span
              :data-impact-count="evento.asistentes"
              class="font-agency text-[clamp(5rem,15vw,12rem)] leading-none tracking-[-0.05em] text-white"
            >
              0
            </span>

            <p class="mx-auto mt-4 max-w-lg text-[clamp(1rem,1.8vw,1.25rem)] leading-[1.7] text-white/50">
              <template v-if="isPast">
                personas se reunieron para activar su proposito y construir una red de transformacion
              </template>
              <template v-else>
                personas ya confirmaron su lugar. Faltas tu.
              </template>
            </p>
          </div>
        </div>
      </div>
    </section>


    <!-- ═══════════════════════════════════════════════════
         ZONE 5: THE INVITATION — contextual, singular CTA
         Different for upcoming vs past
         ═══════════════════════════════════════════════════ -->
    <section class="bg-white py-24 md:py-32">
      <div class="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <div data-zone-reveal>
          <!-- UPCOMING: Registration -->
          <template v-if="isLive && evento.cta_url">
            <h2 class="font-agency text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.92] tracking-[-0.02em] text-arn-dark">
              Se parte de {{ evento.titulo }}
            </h2>
            <p class="mx-auto mt-5 max-w-md text-base leading-relaxed text-arn-gray-500">
              {{ evento.fecha }}<span v-if="evento.ubicacion"> &mdash; {{ evento.ubicacion }}</span>
            </p>
            <a
              :href="evento.cta_url"
              target="_blank"
              rel="noopener"
              class="mt-10 inline-flex items-center gap-3 bg-arn-dark px-10 py-4 text-[13px] font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-arn-blue"
            >
              {{ evento.cta_texto || 'Reserva tu lugar' }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </template>

          <!-- PAST: Join the movement -->
          <template v-else>
            <p class="text-[11px] uppercase tracking-[0.3em] text-arn-blue">
              La historia continua
            </p>
            <h2 class="mt-5 font-agency text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.92] tracking-[-0.02em] text-arn-dark">
              Quieres ser parte de lo que viene?
            </h2>
            <NuxtLink
              to="/#membresia"
              class="mt-10 inline-flex items-center gap-3 bg-arn-dark px-10 py-4 text-[13px] font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-arn-blue"
            >
              Unete al movimiento
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NuxtLink>
          </template>
        </div>
      </div>
    </section>


    <!-- ═══════════════════════════════════════════════════
         ZONE 6: THE CONTINUITY — event timeline ribbon
         Positions this event in the larger movement story
         ═══════════════════════════════════════════════════ -->
    <section
      v-if="allEvents.length > 1"
      class="border-t border-arn-gray-100 bg-arn-gray-50 py-16 md:py-20"
    >
      <div class="mx-auto max-w-5xl px-6 lg:px-8">
        <p class="text-center text-[11px] uppercase tracking-[0.3em] text-arn-gray-500">
          El movimiento
        </p>

        <!-- Horizontal timeline ribbon -->
        <div class="relative mt-10">
          <!-- Connecting line -->
          <div class="absolute left-0 right-0 top-[19px] hidden h-px bg-arn-gray-200 md:block" />

          <div class="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <NuxtLink
              v-for="ev in allEvents"
              :key="ev.id"
              :to="`/eventos/${ev.id}`"
              data-timeline-node
              class="group relative flex flex-col items-center gap-3 text-center"
              :class="ev.id === evento.id ? 'pointer-events-none' : ''"
            >
              <!-- Node dot -->
              <div
                :class="[
                  'relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                  ev.id === evento.id
                    ? 'border-arn-blue bg-arn-blue'
                    : 'border-arn-gray-200 bg-white group-hover:border-arn-blue'
                ]"
              >
                <span
                  :class="[
                    'font-agency text-xs',
                    ev.id === evento.id ? 'text-white' : 'text-arn-gray-500 group-hover:text-arn-blue'
                  ]"
                >
                  {{ ev.orden }}
                </span>
              </div>

              <!-- Label -->
              <div>
                <p
                  :class="[
                    'text-[11px] uppercase tracking-[0.15em]',
                    ev.id === evento.id ? 'font-semibold text-arn-dark' : 'text-arn-gray-500 group-hover:text-arn-dark'
                  ]"
                >
                  {{ ev.titulo }}
                </p>
                <p class="mt-0.5 text-[10px] text-arn-gray-300">
                  {{ ev.fecha }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>


    <!-- ═══════════════════════════════════════════════════
         LIGHTBOX — shared for all gallery images
         ═══════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightboxOpen && galeria.length"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          @click.self="closeLightbox"
        >
          <button
            class="absolute right-4 top-4 z-10 p-2 text-white/60 transition-colors hover:text-white"
            @click="closeLightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            v-if="galeria.length > 1"
            class="absolute left-4 z-10 p-2 text-white/40 transition-colors hover:text-white"
            @click="prevImage"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <img
            :src="galeria[lightboxIndex]"
            :alt="`${evento.titulo} — foto ${lightboxIndex + 1}`"
            class="max-h-[85vh] max-w-[90vw] object-contain"
          />

          <button
            v-if="galeria.length > 1"
            class="absolute right-4 z-10 p-2 text-white/40 transition-colors hover:text-white"
            @click="nextImage"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.2em] text-white/30">
            {{ lightboxIndex + 1 }} / {{ galeria.length }}
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>
