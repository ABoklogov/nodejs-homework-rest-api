const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  const responseError = () => {
    return res.status(401).json({
      status: 'unauthorized',
      code: 401,
      message: 'Email or password is wrong'
    })
  }
  if (!user) {
    responseError()
  }

  const hashPassword = user.password
  const compareResult = bcrypt.compareSync(password, hashPassword)

  if (!compareResult) {
    responseError()
  }

  const { subscription, avatarURL } = user

  const payload = {
    id: user._id
  }
  const { SECRET_KEY } = process.env

  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(user._id, { token })

  res.status(200).json({
    status: 'ok',
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription,
        avatarURL
      }
    }
  })
}

module.exports = login
