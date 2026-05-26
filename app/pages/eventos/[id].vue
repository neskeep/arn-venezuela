<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProgramaItem, SpeakerItem } from "~~/shared/types";

const route = useRoute();

const eventosData = [
  {
    id: 1,
    titulo: "ARN Edición I",
    descripcion: "Primera edición del encuentro. Un espacio de conexión espiritual y activación de propósito para líderes de distintas áreas.",
    fecha: "2024",
    imagen_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80",
    estado: "pasado",
    orden: 1,
    tagline: "Conexión · Propósito · Activación",
    asistentes: 120,
    ubicacion: null,
    hora: "9:00 AM — 5:00 PM",
    highlights: '["Líderes de 8 ciudades reunidos","Talleres de activación de propósito","Primera red de vectores de cambio"]',
    galeria: '["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80","https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80","https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80","https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80","https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80","https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=80"]',
    programa: '[{"hora":"9:00 AM","titulo":"Registro y bienvenida","descripcion":"Acreditación de participantes y café de networking"},{"hora":"10:00 AM","titulo":"Plenaria de apertura","descripcion":"Mensaje central: El ARN como código de activación del propósito"},{"hora":"12:00 PM","titulo":"Talleres simultáneos","descripcion":"Sesiones prácticas en liderazgo, emprendimiento y servicio comunitario"},{"hora":"2:00 PM","titulo":"Panel de líderes","descripcion":"Conversación con referentes que están transformando sus comunidades"},{"hora":"4:00 PM","titulo":"Activación y cierre","descripcion":"Compromiso colectivo y lanzamiento de la red de vectores"}]',
    video_url: null,
    cta_url: null,
    cta_texto: null,
    speakers: null,
  },
  {
    id: 2,
    titulo: "ARN Edición II",
    descripcion: "Segunda edición con mayor alcance. Comunidades de múltiples ciudades conectadas por una misma visión de transformación.",
    fecha: "2025",
    imagen_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80",
    estado: "pasado",
    orden: 2,
    tagline: "Expansión · Comunidad · Visión",
    asistentes: 350,
    ubicacion: null,
    hora: "8:00 AM — 6:00 PM",
    highlights: '["15 ciudades conectadas en simultáneo","Paneles con referentes nacionales","Lanzamiento del programa de mentorías"]',
    galeria: '["https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80","https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80","https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80","https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=80","https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80","https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80"]',
    programa: '[{"hora":"8:00 AM","titulo":"Apertura y adoración","descripcion":"Momento de conexión espiritual colectiva"},{"hora":"9:30 AM","titulo":"Keynote: Expansión del propósito","descripcion":"Cómo pasar de la visión individual al impacto colectivo"},{"hora":"11:00 AM","titulo":"Mesas de trabajo regionales","descripcion":"Cada ciudad diseña su plan de acción local"},{"hora":"1:00 PM","titulo":"Networking y almuerzo","descripcion":"Espacio de conexión entre líderes de distintas ciudades"},{"hora":"3:00 PM","titulo":"Paneles temáticos","descripcion":"Educación, salud, emprendimiento y arte como vectores de cambio"},{"hora":"5:00 PM","titulo":"Ceremonia de compromiso","descripcion":"Lanzamiento del programa de mentorías y cierre"}]',
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cta_url: null,
    cta_texto: null,
    speakers: null,
  },
  {
    id: 3,
    titulo: "ARN Edición III",
    descripcion: "La edición más ambiciosa. Expandiendo el mensaje a nuevas regiones y consolidando la red de vectores de esperanza.",
    fecha: "2026",
    imagen_url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=80",
    estado: "activo",
    orden: 3,
    tagline: "Consolidación · Regiones · Esperanza",
    asistentes: 600,
    ubicacion: null,
    hora: "8:00 AM — 8:00 PM",
    highlights: '["Alcance en 4 nuevas regiones","Alianzas estratégicas con fundaciones","Formación de 50 vectores comunitarios"]',
    galeria: '["https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80","https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80","https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80","https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80","https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80","https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=80"]',
    programa: '[{"hora":"8:00 AM","titulo":"Registro y acreditación","descripcion":"Bienvenida a delegaciones de todas las regiones"},{"hora":"9:00 AM","titulo":"Plenaria inaugural","descripcion":"El ARN como movimiento nacional: retrospectiva y visión"},{"hora":"10:30 AM","titulo":"Talleres de formación","descripcion":"Tracks especializados: liderazgo, educación, salud, tecnología, arte y negocios"},{"hora":"1:00 PM","titulo":"Feria de proyectos","descripcion":"Exposición de iniciativas comunitarias de cada región"},{"hora":"3:00 PM","titulo":"Conversatorio con aliados","descripcion":"Fundaciones y organizaciones presentan oportunidades de colaboración"},{"hora":"5:00 PM","titulo":"Sesión de adoración","descripcion":"Momento central de conexión espiritual y renovación de propósito"},{"hora":"7:00 PM","titulo":"Gala de cierre","descripcion":"Reconocimiento a vectores destacados y lanzamiento de la visión 2027"}]',
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cta_url: "https://forms.gle/example",
    cta_texto: "Reserva tu lugar",
    speakers: null,
  },
];

