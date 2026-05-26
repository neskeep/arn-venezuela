<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroRef = ref<HTMLElement>();

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

onMounted(() => {
  if (!heroRef.value) return;

  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  // Parallax on hero bg image
  gsap.to(".hero-bg-img", {
    y: 150,
    ease: "none",
    scrollTrigger: {
      trigger: heroRef.value,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  tl.from(".hero-kicker", { opacity: 0, x: -30, duration: 0.8 }, 0.3)
    .from(".hero-title-line", { opacity: 0, y: 80, duration: 1.4, stagger: 0.15 }, 0.5)
    .from(".hero-subtitle", { opacity: 0, y: 30, duration: 1 }, 1.2)
    .from(".hero-cta", { opacity: 0, y: 20, stagger: 0.12, duration: 0.7 }, 1.6)
    .from(".hero-scroll-indicator", { opacity: 0, duration: 1 }, 2.2);
});
</script>

<template>
  <section ref="heroRef" class="relative min-h-screen overflow-hidden bg-arn-dark">
    <!-- Background photo — parallax -->
    <div class="absolute inset-0 overflow-hidden">
      <img
        src="https://cdn.prod.website-files.com/69a5c269e1661f5234645211/69a5c26ce1661f52346453e8_hero.avif"
        alt="Comunidad reunida en propósito"
        class="hero-bg-img h-[120%] w-full object-cover"
      />
      <div class="absolute inset-0 bg-arn-dark opacity-60" />
    </div>

    <!-- Content -->
    <div class="relative flex min-h-screen flex-col justify-end pb-20 md:justify-center md:pb-0">
      <div class="mx-auto w-full max-w-(--container-site) px-6 lg:px-8">
        <!-- Kicker -->
        <div class="hero-kicker mb-6 flex items-center gap-4 md:mb-8">
          <div class="h-px w-10 bg-arn-blue md:w-16" />
          <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-300">
            Movimiento ARN Venezuela
          </span>
        </div>

        <!-- Title — split into lines for staggered animation -->
        <h1 class="max-w-6xl font-agency uppercase leading-[0.9] tracking-[-0.03em] text-white">
          <span class="hero-title-line block text-[clamp(2.5rem,8vw,9rem)]">
            El Puente Entre
          </span>
          <span class="hero-title-line block text-[clamp(2.5rem,8vw,9rem)]">
            la Visión y la
          </span>
          <span class="hero-title-line block text-[clamp(2.5rem,8vw,9rem)] text-arn-blue">
            Manifestación
          </span>
        </h1>

        <p class="hero-subtitle mt-6 max-w-xl text-[clamp(0.875rem,1.5vw,1.125rem)] leading-relaxed text-arn-gray-300 md:mt-8">
          Una comunidad de hombres y mujeres unidos por la visión de una Venezuela
          transformada a través de la reconciliación, la fe y la excelencia.
        </p>

        <div class="mt-8 flex flex-wrap gap-4 md:mt-10">
          <button
            class="hero-cta bg-arn-blue px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-blue-500"
            @click="scrollTo('#membresia')"
          >
            Únete al ARN
          </button>
          <button
            class="hero-cta border border-arn-gray-300 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-arn-dark"
            @click="scrollTo('#nosotros')"
          >
            Conoce a ARN
          </button>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2">
      <div class="flex flex-col items-center gap-2">
        <span class="text-[10px] uppercase tracking-[0.3em] text-arn-gray-500">Scroll</span>
        <div class="h-10 w-px bg-arn-gray-500" />
      </div>
    </div>
  </section>
</template>
