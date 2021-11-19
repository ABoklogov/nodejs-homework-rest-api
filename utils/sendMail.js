const nodemailer = require('nodemailer')
const { EMAIL_USER, EMAIL_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  }
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendMail = async (data) => {
  try {
    const mail = { ...data, from: EMAIL_USER }
    await transporter.sendMail(mail)
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = sendMail
