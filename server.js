require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Configuración de Email (Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Ruta para enviar correo
app.post('/enviar-correo', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
        return res.status(400).send({ message: 'Todos los campos son obligatorios' });
    }

    const mailOptions = {
        from: `"${nombre}" <${email}>`,
        to: process.env.EMAIL_USER, // Se envía a ti mismo
        subject: `Nuevo mensaje de: ${nombre}`,
        text: `Has recibido un mensaje de contacto:\n\nNombre: ${nombre}\nEmail: ${email}\nMensaje:\n${mensaje}`,
        html: `
            <h3>Nuevo mensaje de contacto</h3>
            <p><strong>De:</strong> ${nombre} (${email})</p>
            <p><strong>Mensaje:</strong></p>
            <blockquote style="border-left: 4px solid #eee; padding-left: 10px; color: #555;">
                ${mensaje.replace(/\n/g, '<br>')}
            </blockquote>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).send({ message: 'Error al enviar el correo.' });
        }
        console.log('Correo enviado:', info.response);
        res.status(200).send({ message: 'Correo enviado con éxito.' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
