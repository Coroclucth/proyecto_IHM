// NICOLÁS SANTIAGO CADENA SÁNCHEZ - DETALLE TRATAMIENTOS

var precios = {
  keratina:    { nombre: 'Tratamiento de Keratina',    precio: 55000 },
  hidratacion: { nombre: 'Tratamiento de Hidratación', precio: 58000 },
  nutricion:   { nombre: 'Tratamiento de Nutrición',   precio: 57000 },
  pintura:     { nombre: 'Tratamiento de Pintura',     precio: 60000 },
  implante:    { nombre: 'Tratamiento de Implante',    precio: 60000 }
};

var tipo_seleccionado = 'keratina';

function actualizar_resumen(tipo) {
  var datos = precios[tipo];
  var precio_fmt = '$' + datos.precio.toLocaleString('es-CO');
  document.getElementById('resumen-nombre').textContent = datos.nombre;
  document.getElementById('resumen-valor').textContent  = precio_fmt;
  document.getElementById('total-valor').textContent    = precio_fmt;
}

// ── Filtros de tipo (pills) ──
var filtros = document.querySelectorAll('.filtro-pill');
var select_tipo = document.getElementById('select-tipo');

filtros.forEach(function(pill) {
  pill.addEventListener('click', function() {
    filtros.forEach(function(p) { p.classList.remove('filtro-pill--active'); });
    pill.classList.add('filtro-pill--active');
    tipo_seleccionado = pill.getAttribute('data-tipo');
    select_tipo.value = tipo_seleccionado;
    actualizar_resumen(tipo_seleccionado);
  });
});

// ── Select de tipo sincroniza con los pills ──
select_tipo.addEventListener('change', function() {
  tipo_seleccionado = select_tipo.value;
  filtros.forEach(function(p) {
    p.classList.toggle('filtro-pill--active', p.getAttribute('data-tipo') === tipo_seleccionado);
  });
  actualizar_resumen(tipo_seleccionado);
});

// ── Selección de hora ──
var botones_hora = document.querySelectorAll('.hora-btn');
var hora_seleccionada = '10:00';

botones_hora.forEach(function(btn) {
  btn.addEventListener('click', function() {
    botones_hora.forEach(function(b) { b.classList.remove('hora-btn--active'); });
    btn.classList.add('hora-btn--active');
    hora_seleccionada = btn.getAttribute('data-hora');
  });
});

// ── Selección de profesional desde las cards ──
var cards_profesional = document.querySelectorAll('.profesional-card--disponible');
var select_profesional = document.getElementById('select-profesional');

cards_profesional.forEach(function(card) {
  card.addEventListener('click', function() {
    select_profesional.value = card.getAttribute('data-nombre');
    cards_profesional.forEach(function(c) { c.classList.remove('profesional-card--seleccionado'); });
    card.classList.add('profesional-card--seleccionado');
  });
  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') { card.click(); }
  });
});

// ── Confirmar Reserva ──
document.getElementById('btn-confirmar').addEventListener('click', function() {
  var profesional = select_profesional.options[select_profesional.selectedIndex].text;
  var fecha = document.getElementById('input-fecha').value;

  if (!fecha) {
    alert('Por favor selecciona una fecha para tu reserva.');
    return;
  }

  var datos = precios[tipo_seleccionado];
  var reserva = {
    servicio:    'Tratamientos Capilares',
    tipo:        datos.nombre,
    profesional: profesional,
    fecha:       fecha,
    hora:        hora_seleccionada,
    precio:      '$' + datos.precio.toLocaleString('es-CO')
  };

  localStorage.setItem('reserva_tratamientos', JSON.stringify(reserva));

  alert(
    'Reserva guardada!\n\n' +
    'Servicio:     ' + reserva.servicio    + '\n' +
    'Tipo:         ' + reserva.tipo        + '\n' +
    'Profesional:  ' + reserva.profesional + '\n' +
    'Fecha:        ' + reserva.fecha       + '\n' +
    'Hora:         ' + reserva.hora        + '\n' +
    'Total:        ' + reserva.precio
  );
});
