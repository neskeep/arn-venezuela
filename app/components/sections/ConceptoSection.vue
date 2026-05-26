<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const pilares = [
  {
    num: "01",
    titulo: "ADN",
    subtitulo: "El Diseño Original",
    descripcion:
      "Representa la Palabra y el potencial perfecto y eterno que reside en lo invisible. El diseño original de Dios para cada vida.",
    imagen: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=1920&q=80",
  },
  {
    num: "02",
    titulo: "ARN Mensajero",
    subtitulo: "El Ejecutor de la Visión",
    descripcion:
      "Es la visión activada, el vehículo que transporta las instrucciones del diseño hacia la ejecución tangible en tu vida.",
    imagen: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80",
  },
  {
    num: "03",
    titulo: "Ribosomas",
    subtitulo: "El Oído Espiritual",
    descripcion:
      "Simbolizan la capacidad de procesar e interpretar correctamente la instrucción recibida. El discernimiento que activa el propósito.",
    imagen: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80",
  },
  {
    num: "04",
    titulo: "Proteína",
    subtitulo: "El Fruto Tangible",
    descripcion:
      "Es la obra, la acción y el resultado. La fe hecha realidad en la salud, las finanzas, el carácter y la transformación social.",
    imagen: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80",
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const activeIndex = ref(0);
const isMobile = ref(false);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  isMobile.value = window.innerWidth < 768;

  if (isMobile.value) return;

  nextTick(() => {
    if (!sectionRef.value) return;

    const totalSteps = pilares.length;
    const pilarEls = sectionRef.value.querySelectorAll<HTMLElement>(".pilar-step");
    const bgEls = sectionRef.value.querySelectorAll<HTMLElement>(".pilar-bg");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        pin: true,
        scrub: 0.6,
        start: "top top",
        end: () => `+=${window.innerHeight * (totalSteps + 0.5)}`,
        onUpdate: (self) => {
          const idx = Math.min(
            totalSteps - 1,
            Math.floor(self.progress * totalSteps)
          );
          activeIndex.value = idx;
        },
      },
    });

    pilarEls.forEach((el, i) => {
      const content = el.querySelector(".pilar-content");
      const num = el.querySelector(".pilar-num");
      const title = el.querySelector(".pilar-title");
      const sub = el.querySelector(".pilar-sub");
      const desc = el.querySelector(".pilar-desc");
      const line = el.querySelector(".pilar-line");
      const bg = bgEls[i];

      if (i === 0) {
        tl.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
        tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
        tl.fromTo(num, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3 }, 0);
        tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.25 }, 0.05);
        tl.fromTo(title, { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3 }, 0.08);
        tl.fromTo(sub, { yPercent: 20, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.25 }, 0.12);
        tl.fromTo(desc, { yPercent: 20, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.25 }, 0.15);
        tl.to(el, { opacity: 1, duration: 0.5 });
        if (i < totalSteps - 1) {
          tl.to(content, { yPercent: -20, opacity: 0, duration: 0.3 });
          tl.to(bg, { opacity: 0, duration: 0.3 }, "<");
          tl.set(el, { opacity: 0 });
        }
      } else {
        tl.fromTo(bg, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.4 });
        tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.05 }, "<");
        tl.fromTo(content, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3 }, "<0.1");
        tl.fromTo(num, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.25 }, "<0.05");
        tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.2 }, "<0.05");
        tl.fromTo(title, { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.25 }, "<0.05");
        tl.fromTo(sub, { yPercent: 20, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.2 }, "<0.05");
        tl.fromTo(desc, { yPercent: 20, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.2 }, "<0.05");
        tl.to(el, { opacity: 1, duration: 0.5 });
        if (i < totalSteps - 1) {
          tl.to(content, { yPercent: -20, opacity: 0, duration: 0.3 });
          tl.to(bg, { opacity: 0, duration: 0.3 }, "<");
          tl.set(el, { opacity: 0 });
        }
      }
    });
  });
});
</script>

