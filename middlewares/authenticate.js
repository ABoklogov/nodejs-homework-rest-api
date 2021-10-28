const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')

    if (bearer !== 'Bearer') {
      return res.status(401).json({
        status: 'unauthorized',
        code: 401,
        message: 'Not authorized'
      })
    }

    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({
      status: 'unauthorized',
      code: 401,
      message: error.message
    })
  }
}

module.exports = authenticate
