const nodeMailer = require('nodemailer');
const mailService = nodeMailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "9b28fcbc40f1e5",
    pass: "a559924138cd8e"
  }
});

module.exports = mailService;
