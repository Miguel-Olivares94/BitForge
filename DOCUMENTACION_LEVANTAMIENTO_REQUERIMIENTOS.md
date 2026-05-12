# 📋 Documentación: Levantamiento de Requerimientos - BitForge

## 🎯 Resumen General

Se ha implementado exitosamente una **sección moderna de Levantamiento de Requerimientos** en dos fases para BitForge. Este sistema permite que los clientes completen un formulario inicial rápido y luego una encuesta detallada para optimizar el análisis de proyectos.

---

## ✨ Características Implementadas

### 1. **Interfaz de Dos Fases**
- **Fase 1: Formulario Inicial** - Información básica del cliente
- **Fase 2: Encuesta Detallada** - Preguntas específicas del proyecto
- **Fase 3: Confirmación** - Pantalla de éxito

### 2. **Elementos Interactivos**
- ✅ Barra de progreso dinámica (0% → 100%)
- ✅ Transiciones suaves entre fases
- ✅ Validación de formularios en tiempo real
- ✅ Mensajes de error descriptivos
- ✅ Radio buttons personalizados
- ✅ Dropdowns modernos
- ✅ Campos de texto con placeholders informativos
- ✅ Botones con animaciones hover

### 3. **Diseño Moderno**
- 🎨 Colores coherentes con BitForge (#FF8C00, #FFB84D, #C0C0C0)
- 🎨 Glassmorphism y efectos de blur
- 🎨 Gradientes modernos
- 🎨 Iconos emoji para visual appeal
- 🎨 Responsive design para móvil y desktop
- 🎨 Animaciones suaves (fade, bounce, scale)

---

## 📝 FASE 1: Información Inicial

### Campos Requeridos:
```
- Nombre Completo (mín 3 caracteres)
- Empresa/Emprendimiento
- Correo Electrónico (validación de formato)
- Teléfono
- Tipo de Proyecto (dropdown)
  - Sitio Web
  - E-commerce
  - Aplicación Móvil
  - Automatización Empresarial
  - Integración de Sistemas
  - Otro
- Mensaje Inicial (mín 10 caracteres)
```

### Validaciones:
- Campos requeridos
- Validación de email
- Longitud mínima de campos
- Mensajes de error dinámicos
- Limpieza de errores al corregir campos

---

## 📊 FASE 2: Encuesta Detallada

### Sección: 🎯 Objetivos del Proyecto
```
- ¿Cuál es el objetivo principal?
  - Establecer presencia digital
  - Vender productos/servicios online
  - Optimizar procesos internos
  - Mejorar atención al cliente
  - Análisis y reportes de datos
  - Varios objetivos
```

### Sección: 🌐 Tecnología e Infraestructura
```
- ¿Tienes dominio registrado?
  - Sí, ya tengo
  - No, necesito uno
  
- ¿Tienes hosting contratado?
  - Sí, ya tengo
  - No, necesito uno
  
- ¿Tienes logo diseñado?
  - Sí, ya tengo
  - No, necesito diseño
```

### Sección: ⚙️ Funcionalidades Necesarias
```
- ¿Necesitas e-commerce (carrito, pagos)?
  - Sí / No
  
- ¿Necesitas panel administrador?
  - Sí / No
  
- ¿Necesitas sistema de usuarios y roles?
  - Sí / No
  
- ¿Necesitas integración con WhatsApp?
  - Sí / No
```

### Sección: 💰 Presupuesto y Tiempo
```
- Presupuesto Estimado (CLP) (dropdown)
  - $1M - $3M
  - $3M - $5M
  - $5M - $10M
  - $10M - $20M
  - $20M+
  
- Fecha Estimada de Entrega
  - Campo de texto libre (Ej: 2-3 meses, ASAP, etc.)
```

### Sección: 📚 Referencias y Detalles Adicionales
```
- ¿Conoces sitios similares? (Links de referencia)
  - Campo de textarea para pegar links de inspiración
  
- Comentarios Adicionales
  - Campo de textarea para detalles adicionales
```

---

## 🔧 Estructura de Archivos

### index.html
```
- Agregada sección #levantamiento dentro de <div class="content">
- Nueva sección insertada ANTES de </div> de content
- Incluye 3 fases: phase1, phase2, phase-success
- Comentarios HTML explicando configuración
- Script tags incluyen referencia opcional a EmailJS
```

### styles.css
```
- Nuevas clases:
  .requirements-section
  .progress-wrapper / .progress-bar / .progress-fill
  .form-container / .form-phase / .form-phase.active
  .phase-content / .phase-icon / .phase-title
  .requirements-form / .form-group / .form-row
  .form-section / .section-label
  .radio-group / .radio-label
  .error-message / .help-text
  .btn-next / .btn-back / .btn-submit
  .success-content / .success-icon / .success-message
  
- Animaciones:
  @keyframes bounceIn
  @keyframes scaleIn
  @keyframes pulse
  @keyframes spin
  
- Media queries para responsive design
```

### script.js
```
- Función: inicializarLevantamientoRequerimientos()
- Función: validarFase1()
- Función: validarFase2()
- Función: cambiarFase(phase)
- Función: actualizarProgreso()
- Función: recopilarDatos()
- Función: enviarSolicitudCompleta()
- Función: enviarAlBackend(datos, btnSubmit, loaderIcon)
- Función: enviarConEmailJS(datos, btnSubmit, loaderIcon) [opcional]
- Función: mostrarPantallaExito()
- Función: reiniciarFormulario()
```

---

## 🚀 Integración con Email (Configuración)

### OPCIÓN 1: Backend Local/Remoto (Recomendado)
```javascript
// Archivo: script.js, línea ~550
const backendURL = 'https://tu-backend.com/api/solicitudes';

// Datos enviados como JSON:
{
  nombre: string,
  empresa: string,
  correo: string,
  telefono: string,
  tipo_proyecto: string,
  mensaje_inicial: string,
  objetivo_principal: string,
  dominio: string,
  hosting: string,
  logo: string,
  ecommerce: string,
  admin_panel: string,
  usuarios_roles: string,
  whatsapp: string,
  presupuesto: string,
  fecha_entrega: string,
  referencias: string,
  comentarios: string,
  fecha_envio: string
}
```

### OPCIÓN 2: EmailJS
```javascript
// 1. Ve a https://www.emailjs.com/
// 2. Crea una cuenta y obtén:
//    - PUBLIC_KEY
//    - SERVICE_ID
//    - TEMPLATE_ID

// 3. Descomenta en index.html (línea 7):
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>

// 4. En script.js, modifica línea ~570:
// Descomenta: enviarConEmailJS(datos, btnSubmit, loaderIcon);
// Comenta: enviarAlBackend(datos, btnSubmit, loaderIcon);

// 5. Actualiza valores en script.js (~510-520):
const SERVICE_ID = 'tu_service_id';
const TEMPLATE_ID = 'tu_template_id';
const PUBLIC_KEY = 'tu_public_key';
```

### OPCIÓN 3: FormSubmit
```html
<!-- En index.html, modifica los formularios: -->
<form class="requirements-form" 
      action="https://formsubmit.co/tu@email.com" 
      method="POST">
```

---

## 📱 Responsive Design

### Desktop (1024px+)
- Grid de 2 columnas para ciertos campos
- Barra de progreso completa
- Todas las secciones visibles

### Tablet (768px - 1023px)
- Layout adaptado
- Grid de 1 columna
- Botones reducidos

### Mobile (< 768px)
- Interfaz optimizada para pantalla pequeña
- Botones full-width
- Padding reducido
- Texto ajustado
- Radio buttons en columna

---

## ✅ Validaciones Implementadas

### Fase 1:
- Nombre: mínimo 3 caracteres
- Email: formato válido
- Empresa: no vacío
- Teléfono: no vacío
- Tipo de proyecto: selección requerida
- Mensaje: mínimo 10 caracteres

### Fase 2:
- Objetivo principal: requerido
- Todos los radio buttons: al menos uno seleccionado
- Presupuesto: selección requerida
- Fecha entrega: no vacío

---

## 🎨 Personalizaciones Fáciles

### Cambiar Colores:
En `styles.css`, reemplaza:
- `#FF8C00` → tu color naranja
- `#FFB84D` → tu color naranja claro
- `#C0C0C0` → tu color gris
- `#0a0a0a` → tu fondo

### Agregar/Eliminar Campos:
1. Agrega el HTML en `index.html`
2. Agrega el CSS en `styles.css`
3. Agrega validación en `script.js`

### Cambiar Correo Destino:
- Backend: Actualiza URL en `script.js`
- EmailJS: Actualiza `to_email` en `enviarConEmailJS()`
- FormSubmit: Actualiza URL action en `index.html`

---

## 🔄 Flujo de Datos

```
Cliente rellena Fase 1
        ↓
   Validación
        ↓
   Avanza a Fase 2
        ↓
Cliente rellena Fase 2
        ↓
   Validación completa
        ↓
   Recopila todos los datos
        ↓
   Envía al servidor/email
        ↓
   Muestra pantalla de éxito
        ↓
   Opción de enviar otra solicitud
```

---

## 🎬 Animaciones y Efectos

- **Entrada de fases**: Fade in + slide
- **Salida de fases**: Slide left
- **Barra de progreso**: Transición suave
- **Radio buttons**: Glow al seleccionar
- **Botones**: Scale + shadow en hover
- **Íconos**: Bounce in + pulse
- **Errores**: Fade in suave

---

## 📞 Integración Futura

### Para conectar con backend:
1. Crea endpoint: `POST /api/solicitudes`
2. Backend debe:
   - Validar datos
   - Guardar en base de datos
   - Enviar email al cliente
   - Generar link de encuesta personalizada
   - Retornar respuesta JSON

### Ejemplo respuesta esperada:
```json
{
  "success": true,
  "mensaje": "Solicitud recibida correctamente",
  "id_solicitud": "ABC123",
  "encuesta_link": "https://tu-app.com/encuesta/ABC123"
}
```

---

## 🐛 Debugging

### Ver datos del formulario en consola:
```javascript
// En script.js, función recopilarDatos() 
// Descomenta: console.log('Datos:', datos);
```

### Ver errores de envío:
```javascript
// En script.js, función enviarAlBackend()
// Verifica console (F12) para errores CORS o red
```

---

## 🔐 Seguridad (TO-DO)

Para producción, implementa:
- [ ] CSRF token
- [ ] Rate limiting
- [ ] Validación en backend (NO confiar solo en cliente)
- [ ] Sanitizar datos antes de guardar
- [ ] SSL/HTTPS obligatorio
- [ ] Encriptación de datos sensibles
- [ ] Logs de auditoría

---

## 📊 Próximas Mejoras

- [ ] Integración con CRM (HubSpot, Pipedrive)
- [ ] Generación automática de encuesta PDF
- [ ] Chat en vivo durante el llenado
- [ ] Preview de presupuesto estimado
- [ ] Upload de archivos (diseños, referencias)
- [ ] Guardar borradores
- [ ] Historial de solicitudes del cliente
- [ ] Webhooks para integraciones
- [ ] Analytics de completación

---

## 📚 Archivos Modificados

1. **index.html** - +180 líneas (nueva sección)
2. **styles.css** - +450 líneas (nuevos estilos)
3. **script.js** - +550 líneas (nueva funcionalidad)

---

## ✨ Resultado Final

Una interfaz **profesional, moderna y funcional** que:
- ✅ Se ve hermosa en todos los dispositivos
- ✅ Valida datos correctamente
- ✅ Proporciona UX fluida
- ✅ Está lista para integración backend
- ✅ Es fácil de personalizar
- ✅ Incluye animaciones suaves
- ✅ Mantiene coherencia con BitForge

---

## 📧 Soporte

Para preguntas sobre configuración, consulta los comentarios en el código:
- `index.html` - líneas 95-110
- `script.js` - líneas 220-240

¡Proyecto completado exitosamente! 🎉