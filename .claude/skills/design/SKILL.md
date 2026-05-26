# /design — Workflow UI

Pre-carga de contexto antes de cualquier trabajo visual.

## Leer primero

1. `.claude/context/branding.md` — Colores, tipografías, tono
2. `.claude/context/design-system.md` — Componentes, layout, animaciones

## Workflow obligatorio

```
Diagnose → Design → Implement → Polish
```

1. **Diagnose:** Revisar el estado actual del componente/sección. Captura de pantalla si ya existe.
2. **Design:** Usar skill `frontend-design` (OBLIGATORIO antes de implementar). Definir estructura, componentes y responsive.
3. **Implement:** Código con Tailwind-only. Delegar a agente `nuxt-ui`.
4. **Polish:** Usar `/polish` para revisión final pixel-perfect.

## Skills disponibles

| Skill | Cuándo usar |
|-------|-------------|
| `frontend-design` | SIEMPRE antes de implementar UI nueva |
| `/critique` | Evaluar UX (10 heurísticas) |
| `/audit` | Revisión técnica de calidad |
| `/polish` | Pase final pixel-perfect |
| `/animate` | Agregar animaciones (solo transform/opacity GPU) |
| `/adapt` | Validar responsive en todos los breakpoints |
| `/clarify` | Mejorar copy/UX writing |

## Reglas

- **Tailwind-only** — No CSS custom
- **Mobile-first** — Diseñar desde 375px, escalar hacia desktop
- **GSAP** — Para animaciones scroll-triggered. No @keyframes complejos
- **Swiper.js** — Para carruseles. No implementaciones custom
- **Agente:** Delegar implementación a `nuxt-ui`
- **Actualizar** `design-system.md` si se crean nuevos patrones
