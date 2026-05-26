<script setup lang="ts">
const navCol1 = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Junta Directiva", href: "#junta-directiva" },
  { label: "Eventos", href: "#eventos" },
];

const navCol2 = [
  { label: "Impacto", href: "#impacto" },
  { label: "Aliados", href: "#aliados" },
  { label: "Membresía", href: "#membresia" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/arnvenezuela", icon: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" },
  { label: "YouTube", href: "https://youtube.com/@arnvenezuela", icon: "M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" },
];

function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <footer class="bg-arn-dark">
    <!-- Blue accent line -->
    <div class="h-0.5 bg-arn-blue" />

    <div class="mx-auto max-w-(--container-site) px-6 py-10 lg:px-8">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-12">
        <!-- Column 1: Logo + tagline + CTA -->
        <div class="lg:col-span-4">
          <img
            src="/images/arn-logo-full.svg"
            alt="ARN Venezuela"
            class="h-7 brightness-0 invert"
          />
          <p class="mt-3 max-w-xs text-[13px] leading-relaxed text-white/40">
            El puente entre la visión y la manifestación. Una comunidad de transformación para Venezuela.
          </p>
          <!-- <button
            class="mt-4 inline-flex items-center gap-2 rounded bg-arn-blue px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-arn-blue/80"
            @click="scrollToSection('#membresia')"
          >
            Únete al movimiento
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
            </svg>
          </button> -->
        </div>

        <!-- Column 2: Navigation in 2 sub-columns -->
        <div class="lg:col-span-3">
          <h4 class="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Navegación</h4>
          <div class="mt-3 grid grid-cols-2 gap-x-6 gap-y-2.5">
            <button
              v-for="item in [...navCol1, ...navCol2]"
              :key="item.href"
              class="text-left text-[13px] text-white/40 transition-colors hover:text-white"
              @click="scrollToSection(item.href)"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <!-- Column 3: Contact -->
        <div class="lg:col-span-3">
          <h4 class="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Contacto</h4>
          <ul class="mt-3 space-y-2.5">
            <li>
              <a href="mailto:contacto@arnvenezuela.org" class="text-[13px] text-white/40 transition-colors hover:text-white">
                contacto@arnvenezuela.org
              </a>
            </li>
            <li>
              <a href="https://wa.me/584121234567" target="_blank" rel="noopener" class="text-[13px] text-white/40 transition-colors hover:text-white">
                +58 412 123 4567
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 4: Social -->
        <div class="lg:col-span-2">
          <h4 class="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Síguenos</h4>
          <div class="mt-3 flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noopener"
              class="flex h-9 w-9 items-center justify-center rounded bg-white/5 text-white/40 transition-all hover:bg-arn-blue hover:text-white"
              :aria-label="social.label"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path :d="social.icon" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright bar -->
      <div class="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-5 sm:flex-row">
        <p class="text-[11px] text-white/25">
          &copy; {{ new Date().getFullYear() }} ARN Venezuela. Todos los derechos reservados.
        </p>
        <button
          class="text-[11px] text-white/25 transition-colors hover:text-white/60"
          @click="scrollToTop"
        >
          Volver arriba &uarr;
        </button>
      </div>
    </div>
  </footer>
</template>
