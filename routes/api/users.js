const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models/user')
const { validationUser } = require('../../middlewares')

const { users: ctrl } = require('../../controllers')

const userValidationMiddleware = validationUser(joiSchema)

router.post('/signup', userValidationMiddleware, ctrl.register)
router.post('/login', userValidationMiddleware, ctrl.login)
// router.get('/logout', ctrl.logout)

module.exports = router
