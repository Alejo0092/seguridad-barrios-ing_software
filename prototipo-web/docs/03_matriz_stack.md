# 3. Matriz de decisión del stack

Se evaluaron **tres opciones para el frontend y tres para el backend** con cinco criterios, calificados de 1 (muy bajo) a 5 (muy alto). El criterio **«Lo que el equipo ya sabe» pesa el doble** (peso 2) porque con un equipo de dos personas y poco tiempo el dominio previo reduce el riesgo de cronograma. El puntaje máximo es 5 × 6 = 30.

## 3.1 Frontend

| Criterio | Peso | React | Vue 3 | Angular |
|---|---|---|---|---|
| Lo que el equipo ya sabe | 2 | 4 | 3 | 2 |
| Soporte de tiempo real (WebSocket / streaming) | 1 | 4 | 4 | 4 |
| Ecosistema y documentación | 1 | 5 | 4 | 4 |
| Facilidad de despliegue (Docker / CI) | 1 | 4 | 4 | 3 |
| Rendimiento y escalabilidad | 1 | 4 | 4 | 4 |
| **Total ponderado (máx. 30)** | 6 | **25** | **22** | **19** |

**Ganadora: React (25/30).** Segunda mejor opción: **Vue 3 (22/30)**.

**Razones del descarte de Vue 3.**
1. **Menor dominio del equipo:** pesa el doble en la matriz y su curva de aprendizaje (plantillas, Pinia) pone en riesgo el cronograma.
2. **Menos recursos para nuestro caso:** hay menos ejemplos y librerías de terceros para mapas y video en tiempo real que en React.

## 3.2 Backend

| Criterio | Peso | Node.js (Express) | Python (FastAPI) | Java (Spring Boot) |
|---|---|---|---|---|
| Lo que el equipo ya sabe | 2 | 4 | 3 | 2 |
| Soporte de tiempo real (WebSocket / streaming) | 1 | 5 | 4 | 4 |
| Ecosistema y documentación | 1 | 5 | 4 | 5 |
| Facilidad de despliegue (Docker / CI) | 1 | 5 | 4 | 3 |
| Rendimiento y escalabilidad | 1 | 4 | 4 | 5 |
| **Total ponderado (máx. 30)** | 6 | **27** | **22** | **21** |

**Ganadora: Node.js con Express (27/30).** Segunda mejor opción: **Python con FastAPI (22/30)**.

**Razones del descarte de FastAPI.**
1. **Menor dominio del equipo**, con el mismo efecto sobre el cronograma que en el frontend.
2. **No comparte lenguaje con React:** obliga a duplicar modelos y validaciones entre frontend y backend, y a manejar dos entornos de desarrollo.

> **Nota sobre los puntajes.** Las calificaciones del criterio «Lo que el equipo ya sabe» son una estimación inicial y deben ser confirmadas por los integrantes. En el archivo `Matriz_Decision_Stack.xlsx` esas celdas están resaltadas y los totales se recalculan solos al cambiarlas. Con los puntajes actuales, el orden no cambiaría aunque React o Node.js perdieran 2 puntos en ese criterio.
