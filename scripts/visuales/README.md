# Visuales sin créditos

`render.js` convierte un JSON en PNGs listos para redes usando el Chromium de Playwright que ya está en las sesiones de Claude. Sustituye las plantillas de carrusel, cita e infografía de Blotato. Costo: cero.

```
node scripts/visuales/render.js scripts/visuales/ejemplo-carrusel.json salida
```

Plantillas y tamaños:

| plantilla | tamaño | campos |
|---|---|---|
| `carrusel` | 1080x1350 | `slides[]` con `kicker`, `titulo`, `cuerpo`, `nota`. 1 a 10 slides. La última sale invertida (fondo claro) como señal de cierre |
| `cita` | 1080x1080 | `cita.texto`, `cita.autor`, `cita.fuente` |
| `portada` | 1080x1920 | `slides[0]` con `kicker`, `titulo`, `cuerpo` |
| `infografia` | 1080x1350 | `slides[0].titulo` y `puntos[]` (máximo 6) |

`marca` es opcional: `fondo`, `texto`, `acento`, `fuente`, `firma`. Por defecto negro, blanco, amarillo, Inter y sin firma.

Salida: PNGs numerados y `manifest.json` con las rutas. Revisar las imágenes antes de hospedar (receta 5 de la skill `distribucion`).

Reglas de diseño que ya cumple: una idea por slide, texto grande, sin efectos, mismo sistema visual en todo el carrusel, contenido en fondo oscuro y cierre invertido.
