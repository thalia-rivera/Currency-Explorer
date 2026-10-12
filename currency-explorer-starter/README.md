# Currency Explorer · Starter Project

## Integrantes
- Estudiante A: Thalia Yazmin Rivera López 
- Estudiante B: Sugey Guitierrez Calero

## Pair Programming
| Misión | Driver | Navigator | Commit / evidencia |
|---|---|---|---|
| 04 | Sugey Gutierrez| Thalia Rivera| Misión 04: Monedas dinámicas con selectores de origen y destino |
| 05 | Thalia Rivera | Sugey Gutierrez | Mision 05: Conversion completa, integrar y dar formato legible al resultado |
| 06 | Sugey Gutierrez| Sugey Gutierrez | Misión 6: Botón para intercambiar monedas y recalcular |
| 07 | Thalia Rivera| Sugey Gutierrez | Misión 7: Validar todos los posibles casos de datos ingresados no validos |
| 08 | Sugey Gutiérrez| Thalia Rivera |Misión 08: Estado de carga y botones deshabilitados durante la consulta |
| 09 | Thalia Rivera|Sugey Gutierrez |Mision 09: Manejo de errores con response.ok y try/catch |
<<<<<<< HEAD
| 10 | Sugey Gutierrez| Thalia Rivera| Misión 10: Diseño responsive, selectores apilados en móvil y controles táctiles|
=======
| 10 | Sugey Guitierrez | Thalia Rivera |Misión 10: Diseño responsive, selectores apilados en móvil y controles táctiles  |
| 11 | Thalia Rivera| Sugey Gutierrez |Misión 11: Grafica con datos historicos  |
>>>>>>> 81eae554ac0c5f8aa8c602c6370e98d371af8957

## Objetivo
Completar una aplicación frontend que consuma Frankfurter API para convertir divisas y demostrar comprensión de eventos, DOM, `fetch()`, JSON, asincronía, validación y manejo de errores.

## Ejecución
1. Descomprime el proyecto.
2. Abre la carpeta en VS Code.
3. Ejecuta `index.html` con Live Server o un servidor local equivalente.
4. Abre DevTools → Console y Network para observar el comportamiento.

## API
Endpoint de referencia:
`https://api.frankfurter.dev/v2/rate/{origen}/{destino}`

## Decisiones técnicas
Registra aquí al menos dos decisiones tomadas por la pareja y explica por qué.

1. Separamos la validación en una función `validarEntrada()`.
   Necesitamos validar la cantidad y las monedas porque el usuario puede escribir
   datos que no se pueden convertir. La pusimos en una función aparte, y no dentro
   de `convertirMoneda()`, porque así cada función tiene una sola responsabilidad:
   una valida y la otra consulta la API y muestra el resultado. Además, devuelve
   `null` si hay error, lo que permite a `convertirMoneda()` detenerse con un
   solo `if`, y facilita probar los casos por separado.

2. Desidimos que convertir a la misma monera no tiene sentido y la API puede responder con error, así
  que lo validamos antes de hacer la petición para no gastar una consulta.

3. Después de intercambiar las monedas, el resultado anterior ya no era
   correcto. Por eso `intercambiarMonedas()` llama a `convertirMoneda()`, y
   el usuario ve el resultado actualizado sin dar otro clic, lo decidimos para que tuviera mayor comodidad. 
   
4. Nos dimos cuenta de que no es lo mismo que falle el internet a que la
   moneda sea inválida, así que en el `catch` mostramos un mensaje diferente
   para cada caso. Así el usuario sabe qué pasó y qué puede hacer. Esto da mayor manejo 
   en los posibles errores que se presenten al usuario.
<<<<<<< HEAD
   
3. Definimos una altura mínima de 48px en campos y botones.
   Necesitamos que los controles se puedan tocar con el dedo sin errores porque en
   el celular la precisión es menor que con el mouse. Usamos `min-height: 48px` en
   `input`, `select` y `.primary`, y no un `padding` mayor, porque así la altura
   queda garantizada aunque cambie el tamaño del texto.

4. Reutilizamos el CSS existente en lugar de reescribirlo.
   Necesitamos cumplir el diseño responsive sin romper lo que ya funcionaba, porque
   la tarjeta ya usaba `width: min(720px, 100%)` y el título `clamp()`, que se
   adaptan solos. Por eso solo reemplazamos el `@media` y agregamos los estilos que
   faltaban, como el estado deshabilitado de `.swap` durante la consulta de la
   Misión 8.
=======

5. Usamos el elemento `<canvas>` La API nos devuelve varios registros (uno por mes), y con `map()` los
   separamos en dos arreglos: uno con las fechas y otro con las tasas. Luego
   calculamos la posición de cada punto usando el valor mínimo y el máximo,
   para que la línea use todo el espacio. 

6. En un momento Git rechazó nuestro push porque la otra persona había subido
   cambios. Entendimos que había que traer sus cambios primero, y desde
   entonces nos avisamos quién edita `code.js` para evitar choques, aunque de todos mdoos tuvimos algunos
   inconvenientes


>>>>>>> 81eae554ac0c5f8aa8c602c6370e98d371af8957

## Revisión cruzada
- Aspecto bien resuelto: 
- Error o comportamiento mejorable:
- Propuesta de mejora:
- Cambio incorporado después de la revisión:

## Reflexión final (150–200 palabras)
Explica el principal aprendizaje técnico, una dificultad relevante y una decisión que haya surgido del trabajo Driver/Navigator.
