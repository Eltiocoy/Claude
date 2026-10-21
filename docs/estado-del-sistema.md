# Estado del sistema de Adrián Coy

Actualizado: 21 de octubre de 2026. Lee esto primero en cualquier sesión nueva. El historial de chats anteriores no viaja; este archivo sí.

## Reglas de trabajo

- Voz, reglas de redacción y filtro de rigor: skill `criterio-adrian` (`.claude/skills/criterio-adrian/SKILL.md`). Es la fuente única.
- Agentes en `.claude/agents/`: `investigador`, `despliegue`, `auditor`, `analista-contenido`.
- Skill `refero-design` (diseño UI, landings, dashboards), instalada con `npx skills add https://github.com/referodesign/refero_skill` en `.agents/skills/refero-design` con symlink en `.claude/skills/`. Su descripción la pone por encima de otras skills de diseño: en ajustes chicos, pedirle que se salte la investigación. Refero entra por el conector de claude.ai (herramientas `mcp__refero__*`), que ya conecta también en Claude Code en la nube. Se quitó el `.mcp.json` del repo: duplicaba el conector y fallaba por red (403) y por falta de secreto. Al 21 de octubre el conector responde `NO_SUBSCRIPTION`: la suscripción de Refero no está activa (https://refero.design/mcp/upgrade). Decisión de Adrián (21 oct): no paga Refero. No volver a proponer el conector. La skill sigue instalada en el repo y en claude.ai; pendiente decidir si se quita para que no compita con `direccion-de-arte`.
- Para claude.ai, la app y Cowork: `docs/refero-design.zip` se sube en Settings → Capabilities, igual que `docs/criterio-adrian.zip`. Ahí solo funciona con sus referencias incluidas; el conector de Refero se agrega aparte en Settings → Connectors.
- Adrián pide honestidad dura: primero fallas y riesgos, cero elogios, nada inventado, números sin confirmar marcados.
- Cambios que afecten lo que se publica, el gasto o el modelo de una tarea: pedir autorización antes.
- Sin guiones largos en nada que se escriba para él.

## Tareas programadas (solo existen dos)

| Tarea | Id | Cuándo (CDMX) | Modelo |
|---|---|---|---|
| LinkedIn: borrador y auditoría independiente (L/M/V) | trig_01U3pAeHJeTYJv8EfW6rAbtX | Lun, mié y vie 6:47 | Sonnet 5.5 |
| LinkedIn: publicar aprobado (L/M/V) | trig_01L6XBRnjQUZwBZGVhZjHzKU | Lun, mié y vie 9:07 | Haiku 5.5 |

Función por día: lunes Lectura, miércoles Oficio, viernes Postura. Máximo un post publicado por día.

El Morning Briefing se borró el 17 de octubre porque no le funcionó a Adrián. El atajo de iPhone "Recordatorios Familia" ya no sirve y se puede borrar.

## Notion

- Base "Cola LinkedIn: aprobación", data source `collection://cbe4c588-d139-4ca6-b201-880574a0448a`.
- Flujo de Estado: Por auditar, Por revisar, (Adrián decide) Aprobado o Editar o Rechazado, Publicando, Publicado.
- Columnas que llena Adrián: Estado (para aprobar) y Comentarios clave (quién con poder de decisión comentó o escribió).
- "Publicado el" lo llena la tarea de publicación.
- Página "LinkedIn: material de oficio", id `3fb301c5-b325-81c8-8a69-e6fc97e010cf`. Adrián escribe viñetas bajo "Material". La tarea del miércoles usa la más antigua sin marca "(usado ...)". Si está vacía, el miércoles sale como Lectura. Nunca se inventa experiencia.

## Conectores y límites

- La opción de limitar conectores por tarea no existe en el plan de Adrián. Cada tarea arranca con unos 112,000 tokens fijos; quitar conectores globales bajó solo 4%.
- Lo que sí cambia el gasto: cuántas veces corre cada tarea, el modelo y el largo de las sesiones.
- Costos medidos el 16 de octubre: borrador 1.10 USD con auditor independiente; publicación 0.49 USD; publicación sin nada que hacer 0.43 USD.
- La red de las sesiones en la nube bloquea sitios de noticias y tododeia.com. Para tododeia se usa Perplexity con `search_domain_filter: ["tododeia.com"]`. Las tareas programadas sí llegan a los feeds.
- Metricool: conectado con Instagram, TikTok y YouTube. Falta ligar LinkedIn.
- vidIQ: Instagram conectado con métricas privadas. Quedan pocos créditos (el plan renueva 150 el 11 de noviembre).

## Pendientes abiertos

1. Cola de LinkedIn al 18 de octubre: dos posts aprobados esperando. Lunes 19 sale el de Markus Noder (Tipo Lectura, se corrigió el Tipo vacío); miércoles 21 sale el de Cal AI (Postura, auditor Revisar). Cerrado: la fila de Noder nació el 16 de octubre a las 6:00, antes del borrador de las 6:47, y su origen no se pudo determinar; el contenido está bien.
2. Campaña Buen Fin de Castillo: el auditor dio Revisar. Falta abrir las fuentes (Kantar 2024 o 2025, MOLEC 38% y 33%, Ofertia 55% y 87%), documentar de dónde salen 3,000 y 30,000 packs, y agregar tres debilidades que faltan (línea base, inventario del tomo 3, registro de socios que cierra el 12 de noviembre).
3. Revisión mensual de LinkedIn (qué temas atrajeron a quien contrata): vivía dentro del Briefing y se perdió. Se puede pedir al agente `analista-contenido` cuando haya al menos 4 posts con Comentarios clave.
4. Conectores: Adrián usa vidIQ, Goodnotes y Watch Any Video en sus chats, así que se quedan conectados. Ya desconectó Spotify, Superhuman, CV builder, Cloudflare, context_engenieering, Meta Ads, Figma, Miro, Consensus y Penlog.
5. Primera corrida de Haiku en publicación: lunes 19 de octubre, 9:07. Revisar que publicó bien.
6. Humanizalo (tododeia.com): sus marcas de texto generado ya están en la skill `criterio-adrian` y en el auditor.

## Lo que viene del sitio tododeia.com y aún no se usa

- Guía "3 servicios para armar tu agencia de IA": diagnóstico gratis del sitio del prospecto. Choca con el diagnóstico de $1,000 de We Create the Box; decide Adrián.
- Skill gratuita Ads Pro: solo cuando un cliente tenga pauta.
