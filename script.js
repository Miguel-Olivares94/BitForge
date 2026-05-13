// ============================================
// FUNCIONALIDAD INTERACTIVA COMPLETA
// ============================================

// ============================================
// EFECTO MATRIX - CÃ“DIGO CAYENDO
// ============================================

const MATRIX_CHARS = '01ã‚¢ã‚¤ã‚¦ã‚¨ã‚ªã‚«ã‚­ã‚¯ã‚±ã‚³ã‚µã‚·ã‚¹ã‚»ã‚½ã‚¿ãƒãƒ„ãƒ†ãƒˆãƒŠãƒ‹ãƒŒãƒãƒŽãƒãƒ’ãƒ•ãƒ˜ãƒ›ãƒžãƒŸãƒ ãƒ¡ãƒ¢ãƒ¤ãƒ¦ãƒ¨ãƒ©ãƒªãƒ«ãƒ¬ãƒ­ãƒ¯ãƒ²ãƒ³';

function inicializarMatrix() {
    const background = document.getElementById('matrixBackground');
    if (!background) return;

    const columns = Math.floor(window.innerWidth / 70); // Menos columnas
    const charHeight = 13;

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * window.innerWidth + 'px';
        column.style.animationDuration = (Math.random() * 15 + 10) + 's';

        // Crear caracteres para la columna - menos caracteres
        const charCount = Math.floor(window.innerHeight / charHeight / 2); // Mitad de caracteres
        for (let j = 0; j < charCount; j++) {
            const char = document.createElement('div');
            char.className = 'matrix-char' + (Math.random() > 0.9 ? ' bright' : ''); // Menos bright
            char.textContent = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
            char.style.animationDelay = (j * 0.15) + 's';
            char.style.animationDuration = (Math.random() * 15 + 10) + 's';
            column.appendChild(char);
        }

        background.appendChild(column);

        // Regenerar columnas despuÃ©s de desaparecer - intervalo mÃ¡s largo
        const regenerateInterval = setInterval(() => {
            if (!column.parentElement) {
                clearInterval(regenerateInterval);
                return;
            }
            
            column.remove();
            const newColumn = document.createElement('div');
            newColumn.className = 'matrix-column';
            newColumn.style.left = Math.random() * window.innerWidth + 'px';
            newColumn.style.animationDuration = (Math.random() * 15 + 10) + 's';

            const charCount = Math.floor(window.innerHeight / charHeight / 2);
            for (let j = 0; j < charCount; j++) {
                const char = document.createElement('div');
                char.className = 'matrix-char' + (Math.random() > 0.9 ? ' bright' : '');
                char.textContent = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
                char.style.animationDelay = (j * 0.15) + 's';
                char.style.animationDuration = (Math.random() * 15 + 10) + 's';
                newColumn.appendChild(char);
            }

            background.appendChild(newColumn);
        }, 40000); // MÃ¡s tiempo entre regeneraciones
    }
}

// Agregar efectos a los botones de enlaces rÃ¡pidos
document.querySelectorAll('.link-button').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const icon = this.querySelector('.link-icon');
        if (icon) {
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'scaleIcon 0.4s ease-out';
            }, 10);
        }
    });

    button.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
        }
    });
});

// Agregar efectos a las tarjetas de servicios
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'pulse 0.6s ease-out';
        }, 10);
    });
});

// Manejo del formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const nombre = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const tipo = this.querySelector('select').value;
        
        if (nombre && email && tipo !== 'Selecciona tipo de proyecto') {
            // Simular envÃ­o
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'âœ“ Enviado';
            submitBtn.style.background = 'linear-gradient(135deg, #FFB84D, #C0C0C0)';
            
            // Resetear despuÃ©s de 2 segundos
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #FF8C00, #FFB84D)';
                this.reset();
            }, 2000);
        }
    });
}

// Efecto parallax suave en la esfera
window.addEventListener('mousemove', (e) => {
    const sphere = document.querySelector('.sphere');
    if (sphere && window.innerWidth > 768) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
        
        sphere.style.transform = `translate(${moveX}px, ${moveY}px) rotateY(var(--rotY, 0deg)) rotateX(20deg)`;
    }
});

// AnimaciÃ³n de carga de la pÃ¡gina
window.addEventListener('load', function() {
    document.body.style.animation = 'fadeIn 0.8s ease-in';
    
    // Animar elementos al cargar
    const sections = document.querySelectorAll('.hero, .quick-links, .services-section, .tech-stack-section, .leadership-message, .contact-section');
    sections.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.8s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// Smooth scroll para anclas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Calcular offset para el header
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // AÃ±adir efecto visual
                target.style.animation = 'none';
                setTimeout(() => {
                    target.style.animation = 'highlightSection 1s ease-out';
                }, 10);
            }
        }
    });
});

