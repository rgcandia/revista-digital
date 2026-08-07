# Revista Digital Norbridge

Revista digital interactiva con efecto flipbook para el **Colegio Norbridge**.

**Edición actual**: Julio 2026 — Volumen XII · Número 3

---

## Stack técnico

| Categoría | Tecnología |
|-----------|-----------|
| Framework | React 19 |
| Lenguaje | TypeScript |
| Build tool | Vite 8 |
| Flipbook | react-pageflip 2.0.3 |
| Estilos | CSS plano |
| Linter | Oxlint |

---

## Estructura del proyecto

```
revista-digital/
├── public/
│   ├── favicon.svg
│   └── pages/              # 6 páginas SVG de la revista
│       ├── 01-portada.svg
│       ├── 02-indice.svg
│       ├── 03-acto-cierre.svg
│       ├── 04-feria-ciencias.svg
│       ├── 05-olimpiadas.svg
│       └── 06-entrevista.svg
├── src/
│   ├── main.tsx            # Entry point
│   ├── App.tsx             # Root component
│   ├── index.css           # Todos los estilos
│   ├── components/
│   │   └── RevistaDigital.tsx  # Componente principal (flipbook + lógica)
│   └── data/
│       └── revista.json    # Metadatos y definición de páginas
├── tareas/
│   └── registro.md         # Registro de cambios y tareas
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── dist/                   # Build de producción
```

---

## Experiencia actual (v1.0)

### Flujo del usuario

1. **Portada** — Al cargar la app se muestra la portada de la revista centrada en pantalla, con sombra y efecto hover.
2. **Click en portada** — La portada se desliza hacia la derecha (`translateX(30vw)`), se achica y se desvanece (600ms). Aparece el flipbook.
3. **Auto-flip** — Automáticamente se da vuelta la portada para revelar el índice (primera página doble).
4. **Navegación desktop**:
   - Header superior con título de la revista, edición, volumen
   - Botones "← Anterior" / "Siguiente →" con indicador de página actual
   - Tira de miniaturas al pie para salto rápido entre páginas
   - El flipbook responde a gestos de mouse (click en esquinas, arrastre)
5. **Navegación mobile**:
   - Se saltea la animación de portada (abre directo)
   - Modo portrait del flipbook
   - Controles "←" / "→" al pie
   - Miniaturas reducidas

### Contenido (6 páginas)

1. Portada — Editorial con foto, logo y pilares del colegio
2. Índice — Tabla de contenidos
3. Acto de cierre del ciclo lectivo — Nivel Inicial
4. Feria de Ciencias 2026 — Nivel Primario
5. Olimpiadas de Matemática — Nivel Primario
6. Entrevista al director

### Dimensiones del flipbook

- Tamaño base: 595 × 842 px (ratio A4)
- Auto-escalado: min 280×360, max 1200×1400
- Modo stretch (se adapta al contenedor)

---

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Type-check + build de producción |
| `npm run lint` | Análisis estático con Oxlint |
| `npm run preview` | Previsualizar build de producción |

---

## Registro de cambios

Ver [tareas/registro.md](tareas/registro.md)
