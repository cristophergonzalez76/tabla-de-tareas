document.getElementById('botonAgregar').addEventListener('click', function() {
    // Obtener la tabla
    var table = document.getElementById('mitabla');

    // Crear una nueva fila y celda
    var newRow = table.insertRow(table.rows.length);
    var newCell = newRow.insertCell(0);

    // Configurar la nueva celda como editable
    newCell.contentEditable = true;
    newCell.textContent = 'Nueva Fila, Celda 1';

  actualizarCantidadYCeldas();
});


document.getElementById('Guardar').addEventListener('click',function() { 

  actualizarCantidadYCeldas();

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

    actualizarCantidadYCeldas();
  }
}

function eliminarCeldaHandler() {
  var table = document.getElementById('mitabla');
  var filas = table.getElementsByTagName('tr');

  if (filas.length === 0) {
      alert('No hay filas para eliminar.');
      return;
  }

  for (var i = filas.length - 1; i >= 0; i--) {
      table.deleteRow(i);
  }

  // Guardar la cantidad actual de celdas en localStorage

}


// Desasociar eventos al cargar la página inicialmente
desasociarEventos();


var table = document.getElementById('mitabla');
var botonAgregar = document.getElementById('botonAgregar');
var botonEliminarCelda = document.getElementById('eliminarCelda');

// Función para actualizar la cantidad de celdas y guardar en localStorage
function actualizarCantidadYCeldas() {
    // Obtener todas las celdas editables
    var celdasEditables = table.querySelectorAll('tbody td[contenteditable="true"]');

    // Crear un array para almacenar el contenido de cada celda
    var contenidoCeldasArray = [];

    // Iterar sobre las celdas y almacenar su contenido
    celdasEditables.forEach(function (celda) {
        contenidoCeldasArray.push(celda.textContent);
    });

    // Guardar la cantidad de celdas y el contenido en localStorage
    localStorage.setItem('cantidadCeldas', celdasEditables.length);
    localStorage.setItem('contenidoCeldas', JSON.stringify(contenidoCeldasArray));
}

document.addEventListener('DOMContentLoaded', function () {
  // Obtener la cantidad de celdas almacenadas en localStorage
  var cantidadCeldasGuardadas = localStorage.getItem('cantidadCeldas');

  // Si hay un valor guardado, agregar la cantidad correspondiente de celdas
  if (cantidadCeldasGuardadas) {
      var contenidoCeldasGuardado = JSON.parse(localStorage.getItem('contenidoCeldas'));

      for (var i = 0; i < cantidadCeldasGuardadas; i++) {
          // Crear una nueva fila y celda
          var newRow = table.insertRow(table.rows.length);
          var newCell = newRow.insertCell(0);

          // Configurar la nueva celda como editable
          newCell.contentEditable = true;

          // Asignar el contenido guardado a la celda si existe
          if (contenidoCeldasGuardado && contenidoCeldasGuardado[i] !== undefined && contenidoCeldasGuardado[i] !== null) {
              newCell.textContent = contenidoCeldasGuardado[i];
          } else {
              // Si no hay contenido guardado, asignar una cadena vacía
              newCell.textContent = '';
          }
      }
  }
});
