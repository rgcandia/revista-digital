# Registro de Cambios — Revista Digital Norbridge

> Proyecto: revista-digital
> Repositorio: https://github.com/rgcandia/revista-digital.git
> Rama: master

---

## Historial de commits

| Commit | Fecha | Descripción |
|--------|-------|-------------|
| `f4d80c5` | 2026-08-07 | feat: animacion portada fade+scale unificada desktop y mobile |
| `acc7d4d` | 2026-08-07 | fix: boton fullscreen en controles mobile |
| `e9f7a20` | 2026-08-07 | feat: flujo fullscreen + cover para mobile |
| `a3057fc` | 2026-08-07 | feat: spinner de carga + fix bug tamaño fullscreen |
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
| 005 | Animación portada: fade + scale unificado | `src/index.css` | Reemplaza slides direccionales por `scale(0.92) + opacity 0`, consistente en desktop y mobile. |
| 004 | Flujo fullscreen + cover para mobile | `src/components/RevistaDigital.tsx`, `src/index.css` | Mobile ahora ve portada antes de abrir. Fullscreen activo por defecto. Botón ☰ flotante para toggle de controles y thumbnails. |
| 003 | Spinner de carga + fix bug tamaño fullscreen | `src/components/RevistaDigital.tsx`, `src/index.css` | Splash screen con spinner dorado (mín 2s + precarga SVGs). Fix transición + update() forzado del flipbook. |
| 002 | Fullscreen: ampliar flipbook al máximo | `src/components/RevistaDigital.tsx`, `src/index.css` | maxWidth/maxHeight condicionales (2000×1200 vs 1200×1400), flip-wrapper con `align-items: stretch`. |
| 001 | Modo fullscreen en desktop | `src/components/RevistaDigital.tsx`, `src/index.css` | Flujo: portada → click → slide animado → flipbook fullscreen. Botón ☰ flotante. Escape. Botón ⛶ en header. |