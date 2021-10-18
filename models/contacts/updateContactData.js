const path = require('path')
const fs = require('fs').promises
const { getAllContactsData } = require('./getAllContactsData')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, '..', '..', 'db', 'contacts.json')

const updateContactData = async (id, body) => {
  const newContact = {
    id: uuidv4(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  }

  const contacts = await getAllContactsData()
  const idx = contacts.findIndex((item) => item.id === id)
  if (idx === -1) {
    return null
  }

  contacts.splice(idx, 1, newContact)

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

module.exports = {
  updateContactData
}