// Efecto de scroll para apariciÃ³n de elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .tech-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Agregar animaciÃ³n de scroll al header
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Cambiar opacidad de la esfera basada en scroll
    const sphereContainer = document.querySelector('.sphere-container');
    if (sphereContainer && window.innerWidth > 768) {
        const opacity = Math.max(0.05, 0.15 - (currentScroll / 3000));
        sphereContainer.style.opacity = opacity;
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Detectar si el dispositivo soporta transform 3D
function supports3DTransforms() {
    const el = document.createElement('p');
    const transforms = {
        'WebkitTransform': '-webkit-transform',
        'OTransform': '-o-transform',
        'msTransform': '-ms-transform',
        'MozTransform': '-moz-transform',
        'transform': 'transform'
    };
    
    for (let t in transforms) {
        if (el.style[t] !== undefined) {
            el.style[t] = 'translate3d(1px,1px,1px)';
            return window.getComputedStyle(el).getPropertyValue(transforms[t]) !== 'none';
        }
    }
    return false;
}

// Log de informaciÃ³n
console.log('%cHarpers Co.%c', 'font-size: 24px; color: #ff1493; font-weight: bold;', 'color: #87ceeb;');
console.log('%cGuÃ­a PrÃ¡ctica para Empleados', 'color: #da70d6; font-weight: bold;');
console.log('%c3D Transforms disponibles:', supports3DTransforms() ? 'SÃ­ âœ“' : 'No âœ—', 'color: #00d4ff;');

// ============================================
// LEVANTAMIENTO DE REQUERIMIENTOS - FUNCIONALIDAD COMPLETA
// ============================================
// 
// CONFIGURACIÃ“N IMPORTANTE:
// Para integrar con email, elige una opciÃ³n:
// 
// OPCIÃ“N 1: EmailJS (Recomendado)
// 1. Ve a https://www.emailjs.com/
// 2. Crea una cuenta y obtÃ©n: PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID
// 3. Reemplaza en la lÃ­nea ~550: emailjs.send(SERVICE_ID, TEMPLATE_ID, ...)
// 4. Descomentar la lÃ­nea: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
//
// OPCIÃ“N 2: FormSubmit (MÃ¡s simple)
// 1. Cambia en form-phase1: action="https://formsubmit.co/tu@email.com"
// 2. Cambia en form-phase2: action="https://formsubmit.co/tu@email.com"
//
// OPCIÃ“N 3: Backend Propio
// Reemplaza la URL en enviarSolicitud() con tu endpoint backend
// El backend recibirÃ¡ los datos en JSON y puede:
// - Guardar en base de datos
// - Enviar email automÃ¡tico
// - Crear URL de encuesta personalizada
// ============================================

// Variables globales
let currentPhase = 1;
const totalPhases = 2;

// Inicializar elementos del formulario
document.addEventListener('DOMContentLoaded', function() {
    inicializarMatrix();
    inicializarCarrusel();
    inicializarLevantamientoRequerimientos();
});

// ============================================
// CARRUSEL DE SERVICIOS
// ============================================

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function inicializarCarrusel() {
    // Crear indicadores
    const indicatorsContainer = document.getElementById('carouselIndicators');
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }

    // Botones de navegaciÃ³n
    document.getElementById('carouselPrev').addEventListener('click', () => previousSlide());
    document.getElementById('carouselNext').addEventListener('click', () => nextSlide());

    // Auto-advance cada 5 segundos
    setInterval(nextSlide, 5000);
}

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Actualizar indicadores
    document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function inicializarLevantamientoRequerimientos() {
    const btnNextPhase1 = document.getElementById('btn-next-phase1');
    const btnBackPhase2 = document.getElementById('btn-back-phase2');
    const formPhase1 = document.getElementById('form-phase1');
    const formPhase2 = document.getElementById('form-phase2');
    const btnNewRequest = document.getElementById('btn-new-request');

    // Event Listeners
    if (btnNextPhase1) {
        btnNextPhase1.addEventListener('click', function() {
            if (validarFase1()) {
                cambiarFase(2);
            }
        });
    }

    if (btnBackPhase2) {
        btnBackPhase2.addEventListener('click', function() {
            cambiarFase(1);
        });
    }

    if (formPhase2) {
        formPhase2.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envÃ­o nativo
            if (validarFase2()) {
                enviarSolicitudCompleta(); // Enviar al servidor Node.js
            }
        });
    }

    if (btnNewRequest) {
        btnNewRequest.addEventListener('click', function() {
            reiniciarFormulario();
        });
    }

    // ValidaciÃ³n en tiempo real
    agregarValidacionTiempoReal();
}

/**
 * Valida los campos del formulario Fase 1
 * @returns {boolean} true si todos los campos son vÃ¡lidos
 */
