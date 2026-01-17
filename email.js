const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: 'azhdar-aliev@mail.ru',
    pass: 'iXcMafkc0cbcI5oEB4Ga',
  },
});

module.exports = transporter;
