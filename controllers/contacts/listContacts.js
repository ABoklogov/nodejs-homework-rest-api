const data = require('../../contactsData/getAllContacts')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await data.getAllContacts()

    res.json({
      status: 'success',
      code: 200,
      data: {
        resault: contacts
      },
    })
  } catch (error) {

  }
}

module.exports = {
  listContacts,
}
