// Función para establecer una cookie
function setCookie(nombre, valor, expiracionDias) {
    var fechaExpiracion = new Date();
    fechaExpiracion.setDate(fechaExpiracion.getDate() + expiracionDias);

    var cookie = `${nombre}=${valor}; expires=${fechaExpiracion.toUTCString()}; path=/`;
    document.cookie = cookie;
}

// Función para obtener el valor de una cookie
function getCookie(nombre) {
    var name = nombre + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';');
    
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        
        // Verificar si la cookie comienza con el nombre buscado
        if (cookie.indexOf(name) == 0) {
            // Retornar el valor de la cookie
            return cookie.substring(name.length, cookie.length);
        }
    }
    
    // Si no se encuentra la cookie, retornar null o un valor predeterminado según tu lógica
    return null;
}

// Función para establecer la cantidad de columnas
function establecerCantidadDeColumnas(cantidad) {
    // Aquí puedes usar la función setCookie o realizar cualquier lógica necesaria
    setCookie('cantidadColumnas', cantidad, 7); // Ejemplo de uso de setCookie con una duración de 7 días
}

// Función para guardar el contenido de las celdas en cookies
function guardarContenidoEnCookies() {
    // Obtener todas las celdas editables
    var cells = document.querySelectorAll('#mitabla tbody td[contenteditable="true"]');

    // Guardar la cantidad de columnas en una cookie
    setCookie('columnas', cells.length, 7); // Caduca en 7 días

    // Guardar el contenido de cada celda en cookies
    cells.forEach(function(cell, index) {
        setCookie('celda' + index, cell.textContent, 7);
    });
}

// Función para actualizar la cantidad de columnas
function actualizarCantidadDeColumnas() {
    // Obtener la cantidad actual de columnas (puedes ajustar esto según tu implementación)
    var cantidadActual = document.querySelectorAll('#mitabla tbody td[contenteditable="true"]').length;

    // Guardar la cantidad de columnas en la cookie
    setCookie('columnas', cantidadActual, 7); // 7 días de expiración, ajusta según tus necesidades
}

document.getElementById('botonAgregar').addEventListener('click', function() {
    // Obtener la tabla
    var table = document.getElementById('mitabla');

    // Crear una nueva fila y celda
    var newRow = table.insertRow(table.rows.length);
    var newCell = newRow.insertCell(0);

    // Configurar la nueva celda como editable
    newCell.contentEditable = true;
    newCell.textContent = 'Nueva Fila, Celda 1';

    // Actualizar la cantidad de columnas y guardar en las cookies
    actualizarCantidadDeColumnas();
    guardarContenidoEnCookies();
});

// ... (código anterior)



// ... (código posterior)


document.addEventListener('DOMContentLoaded', function() {
    // Obtener el valor de la cookie 'columnas'
    var columnasGuardadas = getCookie('columnas');

    // Si hay un valor guardado en la cookie, realizar alguna acción
    if (columnasGuardadas) {
        // Por ejemplo, puedes usar el valor para establecer la cantidad de columnas
        // Supongamos que 'columnasGuardadas' es un número que representa la cantidad de columnas
        establecerCantidadDeColumnas(columnasGuardadas);
    }
});


// Obtener el botón y agregar un evento de clic
var switchButton = document.getElementById('eliminarCelda');
switchButton.addEventListener('click', toggleSwitch);

// Variable para rastrear el estado del switch
let switchState = false;

function toggleSwitch() {
  switchState = !switchState;

  if (switchState) {
    switchButton.textContent = 'On';
    asociarEventos();
    console.log('Switch encendido');
  } else {
    switchButton.textContent = 'Off';
    desasociarEventos();
    console.log('Switch apagado');
  }
}

function asociarEventos() {
  document.getElementById('mitabla').addEventListener('click', clickHandler);
  document.getElementById('eliminarCelda').addEventListener('click', eliminarCeldaHandler);
}

function desasociarEventos() {
  document.getElementById('mitabla').removeEventListener('click', clickHandler);
  document.getElementById('eliminarCelda').removeEventListener('click', eliminarCeldaHandler);
}

function clickHandler(event) {
  var target = event.target;

  if (target.tagName === 'TD' && target.contentEditable === 'true') {
    var row = target.parentNode;
    var cellIndex = target.cellIndex;
    row.deleteCell(cellIndex);

    actualizarCantidadDeColumnas();
    guardarContenidoEnCookies();
  }
}

function eliminarCeldaHandler() {
  var table = document.getElementById('mitabla');
  var celdasEditables = document.querySelectorAll('#mitabla tbody td[contenteditable="true"]');

  if (celdasEditables.length === 0) {
    alert('No hay celdas editables para eliminar.');
    return;
  }

  for (var i = 0; i < table.rows.length; i++) {
    if (table.rows[i].cells.length > 0) {
      table.rows[i].deleteCell(0);
    }
  }

  actualizarCantidadDeColumnas();
  guardarContenidoEnCookies();
}

// Desasociar eventos al cargar la página inicialmente
desasociarEventos();
