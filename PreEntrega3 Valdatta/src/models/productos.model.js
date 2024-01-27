//en la parte de models irian los MODELOS DE ETIQUETA DE PRODUCTOS que vamos a ir agregando
import { v4 } from "uuid";


export const crearProducto = (texto, precio) => {
    let nuevoProducto = {
        id: v4(),
        data: texto,
        precio: precio,
    };

    return nuevoProducto;
}

