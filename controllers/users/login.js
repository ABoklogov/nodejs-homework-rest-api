const bcrypt = require('bcryptjs')
const { User } = require('../../models')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    const responseError = () => {
      return res.status(401).json({
        status: 'Unauthorized',
        code: 401,
        responseBody: {
          message: 'Email or password is wrong'
        }
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

    const token = 'ndkfijwefiojewiofj32j43i2joijdfew'

    res.status(200).json({
      status: 'ok',
      code: 200,
      responseBody: {
        token,
        user: {
          email,
          subscription: 'starter'
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
