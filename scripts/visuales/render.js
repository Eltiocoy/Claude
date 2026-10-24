#!/usr/bin/env node
// Renderiza visuales para redes (carrusel, cita, portada, infografía) de HTML a PNG con Playwright.
// Sustituye las plantillas de visuales de Blotato sin créditos: el costo es cero.
//
// Uso:
//   node scripts/visuales/render.js spec.json [carpeta-salida]
//
// spec.json:
// {
//   "plantilla": "carrusel" | "cita" | "portada" | "infografia",
//   "marca": { "fondo": "#0F0F0F", "texto": "#F5F5F5", "acento": "#FFD400", "fuente": "Inter", "firma": "@tiocoy" },
//   "slides": [ { "kicker": "01", "titulo": "...", "cuerpo": "...", "nota": "..." } ],
//   "cita": { "texto": "...", "autor": "...", "fuente": "..." },
//   "puntos": [ "...", "..." ]   // solo infografía
// }
//
// Tamaños: carrusel e infografía 1080x1350 (4:5), cita 1080x1080, portada 1080x1920 (9:16).
// Salida: PNGs numerados en la carpeta indicada (por defecto ./salida-visuales) y un manifest.json.

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const TAMANOS = {
  carrusel: { w: 1080, h: 1350 },
  infografia: { w: 1080, h: 1350 },
  cita: { w: 1080, h: 1080 },
  portada: { w: 1080, h: 1920 },
};

const MARCA_DEFECTO = {
  fondo: '#0F0F0F',
  texto: '#F5F5F5',
  acento: '#FFD400',
  fuente: 'Inter, "Helvetica Neue", Arial, sans-serif',
  firma: '',
};

