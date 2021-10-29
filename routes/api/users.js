const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models/user')
const { validation, controllerWrapper, authenticate } = require('../../middlewares')

const { users: ctrl } = require('../../controllers')

const userValidationMiddleware = validation(joiSchema)

router.post('/signup', userValidationMiddleware, controllerWrapper(ctrl.register))
router.post('/login', userValidationMiddleware, controllerWrapper(ctrl.login))
router.get('/logout', authenticate, controllerWrapper(ctrl.logout))

module.exports = router
