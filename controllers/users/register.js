const { User } = require('../../models')

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
      return res.status(409).json({
        Status: '409 Conflict',
        ContentType: 'application/json',
        ResponseBody: {
          message: 'Email in use'
        }
      })
    }

    const result = await User.create({ email, password })

    res.status(201).json({
      Status: '201 Created',
      ContentType: 'application/json',
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
