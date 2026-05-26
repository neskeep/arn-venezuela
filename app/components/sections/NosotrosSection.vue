<script setup lang="ts">
</script>

<template>
  <section id="nosotros" class="bg-white py-28 md:py-36">
    <div class="mx-auto max-w-(--container-site) px-6 lg:px-8">
      <!-- Quiénes Somos — Asymmetric grid 7/5 -->
      <div class="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <!-- Image col — 7/12 -->
        <div class="lg:col-span-7">
          <UiBlurFade :y-offset="0">
            <div class="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                alt="Comunidad unida en propósito"
                class="aspect-[4/3] w-full object-cover lg:aspect-[3/2]"
                loading="lazy"
              />
            </div>
          </UiBlurFade>
        </div>

        <!-- Text col — 5/12 -->
        <div class="lg:col-span-5 lg:pt-12">
          <UiBlurFade>
            <div class="mb-6 flex items-center gap-4">
              <div class="h-px w-10 bg-arn-blue" />
              <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">Quiénes Somos</span>
            </div>
          </UiBlurFade>

          <UiBlurFade :delay="0.1" :y-offset="30">
            <h2 class="font-agency text-[clamp(2rem,5vw,4.5rem)] uppercase leading-[0.95] tracking-[-0.02em] text-arn-dark">
              Vectores de la esperanza
            </h2>
          </UiBlurFade>

          <UiBlurFade :delay="0.25">
            <div class="mt-6 space-y-5 md:mt-8">
              <p class="max-w-[55ch] text-base leading-[1.8] text-arn-gray-500">
                Desde hace 2 años nos unimos para conectar liderazgos desde distintas áreas
                de la sociedad y así desarrollar una obra de transformación de la mentalidad
                venezolana — el cambio de su genética espiritual y física — para ser un país
                fuerte y próspero.
              </p>
              <p class="max-w-[55ch] text-base leading-[1.8] text-arn-gray-500">
                Creemos en el poder transformador de nuestras imágenes fundantes y en la
                sinergia de nuestras capacidades múltiples.
              </p>
            </div>
          </UiBlurFade>
        </div>
      </div>

      <!-- Divider -->
      <div class="my-20 h-px bg-arn-gray-100 md:my-28" />

      <!-- Misión + Visión — Asymmetric reverse (5/7) -->
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <UiBlurFade class="lg:col-span-5">
          <div>
            <div class="mb-4 flex items-center gap-4">
              <div class="h-px w-8 bg-arn-blue" />
              <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">Misión</span>
            </div>
            <h3 class="font-agency text-[clamp(1.5rem,3vw,2.5rem)] uppercase leading-[1] tracking-[-0.02em] text-arn-dark">
              Nuestra Misión
            </h3>
            <p class="mt-4 max-w-[55ch] leading-[1.8] text-arn-gray-500">
              Activar el diseño original en cada individuo a través de la estimulación
              visual y la renovación del entendimiento, reescribiendo códigos de dolor,
              falta de identidad o corrupción, transformándolos en acciones concretas
              que impacten la sociedad venezolana.
            </p>
          </div>
        </UiBlurFade>

        <!-- Offset for asymmetry -->
        <div class="hidden lg:col-span-2 lg:block" />

        <UiBlurFade :delay="0.15" class="lg:col-span-5">
          <div>
            <div class="mb-4 flex items-center gap-4">
              <div class="h-px w-8 bg-arn-blue" />
              <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">Visión</span>
            </div>
            <h3 class="font-agency text-[clamp(1.5rem,3vw,2.5rem)] uppercase leading-[1] tracking-[-0.02em] text-arn-dark">
              Nuestra Visión
            </h3>
            <p class="mt-4 max-w-[55ch] leading-[1.8] text-arn-gray-500">
              Ser el catalizador de una paramutación espiritual colectiva que impacte a toda
              Venezuela y al mundo, reemplazando el código dañino por un código de vida,
              integridad y prosperidad para las generaciones venideras.
            </p>
          </div>
        </UiBlurFade>
      </div>
    </div>
  </section>
</template>
