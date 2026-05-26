# Stack Tecnológico

## Framework & Runtime

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| Nuxt | 4.x | Framework SSR/SSG |
| Vue | 3.5.x | UI reactiva |
| TypeScript | strict | Tipado estático |
| pnpm | latest | Package manager |

## Styling & UI

| Tecnología | Propósito |
|-----------|-----------|
| Tailwind CSS 4.x | Utilidades CSS — CSS-first config |
| @tailwindcss/vite | Plugin Vite (NO PostCSS) |
| GSAP + ScrollTrigger | Animaciones scroll-triggered |
| Swiper.js | Carruseles interactivos |
| @nuxt/image | Optimización de imágenes |
| Lucide Vue | Iconografía |

### Tailwind CSS v4 — Instalación (CSS-first)

```bash
pnpm add tailwindcss @tailwindcss/vite
```

**nuxt.config.ts:**
```typescript
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
```

**app/assets/css/main.css:**
```css
@import "tailwindcss";

@theme {
  --color-arn-dark: #051a3b;
  --color-arn-blue: #1675f7;
  --color-arn-gray-50: #F2F4F7;
  --color-arn-gray-500: #667085;
  --color-arn-gray-700: #344054;
  --color-arn-gray-900: #101828;
  --font-agency: "Agency", sans-serif;
  --font-montserrat: "Montserrat", sans-serif;
}
```

> **IMPORTANTE:** No existe `tailwind.config.js`. Toda la configuración va en CSS con `@theme`.

## Backend & Data

| Tecnología | Propósito |
|-----------|-----------|
| better-sqlite3 | Driver SQLite para Node |
| drizzle-orm | ORM type-safe (opcional, evaluar) |
| drizzle-kit | Migraciones |
| bcrypt | Hash de contraseñas admin |

## Estructura de Deploy

Por definir. Candidatos:
- **Vercel** — Zero-config para Nuxt, ideal para sitios con poco tráfico
- **VPS (Vultr/Hetzner)** — Control total, útil si SQLite necesita persistencia en disco
- **Netlify** — Alternativa a Vercel

## Notas

- SQLite se elige por simplicidad: no requiere servidor de BD externo
- El archivo `.db` se almacena en `server/database/arn.db`
- En producción con Vercel, considerar migrar a Turso (SQLite edge) si se necesita persistencia serverless
- GSAP requiere licencia para uso comercial — verificar si aplica para sitio sin fines de lucro
