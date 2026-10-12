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
| 10 | Sugey Gutierrez| Thalia Rivera| Misión 10: Diseño responsive, selectores apilados en móvil y controles táctiles|
| 11 | Thalia Rivera| Sugey Gutierrez |Misión 11: Grafica con datos historicos  |

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

2. Desidimos que convertir a la misma moneda no tiene sentido y la API puede responder con error, así
  que lo validamos antes de hacer la petición para no gastar una consulta.

3. Después de intercambiar las monedas, el resultado anterior ya no era
   correcto. Por eso `intercambiarMonedas()` llama a `convertirMoneda()`, y
   el usuario ve el resultado actualizado sin dar otro clic, lo decidimos para que tuviera mayor comodidad. 
   
4. Nos dimos cuenta de que no es lo mismo que falle el internet a que la
   moneda sea inválida, así que en el `catch` mostramos un mensaje diferente
   para cada caso. Así el usuario sabe qué pasó y qué puede hacer. Esto da mayor manejo 
   en los posibles errores que se presenten al usuario.
   
5. Definimos una altura mínima de 48px en campos y botones.
   Necesitamos que los controles se puedan tocar con el dedo sin errores porque en
   el celular la precisión es menor que con el mouse. Usamos `min-height: 48px` en
   `input`, `select` y `.primary`, y no un `padding` mayor, porque así la altura
   queda garantizada aunque cambie el tamaño del texto.

6. Reutilizamos el CSS existente en lugar de reescribirlo.
   Necesitamos cumplir el diseño responsive sin romper lo que ya funcionaba, porque
   la tarjeta ya usaba `width: min(720px, 100%)` y el título `clamp()`, que se
   adaptan solos. Por eso solo reemplazamos el `@media` y agregamos los estilos que
   faltaban, como el estado deshabilitado de `.swap` durante la consulta de la
   Misión 8.

7. Usamos el elemento `<canvas>` La API nos devuelve varios registros (uno por mes), y con `map()` los
   separamos en dos arreglos: uno con las fechas y otro con las tasas. Luego
   calculamos la posición de cada punto usando el valor mínimo y el máximo,
   para que la línea use todo el espacio. 

8. En un momento Git rechazó nuestro push porque la otra persona había subido
   cambios. Entendimos que había que traer sus cambios primero, y desde
   entonces nos avisamos quién edita `code.js` para evitar choques, aunque de todos mdoos tuvimos algunos
   inconvenientes



## Revisión cruzada
### Sugey - Thalia (Misiones 01, 03, 05, 07, 09 y 11)
- Aspecto bien resuelto: La validación de la Misión 07 quedó en una función
   aparte, validarEntrada(), y cada caso (vacío, cero, negativo, misma moneda)
   muestra un mensaje distinto sin romper la interfaz. En la Misión 05 el
   resultado se formatea con toLocaleString("es-MX") y dos decimales, así que
   se lee claro con separador de miles. En la Misión 11 la gráfica del histórico
   se dibuja con los datos reales de la API. Las Misiones 01 y 03 dejaron bien
   documentada la verificación en consola, y eso ayudó a entender la estructura
   del JSON antes de pasarlo a la pantalla.
- Error o comportamiento mejorable: Al probar el modo Offline, la pantalla
   se quedaba en "Esperando consulta..." y la Console mostraba "Uncaught (in
   promise) TypeError: Failed to fetch". El catch no atrapaba el error porque
   la comprobación de response.ok y un segundo fetch habían quedado dentro
   del catch, y las llaves del try/catch estaban mal cerradas. Además, el
   mismo mensaje genérico aparecía para cualquier fallo, sin distinguir entre
   falta de conexión y un error del servidor.
- Propuesta de mejora: Dejar un solo fetch dentro del try, con
   if (!respuesta.ok) justo después, y que el catch solo elija el mensaje
   según el tipo de error (sin conexión, error de la API u otro). Revisar la
   Console después de cada merge, antes de hacer push.
- Cambio incorporado después de la revisión: Después volvimos a probar en Offline y ya aparece el
   mensaje de falta de conexión. Además, los botones se vuelven a habilitar en
   el bloque finally, así que no quedan bloqueados tras un fallo.

  ### Thalia - Sugey (Misiones 02, 04, 06, 08 y 10)
- Aspecto bien resuelto: Los selectores de origen y destino que cumplen la Misión 04
   hacen que la URL dependa de lo que elige el usuario y funciona de forma correcta, el botón que
   intercambia las monedas y recalcula solo es muy util para que el usuario no tenga que volver
   a hacer click en el boton convertir. El estado de carga de la Misión 08 muestra "Consultando..."
   y desactiva los botones mientras se espera
- Error o comportamiento mejorable: Hubo un error con el boton de intercambio de moneda
   cuando intente probarlo no respondia con la accion que deberia asi porque no ejecutaba la
   accion de cambiar las monedas, si no que enviaba un mensaje, al integrar el estado de carga en
   `convertirMoneda()`, el bloque `try/catch` quedó mal cerrado y el botón
   Convertir dejó de responder.
- **Propuesta de mejora:** Revisar siempre en la Console que no haya errores
   de sintaxis antes de hacer commit, y probar cada botón después de pegar
   código nuevo., ya que tam bien eso nos causo conflictos porque el codigo se actualizo con errores.
- **Cambio incorporado después de la revisión:** Sugey corrigió las llaves
   del `try/catch` en `convertirMoneda()` (commit "Corrijo llaves del
   try/catch en convertirMoneda"), y después de eso el botón Convertir
   volvió a funcionar y el estado de carga se activa correctamente.

## Reflexión final (150–200 palabras)

Y ASI QUEDA LA REFLEXION FINAL El principal aprendizaje técnico fue entender cómo viaja un dato desde la API hasta la pantalla: `fetch` solicita la información, `.json()` la convierte en objeto, `datos.rate` entrega el tipo de cambio y `textContent` lo escribe en el DOM. Con las misiones convertimos ese flujo básico en una aplicación completa: monedas dinámicas, intercambio, validación, estado de carga con `finally`, manejo de errores con `try/catch` y diseño responsive con `@media`.

La dificultad más relevante fue Git. Aún no dominamos el tema y todo fue un reto: tuvimos rechazos en `git push`, conflictos de merge en `README.md` y `code.js`, y un conflicto dejó llaves desajustadas en el `try/catch` que hizo que ningún botón funcionara. Aprendimos a leer los mensajes de Git, resolver conflictos y usar la consola del navegador para encontrar errores.

Del trabajo Driver/Navigator surgió la decisión de hacer `git pull` antes de cada misión y avisarnos antes de subir cambios. Alternar roles nos obligó a explicar cada paso en voz alta, lo que ayudó a detectar errores antes de escribirlos y a entender el código de la otra persona.
