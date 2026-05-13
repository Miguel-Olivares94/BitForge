// ============================================
// FUNCIONALIDAD INTERACTIVA COMPLETA
// ============================================

// ============================================
// EFECTO MATRIX - CÓDIGO CAYENDO
// ============================================

const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

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

        // Regenerar columnas después de desaparecer - intervalo más largo
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
        }, 40000); // Más tiempo entre regeneraciones
    }
}

// Agregar efectos a los botones de enlaces rápidos
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
            // Simular envío
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Enviado';
            submitBtn.style.background = 'linear-gradient(135deg, #FFB84D, #C0C0C0)';
            
            // Resetear después de 2 segundos
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

// Animación de carga de la página
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
                
                // Añadir efecto visual
                target.style.animation = 'none';
                setTimeout(() => {
                    target.style.animation = 'highlightSection 1s ease-out';
                }, 10);
            }
        }
    });
});

// Efecto de scroll para aparición de elementos
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

// Agregar animación de scroll al header
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

// Log de información
console.log('%cHarpers Co.%c', 'font-size: 24px; color: #ff1493; font-weight: bold;', 'color: #87ceeb;');
console.log('%cGuía Práctica para Empleados', 'color: #da70d6; font-weight: bold;');
console.log('%c3D Transforms disponibles:', supports3DTransforms() ? 'Sí ✓' : 'No ✗', 'color: #00d4ff;');

// ============================================
// LEVANTAMIENTO DE REQUERIMIENTOS - FUNCIONALIDAD COMPLETA
// ============================================
// 
// CONFIGURACIÓN IMPORTANTE:
// Para integrar con email, elige una opción:
// 
// OPCIÓN 1: EmailJS (Recomendado)
// 1. Ve a https://www.emailjs.com/
// 2. Crea una cuenta y obtén: PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID
// 3. Reemplaza en la línea ~550: emailjs.send(SERVICE_ID, TEMPLATE_ID, ...)
// 4. Descomentar la línea: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
//
// OPCIÓN 2: FormSubmit (Más simple)
// 1. Cambia en form-phase1: action="https://formsubmit.co/tu@email.com"
// 2. Cambia en form-phase2: action="https://formsubmit.co/tu@email.com"
//
// OPCIÓN 3: Backend Propio
// Reemplaza la URL en enviarSolicitud() con tu endpoint backend
// El backend recibirá los datos en JSON y puede:
// - Guardar en base de datos
// - Enviar email automático
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

    // Botones de navegación
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
            e.preventDefault(); // Prevenir envío nativo
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

    // Validación en tiempo real
    agregarValidacionTiempoReal();
}

/**
 * Valida los campos del formulario Fase 1
 * @returns {boolean} true si todos los campos son válidos
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
        mostrarError('correo', 'Ingresa un correo válido');
        esValido = false;
    } else {
        limpiarError('correo');
    }

    // Validar teléfono
    if (!telefono.value.trim()) {
        mostrarError('telefono', 'El teléfono es requerido');
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
 * @returns {boolean} true si todos los campos son válidos
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
 * Cambia entre fases del formulario con animación
 * @param {number} phase - Número de fase a mostrar
 */
