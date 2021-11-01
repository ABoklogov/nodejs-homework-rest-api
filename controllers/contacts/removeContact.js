const { Contact } = require('../../models')

const removeContact = async (req, res) => {
  const id = req.params.contactId
  const contact = await Contact.findByIdAndDelete(id).populate('owner', '_id email subscription')

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
      status: 'error',
      code: 404,
      data: null,
      message: 'Not found'
    })
}

module.exports = {
  removeContact
}
