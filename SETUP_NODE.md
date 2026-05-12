# 🚀 BitForge Backend - Node.js + Nodemailer

## Instrucciones de Configuración

### 1️⃣ Configurar Gmail App Password

**Necesitas una cuenta Gmail para enviar correos.** Sigue estos pasos:

#### Paso 1: Habilitar 2-Factor en tu Gmail
1. Ve a https://myaccount.google.com/
2. Click en "Seguridad" (sidebar izquierdo)
3. Busca "Verificación en dos pasos" y actívalo
4. Sigue las instrucciones

#### Paso 2: Crear App Password
1. Ve a https://myaccount.google.com/apppasswords
2. Selecciona:
   - **App:** Mail
   - **Device:** Windows Computer (o tu SO)
3. Google te generará una **contraseña de 16 caracteres**
4. **Copia esta contraseña** (es tu `GMAIL_PASS`)

#### Paso 3: Actualizar .env
Abre el archivo `.env` en la carpeta raíz y rellena:

```env
GMAIL_USER=tu-email@gmail.com
GMAIL_PASS=xxxx xxxx xxxx xxxx
PORT=3000
```

**⚠️ IMPORTANTE:**
- NO compartas este archivo
- NO lo subes a GitHub
- Es como tu contraseña

---

## 🔧 Instalación y Desarrollo Local

### Paso 1: Instalar dependencias
```bash
cd c:\Users\HP SERIES TOUCH\Desktop\proyecto-canva
npm install
```

### Paso 2: Iniciar servidor
```bash
npm start
```

Deberías ver:
```
🚀 Servidor corriendo en http://localhost:3000
📧 Gmail configurado: tu-email@gmail.com
```

### Paso 3: Probar localmente
- Abre: `file:///C:/Users/HP%20SERIES%20TOUCH/Desktop/proyecto-canva/index.html`
- Llena el formulario
- ¡Debería enviar correos! 📧

---

## 🌍 Deploy a Render (Producción Gratuita)

### Paso 1: Crear cuenta Render
1. Ve a https://render.com
2. Click "Sign up"
3. Usa GitHub o email

### Paso 2: Crear New Web Service
1. Click en "New +" → "Web Service"
2. Conecta tu repositorio GitHub (o sube ZIP)
3. Configura:
   - **Name:** `bitforge-backend`
   - **Language:** Node
   - **Build:** `npm install`
   - **Start:** `npm start`

### Paso 3: Agregar Variables de Entorno
En Render, ve a "Environment":
```
GMAIL_USER=tu-email@gmail.com
GMAIL_PASS=xxxx xxxx xxxx xxxx
```

### Paso 4: Deploy
Click "Deploy" y espera ~2 minutos

Tu URL será: `https://bitforge-backend.onrender.com`

---

## 🔄 Actualizar script.js con URL de Render

Una vez deployado, abre `script.js` y cambia:

```javascript
// De esto:
const SERVIDOR_URL = 'http://localhost:3000/api/enviar-solicitud';

// A esto:
const SERVIDOR_URL = 'https://bitforge-backend.onrender.com/api/enviar-solicitud';
```

---

## ✅ Verificación

Para verificar que funciona, accede a:
```
http://localhost:3000
```

Deberías ver:
```json
{
  "status": "✅ Servidor BitForge Backend activo",
  "endpoints": {
    "enviar": "POST /api/enviar-solicitud"
  }
}
```

---

## 🆘 Solución de Problemas

### Error: "Cannot find module 'express'"
```bash
npm install express nodemailer cors dotenv
```

### Error: "Gmail authentication failed"
- Verifica que `GMAIL_PASS` está en el archivo `.env`
- Revisa que habilitaste 2FA
- Copia exactamente el App Password (con espacios)

### Los correos no llegan
1. Revisa spam/promociones
2. Verifica que `GMAIL_USER` coincide con la cuenta que configura Gmail
3. Mira los logs del servidor: `npm start`

---

## 📋 Variables de Entorno Disponibles

| Variable | Valor por defecto | Descripción |
|----------|---|---|
| `GMAIL_USER` | tu-email@gmail.com | Tu email de Gmail |
| `GMAIL_PASS` | tu-app-password | App Password de 16 caracteres |
| `PORT` | 3000 | Puerto del servidor |

---

## 📚 Estructura del Proyecto

```
proyecto-canva/
├── index.html           # Frontend
├── script.js            # JavaScript actualizado para Node.js
├── styles.css           # Estilos
├── server.js            # ⭐ Servidor Node.js
├── package.json         # Dependencias
├── .env                 # Variables sensibles (NO compartir)
├── .gitignore           # Ignorar archivos sensibles
└── netlify.toml         # Config de Netlify
```

---

## 🎯 Próximos Pasos

1. ✅ Configurar Gmail App Password
2. ✅ Crear `.env` con credenciales
3. ✅ Ejecutar `npm install`
4. ✅ Ejecutar `npm start`
5. ✅ Probar localmente
6. ✅ Deployar a Render
7. ✅ Actualizar URL en script.js
8. ✅ ¡Listo! Los correos funcionarán 🚀

