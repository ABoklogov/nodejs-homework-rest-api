const fs = require('fs/promises')
const path = require('path')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const { v4 } = require('uuid')
const { sendMail } = require('../../utils')

const { User } = require('../../models')

const avatarDir = path.join(__dirname, '../../', 'public/avatars')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    return res.status(409).json({
      status: 'conflict',
      code: 409,
      message: 'Email in use'
    })
  }

  const defaultAvatar = gravatar.url(email, { s: '250' }, true) // создаем дефолтную аватарку

  const { SALT } = process.env
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(Number(SALT)))

  const newUser = new User({
    email,
    password: hashPassword,
    avatarURL: defaultAvatar,
    verificationToken: v4()
  })
  const { subscription, avatarURL, verificationToken } = newUser

  const data = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `<a href='http://localhost:3000/api/v1/users/verify/${verificationToken}'>Перейдите по ссылке и подтвердите регистрацию</a>`
  }
  await sendMail(data)

  await User.create(newUser)

  const dirPath = path.join(avatarDir, newUser._id.toString())
  await fs.mkdir(dirPath) // создаем папку для аватара в public/avatars/....

  res.status(201).json({
    status: 'created',
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      }
    }
  })
}

module.exports = register
