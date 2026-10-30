# Estado del sistema de Adrián Coy

Actualizado: 30 de octubre de 2026. Lee esto primero en cualquier sesión nueva. El historial de chats anteriores no viaja; este archivo sí.

## Reglas de trabajo

- Voz, reglas de redacción y filtro de rigor: skill `criterio-adrian` (`.claude/skills/criterio-adrian/SKILL.md`). Es la fuente única.
- Agentes en `.claude/agents/`: `investigador`, `despliegue`, `auditor`, `analista-contenido`, `publicador`.
- Distribución (el equivalente casero de Blotato): skill `distribucion` (`.claude/skills/distribucion/SKILL.md`). Mapa de capacidades, huecos y costos en `references/mapa-blotato.md`; recetas en `references/recetas.md`. Visuales sin créditos con `scripts/visuales/render.js`.
- Refero descartado (21 oct): la skill `refero-design` se quitó del repo y el conector exige suscripción de pago. No volver a proponerlo. Si sigue subida en claude.ai, Adrián la borra en Settings → Capabilities.
- Adrián pide honestidad dura: primero fallas y riesgos, cero elogios, nada inventado, números sin confirmar marcados.
- Cambios que afecten lo que se publica, el gasto o el modelo de una tarea: pedir autorización antes.
- Sin guiones largos en nada que se escriba para él.

## Tareas programadas (solo existen dos)

| Tarea | Id | Cuándo (CDMX) | Modelo |
|---|---|---|---|
| LinkedIn: borrador y auditoría independiente (L/M/V) | trig_01U3pAeHJeTYJv8EfW6rAbtX | Lun, mié y vie 6:47 | Sonnet 5.5 |
| LinkedIn: publicar aprobado (L/M/V) | trig_01L6XBRnjQUZwBZGVhZjHzKU | PAUSADA el 30 oct | Haiku 5.5 |

Función por día: lunes Lectura, miércoles Oficio, viernes Postura. Máximo un post publicado por día.

Desde el 30 de octubre el único publicador de LinkedIn es Make 6641104 (gratis, toma "Arte PNG", 1 post por día). La tarea de Haiku quedó pausada, no borrada: se reactiva si Make falla.

El Morning Briefing se borró el 17 de octubre porque no le funcionó a Adrián. El atajo de iPhone "Recordatorios Familia" ya no sirve y se puede borrar.

## Automatizaciones de publicación que ya existen (Make, equipo 3168340)

- LinkedIn: escenario 6618791 (lo ejecuta la tarea de las 9:07) y 6641104 "LinkedIn autoridad 3" como respaldo cada hora en ventanas de 9 y 13 h, L/Mi/J/V, con el PNG de "Arte PNG".
- Videos: base "Videos terminados" (`collection://aa0d28f5-0a84-4bb2-be5c-0abac71706b1`). Escenario 6636364 cada 2 h publica YouTube Shorts (nativo) y TikTok e Instagram Reels por Buffer (conexión API 11710583); comenta en YouTube; 6646844 trae las URLs. Exige "Enlace del video" público y permanente (Cloudinary o R2).
- Producción IA: 6712495 y 6712489 mandan briefs a fal y reciben el resultado en Notion.
- Rancho Fortuna y WCTB: escenarios de WhatsApp y formularios, fuera de este sistema.

## Notion

- Base "Cola LinkedIn: aprobación", data source `collection://cbe4c588-d139-4ca6-b201-880574a0448a`.
- Flujo de Estado: Por auditar, Por revisar, (Adrián decide) Aprobado o Editar o Rechazado, Publicando, Publicado.
- Columnas que llena Adrián: Estado (para aprobar) y Comentarios clave (quién con poder de decisión comentó o escribió).
- "Publicado el" lo llena la tarea de publicación.
- Base "Cola multicanal: aprobación", data source `collection://be0d6578-a5bf-475c-9895-8089749652fb`, creada el 24 de octubre como página privada. Misma lógica de Estado. La programa el agente `publicador` en Metricool desde el chat. La tarea programada diaria no está creada: su prompt está en la receta 10 de `distribucion` y crearla cuesta 0.4 a 0.5 USD por corrida; decide Adrián.
- Página "LinkedIn: material de oficio", id `3fb301c5-b325-81c8-8a69-e6fc97e010cf`. Adrián escribe viñetas bajo "Material". La tarea del miércoles usa la más antigua sin marca "(usado ...)". Si está vacía, el miércoles sale como Lectura. Nunca se inventa experiencia.

## Conectores y límites

