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
const relatedEvents = computed(() => relatedResponse.value?.data ?? []);

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

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] ?? null : null;
}

const videoId = computed(() =>
  evento.value.video_url ? getYouTubeId(evento.value.video_url) : null
);

const isUpcoming = computed(() => evento.value.estado === "proximo");
const isActive = computed(() => evento.value.estado === "activo");

// — SEO
useHead({
  title: () => `${evento.value.titulo} — ARN Venezuela`,
  meta: [
    {
      name: "description",
      content: () => evento.value.descripcion || `Evento ${evento.value.titulo} de ARN Venezuela`,
    },
  ],
});

// — Refs
const heroRef = ref<HTMLElement | null>(null);
const statsRef = ref<HTMLElement | null>(null);
const stickyBarRef = ref<HTMLElement | null>(null);
const showStickyBar = ref(false);

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

// — Animations
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  nextTick(() => {
    // Hero parallax
    if (heroRef.value) {
      const img = heroRef.value.querySelector("img");
      if (img) {
        gsap.to(img, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.value,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Hero content reveal
      const heroContent = heroRef.value.querySelectorAll("[data-hero-reveal]");
      gsap.fromTo(
        heroContent,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.2,
        }
      );
    }

    // Sticky bar on scroll past hero
    if (heroRef.value) {
      ScrollTrigger.create({
        trigger: heroRef.value,
        start: "bottom top",
        onEnter: () => (showStickyBar.value = true),
        onLeaveBack: () => (showStickyBar.value = false),
      });
    }

    // Animate sections on scroll
    document.querySelectorAll("[data-scroll-reveal]").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    // Stats counter animation
    if (statsRef.value) {
      const counters = statsRef.value.querySelectorAll("[data-count]");
      counters.forEach((counter) => {
        const target = parseInt(
          (counter as HTMLElement).dataset.count || "0",
          10
        );
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
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
      });
    }

    // Timeline items stagger
    const timelineItems = document.querySelectorAll("[data-timeline-item]");
    if (timelineItems.length) {
      gsap.fromTo(
        timelineItems,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: timelineItems[0],
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    // Gallery items
    const galleryItems = document.querySelectorAll("[data-gallery-item]");
    if (galleryItems.length) {
      gsap.fromTo(
        galleryItems,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: galleryItems[0],
            start: "top 85%",
            once: true,
          },
        }
      );
    }
  });
});

