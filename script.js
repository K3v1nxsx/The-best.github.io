// Seleccionar elementos del DOM
const productos = document.querySelectorAll('.producto');
const carrito = document.querySelector('#carrito');
const total = document.querySelector('#total');

// Función para agregar producto al carrito
function agregarAlCarrito(event) {
  const producto = event.target.parentElement;
  const nombre = producto.querySelector('h2').textContent;
  const precio = producto.querySelector('p').textContent;
  const cantidad = 1;

  // Crear objeto producto
  const productoObj = {
    nombre,
    precio,
    cantidad
  };

  // Agregar producto al carrito
  carrito.innerHTML += `
    <div class="producto-carrito">
      <h2>${nombre}</h2>
      <p>Precio: ${precio}</p>
      <p>Cantidad: ${cantidad}</p>
    </div>
  `;

  // Actualizar total
  total.textContent = `Total: $${calcularTotal()}`;

  // Guardar carrito en localStorage
  guardarCarrito();
}

// Función para calcular total
function calcularTotal() {
  let total = 0;
  const productosCarrito = carrito.querySelectorAll('.producto-carrito');

  productosCarrito.forEach((producto) => {
    const precio = producto.querySelector('p').textContent;
    const cantidad = producto.querySelector('p').textContent;
    total += parseFloat(precio) * parseInt(cantidad);
  });

  return total.toFixed(2);
}

// Función para guardar carrito en localStorage
function guardarCarrito() {
  const carritoJSON = JSON.stringify(carrito.innerHTML);
  localStorage.setItem('carrito', carritoJSON);
}

// Función para cargar carrito desde localStorage
function cargarCarrito() {
  const carritoJSON = localStorage.getItem('carrito');
  if (carritoJSON) {
    carrito.innerHTML = JSON.parse(carritoJSON);
  }
}

// Agregar evento click a cada producto
productos.forEach((producto) => {
  producto.querySelector('button').addEventListener('click', agregarAlCarrito);
});

// Cargar carrito desde localStorage
cargarCarrito();

// Actualizar total
total.textContent = `Total: $${calcularTotal()}`;