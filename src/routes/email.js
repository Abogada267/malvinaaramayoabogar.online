const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();


const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

router.post('/send-email', (req, res) => {
  const { name, surname, email, phone } = req.body;

  if (!name || !surname || !email || !phone) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Correo electrónico inválido' });
  }

 
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
      console.error('Error al enviar el correo:', error);
      return res.status(500).json({ message: 'Error al enviar el correo electrónico', error });
    } else {
      console.log('Correo enviado:', info.response);
      return res.status(200).json({ message: 'Correo enviado', info });
    }
  });
});

module.exports = router;


