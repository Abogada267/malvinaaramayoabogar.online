document.addEventListener("DOMContentLoaded", () => {
  const familiaItem = document.getElementById("familia");
  const submenuFamilia = document.getElementById("submenu-familia");
  const menuToggle = document.querySelector('.menu-toggle');
  const servicesList = document.querySelector('.services-list');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && servicesList) {
    menuToggle.addEventListener('click', () => {
      servicesList.classList.toggle('show');
    });
  } else {
    console.error("Elementos 'menu-toggle' o 'services-list' no encontrados.");
  }

  if (familiaItem && submenuFamilia) {
    familiaItem.addEventListener("click", (event) => {
      event.preventDefault();
      submenuFamilia.classList.toggle("submenu-visible");
    });
  } else {
    console.error("Elemento de 'Derechos de Familia' o el 'submenú' no se encontraron. Verifica que los IDs 'familia' y 'submenu-familia' existan en tu HTML.");
  }

  if (navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  } else {
    console.error("Elemento 'nav-menu' no encontrado.");
  }
});