function validarFase1() {
    const nombre = document.getElementById('nombre');
    const empresa = document.getElementById('empresa');
    const correo = document.getElementById('correo');
    const telefono = document.getElementById('telefono');
    const tipoProyecto = document.getElementById('tipo-proyecto');
    const mensaje = document.getElementById('mensaje-inicial');

    let esValido = true;

    // Validar nombre
    if (!nombre.value.trim()) {
        mostrarError('nombre', 'El nombre es requerido');
        esValido = false;
    } else if (nombre.value.trim().length < 3) {
        mostrarError('nombre', 'El nombre debe tener al menos 3 caracteres');
        esValido = false;
    } else {
        limpiarError('nombre');
    }

    // Validar empresa
    if (!empresa.value.trim()) {
        mostrarError('empresa', 'La empresa es requerida');
        esValido = false;
    } else {
        limpiarError('empresa');
    }

    // Validar correo
    if (!correo.value.trim()) {
        mostrarError('correo', 'El correo es requerido');
        esValido = false;
    } else if (!validarFormatoEmail(correo.value)) {
        mostrarError('correo', 'Ingresa un correo vÃ¡lido');
        esValido = false;
    } else {
        limpiarError('correo');
    }

    // Validar telÃ©fono
    if (!telefono.value.trim()) {
        mostrarError('telefono', 'El telÃ©fono es requerido');
        esValido = false;
    } else {
        limpiarError('telefono');
    }

    // Validar tipo de proyecto
    if (!tipoProyecto.value) {
        mostrarError('tipo-proyecto', 'Selecciona un tipo de proyecto');
        esValido = false;
    } else {
        limpiarError('tipo-proyecto');
    }

    // Validar mensaje
    if (!mensaje.value.trim()) {
        mostrarError('mensaje-inicial', 'El mensaje inicial es requerido');
        esValido = false;
    } else if (mensaje.value.trim().length < 10) {
        mostrarError('mensaje-inicial', 'El mensaje debe tener al menos 10 caracteres');
        esValido = false;
    } else {
        limpiarError('mensaje-inicial');
    }

    return esValido;
}

/**
 * Valida los campos del formulario Fase 2
 * @returns {boolean} true si todos los campos son vÃ¡lidos
 */
function validarFase2() {
    const objetivoPrincipal = document.getElementById('objetivo-principal');
    const dominio = document.querySelector('input[name="dominio"]:checked');
    const hosting = document.querySelector('input[name="hosting"]:checked');
    const logo = document.querySelector('input[name="logo"]:checked');
    const ecommerce = document.querySelector('input[name="ecommerce"]:checked');
    const adminPanel = document.querySelector('input[name="admin_panel"]:checked');
    const usuariosRoles = document.querySelector('input[name="usuarios_roles"]:checked');
    const whatsapp = document.querySelector('input[name="whatsapp"]:checked');
    const presupuesto = document.getElementById('presupuesto');
    const fechaEntrega = document.getElementById('fecha-entrega');

    let esValido = true;

    // Validar objetivo
    if (!objetivoPrincipal.value) {
        mostrarErrorSelect('objetivo-principal', 'Selecciona un objetivo');
        esValido = false;
    } else {
        limpiarErrorSelect('objetivo-principal');
    }

    // Validar radios
    if (!dominio) {
        esValido = false;
    }
    if (!hosting) {
        esValido = false;
    }
    if (!logo) {
        esValido = false;
    }
    if (!ecommerce) {
        esValido = false;
    }
    if (!adminPanel) {
        esValido = false;
    }
    if (!usuariosRoles) {
        esValido = false;
    }
    if (!whatsapp) {
        esValido = false;
    }

    // Validar presupuesto
    if (!presupuesto.value) {
        mostrarErrorSelect('presupuesto', 'Selecciona un rango de presupuesto');
        esValido = false;
    } else {
        limpiarErrorSelect('presupuesto');
    }

    // Validar fecha
    if (!fechaEntrega.value.trim()) {
        mostrarErrorFecha();
        esValido = false;
    }

    return esValido;
}

/**
 * Cambia entre fases del formulario con animaciÃ³n
 * @param {number} phase - NÃºmero de fase a mostrar
 */
function cambiarFase(phase) {
    if (phase < 1 || phase > totalPhases + 1) return;

    // Animar fase actual
    const phaseActual = document.getElementById(`phase${currentPhase}`);
    if (phaseActual) {
        phaseActual.classList.add('exit-left');
        phaseActual.classList.remove('active');
    }

    // PequeÃ±o delay para animaciÃ³n
    setTimeout(() => {
        currentPhase = phase;

        // Mostrar nueva fase
        const phaseNueva = document.getElementById(`phase${phase}`);
        if (phaseNueva) {
            phaseNueva.classList.remove('exit-left');
            phaseNueva.classList.add('active');
        }

        // Actualizar barra de progreso
        actualizarProgreso();

        // Scroll a la secciÃ³n
        setTimeout(() => {
            const sectionRequirements = document.querySelector('.requirements-section');
            if (sectionRequirements && window.innerWidth < 768) {
                sectionRequirements.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }, 300);
}

/**
 * Actualiza la barra de progreso
 */
function actualizarProgreso() {
    const progressFill = document.getElementById('progressFill');
    const progressStep = document.getElementById('progressStep');
    const progressPercent = document.getElementById('progressPercent');

    const porcentaje = (currentPhase / totalPhases) * 100;

    if (progressFill) {
        progressFill.style.width = porcentaje + '%';
    }
    if (progressStep) {
        progressStep.textContent = `Paso ${currentPhase} de ${totalPhases}`;
    }
    if (progressPercent) {
        progressPercent.textContent = Math.round(porcentaje) + '%';
    }
}

/**
 * Muestra un mensaje de error en un campo
 * @param {string} fieldId - ID del campo
 * @param {string} message - Mensaje de error
 */
function mostrarError(fieldId, message) {
    const errorElement = document.getElementById(`error-${fieldId}`);
    const formGroup = document.getElementById(fieldId).parentElement;

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    if (formGroup) {
        formGroup.classList.add('has-error');
    }
}

/**
 * Limpia los mensajes de error de un campo
 * @param {string} fieldId - ID del campo
 */
function limpiarError(fieldId) {
    const errorElement = document.getElementById(`error-${fieldId}`);
    const field = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.classList.remove('show');
    }

    if (field && field.parentElement) {
        field.parentElement.classList.remove('has-error');
    }
}

/**
 * Muestra error en select
 */
function mostrarErrorSelect(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.parentElement.classList.add('has-error');
    }
}

/**
 * Limpia error en select
 */
function limpiarErrorSelect(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.parentElement.classList.remove('has-error');
    }
}

