window.onload = function () {
  setTimeout(() => {
    document.getElementById('pantalla-carga').style.display = 'none';
    document.querySelector('.phone-container').style.display = 'block';
  }, 1500);
};

const navButtons = document.querySelectorAll('.nav-btn');

function mostrarPantalla(id) {
  // Cambiar pantallas con animación
  const pantallas = document.querySelectorAll('.pantalla');
  pantallas.forEach(p => {
    if (p.id === id) {
      p.classList.add('activa');
    } else {
      p.classList.remove('activa');
    }
  });

  // Actualizar botón activo en footer
  navButtons.forEach(btn => {
    if (btn.dataset.target === id) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;

    // Si es la pantalla de inicio, limpiar inputs y mensaje error
    if(target === 'pantalla-inicio'){
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      document.getElementById('mensaje-error').textContent = '';
    }

    mostrarPantalla(target);
  });
});

function validarInicio() {
  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value.trim();
  const error = document.getElementById('mensaje-error');

  if (email === "" || pass === "") {
    error.textContent = "Completa todos los campos.";
    return;
  }
  if (!email.includes('@')) {
    error.textContent = "Correo inválido.";
    return;
  }

  localStorage.setItem('correo', email);
  error.textContent = "";
  mostrarPantalla('pantalla-registro');
}

function mostrarImagen(event) {
  const img = document.getElementById('preview-imagen');
  img.src = URL.createObjectURL(event.target.files[0]);
  img.classList.remove('d-none');
}

function seleccionarEstilo(estilo) {
  localStorage.setItem('estilo', estilo);
  document.getElementById('estiloGuardado').textContent = estilo;
  document.getElementById('correoGuardado').textContent = localStorage.getItem('correo');
  mostrarPantalla('pantalla-final');
}
