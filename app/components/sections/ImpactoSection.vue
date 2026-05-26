<script setup lang="ts">
const stats = [
  { value: 10, suffix: "+", label: "Años impactando comunidades" },
  { value: 290, suffix: "+", label: "Personas activadas por edición" },
  { value: 25, suffix: "+", label: "Organizaciones alcanzadas" },
];
</script>

<template>
  <section id="impacto" class="bg-white py-28 md:py-36">
    <div class="mx-auto max-w-(--container-site) px-6 lg:px-8">
      <!-- Header -->
      <UiBlurFade>
        <div class="mb-6 flex items-center gap-4">
          <div class="h-px w-10 bg-arn-blue md:w-16" />
          <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">Impacto</span>
        </div>
      </UiBlurFade>

      <div class="grid items-end gap-8 lg:grid-cols-12">
        <UiBlurFade :delay="0.1" :y-offset="30" class="lg:col-span-7">
          <h2 class="font-agency text-[clamp(2rem,5vw,5rem)] uppercase leading-[0.95] tracking-[-0.02em] text-arn-dark">
            La Proteína del movimiento
          </h2>
        </UiBlurFade>
        <UiBlurFade :delay="0.2" class="lg:col-span-5">
          <p class="max-w-[55ch] text-base leading-[1.8] text-arn-gray-500">
            Resultados tangibles de una visión activada. Cada número representa vidas
            transformadas y el fruto de la fe hecha acción.
          </p>
        </UiBlurFade>
      </div>

      <!-- Stats — oversized numbers -->
      <div class="mt-20 grid grid-cols-1 gap-16 border-t border-arn-dark/10 pt-16 sm:grid-cols-3 md:pt-20">
        <UiBlurFade
          v-for="(stat, index) in stats"
          :key="stat.label"
          :delay="0.12 * index"
        >
          <div>
            <div class="flex items-baseline">
              <UiNumberTicker
                :value="stat.value"
                :duration="2000"
                :decimal-places="0"
                class="font-agency text-[clamp(4rem,10vw,8rem)] leading-none tracking-[-0.03em] text-arn-dark"
              />
              <span class="font-agency text-[clamp(2rem,5vw,4rem)] text-arn-blue" aria-hidden="true">{{ stat.suffix }}</span>
            </div>
            <p class="mt-4 text-[11px] uppercase tracking-[0.2em] text-arn-gray-500">
              {{ stat.label }}
            </p>
          </div>
        </UiBlurFade>
      </div>
    </div>
  </section>
</template>