/**
 * Muestra error en campo de fecha
 */
function mostrarErrorFecha() {
    const field = document.getElementById('fecha-entrega');
    if (field) {
        field.parentElement.classList.add('has-error');
    }
}

/**
 * Valida el formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} true si es vÃ¡lido
 */
function validarFormatoEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * AÃ±ade validaciÃ³n en tiempo real a los campos
 */
function agregarValidacionTiempoReal() {
    const campos = ['nombre', 'empresa', 'correo', 'telefono', 'tipo-proyecto', 'mensaje-inicial'];

    campos.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function() {
                if (this.value.trim()) {
                    limpiarError(fieldId);
                }
            });
        }
    });
}

/**
 * Recopila todos los datos del formulario
 * @returns {Object} Objeto con todos los datos
 */
function recopilarDatos() {
    const datos = {
        // Fase 1
        nombre: document.getElementById('nombre').value,
        empresa: document.getElementById('empresa').value,
        correo: document.getElementById('correo').value,
        telefono: document.getElementById('telefono').value,
        tipo_proyecto: document.getElementById('tipo-proyecto').value,
        mensaje_inicial: document.getElementById('mensaje-inicial').value,

        // Fase 2
        objetivo_principal: document.getElementById('objetivo-principal').value,
        dominio: document.querySelector('input[name="dominio"]:checked').value,
        hosting: document.querySelector('input[name="hosting"]:checked').value,
        logo: document.querySelector('input[name="logo"]:checked').value,
        ecommerce: document.querySelector('input[name="ecommerce"]:checked').value,
        admin_panel: document.querySelector('input[name="admin_panel"]:checked').value,
        usuarios_roles: document.querySelector('input[name="usuarios_roles"]:checked').value,
        whatsapp: document.querySelector('input[name="whatsapp"]:checked').value,
        presupuesto: document.getElementById('presupuesto').value,
        fecha_entrega: document.getElementById('fecha-entrega').value,
        referencias: document.getElementById('referencias').value,
        comentarios: document.getElementById('comentarios').value,
        fecha_envio: new Date().toLocaleString('es-CL')
    };

    return datos;
}

/**
 * EnvÃ­a la solicitud completa
 * CONFIGURACIÃ“N: Usa servidor Node.js backend
 * URL del servidor: http://localhost:3000/api/enviar-solicitud (desarrollo)
 *                   https://tu-url-render.onrender.com/api/enviar-solicitud (producciÃ³n)
 */
function enviarSolicitudCompleta() {
    const btnSubmit = document.getElementById('btn-submit');
    
    // Recopilar todos los datos
    const datos = recopilarDatos();

    console.log('ðŸ“¨ Enviando datos al servidor Node.js:', datos);

    // URL del servidor (cambiar segÃºn ambiente)
    const SERVIDOR_URL = 'https://89g07sgq-3000.brs.devtunnels.ms/api/enviar-solicitud'; // DevTunnel - Remoto
    // const SERVIDOR_URL = 'http://localhost:3000/api/enviar-solicitud'; // Desarrollo local
    // const SERVIDOR_URL = 'https://tu-render-url.onrender.com/api/enviar-solicitud'; // ProducciÃ³n

    // Mostrar estado de envÃ­o
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'â³ Enviando...';

    // Enviar datos al servidor
    fetch(SERVIDOR_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        console.log('Respuesta del servidor:', response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('âœ… Solicitud enviada exitosamente:', data);
        
        // Mostrar pantalla de Ã©xito
        cambiarFase(3);
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'ðŸ“¨ Enviar Solicitud';
    })
    .catch(error => {
        console.error('âŒ Error al enviar:', error);
        
        // Mostrar error al usuario
        alert('âŒ Error al enviar la solicitud. Intenta de nuevo.\n\nError: ' + error.message);
        
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'ðŸ“¨ Enviar Solicitud';
    });
}

function mostrarExito() {
    const btnSubmit = document.getElementById('btn-submit');
    const loaderIcon = document.getElementById('loader-icon');
    loaderIcon.textContent = 'âœ¨';
    setTimeout(() => {
        cambiarFase(3);
        btnSubmit.classList.remove('loading');
        console.log('âœ… Â¡Solicitud procesada con Ã©xito!');
    }, 1500);
}

/**
 * EnvÃ­a los datos al backend
 * CONFIGURABLE: Reemplaza 'tu-backend.com' con tu URL real
 */
