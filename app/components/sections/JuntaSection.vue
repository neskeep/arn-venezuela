<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

const members = [
  { id: 1, nombre: "Miembro 1", cargo: "Presidente", foto_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80" },
  { id: 2, nombre: "Miembro 2", cargo: "Vicepresidente", foto_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80" },
  { id: 3, nombre: "Miembro 3", cargo: "Secretaria", foto_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80" },
  { id: 4, nombre: "Miembro 4", cargo: "Tesorero", foto_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80" },
];

// Quadruple members to fill columns without gaps
const col1Members = [...members, ...members, ...members, ...members];
const col2Members = (() => {
  const reversed = [...members].reverse();
  return [...reversed, ...reversed, ...reversed, ...reversed];
})();

const sectionRef = ref<HTMLElement | null>(null);
const col1Ref = ref<HTMLElement | null>(null);
const col2Ref = ref<HTMLElement | null>(null);

let scrollTween1: gsap.core.Tween | null = null;
let scrollTween2: gsap.core.Tween | null = null;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, Draggable);

  nextTick(() => {
    if (!sectionRef.value || !col1Ref.value || !col2Ref.value) return;

    const containerH = col1Ref.value.parentElement?.parentElement?.clientHeight ?? 0;
    const col1H = col1Ref.value.scrollHeight;
    const col2H = col2Ref.value.scrollHeight;

    // Calculate safe travel: move exactly one "set" of members (1/4 of total)
    // but capped so columns never leave the visible area
    const travel1 = Math.min(col1H * 0.25, col1H - containerH);
    const travel2 = Math.min(col2H * 0.25, col2H - containerH);

    // Column 1: scroll up by fixed pixels
    scrollTween1 = gsap.to(col1Ref.value, {
      y: -travel1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    // Column 2: scroll down by fixed pixels
    scrollTween2 = gsap.fromTo(
      col2Ref.value,
      { y: -travel2 },
      {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      }
    );

    // Make columns draggable
    [col1Ref.value, col2Ref.value].forEach((col) => {
      if (!col) return;
      Draggable.create(col, {
        type: "y",
        cursor: "grab",
        activeCursor: "grabbing",
        edgeResistance: 0.75,
        bounds: {
          minY: -(col.scrollHeight - containerH),
          maxY: 0,
        },
      });
    });
  });
});
</script>

<template>
  <section
    v-if="members.length > 0"
    id="junta-directiva"
    ref="sectionRef"
    class="relative overflow-hidden bg-arn-dark py-20 md:py-28"
  >
    <div class="mx-auto max-w-(--container-site) px-6 lg:px-8">
      <div class="grid items-center gap-12 md:grid-cols-[1.2fr_1fr] lg:gap-16">

        <!-- Left: content -->
        <div class="relative z-10">
          <UiBlurFade>
            <div class="mb-5 flex items-center gap-4">
              <div class="h-px w-10 bg-arn-blue md:w-16" />
              <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-white/50">Junta Directiva</span>
            </div>
          </UiBlurFade>

          <UiBlurFade :delay="0.1" :y-offset="30">
            <h2 class="font-agency text-[clamp(2rem,5vw,4.5rem)] uppercase leading-[0.92] tracking-[-0.02em] text-white">
              Quienes lideran el movimiento
            </h2>
          </UiBlurFade>

          <UiBlurFade :delay="0.2">
            <p class="mt-6 max-w-[45ch] text-[15px] leading-[1.8] text-white/40">
              Un equipo multidisciplinario comprometido con el desarrollo integral
              del pais, conectando liderazgos desde distintas areas de la sociedad.
            </p>
          </UiBlurFade>
        </div>

        <!-- Right: dual vertical marquee columns -->
        <div class="relative h-[480px] overflow-hidden md:h-[560px]">
          <!-- Fade edges -->
          <div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-arn-dark to-transparent" />
          <div class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-arn-dark to-transparent" />

          <div class="flex gap-3">
            <!-- Column 1: moves up on scroll, draggable -->
            <div ref="col1Ref" class="flex w-1/2 cursor-grab flex-col gap-3 active:cursor-grabbing">
              <div
                v-for="(member, i) in col1Members"
                :key="`c1-${i}`"
                class="group relative shrink-0 overflow-hidden"
              >
                <div class="aspect-[3/4]">
                  <img
                    :src="member.foto_url || '/images/placeholder-avatar.svg'"
                    :alt="`${member.nombre}, ${member.cargo}`"
                    class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    draggable="false"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-arn-dark/80 via-transparent to-transparent" />
                </div>
                <div class="absolute inset-x-0 bottom-0 p-3">
                  <div class="h-[2px] w-5 bg-arn-blue" />
                  <p class="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-arn-blue">
                    {{ member.cargo }}
                  </p>
                  <h3 class="mt-0.5 font-agency text-base uppercase leading-[1.05] text-white">
                    {{ member.nombre }}
                  </h3>
                </div>
              </div>
            </div>

            <!-- Column 2: moves down on scroll (starts offset), draggable -->
            <div ref="col2Ref" class="flex w-1/2 cursor-grab flex-col gap-3 active:cursor-grabbing">
              <div
                v-for="(member, i) in col2Members"
                :key="`c2-${i}`"
                class="group relative shrink-0 overflow-hidden"
              >
                <div class="aspect-[3/4]">
                  <img
                    :src="member.foto_url || '/images/placeholder-avatar.svg'"
                    :alt="`${member.nombre}, ${member.cargo}`"
                    class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    draggable="false"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-arn-dark/80 via-transparent to-transparent" />
                </div>
                <div class="absolute inset-x-0 bottom-0 p-3">
                  <div class="h-[2px] w-5 bg-arn-blue" />
                  <p class="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-arn-blue">
                    {{ member.cargo }}
                  </p>
                  <h3 class="mt-0.5 font-agency text-base uppercase leading-[1.05] text-white">
                    {{ member.nombre }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
