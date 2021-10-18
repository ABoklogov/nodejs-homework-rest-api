const { getAllContactsData } = require('./getAllContactsData')

async function getContactData(contactId) {
  const contacts = await getAllContactsData()
  const foundContact = contacts.find(({ id }) => id === contactId)
  return foundContact
}

module.exports = {
  getContactData,
}
