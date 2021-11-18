const nodemailer = require('nodemailer')
const { EMAIL_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'kashira87@mail.ru',
    pass: EMAIL_PASSWORD
  }
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendMail = async (data) => {
  try {
    const mail = { ...data, from: 'kashira87@mail.ru' }
    await transporter.sendMail(mail)
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = sendMail
