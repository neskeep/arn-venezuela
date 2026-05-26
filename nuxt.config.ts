import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  css: ["./app/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@nuxt/image"],

  app: {
    head: {
      htmlAttrs: { lang: "es" },
      title: "ARN Venezuela — El Puente Entre la Visión y la Manifestación",
      meta: [
        {
          name: "description",
          content:
            "Somos una comunidad de hombres y mujeres unidos por la visión de una Venezuela transformada a través de los altos valores de la reconciliación, la fe y la excelencia.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
        },
      ],
    },
  },
});
