const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models/user')
const { validation, controllerWrapper } = require('../../middlewares')

const { users: ctrl } = require('../../controllers')

const userValidationMiddleware = validation(joiSchema)

router.post('/signup', userValidationMiddleware, controllerWrapper(ctrl.register))
router.post('/login', userValidationMiddleware, controllerWrapper(ctrl.login))
// router.get('/logout', controllerWrapper(ctrl.logout))

module.exports = router
