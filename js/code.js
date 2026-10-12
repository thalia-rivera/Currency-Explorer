// ============================================================
// CURRENCY EXPLORER · STARTER PROJECT
// Archivo principal de trabajo para las misiones de JavaScript
// ============================================================

// 1. REFERENCIAS AL DOM
const cantidad = document.querySelector("#cantidad");
const origen = document.querySelector("#origen");
const destino = document.querySelector("#destino");
const btnConvertir = document.querySelector("#convertir");
const btnIntercambiar = document.querySelector("#intercambiar");
const resultado = document.querySelector("#resultado");
const resultadoTexto = document.querySelector("#resultadoTexto");
const detalleTasa = document.querySelector("#detalleTasa");

// 2. EVENTOS
btnConvertir.addEventListener("click", convertirMoneda);
btnIntercambiar.addEventListener("click", intercambiarMonedas);

// 3. FUNCIÓN PRINCIPAL
async function convertirMoneda() {
  // Misiones guiadas 1-3: ya existe un flujo mínimo funcional EUR -> USD.
  // A partir de la Misión 4 debes convertirlo en una solución dinámica.

 

  // TODO · MISIÓN 07: sustituir esta validación mínima por una validación completa.
  const valor = validarEntrada();
  if (valor === null) return;

  // TODO · MISIÓN 04: reemplazar EUR y USD por los valores elegidos en los <select>.


  //DESPUÉS
  const monedaOrigen = origen.value;
  const monedaDestino = destino.value;

  const url = `https://api.frankfurter.dev/v2/rate/${monedaOrigen}/${monedaDestino}`;

     try {
    // estado de carga
    resultado.classList.remove("error");
    resultadoTexto.textContent = "Consultando...";
    detalleTasa.textContent = "Obteniendo el tipo de cambio...";
    btnConvertir.disabled = true;
    btnIntercambiar.disabled = true;

    const respuesta = await fetch(url);

    // MISIÓN 09: comprobar response.ok y lanzar un error si corresponde.
    if (!respuesta.ok) {
      throw new Error(`HTTP_${respuesta.status}`);
    }

    const datos = await respuesta.json();
    console.log(datos);

    const conversion = valor * datos.rate;

    resultado.classList.remove("error");
    //hacer el resultado de la conversion mas legible con toLocaleString y formato de 2 decimales y separar los miles y los decimales con coma y punto respectivamente.
    const formato = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    resultadoTexto.textContent = `${valor.toLocaleString("es-MX", formato)} ${monedaOrigen} = ${conversion.toLocaleString("es-MX", formato)} ${monedaDestino}`;

    detalleTasa.textContent = `1 ${monedaOrigen} = ${datos.rate.toFixed(5)} ${monedaDestino} · ${datos.date}`;
//datos.rate es el número que dice cuánto vale una moneda en otra.
//Piénsalo como cuando vas a una casa de cambio y ves el letrero: "1 euro = 1.08 dólares". Ese 1.08 es el rate.
  }
  catch (error) {
    console.error(error);

    if (error instanceof TypeError) {
      mostrarError("No hay conexión con el servicio. Revisa tu internet.");
    } else if (error.message === "HTTP_404" || error.message === "HTTP_422") {
      mostrarError("La API no reconoce esa moneda");
    } else if (error.message.startsWith("HTTP_")) {
      mostrarError("El servicio tuvo un problema. Inténtalo más tarde.");
    } else {
      mostrarError("No fue posible completar la consulta.");
    }
  }
  finally {
    btnConvertir.disabled = false;
    btnIntercambiar.disabled = false;
  }
}

function intercambiarMonedas() {
  const temporal = origen.value;
  origen.value = destino.value;
  destino.value = temporal;

  convertirMoneda();
}

// 4. UTILIDADES DE INTERFAZ
// 4. UTILIDADES DE INTERFAZ
function mostrarError(mensaje) {
  resultado.classList.add("error");
  resultadoTexto.textContent = mensaje;
  detalleTasa.textContent = "Revisa los datos e inténtalo nuevamente.";
}