const id = Number(route.params.id);
const eventoData = eventosData.find((e) => e.id === id);
if (!eventoData) {
  throw createError({ statusCode: 404, message: "Evento no encontrado" });
}
const evento = computed(() => eventoData);
const allEvents = computed(() => eventosData.sort((a, b) => a.orden - b.orden));

// Parsers
function parseJSON<T>(raw: string | null): T[] {
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

const highlights = computed(() => parseJSON<string>(evento.value.highlights));
const galeria = computed(() => parseJSON<string>(evento.value.galeria));
const programa = computed(() => parseJSON<ProgramaItem>(evento.value.programa));
const speakers = computed(() => parseJSON<SpeakerItem>(evento.value.speakers));

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] ?? null : null;
}
const videoId = computed(() => evento.value.video_url ? getYouTubeId(evento.value.video_url) : null);

const isPast = computed(() => evento.value.estado === "pasado");
const isLive = computed(() => evento.value.estado === "activo" || evento.value.estado === "proximo");

useHead({
  title: () => `${evento.value.titulo} — ARN Venezuela`,
  meta: [{ name: "description", content: () => evento.value.descripcion || `${evento.value.titulo} — ARN Venezuela` }],
});

// Refs
const hookRef = ref<HTMLElement | null>(null);
const impactRef = ref<HTMLElement | null>(null);

// Lightbox
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
function openLightbox(i: number) { lightboxIndex.value = i; lightboxOpen.value = true; document.body.style.overflow = "hidden"; }
function closeLightbox() { lightboxOpen.value = false; document.body.style.overflow = ""; }
function nextImage() { lightboxIndex.value = (lightboxIndex.value + 1) % galeria.value.length; }
function prevImage() { lightboxIndex.value = (lightboxIndex.value - 1 + galeria.value.length) % galeria.value.length; }

function handleKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
}

// Animations
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  window.addEventListener("keydown", handleKeydown);

  nextTick(() => {
    if (hookRef.value) {
      const img = hookRef.value.querySelector("[data-hook-img]");
      if (img) {
        gsap.to(img, { yPercent: 15, ease: "none", scrollTrigger: { trigger: hookRef.value, start: "top top", end: "bottom top", scrub: true } });
      }
      const reveals = hookRef.value.querySelectorAll("[data-hook-reveal]");
      gsap.fromTo(reveals, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15, delay: 0.4 });
    }

    // Impact counter
    if (impactRef.value) {
      const counter = impactRef.value.querySelector("[data-impact-count]");
      if (counter) {
        const target = parseInt((counter as HTMLElement).dataset.impactCount || "0", 10);
        const obj = { val: 0 };
        gsap.to(obj, { val: target, duration: 2.5, ease: "power2.out", snap: { val: 1 }, scrollTrigger: { trigger: counter, start: "top 85%", once: true }, onUpdate: () => { (counter as HTMLElement).textContent = obj.val.toLocaleString(); } });
      }
    }

    // Zone reveals
    document.querySelectorAll("[data-zone-reveal]").forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
    });

    // Stagger groups
    document.querySelectorAll("[data-stagger-group]").forEach((group) => {
      const items = group.querySelectorAll("[data-stagger-item]");
      if (items.length) {
        gsap.fromTo(items, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1, scrollTrigger: { trigger: group, start: "top 80%", once: true } });
      }
    });
  });
});

