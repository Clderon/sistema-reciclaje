/* ========================================
   APP.JS - Funcionalidad de Componentes
   Mobile First: 375x667
======================================== */

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initModalPuntos();
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
     MODAL - Funcionalidad de modales
  ======================================== */
function initModal() {
  const modal = document.getElementById("modal-user-info");
  
  if (!modal) return;

  // Cerrar modal con botón X o click en overlay
  const closeElements = modal.querySelectorAll("[data-close-modal]");
  closeElements.forEach((element) => {
    element.addEventListener("click", () => {
      closeModal(modal);
    });
  });

  // Cerrar modal con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("modal--active")) {
      closeModal(modal);
    }
  });
}

function openModal(modalElement) {
  if (!modalElement) return;
  
  modalElement.classList.add("modal--active");
  document.body.style.overflow = "hidden"; // Prevenir scroll del body
}

function closeModal(modalElement) {
  if (!modalElement) return;
  
  modalElement.classList.remove("modal--active");
  document.body.style.overflow = ""; // Restaurar scroll
}

/* ========================================
     RANKING POSITIONS - Click para ver info
  ======================================== */
function initRankingPositions() {
  const positions = document.querySelectorAll(".ranking__position");
  const modal = document.getElementById("modal-user-info");

  if (!positions.length || !modal) return;

  positions.forEach((position) => {
    position.addEventListener("click", () => {
      // Obtener datos del usuario desde data attributes
      const userData = {
        id: position.dataset.userId,
        name: position.dataset.userName,
        level: position.dataset.userLevel,
        badge: position.dataset.userBadge,
        points: position.dataset.userPoints,
        recyclings: position.dataset.userRecyclings,
        avatar: position.dataset.userAvatar,
        position: position.querySelector(".ranking__position-badge")?.textContent || "?"
      };

      // Actualizar contenido del modal
      updateModalContent(userData);
      
      // Abrir modal
      openModal(modal);
    });
  });
}

function updateModalContent(userData) {
  // Actualizar avatar
  const avatarImg = document.getElementById("modal-avatar");
  if (avatarImg && userData.avatar) {
    avatarImg.src = userData.avatar;
    avatarImg.alt = userData.name;
  }

  // Actualizar nombre
  const username = document.getElementById("modal-username");
  if (username) {
    username.textContent = userData.name || "Usuario";
  }

  // Actualizar nivel
  const level = document.getElementById("modal-level");
  if (level) {
    level.textContent = `Nivel: ${userData.level || "Desconocido"}`;
  }

  // Actualizar badge
  const badge = document.getElementById("modal-badge");
  if (badge) {
    badge.textContent = userData.badge || "N/A";
  }

  // Actualizar puntos
  const points = document.getElementById("modal-points");
  if (points) {
    points.textContent = userData.points || "0";
  }

  // Actualizar reciclajes
  const recyclings = document.getElementById("modal-recyclings");
  if (recyclings) {
    recyclings.textContent = userData.recyclings || "0";
  }

  // Actualizar posición
  const positionEl = document.getElementById("modal-position");
  if (positionEl) {
    positionEl.textContent = userData.position || "?";
  }
}

/* ========================================
     MODAL PUNTOS - Mostrar modal al enviar reciclaje
  ======================================== */
function initModalPuntos() {
  const sendButton = document.querySelector(".button--primary");
  const modalPuntos = document.getElementById("modal-puntos");
  const closeButton = document.getElementById("modal-puntos-close");

  if (!sendButton || !modalPuntos) return;

  // Abrir modal al hacer clic en "Enviar Mi Reciclaje"
  sendButton.addEventListener("click", (e) => {
    e.preventDefault();
    openModalPuntos(modalPuntos);
  });

  // Cerrar modal con el botón "¡Genial!"
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closeModalPuntos(modalPuntos);
    });
  }

  // Cerrar modal al hacer clic en el overlay
  modalPuntos.addEventListener("click", (e) => {
    if (e.target === modalPuntos) {
      closeModalPuntos(modalPuntos);
    }
  });

  // Cerrar modal con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalPuntos.classList.contains("modal-puntos__overlay--hidden")) {
      closeModalPuntos(modalPuntos);
    }
  });
}

function openModalPuntos(modalElement) {
  if (!modalElement) return;
  
  modalElement.classList.remove("modal-puntos__overlay--hidden");
  document.body.style.overflow = "hidden"; // Prevenir scroll del body
}

function closeModalPuntos(modalElement) {
  if (!modalElement) return;
  
  modalElement.classList.add("modal-puntos__overlay--hidden");
  document.body.style.overflow = ""; // Restaurar scroll
}

/* ========================================
     INICIALIZAR TODO
  ======================================== */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initRankingTabs();
  initCategorias();
  initContador();
  initModal();
  initRankingPositions();
  initModalPuntos();
});
