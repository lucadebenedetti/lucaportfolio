document.addEventListener("DOMContentLoaded", () => {
  const btnTema = document.getElementById("btn-tema");
  const body = document.body;

  if (localStorage.getItem("tema") === "oscuro") {
    body.classList.add("oscuro");
    if (btnTema) btnTema.textContent = "☀️ Modo Claro";
  }

  if (btnTema) {
    btnTema.addEventListener("click", () => {
      body.classList.toggle("oscuro");
      const esOscuro = body.classList.contains("oscuro");
      btnTema.textContent = esOscuro ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
      localStorage.setItem("tema", esOscuro ? "oscuro" : "claro");
    });
  }

  const navbar = document.getElementById("navbar");

  window.onscroll = () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  const formContacto = document.getElementById("form-contacto");
  const estadoForm = document.getElementById("mensaje-estado");

  if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      // Expresión regular básica para validar formato de email
      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      estadoForm.className = "estado-form";
      estadoForm.textContent = "";

      if (nombre.length < 2) {
        e.preventDefault();
        estadoForm.classList.add("error");
        estadoForm.textContent = "Por favor, ingresá tu nombre.";
        return;
      }

      if (!emailValido) {
        e.preventDefault();
        estadoForm.classList.add("error");
        estadoForm.textContent = "Ingresá un correo electrónico con formato válido (ej: nombre@dominio.com).";
        return;
      }

      if (mensaje.length < 10) {
        e.preventDefault();
        estadoForm.classList.add("error");
        estadoForm.textContent = `El mensaje debe tener al menos 10 caracteres (actualmente tiene ${mensaje.length}).`;
        return;
      }

      estadoForm.classList.add("exito");
      estadoForm.textContent = "Enviando mensaje...";
    });
  }

  const tarjetas = document.querySelectorAll(".proyecto-card");

  if ("IntersectionObserver" in window && tarjetas.length > 0) {
    const observador = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("oculto");
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    tarjetas.forEach((tarjeta) => observador.observe(tarjeta));
  } else {
    tarjetas.forEach((t) => t.classList.remove("oculto"));
  }
});