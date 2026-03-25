var servicio = {
    nombre: "Aplicación de Tintes",
    precio: "$58.000"
};

var peluqueros = [
    { nombre: "Geovanny Ruiz",valor: "geovanny", imagen: "assets/imagenes/Peluquero1.jpg", disponible: true },
    { nombre: "Stiven Meneses", valor: "stiven", imagen: "assets/imagenes/Peluquero2.jpg", disponible: false },
    { nombre: "Camilo Triana", valor: "camilo", imagen: "assets/imagenes/Peluquero3.jpg", disponible: true }
];

var horas = ["8:00", "12:00", "16:00", "18:00"];

var galeria = [
    { src: "assets/imagenes/tinte1.jpeg", alt: "Referencia de tinte 1" },
    { src: "assets/imagenes/tinte2.jpeg", alt: "Referencia de tinte 2" },
    { src: "assets/imagenes/tinte3.jpeg", alt: "Referencia de tinte 3" },
    { src: "assets/imagenes/tinte4.jpeg", alt: "Referencia de tinte 4" }
];

// Variable para rastrear la hora seleccionada
var horaSeleccionada = horas[0];


//   ----RENDER FUNCTIONS------

var renderGaleria = function () {
    var container = document.getElementById("galeriaContainer");
    if (!container) return;

    container.innerHTML = "";

    galeria.forEach(function (foto) {
        var img = document.createElement("img");
        img.className = "galeria-foto";
        img.src = foto.src;
        img.alt = foto.alt;
        container.appendChild(img);
    });
};

var renderPeluqueros = function () {
    var container    = document.getElementById("profesionalesContainer");
    var selectElem   = document.getElementById("select-profesional");
    if (!container || !selectElem) return;

    container.innerHTML = "";
    selectElem.innerHTML = "";

    peluqueros.forEach(function (peluquero) {
        // ── Card de profesional ──
        var card = document.createElement("div");
        var estadoClase = peluquero.disponible ? "profesional-card--disponible" : "profesional-card--ocupado";
        card.className  = "profesional-card " + estadoClase;
        card.setAttribute("data-nombre", peluquero.valor);
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", peluquero.disponible
            ? "Seleccionar a " + peluquero.nombre
            : peluquero.nombre + " no disponible"
        );

        card.innerHTML =
            '<div class="profesional-avatar">' +
                '<img src="' + peluquero.imagen + '" alt="' + peluquero.nombre + '">' +
            '</div>' +
            '<span class="profesional-nombre">' + peluquero.nombre + '</span>' +
            '<span class="badge ' + (peluquero.disponible ? "badge--disponible" : "badge--ocupado") + '">' +
                (peluquero.disponible ? "Disponible" : "Ocupado") +
            '</span>';

        container.appendChild(card);

        // ── Opción en el select (solo disponibles) ──
        if (peluquero.disponible) {
            var option = document.createElement("option");
            option.value       = peluquero.valor;
            option.textContent = peluquero.nombre;
            selectElem.appendChild(option);
        }
    });
};

var renderHoras = function () {
    var container = document.getElementById("horasContainer");
    if (!container) return;

    horas.forEach(function (hora, indice) {
        var btn = document.createElement("button");
        btn.className  = "hora-btn" + (indice === 0 ? " hora-btn--active" : "");
        btn.type       = "button";
        btn.setAttribute("data-hora", hora);
        btn.textContent = hora;
        container.appendChild(btn);
    });
};

// ================= EVENTS =================

var initEvents = function () {

    // ── Selección de hora ──
    var horasContainer = document.getElementById("horasContainer");
    if (horasContainer) {
        horasContainer.addEventListener("click", function (e) {
            if (e.target.classList.contains("hora-btn")) {
                horasContainer.querySelectorAll(".hora-btn").forEach(function (b) {
                    b.classList.remove("hora-btn--active");
                });
                e.target.classList.add("hora-btn--active");
                horaSeleccionada = e.target.getAttribute("data-hora");
            }
        });
    }

    // ── Selección de profesional desde las cards ──
    var profContainer  = document.getElementById("profesionalesContainer");
    var selectProf     = document.getElementById("select-profesional");
    if (profContainer && selectProf) {
        profContainer.addEventListener("click", function (e) {
            var card = e.target.closest(".profesional-card--disponible");
            if (!card) return;

            profContainer.querySelectorAll(".profesional-card").forEach(function (c) {
                c.classList.remove("profesional-card--seleccionado");
            });
            card.classList.add("profesional-card--seleccionado");
            selectProf.value = card.getAttribute("data-nombre");
        });

        profContainer.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                var card = e.target.closest(".profesional-card--disponible");
                if (card) card.click();
            }
        });
    }

    // ── Confirmar Reserva ──
    var btnConfirmar = document.getElementById("btn-confirmar");
    if (btnConfirmar && selectProf) {
        btnConfirmar.addEventListener("click", function () {
            var profesional = selectProf.value 
            ? selectProf.options[selectProf.selectedIndex].text 
            : null;
            
            if (!profesional) {
                alert("Por favor selecciona un profesional.");
                return;
            }
            
            var fecha = document.getElementById("input-fecha").value;

            if (!fecha) {
                alert("Por favor selecciona una fecha para tu reserva.");
                return;
            }

            var reserva = {
                servicio:    servicio.nombre,
                profesional: profesional,
                fecha:       fecha,
                hora:        horaSeleccionada,
                precio:      servicio.precio
            };

            localStorage.setItem("reserva_tinte", JSON.stringify(reserva));

            alert(
                "¡Reserva guardada!\n\n" +
                "Servicio:     " + reserva.servicio    + "\n" +
                "Profesional:  " + reserva.profesional + "\n" +
                "Fecha:        " + reserva.fecha       + "\n" +
                "Hora:         " + reserva.hora        + "\n" +
                "Total:        " + reserva.precio
            );
        });
    }
};

// ================= INIT =================

document.addEventListener("DOMContentLoaded", function () {
    renderGaleria();
    renderPeluqueros();
    renderHoras();
    initEvents();
});