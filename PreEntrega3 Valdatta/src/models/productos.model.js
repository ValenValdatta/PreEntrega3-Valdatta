//en la parte de models irian los MODELOS DE ETIQUETA DE PRODUCTOS que vamos a ir agregando

export const crearProducto = (texto, precio) => {
    let nuevoProducto = {
        id: Date.now().toString(36),
        data: texto,
        precio: precio,
    };

    return nuevoProducto;
}