onUnmounted(() => { window.removeEventListener("keydown", handleKeydown); });
</script>

<template>
  <div v-if="evento">

    <!-- ══════════════════════════════════════════
         ZONE 1: THE HOOK — immersive hero
         ══════════════════════════════════════════ -->
    <section
      ref="hookRef"
      class="relative flex min-h-screen items-end overflow-hidden bg-arn-dark"
    >
      <img
        v-if="evento.imagen_url"
        data-hook-img
        :src="evento.imagen_url"
        :alt="evento.titulo"
        class="absolute inset-0 h-[120%] w-full object-cover"
        :class="isPast ? 'opacity-40' : 'opacity-25'"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-arn-dark via-arn-dark/50 to-arn-dark/30" />

      <div class="relative w-full px-6 pb-20 md:pb-28 lg:px-8">
        <div class="mx-auto max-w-(--container-site)">
          <div class="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <!-- Date + location — prominent, first thing people scan for -->
              <div data-hook-reveal class="flex flex-wrap items-center gap-3">
                <span class="inline-block bg-arn-blue px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                  {{ evento.fecha }}
                </span>
                <span v-if="evento.hora" class="text-[12px] tracking-[0.05em] text-white/45">
                  {{ evento.hora }}
                </span>
                <span v-if="evento.ubicacion" class="flex items-center gap-1.5 text-[12px] text-white/35">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {{ evento.ubicacion }}
                </span>
              </div>

              <!-- Title -->
              <h1
                data-hook-reveal
                class="mt-5 font-agency text-[clamp(3rem,9vw,7rem)] uppercase leading-[0.88] tracking-[-0.03em] text-white"
              >
                {{ evento.titulo }}
              </h1>

              <!-- Tagline -->
              <p
                v-if="evento.tagline"
                data-hook-reveal
                class="mt-4 text-[13px] uppercase tracking-[0.2em] text-arn-blue"
              >
                {{ evento.tagline }}
              </p>

              <!-- CTA — only for live events, only here -->
              <a
                v-if="isLive && evento.cta_url"
                data-hook-reveal
                :href="evento.cta_url"
                target="_blank"
                rel="noopener"
                class="mt-8 inline-flex items-center gap-3 bg-arn-blue px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-arn-blue/85 hover:shadow-lg hover:shadow-arn-blue/25"
              >
                {{ evento.cta_texto || 'Inscribirme' }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>

            <!-- Stat -->
            <div v-if="evento.asistentes" data-hook-reveal class="flex flex-col items-start gap-1 md:items-end md:text-right">
              <span class="font-agency text-[clamp(3rem,8vw,6rem)] leading-none tracking-[-0.04em] text-white">{{ evento.asistentes }}+</span>
              <span class="text-[11px] uppercase tracking-[0.25em] text-white/35">{{ isPast ? 'Asistieron' : 'Confirmados' }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div class="h-10 w-px bg-gradient-to-b from-white/15 to-transparent" />
      </div>
    </section>


    <!-- ══════════════════════════════════════════
         ZONE 2: EVENT INFO BAR — date, time, location, status
         Quick-scan bar right after hero
         ══════════════════════════════════════════ -->
    <section class="border-b border-arn-gray-100 bg-white">
      <div class="mx-auto max-w-(--container-site) px-6 lg:px-8">
        <div class="flex flex-wrap items-center gap-x-10 gap-y-3 py-5 text-[13px]">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-arn-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span class="font-medium text-arn-dark">{{ evento.fecha }}</span>
          </div>
          <div v-if="evento.hora" class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-arn-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span class="text-arn-gray-700">{{ evento.hora }}</span>
          </div>
          <div v-if="evento.ubicacion" class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-arn-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span class="text-arn-gray-700">{{ evento.ubicacion }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span
              :class="[
                'inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em]',
                evento.estado === 'activo' ? 'bg-arn-blue/10 text-arn-blue' :
                evento.estado === 'proximo' ? 'bg-arn-blue/10 text-arn-blue' :
                'bg-arn-gray-50 text-arn-gray-500'
              ]"
            >
              {{ evento.estado === 'activo' ? 'Activo' : evento.estado === 'proximo' ? 'Próximo' : 'Finalizado' }}
            </span>
          </div>
          <!-- Quick register link on the bar -->
          <a
            v-if="isLive && evento.cta_url"
            :href="evento.cta_url"
            target="_blank"
            rel="noopener"
            class="ml-auto hidden text-[12px] font-semibold uppercase tracking-[0.1em] text-arn-blue transition-colors hover:text-arn-dark md:block"
          >
            {{ evento.cta_texto || 'Inscribirme' }} &rarr;
          </a>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════
         ZONE 3: THE STORY — description + highlights
         ══════════════════════════════════════════ -->
    <section class="bg-white py-20 md:py-28">
      <div class="mx-auto max-w-4xl px-6 lg:px-8">
        <div data-zone-reveal class="text-center">
          <p class="text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.85] text-arn-gray-700">
            {{ evento.descripcion }}
          </p>
        </div>

        <!-- Highlights as pillars -->
        <div v-if="highlights.length" data-stagger-group class="mt-16 grid gap-px bg-arn-gray-100 md:grid-cols-3">
          <div
            v-for="(highlight, i) in highlights"
            :key="i"
            data-stagger-item
            class="group relative bg-white p-8"
          >
            <span class="font-agency text-[4rem] leading-none text-arn-gray-50 transition-colors group-hover:text-arn-blue/10">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <p class="-mt-4 text-[15px] leading-[1.65] text-arn-gray-700">{{ highlight }}</p>
            <div class="absolute bottom-0 left-0 h-0.5 w-0 bg-arn-blue transition-all duration-500 group-hover:w-full" />
          </div>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════
         ZONE 4: SPEAKERS — who you'll hear from
         ══════════════════════════════════════════ -->
    <section v-if="speakers.length" class="bg-arn-gray-50 py-20 md:py-28">
      <div class="mx-auto max-w-(--container-site) px-6 lg:px-8">
        <div data-zone-reveal>
          <p class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">
            {{ isPast ? 'Quienes participaron' : 'Speakers' }}
          </p>
          <h2 class="mt-3 font-agency text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.92] tracking-[-0.02em] text-arn-dark">
            {{ isPast ? 'Voces del evento' : 'Quienes nos acompañan' }}
          </h2>
        </div>

        <div data-stagger-group class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="speaker in speakers"
            :key="speaker.nombre"
            data-stagger-item
            class="group flex gap-5"
          >
            <img
              :src="speaker.foto_url"
              :alt="speaker.nombre"
              class="h-20 w-20 shrink-0 rounded-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
            />
            <div>
              <h3 class="text-base font-semibold text-arn-dark">{{ speaker.nombre }}</h3>
              <p class="mt-0.5 text-[12px] uppercase tracking-[0.1em] text-arn-blue">{{ speaker.cargo }}</p>
              <p class="mt-2 text-[13px] leading-relaxed text-arn-gray-500">{{ speaker.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════
         ZONE 5: AGENDA — full program
         ══════════════════════════════════════════ -->
    <section v-if="programa.length" class="bg-white py-20 md:py-28">
      <div class="mx-auto max-w-5xl px-6 lg:px-8">
        <div data-zone-reveal>
          <p class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">Programa</p>
          <h2 class="mt-3 font-agency text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.92] tracking-[-0.02em] text-arn-dark">
            Agenda completa
          </h2>
        </div>

        <div data-stagger-group class="mt-12">
          <div
            v-for="(item, i) in programa"
            :key="i"
            data-stagger-item
            class="group grid gap-3 border-b border-arn-gray-100 py-6 md:grid-cols-[120px_1fr] md:gap-8"
          >
            <span class="font-agency text-base text-arn-blue md:text-right">{{ item.hora }}</span>
            <div>
              <h3 class="text-base font-semibold text-arn-dark transition-colors group-hover:text-arn-blue">{{ item.titulo }}</h3>
              <p class="mt-1 text-[13px] leading-relaxed text-arn-gray-500">{{ item.descripcion }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════
         ZONE 6: MOMENTS — gallery + video mosaic
         ══════════════════════════════════════════ -->
    <section v-if="galeria.length || videoId" class="bg-arn-gray-50 py-20 md:py-28">
      <div class="mx-auto max-w-6xl px-6 lg:px-8">
        <div data-zone-reveal>
          <p class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">{{ isPast ? 'Momentos' : 'Galeria' }}</p>
          <h2 class="mt-3 font-agency text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.92] tracking-[-0.02em] text-arn-dark">
            {{ isPast ? 'Lo que vivimos' : 'Imagenes del evento' }}
          </h2>
        </div>

        <div data-stagger-group class="mt-12 grid gap-3 md:grid-cols-12 md:grid-rows-2">
          <!-- Video takes hero position -->
          <div
            v-if="videoId"
            data-stagger-item
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

          <!-- Photos -->
          <button
            v-for="(img, i) in galeria.slice(0, videoId ? 4 : 6)"
            :key="i"
            data-stagger-item
            class="group relative overflow-hidden bg-arn-gray-100"
            :class="[
              !videoId && i === 0 ? 'md:col-span-8 md:row-span-2 aspect-[4/3] md:aspect-auto' : '',
              videoId ? 'md:col-span-5 aspect-[4/3]' : (i > 0 ? 'md:col-span-4 aspect-[4/3]' : '')
            ]"
            @click="openLightbox(i)"
          >
            <img
              :src="img"
              :alt="`${evento.titulo} — foto ${i + 1}`"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-arn-dark/0 transition-colors duration-300 group-hover:bg-arn-dark/15" />
          </button>
        </div>

        <button
          v-if="galeria.length > 5"
          class="mx-auto mt-6 flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-arn-gray-500 transition-colors hover:text-arn-dark"
          @click="openLightbox(0)"
        >
          Ver las {{ galeria.length }} fotos
        </button>
      </div>
    </section>


    <!-- ══════════════════════════════════════════
         ZONE 7: IMPACT — one powerful number
         ══════════════════════════════════════════ -->
    <section v-if="evento.asistentes" ref="impactRef" class="relative overflow-hidden bg-arn-dark">
      <img v-if="evento.imagen_url" :src="evento.imagen_url" :alt="evento.titulo" class="absolute inset-0 h-full w-full object-cover opacity-[0.07]" />
      <div class="relative px-6 py-20 md:py-28 lg:px-8">
        <div class="mx-auto max-w-4xl text-center" data-zone-reveal>
          <span :data-impact-count="evento.asistentes" class="font-agency text-[clamp(5rem,15vw,11rem)] leading-none tracking-[-0.05em] text-white">0</span>
          <p class="mx-auto mt-4 max-w-lg text-[clamp(1rem,1.8vw,1.2rem)] leading-[1.7] text-white/45">
            <template v-if="isPast">personas se reunieron para activar su proposito y construir una red de transformacion</template>
            <template v-else>personas ya confirmaron su lugar. Faltas tu.</template>
          </p>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════
         ZONE 8: INVITATION — contextual CTA
         ══════════════════════════════════════════ -->
    <section class="bg-white py-20 md:py-28">
      <div class="mx-auto max-w-3xl px-6 text-center lg:px-8" data-zone-reveal>
        <template v-if="isLive && evento.cta_url">
          <h2 class="font-agency text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.92] tracking-[-0.02em] text-arn-dark">
            Se parte de {{ evento.titulo }}
          </h2>
          <p class="mx-auto mt-5 max-w-md text-base leading-relaxed text-arn-gray-500">
            {{ evento.fecha }}<span v-if="evento.ubicacion"> &mdash; {{ evento.ubicacion }}</span>
            <span v-if="evento.hora" class="block mt-1 text-arn-gray-300">{{ evento.hora }}</span>
          </p>
          <a
            :href="evento.cta_url"
            target="_blank"
            rel="noopener"
            class="mt-10 inline-flex items-center gap-3 bg-arn-dark px-10 py-4 text-[13px] font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-arn-blue"
          >
            {{ evento.cta_texto || 'Inscribirme ahora' }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </template>
        <template v-else>
          <p class="text-[11px] uppercase tracking-[0.3em] text-arn-blue">La historia continua</p>
          <h2 class="mt-5 font-agency text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.92] tracking-[-0.02em] text-arn-dark">
            Quieres ser parte de lo que viene?
          </h2>
          <NuxtLink
            to="/#membresia"
            class="mt-10 inline-flex items-center gap-3 bg-arn-dark px-10 py-4 text-[13px] font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-arn-blue"
          >
            Unete al movimiento
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </NuxtLink>
        </template>
      </div>
    </section>


    <!-- ══════════════════════════════════════════
         ZONE 9: TIMELINE RIBBON — movement continuity
         ══════════════════════════════════════════ -->
    <section v-if="allEvents.length > 1" class="border-t border-arn-gray-100 bg-arn-gray-50 py-14 md:py-18">
      <div class="mx-auto max-w-5xl px-6 lg:px-8">
        <p class="text-center text-[11px] uppercase tracking-[0.3em] text-arn-gray-500">El movimiento</p>
        <div class="relative mt-8">
          <div class="absolute left-0 right-0 top-[19px] hidden h-px bg-arn-gray-200 md:block" />
          <div class="flex flex-col items-center gap-6 md:flex-row md:justify-between" data-stagger-group>
            <NuxtLink
              v-for="ev in allEvents"
              :key="ev.id"
              :to="`/eventos/${ev.id}`"
              data-stagger-item
              class="group relative flex flex-col items-center gap-2 text-center"
              :class="ev.id === evento.id ? 'pointer-events-none' : ''"
            >
              <div :class="['relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all', ev.id === evento.id ? 'border-arn-blue bg-arn-blue' : 'border-arn-gray-200 bg-white group-hover:border-arn-blue']">
                <span :class="['font-agency text-xs', ev.id === evento.id ? 'text-white' : 'text-arn-gray-500 group-hover:text-arn-blue']">{{ ev.orden }}</span>
              </div>
              <div>
                <p :class="['text-[11px] uppercase tracking-[0.1em]', ev.id === evento.id ? 'font-semibold text-arn-dark' : 'text-arn-gray-500 group-hover:text-arn-dark']">{{ ev.titulo }}</p>
                <p class="text-[10px] text-arn-gray-300">{{ ev.fecha }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════
         LIGHTBOX
         ══════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition enter-active-class="transition-opacity duration-300" leave-active-class="transition-opacity duration-200" enter-from-class="opacity-0" leave-to-class="opacity-0">
        <div v-if="lightboxOpen && galeria.length" class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4" @click.self="closeLightbox">
          <button class="absolute right-4 top-4 z-10 p-2 text-white/60 transition-colors hover:text-white" @click="closeLightbox">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button v-if="galeria.length > 1" class="absolute left-4 z-10 p-2 text-white/40 hover:text-white" @click="prevImage">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <img :src="galeria[lightboxIndex]" :alt="`${evento.titulo} — foto ${lightboxIndex + 1}`" class="max-h-[85vh] max-w-[90vw] object-contain" />
          <button v-if="galeria.length > 1" class="absolute right-4 z-10 p-2 text-white/40 hover:text-white" @click="nextImage">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.2em] text-white/30">{{ lightboxIndex + 1 }} / {{ galeria.length }}</div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>
