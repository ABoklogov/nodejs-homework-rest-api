const { contacts: data } = require('../../models')

const updateContact = async (req, res) => {
  try {
    const id = req.params.contactId
    const body = req.body

    if (Object.keys(body).length === 0) {
      return res.status(400).json({
        status: 'rejected',
        code: 400,
        message: 'missing fields'
      })
    }

    const newContact = await data.updateContactData(id, body)

    newContact
      ? res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          resault: newContact
        }
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
  updateContact
}