function esc(s = '') {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function base(marca, w, h, cuerpo, invertido = false) {
  const fondo = invertido ? marca.texto : marca.fondo;
  const texto = invertido ? marca.fondo : marca.texto;
  return `<!doctype html><html><head><meta charset="utf-8">
<style>
  html,body{margin:0;padding:0}
  body{width:${w}px;height:${h}px;background:${fondo};color:${texto};font-family:${marca.fuente};
       display:flex;flex-direction:column;justify-content:space-between;padding:96px;box-sizing:border-box;overflow:hidden}
  .kicker{font-size:34px;letter-spacing:.12em;text-transform:uppercase;color:${marca.acento};font-weight:700}
  h1{font-size:92px;line-height:1.02;margin:0;font-weight:800;letter-spacing:-.02em}
  h1.chica{font-size:72px}
  p.cuerpo{font-size:42px;line-height:1.3;margin:40px 0 0;max-width:860px}
  .nota{font-size:28px;opacity:.7;margin-top:24px}
  .pie{display:flex;justify-content:space-between;align-items:center;font-size:30px;opacity:.85}
  .barra{height:10px;width:160px;background:${marca.acento};border-radius:5px;margin-bottom:40px}
  .cita{font-size:70px;line-height:1.15;font-weight:700;margin:0}
  .cita:before{content:"\\201C";color:${marca.acento}}
  .cita:after{content:"\\201D";color:${marca.acento}}
  .autor{font-size:36px;margin-top:48px}
  .fuente{font-size:26px;opacity:.6;margin-top:8px}
  ol{margin:48px 0 0;padding:0;list-style:none;counter-reset:n}
  ol li{counter-increment:n;font-size:40px;line-height:1.25;margin:0 0 34px;padding-left:120px;position:relative}
  ol li:before{content:counter(n,decimal-leading-zero);position:absolute;left:0;top:-6px;font-size:52px;font-weight:800;color:${marca.acento}}
  .pag{font-variant-numeric:tabular-nums}
</style></head><body>${cuerpo}</body></html>`;
}

function slideCarrusel(marca, s, i, n) {
  const esPortada = i === 0;
  const esCierre = i === n - 1 && n > 1;
  const inv = esCierre; // última slide invertida: señal de cierre
  const cuerpo = `
    <div>
      <div class="barra"></div>
      ${s.kicker ? `<div class="kicker">${esc(s.kicker)}</div>` : ''}
      <h1 class="${esPortada ? '' : 'chica'}">${esc(s.titulo || '')}</h1>
      ${s.cuerpo ? `<p class="cuerpo">${esc(s.cuerpo)}</p>` : ''}
      ${s.nota ? `<div class="nota">${esc(s.nota)}</div>` : ''}
    </div>
    <div class="pie"><span>${esc(marca.firma)}</span><span class="pag">${i + 1} / ${n}</span></div>`;
  return base(marca, TAMANOS.carrusel.w, TAMANOS.carrusel.h, cuerpo, inv);
}

function slideCita(marca, c) {
  const cuerpo = `
    <div><div class="barra"></div></div>
    <div><p class="cita">${esc(c.texto || '')}</p>
      ${c.autor ? `<div class="autor">${esc(c.autor)}</div>` : ''}
      ${c.fuente ? `<div class="fuente">${esc(c.fuente)}</div>` : ''}</div>
    <div class="pie"><span>${esc(marca.firma)}</span><span></span></div>`;
  return base(marca, TAMANOS.cita.w, TAMANOS.cita.h, cuerpo);
}

function slidePortada(marca, s) {
  const cuerpo = `
    <div><div class="barra"></div>${s.kicker ? `<div class="kicker">${esc(s.kicker)}</div>` : ''}</div>
    <div><h1>${esc(s.titulo || '')}</h1>${s.cuerpo ? `<p class="cuerpo">${esc(s.cuerpo)}</p>` : ''}</div>
    <div class="pie"><span>${esc(marca.firma)}</span><span></span></div>`;
  return base(marca, TAMANOS.portada.w, TAMANOS.portada.h, cuerpo);
}

function slideInfografia(marca, spec) {
  const s = (spec.slides && spec.slides[0]) || {};
  const puntos = (spec.puntos || []).slice(0, 6).map((p) => `<li>${esc(p)}</li>`).join('');
  const cuerpo = `
    <div>
      <div class="barra"></div>
      ${s.kicker ? `<div class="kicker">${esc(s.kicker)}</div>` : ''}
      <h1 class="chica">${esc(s.titulo || '')}</h1>
      <ol>${puntos}</ol>
    </div>
    <div class="pie"><span>${esc(marca.firma)}</span><span>${esc(s.nota || '')}</span></div>`;
  return base(marca, TAMANOS.infografia.w, TAMANOS.infografia.h, cuerpo);
}

async function main() {
  const [specPath, outDirArg] = process.argv.slice(2);
  if (!specPath) {
    console.error('Uso: node scripts/visuales/render.js spec.json [carpeta-salida]');
    process.exit(1);
  }
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  const plantilla = spec.plantilla || 'carrusel';
  if (!TAMANOS[plantilla]) throw new Error(`Plantilla desconocida: ${plantilla}`);
  const marca = { ...MARCA_DEFECTO, ...(spec.marca || {}) };
  const outDir = outDirArg || path.join(process.cwd(), 'salida-visuales');
  fs.mkdirSync(outDir, { recursive: true });

  let paginas = [];
  if (plantilla === 'carrusel') {
    const slides = spec.slides || [];
    if (slides.length < 1) throw new Error('El carrusel necesita al menos una slide');
    if (slides.length > 10) throw new Error('Instagram y LinkedIn aceptan máximo 10 imágenes por carrusel');
    paginas = slides.map((s, i) => slideCarrusel(marca, s, i, slides.length));
  } else if (plantilla === 'cita') {
    paginas = [slideCita(marca, spec.cita || {})];
  } else if (plantilla === 'portada') {
    paginas = [slidePortada(marca, (spec.slides && spec.slides[0]) || {})];
  } else if (plantilla === 'infografia') {
    paginas = [slideInfografia(marca, spec)];
  }

  const { w, h } = TAMANOS[plantilla];
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const archivos = [];
  for (let i = 0; i < paginas.length; i++) {
    await page.setContent(paginas[i], { waitUntil: 'load' });
    const archivo = path.join(outDir, `${plantilla}-${String(i + 1).padStart(2, '0')}.png`);
    await page.screenshot({ path: archivo, type: 'png' });
    archivos.push(archivo);
  }
  await browser.close();

  const manifest = { plantilla, ancho: w, alto: h, archivos, generado: new Date().toISOString() };
  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(JSON.stringify(manifest, null, 2));
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
