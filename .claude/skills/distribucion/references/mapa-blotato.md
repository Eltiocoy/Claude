# Mapa: qué dice hacer Blotato y con qué se sustituye

Fecha de corte: 24 de octubre de 2026. Fuentes: blotato.com (home, pricing, mcp, claude) y help.blotato.com/start-with-an-ai-agent/llm (documentación completa de API, leída entera). Los datos de Blotato pueden cambiar.

## 1. Qué es Blotato

Un API REST (`backend.blotato.com/v2`) y un servidor MCP (`mcp.blotato.com/mcp`, 35 herramientas) que publican en X, LinkedIn, Facebook, Instagram, TikTok, YouTube, Threads, Bluesky y Pinterest, más generación de visuales por plantilla, extracción de fuentes, comentarios y DMs en Instagram y Facebook, automatizaciones de DM por palabra clave y analítica en 8 redes (LinkedIn no). Precio: Starter 29 USD al mes (20 cuentas, 1,250 créditos), Creator 97 USD (40 cuentas, 5,000 créditos), Agency 499 USD. El trial no incluye API ni MCP: generar la llave activa el cobro.

Lo que vende de verdad: no tener que registrar una app de desarrollador por red ni mantener tokens OAuth. Eso aquí ya lo resuelven Metricool, Make y Buffer.

## 2. Capacidad por capacidad

| # | Blotato | Equivalente propio | Estado | Hueco |
|---|---|---|---|---|
| 1 | Cuentas (`list_accounts`, subcuentas, boards de Pinterest) | Metricool `getBrandSettings` (marca 7457864: IG tiocoy, TikTok tio_coy, YouTube UCCkYZ77Y24DTlCERmwv4Acw). LinkedIn y YouTube también en Make. Buffer en Make (conexión 11710583) | Funciona | Falta ligar LinkedIn, Threads, X, Facebook, Bluesky y Pinterest en Metricool si se quieren |
| 2 | `create_post` con texto, medios, target por red, `scheduledTime` | Metricool `createScheduledPost` con `providers`, `media`, `networkData` por red y `publicationDate` con zona. Devuelve `plannerUrl` | Funciona (probado en lectura; escritura no se probó para no dejar borradores) | Metricool no tiene borrar post por MCP, solo `updateScheduledPost` |
| 3 | `get_post_status`, `list_posts` | Metricool `getScheduledPosts` (solo futuros). Publicados: Notion `Resultado` y `URLs publicadas` | Parcial | No hay "estado de envío" por pieza; se infiere por calendario y por Notion |
| 4 | Slots recurrentes y `next-available` | Metricool `getBestTimeToPostByNetwork` (valores por día y hora) + `getScheduledPosts` para evitar choques | Funciona | Sin slots guardados; la receta los calcula cada vez |
| 5 | `create_source`: youtube, tiktok (solo subtítulos en inglés), article, pdf, audio, twitter, text, perplexity-query | Watch Any Video (YouTube, Drive, Dropbox, subida; entiende español y devuelve marcas de tiempo), Firecrawl (artículo, PDF, X si es público), Perplexity (`perplexity_ask`, `perplexity_research`), vidIQ `video_transcript` (5 créditos), Gmail y Drive para material propio. Audio: Fal speech-to-text con costo | Funciona | Watch Any Video pasa a pago el 1 de noviembre (60 USD al año). TikTok por URL: Watch Any Video solo si el enlace es descargable; si no, vidIQ `watch_shortform_content` |
| 6 | `create_visual` con plantillas: carrusel de Instagram, carrusel tutorial, tarjeta de cita, tarjeta de tuit, slideshow, infografías (pizarrón, periódico, etc.), video con voz IA, selfie parlante, avatar con B-roll | `scripts/visuales/render.js` (carrusel, cita, portada, infografía; gratis, probado). Canva (`generate-design`, `resize-design`, `export-design`). Fal (imagen: nano-banana, flux; video: kling, veo; voz: ElevenLabs, MiniMax; avatar: `talking-avatar`, `lip-sync`). Remotion y ffmpeg para video programático. vidIQ `generate_video`, `generate_thumbnail` (sin créditos hasta el 11 de noviembre). OpusClip (clips de video largo; plan PRO con API, sin cuentas sociales ligadas) | Funciona con costo variable | Las "infografías con estilo" (pizarrón, grafiti) son prompts de imagen: se replican con nano-banana-pro a 0.15 USD cada una. No hay "modelo afinado en posts virales"; se decide no replicarlo |
| 7 | Subida de medios (presigned URL) | Google Drive `create_file` con base64 por conector (probado con PNG) y Drive ligado en Metricool; Notion `Arte PNG` para LinkedIn vía Make; Cloudinary o R2 para video | Parcial | La red de la nube bloquea subidas directas a fal.media y api.notion.com. Desde el chat de escritorio sí funcionan |
| 8 | Comentarios IG y FB (`list_comments`, `post_comment`) | YouTube: vidIQ `video_comments`, `generate_comment_replies`, `reply_to_comment`; Make `youtube` (watchNewComments, replyToAComment). IG: Make `instagram-business` (NewComment, listMediaComments, CreateComment). FB: Make `facebook-pages` (WatchComments, CreateComment) | Parcial | IG y FB solo desde Make, no desde Claude. Hay que construir el escenario |
| 9 | DMs IG y FB (`send_message`, conversaciones) | Ningún conector actual envía DMs de Instagram. Make tiene apps de terceros (`instant-dm`, `sendpulse`) con poca adopción | No existe | Hueco real. Requiere app de Meta con permiso `instagram_manage_messages` y revisión, o un tercero (ManyChat). Solo vale si Adrián corre embudos de leads por DM |
| 10 | Automatizaciones "comenta X, recibe DM" con follow gate, email gate y webhook | No existe | No existe | Mismo hueco que 9. Alternativa parcial sin DM: responder el comentario con el enlace (Make `instagram-business` CreateComment) |
| 11 | Analítica: top posts, métricas por post con historial, resumen por plataforma; 8 redes, LinkedIn no | Metricool (`getAnalyticsAvailableMetrics`, `getAnalyticsDataByMetrics`; incluye LinkedIn con 100+ métricas cuando se ligue), vidIQ (`channel_analytics`, `video_stats`, `instagram_owner_insights`), agente `analista-contenido` | Funciona | Metricool puede congelar una pieza en la primera sincronización (ver estado del sistema). Sin historial por snapshot como Blotato; se guarda a mano en Notion si hace falta |
| 12 | Créditos (`get_credits`, compra) | Fal `check_account_status` y `get_pricing`; vidIQ `balance`; Watch Any Video `my_usage` | Funciona | |
| 13 | Interfaz: MCP en Claude, REST, nodos n8n y Make | Claude Code con conectores (esto), Make para lo que corre solo, tareas programadas de Claude para lo que necesita criterio | Funciona | n8n no se usa |
| 14 | Flujo de aprobación (testimonio: Claude escribe en Notion, humano aprueba, Blotato publica, URL de vuelta) | Ya existe para LinkedIn y para videos. Nueva cola multicanal creada hoy | Funciona | La tarea programada de la cola multicanal no está creada: cuesta dinero por corrida y requiere autorización |

