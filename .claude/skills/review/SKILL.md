# /review — QA Visual con Playwright

## Cuándo usar

Después de completar una sección o funcionalidad, antes de marcarla como terminada.

## Flujo

1. Identificar archivos modificados (`git diff --name-only`)
2. Verificar que el dev server está corriendo (`pnpm dev`)
3. Para cada página/sección afectada:

### Verificaciones

| Check | Método |
|-------|--------|
| Renderizado | Navegar a la página, verificar que carga sin pantalla en blanco |
| Consola | Revisar errores y warnings (ignorar los de Nuxt HMR) |
| Hydration | Verificar que no hay mismatches (SSR vs client) |
| Responsive | Captura en 375px, 768px, 1280px |
| Visual | Comparar contra `design-system.md`: colores, tipografía, espaciado, layout |
| Links | Verificar que CTAs y navegación funcionan |
| Performance | No bloqueos visibles, animaciones fluidas |

### Herramientas

- Playwright MCP para navegación y capturas
- Verificar consola del navegador
- Inspeccionar network requests si hay datos dinámicos

## Output

Reportar en formato:
```
## Review: [Sección/Feature]
- OK: [lo que funciona]
- ISSUE: [problemas encontrados]
- NOTA: [observaciones menores]
```
