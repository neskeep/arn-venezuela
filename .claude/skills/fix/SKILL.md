# /fix — Diagnóstico Estructurado de Bugs

## Flujo obligatorio

```
DIAGNOSE → FIX → VERIFY
```

### Fase 1: DIAGNOSE

1. Leer el error completo (consola, terminal, stack trace)
2. Identificar archivos y líneas involucradas
3. Verificar supuestos leyendo el código actual
4. **Declarar la causa raíz explícitamente** antes de proceder

> No se permite corregir sin antes declarar la causa raíz.

### Fase 2: FIX

1. Aplicar la corrección mínima necesaria
2. **No refactorizar** código circundante
3. **No agregar mejoras** no relacionadas con el bug
4. Si el bug es UI → delegar a `nuxt-ui`
5. Si el bug es lógica/API → delegar a `nuxt-logic`

### Fase 3: VERIFY

1. `pnpm build` — verificar que compila sin errores
2. Dev server — verificar que la página carga
3. Consola — cero errores, cero warnings nuevos
4. Si el bug era visual — captura de pantalla para confirmar

## Reglas

- Si el fix no resuelve el problema → **re-diagnosticar**, no iterar a ciegas
- Commits atómicos: un bug, un commit
- Formato commit: `fix: descripción del bug corregido`
