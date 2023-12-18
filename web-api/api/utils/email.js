const config = require('config');
var nodemailer = require('nodemailer');

const CreateMessage = (to, subject, text, html) => {
  const msg = {
    from: config.email.ntuAccount + '@ntu.edu.tw',
    to,
    subject,
    text,
    html,
  };
  return msg;
};

const transporter = nodemailer.createTransport({
  host: 'smtps.ntu.edu.tw',
  port: 465,
  secure: true, // use TLS
  auth: {
    user: config.email.ntuAccount,
    pass: config.email.ntuAccountPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (
  to,
  subject,
  text,
  html,
  ) => {
    var mailOptions = await CreateMessage(to, subject, text, html);
    try {
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(`${error} / @ntuEmail.sendEmail`);
        } else {
            console.log(`Email sent to ${info.response}`);
        }
      });
    } catch (err) {
        console.log(`${err} / @ntuEmail.sendEmail`);
    }
};

module.exports = sendEmail;