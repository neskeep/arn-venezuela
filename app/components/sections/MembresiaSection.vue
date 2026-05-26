<script setup lang="ts">
const beneficios = [
  {
    titulo: "Reprogramación del Bio-Software",
    descripcion: "Reactiva el código de éxito con el que naciste, pero que el entorno ha silenciado.",
  },
  {
    titulo: "Neurociencia de la Visualización",
    descripcion: "Al cambiar lo que visualizamos, le damos al cerebro una nueva orden para transformar nuestra realidad.",
  },
  {
    titulo: "Paramutación Espiritual",
    descripcion: "Hackea el sistema de comunicación celular para que el bienestar y el propósito sean inevitables.",
  },
  {
    titulo: "Herencia Generacional",
    descripcion: "Reescribe tu historia para que la siguiente generación no herede miedos ni patrones limitantes.",
  },
];

const pasos = [
  { num: 1, titulo: "Completa tu perfil", descripcion: "Datos básicos para conocerte." },
  { num: 2, titulo: "Conecta con tu célula", descripcion: "Tu comunidad local asignada." },
  { num: 3, titulo: "Activa tu propósito", descripcion: "Recursos, eventos y mentoría." },
];
</script>

<template>
  <section id="membresia">
    <!-- WHY section — light background for contrast -->
    <div class="bg-white pt-10 pb-20 md:pt-14 md:pb-28">
      <div class="mx-auto max-w-(--container-site) px-6 lg:px-8">
        <!-- Header -->
        <div class="grid items-end gap-8 lg:grid-cols-12">
          <div class="lg:col-span-7">
            <UiBlurFade>
              <div class="mb-6 flex items-center gap-4">
                <div class="h-px w-10 bg-arn-blue md:w-16" />
                <span class="text-[11px] font-medium uppercase tracking-[0.3em] text-arn-gray-500">Membresía</span>
              </div>
            </UiBlurFade>
            <UiBlurFade :y-offset="30" :delay="0.1">
              <h2 class="font-agency text-[clamp(2rem,5vw,4.5rem)] uppercase leading-[0.95] tracking-[-0.02em] text-arn-gray-900">
                ¿Por qué hacerte miembro?
              </h2>
            </UiBlurFade>
          </div>
          <UiBlurFade :delay="0.2" class="lg:col-span-5">
            <p class="max-w-[55ch] text-base leading-[1.8] text-arn-gray-500">
              Ser parte de ARN es activar tu diseño original. No es una membresía
              más — es una decisión de transformar tu código de vida y el de tu generación.
            </p>
          </UiBlurFade>
        </div>

        <!-- Beneficios — editorial numbered blocks -->
        <div class="mt-16 grid gap-px border border-arn-gray-50 bg-arn-gray-50 md:grid-cols-2">
          <UiBlurFade
            v-for="(beneficio, index) in beneficios"
            :key="beneficio.titulo"
            :delay="0.1 * index"
          >
            <div class="group relative flex h-full gap-5 bg-white p-8 transition-colors duration-300 hover:bg-arn-gray-50/50 md:p-10">
              <!-- Large number -->
              <span class="font-agency text-[3.5rem] leading-none text-arn-gray-50 transition-colors duration-300 group-hover:text-arn-blue/15 md:text-[4.5rem]">
                0{{ index + 1 }}
              </span>
              <div class="pt-2">
                <h3 class="text-sm font-bold uppercase tracking-[0.1em] text-arn-gray-900">
                  {{ beneficio.titulo }}
                </h3>
                <p class="mt-2 text-sm leading-relaxed text-arn-gray-500">
                  {{ beneficio.descripcion }}
                </p>
              </div>
              <!-- Blue accent on hover -->
              <div class="absolute bottom-0 left-0 h-0.5 w-0 bg-arn-blue transition-all duration-500 group-hover:w-full" />
            </div>
          </UiBlurFade>
        </div>
      </div>
    </div>

    <!-- Registration panel: Steps sidebar + Form — dark background -->
    <div class="bg-arn-dark border-t border-white/5">
      <div class="mx-auto max-w-(--container-site) px-6 lg:px-8">
        <UiBlurFade>
          <div class="grid lg:grid-cols-12">
            <!-- Left sidebar: Steps -->
            <div class="border-b border-white/5 py-10 lg:col-span-4 lg:border-b-0 lg:border-r lg:py-14 lg:pr-12">
              <h3 class="font-agency text-[clamp(1.5rem,3vw,2.5rem)] uppercase leading-[1] tracking-[-0.02em] text-white">
                Cómo unirte
              </h3>
              <p class="mt-3 text-sm leading-relaxed text-white/40">
                Tu primer paso hacia la transformación comienza aquí.
              </p>

              <div class="mt-8 space-y-6">
                <div v-for="paso in pasos" :key="paso.num" class="flex gap-4">
                  <div class="flex h-8 w-8 shrink-0 items-center justify-center bg-white/5 text-xs font-semibold text-white/50">
                    {{ paso.num }}
                  </div>
                  <div>
                    <h4 class="text-[13px] font-semibold text-white">{{ paso.titulo }}</h4>
                    <p class="mt-0.5 text-xs text-white/35">{{ paso.descripcion }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Form -->
            <div class="py-10 lg:col-span-8 lg:py-14 lg:pl-12">
              <RegistroForm />
            </div>
          </div>
        </UiBlurFade>
      </div>
    </div>
  </section>
</template>
