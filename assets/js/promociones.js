document.addEventListener("DOMContentLoaded", function () {

  // Seleccionar todas las tarjetas
  const tarjetas = document.querySelectorAll(".promo-card");

  tarjetas.forEach((card) => {

    // Efecto al pasar el mouse
    card.addEventListener("mouseenter", () => {
      card.style.transform = "scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1)";
    });

  });

  // Botones de reservar
  const botones = document.querySelectorAll(".btn-reservar");

  botones.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const promo = this.closest(".promo-card")
                        .querySelector(".promo-title")
                        .textContent;

      alert("Has seleccionado: " + promo + " 💈");

      
      localStorage.setItem("promo_seleccionada", promo);

      // Redirigir
      window.location.href = "agendar.html";
    });
  });

});
