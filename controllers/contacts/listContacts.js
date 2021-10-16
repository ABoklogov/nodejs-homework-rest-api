const data = require('../../contactsData/getAllContactsData')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await data.getAllContactsData()

    res.json({
      status: 'success',
      code: 200,
      data: {
        resault: contacts
      },
    })
  } catch (error) {
    res.json({
      status: 'rejected',
      code: 404,
      message: error.message
    })
  }
}

module.exports = {
  listContacts,
}