function enviarAlBackend(datos, btnSubmit, loaderIcon) {
    // URL DEL BACKEND - CAMBIAR AQUÃ CON TU URL REAL
    const backendURL = 'https://tu-backend.com/api/solicitudes';
    // O LOCALHOST para desarrollo: 'http://localhost:3000/api/solicitudes'

    fetch(backendURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        console.log('Solicitud enviada exitosamente:', data);
        mostrarPantallaExito(btnSubmit, loaderIcon);
    })
    .catch(error => {
        console.error('Error al enviar:', error);
        // Si falla, simular Ã©xito (comentar en producciÃ³n)
        console.log('Simulando envÃ­o exitoso (sin backend)');
        mostrarPantallaExito(btnSubmit, loaderIcon);
    });
}

// ============================================
// WIDGET CHAT AUTOMATIZADO - TOMA DE REQUERIMIENTOS
// ============================================

/**
 * SISTEMA DE CHAT ESTRATÃ‰GICO CON CALIFICACIÃ“N DE LEADS
 * 
 * Estrategia de venta:
 * 1. Pitch inicial (posicionar valor)
 * 2. CalificaciÃ³n por presupuesto
 * 3. Descubrimiento de problema (pain point)
 * 4. Soluciones especÃ­ficas
 * 5. Timeline y contacto
 * 6. Cierre fuerte con CTA
 */

/**
 * CHATBOT AGENTE DE VENTAS EXPERTO - VERSIÃ“N 2.0
 * Sistema conversacional inteligente para toma de requerimientos
 * Especializado en sistemas, software, CRM, ERP, ecommerce, automatizaciones
 */
class ChatBot {
    constructor() {
        // Referencias a elementos DOM
        this.chatWidget = document.getElementById('chat-widget');
        this.chatWindow = document.getElementById('chat-window');
        this.chatToggleBtn = document.getElementById('chat-toggle-btn');
        this.chatCloseBtn = document.getElementById('chat-close-btn');
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.chatSendBtn = document.getElementById('chat-send-btn');
        this.chatOptions = document.getElementById('chat-options');
        
        // Estado
        this.isOpen = false;
        this.currentPhase = 'greeting';
        this.conversationHistory = []; // Historial de todo lo que el usuario dice
        this.conversationData = {
            empresa: '',
            tamaÃ±o: '',
            industria: '',
            problemasPrincipales: [],
            procesosActuales: '',
            procesosAAutomatizar: [],
            funcionesNecesarias: [],
            usuariosEstimados: 0,
            tiposUsuarios: [],
            reportesNecesarios: [],
            integraciÃ³nRequerida: false,
            sistemasExistentes: [],
            presupuesto: '',
            timeline: '',
            nombre: '',
            email: '',
            telefono: '',
            notasAdicionales: ''
        };
        
        this.detectedNeeds = {
            erp: false,
            crm: false,
            ecommerce: false,
            automatizacion: false,
            integracion: false,
            dashboard: false,
            appMobile: false,
            ia: false,
            admin: false,
            pagos: false,
            inventario: false,
            rrhh: false
        };
        
        // Inicializar
        this.initializeListeners();
    }
    
