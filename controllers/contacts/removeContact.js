const data = require('../../contactsData')

const removeContact = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const presenceContact = await data.removeContactData(id)

    presenceContact
      ? res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted'
      })
      : res.json({
        status: 'rejected',
        code: 404,
        message: 'Not found'
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
  removeContact
}
