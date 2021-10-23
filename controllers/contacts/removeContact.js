const { Contact } = require('../../models')

const removeContact = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const contact = await Contact.findByIdAndDelete(id)

    contact
      ? res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          resault: contact
        },
        message: 'contact deleted'
      })
      : res.status(404).json({
        status: 'rejected',
        code: 404,
        data: null,
        message: 'Not found'
      })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  removeContact
}
