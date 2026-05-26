<script setup lang="ts">
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const activeSection = ref("");

const navItems = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Junta Directiva", href: "#junta-directiva" },
  { label: "Eventos", href: "#eventos" },
  { label: "Impacto", href: "#impacto" },
  { label: "Aliados", href: "#aliados" },
  { label: "Membresía", href: "#membresia" },
];

const sectionIds = navItems.map((item) => item.href.slice(1));

function handleScroll() {
  isScrolled.value = window.scrollY > 50;
}

function scrollToSection(href: string) {
  isMobileMenuOpen.value = false;
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

let observer: IntersectionObserver | null = null;

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      }
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );

  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  observer?.disconnect();
});
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'bg-arn-dark/95 backdrop-blur-sm' : 'bg-transparent'"
  >
    <nav class="mx-auto flex max-w-(--container-site) items-center justify-between px-6 py-5 lg:px-8">
      <!-- Logo -->
      <a href="#" class="flex items-center" @click.prevent="scrollToSection('#')">
        <img
          src="/images/arn-logo-full.svg"
          alt="ARN Venezuela"
          class="h-8 brightness-0 invert transition-all duration-300"
        />
      </a>

      <!-- Desktop Nav -->
      <ul class="hidden items-center gap-8 lg:flex">
        <li v-for="item in navItems" :key="item.href">
          <button
            class="text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:text-white"
            :class="activeSection === item.href.slice(1) ? 'text-white' : 'text-white/50'"
            @click="scrollToSection(item.href)"
          >
            {{ item.label }}
          </button>
        </li>
      </ul>

      <!-- CTA Desktop -->
      <button
        class="hidden bg-arn-blue px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-arn-blue/90 lg:block"
        @click="scrollToSection('#membresia')"
      >
        Únete al ARN
      </button>

      <!-- Mobile Hamburger -->
      <button
        class="text-white lg:hidden"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobile Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-[-1] bg-black/60 lg:hidden"
        @click="isMobileMenuOpen = false"
      />
    </Transition>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="bg-arn-dark px-6 pb-6 lg:hidden"
      >
        <ul class="flex flex-col gap-4">
          <li v-for="item in navItems" :key="item.href">
            <button
              class="w-full text-left text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:text-white"
              :class="activeSection === item.href.slice(1) ? 'text-white' : 'text-white/50'"
              @click="scrollToSection(item.href)"
            >
              {{ item.label }}
            </button>
          </li>
          <li>
            <button
              class="mt-2 w-full bg-arn-blue px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-arn-blue/90"
              @click="scrollToSection('#membresia')"
            >
              Únete al ARN
            </button>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
