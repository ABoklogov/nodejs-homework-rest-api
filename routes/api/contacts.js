const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models/contact')
const { validation } = require('../../middlewares')

const { contacts: ctrl } = require('../../controllers')

const validationContact = validation(joiSchema)

router.get('/', ctrl.listContacts)
router.get('/:contactId', ctrl.getContactById)
router.delete('/:contactId', ctrl.removeContact)
router.post('/', validationContact, ctrl.addContact)
router.put('/:contactId', validationContact, ctrl.updateContact)
router.patch('/:contactId/favorite', validationContact, ctrl.updateStatusContact)

module.exports = router