    initializeListeners() {
        this.chatToggleBtn.addEventListener('click', () => this.toggleChat());
        this.chatCloseBtn.addEventListener('click', () => this.closeChat());
        this.chatSendBtn.addEventListener('click', () => this.handleInput());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleInput();
            }
        });
    }
    
    toggleChat() {
        if (this.isOpen) this.closeChat();
        else this.openChat();
    }
    
    openChat() {
        this.isOpen = true;
        this.chatWindow.classList.remove('hidden');
        this.chatToggleBtn.style.display = 'none';
        
        // Mostrar saludo si es primera vez
        if (this.chatMessages.children.length === 0) {
            this.showGreeting();
        }
    }
    
    closeChat() {
        this.isOpen = false;
        this.chatWindow.classList.add('hidden');
        this.chatToggleBtn.style.display = 'flex';
    }
    
    // ============================================
    // FASES DEL CHAT
    // ============================================
    
    showGreeting() {
        this.addMessage('ðŸ‘‹ Â¡Hola! Soy Lucas, el agente de ventas de BitForge.\n\nSomos una empresa especializada en soluciones empresariales: sistemas web, CRM, ERP, ecommerce, automatizaciones e inteligencia artificial para negocios.\n\nÂ¿Tienes un proyecto o necesidad que quieras resolver? ðŸš€', 'bot');
        
        this.showOptions(['SÃ­, tengo un proyecto', 'Solo explorando / ConsultarÃ­a'], 'greeting');
    }
    
    handleOption(option, phase) {
        this.addMessage(option, 'user');
        
        if (phase === 'greeting') {
            if (option === 'Solo explorando / ConsultarÃ­a') {
                this.addMessage('Entendido. Sin problema, puedo ayudarte a explorar. De todas formas, si necesitas algo especÃ­fico en el futuro, estarÃ© aquÃ­. ðŸ’¬', 'bot');
                setTimeout(() => this.startQualification(), 500);
            } else {
                setTimeout(() => this.askAboutBusiness(), 500);
            }
        }
    }
    
    askAboutBusiness() {
        this.currentPhase = 'business';
        this.chatOptions.innerHTML = '';
        this.chatInput.style.display = 'block';
        this.chatSendBtn.style.display = 'block';
        
        this.addMessage('Perfecto, vamos a entender bien tu negocio para recomendarte la mejor soluciÃ³n.\n\nPrimero: Â¿CuÃ©ntame sobre tu empresa? (Nombre, tamaÃ±o, sector/industria)', 'bot');
        this.chatInput.placeholder = 'Ej: Somos una empresa de logÃ­stica con 50 empleados...';
        this.chatInput.focus();
    }
    
    handleInput() {
        const input = this.chatInput.value.trim();
        if (!input) return;
        
        this.addMessage(input, 'user');
        this.conversationHistory.push(input);
        this.chatInput.value = '';
        
        // Analizar y continuar
        this.analyzeAndContinue(input);
    }
    
    analyzeAndContinue(userInput) {
        switch(this.currentPhase) {
            case 'business':
                this.conversationData.empresa = userInput;
                this.detectIndustry(userInput);
                setTimeout(() => this.askAboutProblems(), 800);
                break;
            case 'problems':
                this.conversationData.problemasPrincipales.push(userInput);
                this.analyzeForNeeds(userInput);
                setTimeout(() => this.askAboutProcesses(), 800);
                break;
            case 'processes':
                this.conversationData.procesosActuales = userInput;
                this.analyzeProcesses(userInput);
                setTimeout(() => this.askAboutFunctionality(), 800);
                break;
            case 'features':
                this.conversationData.funcionesNecesarias.push(userInput);
                this.analyzeFeatures(userInput);
                setTimeout(() => this.askForContact(), 800);
                break;
            case 'contact':
                this.handleContactInfo(userInput);
                break;
        }
    }
    
    askAboutProblems() {
        this.currentPhase = 'problems';
        this.addMessage('ðŸ‘ Gracias por esa informaciÃ³n.\n\nAhora lo importante: Â¿CuÃ¡les son los **principales desafÃ­os o problemas** que enfrentas actualmente en tu operaciÃ³n? (Procesos lentos, informaciÃ³n desorganizada, dificultad para tomar decisiones, etc.)', 'bot');
        this.chatInput.placeholder = 'Ej: No tenemos control de inventario en tiempo real...';
    }
    
    askAboutProcesses() {
        this.currentPhase = 'processes';
        this.addMessage('Entiendo. Esos son desafÃ­os comunes.\n\nCuÃ©ntame: **Â¿CuÃ¡les son los procesos que hoy haces de forma manual** o que gustarÃ­a automatizar? (Ã“rdenes de compra, facturaciÃ³n, reportes, etc.)', 'bot');
        this.chatInput.placeholder = 'Ej: Actualmente generamos reportes manualmente cada semana...';
    }
    
    askAboutFunctionality() {
        this.currentPhase = 'features';
        this.addMessage('Claro. Y pensando en la soluciÃ³n ideal:\n\n**Â¿QuÃ© funcionalidades especÃ­ficas necesitas?** (Panel de control, gestiÃ³n de usuarios, pagos online, alertas, historial, etc.)', 'bot');
        this.chatInput.placeholder = 'Ej: Necesitamos un dashboard con mÃ©tricas en tiempo real...';
    }
    
    askForContact() {
        this.currentPhase = 'contact';
        this.chatOptions.innerHTML = '';
        this.addMessage('Excelente. Para poder hacerte seguimiento y propuesta personalizada:\n\nÂ¿CuÃ¡l es tu nombre y correo electrÃ³nico?', 'bot');
        this.chatInput.placeholder = 'Nombre';
    }
    
    handleContactInfo(input) {
        if (this.conversationData.nombre === '') {
            this.conversationData.nombre = input;
            this.chatInput.placeholder = 'tu@email.com';
            this.addMessage(`Gracias ${input}. Y tu correo:`, 'bot');
            this.chatInput.value = '';
        } else if (this.conversationData.email === '') {
            if (!this.validateEmail(input)) {
                this.addMessage('Ese no parece ser un email vÃ¡lido. Intenta de nuevo:', 'bot');
                return;
            }
            this.conversationData.email = input;
            this.chatInput.placeholder = '+56 9 XXXX XXXX';
            this.addMessage(`Perfecto. Y tu telÃ©fono de contacto:`, 'bot');
            this.chatInput.value = '';
        } else if (this.conversationData.telefono === '') {
            this.conversationData.telefono = input;
            setTimeout(() => this.generateSummary(), 800);
        }
    }
    
    analyzeForNeeds(text) {
        const lower = text.toLowerCase();
        
        // ERP
        if (this.matchesKeywords(lower, ['inventario', 'stock', 'compra', 'proveedor', 'producciÃ³n', 'materia prima'])) {
            this.detectedNeeds.inventario = true;
            this.detectedNeeds.erp = true;
        }
        
        // CRM
        if (this.matchesKeywords(lower, ['cliente', 'lead', 'venta', 'seguimiento', 'oportunidad', 'contacto'])) {
            this.detectedNeeds.crm = true;
        }
        
        // Ecommerce
        if (this.matchesKeywords(lower, ['vender online', 'tienda', 'pago', 'carrito', 'ecommerce'])) {
            this.detectedNeeds.ecommerce = true;
            this.detectedNeeds.pagos = true;
        }
        
        // AutomatizaciÃ³n
        if (this.matchesKeywords(lower, ['manual', 'automatizar', 'repetitivo', 'tareas', 'procesos'])) {
            this.detectedNeeds.automatizacion = true;
        }
        
        // IA
        if (this.matchesKeywords(lower, ['inteligencia', 'predicciÃ³n', 'anÃ¡lisis', 'machine learning', 'ia'])) {
            this.detectedNeeds.ia = true;
        }
    }
    
    analyzeProcesses(text) {
        this.analyzeForNeeds(text);
        
        const lower = text.toLowerCase();
        if (this.matchesKeywords(lower, ['integraciÃ³n', 'conectar', 'sincronizar', 'sistemas', 'api'])) {
            this.detectedNeeds.integracion = true;
        }
    }
    
    analyzeFeatures(text) {
        this.analyzeForNeeds(text);
        
        const lower = text.toLowerCase();
        if (this.matchesKeywords(lower, ['dashboard', 'reporte', 'grÃ¡fico', 'mÃ©trica', 'analÃ­tica'])) {
            this.detectedNeeds.dashboard = true;
        }
        
        if (this.matchesKeywords(lower, ['mÃ³vil', 'app', 'celular'])) {
            this.detectedNeeds.appMobile = true;
        }
    }
    
    matchesKeywords(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }
    
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    detectIndustry(text) {
        const lower = text.toLowerCase();
        if (this.matchesKeywords(lower, ['retail', 'tienda', 'venta'])) {
            this.detectedNeeds.ecommerce = true;
        }
        if (this.matchesKeywords(lower, ['logÃ­stica', 'transporte', 'envÃ­o'])) {
            this.detectedNeeds.inventario = true;
        }
    }
    
    async generateSummary() {
        this.currentPhase = 'summary';
        this.chatInput.style.display = 'none';
        this.chatSendBtn.style.display = 'none';
        
        this.addMessage('â³ Un momento, estoy analizando tu caso...', 'bot');
        
        await new Promise(r => setTimeout(r, 2000));
        
        // Generar recomendaciones
        const recommendations = this.generateRecommendations();
        
        // Mostrar resumen profesional
        const summary = this.generateProfessionalSummary(recommendations);
        this.addMessage(summary, 'bot');
        
        // BotÃ³n de contacto
        this.addMessage('Para continuar con tu proyecto y recibir una propuesta personalizada con timeline y presupuesto, te contactaremos en las prÃ³ximas **24 horas**. ðŸ“…\n\nÂ¿Algo mÃ¡s que deberÃ­a saber?', 'bot');
        
        this.chatInput.style.display = 'block';
        this.chatSendBtn.style.display = 'block';
        this.chatSendBtn.textContent = 'Enviar';
        this.chatInput.placeholder = 'CuÃ©ntanos algo adicional (opcional)...';
        
        // Una Ãºltima pregunta
        this.chatInput.addEventListener('change', (e) => {
            if (e.target.value.trim()) {
                this.conversationData.notasAdicionales = e.target.value.trim();
                this.sendData();
            }
        }, { once: true });
        
        // Si no escribe nada, despuÃ©s de un tiempo enviar
        setTimeout(() => {
            this.sendData();
        }, 5000);
    }
    
    generateRecommendations() {
        const recs = {
            modulos: [],
            prioridad: '',
            estimacion: '',
            observaciones: []
        };
        
        if (this.detectedNeeds.erp) {
            recs.modulos.push('ERP - Sistema de GestiÃ³n Empresarial');
            recs.observaciones.push('Control de inventario y procesos operacionales');
        }
        
        if (this.detectedNeeds.crm) {
            recs.modulos.push('CRM - GestiÃ³n de Clientes y Ventas');
            recs.observaciones.push('Seguimiento de leads y oportunidades');
        }
        
        if (this.detectedNeeds.ecommerce) {
            recs.modulos.push('Plataforma Ecommerce');
            recs.observaciones.push('Tienda online con pagos y gestiÃ³n de Ã³rdenes');
        }
        
        if (this.detectedNeeds.dashboard) {
            recs.modulos.push('Dashboard y Reportes Inteligentes');
            recs.observaciones.push('AnÃ¡lisis en tiempo real y toma de decisiones');
        }
        
        if (this.detectedNeeds.appMobile) {
            recs.modulos.push('AplicaciÃ³n MÃ³vil');
            recs.observaciones.push('Acceso desde iOS y Android');
        }
        
        if (this.detectedNeeds.automatizacion) {
            recs.modulos.push('AutomatizaciÃ³n de Procesos');
            recs.observaciones.push('ReducciÃ³n de tareas manuales y optimizaciÃ³n');
        }
        
        if (this.detectedNeeds.integracion) {
            recs.modulos.push('Integraciones con Sistemas Existentes');
            recs.observaciones.push('SincronizaciÃ³n automÃ¡tica de datos');
        }
        
        if (this.detectedNeeds.ia) {
            recs.modulos.push('IA y Machine Learning');
            recs.observaciones.push('Predicciones y anÃ¡lisis inteligentes');
        }
        
        // Prioridad estimada
        if (recs.modulos.length > 3) {
            recs.prioridad = 'ALTA - SoluciÃ³n empresarial compleja';
            recs.estimacion = '3-6 meses';
        } else if (recs.modulos.length > 1) {
            recs.prioridad = 'MEDIA - SoluciÃ³n integrada';
            recs.estimacion = '2-4 meses';
        } else {
            recs.prioridad = 'ESTÃNDAR';
            recs.estimacion = '1-2 meses';
        }
        
        return recs;
    }
    
    generateProfessionalSummary(recs) {
        let summary = `
âœ¨ **RESUMEN DE ANÃLISIS Y RECOMENDACIONES** âœ¨

**Cliente:** ${this.conversationData.nombre}
ðŸ“§ ${this.conversationData.email}
ðŸ“± ${this.conversationData.telefono}

â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”

**ðŸ“Š NECESIDADES IDENTIFICADAS:**
${this.conversationData.problemasPrincipales.map((p, i) => `${i + 1}. ${p}`).join('\n')}

**ðŸ”§ PROCESOS A MEJORAR:**
${this.conversationData.procesosActuales}

**âš™ï¸ FUNCIONALIDADES REQUERIDAS:**
${this.conversationData.funcionesNecesarias.map((f, i) => `${i + 1}. ${f}`).join('\n')}

â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”

**ðŸŽ¯ SOLUCIÃ“N RECOMENDADA:**
${recs.modulos.length > 0 ? recs.modulos.map((m, i) => `${i + 1}. ${m}`).join('\n') : 'SoluciÃ³n personalizada'}

**ðŸ“ˆ PRIORIDAD:** ${recs.prioridad}
â±ï¸ **ESTIMACIÃ“N:** ${recs.estimacion}

**ðŸ” OBSERVACIONES TÃ‰CNICAS:**
${recs.observaciones.map((o, i) => `â€¢ ${o}`).join('\n')}

â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”

ðŸš€ **PRÃ“XIMOS PASOS:**
1. Te enviaremos una propuesta personalizada
2. Llamada de descubrimiento detallado (30 min)
3. DemostraciÃ³n de casos similares
4. Presupuesto y timeline final
        `;
        
        return summary;
    }
    
    async sendData() {
        this.addMessage('ðŸ“¨ Registrando tu informaciÃ³n en nuestro sistema...', 'bot');
        
        const payload = {
            nombre: this.conversationData.nombre,
            email: this.conversationData.email,
            telefono: this.conversationData.telefono,
            empresa: this.conversationData.empresa,
            problemas: this.conversationData.problemasPrincipales,
            procesos: this.conversationData.procesosActuales,
            funcionalidades: this.conversationData.funcionesNecesarias,
            notasAdicionales: this.conversationData.notasAdicionales,
            detectedNeeds: this.detectedNeeds,
            timestamp: new Date().toISOString()
        };
        
        try {
            const response = await fetch('/api/enviar-solicitud', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            this.addMessage('âœ… Perfecto. Tu informaciÃ³n fue registrada.\n\nNuestro equipo senior analizarÃ¡ tu caso y te contactaremos en las prÃ³ximas 24 horas con una propuesta especÃ­fica. ðŸŽ¯', 'bot');
        } catch (error) {
            console.error('Error:', error);
            this.addMessage('âœ… Tu solicitud fue procesada exitosamente.\n\nNos pondremos en contacto muy pronto. ðŸ™Œ', 'bot');
        }
        
        this.chatInput.disabled = true;
        this.chatSendBtn.disabled = true;
        
        setTimeout(() => this.showResetButton(), 2000);
    }
    
    showResetButton() {
        const resetBtn = document.createElement('button');
        resetBtn.className = 'chat-option-btn';
        resetBtn.textContent = 'ðŸ”„ Nueva consulta';
        resetBtn.style.marginTop = '10px';
        resetBtn.addEventListener('click', () => this.resetChat());
        this.chatOptions.innerHTML = '';
        this.chatOptions.classList.remove('hidden');
        this.chatOptions.appendChild(resetBtn);
    }
    
    resetChat() {
        this.currentPhase = 'greeting';
        this.conversationHistory = [];
        this.conversationData = {
            empresa: '', tamaÃ±o: '', industria: '',
            problemasPrincipales: [], procesosActuales: '',
            procesosAAutomatizar: [], funcionesNecesarias: [],
            usuariosEstimados: 0, tiposUsuarios: [],
            reportesNecesarios: [], integraciÃ³nRequerida: false,
            sistemasExistentes: [], presupuesto: '',
            timeline: '', nombre: '', email: '', telefono: '',
            notasAdicionales: ''
        };
        this.detectedNeeds = {
            erp: false, crm: false, ecommerce: false,
            automatizacion: false, integracion: false,
            dashboard: false, appMobile: false, ia: false,
            admin: false, pagos: false, inventario: false, rrhh: false
        };
        
        this.chatMessages.innerHTML = '';
        this.chatInput.value = '';
        this.chatInput.disabled = false;
        this.chatSendBtn.disabled = false;
        this.chatOptions.innerHTML = '';
        this.showGreeting();
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender}`;
        bubble.innerHTML = text; // Permitir markdown simple
        
        messageDiv.appendChild(bubble);
        this.chatMessages.appendChild(messageDiv);
        
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    showOptions(options, phase) {
        this.chatOptions.innerHTML = '';
        this.chatOptions.classList.remove('hidden');
        
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => this.handleOption(option, phase));
            this.chatOptions.appendChild(btn);
        });
    }
    
    startQualification() {
        setTimeout(() => this.askAboutBusiness(), 500);
    }
}

// Inicializar chatbot cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.chatbot = new ChatBot();
    }, 100);
});

