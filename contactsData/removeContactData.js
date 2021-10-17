const path = require('path')
const fs = require('fs').promises
const { getAllContactsData } = require('./getAllContactsData')

const contactsPath = path.join(__dirname, '..', 'db', 'contacts.json')

async function removeContactData(contactId) {
  const contacts = await getAllContactsData()
  const idx = contacts.findIndex((item) => item.id === contactId)
  if (idx === -1) {
    return null
  }

  contacts.splice(idx, 1)

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return true
}

module.exports = {
  removeContactData,
}