// Keyboard navigation for lightbox
function handleKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div v-if="evento">
    <!-- ═══════════════════════════════════════════
         1. HERO — Fullscreen immersive
         ═══════════════════════════════════════════ -->
    <section
      ref="heroRef"
      class="relative flex min-h-screen items-end overflow-hidden bg-arn-dark"
    >
      <!-- Background image -->
      <img
        v-if="evento.imagen_url"
        :src="evento.imagen_url"
        :alt="evento.titulo"
        class="absolute inset-0 h-[120%] w-full object-cover"
      />
      <!-- Gradient overlays -->
      <div class="absolute inset-0 bg-gradient-to-t from-arn-dark via-arn-dark/60 to-arn-dark/10" />
      <div class="absolute inset-0 bg-gradient-to-r from-arn-dark/40 to-transparent" />

      <!-- Content -->
      <div class="relative w-full px-6 pb-16 md:pb-24 lg:px-8">
        <div class="mx-auto max-w-(--container-site)">
          <!-- Breadcrumb -->
          <nav
            data-hero-reveal
            class="mb-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/30"
          >
            <NuxtLink to="/" class="transition-colors hover:text-white/60">Inicio</NuxtLink>
            <span>/</span>
            <NuxtLink to="/#eventos" class="transition-colors hover:text-white/60">Experiencias</NuxtLink>
            <span>/</span>
            <span class="text-white/50">{{ evento.titulo }}</span>
          </nav>

          <div class="grid gap-8 md:grid-cols-[1fr_auto] md:items-end lg:gap-16">
            <div>
              <!-- Meta row: date + time + status badge -->
              <div data-hero-reveal class="flex flex-wrap items-center gap-3">
                <span class="inline-block border border-white/25 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
                  {{ evento.fecha }}
                </span>
                <span
                  v-if="evento.hora"
                  class="text-[11px] uppercase tracking-[0.15em] text-white/40"
                >
                  {{ evento.hora }}
                </span>
                <span
                  v-if="isUpcoming || isActive"
                  :class="[
                    'inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em]',
                    isActive ? 'bg-arn-blue/20 text-arn-blue' : 'bg-amber-500/20 text-amber-400'
                  ]"
                >
                  {{ isActive ? 'Activo' : 'Próximo' }}
                </span>
              </div>

              <!-- Tagline -->
              <p
                v-if="evento.tagline"
                data-hero-reveal
                class="mt-4 text-[11px] uppercase tracking-[0.2em] text-arn-blue"
              >
                {{ evento.tagline }}
              </p>

              <!-- Title — massive editorial -->
              <h1
                data-hero-reveal
                class="mt-4 font-agency text-[clamp(3rem,9vw,7rem)] uppercase leading-[0.88] tracking-[-0.03em] text-white"
              >
                {{ evento.titulo }}
              </h1>

              <!-- Location -->
              <div
                v-if="evento.ubicacion"
                data-hero-reveal
                class="mt-5 flex items-center gap-2.5 text-sm text-white/35"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ evento.ubicacion }}
              </div>

              <!-- CTA in hero for upcoming events -->
              <a
                v-if="(isUpcoming || isActive) && evento.cta_url"
                :href="evento.cta_url"
                target="_blank"
                rel="noopener"
                data-hero-reveal
                class="mt-8 inline-flex items-center gap-3 bg-arn-blue px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-all hover:bg-arn-blue/85 hover:shadow-lg hover:shadow-arn-blue/25"
              >
                {{ evento.cta_texto || 'Registrarme' }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <!-- Attendees stat — right side -->
            <div
              v-if="evento.asistentes"
              data-hero-reveal
              class="flex flex-col items-start gap-1 md:items-end md:text-right"
            >
              <span class="font-agency text-[clamp(3.5rem,9vw,7rem)] leading-none tracking-[-0.04em] text-white">
                {{ evento.asistentes }}+
              </span>
              <span class="text-[11px] uppercase tracking-[0.25em] text-white/40">
                Asistentes
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div class="flex flex-col items-center gap-2">
          <span class="text-[9px] uppercase tracking-[0.35em] text-white/15">Scroll</span>
          <div class="h-8 w-px bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         2. STICKY INFO BAR
         ═══════════════════════════════════════════ -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-200 ease-in"
      enter-from-class="-translate-y-full"
      leave-to-class="-translate-y-full"
    >
      <div
        v-show="showStickyBar"
        ref="stickyBarRef"
        class="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-arn-dark/95 backdrop-blur-md"
      >
        <div class="mx-auto flex max-w-(--container-site) items-center justify-between px-6 py-3 lg:px-8">
          <div class="flex items-center gap-6">
            <h2 class="font-agency text-lg uppercase tracking-[-0.01em] text-white">
              {{ evento.titulo }}
            </h2>
            <div class="hidden items-center gap-4 text-[11px] uppercase tracking-[0.15em] text-white/35 md:flex">
              <span>{{ evento.fecha }}</span>
              <span v-if="evento.hora" class="text-white/20">{{ evento.hora }}</span>
              <span v-if="evento.ubicacion" class="text-white/20">{{ evento.ubicacion }}</span>
            </div>
          </div>
          <a
            v-if="(isUpcoming || isActive) && evento.cta_url"
            :href="evento.cta_url"
            target="_blank"
            rel="noopener"
            class="bg-arn-blue px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-arn-blue/85"
          >
            {{ evento.cta_texto || 'Registrarme' }}
          </a>
          <NuxtLink
            v-else
            to="/#eventos"
            class="text-[11px] uppercase tracking-[0.15em] text-white/40 transition-colors hover:text-white"
          >
            Todas las experiencias
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <!-- ═══════════════════════════════════════════
         3. SOBRE EL EVENTO — Editorial description
         ═══════════════════════════════════════════ -->
    <section class="bg-white py-20 md:py-28">
      <div class="mx-auto max-w-(--container-site) px-6 lg:px-8">
        <div data-scroll-reveal class="grid gap-16 lg:grid-cols-[1fr_380px] lg:gap-24">
          <!-- Main content -->
          <div>
            <div class="flex items-center gap-4">
              <div class="h-px w-10 bg-arn-blue md:w-16" />
              <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">
                Sobre el evento
              </span>
            </div>

            <!-- Editorial description — generous typography -->
            <p class="mt-8 text-[clamp(1.125rem,2vw,1.375rem)] leading-[1.85] text-arn-gray-700">
              {{ evento.descripcion }}
            </p>

            <!-- Highlights as visual grid -->
            <div v-if="highlights.length" class="mt-14">
              <h3 class="text-[11px] font-semibold uppercase tracking-[0.25em] text-arn-gray-500">
                Momentos clave
              </h3>
              <div class="mt-6 grid gap-4 sm:grid-cols-2">
                <div
                  v-for="(highlight, i) in highlights"
                  :key="i"
                  class="group flex gap-4 border-l-2 border-arn-gray-100 py-3 pl-5 transition-colors hover:border-arn-blue"
                >
                  <span class="font-agency text-2xl leading-none text-arn-blue/30 transition-colors group-hover:text-arn-blue">
                    {{ String(i + 1).padStart(2, '0') }}
                  </span>
                  <span class="text-[15px] leading-[1.65] text-arn-gray-700">
                    {{ highlight }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar — event details -->
          <aside class="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <!-- Details card -->
            <div class="border border-arn-gray-100 p-7">
              <h3 class="text-[11px] font-semibold uppercase tracking-[0.25em] text-arn-gray-500">
                Detalles
              </h3>
              <dl class="mt-6 space-y-5">
                <div>
                  <dt class="text-[10px] uppercase tracking-[0.2em] text-arn-gray-300">Fecha</dt>
                  <dd class="mt-1 text-sm font-medium text-arn-dark">{{ evento.fecha }}</dd>
                </div>
                <div v-if="evento.hora">
                  <dt class="text-[10px] uppercase tracking-[0.2em] text-arn-gray-300">Horario</dt>
                  <dd class="mt-1 text-sm font-medium text-arn-dark">{{ evento.hora }}</dd>
                </div>
                <div v-if="evento.ubicacion">
                  <dt class="text-[10px] uppercase tracking-[0.2em] text-arn-gray-300">Ubicacion</dt>
                  <dd class="mt-1 text-sm font-medium text-arn-dark">{{ evento.ubicacion }}</dd>
                </div>
                <div v-if="evento.asistentes">
                  <dt class="text-[10px] uppercase tracking-[0.2em] text-arn-gray-300">Asistentes</dt>
                  <dd class="mt-1 text-sm font-medium text-arn-dark">{{ evento.asistentes }}+ personas</dd>
                </div>
                <div>
                  <dt class="text-[10px] uppercase tracking-[0.2em] text-arn-gray-300">Estado</dt>
                  <dd class="mt-1">
                    <span
                      :class="[
                        'inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.1em]',
                        evento.estado === 'activo' ? 'bg-arn-blue/10 text-arn-blue' :
                        evento.estado === 'proximo' ? 'bg-amber-50 text-amber-600' :
                        'bg-arn-gray-50 text-arn-gray-500'
                      ]"
                    >
                      {{ evento.estado === 'activo' ? 'Activo' : evento.estado === 'proximo' ? 'Próximo' : 'Finalizado' }}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <!-- CTA card -->
            <div
              v-if="(isUpcoming || isActive) && evento.cta_url"
              class="bg-arn-dark p-7"
            >
              <p class="text-sm leading-relaxed text-white/50">
                No te pierdas esta experiencia. Reserva tu lugar y se parte del movimiento.
              </p>
              <a
                :href="evento.cta_url"
                target="_blank"
                rel="noopener"
                class="mt-5 inline-flex w-full items-center justify-center gap-2 bg-arn-blue px-5 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-arn-blue/85"
              >
                {{ evento.cta_texto || 'Registrarme' }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <!-- Join CTA for past events -->
            <div
              v-if="evento.estado === 'pasado'"
              class="bg-arn-dark p-7"
            >
              <p class="text-sm leading-relaxed text-white/50">
                ¿Quieres ser parte de la proxima edicion?
              </p>
              <NuxtLink
                to="/#membresia"
                class="mt-5 inline-flex w-full items-center justify-center bg-arn-blue px-5 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-arn-blue/85"
              >
                Unete al ARN
              </NuxtLink>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         4. PROGRAMA / AGENDA — Vertical timeline
         ═══════════════════════════════════════════ -->
    <section v-if="programa.length" class="bg-arn-gray-50 py-20 md:py-28">
      <div class="mx-auto max-w-(--container-site) px-6 lg:px-8">
        <div data-scroll-reveal class="flex items-center gap-4">
          <div class="h-px w-10 bg-arn-blue md:w-16" />
          <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">
            Programa
          </span>
        </div>

        <h2 data-scroll-reveal class="mt-6 font-agency text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.92] tracking-[-0.02em] text-arn-dark">
          Agenda del evento
        </h2>

        <!-- Timeline -->
        <div class="mt-12 md:mt-16">
          <div class="relative">
            <!-- Vertical line -->
            <div class="absolute bottom-0 left-[155px] top-0 hidden w-px bg-arn-gray-200 md:block" />

            <div class="space-y-0">
              <div
                v-for="(item, i) in programa"
                :key="i"
                data-timeline-item
                class="group relative grid gap-4 py-6 md:grid-cols-[140px_1fr] md:gap-12"
                :class="i !== programa.length - 1 ? 'border-b border-arn-gray-100' : ''"
              >
                <!-- Time -->
                <div class="flex items-start gap-3 md:justify-end md:text-right">
                  <span class="font-agency text-lg uppercase tracking-[-0.01em] text-arn-blue md:text-base">
                    {{ item.hora }}
                  </span>
                </div>

                <!-- Timeline dot -->
                <div class="absolute left-[151px] top-8 hidden h-2.5 w-2.5 rounded-full border-2 border-arn-gray-200 bg-white transition-colors group-hover:border-arn-blue group-hover:bg-arn-blue md:block" />

                <!-- Content -->
                <div>
                  <h3 class="text-base font-semibold text-arn-dark md:text-lg">
                    {{ item.titulo }}
                  </h3>
                  <p class="mt-1.5 text-sm leading-relaxed text-arn-gray-500">
                    {{ item.descripcion }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         5. GALERIA DE FOTOS — Masonry-style grid
         ═══════════════════════════════════════════ -->
    <section v-if="galeria.length" class="bg-white py-20 md:py-28">
      <div class="mx-auto max-w-(--container-site) px-6 lg:px-8">
        <div data-scroll-reveal class="flex items-center gap-4">
          <div class="h-px w-10 bg-arn-blue md:w-16" />
          <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">
            Galería
          </span>
        </div>

        <h2 data-scroll-reveal class="mt-6 font-agency text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.92] tracking-[-0.02em] text-arn-dark">
          Momentos del evento
        </h2>

        <!-- Photo grid — asymmetric editorial layout -->
        <div class="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <button
            v-for="(img, i) in galeria"
            :key="i"
            data-gallery-item
            class="group relative overflow-hidden bg-arn-gray-50"
            :class="[
              i === 0 ? 'sm:col-span-2 sm:row-span-2' : '',
              i === 0 ? 'aspect-[4/3] sm:aspect-auto' : 'aspect-[4/3]'
            ]"
            @click="openLightbox(i)"
          >
            <img
              :src="img"
              :alt="`${evento.titulo} — foto ${i + 1}`"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-arn-dark/0 transition-colors duration-300 group-hover:bg-arn-dark/20" />
            <div class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- Lightbox overlay -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          @click.self="closeLightbox"
        >
          <!-- Close -->
          <button
            class="absolute right-4 top-4 z-10 p-2 text-white/60 transition-colors hover:text-white"
            @click="closeLightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Prev -->
          <button
            v-if="galeria.length > 1"
            class="absolute left-4 z-10 p-2 text-white/40 transition-colors hover:text-white"
            @click="prevImage"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Image -->
          <img
            :src="galeria[lightboxIndex]"
            :alt="`${evento.titulo} — foto ${lightboxIndex + 1}`"
            class="max-h-[85vh] max-w-[90vw] object-contain"
          />

          <!-- Next -->
          <button
            v-if="galeria.length > 1"
            class="absolute right-4 z-10 p-2 text-white/40 transition-colors hover:text-white"
            @click="nextImage"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Counter -->
          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.2em] text-white/30">
            {{ lightboxIndex + 1 }} / {{ galeria.length }}
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ═══════════════════════════════════════════
         6. VIDEO — YouTube embed
         ═══════════════════════════════════════════ -->
    <section v-if="videoId" class="bg-arn-gray-50 py-20 md:py-28">
      <div class="mx-auto max-w-(--container-site) px-6 lg:px-8">
        <div data-scroll-reveal class="flex items-center gap-4">
          <div class="h-px w-10 bg-arn-blue md:w-16" />
          <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">
            Video
          </span>
        </div>

        <h2 data-scroll-reveal class="mt-6 font-agency text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.92] tracking-[-0.02em] text-arn-dark">
          Revive la experiencia
        </h2>

        <div data-scroll-reveal class="mt-12 overflow-hidden bg-arn-dark">
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
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         7. IMPACTO / STATS — Dark section with counters
         ═══════════════════════════════════════════ -->
    <section
      v-if="evento.asistentes"
      ref="statsRef"
      class="bg-arn-dark py-20 md:py-28"
    >
      <div class="mx-auto max-w-(--container-site) px-6 lg:px-8">
        <div data-scroll-reveal class="flex items-center gap-4">
          <div class="h-px w-10 bg-arn-blue md:w-16" />
          <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-white/50">
            Impacto
          </span>
        </div>

        <h2 data-scroll-reveal class="mt-6 font-agency text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.92] tracking-[-0.02em] text-white">
          Numeros que hablan
        </h2>

        <div data-scroll-reveal class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <!-- Attendees -->
          <div class="border-l-2 border-arn-blue/30 pl-6">
            <span
              :data-count="evento.asistentes"
              class="font-agency text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-[-0.03em] text-white"
            >
              0
            </span>
            <span class="font-agency text-[clamp(2.5rem,6vw,4rem)] leading-none text-arn-blue">+</span>
            <p class="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Asistentes</p>
          </div>

          <!-- Highlights count -->
          <div v-if="highlights.length" class="border-l-2 border-arn-blue/30 pl-6">
            <span
              :data-count="highlights.length"
              class="font-agency text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-[-0.03em] text-white"
            >
              0
            </span>
            <p class="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Momentos clave</p>
          </div>

          <!-- Program items -->
          <div v-if="programa.length" class="border-l-2 border-arn-blue/30 pl-6">
            <span
              :data-count="programa.length"
              class="font-agency text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-[-0.03em] text-white"
            >
              0
            </span>
            <p class="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Actividades</p>
          </div>

          <!-- Gallery -->
          <div v-if="galeria.length" class="border-l-2 border-arn-blue/30 pl-6">
            <span
              :data-count="galeria.length"
              class="font-agency text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-[-0.03em] text-white"
            >
              0
            </span>
            <p class="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Fotos</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         8. CTA DE REGISTRO — For upcoming/active events
         ═══════════════════════════════════════════ -->
    <section
      v-if="(isUpcoming || isActive) && evento.cta_url"
      class="relative overflow-hidden bg-arn-dark py-24 md:py-32"
    >
      <!-- Decorative gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-arn-blue/10 via-transparent to-arn-blue/5" />

      <div class="relative mx-auto max-w-(--container-site) px-6 text-center lg:px-8">
        <p data-scroll-reveal class="text-[11px] uppercase tracking-[0.3em] text-arn-blue">
          Se parte del movimiento
        </p>
        <h2 data-scroll-reveal class="mx-auto mt-5 max-w-3xl font-agency text-[clamp(2.5rem,5vw,4rem)] uppercase leading-[0.92] tracking-[-0.02em] text-white">
          No te pierdas {{ evento.titulo }}
        </h2>
        <p data-scroll-reveal class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/45">
          Una experiencia que transforma perspectivas y conecta personas con un mismo proposito.
        </p>
        <a
          :href="evento.cta_url"
          target="_blank"
          rel="noopener"
          data-scroll-reveal
          class="mt-10 inline-flex items-center gap-3 bg-arn-blue px-10 py-4 text-[14px] font-semibold uppercase tracking-[0.12em] text-white transition-all hover:bg-arn-blue/85 hover:shadow-xl hover:shadow-arn-blue/20"
        >
          {{ evento.cta_texto || 'Reserva tu lugar' }}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         9. OTROS EVENTOS — Related events cards
         ═══════════════════════════════════════════ -->
    <section v-if="relatedEvents.length" class="bg-white py-20 md:py-28">
      <div class="mx-auto max-w-(--container-site) px-6 lg:px-8">
        <div data-scroll-reveal class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-4">
              <div class="h-px w-10 bg-arn-blue md:w-16" />
              <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">
                Más experiencias
              </span>
            </div>
            <h2 class="mt-6 font-agency text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.92] tracking-[-0.02em] text-arn-dark">
              Otros eventos
            </h2>
          </div>
          <NuxtLink
            to="/#eventos"
            class="hidden items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-arn-gray-500 transition-colors hover:text-arn-dark md:flex"
          >
            Ver todos
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

        <div data-scroll-reveal class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="related in relatedEvents.slice(0, 3)"
            :key="related.id"
            :to="`/eventos/${related.id}`"
            class="group relative overflow-hidden bg-arn-dark"
          >
            <div class="aspect-[3/4]">
              <img
                v-if="related.imagen_url"
                :src="related.imagen_url"
                :alt="related.titulo"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-arn-dark via-arn-dark/50 to-transparent" />
            </div>

            <div class="absolute inset-x-0 bottom-0 p-6">
              <div class="flex items-center gap-3">
                <span class="inline-block border border-white/20 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                  {{ related.fecha }}
                </span>
                <span
                  v-if="related.estado !== 'pasado'"
                  :class="[
                    'inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em]',
                    related.estado === 'activo' ? 'bg-arn-blue/20 text-arn-blue' : 'bg-amber-500/20 text-amber-400'
                  ]"
                >
                  {{ related.estado === 'activo' ? 'Activo' : 'Próximo' }}
                </span>
              </div>
              <h3 class="mt-3 font-agency text-[clamp(1.5rem,3vw,2rem)] uppercase leading-[0.92] text-white">
                {{ related.titulo }}
              </h3>
              <p v-if="related.ubicacion" class="mt-2 text-[12px] text-white/30">
                {{ related.ubicacion }}
              </p>
              <span class="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-arn-blue transition-colors group-hover:text-white">
                Ver evento
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </NuxtLink>
        </div>

        <!-- Mobile link -->
        <div class="mt-8 text-center md:hidden">
          <NuxtLink
            to="/#eventos"
            class="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-arn-gray-500"
          >
            Ver todas las experiencias
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         BACK NAVIGATION
         ═══════════════════════════════════════════ -->
    <section class="border-t border-arn-gray-100 bg-white py-10">
      <div class="mx-auto max-w-(--container-site) px-6 lg:px-8">
        <NuxtLink
          to="/#eventos"
          class="group inline-flex items-center gap-3 text-sm text-arn-gray-500 transition-colors hover:text-arn-dark"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver a experiencias
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
