# Design System — ARN Venezuela

## Layout General

- **Tipo:** Single-page landing con scroll por secciones + panel admin separado
- **Ancho máximo:** `max-w-7xl` (1280px) para contenido, full-width para fondos
- **Padding secciones:** `py-20 md:py-28` vertical, `px-4 md:px-8` horizontal
- **Alternancia fondos:** Blanco (#fff) → Gris (#F2F4F7) → Blanco → etc.

## Navegación

- **Tipo:** Sticky top, transparente sobre hero → sólida (blanco + shadow) al hacer scroll
- **Items:** NOSOTROS | JUNTA DIRECTIVA | EVENTOS | IMPACTO | ALIADOS | MEMBRESIA
- **Logo:** Izquierda, versión compacta
- **CTA:** "Unete al ARN" — botón acento a la derecha
- **Mobile:** Hamburger menu → slide panel desde la derecha
- **Scroll behavior:** Smooth scroll a la sección correspondiente con offset del header

## Secciones

### Hero
- **Height:** `min-h-screen` con contenido centrado vertical
- **Fondo:** Azul oscuro (#051a3b) con imagen overlay o gradient
- **Texto:** Blanco, H1 Agency, subtítulo Montserrat Light
- **CTAs:** 2 botones — primario (azul brillante) + secundario (outline blanco)
- **Animación:** Fade-in + slide-up escalonado (título → subtítulo → botones)

### Nosotros
- **Layout:** 2 columnas (texto izq + imagen/visual der) en desktop, stacked en mobile
- **Subsecciones:** Quiénes Somos, Visión, Misión
- **Citas destacadas:** Extractos de "El ARN es Inevitable" como blockquotes con borde azul

### Pilares
- **Layout:** Grid 4 columnas (1 col mobile, 2 tablet, 4 desktop)
- **Cards:** Icono + título + descripción
- **Visual:** Conexión visual entre los 4 pilares (ADN → ARN → Ribosomas → Proteína)
- **Interacción:** Hover con elevación + color acento

### Junta Directiva
- **Layout:** Grid responsive (1/2/3/4 columnas según breakpoint)
- **Cards:** Foto circular/cuadrada + nombre + cargo + bio on hover
- **Datos:** Dinámicos desde SQLite (orden configurable)

### Impacto
- **Layout:** Grid de estadísticas (3-4 columnas)
- **Números:** Contadores animados (GSAP) que se activan al entrar en viewport
- **Formato:** Número grande (Agency) + label descriptivo (Montserrat)

### Eventos
- **Layout:** Timeline vertical o grid de cards
- **Cards:** Imagen + fecha + título + descripción + badge estado (próximo/pasado)
- **Datos:** Dinámicos desde SQLite
- **Filtro opcional:** Próximos vs Pasados

### Aliados
- **Layout:** Carrusel horizontal (Swiper.js) con autoplay
- **Items:** Logo + nombre (tooltip on hover)
- **Responsive:** 2 logos mobile, 3 tablet, 5-6 desktop
- **Datos:** Dinámicos desde SQLite
- **Estilo:** Logos en escala de grises → color on hover

### Membresía
- **Fondo:** Azul oscuro (#051a3b) o gradient
- **Layout:** Beneficios en grid/lista + CTA grande
- **CTA:** Botón prominente (azul brillante) que lleva al flujo de registro
- **Tono:** Motivacional, enfocado en valor personal

### Footer
- **Fondo:** Azul oscuro (#051a3b)
- **Contenido:** Logo + links de navegación + redes sociales + copyright
- **Layout:** 3-4 columnas desktop, stacked mobile

## Componentes UI

### Botones

| Variante | Estilo |
|----------|--------|
| Primary | `bg-arn-blue text-white` + hover darken |
| Secondary | `border border-white text-white` + hover fill |
| Ghost | `text-arn-blue` + hover underline |

### Cards
- `rounded-xl` + `shadow-sm` + `hover:shadow-md`
- Padding: `p-6`
- Transición suave en hover: `transition-all duration-300`

### Badges
- `rounded-full px-3 py-1 text-xs font-medium`
- Variantes: activo (verde), próximo (azul), pasado (gris)

## Responsive Breakpoints

| Nombre | Min-width | Dispositivo |
|--------|-----------|-------------|
| sm | 479px | Mobile grande |
| md | 767px | Tablet |
| lg | 991px | Desktop |
| xl | 1280px | Desktop ancho |

## Animaciones (GSAP)

- **Tipo principal:** Fade-in + slide-up (`opacity: 0 → 1`, `y: 30 → 0`)
- **Trigger:** ScrollTrigger al 80% del viewport
- **Duration:** 0.6 - 0.8s
- **Ease:** `power2.out`
- **Stagger:** 0.1 - 0.2s entre elementos de grupo (grid items, stats)
- **Contadores:** `gsap.to()` con snap para números enteros
- **No usar:** Animaciones CSS complejas (@keyframes), parallax excesivo, efectos que bloqueen el scroll

## Design Tokens (Tailwind v4 CSS-first)

Todos los tokens se definen en `app/assets/css/main.css` usando `@theme`. **No existe `tailwind.config.js`.**

```css
@import "tailwindcss";

@theme {
  /* Colores */
  --color-arn-dark: #051a3b;
  --color-arn-blue: #1675f7;
  --color-arn-gray-50: #F2F4F7;
  --color-arn-gray-500: #667085;
  --color-arn-gray-700: #344054;
  --color-arn-gray-900: #101828;

  /* Tipografías */
  --font-agency: "Agency", sans-serif;
  --font-montserrat: "Montserrat", sans-serif;

  /* Breakpoints custom (si se necesitan) */
  /* --breakpoint-sm: 479px; */
  /* --breakpoint-md: 767px; */
}
```

Uso en templates: `bg-arn-dark`, `text-arn-blue`, `font-agency`, `font-montserrat`.

## Performance

- Imágenes: WebP/AVIF con `@nuxt/image`, lazy loading
- Fuentes: `font-display: swap`, preload para Agency Regular
- GSAP: Solo importar plugins usados (ScrollTrigger)
- Swiper: Import modular (no bundle completo)
