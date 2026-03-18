// NICOLÁS SANTIAGO CADENA SÁNCHEZ - DETALLE BARBA

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

  var reserva = {
    servicio:    'Arreglo de Barba',
    profesional: profesional,
    fecha:       fecha,
    hora:        hora_seleccionada,
    precio:      '$18.000'
  };

  localStorage.setItem('reserva_barba', JSON.stringify(reserva));

  alert(
    '¡Reserva guardada!\n\n' +
    'Servicio:     ' + reserva.servicio    + '\n' +
    'Profesional:  ' + reserva.profesional + '\n' +
    'Fecha:        ' + reserva.fecha       + '\n' +
    'Hora:         ' + reserva.hora        + '\n' +
    'Total:        ' + reserva.precio
  );
});
