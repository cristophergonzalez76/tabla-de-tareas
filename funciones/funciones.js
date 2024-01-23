document.getElementById('botonAgregar').addEventListener('click', function() {
    // Obtener la tabla
    var table = document.getElementById('mitabla');

    // Crear una nueva fila y celda
    var newRow = table.insertRow(table.rows.length);
    var newCell = newRow.insertCell(0);

    // Configurar la nueva celda como editable
    newCell.contentEditable = true;
    newCell.textContent = 'Nueva Fila, Celda 1';
});

    