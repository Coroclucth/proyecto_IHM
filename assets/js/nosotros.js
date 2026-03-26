document.addEventListener("DOMContentLoaded", function () {

  const cards = document.querySelectorAll(".nosotros-card--text");

  cards.forEach((card) => {

    card.addEventListener("click", () => {
      card.classList.add("activa");

      setTimeout(() => {
        card.classList.remove("activa");
      }, 300);
    });

  });

});