# Registro de Cambios — Revista Digital Norbridge

> Proyecto: revista-digital
> Repositorio: https://github.com/rgcandia/revista-digital.git
> Rama: master

---

## Historial de commits

| Commit | Fecha | Descripción |
|--------|-------|-------------|
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

| ID | Estado | Descripción | Archivos |
|----|--------|-------------|----------|
| 002 | COMPLETADA | Fullscreen: ampliar flipbook al máximo del viewport | `src/components/RevistaDigital.tsx`, `src/index.css` | `maxWidth`/`maxHeight` condicionales (2000×1200 en fullscreen vs 1200×1400 en normal), flip-wrapper con `align-items: stretch` |

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
| 001 | Modo fullscreen en desktop | `src/components/RevistaDigital.tsx`, `src/index.css` | Flujo: portada → click → slide animado → flipbook en pantalla completa (fondo oscuro `#0f172a`, sin header ni thumbnails). Botón ☰ flotante con backdrop-blur para abrir/cerrar menú. Tecla `Escape` para salir de fullscreen. Botón ⛶ en header del modo normal para volver a fullscreen. Mobile sin cambios. |