
// En este archivo van todas las logicas de las funciones (agregar, eliminar, mostrar objetos)
import { crearProducto } from "../models/productos.model.js"; 
import htmlElements from "../elements/html.elements";
import Swal from 'sweetalert2';
import Toastify from 'toastify-js'; 
import "toastify-js/src/toastify.css";



    

// tengo que crear un array donde se van a depositar los productos que cree con mi funcion agregar producto

let productos = JSON.parse(localStorage.getItem("producto")) || [];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

console.log(productos);
console.log(carrito);

fetch("/data/productos.json")
    .then(resp => resp.json())
    .then(data => {
        productos = [...data];
        console.log(data);
        console.log(productos);
        localStorage.setItem("producto", JSON.stringify(productos));
        mostrarProductos();
    })


//arriba lo que hice fue hacer que el texto JSON pueda verse como un array en la consola, caso contrario me va a mostrar un array vacio


const mostrarProductos = () => {
    
    htmlElements.contenedorProductos.innerHTML = "";
    console.log(productos);
    

    productos.forEach(producto => {
        let tarjeta = document.createElement("div")
        tarjeta.className = "border border-3 border-dark rounded-2 p-2 bg-secondary d-flex justify-content-between m-2"
        tarjeta.innerHTML = `
                            <p class="mt-1">Producto: ${producto.nombre}</p
                            <p class="mt-1">Precio: ${producto.precio}</p>
                            `

        let contenedorBtn = document.createElement("div")

        let btnEliminar = document.createElement("button")
        btnEliminar.innerText = "Eliminar";
        btnEliminar.className = "rounded-2 bg-danger border-2 m-1";
        //despues de agregar el boton eliminar, le sumo un evento on click para que cuando haga click elimine un producto tomando un ID
        btnEliminar.onclick = () => eliminarProducto(producto.id);  

        let btnComprar = document.createElement("button")
        btnComprar.innerText = "Comprar";
        btnComprar.className = "rounded-2 bg-success border-2 m-1";
        btnComprar.onclick = () => comprar(producto.id);

        
        
        tarjeta.appendChild(contenedorBtn)
        contenedorBtn.appendChild(btnEliminar)
        contenedorBtn.appendChild(btnComprar)
        
        

        htmlElements.contenedorProductos.appendChild(tarjeta)
    });
}

const mostrarCarrito = () => {

    htmlElements.contenedorCarrito.innerHTML = "";
    console.log(carrito);
    
    carrito.forEach(producto => {
        let tarjeta = document.createElement("div")
        tarjeta.className = "border border-3 border-dark rounded-2 p-2 bg-secondary d-flex justify-content-between m-2"
        tarjeta.innerHTML = `
                            <p class="mt-1">Producto: ${producto.nombre}</p>
                            <p class="mt-1">Precio: ${producto.precio}</p>
                            `

        let contenedorBtn = document.createElement("div")

        let btnEliminar = document.createElement("button")
        btnEliminar.innerText = "Eliminar";
        btnEliminar.className = "rounded-2 bg-danger border-2 m-1"
        //despues de agregar el boton eliminar, le sumo un evento on click para que cuando haga click elimine un producto tomando un ID
        btnEliminar.onclick = () => eliminarProductoCarrito(producto.id);  

        let btnComprar = document.createElement("button")
        btnComprar.innerText = "Comprar";
        btnComprar.className = "rounded-2 bg-success border-2 m-1"
        
        
        tarjeta.appendChild(contenedorBtn)
        contenedorBtn.appendChild(btnEliminar)
        contenedorBtn.appendChild(btnComprar)
        
        

        htmlElements.contenedorCarrito.appendChild(tarjeta)
    });
}


const agregarProducto = () => {
    Swal.fire({
        text: `Esta seguro que desea agregar ${nombreProducto.value}?`,
        icon: "question",
        confirmButtonText: "Agregar",
        confirmButtonColor: "green",
        showCancelButton: true,
        cancelButtonColor: "red",
        cancelButtonText: "Cancelar",
    }) .then (respuesta => {
        if(respuesta.isConfirmed){
            let productoNuevo = crearProducto(htmlElements.nombreProducto.value, htmlElements.precioProducto.value);
            productos.push(productoNuevo);
            localStorage.setItem("producto", JSON.stringify(productos));
            mostrarProductos();
            Toastify({
                text:"Producto agregado",
                duration: 2000,
                gravity: "bottom",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
        } 
    })
    
}


const eliminarProducto = (idProducto) => {
    Swal.fire({
        text: `Esta seguro que desea eliminar ${nombreProducto.value}?`,
        icon: "warning",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "",
        showCancelButton: true,
        cancelButtonColor: "red",
        cancelButtonText: "Cancelar",
    }) .then(respuesta => {
        if (respuesta.isConfirmed) {
            productos = productos.filter ( producto => producto.id !== idProducto);
            localStorage.setItem("producto", JSON.stringify(productos)) 
            mostrarProductos(); 
            Toastify({
                text:"Producto eliminado",
                duration: 2000,
                gravity: "bottom",
                style: {
                    background: "linear-gradient(to right, #55b09b, #96c93d)",
                },
            }).showToast();
        }
    })
    

}

const eliminarProductoCarrito = (idProducto) => {
    Swal.fire({
        text: `Esta seguro que desea eliminar ${nombreProducto.value}?`,
        icon: "warning",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "",
        showCancelButton: true,
        cancelButtonColor: "red",
        cancelButtonText: "Cancelar",
    }) .then(respuesta => {
        if (respuesta.isConfirmed) {
            carrito = carrito.filter ( producto => producto.id !== idProducto);
            localStorage.setItem("carrito", JSON.stringify(carrito)) 
            mostrarCarrito(); 
            Toastify({
                text:"Producto eliminado",
                duration: 2000,
                gravity: "bottom",
                style: {
                    background: "linear-gradient(to right, #55b09b, #96c93d)",
                },
            }).showToast();
        }
    })
    

}

const comprar = (idProducto) => {
    Swal.fire({
        text: `Esta seguro que desea comprar ${nombreProducto.value}?`,
        icon: "warning",
        confirmButtonText: "Comprar",
        confirmButtonColor: "",
        showCancelButton: true,
        cancelButtonColor: "red",
        cancelButtonText: "Cancelar",
    }) .then(respuesta => {
        if (respuesta.isConfirmed){
            let productoComprado = productos.find (producto => producto.id === idProducto);
            // productos = productos.filter(producto => producto.id !== idProducto);
            carrito.push(productoComprado);
            localStorage.setItem("producto", JSON.stringify(productos))
            localStorage.setItem("carrito", JSON.stringify(carrito))
            mostrarProductos();
            mostrarCarrito();
        }
    })
}

const nombreCreado = () => {
    let nombre = `${producto.nombre}`
    if(nombre === undefined) {
        nombre = `${producto.data}`
    }
}

export default {
    mostrarProductos,
    mostrarCarrito,
    agregarProducto,
    eliminarProducto,
    eliminarProductoCarrito,
    comprar,
    nombreCreado
}