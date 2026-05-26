# /deploy — Build y Despliegue

## Pre-deploy Checklist

- [ ] `pnpm build` completa sin errores
- [ ] Dev server funciona correctamente
- [ ] Todas las migraciones aplicadas
- [ ] Review visual completado (/review)
- [ ] Responsive verificado en 3 breakpoints
- [ ] SEO meta tags presentes
- [ ] Variables de entorno configuradas
- [ ] Imágenes optimizadas (WebP/AVIF)

## Build

```bash
pnpm build
```

Genera output en `.output/` listo para Node.js server o static hosting.

## Opciones de Deploy

### Opción A: Vercel (Recomendado para MVP)
- Zero-config con Nuxt preset
- Limitación: SQLite no persiste en serverless
- Solución: Migrar a Turso (SQLite edge) o usar API externa

### Opción B: VPS (Vultr/Hetzner)
- Control total, SQLite persiste en disco
- Docker Compose + Nginx reverse proxy
- GitHub Actions para CI/CD

### Opción C: Netlify
- Similar a Vercel, mismo limitante con SQLite

## Post-deploy

1. Verificar que la app carga correctamente
2. Probar navegación completa
3. Verificar panel admin (login + CRUD)
4. Revisar consola del navegador en producción
5. Verificar meta tags y OG images

## Rollback

Si algo falla en producción:
- Vercel: Revert al deployment anterior desde dashboard
- VPS: `docker compose down && docker compose up -d` con imagen anterior

## Notas

- Hosting final pendiente de definir con el cliente
- Si se elige serverless (Vercel/Netlify), la estrategia de SQLite debe adaptarse
- Considerar Turso como alternativa SQLite compatible con edge
