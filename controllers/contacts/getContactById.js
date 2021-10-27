const { Contact } = require('../../models')

const getContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const contact = await Contact.findById(id)

    contact
      ? res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          resault: contact
        }
      })
      : res.status(404).json({
        status: 'error',
        code: 404,
        data: null,
        message: 'Not found'
      })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getContactById
}
