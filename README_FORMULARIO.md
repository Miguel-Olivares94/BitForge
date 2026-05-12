# 📋 Levantamiento de Requerimientos - BitForge

## 🚀 ¿Qué se ha implementado?

Una **sección moderna de dos fases** para que tus clientes soliciten proyectos:

**Fase 1** → Información rápida del cliente (nombre, email, teléfono)
**Fase 2** → Encuesta detallada (objetivos, presupuesto, funcionalidades)
**Fase 3** → Confirmación con opciones de seguimiento

## ✨ Características

✅ Validación automática de formularios
✅ Barra de progreso dinámica (0% → 100%)
✅ Transiciones suaves entre fases
✅ Diseño responsive (móvil + desktop)
✅ Colores coherentes con BitForge
✅ Radio buttons y selects personalizados
✅ Mensajes de error descriptivos
✅ Listo para integrar con email/backend

## 🔧 CONFIGURACIÓN RÁPIDA

### 1️⃣ Para recibir emails en tu correo:

**OPCIÓN A: Backend Propio** (Recomendado)
```javascript
// En script.js, línea 555
const backendURL = 'https://TU-BACKEND.COM/api/solicitudes';
```

**OPCIÓN B: EmailJS** (Gratis, fácil)
```javascript
// 1. Crea cuenta en https://www.emailjs.com/
// 2. Descomenta línea 7 en index.html:
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>

// 3. En script.js línea 573, descomenta:
// enviarConEmailJS(datos, btnSubmit, loaderIcon);

// 4. Actualiza tus keys en script.js (línea ~510)
```

**OPCIÓN C: FormSubmit** (Más simple)
```html
<!-- En index.html, busca los formularios y agrega: -->
<form action="https://formsubmit.co/TU-EMAIL@GMAIL.COM" method="POST">
```

### 2️⃣ Personalizar correo destino:

**Si usas backend:**
```javascript
// script.js línea 555
const backendURL = 'https://tu-servidor.com/api/solicitudes';
```

**Si usas EmailJS:**
```javascript
// script.js línea 526
to_email: 'tu@email.com',
```

### 3️⃣ Cambiar colores:

En `styles.css`, reemplaza:
- `#FF8C00` → Tu naranja favorito
- `#FFB84D` → Tu naranja claro
- `#C0C0C0` → Tu gris preferido

## 📊 CAMPOS DEL FORMULARIO

### Fase 1: Información Inicial
- ✏️ Nombre (mín 3 caracteres)
- ✏️ Empresa
- ✏️ Email (con validación)
- ✏️ Teléfono
- 📍 Tipo de proyecto (dropdown)
- 💬 Mensaje inicial (mín 10 caracteres)

### Fase 2: Encuesta Detallada

**🎯 Objetivos**
- ¿Cuál es el objetivo principal?

**🌐 Infraestructura**
- ¿Tienes dominio?
- ¿Tienes hosting?
- ¿Tienes logo?

**⚙️ Funcionalidades**
- ¿E-commerce?
- ¿Panel admin?
- ¿Usuarios y roles?
- ¿WhatsApp?

**💰 Presupuesto**
- Rango presupuestario (CLP)
- Fecha estimada de entrega

**📚 Extras**
- Links de referencia
- Comentarios adicionales

## 📱 Responsivo

- ✅ Funciona perfecto en móvil
- ✅ Funciona perfecto en tablet
- ✅ Funciona perfecto en desktop

## 🎨 Animaciones

- Transiciones suaves entre fases
- Progreso animado
- Hover effects en botones
- Validación con mensaje de error
- Pantalla de éxito con emoji

## 📂 Archivos Creados/Modificados

```
index.html                          (+180 líneas)
├── Nueva sección #levantamiento
├── 3 fases de formulario
└── Comentarios de configuración

styles.css                          (+450 líneas)
├── Estilos de formulario moderno
├── Animaciones suaves
├── Responsive design
└── Efectos visuales

script.js                           (+550 líneas)
├── Validación de campos
├── Cambio de fases
├── Envío de datos
├── Manejo de errores
└── Configuración de email

DOCUMENTACION_LEVANTAMIENTO_REQUERIMIENTOS.md (guía completa)
README_FORMULARIO.md (este archivo)
```

## 🆘 Solucionar Problemas

**P: El formulario no valida correctamente**
R: Verifica console (F12) para ver los mensajes de error

**P: Los datos no se envían**
R: 
1. Verifica que configuraste la URL del backend/email
2. Mira console (F12) por errores CORS
3. Asegúrate de que tu servidor está corriendo

**P: ¿Cómo hago que el email llegue a mi correo?**
R: Sigue la sección "CONFIGURACIÓN RÁPIDA" arriba

## 💡 Tips

- Los campos con * son obligatorios
- El formulario se valida ANTES de enviar
- Puedes volver atrás desde la Fase 2
- La barra de progreso actualiza en tiempo real
- Los errores desaparecen cuando corriges el campo

## 🔗 Enlaces Útiles

- EmailJS: https://www.emailjs.com/
- FormSubmit: https://formsubmit.co/
- Tu Backend: [Configura aquí]

## 🎯 Próximos Pasos

1. ✅ Elige cómo recibir los datos (backend, EmailJS, FormSubmit)
2. ✅ Configura el correo/URL destino
3. ✅ Prueba el formulario llenándolo
4. ✅ Verifica que recibas los datos
5. ✅ ¡Listo! Tu formulario está operativo

## 📞 Integración Backend

Si quieres conectar con tu servidor:

**Tu endpoint debe hacer:**
- ✅ Recibir POST con los datos en JSON
- ✅ Guardar en base de datos
- ✅ Enviar email al cliente
- ✅ Generar link de encuesta personalizada
- ✅ Retornar JSON success/error

**Ejemplo de endpoint:**
```
POST /api/solicitudes
{
  nombre: "Juan García",
  correo: "juan@example.com",
  empresa: "Tech Solutions",
  ... más datos
}

Response:
{
  success: true,
  id_solicitud: "ABC123",
  encuesta_link: "https://tu-app.com/encuesta/ABC123"
}
```

## 🎉 ¡Listo!

Tu sección de Levantamiento de Requerimientos está lista para usar.

Visita: **http://tu-sitio.com#levantamiento**

¿Preguntas? Revisa la documentación completa en:
`DOCUMENTACION_LEVANTAMIENTO_REQUERIMIENTOS.md`