function validarEntrada() {
  const texto = cantidad.value.trim();

  // 1) Campo vacío (se revisa antes de Number(), porque Number("") también da 0)
  if (texto === "") {
    mostrarError("Escribe una cantidad para convertir.");
    return null;
  }

  const valor = Number(texto);

  // 2) No es un número válido
  if (!Number.isFinite(valor)) {
    mostrarError("La cantidad no es un número válido.");
    return null;
  }

  // 3) Cero o negativo
  if (valor <= 0) {
    mostrarError("La cantidad debe ser mayor que cero.");
    return null;
  }

  // 4) Misma moneda en origen y destino
  if (origen.value === destino.value) {
    mostrarError("Elige monedas distintas en origen y destino.");
    return null;
  }

  return valor;
}

// MISIÓN 11: HISTÓRICO dibujada en canvas
const btnHistorico = document.querySelector("#verHistorico");
const lienzo = document.querySelector("#grafica");

btnHistorico.addEventListener("click", cargarHistorico);

async function cargarHistorico() {
  const base = origen.value;
  const quote = destino.value;

  if (base === quote) {
    mostrarError("Elige monedas distintas para ver el histórico.");
    return;
  }

  const url = `https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${quote}&from=2026-01-01&group=month`;

  try {
    btnHistorico.disabled = true;
    btnHistorico.textContent = "Consultando...";

    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`HTTP_${respuesta.status}`);
    }

    const datos = await respuesta.json();

    // Los dos arreglos que necesita la gráfica, los cuales se obtienen de los datos de la API.
    const fechas = datos.map(item => item.date);
    const tasas = datos.map(item => item.rate);

    dibujarGrafica(fechas, tasas, `${base} → ${quote}`);
  } catch (error) {
    console.error(error);
    mostrarError("No fue posible cargar el histórico.");
  } finally {
    btnHistorico.disabled = false;
    btnHistorico.textContent = "Ver histórico";
  }
}

function dibujarGrafica(fechas, tasas, titulo) {
  const ctx = lienzo.getContext("2d");
  const ancho = lienzo.width;
  const alto = lienzo.height;
  const margen = 50;

  ctx.clearRect(0, 0, ancho, alto); // borra la gráfica anterior

  // Valores mínimo y máximo para escalar el eje Y
  const min = Math.min(...tasas);
  const max = Math.max(...tasas);
  const rango = max - min || 1; // evita dividir entre 0

  // Convierten un dato en una posición del canvas
  const posX = i => margen + i * (ancho - 2 * margen) / Math.max(tasas.length - 1, 1);
  const posY = t => alto - margen - ((t - min) / rango) * (alto - 2 * margen);

  ctx.font = "12px sans-serif";
  ctx.fillStyle = "#888";
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 1;

  // Título
  ctx.fillText(titulo, margen, 25);

  // Ejes
  ctx.beginPath();
  ctx.moveTo(margen, margen);
  ctx.lineTo(margen, alto - margen);
  ctx.lineTo(ancho - margen, alto - margen);
  ctx.stroke();

  // Etiquetas del eje Y (máximo y mínimo)
  ctx.fillText(max.toFixed(4), 5, margen + 4);
  ctx.fillText(min.toFixed(4), 5, alto - margen + 4);

  // Línea de la gráfica
  ctx.strokeStyle = "hsl(205, 48%, 51%)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  tasas.forEach((t, i) => {
    if (i === 0) ctx.moveTo(posX(i), posY(t));
    else ctx.lineTo(posX(i), posY(t));
  });
  ctx.stroke();

  // Puntos y etiquetas del eje X (mes)
  ctx.fillStyle = "rgb(9, 33, 86)";
  tasas.forEach((t, i) => {
    ctx.beginPath();
    ctx.arc(posX(i), posY(t), 4, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#888";
  fechas.forEach((f, i) => {
    ctx.fillText(f.slice(5, 7), posX(i) - 6, alto - margen + 18); // "01", "02"...
  });
}

// PISTA PARA EL RETO:
// origen.value        -> moneda seleccionada como origen
// destino.value       -> moneda seleccionada como destino
// cantidad.value      -> texto escrito en el input
// Number(...)         -> convierte texto a número
// response.ok         -> indica si la respuesta HTTP fue satisfactoria
// resultado.textContent -> permite modificar texto del DOM
