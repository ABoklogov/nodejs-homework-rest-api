const { getAllContactsData } = require('./getAllContactsData')
const { getContactData } = require('./getContactData')
const { addContactData } = require('./addContactData')
const { removeContactData } = require('./removeContactData')
const { updateContactData } = require('./updateContactData')

module.exports = {
  getAllContactsData,
  getContactData,
  addContactData,
  removeContactData,
  updateContactData
}