<template>
  <section
    id="concepto-section"
    ref="sectionRef"
    :class="[
      'relative bg-arn-dark',
      isMobile ? '' : 'h-screen overflow-hidden'
    ]"
  >
    <!-- Background images layer (desktop) -->
    <div v-if="!isMobile" class="absolute inset-0">
      <div
        v-for="(pilar, i) in pilares"
        :key="`bg-${pilar.num}`"
        class="pilar-bg absolute inset-0 opacity-0"
      >
        <img
          :src="pilar.imagen"
          :alt="pilar.titulo"
          class="h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-arn-dark/85" />
      </div>
    </div>

    <!-- Fixed header label (desktop) -->
    <div
      v-if="!isMobile"
      class="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-24 md:pt-28 lg:px-8"
    >
      <div class="mx-auto max-w-(--container-site)">
        <div class="flex items-center gap-4">
          <div class="h-px w-10 bg-arn-blue md:w-16" />
          <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-white/50">
            El Concepto
          </span>
        </div>
      </div>
    </div>

    <!-- Desktop: fullscreen pinned experience — side by side with more gap -->
    <div v-if="!isMobile" class="relative flex h-full items-center px-6 lg:px-8">
      <div class="mx-auto w-full max-w-(--container-site)">
        <div class="grid grid-cols-12 items-center gap-16 lg:gap-24">

          <!-- Left: compact fixed title + indicator -->
          <div class="col-span-3">
            <h2 class="font-agency text-[clamp(1.6rem,2.5vw,2.2rem)] uppercase leading-[0.95] tracking-[-0.02em] text-white">
              La analogia que transforma vidas
            </h2>

            <!-- Step indicator -->
            <div class="mt-8 flex flex-col gap-3">
              <div class="flex gap-1.5">
                <div
                  v-for="(pilar, i) in pilares"
                  :key="pilar.num"
                  :class="[
                    'h-[2px] transition-all duration-500',
                    activeIndex === i
                      ? 'w-8 bg-arn-blue'
                      : activeIndex > i
                        ? 'w-3 bg-white/25'
                        : 'w-3 bg-white/10'
                  ]"
                />
              </div>
              <span class="font-agency text-xs tracking-wider text-white/30">
                {{ String(activeIndex + 1).padStart(2, '0') }}
                <span class="text-white/10">/</span>
                {{ String(pilares.length).padStart(2, '0') }}
              </span>
            </div>
          </div>

          <!-- Right: animated pilar content -->
          <div class="relative col-span-9 h-[400px]">
            <div
              v-for="(pilar, i) in pilares"
              :key="pilar.num"
              class="pilar-step absolute inset-0 flex items-center opacity-0"
            >
              <div class="pilar-content w-full">
                <!-- Number -->
                <span class="pilar-num font-agency text-[clamp(4rem,8vw,7rem)] leading-none tracking-[-0.04em] text-white/[0.08]">
                  {{ pilar.num }}
                </span>

                <div class="-mt-6">
                  <!-- Accent line -->
                  <div class="pilar-line h-[2px] w-12 origin-left bg-arn-blue" />

                  <!-- Title -->
                  <h3 class="pilar-title mt-4 font-agency text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[0.95] tracking-[-0.02em] text-white">
                    {{ pilar.titulo }}
                  </h3>

                  <!-- Subtitle -->
                  <p class="pilar-sub mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-arn-blue">
                    {{ pilar.subtitulo }}
                  </p>

                  <!-- Description -->
                  <p class="pilar-desc mt-5 max-w-[50ch] text-[15px] leading-[1.9] text-white/60">
                    {{ pilar.descripcion }}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Scroll hint (desktop) -->
    <div
      v-if="!isMobile"
      class="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-500"
      :class="activeIndex > 0 ? 'opacity-0' : 'opacity-100'"
    >
      <div class="flex flex-col items-center gap-2">
        <span class="text-[10px] uppercase tracking-[0.3em] text-white/20">Scroll</span>
        <div class="h-6 w-px bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </div>

    <!-- Mobile: sequential cards -->
    <div v-if="isMobile" class="px-6 py-20">
      <div class="mb-5 flex items-center gap-4">
        <div class="h-px w-10 bg-arn-blue" />
        <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-white/50">
          El Concepto
        </span>
      </div>

      <h2 class="font-agency text-[clamp(2rem,7vw,3.5rem)] uppercase leading-[0.92] tracking-[-0.02em] text-white">
        La analogia que transforma vidas
      </h2>

      <div class="mt-14 space-y-0">
        <div
          v-for="pilar in pilares"
          :key="pilar.titulo"
          class="border-t border-white/10 py-10"
        >
          <div class="flex items-baseline gap-4">
            <span class="font-agency text-3xl text-white/10">{{ pilar.num }}</span>
            <div>
              <h3 class="font-agency text-2xl uppercase leading-[1] text-white">
                {{ pilar.titulo }}
              </h3>
              <p class="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-arn-blue">
                {{ pilar.subtitulo }}
              </p>
            </div>
          </div>
          <p class="mt-4 text-[14px] leading-[1.8] text-white/45">
            {{ pilar.descripcion }}
          </p>
        </div>
        <div class="border-t border-white/10" />
      </div>
    </div>
  </section>
</template>
