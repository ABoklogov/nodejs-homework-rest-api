const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models/user')
const { validation, controllerWrapper, authenticate, upload, limiter } = require('../../middlewares')

const { users: ctrl } = require('../../controllers')

const userValidationMiddleware = validation(joiSchema)

router.post('/signup', userValidationMiddleware, controllerWrapper(ctrl.register))
router.get('/verify/:verificationToken', userValidationMiddleware, controllerWrapper(ctrl.verification))
router.post('/login', limiter, userValidationMiddleware, controllerWrapper(ctrl.login))
router.get('/logout', authenticate, controllerWrapper(ctrl.logout))
router.get('/current', authenticate, controllerWrapper(ctrl.current))
router.patch('/', authenticate, controllerWrapper(ctrl.subscription))
router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(ctrl.updateAvatar))

module.exports = router
