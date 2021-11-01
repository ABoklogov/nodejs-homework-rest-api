const express = require('express')
const router = express.Router()
const rateLimit = require('express-rate-limit')

const { joiSchema } = require('../../models/user')
const { validation, controllerWrapper, authenticate } = require('../../middlewares')

const { users: ctrl } = require('../../controllers')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 100 requests per windowMs
  handler: (req, res) => {
    res.status(403).json({
      code: 403,
      message: 'Request limit exceeded'
    })
  }
})

const userValidationMiddleware = validation(joiSchema)

router.post('/signup', userValidationMiddleware, controllerWrapper(ctrl.register))
router.post('/login', limiter, userValidationMiddleware, controllerWrapper(ctrl.login))
router.get('/logout', authenticate, controllerWrapper(ctrl.logout))
router.get('/current', authenticate, controllerWrapper(ctrl.current))
router.patch('/', authenticate, controllerWrapper(ctrl.subscription))

module.exports = router
