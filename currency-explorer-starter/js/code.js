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

// PISTA PARA EL RETO:
// origen.value        -> moneda seleccionada como origen
// destino.value       -> moneda seleccionada como destino
// cantidad.value      -> texto escrito en el input
// Number(...)         -> convierte texto a número
// response.ok         -> indica si la respuesta HTTP fue satisfactoria
// resultado.textContent -> permite modificar texto del DOM
