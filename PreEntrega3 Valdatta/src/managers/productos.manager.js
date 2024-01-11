
// En este archivo van todas las logicas de las funciones (agregar, eliminar, mostrar objetos)
import { crearProducto } from "../models/productos.model.js"
import htmlElements from "../elements/html.elements";

// tengo que crear un array donde se van a depositar los productos que cree con mi funcion agregar producto
let productos = JSON.parse(localStorage.getItem("productos")) || [];

//arriba lo que hice fue hacer que el texto JSON pueda verse como un array en la consola, caso contrario me va a mostrar un array vacio


const mostrarProductos = () => {
    
    htmlElements.contenedorProductos.innerHTML = "";
    console.log(productos);
    

    productos.forEach(producto => {
        let tarjeta = document.createElement("div")
        tarjeta.className = "border border-3 border-dark rounded-2 p-2 bg-secondary d-flex justify-content-between m-2"
        tarjeta.innerHTML = `
                            <p class="mt-1">Producto: ${producto.data}</p
                            <p class="mt-1">Precio: ${producto.precio}</p>
                            `

        let contenedorBtn = document.createElement("div")

        let btnEliminar = document.createElement("button")
        btnEliminar.innerText = "Eliminar";
        btnEliminar.className = "rounded-2 bg-danger border-2 m-1"
        //despues de agregar el boton eliminar, le sumo un evento on click para que cuando haga click elimine un producto tomando un ID
        btnEliminar.onclick = () => eliminarProducto(producto.id);  

        let btnComprar = document.createElement("button")
        btnComprar.innerText = "Comprar";
        btnComprar.className = "rounded-2 bg-success border-2 m-1"

        
        
        tarjeta.appendChild(contenedorBtn)
        contenedorBtn.appendChild(btnEliminar)
        contenedorBtn.appendChild(btnComprar)
        
        

        htmlElements.contenedorProductos.appendChild(tarjeta)
    });
}


const agregarProducto = () => {
    
    let productoNuevo = crearProducto(htmlElements.nombreProducto.value, htmlElements.precioProducto.value);
    productos.push(productoNuevo)
    console.log(productos);
    localStorage.setItem("producto", JSON.stringify(productos));
    mostrarProductos();


}


const eliminarProducto = (idProducto) => {
    
    productos = productos.filter ( producto => producto.id !== idProducto);
    localStorage.setItem("productos", JSON.stringify("productos")) 
    mostrarProductos(); 

}

// const mostrarProductosCarrito = () => {
    
//     htmlElements.contenedorProductos.innerHTML = "";
//     console.log(productos);

//     productos.forEach(producto => {
//         let tarjeta = document.createElement("div")
//         tarjeta.className = "border border-3 border-dark rounded-2 p-2 bg-secondary d-flex justify-content-between m-2"
//         tarjeta.innerHTML = `
//                             <p class="mt-1">Producto: ${producto.data}</p
//                             <p class="mt-1">Precio: ${producto.precio}</p>
//                             `

//         let contenedorBtn = document.createElement("div")

//         let btnEliminar = document.createElement("button")
//         btnEliminar.innerText = "Eliminar";
//         btnEliminar.className = "rounded-2 bg-danger border-2 m-1"
//         //despues de agregar el boton eliminar, le sumo un evento on click para que cuando haga click elimine un producto tomando un ID
//         btnEliminar.onclick = () => eliminarProducto(producto.id);

        
        
//         tarjeta.appendChild(contenedorBtn)
//         contenedorBtn.appendChild(btnEliminar)
//         contenedorBtn.appendChild(btnComprar)
        
        



//         htmlElements.carritoProductos.appendChild(tarjeta)
//     });
// }



export default {
    mostrarProductos,
    agregarProducto,
    eliminarProducto,
}