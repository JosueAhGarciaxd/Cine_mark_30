import nodemailer from "nodemailer";
import { config } from "../config.js";

/*Configurar el transporte 
y coquein enviara al correo*/

const transporte = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.email.user,
        pass: config.email.pass,
    },
    //para comprobar si se envia el correo
    logger: true,
    debug: true
});

// Quien los envia
const sendEmail = async (to, subject, body, html) => {
    try {
        const info = await transporte.sendMail({
            from: `"Fimels" <${config.email.user}>`,
            to,
            subject,
            text: body,
            html 
        });
        console.log("Correo enviado:", info.messageId);
        return info;
    } catch (error) {
        console.log("Error enviando correo:", error);
        throw error;
    }
};

const HTMLRecoveryEmail = (codigo) => {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperación de Cuenta - Cinemark</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #eeeeee;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #E50914;
        }
        .content {
            padding: 30px 20px;
        }
        .code-container {
            margin: 30px 0;
            text-align: center;
        }
        .recovery-code {
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #E50914;
            padding: 15px 30px;
            background-color: #f0f0f0;
            border-radius: 6px;
            display: inline-block;
        }
        .instructions {
            margin-bottom: 30px;
        }
        .footer {
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #999999;
            border-top: 1px solid #eeeeee;
        }
        .support {
            margin-top: 20px;
        }
        .button {
            display: inline-block;
            background-color: #E50914;
            color: white;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 4px;
            font-weight: bold;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Cinemark</div>
        </div>
        <div class="content">
            <h2>Código de Recuperación de Cuenta</h2>
            <div class="instructions">
                <p>Hola,</p>
                <p>Recibimos una solicitud para recuperar el acceso a tu cuenta en <strong>Cinemark</strong>.</p>
                <p>Utiliza el siguiente código para continuar con el proceso de recuperación:</p>
            </div>
            <div class="code-container">
                <div class="recovery-code">${codigo}</div>
            </div>
            <p>Este código expirará en 30 minutos por motivos de seguridad.</p>
            <p>Si no solicitaste este código, puedes ignorar este mensaje o contactarnos en caso de dudas sobre la seguridad de tu cuenta.</p>
            <div class="support">
                <p>¿Necesitas ayuda? <a href="#">Contáctanos aquí</a></p>
                <a href="#" class="button">Ir a Cinemark</a>
            </div>
        </div>
        <div class="footer">
            <p>Este es un mensaje automático enviado por <strong>Cinemark</strong>. Por favor, no respondas a este correo.</p>
            <p>&copy; 2025 Cinemark. Todos los derechos reservados.</p>
            <p><a href="#">Política de Privacidad</a> | <a href="#">Términos de Servicio</a></p>
        </div>
    </div>
</body>
</html>
    `;
};

export { sendEmail, HTMLRecoveryEmail };