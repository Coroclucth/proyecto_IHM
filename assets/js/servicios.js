// ══════════════════════════════════════
//  DATOS DE SERVICIOS
// ══════════════════════════════════════
var servicios = [
  {
    nombre: "Cortes",
    imagen: "assets/img/servicios/jude.png",
    precio: "$ 25.000",
    link: "detalle-corte.html"
  },
  {
    nombre: "Tintes",
    imagen: "assets/img/servicios/cr7.png",
    precio: "$ 30.000",
    link: "detalle-tinte.html"
  },
  {
    nombre: "Barba",
    imagen: "assets/img/servicios/benzemaaa.png",
    precio: "$ 15.000",
    link: "detalle-barba.html"
  },
  {
    nombre: "Tratamientos capilares",
    imagen: "assets/img/servicios/keratine.png",
    precio: "$ 55.000",
    link: "detalle-tratamientos.html"
  },
];
// ══════════════════════════════════════
//  FUNCIÓN QUE DIBUJA LAS CARDS
// ══════════════════════════════════════
function renderServicios() {
  const container = document.getElementById("servicios-container");

  // Si no existe el contenedor, salir
  if (!container) return;

  servicios.forEach(function(servicio) {
    const card = document.createElement("div");
    card.classList.add("servicio__card");

    card.innerHTML = `
      <div class="servicio__img">
        <img src="${servicio.imagen}" alt="${servicio.nombre}">
      </div>
      <div class="servicio__info">
        <h3 class="servicio__nombre">${servicio.nombre}</h3>
        <div class="servicio__precio-wrap">
          <div>
            <span class="servicio__desde">DESDE</span>
            <p class="servicio__precio">${servicio.precio}</p>
            <span class="servicio__moneda">COP</span>
          </div>
          <a href="${servicio.link}" class="servicio__btn">VER CATALOGO</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// ══════════════════════════════════════
//  EJECUTAR AL CARGAR LA PÁGINA
// ══════════════════════════════════════
renderServicios();