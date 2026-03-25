var tratamientos = [
    { tipo: "keratina",    nombre: "Keratina",    precio: 55000 },
    { tipo: "hidratacion", nombre: "Hidratación", precio: 58000 },
    { tipo: "nutricion",   nombre: "Nutrición",   precio: 57000 },
    { tipo: "pintura",     nombre: "Pintura",     precio: 60000 },
    { tipo: "implante",    nombre: "Implante",    precio: 60000 }
];

var barberos = [
    { nombre: "Carlos Mendoza",   valor: "carlos", imagen: "assets/imagenes/barbero1.jpg", disponible: true  },
    { nombre: "Andrés Lopez",     valor: "andres", imagen: "assets/imagenes/barbero2.jpg", disponible: true  },
    { nombre: "Samuel Rodriguez", valor: "samuel", imagen: "assets/imagenes/barbero3.jpg", disponible: false }
];

var horas = ["10:00", "12:00", "16:00", "18:00"];

var galeria = [
    { src: "assets/imagenes/tratamiento-capilar1.jpg", alt: "Tratamiento capilar 1" },
    { src: "assets/imagenes/tratamiento-capilar2.jpg", alt: "Tratamiento capilar 2" },
    { src: "assets/imagenes/tratamiento-capilar3.jpg", alt: "Tratamiento capilar 3" },
    { src: "assets/imagenes/tratamiento-capilar4.jpg", alt: "Tratamiento capilar 4" }
];

// Variables de estado
var tipoSeleccionado = tratamientos[0].tipo;
var horaSeleccionada = horas[0];


// ================= RENDER FUNCTIONS ===============

var renderTratamientos = function () {
    var filtrosContainer = document.getElementById("filtrosContainer");
    var selectTipo       = document.getElementById("select-tipo");
    if (!filtrosContainer || !selectTipo) return;

    tratamientos.forEach(function (trat, indice) {
        // ── Pill de filtro ──
        var pill = document.createElement("button");
        pill.className  = "filtro-pill" + (indice === 0 ? " filtro-pill--active" : "");
        pill.type       = "button";
        pill.setAttribute("data-tipo", trat.tipo);
        pill.textContent = trat.nombre;
        filtrosContainer.appendChild(pill);

        // ── Opción en el select ──
        var option = document.createElement("option");
        option.value       = trat.tipo;
        option.textContent = trat.nombre + " – $" + trat.precio.toLocaleString("es-CO");
        selectTipo.appendChild(option);
    });
};

var renderGaleria = function () {
    var container = document.getElementById("galeriaContainer");
    if (!container) return;

    galeria.forEach(function (foto) {
        var img = document.createElement("img");
        img.className = "galeria-foto";
        img.src = foto.src;
        img.alt = foto.alt;
        container.appendChild(img);
    });
};

var renderBarberos = function () {
    var container  = document.getElementById("profesionalesContainer");
    var selectElem = document.getElementById("select-profesional");
    if (!container || !selectElem) return;

    barberos.forEach(function (barbero) {
        // ── Card de profesional ──
        var card = document.createElement("div");
        var estadoClase = barbero.disponible ? "profesional-card--disponible" : "profesional-card--ocupado";
        card.className  = "profesional-card " + estadoClase;
        card.setAttribute("data-nombre", barbero.valor);
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", barbero.disponible
            ? "Seleccionar a " + barbero.nombre
            : barbero.nombre + " no disponible"
        );

        card.innerHTML =
            '<div class="profesional-avatar">' +
                '<img src="' + barbero.imagen + '" alt="' + barbero.nombre + '">' +
            '</div>' +
            '<span class="profesional-nombre">' + barbero.nombre + '</span>' +
            '<span class="badge ' + (barbero.disponible ? "badge--disponible" : "badge--ocupado") + '">' +
                (barbero.disponible ? "Disponible" : "Ocupado") +
            '</span>';

        container.appendChild(card);

        // ── Opción en el select (solo disponibles) ──
        if (barbero.disponible) {
            var option = document.createElement("option");
            option.value       = barbero.valor;
            option.textContent = barbero.nombre;
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

// ── Función auxiliar para actualizar el resumen de precio ──
var actualizarPrecio = function (tipo) {
    var datos = tratamientos.find(function (t) { return t.tipo === tipo; });
    if (!datos) return;
    var precioFmt = "$" + datos.precio.toLocaleString("es-CO");
    document.getElementById("resumen-nombre").textContent = "Tratamiento de " + datos.nombre;
    document.getElementById("resumen-valor").textContent  = precioFmt;
    document.getElementById("total-valor").textContent    = precioFmt;
};



// ================= EVENTS =================

var initEvents = function () {

    var filtrosContainer = document.getElementById("filtrosContainer");
    var selectTipo       = document.getElementById("select-tipo");

    // ── Pills de tratamiento ──
    if (filtrosContainer) {
        filtrosContainer.addEventListener("click", function (e) {
            var pill = e.target.closest(".filtro-pill");
            if (!pill) return;

            filtrosContainer.querySelectorAll(".filtro-pill").forEach(function (p) {
                p.classList.remove("filtro-pill--active");
            });
            pill.classList.add("filtro-pill--active");

            tipoSeleccionado  = pill.getAttribute("data-tipo");
            selectTipo.value  = tipoSeleccionado;
            actualizarPrecio(tipoSeleccionado);
        });
    }

    // ── Select de tipo (sincroniza con pills) ──
    if (selectTipo) {
        selectTipo.addEventListener("change", function () {
            tipoSeleccionado = selectTipo.value;
            filtrosContainer.querySelectorAll(".filtro-pill").forEach(function (p) {
                p.classList.toggle("filtro-pill--active",
                    p.getAttribute("data-tipo") === tipoSeleccionado);
            });
            actualizarPrecio(tipoSeleccionado);
        });
    }

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
    var profContainer = document.getElementById("profesionalesContainer");
    var selectProf    = document.getElementById("select-profesional");
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
    if (btnConfirmar && selectProf && selectTipo) {
        btnConfirmar.addEventListener("click", function () {
            var datos       = tratamientos.find(function (t) { return t.tipo === tipoSeleccionado; });
            var profesional = selectProf.options[selectProf.selectedIndex]
                ? selectProf.options[selectProf.selectedIndex].text
                : "Sin seleccionar";
            var fecha = document.getElementById("input-fecha").value;

            if (!fecha) {
                alert("Por favor selecciona una fecha para tu reserva.");
                return;
            }

            var reserva = {
                servicio:    "Tratamientos Capilares",
                tipo:        "Tratamiento de " + datos.nombre,
                profesional: profesional,
                fecha:       fecha,
                hora:        horaSeleccionada,
                precio:      "$" + datos.precio.toLocaleString("es-CO")
            };

            localStorage.setItem("reserva_tratamientos", JSON.stringify(reserva));

            alert(
                "¡Reserva guardada!\n\n" +
                "Servicio:     " + reserva.servicio    + "\n" +
                "Tipo:         " + reserva.tipo        + "\n" +
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
    renderTratamientos();
    renderGaleria();
    renderBarberos();
    renderHoras();
    initEvents();
});