## 3. Lo que Blotato hace mejor y no se replica

1. **DMs y automatizaciones de DM en Instagram y Facebook.** Es su diferencial técnico real. No hay conector. Decisión: no replicar hasta que haya un embudo que lo justifique.
2. **Un solo endpoint para 9 redes con tokens mantenidos.** Aquí son tres rutas (Metricool, Make nativo, Buffer vía Make). Funciona, pero cada ruta tiene su forma de fallar.
3. **Polling con estados claros por envío.** Metricool devuelve `plannerUrl` y punto. El estado final se confirma leyendo el calendario o la red.

## 4. Lo que aquí es mejor

1. Transcripción en español (Watch Any Video) frente a subtítulos solo en inglés.
2. Métricas de LinkedIn (Metricool) frente a ninguna.
3. Voz y rigor propios (`criterio-adrian`, `auditor`) frente a "modelo afinado en posts virales".
4. Visuales sin créditos (`render.js`) y control total del sistema visual.
5. Google Business Profile como décima red en Metricool.
6. Sin cuota mensual nueva. Blotato serían 348 USD al año en Starter.

## 5. Notas de la API de Blotato que sirven de referencia de diseño

- Forma de `POST /v2/posts`: `post.accountId`, `post.content.{text, mediaUrls, platform, additionalPosts}`, `post.target.{targetType, ...}`, `scheduledTime` o `useNextFreeSlot` al nivel raíz. La cola multicanal copia esa separación: texto, medios, redes, fecha.
- Requisitos por red que también aplican en Metricool: Instagram carrusel 2 a 10 imágenes; TikTok un solo video y campos de privacidad, comentarios, dueto, stitch y contenido comercial; YouTube título máximo 100 caracteres y privacidad; Pinterest board obligatorio; Threads un medio por post; Bluesky 300 caracteres y hasta 4 imágenes; LinkedIn 2 a 10 imágenes se vuelven documento PDF (Metricool: `publishImagesAsPDF`).
- Límites de Blotato: 30 posts por minuto, Starter máximo 3 cuentas TikTok por 24 h, conversión automática solo para videos de 120 s o menos, MP4 H.264 + AAC.
- Sources: video sin subtítulos o no inglés devuelve `failed`. Aquí no pasa.
- Plantillas de visual: `inputs` por plantilla (`slides`, `slidePrompts`, `scenes`, `quotes`); la consulta es gratis y la generación cobra créditos. `render.js` usa el mismo contrato: un JSON con `slides`, `cita` o `puntos`.
