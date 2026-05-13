const path = require('path');
const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio de trabajo
const staticDir = process.env.NODE_ENV === 'production' ? process.cwd() : path.join(__dirname);
app.use(express.static(staticDir));

// DEBUG: Mostrar variables cargadas
console.log('📋 VARIABLES CARGADAS:');
console.log('   RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✓ Configurado' : '✗ NO configurado');
console.log('   RECIPIENT_EMAIL:', process.env.RECIPIENT_EMAIL);
console.log('   PORT:', process.env.PORT);

// Inicializar Resend solo si existe la API key
let resend = null;
if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
}

// Ruta para enviar solicitudes
app.post('/api/enviar-solicitud', async (req, res) => {
    try {
        const datos = req.body;

        // Validar que existan datos
        if (!datos.nombre || !datos.correo) {
            return res.status(400).json({ 
                error: 'Faltan campos requeridos (nombre, correo)' 
            });
        }

        // Crear contenido del email
        const htmlContent = `
            <h2>🎯 Nueva Solicitud de Proyecto - BitForge</h2>
            <hr>
            
            <h3>📋 FASE 1: INFORMACIÓN INICIAL</h3>
            <p><strong>Nombre:</strong> ${datos.nombre}</p>
            <p><strong>Empresa:</strong> ${datos.empresa}</p>
            <p><strong>Correo:</strong> ${datos.correo}</p>
            <p><strong>Teléfono:</strong> ${datos.telefono}</p>
            <p><strong>Tipo de Proyecto:</strong> ${datos.tipo_proyecto}</p>
            <p><strong>Mensaje Inicial:</strong> ${datos.mensaje_inicial}</p>
            
            <h3>📊 FASE 2: DETALLES DEL PROYECTO</h3>
            <p><strong>Objetivo Principal:</strong> ${datos.objetivo_principal}</p>
            <p><strong>Dominio:</strong> ${datos.dominio}</p>
            <p><strong>Hosting:</strong> ${datos.hosting}</p>
            <p><strong>Logo:</strong> ${datos.logo}</p>
            <p><strong>E-commerce:</strong> ${datos.ecommerce}</p>
            <p><strong>Admin Panel:</strong> ${datos.admin_panel}</p>
            <p><strong>Usuarios y Roles:</strong> ${datos.usuarios_roles}</p>
            <p><strong>WhatsApp:</strong> ${datos.whatsapp}</p>
            <p><strong>Presupuesto:</strong> ${datos.presupuesto}</p>
            <p><strong>Fecha de Entrega:</strong> ${datos.fecha_entrega}</p>
            <p><strong>Referencias:</strong> ${datos.referencias || 'N/A'}</p>
            <p><strong>Comentarios Adicionales:</strong> ${datos.comentarios || 'N/A'}</p>
            
            <hr>
            <p><strong>Fecha de Envío:</strong> ${datos.fecha_envio}</p>
            <p><em>Este correo fue generado automáticamente desde BitForge</em></p>
        `;

        // Enviar correo con Resend
        if (!resend) {
            // Si no hay Resend API key configurada, retornar éxito pero con advertencia
            console.log('⚠️  RESEND_API_KEY no configurada, pero la solicitud se procesó');
            return res.status(200).json({
                success: true,
                message: '✅ Solicitud procesada (email no configurado)',
                warning: 'RESEND_API_KEY no está configurada en el servidor'
            });
        }

        const result = await resend.emails.send({
            from: 'BitForge <onboarding@resend.dev>',
            to: process.env.RECIPIENT_EMAIL,
            replyTo: datos.correo,
            subject: `Nueva Solicitud de Proyecto - ${datos.nombre} (${datos.empresa})`,
            html: htmlContent
        });

        if (result.error) {
            throw new Error(`Error de Resend: ${result.error.message}`);
        }

        console.log('✅ Correo enviado:', result.data.id);

        res.status(200).json({
            success: true,
            message: '✅ Solicitud enviada exitosamente',
            messageId: result.data.id
        });

    } catch (error) {
        console.error('❌ Error al enviar correo:', error.message);
        res.status(500).json({
            success: false,
            error: 'Error al enviar la solicitud',
            details: error.message
        });
    }
});

// Ruta raíz - Servir el HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(staticDir, 'index.html'));
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📧 Gmail configurado: ${process.env.GMAIL_USER || 'NO CONFIGURADO'}`);
});
