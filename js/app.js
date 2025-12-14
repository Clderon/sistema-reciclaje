/* ========================================
   APP.JS - Funcionalidad de Componentes
   Mobile First: 375x667
======================================== */

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
});

/* ========================================
     NAVBAR - Navegación con animación
  ======================================== */
function initNavbar() {
  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  const navItems = navbar.querySelectorAll(".navbar__item");

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const href = item.getAttribute("href");

      // Si tiene un href real (no es # o vacío), permite la navegación
      if (href && href !== "#" && href !== "") {
        // Guardar el item activo en localStorage
        const index = Array.from(navItems).indexOf(item);
        localStorage.setItem("activeNavItem", index);

        // Agregar animación antes de navegar
        navItems.forEach((navItem) => {
          navItem.classList.remove("navbar__item--active");
        });
        item.classList.add("navbar__item--animating");
        item.classList.add("navbar__item--active");

        // Pequeño delay para ver la animación antes de navegar
        // La navegación ocurre naturalmente después
        return; // Permite la navegación normal
      }

      // Si es # o data-section, prevenir y manejar internamente
      e.preventDefault();

      // Remover clase activa de todos los items
      navItems.forEach((navItem) => {
        navItem.classList.remove("navbar__item--active");
        navItem.classList.remove("navbar__item--animating");
      });

      // Agregar clase de animación
      item.classList.add("navbar__item--animating");

      // Agregar clase activa al item clickeado
      item.classList.add("navbar__item--active");

      // Remover clase de animación después de completar
      setTimeout(() => {
        item.classList.remove("navbar__item--animating");
      }, 400);

      // Obtener la sección a la que navegar (opcional)
      const section = item.getAttribute("data-section");
      if (section) {
        navigateToSection(section);
      }
    });
  });

  // Restaurar item activo desde localStorage (para navegación entre páginas)
  const savedIndex = localStorage.getItem("activeNavItem");
  if (savedIndex !== null) {
    navItems.forEach((navItem) => {
      navItem.classList.remove("navbar__item--active");
    });
    if (navItems[savedIndex]) {
      navItems[savedIndex].classList.add("navbar__item--active");
    }
  }
}

/* ========================================
     NAVEGACIÓN - Cambiar secciones
  ======================================== */
function navigateToSection(sectionId) {
  // Ocultar todas las secciones
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.remove("section--active");
    section.style.display = "none";
  });

  // Mostrar la sección seleccionada
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = "block";

    // Pequeño delay para la animación de entrada
    setTimeout(() => {
      targetSection.classList.add("section--active");
    }, 10);
  }
}

/* ========================================
     RANKING TABS - Cambiar entre tabs
  ======================================== */
function initRankingTabs() {
  const tabs = document.querySelectorAll(".ranking__tab");

  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remover activo de todos
      tabs.forEach((t) => t.classList.remove("ranking__tab--active"));

      // Agregar activo al clickeado
      tab.classList.add("ranking__tab--active");
    });
  });
}

/* ========================================
     CATEGORÍAS REGISTRO - Selección
  ======================================== */
function initCategorias() {
  const categorias = document.querySelectorAll(".registro__category");

  if (!categorias.length) return;

  categorias.forEach((categoria) => {
    categoria.addEventListener("click", () => {
      // Remover activo de todos
      categorias.forEach((c) =>
        c.classList.remove("registro__category--active")
      );

      // Agregar activo al clickeado
      categoria.classList.add("registro__category--active");
    });
  });
}

/* ========================================
     CONTADOR - Incrementar/Decrementar
  ======================================== */
function initContador() {
  const minusBtn = document.querySelector(".registro__counter-btn--minus");
  const plusBtn = document.querySelector(".registro__counter-btn--plus");
  const valueSpan = document.querySelector(".registro__counter-value");

  if (!minusBtn || !plusBtn || !valueSpan) return;

  let cantidad = 5; // Valor inicial

  function updateValue() {
    valueSpan.textContent = `Cantidad: ${cantidad}`;
  }

  minusBtn.addEventListener("click", () => {
    if (cantidad > 1) {
      cantidad--;
      updateValue();

      // Animación
      valueSpan.classList.add("contador--animating");
      setTimeout(() => {
        valueSpan.classList.remove("contador--animating");
      }, 200);
    }
  });

  plusBtn.addEventListener("click", () => {
    if (cantidad < 99) {
      cantidad++;
      updateValue();

      // Animación
      valueSpan.classList.add("contador--animating");
      setTimeout(() => {
        valueSpan.classList.remove("contador--animating");
      }, 200);
    }
  });
}

/* ========================================
     INICIALIZAR TODO
  ======================================== */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initRankingTabs();
  initCategorias();
  initContador();
});