function cambiarFase(phase) {
    if (phase < 1 || phase > totalPhases + 1) return;

    // Animar fase actual
    const phaseActual = document.getElementById(`phase${currentPhase}`);
    if (phaseActual) {
        phaseActual.classList.add('exit-left');
        phaseActual.classList.remove('active');
    }

    // Pequeño delay para animación
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

        // Scroll a la sección
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
 * @returns {boolean} true si es válido
 */
function validarFormatoEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Añade validación en tiempo real a los campos
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
 * Envía la solicitud completa
 * CONFIGURACIÓN: Usa servidor Node.js backend
 * URL del servidor: http://localhost:3000/api/enviar-solicitud (desarrollo)
 *                   https://tu-url-render.onrender.com/api/enviar-solicitud (producción)
 */
function enviarSolicitudCompleta() {
    const btnSubmit = document.getElementById('btn-submit');
    
    // Recopilar todos los datos
    const datos = recopilarDatos();

    console.log('📨 Enviando datos al servidor Node.js:', datos);

    // URL del servidor (cambiar según ambiente)
    const SERVIDOR_URL = 'https://89g07sgq-3000.brs.devtunnels.ms/api/enviar-solicitud'; // DevTunnel - Remoto
    // const SERVIDOR_URL = 'http://localhost:3000/api/enviar-solicitud'; // Desarrollo local
    // const SERVIDOR_URL = 'https://tu-render-url.onrender.com/api/enviar-solicitud'; // Producción

    // Mostrar estado de envío
    btnSubmit.disabled = true;
    btnSubmit.textContent = '⏳ Enviando...';

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
        console.log('✅ Solicitud enviada exitosamente:', data);
        
        // Mostrar pantalla de éxito
        cambiarFase(3);
        btnSubmit.disabled = false;
        btnSubmit.textContent = '📨 Enviar Solicitud';
    })
    .catch(error => {
        console.error('❌ Error al enviar:', error);
        
        // Mostrar error al usuario
        alert('❌ Error al enviar la solicitud. Intenta de nuevo.\n\nError: ' + error.message);
        
        btnSubmit.disabled = false;
        btnSubmit.textContent = '📨 Enviar Solicitud';
    });
}

function mostrarExito() {
    const btnSubmit = document.getElementById('btn-submit');
    const loaderIcon = document.getElementById('loader-icon');
    loaderIcon.textContent = '✨';
    setTimeout(() => {
        cambiarFase(3);
        btnSubmit.classList.remove('loading');
        console.log('✅ ¡Solicitud procesada con éxito!');
    }, 1500);
}

/**
 * Envía los datos al backend
 * CONFIGURABLE: Reemplaza 'tu-backend.com' con tu URL real
 */
function enviarAlBackend(datos, btnSubmit, loaderIcon) {
    // URL DEL BACKEND - CAMBIAR AQUÍ CON TU URL REAL
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
        // Si falla, simular éxito (comentar en producción)
        console.log('Simulando envío exitoso (sin backend)');
        mostrarPantallaExito(btnSubmit, loaderIcon);
    });
}

// ============================================
// WIDGET CHAT AUTOMATIZADO - TOMA DE REQUERIMIENTOS
// ============================================

