<template>
  <div class="min-h-screen font-montserrat text-arn-gray-700">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-arn-blue focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
    >
      Saltar al contenido
    </a>
    <TheNavbar />
    <main id="main-content">
      <slot />
    </main>
    <TheFooter />
    <BackToTop />
  </div>
</template>
