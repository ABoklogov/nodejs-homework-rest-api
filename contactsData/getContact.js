const { getAllContacts } = require('./getAllContacts')

async function getContact(contactId) {
  const contacts = await getAllContacts()
  const foundContact = contacts.find(({ id }) => id === Number(contactId))
  return foundContact
}

module.exports = {
  getContact,
}
