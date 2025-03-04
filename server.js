const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Middleware para generar un nonce único
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  res.setHeader('Content-Security-Policy', `default-src 'self'; img-src 'self' data:; style-src 'self' 'nonce-${res.locals.nonce}'; script-src 'self'; font-src 'self' data:;`);
  next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/send-email', (req, res) => {
  const { name, surname, email, phone } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'malbihi@gmail.com',
    subject: 'Nuevo contacto del sitio web',
    text: `Nombre: ${name}\nApellido: ${surname}\nCorreo electrónico: ${email}\nTeléfono: ${phone}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado');
    }
  });
});

// Ruta para servir React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});






