import htmlElements from "./elements/html.elements";
import productosManager from "./managers/productos.manager";



export const app = () => {
    
    //exporto la app para poder usarla desde el main
    
    console.log("Iniciando aplicacion");
    htmlElements.formProducto.onsubmit = (event) => {
        event.preventDefault();
        productosManager.agregarProducto();
    }

    productosManager.mostrarProductos();


    productosManager.eliminarProducto();
}