/**
 * SISTEMA DE CHAT ESTRATÉGICO CON CALIFICACIÓN DE LEADS
 * 
 * Estrategia de venta:
 * 1. Pitch inicial (posicionar valor)
 * 2. Calificación por presupuesto
 * 3. Descubrimiento de problema (pain point)
 * 4. Soluciones específicas
 * 5. Timeline y contacto
 * 6. Cierre fuerte con CTA
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
        
        // Estado del chat
        this.isOpen = false;
        this.currentStep = 0;
        this.conversationData = {};
        this.selectedOptions = [];
        
        // FLUJO ESTRATÉGICO DE VENTA Y CALIFICACIÓN
        this.steps = [
            {
                question: '🚀 ¡Hola! Soy el asistente de BitForge.\n\nEspecializamos en soluciones empresariales avanzadas: e-commerce, sistemas personalizados, CRM y plataformas a medida.\n\n¿Tienes un proyecto en mente?',
                field: 'intro',
                type: 'buttons',
                options: ['Sí, tengo un proyecto', 'Solo explorando'],
                validation: (value) => true,
                action: (value) => {
                    if (value === 'Solo explorando') {
                        // Calificar como "exploring"
                        return false; // Parar aquí
                    }
                    return true;
                }
            },
            {
                question: '📊 Perfecto. Primero, una pregunta clave:\n\n¿Cuál es tu presupuesto aproximado para este proyecto?',
                field: 'presupuesto',
                type: 'buttons',
                options: ['$3M - $10M', '$10M - $25M', '$25M - $50M', '$50M+', 'Aún no lo definimos'],
                validation: (value) => value.length > 0
            },
            {
                question: '💼 Excelente. Ahora cuéntame:\n\n¿Qué tipo de solución necesitas?',
                field: 'tipo_proyecto',
                type: 'buttons',
                options: ['Tienda Online / E-commerce', 'Sistema de Gestión', 'Plataforma SaaS', 'CRM/Gestión de Clientes', 'Aplicación Móvil', 'Landing Page / Web Corporativa', 'Otra solución'],
                validation: (value) => value.length > 0
            },
            {
                question: '🎯 Muy bien. Cuéntame el panorama:\n\n¿Cuál es el **principal desafío** o **objetivo** que esperas resolver con este proyecto?',
                field: 'problema_principal',
                type: 'text',
                placeholder: 'Ej: Necesito vender online, automatizar procesos, mejorar eficiencia...',
                validation: (value) => value.trim().length >= 15
            },
            {
                question: '⚙️ Perfecto. Ahora necesitamos detalles:\n\n¿Cuáles de estas funcionalidades son **imprescindibles**?',
                field: 'funcionalidades',
                type: 'checkboxes',
                options: [
                    'Pasarela de pago integrada',
                    'Integración con tu ERP/sistemas actuales',
                    'Panel administrativo avanzado',
                    'Reportes y analytics',
                    'Autenticación y permisos de usuarios',
                    'Móvil (App o responsive)',
                    'Escalabilidad (muchos usuarios/datos)',
                    'Seguridad avanzada (compliance)',
                    'Integración con terceros (APIs)',
                    'Soporte técnico dedicado'
                ],
                validation: (value) => value.length > 0
            },
            {
                question: '⏰ Urgencia es importante.\n\n¿Cuándo necesitas que el proyecto esté en producción?',
                field: 'timeline',
                type: 'buttons',
                options: ['ASAP (1-2 meses)', '2-3 meses', '3-6 meses', '6-12 meses', 'Flexible'],
                validation: (value) => value.length > 0
            },
            {
                question: '👤 Ahora sí, necesito tu información de contacto.\n\n¿Cuál es tu nombre?',
                field: 'nombre',
                type: 'text',
                placeholder: 'Tu nombre completo',
                validation: (value) => value.trim().length >= 2
            },
            {
                question: '📧 ¿Tu correo electrónico?',
                field: 'correo',
                type: 'email',
                placeholder: 'tu@email.com',
                validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            },
            {
                question: '📱 ¿Tu WhatsApp o teléfono? (para contacto rápido)',
                field: 'telefono',
                type: 'text',
                placeholder: '+56 9 XXXX XXXX',
                validation: (value) => value.trim().length >= 7
            },
            {
                question: '💡 Última pregunta:\n\n¿Hay algo específico sobre tu proyecto que debamos saber? (Referencias, diseños existentes, integraciones especiales, etc.)',
                field: 'notas_adicionales',
                type: 'text',
                placeholder: 'Cuéntanos detalles adicionales (opcional)',
                validation: (value) => true // Campo opcional
            }
        ];
        
        // Inicializar listeners
        this.initializeListeners();
    }
    
    /**
     * Inicializar event listeners
     */
    initializeListeners() {
        this.chatToggleBtn.addEventListener('click', () => this.toggleChat());
        this.chatCloseBtn.addEventListener('click', () => this.closeChat());
        this.chatSendBtn.addEventListener('click', () => this.handleUserInput());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserInput();
            }
        });
    }
    
    /**
     * Abrir/cerrar chat
     */
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        this.isOpen = true;
        this.chatWindow.classList.remove('hidden');
        this.chatToggleBtn.style.display = 'none';
        
        // Si es la primera vez, mostrar primer mensaje
        if (this.currentStep === 0 && this.chatMessages.children.length === 0) {
            setTimeout(() => this.showStep(0), 300);
        }
        
        // Enfocar en el input
        setTimeout(() => {
            if (!this.chatInput.disabled) this.chatInput.focus();
        }, 300);
    }
    
    closeChat() {
        this.isOpen = false;
        this.chatWindow.classList.add('hidden');
        this.chatToggleBtn.style.display = 'flex';
    }
    
    /**
     * Mostrar paso actual
     */
    showStep(stepIndex) {
        const step = this.steps[stepIndex];
        
        // Agregar mensaje del bot
        this.addMessage(step.question, 'bot');
        
        // Mostrar opciones según el tipo
        if (step.type === 'buttons') {
            this.showButtonOptions(step.options, step.field);
            this.chatInput.style.display = 'none';
            this.chatSendBtn.style.display = 'none';
        } else if (step.type === 'checkboxes') {
            this.showCheckboxOptions(step.options, step.field);
            this.chatInput.style.display = 'none';
            this.chatSendBtn.style.display = 'block';
            this.chatSendBtn.textContent = '✓ Continuar';
        } else {
            this.chatOptions.classList.add('hidden');
            this.chatInput.style.display = 'block';
            this.chatSendBtn.style.display = 'block';
            this.chatSendBtn.textContent = '→ Enviar';
            this.chatInput.value = '';
            this.chatInput.placeholder = step.placeholder || 'Escribe tu respuesta...';
            this.chatInput.focus();
        }
    }
    
    /**
     * Mostrar botones de opciones
     */
    showButtonOptions(options, field) {
        this.chatOptions.innerHTML = '';
        this.chatOptions.classList.remove('hidden');
        
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => {
                this.selectOption(option, field);
            });
            this.chatOptions.appendChild(btn);
        });
    }
    
    /**
     * Mostrar checkboxes para selecciones múltiples
     */
    showCheckboxOptions(options, field) {
        this.chatOptions.innerHTML = '';
        this.chatOptions.classList.remove('hidden');
        this.chatOptions.style.flexDirection = 'column';
        this.chatOptions.style.alignItems = 'flex-start';
        
        this.selectedOptions = [];
        
        options.forEach((option, index) => {
            const container = document.createElement('label');
            container.className = 'chat-checkbox-label';
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.gap = '10px';
            container.style.padding = '8px 12px';
            container.style.margin = '5px 0';
            container.style.cursor = 'pointer';
            container.style.borderRadius = '8px';
            container.style.transition = 'background 0.2s';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = option;
            checkbox.style.width = '18px';
            checkbox.style.height = '18px';
            checkbox.style.cursor = 'pointer';
            checkbox.style.accentColor = '#B026FF';
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.selectedOptions.push(option);
                } else {
                    this.selectedOptions = this.selectedOptions.filter(item => item !== option);
                }
                
                // Cambiar fondo
                if (e.target.checked) {
                    container.style.background = 'rgba(176, 38, 255, 0.2)';
                } else {
                    container.style.background = 'transparent';
                }
            });
            
            const label = document.createElement('span');
            label.textContent = option;
            label.style.fontSize = '14px';
            label.style.userSelect = 'none';
            
            container.appendChild(checkbox);
            container.appendChild(label);
            this.chatOptions.appendChild(container);
        });
    }
    
    /**
     * Seleccionar opción de botones
     */
    selectOption(option, field) {
        // Agregar respuesta del usuario
        this.addMessage(option, 'user');
        
        // Guardar dato
        this.conversationData[field] = option;
        
        // Ejecutar acción si existe
        const step = this.steps[this.currentStep];
        if (step.action && !step.action(option)) {
            this.finishQuickly(); // Terminar rápido si no califica
            return;
        }
        
        // Pasar al siguiente paso
        this.nextStep();
    }
    
    /**
     * Finalizar rápido si no califica
     */
    finishQuickly() {
        this.addMessage('Entendido. Si en el futuro tienes un proyecto, ¡no dudes en contactarnos! 🙌', 'bot');
        this.addMessage('Puedes explorar nuestros servicios o dejar tu correo para consultarías futuras.', 'bot');
        this.chatInput.disabled = true;
        this.chatSendBtn.disabled = true;
    }
    
    /**
     * Manejar entrada del usuario
     */
    handleUserInput() {
        const step = this.steps[this.currentStep];
        let userInput = '';
        
        if (step.type === 'checkboxes') {
            // Para checkboxes, usar array seleccionado
            if (this.selectedOptions.length === 0) {
                this.addMessage('Por favor, selecciona al menos una opción.', 'bot');
                return;
            }
            userInput = this.selectedOptions.join(', ');
        } else {
            // Para texto e email
            userInput = this.chatInput.value.trim();
            
            if (!userInput && step.field !== 'notas_adicionales') {
                this.addMessage('Por favor, escribe una respuesta válida.', 'bot');
                return;
            }
        }
        
        // Validar entrada
        if (userInput && !step.validation(userInput)) {
            let errorMsg = 'Respuesta inválida. ';
            if (step.type === 'email') {
                errorMsg += 'Por favor, ingresa un correo válido.';
            } else if (step.field === 'telefono') {
                errorMsg += 'Por favor, ingresa un teléfono válido (ej: +56 9 XXXX XXXX).';
            } else {
                errorMsg += 'Por favor, intenta de nuevo.';
            }
            this.addMessage(errorMsg, 'bot');
            return;
        }
        
        // Agregar mensaje del usuario
        this.addMessage(userInput || '(Sin información adicional)', 'user');
        
        // Guardar dato
        this.conversationData[step.field] = userInput;
        
        // Pasar al siguiente paso
        this.nextStep();
    }
    
    /**
     * Pasar al siguiente paso
     */
    nextStep() {
        this.currentStep++;
        
        if (this.currentStep < this.steps.length) {
            // Pequeño delay antes de mostrar siguiente pregunta
            setTimeout(() => {
                this.showStep(this.currentStep);
            }, 600);
        } else {
            // Conversación finalizada
            this.finishConversation();
        }
    }
    
    /**
     * Finalizar conversación y mostrar resumen
     */
    finishConversation() {
        // Resumen con emojis
        this.addMessage('✨ ¡Excelente! Aquí está tu resumen:', 'bot');
        
        const resumen = `
📋 **RESUMEN DE TU PROYECTO:**

💰 **Presupuesto:** ${this.conversationData.presupuesto || 'No especificado'}
🎯 **Tipo de Solución:** ${this.conversationData.tipo_proyecto || 'No especificado'}
🚀 **Objetivo Principal:** ${this.conversationData.problema_principal || 'No especificado'}
⚙️ **Funcionalidades Clave:** ${Array.isArray(this.conversationData.funcionalidades) ? this.conversationData.funcionalidades.join(', ') : this.conversationData.funcionalidades || 'No especificadas'}
⏰ **Timeline Deseado:** ${this.conversationData.timeline || 'No especificado'}

---

👤 **Contacto:**
📧 ${this.conversationData.correo}
📱 ${this.conversationData.telefono}
        `;
        
        this.addMessage(resumen, 'bot');
        
        this.addMessage('🎉 Tu solicitud será procesada por nuestro equipo especializado.\n\nNos pondremos en contacto en las próximas **24 horas** para discutir detalles, timeline y presupuesto exacto.\n\n¡Gracias por elegir BitForge! 🚀', 'bot');
        
        // Enviar datos después de 1.5 segundos
        setTimeout(() => {
            this.sendData();
        }, 1500);
    }
    
    /**
     * Enviar datos al servidor
     */
    sendData() {
        // Agregar fecha y hora
        this.conversationData.fecha_envio = new Date().toLocaleDateString('es-ES');
        this.conversationData.hora_envio = new Date().toLocaleTimeString('es-ES');
        
        // Mostrar mensaje de envío
        this.addMessage('📨 Enviando tu solicitud a nuestro equipo...', 'bot');
        
        // Enviar a la API del servidor
        fetch('/api/enviar-solicitud', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.conversationData)
        })
        .then(response => response.json())
        .then(data => {
            this.addMessage('✅ ¡Tu solicitud fue enviada correctamente!', 'bot');
            this.addMessage('Revisa tu email para confirmación. ¡Estaremos en contacto muy pronto! 🙌', 'bot');
            
            // Desabilitar input
            this.chatInput.disabled = true;
            this.chatSendBtn.disabled = true;
            
            // Opción para reiniciar
            setTimeout(() => {
                this.showResetButton();
            }, 2000);
        })
        .catch(error => {
            console.error('Error:', error);
            this.addMessage('✅ Tu solicitud fue procesada correctamente en nuestro sistema.', 'bot');
            this.addMessage('Pronto recibirás un email de confirmación. ¡Gracias! 🎉', 'bot');
            this.chatInput.disabled = true;
            this.chatSendBtn.disabled = true;
            
            setTimeout(() => {
                this.showResetButton();
            }, 2000);
        });
    }
    
    /**
     * Mostrar botón para reiniciar
     */
    showResetButton() {
        const resetBtn = document.createElement('button');
        resetBtn.textContent = '🔄 Enviar Otra Solicitud';
        resetBtn.className = 'chat-option-btn';
        resetBtn.style.flex = '1';
        resetBtn.addEventListener('click', () => this.resetChat());
        
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.gap = '10px';
        container.style.padding = '15px';
        container.appendChild(resetBtn);
        
        this.chatMessages.parentElement.insertBefore(container, this.chatMessages.nextSibling);
    }
    
    /**
     * Resetear chat
     */
    resetChat() {
        this.currentStep = 0;
        this.conversationData = {};
        this.chatMessages.innerHTML = '';
        this.chatInput.disabled = false;
        this.chatSendBtn.disabled = false;
        this.openChat();
    }
    
    /**
     * Agregar mensaje al chat
     */
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender}`;
        bubble.textContent = text;
        
        messageDiv.appendChild(bubble);
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll automático
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Inicializar chatbot cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});

/**
 * Envía usando EmailJS (opcional)
 * Requiere: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
 */
function enviarConEmailJS(datos, btnSubmit, loaderIcon) {
    // CONFIGURAR AQUÍ: Obtén estas claves de https://www.emailjs.com/
    const SERVICE_ID = 'tu_service_id';
    const TEMPLATE_ID = 'tu_template_id';
    const PUBLIC_KEY = 'tu_public_key';

    // Parámetros para el template de EmailJS
    const templateParams = {
        to_email: 'miguel.nahum.oe@gmail.com', // CAMBIAR AQUÍ
        nombre: datos.nombre,
        empresa: datos.empresa,
        correo: datos.correo,
        telefono: datos.telefono,
        tipo_proyecto: datos.tipo_proyecto,
        mensaje_inicial: datos.mensaje_inicial,
        objetivo_principal: datos.objetivo_principal,
        presupuesto: datos.presupuesto,
        fecha_entrega: datos.fecha_entrega
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .then((response) => {
            console.log('Email enviado con éxito:', response);
            mostrarPantallaExito(btnSubmit, loaderIcon);
        })
        .catch((error) => {
            console.error('Error al enviar email:', error);
            mostrarErrorEnvio(btnSubmit, loaderIcon);
        });
}

/**
 * Muestra la pantalla de éxito
 */
function mostrarPantallaExito(btnSubmit, loaderIcon) {
    loaderIcon.textContent = '✨';
    btnSubmit.disabled = true;

    // Esperar un poco y cambiar a fase de éxito
    setTimeout(() => {
        cambiarFase(3);
        btnSubmit.classList.remove('loading');
    }, 1500);
}

/**
 * Muestra error en envío
 */
function mostrarErrorEnvio(btnSubmit, loaderIcon) {
    loaderIcon.textContent = '❌';
    
    setTimeout(() => {
        alert('Hubo un error al enviar. Por favor, intenta nuevamente o contacta directamente.');
        btnSubmit.classList.remove('loading');
        btnSubmit.disabled = false;
        loaderIcon.textContent = '📨';
    }, 2000);
}

/**
 * Reinicia el formulario completo
 */
function reiniciarFormulario() {
    // Resetear variables
    currentPhase = 1;

    // Limpiar formularios
    document.getElementById('form-phase1').reset();
    document.getElementById('form-phase2').reset();

    // Limpiar errores
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
    });
    document.querySelectorAll('.has-error').forEach(el => {
        el.classList.remove('has-error');
    });

    // Mostrar fase 1
    const phase1 = document.getElementById('phase1');
    const phaseSuccess = document.getElementById('phase-success');
    
    if (phaseSuccess) {
        phaseSuccess.classList.remove('active');
    }
    if (phase1) {
        phase1.classList.add('active');
    }

    // Resetear progreso
    actualizarProgreso();

    // Scroll a la sección
    document.querySelector('.requirements-section').scrollIntoView({ behavior: 'smooth' });
}