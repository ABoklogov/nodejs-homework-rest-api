const fs = require('fs/promises')
const path = require('path')

const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
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

  const defaultAvatar = gravatar.url(email, { s: 100 }, true) // создаем дефолтную аватарку

  const { SALT } = process.env
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(Number(SALT)))
  const newUser = await User.create({ email, password: hashPassword, avatarURL: defaultAvatar })

  const dirPath = path.join(avatarDir, newUser._id.toString())
  await fs.mkdir(dirPath) // создаем папку для аватара в public/avatars/....

  const { subscription, avatarURL } = newUser

  res.status(201).json({
    status: 'created',
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL
      }
    }
  })
}

module.exports = register
