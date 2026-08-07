# Registro de Cambios — Revista Digital Norbridge

> Proyecto: revista-digital
> Repositorio: https://github.com/rgcandia/revista-digital.git
> Rama: master

---

## Historial de commits

| Commit | Fecha | Descripción |
|--------|-------|-------------|
| `b116e96` | 2026-08-07 | feat: flipbook fullscreen expandido al maximo del viewport |
| `afec1a4` | 2026-08-07 | feat: modo fullscreen desktop con toggle menu |
| `82fdbf3` | — | chore: trigger redeploy |
| `59828ee` | — | feat: fondo foto portada + gradiente legible |
| `fb19bbf` | — | feat: portada editorial con logo y pilares - optimizaciones responsive y rendimiento |
| `6415261` | — | feat: animacion apertura revista - cover slide + auto-flip + mobile directo |
| `2f5d680` | — | fix: agregar props requeridas por IProps de react-pageflip |
| `7bda906` | — | init: revista digital con react-pageflip |

---

## Tareas

### 2026-08-07

*(sin tareas pendientes)*

---

## Convenciones

- **ID**: número secuencial de tarea (001, 002, ...)
- **Estado**: PENDIENTE | EN_PROGRESO | COMPLETADA | CANCELADA
- Cada tarea completada se mueve a la sección "Tareas completadas" con fecha de finalización
- Los commits se registran en el historial tras cada tarea completada

---

## Tareas completadas

### 2026-08-07

| ID | Descripción | Archivos | Detalle |
|----|-------------|----------|---------|
| 003 | Spinner de carga + fix bug tamaño fullscreen | `src/components/RevistaDigital.tsx`, `src/index.css` | Splash screen con spinner dorado sobre fondo oscuro (mín 2s + precarga de 6 SVGs). Fix: transición de `opacity` 0.25s en vez de `max-width/padding` 0.4s + `update()` forzado del flipbook al cambiar fullscreen. |
| 002 | Fullscreen: ampliar flipbook al máximo del viewport | `src/components/RevistaDigital.tsx`, `src/index.css` | maxWidth/maxHeight condicionales (2000×1200 vs 1200×1400), flip-wrapper con `align-items: stretch` |
| 001 | Modo fullscreen en desktop | `src/components/RevistaDigital.tsx`, `src/index.css` | Flujo: portada → click → slide animado → flipbook en pantalla completa (fondo oscuro, sin header ni thumbnails). Botón ☰ flotante con blur. Escape para salir. Botón ⛶ en header. Mobile sin cambios. |