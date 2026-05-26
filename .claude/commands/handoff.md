# /handoff — Traspaso de Sesión

Genera un resumen de la sesión actual y prepara el contexto para la siguiente.

## Instrucciones

1. **Actualizar `state/session.md`** con:
   - Número de sesión + fecha
   - Lista de tareas completadas
   - Tareas pendientes para la próxima sesión
   - Branch actual
   - Bugs conocidos o deuda técnica

2. **Actualizar `state/roadmap.md`** si alguna fase cambió de estado.

3. **Generar prompt de continuación** (máximo 15 líneas, en español):

```
## Sesión [N+1] — ARN Venezuela Website

Contexto: [fase actual y qué se completó]
Branch: [branch]
Leer: .claude/state/session.md

Próximos pasos:
1. [tarea 1]
2. [tarea 2]
3. [tarea 3]

Dev server: pnpm dev (http://localhost:3000)
```

4. **Fuente de verdad:** `state/session.md` siempre refleja el estado real del proyecto.
