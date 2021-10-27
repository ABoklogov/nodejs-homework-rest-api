const bcrypt = require('bcryptjs')
const { User } = require('../../models')

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
      return res.status(409).json({
        status: 'Conflict',
        code: 409,
        responseBody: {
          message: 'Email in use'
        }
      })
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    await User.create({ email, password: hashPassword })

    res.status(201).json({
      status: 'Created',
      code: 201,
      ResponseBody: {
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

module.exports = register