- La opción de limitar conectores por tarea no existe en el plan de Adrián. Cada tarea arranca con unos 112,000 tokens fijos; quitar conectores globales bajó solo 4%.
- Lo que sí cambia el gasto: cuántas veces corre cada tarea, el modelo y el largo de las sesiones.
- Costos medidos el 16 de octubre: borrador 1.10 USD con auditor independiente; publicación 0.49 USD; publicación sin nada que hacer 0.43 USD.
- La red de las sesiones en la nube bloquea sitios de noticias y tododeia.com. Para tododeia se usa Perplexity con `search_domain_filter: ["tododeia.com"]`. Las tareas programadas sí llegan a los feeds.
- Metricool: marca 7457864 (tiocoy), zona America/Mexico_City, conectada con Instagram, TikTok y YouTube. Falta ligar LinkedIn (sí tiene métricas de LinkedIn, Blotato no). Threads, X, Facebook, Bluesky y Pinterest se ligan desde la app si se quieren. Calendario vacío al 24 de octubre. Mejor hora Instagram según Metricool: miércoles a viernes de 10 a 12 h.
- Red de la nube: bloquea subidas directas por curl a fal.media y api.notion.com. Para hospedar un PNG desde una tarea se usa Google Drive por conector (probado) con Drive ligado en Metricool, o Adrián lo sube desde el chat de escritorio.
- Fal: cuenta activa sin bloqueo de cobro. Precios del 24 de octubre: nano-banana-pro 0.15 USD por imagen, flux schnell 0.003 USD por megapíxel, kling 2.5 turbo 0.07 USD por segundo, veo3 fast 0.15 USD por segundo, ElevenLabs 0.05 USD por mil caracteres.
- Watch Any Video: 30 de 60 minutos gratis usados; pasa a solo pago el 1 de noviembre (60 USD al año o 8 al mes). Sustituto gratis probado el 30 oct: la skill `watch-video` NO sirve en la nube (YouTube bloqueado por la red, 403). Para solo transcripción de YouTube usar vidIQ (`vidiq_video_transcript`) cuando renueve créditos; para análisis visual, `watch-video` en Claude de escritorio o pagar 8 USD solo el mes que se necesite.
- OpusClip: plan PRO con API, sin cuentas sociales ligadas. Buffer: ligado en Make (TikTok e Instagram), plan desconocido.
- Composio: se probó el 18 al 21 de octubre y se quitó. Daba lo mismo que Metricool por pieza y no da seguidores ganados por Reel (Meta no lo permite). Conexión de Instagram borrada; skill `composio` queda instalada en `.agents/skills/composio` por si se retoma. Instagram por pieza se lee con Metricool, que puede congelar una pieza en su primera sincronización: el Reel DeupW8SFJnG seguía 58% abajo de Instagram 52 horas después, causa desconocida. Las piezas que definan una conclusión se contrastan con la app de Instagram o con vidIQ. Conversión (seguidores por 1,000 vistas) por pieza no es medible; solo estimación a nivel cuenta.
- vidIQ: Instagram conectado con métricas privadas. 0 créditos al 24 de octubre; el plan renueva 150 el 11 de noviembre.

## Revisión del 30 de octubre

- Cola LinkedIn: cero filas en Aprobado. Todo lo aprobado ya salió. Pendientes 1 y 5 de abajo quedan cerrados.
- Choque de reglas resuelto: Make 6641104 se había editado el 28 de octubre para publicar hasta 2 por día y salieron 2 posts el 22, el 26 y el 28. Se regresó a 1 por día (filtro "Nada publicado hoy"); la ventana de 13 h queda como reintento. Razón: con 3 borradores por semana, 2 por día solo deja días vacíos y pone a competir dos posts el mismo día.
- Doble publicador resuelto: la tarea de Haiku de las 9:07 llegaba después de Make y además exportaba desde "Arte Canva", regla vieja. Quedó pausada.
- La tarea pausada aún carga Miro, Penlog, Spotify, Superhuman, CV builder, Cloudflare, Meta Ads, Figma y context_engenieering: los conectores se guardaron al crearla y desconectarlos en claude.ai no los quitó de ahí.
- Fila vacía en la cola LinkedIn creada el 13 de octubre (sin Tema ni Estado). Se puede borrar.
- Sesiones en la nube: la red bloquea (403) los MCP de los plugins Adobe, Canva, Ahrefs, Amplitude, Figma, HubSpot, Klaviyo, Notion, Similarweb, Slack y Supermetrics. Los conectores directos de Adobe, Canva, Notion y Figma sí funcionan. Para abrir los plugins se agregan sus hosts en Network access del entorno.
- `render.js` ahora detecta texto cortado y sale con código 2.

## Pendientes abiertos

1. Cerrado el 30 de octubre (ver arriba).
2. Campaña Buen Fin de Castillo: el auditor dio Revisar. Falta abrir las fuentes (Kantar 2024 o 2025, MOLEC 38% y 33%, Ofertia 55% y 87%), documentar de dónde salen 3,000 y 30,000 packs, y agregar tres debilidades que faltan (línea base, inventario del tomo 3, registro de socios que cierra el 12 de noviembre).
3. Revisión mensual de LinkedIn (qué temas atrajeron a quien contrata): vivía dentro del Briefing y se perdió. Se puede pedir al agente `analista-contenido` cuando haya al menos 4 posts con Comentarios clave.
4. Conectores: Adrián usa vidIQ, Goodnotes y Watch Any Video en sus chats, así que se quedan conectados. Ya desconectó Spotify, Superhuman, CV builder, Cloudflare, context_engenieering, Meta Ads, Figma, Miro, Consensus y Penlog.
5. Cerrado el 30 de octubre: la última corrida (28 de octubre) terminó sin error. Ver "doble publicador" arriba.
6. Blotato: se decidió no contratarlo (29 USD al mes). Lo único que hace y aquí no existe: DMs y automatizaciones de DM en Instagram y Facebook. Si Adrián corre un embudo por DM, se revisa (ManyChat o app propia de Meta).
7. Humanizalo (tododeia.com): sus marcas de texto generado ya están en la skill `criterio-adrian` y en el auditor.

## Lo que viene del sitio tododeia.com y aún no se usa

- Guía "3 servicios para armar tu agencia de IA": diagnóstico gratis del sitio del prospecto. Choca con el diagnóstico de $1,000 de We Create the Box; decide Adrián.
- Skill gratuita Ads Pro: solo cuando un cliente tenga pauta.
