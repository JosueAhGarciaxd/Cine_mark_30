import nodemailer from "nodemailer";

// Configurar el transportador de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    }
});

// Función para enviar correo de recuperación de contraseña
export const enviarCorreoRecuperacion = async (correo, nombre, codigoRecuperacion) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: correo,
        subject: 'Recuperación de Contraseña - Cine',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                    <h2 style="color: #333; margin-bottom: 20px;">🎬 Recuperación de Contraseña</h2>
                    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="color: #555; font-size: 16px;">Hola <strong>${nombre}</strong>,</p>
                        <p style="color: #555; font-size: 16px;">Has solicitado recuperar tu contraseña.</p>
                        <div style="background-color: #007bff; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 0; font-size: 18px;">Tu código de recuperación es:</p>
                            <h1 style="margin: 10px 0; font-size: 32px; letter-spacing: 3px;">${codigoRecuperacion}</h1>
                        </div>
                        <p style="color: #dc3545; font-size: 14px; font-weight: bold;">⚠️ Este código expira en 5 minutos</p>
                        <p style="color: #6c757d; font-size: 14px; margin-top: 20px;">
                            Si no solicitaste este cambio, puedes ignorar este correo de forma segura.
                        </p>
                    </div>
                    <p style="color: #6c757d; font-size: 12px; margin-top: 20px;">
                        Este es un correo automático, por favor no respondas a este mensaje.
                    </p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: "Correo enviado exitosamente" };
    } catch (error) {
        console.error("Error enviando correo:", error);
        return { success: false, message: "Error al enviar el correo", error };
    }
};

// Función para enviar confirmación de cambio de contraseña
export const enviarConfirmacionCambio = async (correo, nombre) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: correo,
        subject: 'Contraseña Actualizada - Cine',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background-color: #d4edda; padding: 20px; border-radius: 10px; text-align: center;">
                    <h2 style="color: #155724; margin-bottom: 20px;">✅ Contraseña Actualizada</h2>
                    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="color: #555; font-size: 16px;">Hola <strong>${nombre}</strong>,</p>
                        <p style="color: #555; font-size: 16px;">
                            Tu contraseña ha sido actualizada exitosamente.
                        </p>
                        <p style="color: #155724; font-size: 16px; font-weight: bold;">
                            🔒 Tu cuenta está segura
                        </p>
                        <p style="color: #6c757d; font-size: 14px; margin-top: 20px;">
                            Si no realizaste este cambio, contacta con nuestro soporte inmediatamente.
                        </p>
                    </div>
                    <p style="color: #6c757d; font-size: 12px; margin-top: 20px;">
                        Este es un correo automático, por favor no respondas a este mensaje.
                    </p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: "Correo de confirmación enviado" };
    } catch (error) {
        console.error("Error enviando correo de confirmación:", error);
        return { success: false, message: "Error al enviar confirmación", error };
    }
};

export default {
    enviarCorreoRecuperacion,
    enviarConfirmacionCambio
};