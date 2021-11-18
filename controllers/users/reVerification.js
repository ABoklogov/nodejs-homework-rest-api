const { User } = require('../../models')
const { sendMail } = require('../../utils')

const reVerification = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  const { verificationToken, verify } = user

  if (!email) {
    return res.status(400).json({
      status: 'Bad Request',
      code: 400,
      message: 'missing required field email'
    })
  }

  if (!verify) {
    const data = {
      to: email,
      subject: 'Подтверждение регистрации на сайте',
      html: `<a href='http://localhost:3000/api/v1/users/verify/${verificationToken}'>Перейдите по ссылке и подтвердите регистрацию</a>`
    }
    await sendMail(data)

    return res.status(200).json({
      status: 'ok',
      code: 200,
      message: 'Verification email sent'
    })
  }

  return res.status(400).json({
    status: 'Bad Request',
    code: 400,
    message: 'Verification has already been passed'
  })
}

module.exports = reVerification
