const data = require('../../contactsData')

const updateContact = async (req, res) => {
  try {
    const id = req.params.contactId
    const body = req.body

    if (Object.keys(body).length === 0) {
      return res.json({
        status: 'rejected',
        code: 400,
        message: 'missing fields'
      })
    }

    const newContact = await data.updateContactData(id, body)

    newContact
      ? res.json({
        status: 'success',
        code: 200,
        data: {
          resault: newContact
        }
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
  updateContact
}
