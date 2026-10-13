# 9. Nota de uso de IA

**Herramientas.** En esta entrega usamos principalmente **Claude** (Anthropic). Durante el diseño inicial del proyecto también consultamos **ChatGPT** y **Gemini** (ver la Entrega 2).

**Para qué partes de la entrega se usó.**

| Parte | Cómo se usó la IA | Qué hizo el equipo |
|---|---|---|
| Diagramas (sección 1) | Generó los archivos `.drawio` de clases, C4 nivel 2 y C4 nivel 3, y completó las conexiones del diagrama de casos de uso a partir de nuestro archivo | Definimos los modelos, elegimos qué diagramas hacer, pedimos incluir `include` y `extend` según la rúbrica y revisamos que coincidieran con el backlog |
| ADR y matriz de decisión (secciones 2 y 3) | Redactó borradores y propuso criterios y puntajes | Elegimos el stack y debemos confirmar los puntajes de «lo que el equipo ya sabe» |
| Prototipo (sección 5) | Escribió el código HTML, CSS y JavaScript | Pedimos que fuera código HTML, que la paleta fuera más cálida y que el login tuviera una imagen interactiva; elegimos los módulos y probamos la demostración |
| Plan de pruebas y pruebas automáticas (sección 4) | Escribió las 28 pruebas y el pipeline de CI, y las ejecutó en su entorno | Las ejecutamos con `npm test` y comprobamos el pipeline en GitHub antes de entregar |
| Deuda técnica, riesgos y trazabilidad (secciones 6, 7 y 8) | Propuso clasificaciones, costos y la tabla a partir de nuestros documentos y del código | Aportamos la matriz de riesgos de la semana 8 y validamos qué riesgos se cerraron o se materializaron |
| Documento consolidado (sección 10) | Armó el PDF y los archivos fuente | Revisamos el contenido completo |

**Qué modificó el equipo del resultado generado.** Cambiamos la paleta de colores a tonos cálidos, pedimos la ilustración interactiva del login, exigimos que la entrega incluyera el código HTML y la relación `include`/`extend`, y corregimos el alcance del prototipo (página web con proyección a la app). Al escribir las pruebas se encontraron cuatro defectos del código generado por la IA (sección 4.4), que se corrigieron.

**Cómo se controló la calidad.** Ningún texto o código se aceptó sin revisión: las decisiones de arquitectura se contrastaron con el backlog y con los diagramas, las pruebas automáticas verifican el comportamiento del prototipo, y los puntajes y estimaciones que la IA propuso están marcados para confirmación del equipo.
