const data = require('../../contactsData/getAllContactsData')

const listContacts = async (req, res) => {
  try {
    const contacts = await data.getAllContactsData()

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        resault: contacts
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'rejected',
      code: 404,
      message: error.message
    })
  }
}

module.exports = {
  listContacts,
}
