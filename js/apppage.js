// const productos = [objeto1, objeto2, objeto3, objeto4]
let productos  //AGREGUE ESTO

let carrito = []

//FUNCIONES
const buscarProductosEnArray = (seleccion) => productos.find((producto) => producto.codigo == seleccion)

//---------
const cardContainer = document.querySelector('#cardsPropias')


const imprimirProductos=(llamoAlArrayProductos)=>{   //AGREGUE ESTO CUANDO SUME EL JSON FETCH
    
llamoAlArrayProductos.forEach((producto) => {
    const cardProductos = document.createElement('div')
    cardProductos.className = 'card'
    cardProductos.innerHTML =
        `      
                    <img src="${producto.imagen}"alt="${producto.categoria}">
                    <h4>${producto.nombre}</h4>
                    <p>${producto.descripcion}</p>
                    <button data-id="${producto.codigo}" class="buttonCTA">Comprar</button>

            `

    cardContainer.append(cardProductos)
})
funcionDeAgregarCarrito()
} //AGREGUE ESTO CUANDO SUME EL JSON FETCH

const cartContainer = document.querySelector('#cartContainer')


const imprimirCarrito = () => {
    cartContainer.innerHTML = ''
    carrito.forEach((producto) => {
        const cartRow = document.createElement('div')
        cartRow.className = 'cartRow'
        cartRow.innerHTML = `
    
    <div class="cartTitle"><span> Prenda ${producto.nombre}</span></div>
    <div class="cartDesc"><span> ${producto.descripcion} </span></div>
    <div class="cartPrice"><span> $${producto.precio}</span></div>
    
    `
        cartContainer.append(cartRow)
    })
}


const funcionDeAgregarCarrito = ()=>{
const agregarAlCarrito = (e) => {
    const productoElegido = e.target.getAttribute('data-id')
    const producto = buscarProductosEnArray (productoElegido)
    carrito.push(producto)
imprimirCarrito()
localStorage.setItem('carrito', JSON.stringify(carrito))
}

const botonesCompra = document.querySelectorAll('.buttonCTA')
botonesCompra.forEach((botonCompra) => {
    botonCompra.addEventListener('click', agregarAlCarrito)
})
}
if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    imprimirCarrito()
}

const vaciarCarrito = () =>{
    if(localStorage.getItem('carrito')) {
    localStorage.removeItem('carrito')
    }
    carrito = []
    imprimirCarrito()
}

const vaciarCarritoBtn = document.querySelector('#vaciarCarrito')
vaciarCarritoBtn.addEventListener ('click', vaciarCarrito)

// Traer los productos desde Json
//AGREGUE ESTO
fetch('./data/productos.json')
    .then((res) => res.json())
    .then((jsonResponse)=> {
        productos = jsonResponse.data
        imprimirProductos(productos)
    })//AGREGUE ESTO

