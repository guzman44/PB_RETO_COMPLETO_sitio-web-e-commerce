const productos = [
  {
    id: 1,
    nombre: "Camisa Casual Hombre",
    precio: 89900,
    imagen: "assets/img/camisa-hombre.jpg",
  },
  {
    id: 2,
    nombre: "Blusa Floral Mujer",
    precio: 74500,
    imagen: "assets/img/blusa-mujer.jpg",
  },
  {
    id: 3,
    nombre: "Jeans Unisex",
    precio: 110000,
    imagen: "assets/img/jeans-unisex.jpg",
  },
];

let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

function mostrarCarrito() {
  const tbody = document.getElementById("carrito-items");
  if (!tbody) return;
  tbody.innerHTML = "";

  let total = 0;
  carrito.forEach((item) => {
    const producto = productos.find((p) => p.id === item.id);
    if (!producto) return;

    const subtotal = producto.precio * item.cantidad;
    total += subtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toLocaleString()}</td>
      <td>${item.cantidad}</td>
      <td>$${subtotal.toLocaleString()}</td>
      <td><button class="btn btn-sm btn-danger" onclick="eliminarProducto(${item.id})">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("carrito-total").textContent = total.toLocaleString();
  document.getElementById("contador-carrito").textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

function eliminarProducto(id) {
  carrito = carrito.filter((item) => item.id !== id);
  guardarCarrito();
  mostrarCarrito();
}

function guardarCarrito() {
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
}

document.getElementById("vaciar-carrito")?.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  mostrarCarrito();
});

document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();
  let visitas = parseInt(sessionStorage.getItem("contadorVisitas") || "0");
  visitas++;
  sessionStorage.setItem("contadorVisitas", visitas);
  const contadorVisitasSpan = document.getElementById("contador-visitas");
  if (contadorVisitasSpan) contadorVisitasSpan.textContent = visitas;
});