const express = require('express')
const router = express.Router()
const { contactValidation } = require('../../middlewares/contactValidation')

const { contacts: ctrl } = require('../../controllers')

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', contactValidation, ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', contactValidation, ctrl.updateContact)

module.exports = router
