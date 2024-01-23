// Función para establecer una cookie
function setCookie(nombre, valor, expiracionDias) {
    var fechaExpiracion = new Date();
    fechaExpiracion.setDate(fechaExpiracion.getDate() + expiracionDias);

    var cookie = `${nombre}=${valor}; expires=${fechaExpiracion.toUTCString()}; path=/`;
    document.cookie = cookie;
}

// Función para obtener el valor de una cookie por su nombre
function getCookie(nombre) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(nombre + '=')) {
            return cookie.substring(nombre.length + 1);
        }
    }
    return null;
}