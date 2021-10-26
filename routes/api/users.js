const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models/user')
const { validation } = require('../../middlewares')

const { users: ctrl } = require('../../controllers')

const userValidationMiddleware = validation(joiSchema)

router.post('/signup', userValidationMiddleware, ctrl.register)
// router.post('/login', ctrl.login)
// router.get('/logout', ctrl.logout)

module.exports = router
