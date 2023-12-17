import { config } from '../config';

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.sendgrid.sendgridApiKey);

const CreateMessage = (to, subject, text, html) => {
  const msg = {
    to,
    from: config.sendgrid.sendgridAccount,
    subject,
    text,
    html,
  };
  return msg;
};

export const sendEmail = async (to, subject, text, html) => {
  const msg = CreateMessage(to, subject, text, html);

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.log(`${err} / @sendgrid.sendEmail`);
  }
};
