const { Contact } = require('../../models')

const removeContact = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const presenceContact = await Contact.findByIdAndDelete(id)

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
    next(error)
  }
}

module.exports = {
  removeContact
}
