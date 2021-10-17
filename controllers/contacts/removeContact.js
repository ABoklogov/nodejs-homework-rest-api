const data = require('../../contactsData')

const removeContact = async (req, res) => {
  try {
    const id = req.params.contactId
    const presenceContact = await data.removeContactData(id)

    presenceContact
      ? res.status(200).json({
        status: 'success',
        code: 200,
        message: 'contact deleted'
      })
      : res.status(404).json({
        status: 'rejected',
        code: 404,
        message: 'Not found'
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
  removeContact
}
