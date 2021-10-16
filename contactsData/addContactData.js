const path = require('path')
const fs = require('fs').promises
const { getAllContactsData } = require('./getAllContactsData')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, '..', 'db', 'contacts.json')

async function addContactData(name, email, phone) {
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  }
  const contacts = await getAllContactsData()

  const checkingContacts = (el) => el.name.toLowerCase() === name.toLowerCase()
  if (contacts.some(checkingContacts)) {
    return null
  }

  contacts.push(newContact)

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

module.exports = {
  addContactData,
}
