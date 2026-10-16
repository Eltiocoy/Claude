# Repo de trabajo de Adrián Coy

- Para escribir o revisar cualquier texto, carga la skill `criterio-adrian`.
- Subagentes en `.claude/agents/`:
  - `investigador`: tabla Dato | Fuente | Bandera con verificación contra la fuente original.
  - `despliegue`: convierte un concepto ya aprobado en piezas por canal. Nunca propone conceptos.
  - `auditor`: revisión independiente antes de entregar. Corre sobre el documento final, no en la misma pasada que lo redactó.
  - `analista-contenido`: métricas de YouTube, Instagram, TikTok y LinkedIn convertidas en insights con prueba. Parte de una pregunta de negocio.
- Orden típico de un entregable: investigador, redacción (Adrián y Claude), despliegue si aplica, auditor.
