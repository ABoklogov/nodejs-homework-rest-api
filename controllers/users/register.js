const bcrypt = require('bcryptjs')
const { User } = require('../../models')

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

  const { SALT } = process.env
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(Number(SALT)))
  await User.create({ email, password: hashPassword })

  res.status(201).json({
    status: 'created',
    code: 201,
    data: {
      user: {
        email,
        subscription: 'starter'
      }
    }
  })
}

module.exports = register
