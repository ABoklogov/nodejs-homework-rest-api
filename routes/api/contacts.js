const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models/contact')
const { validation, controllerWrapper, authenticate } = require('../../middlewares')

const { contacts: ctrl } = require('../../controllers')

const validationContact = validation(joiSchema)

router.get('/', authenticate, controllerWrapper(ctrl.listContacts))
router.get('/:contactId', authenticate, controllerWrapper(ctrl.getContactById))
router.delete('/:contactId', authenticate, controllerWrapper(ctrl.removeContact))
router.post('/', authenticate, validationContact, controllerWrapper(ctrl.addContact))
router.put('/:contactId', authenticate, validationContact, controllerWrapper(ctrl.updateContact))
router.patch('/:contactId/favorite', authenticate, validationContact, controllerWrapper(ctrl.updateStatusContact))
// herocku
module.exports = router
