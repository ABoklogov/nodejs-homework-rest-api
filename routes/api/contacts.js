const express = require('express')
const router = express.Router()

const { contacts: ctrl } = require('../../controllers')

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

// router.post('/', ctrl.addContact)

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
