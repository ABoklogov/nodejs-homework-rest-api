const path = require('path')
const fs = require('fs').promises
const { listContacts } = require('./listContacts')
// const shortid = require('shortid')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, '..', '..', 'db', 'contacts.json')

// const addContact = async (req, res, next) => {
//   res.json({ message: 'template message' })
// }

async function addContact(name, email, phone) {
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  }
  const contacts = await listContacts()

  const checkingContacts = (el) => el.name.toLowerCase() === name.toLowerCase()
  if (contacts.some(checkingContacts)) {
    return null
  }

  contacts.push(newContact)

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return true
}

module.exports = {
  addContact,
}
