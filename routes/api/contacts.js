const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models/contact')
const { validation } = require('../../middlewares')

const { contacts: ctrl } = require('../../controllers')

// router.get('/', ctrl.listContacts)

// router.get('/:contactId', ctrl.getContactById)

router.post('/', validation(joiSchema), ctrl.addContact)

// router.delete('/:contactId', ctrl.removeContact)

// router.put('/:contactId', validation(joiSchema), ctrl.updateContact)

module.exports = router
